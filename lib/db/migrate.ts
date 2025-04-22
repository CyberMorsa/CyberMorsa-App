import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

// Este script se ejecuta para aplicar migraciones a la base de datos
async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
  }

  const sql = postgres(process.env.DATABASE_URL, { max: 1 })
  const db = drizzle(sql)

  console.log("Running migrations...")

  await migrate(db, { migrationsFolder: "drizzle" })

  console.log("Migrations completed!")

  await sql.end()
  process.exit(0)
}

main().catch((err) => {
  console.error("Migration failed:")
  console.error(err)
  process.exit(1)
})
