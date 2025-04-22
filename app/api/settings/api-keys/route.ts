import { NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { query } from "@/lib/db"

// Función para obtener las claves API del usuario
export async function GET(request: Request) {
  try {
    // Verificar autenticación
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Consultar las claves API del usuario
    const result = await query(`SELECT key_name, has_key FROM user_api_keys WHERE user_id = $1`, [user.id])

    // Transformar el resultado a un objeto
    const apiKeys: Record<string, boolean> = {}
    result.rows.forEach((row: { key_name: string; has_key: boolean }) => {
      apiKeys[row.key_name] = row.has_key
    })

    return NextResponse.json(apiKeys)
  } catch (error) {
    console.error("Error al obtener claves API:", error)
    return NextResponse.json({ error: "Error al obtener las claves API" }, { status: 500 })
  }
}

// Función para guardar las claves API del usuario
export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const user = await verifyAuth()
    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener las claves API del cuerpo de la solicitud
    const apiKeys = await request.json()

    // Validar que las claves API sean válidas
    const validKeyNames = ["emailRep", "hunter", "haveibeenpwned", "fullcontact", "clearbit", "shodan"]

    // Guardar cada clave API en la base de datos
    for (const keyName of validKeyNames) {
      const keyValue = apiKeys[keyName]

      // Si la clave tiene un valor, la guardamos (o actualizamos)
      if (keyValue) {
        await query(
          `
          INSERT INTO user_api_keys (user_id, key_name, key_value, has_key)
          VALUES ($1, $2, $3, true)
          ON CONFLICT (user_id, key_name)
          DO UPDATE SET key_value = $3, has_key = true
          `,
          [user.id, keyName, keyValue],
        )
      } else {
        // Si la clave no tiene valor, actualizamos has_key a false
        await query(
          `
          INSERT INTO user_api_keys (user_id, key_name, key_value, has_key)
          VALUES ($1, $2, '', false)
          ON CONFLICT (user_id, key_name)
          DO UPDATE SET has_key = false
          `,
          [user.id, keyName],
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al guardar claves API:", error)
    return NextResponse.json({ error: "Error al guardar las claves API" }, { status: 500 })
  }
}
