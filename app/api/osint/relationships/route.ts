import { NextResponse } from "next/server"
import { saveRelationship, getRelationships } from "@/lib/db"
import { verifyAuth } from "@/lib/auth"

// Guardar una relación
export async function POST(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const data = await request.json()
    const relationshipId = await saveRelationship(
      data.source,
      data.sourceType,
      data.target,
      data.targetType,
      data.relation,
      user.id,
    )

    return NextResponse.json({
      success: true,
      id: relationshipId,
      message: "Relación guardada correctamente",
    })
  } catch (error) {
    console.error("Error al guardar relación:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al guardar la relación",
      },
      { status: 500 },
    )
  }
}

// Obtener relaciones para una entidad
export async function GET(request: Request) {
  try {
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const entity = searchParams.get("entity")
    const entityType = searchParams.get("entityType")

    if (!entity || !entityType) {
      return NextResponse.json(
        {
          success: false,
          error: "Se requieren los parámetros entity y entityType",
        },
        { status: 400 },
      )
    }

    const result = await getRelationships(entity, entityType, user.id)

    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error("Error al obtener relaciones:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al obtener las relaciones",
      },
      { status: 500 },
    )
  }
}
