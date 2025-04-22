import { NextResponse } from "next/server"
import { saveTargetProfile, getTargetProfiles } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// Guardar un perfil de objetivo
export async function POST(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const profileId = await saveTargetProfile(data, user.id)

    return NextResponse.json({
      success: true,
      id: profileId,
      message: "Perfil guardado correctamente",
    })
  } catch (error) {
    console.error("Error al guardar perfil:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al guardar el perfil",
      },
      { status: 500 },
    )
  }
}

// Obtener perfiles guardados
export async function GET(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const value = searchParams.get("value")

    const result = await getTargetProfiles(user.id, type || undefined, value || undefined)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("Error al obtener perfiles:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener los perfiles",
      },
      { status: 500 },
    )
  }
}
