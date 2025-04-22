import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function RemindersPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Recordatorios</h1>
            <p className="text-muted-foreground">Organiza tus tareas y recordatorios por prioridad.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Todos los Recordatorios</CardTitle>
              <CardDescription>Visualiza todos tus recordatorios ordenados por prioridad.</CardDescription>
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
