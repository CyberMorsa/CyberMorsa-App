import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Verificamos que la URL de la base de datos esté definida
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

// Creamos una conexión a la base de datos
const client = postgres(process.env.DATABASE_URL)
export const db = drizzle(client, { schema })
