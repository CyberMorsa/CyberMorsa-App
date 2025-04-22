import { NextResponse } from "next/server"
import { query, withTransaction } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// Guardar resultados de análisis de IP
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
        INSERT INTO ip_intelligence (
          ip_address, hostname, country, region, city, 
          latitude, longitude, isp, organization, asn, 
          is_proxy, is_vpn, is_tor, is_hosting, 
          abuse_score, threat_level, user_id, raw_data
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING id
      `,
        [
          data.ip_address,
          data.hostname,
          data.country,
          data.region,
          data.city,
          data.latitude,
          data.longitude,
          data.isp,
          data.organization,
          data.asn,
          data.is_proxy,
          data.is_vpn,
          data.is_tor,
          data.is_hosting,
          data.abuse_score,
          data.threat_level,
          user.id,
          JSON.stringify(data.raw_data),
        ],
      )

      const ipIntelligenceId = result.rows[0].id

      // Guardar categorías de abuso si existen
      if (data.categories && data.categories.length > 0) {
        for (const category of data.categories) {
          await client.query(
            `
            INSERT INTO ip_abuse_categories (ip_intelligence_id, category)
            VALUES ($1, $2)
          `,
            [ipIntelligenceId, category],
          )
        }
      }

      // Guardar reportes de abuso si existen
      if (data.reports && data.reports.length > 0) {
        for (const report of data.reports) {
          await client.query(
            `
            INSERT INTO ip_abuse_reports (ip_intelligence_id, comment, reported_at)
            VALUES ($1, $2, $3)
          `,
            [ipIntelligenceId, report.comment, report.reported_at],
          )
        }
      }

      return NextResponse.json({
        success: true,
        id: ipIntelligenceId,
        message: "Análisis de IP guardado correctamente",
      })
    })
  } catch (error) {
    console.error("Error al guardar análisis de IP:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al guardar el análisis de IP",
      },
      { status: 500 },
    )
  }
}

// Obtener todos los análisis de IP
export async function GET(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const ipAddress = searchParams.get("ip")

    let queryText = `
      SELECT i.*, 
        array_agg(DISTINCT ac.category) as categories,
        array_agg(DISTINCT ar.comment) as reports
      FROM ip_intelligence i
      LEFT JOIN ip_abuse_categories ac ON i.id = ac.ip_intelligence_id
      LEFT JOIN ip_abuse_reports ar ON i.id = ar.ip_intelligence_id
    `

    const queryParams = []
    let whereClause = ""

    if (ipAddress) {
      whereClause = "WHERE i.ip_address = $1"
      queryParams.push(ipAddress)
    }

    queryText += whereClause + " GROUP BY i.id ORDER BY i.created_at DESC"

    const result = await query(queryText, queryParams)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("Error al obtener análisis de IP:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los análisis de IP",
      },
      { status: 500 },
    )
  }
}
