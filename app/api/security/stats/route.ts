import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const userId = session.user.id

    // Consulta para obtener estadísticas de seguridad de los últimos 7 días
    const result = await query(
      `
      SELECT 
        TO_CHAR(date, 'Dy') as name,
        COUNT(CASE WHEN type = 'alert' THEN 1 END) as alertas,
        COUNT(CASE WHEN type = 'vulnerability' THEN 1 END) as vulnerabilidades,
        COUNT(CASE WHEN type = 'access_attempt' THEN 1 END) as intentos
      FROM security_events
      WHERE 
        user_id = $1 
        AND date >= CURRENT_DATE - INTERVAL '6 days'
      GROUP BY TO_CHAR(date, 'Dy'), date
      ORDER BY date
    `,
      [userId],
    )

    // Si no hay datos, generamos datos vacíos para los últimos 7 días
    if (result.rows.length === 0) {
      const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
      const emptyData = days.map((day) => ({
        name: day,
        alertas: 0,
        vulnerabilidades: 0,
        intentos: 0,
      }))

      return NextResponse.json(emptyData)
    }

    // Aseguramos que tenemos datos para todos los días
    const dayMap: Record<string, any> = {
      Mon: "Lun",
      Tue: "Mar",
      Wed: "Mié",
      Thu: "Jue",
      Fri: "Vie",
      Sat: "Sáb",
      Sun: "Dom",
    }

    // Traducimos los nombres de días si están en inglés
    const formattedData = result.rows.map((row) => ({
      ...row,
      name: dayMap[row.name] || row.name,
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Error al obtener estadísticas de seguridad:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
