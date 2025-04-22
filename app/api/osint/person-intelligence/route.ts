import { NextResponse } from "next/server"
import { query, withTransaction } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// Guardar resultados de análisis de persona
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
        INSERT INTO person_intelligence (
          name, age, location, occupation, email, phone, risk_score, raw_data, user_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
      `,
        [
          data.name,
          data.age,
          data.location,
          data.occupation,
          data.email,
          data.phone,
          data.risk_score,
          JSON.stringify(data.raw_data),
          user.id,
        ],
      )

      const personId = result.rows[0].id

      // Guardar perfiles sociales
      if (data.social_profiles && data.social_profiles.length > 0) {
        for (const profile of data.social_profiles) {
          await client.query(
            `
            INSERT INTO person_social_profiles (person_intelligence_id, platform, username, url)
            VALUES ($1, $2, $3, $4)
          `,
            [personId, profile.platform, profile.username, profile.url],
          )
        }
      }

      // Guardar direcciones
      if (data.addresses && data.addresses.length > 0) {
        for (const address of data.addresses) {
          await client.query(
            `
            INSERT INTO person_addresses (
              person_intelligence_id, street, city, state, country, postal_code
            ) VALUES ($1, $2, $3, $4, $5, $6)
          `,
            [personId, address.street, address.city, address.state, address.country, address.postal_code],
          )
        }
      }

      // Guardar relaciones
      if (data.relations && data.relations.length > 0) {
        for (const relation of data.relations) {
          await client.query(
            `
            INSERT INTO person_relations (person_intelligence_id, related_name, relationship)
            VALUES ($1, $2, $3)
          `,
            [personId, relation.name, relation.relationship],
          )
        }
      }

      // Guardar factores de riesgo
      if (data.risk_factors && data.risk_factors.length > 0) {
        for (const factor of data.risk_factors) {
          await client.query(
            `
            INSERT INTO person_risk_factors (person_intelligence_id, factor)
            VALUES ($1, $2)
          `,
            [personId, factor],
          )
        }
      }

      return NextResponse.json({
        success: true,
        id: personId,
        message: "Análisis de persona guardado correctamente",
      })
    })
  } catch (error) {
    console.error("Error al guardar análisis de persona:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al guardar el análisis de persona",
      },
      { status: 500 },
    )
  }
}

// Obtener todos los análisis de personas
export async function GET(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")
    const email = searchParams.get("email")

    let queryText = `
      SELECT p.*,
        (SELECT json_agg(sp.*) FROM person_social_profiles sp WHERE sp.person_intelligence_id = p.id) as social_profiles,
        (SELECT json_agg(pa.*) FROM person_addresses pa WHERE pa.person_intelligence_id = p.id) as addresses,
        (SELECT json_agg(pr.*) FROM person_relations pr WHERE pr.person_intelligence_id = p.id) as relations,
        (SELECT json_agg(prf.*) FROM person_risk_factors prf WHERE prf.person_intelligence_id = p.id) as risk_factors
      FROM person_intelligence p
    `

    const queryParams = []
    let whereClause = ""

    if (name) {
      whereClause = "WHERE p.name ILIKE $1"
      queryParams.push(`%${name}%`)
    } else if (email) {
      whereClause = "WHERE p.email = $1"
      queryParams.push(email)
    }

    queryText += whereClause + " ORDER BY p.created_at DESC"

    const result = await query(queryText, queryParams)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("Error al obtener análisis de personas:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los análisis de personas",
      },
      { status: 500 },
    )
  }
}
