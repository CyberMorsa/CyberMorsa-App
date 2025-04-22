import { NextResponse } from "next/server"
import { saveAlert } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// Guardar una alerta
export async function POST(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const alertId = await saveAlert(data.watchlistId, data.message, data.severity)

    return NextResponse.json({
      success: true,
      id: alertId,
      message: "Alerta guardada correctamente",
    })
  } catch (error) {
    console.error("Error al guardar alerta:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al guardar la alerta",
      },
      { status: 500 },
    )
  }
}
