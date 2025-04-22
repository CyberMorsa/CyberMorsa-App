import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CybersecurityPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Herramientas de Ciberseguridad</h1>
            <p className="text-muted-foreground">Utilidades para tus estudios y prácticas de ciberseguridad.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generador de Contraseñas</CardTitle>
              <CardDescription>Genera contraseñas seguras con diferentes parámetros.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Funcionalidad en desarrollo.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
