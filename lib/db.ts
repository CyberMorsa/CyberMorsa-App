import { Pool } from "pg"

// Configuración de la conexión a la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario para conexiones a Neon DB
  },
})

// Función para ejecutar consultas SQL
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Consulta ejecutada", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Error al ejecutar consulta", { text, error })
    throw error
  }
}

// Función para transacciones
export async function withTransaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}
