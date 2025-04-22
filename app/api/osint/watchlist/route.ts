import { NextResponse } from "next/server"
import { saveWatchlistItem, getWatchlistItems, markAlertsAsRead } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// Guardar un elemento en la watchlist
export async function POST(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const watchlistId = await saveWatchlistItem(data.type, data.value, data.notifyEmail, data.notifyTelegram, user.id)

    return NextResponse.json({
      success: true,
      id: watchlistId,
      message: "Elemento añadido a la watchlist correctamente",
    })
  } catch (error) {
    console.error("Error al guardar elemento en watchlist:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al guardar el elemento en la watchlist",
      },
      { status: 500 },
    )
  }
}

// Obtener elementos de la watchlist
export async function GET(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const result = await getWatchlistItems(user.id)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("Error al obtener elementos de watchlist:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los elementos de la watchlist",
      },
      { status: 500 },
    )
  }
}

// Marcar alertas como leídas
export async function PATCH(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    await markAlertsAsRead(data.watchlistId)

    return NextResponse.json({
      success: true,
      message: "Alertas marcadas como leídas correctamente",
    })
  } catch (error) {
    console.error("Error al marcar alertas como leídas:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al marcar las alertas como leídas",
      },
      { status: 500 },
    )
  }
}
