import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"

export async function GET(request: Request) {
  try {
    // Verificar autenticación
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Consultar estadísticas de seguridad desde la base de datos
    const result = await query(
      `
      SELECT 
        to_char(date_trunc('month', event_date), 'Mon') as month,
        COUNT(CASE WHEN event_type = 'alert' THEN 1 END) as alerts,
        COUNT(CASE WHEN event_type = 'vulnerability' THEN 1 END) as vulnerabilities,
        COUNT(CASE WHEN event_type = 'access_attempt' THEN 1 END) as access_attempts
      FROM security_events
      WHERE user_id = $1
      GROUP BY date_trunc('month', event_date)
      ORDER BY date_trunc('month', event_date)
      `,
      [user.id],
    )

    // Si no hay datos, devolver un array vacío
    if (result.rowCount === 0) {
      return NextResponse.json([])
    }

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error al obtener estadísticas de seguridad:", error)
    return NextResponse.json({ error: "Error al obtener las estadísticas de seguridad" }, { status: 500 })
  }
}
