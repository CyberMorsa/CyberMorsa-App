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

// Funciones específicas para OSINT

// Guardar un perfil de objetivo
export async function saveTargetProfile(data: any, userId: string) {
  return withTransaction(async (client) => {
    // Insertar en la tabla principal
    const result = await client.query(
      `
      INSERT INTO osint_profiles (
        type, value, raw_data, user_id
      ) VALUES ($1, $2, $3, $4)
      RETURNING id
    `,
      [data.type, data.query, JSON.stringify(data), userId],
    )

    return result.rows[0].id
  })
}

// Obtener perfiles guardados
export async function getTargetProfiles(userId: string, type?: string, value?: string) {
  let queryText = `
    SELECT * FROM osint_profiles
    WHERE user_id = $1
  `
  const queryParams = [userId]

  if (type) {
    queryText += ` AND type = $${queryParams.length + 1}`
    queryParams.push(type)
  }

  if (value) {
    queryText += ` AND value ILIKE $${queryParams.length + 1}`
    queryParams.push(`%${value}%`)
  }

  queryText += ` ORDER BY created_at DESC`

  return query(queryText, queryParams)
}

// Guardar relación entre entidades
export async function saveRelationship(
  source: string,
  sourceType: string,
  target: string,
  targetType: string,
  relation: string,
  userId: string,
) {
  return query(
    `
    INSERT INTO osint_relationships (
      source, source_type, target, target_type, relation, user_id
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `,
    [source, sourceType, target, targetType, relation, userId],
  )
}

// Obtener relaciones para una entidad
export async function getRelationships(entity: string, entityType: string, userId: string) {
  return query(
    `
    SELECT * FROM osint_relationships
    WHERE (source = $1 AND source_type = $2)
       OR (target = $1 AND target_type = $2)
    AND user_id = $3
  `,
    [entity, entityType, userId],
  )
}

// Guardar elemento en watchlist
export async function saveWatchlistItem(
  type: string,
  value: string,
  notifyEmail: boolean,
  notifyTelegram: boolean,
  userId: string,
) {
  return query(
    `
    INSERT INTO osint_watchlist (
      type, value, notify_email, notify_telegram, user_id
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `,
    [type, value, notifyEmail, notifyTelegram, userId],
  )
}

// Obtener elementos de watchlist
export async function getWatchlistItems(userId: string) {
  return query(
    `
    SELECT w.*, a.count as alerts_count
    FROM osint_watchlist w
    LEFT JOIN (
      SELECT watchlist_id, COUNT(*) as count
      FROM osint_alerts
      WHERE is_read = false
      GROUP BY watchlist_id
    ) a ON w.id = a.watchlist_id
    WHERE w.user_id = $1
    ORDER BY w.created_at DESC
  `,
    [userId],
  )
}

// Guardar alerta para un elemento de watchlist
export async function saveAlert(watchlistId: number, message: string, severity: string) {
  return query(
    `
    INSERT INTO osint_alerts (
      watchlist_id, message, severity
    ) VALUES ($1, $2, $3)
    RETURNING id
  `,
    [watchlistId, message, severity],
  )
}

// Marcar alertas como leídas
export async function markAlertsAsRead(watchlistId: number) {
  return query(
    `
    UPDATE osint_alerts
    SET is_read = true
    WHERE watchlist_id = $1
  `,
    [watchlistId],
  )
}
