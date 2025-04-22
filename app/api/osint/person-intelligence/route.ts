import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { osintService } from "@/lib/osint-service"
import { saveTargetProfile } from "@/lib/db"

export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener datos de la solicitud
    const data = await request.json()
    const { query, queryType } = data

    if (!query) {
      return NextResponse.json({ error: "Se requiere un término de búsqueda" }, { status: 400 })
    }

    let result

    // Verificar si tenemos las claves API necesarias
    const hasApiKeys = osintService.hasRequiredApiKeys()

    if (!hasApiKeys) {
      // Si no hay claves API, devolver un mensaje de error
      return NextResponse.json(
        {
          error: "No se han configurado las claves API necesarias para realizar búsquedas OSINT reales",
          needsApiKeys: true,
        },
        { status: 400 },
      )
    }

    // Realizar la búsqueda según el tipo de consulta
    switch (queryType) {
      case "email":
        result = await osintService.searchByEmail(query)
        break
      case "username":
        result = await osintService.searchByUsername(query)
        break
      case "name":
        // Para nombres, podríamos implementar una búsqueda más compleja
        // Por ahora, devolvemos un mensaje de que no está implementado
        return NextResponse.json({ error: "La búsqueda por nombre completo aún no está implementada" }, { status: 501 })
      case "phone":
        // Para teléfonos, podríamos implementar una búsqueda más compleja
        // Por ahora, devolvemos un mensaje de que no está implementado
        return NextResponse.json(
          { error: "La búsqueda por número de teléfono aún no está implementada" },
          { status: 501 },
        )
      default:
        return NextResponse.json({ error: "Tipo de consulta no válido" }, { status: 400 })
    }

    // Guardar el perfil en la base de datos
    const profileId = await saveTargetProfile(
      {
        type: queryType,
        query,
        raw_data: JSON.stringify(result),
      },
      user.id,
    )

    // Añadir el ID del perfil al resultado
    result.id = profileId

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error al procesar la solicitud OSINT:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud OSINT" }, { status: 500 })
  }
}
