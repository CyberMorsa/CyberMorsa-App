import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function SavedPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Datos Guardados</h1>
            <p className="text-muted-foreground">Consulta tus búsquedas y datos guardados anteriormente.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emails Guardados</CardTitle>
              <CardDescription>Lista de emails que has guardado anteriormente.</CardDescription>
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
