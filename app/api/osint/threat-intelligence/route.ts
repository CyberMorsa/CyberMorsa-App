import { NextResponse } from "next/server"
import { query, withTransaction } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// Guardar resultados de análisis de amenazas
export async function POST(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()

    return await withTransaction(async (client) => {
      // Insertar en la tabla principal
      const result = await client.query(
        `
        INSERT INTO threat_intelligence (
          indicator, type, verdict, confidence, malware_family,
          first_seen, last_seen, detection_count, total_engines,
          raw_data, user_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
      `,
        [
          data.indicator,
          data.type,
          data.verdict,
          data.confidence,
          data.malware_family,
          data.first_seen,
          data.last_seen,
          data.detection_count,
          data.total_engines,
          JSON.stringify(data.raw_data),
          user.id,
        ],
      )

      const threatId = result.rows[0].id

      // Guardar categorías
      if (data.categories && data.categories.length > 0) {
        for (const category of data.categories) {
          await client.query(
            `
            INSERT INTO threat_categories (threat_intelligence_id, category)
            VALUES ($1, $2)
          `,
            [threatId, category],
          )
        }
      }

      // Guardar tags
      if (data.tags && data.tags.length > 0) {
        for (const tag of data.tags) {
          await client.query(
            `
            INSERT INTO threat_tags (threat_intelligence_id, tag)
            VALUES ($1, $2)
          `,
            [threatId, tag],
          )
        }
      }

      // Guardar actores de amenaza
      if (data.threat_actors && data.threat_actors.length > 0) {
        for (const actor of data.threat_actors) {
          await client.query(
            `
            INSERT INTO threat_actors (threat_intelligence_id, actor_name)
            VALUES ($1, $2)
          `,
            [threatId, actor],
          )
        }
      }

      // Guardar indicadores relacionados
      if (data.related_indicators && data.related_indicators.length > 0) {
        for (const indicator of data.related_indicators) {
          await client.query(
            `
            INSERT INTO related_indicators (
              threat_intelligence_id, indicator_type, indicator_value, relation
            ) VALUES ($1, $2, $3, $4)
          `,
            [threatId, indicator.type, indicator.value, indicator.relation],
          )
        }
      }

      return NextResponse.json({
        success: true,
        id: threatId,
        message: "Análisis de amenaza guardado correctamente",
      })
    })
  } catch (error) {
    console.error("Error al guardar análisis de amenaza:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al guardar el análisis de amenaza",
      },
      { status: 500 },
    )
  }
}

// Obtener todos los análisis de amenazas
export async function GET(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const indicator = searchParams.get("indicator")
    const type = searchParams.get("type")

    let queryText = `
      SELECT t.*,
        (SELECT json_agg(tc.*) FROM threat_categories tc WHERE tc.threat_intelligence_id = t.id) as categories,
        (SELECT json_agg(tt.*) FROM threat_tags tt WHERE tt.threat_intelligence_id = t.id) as tags,
        (SELECT json_agg(ta.*) FROM threat_actors ta WHERE ta.threat_intelligence_id = t.id) as threat_actors,
        (SELECT json_agg(ri.*) FROM related_indicators ri WHERE ri.threat_intelligence_id = t.id) as related_indicators
      FROM threat_intelligence t
    `

    const queryParams = []
    let whereClause = ""

    if (indicator) {
      whereClause = "WHERE t.indicator ILIKE $1"
      queryParams.push(`%${indicator}%`)
    } else if (type) {
      whereClause = "WHERE t.type = $1"
      queryParams.push(type)
    }

    queryText += whereClause + " ORDER BY t.created_at DESC"

    const result = await query(queryText, queryParams)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("Error al obtener análisis de amenazas:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los análisis de amenazas",
      },
      { status: 500 },
    )
  }
}
