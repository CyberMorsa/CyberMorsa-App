import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function OsintPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Herramientas OSINT</h1>
            <p className="text-muted-foreground">Busca información sobre emails, dominios, IPs y nombres de usuario.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Búsqueda de Email</CardTitle>
              <CardDescription>Busca información sobre direcciones de correo electrónico.</CardDescription>
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
