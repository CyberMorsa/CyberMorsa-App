import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Users, Search, Database, Calendar, Shield } from "lucide-react"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const username = session?.user?.name || "Usuario"

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Bienvenido, {username}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Plataforma para herramientas OSINT, ciberseguridad y aplicaciones personales, todo en un solo lugar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              OSINT
            </CardTitle>
            <CardDescription>Herramientas de búsqueda y análisis de información</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Busca información sobre emails, dominios, IPs y más.</p>
            <Button asChild>
              <Link href="/osint">
                Explorar <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Contador de Actividades
            </CardTitle>
            <CardDescription>Lleva el conteo de actividades con tu pareja</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Registra puntos y mantén un seguimiento de actividades compartidas.</p>
            <Button asChild>
              <Link href="/activities">
                Ir al contador <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recordatorios
            </CardTitle>
            <CardDescription>Organiza tus tareas por prioridad</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Gestiona tus recordatorios y tareas con un sistema de prioridades.</p>
            <Button asChild>
              <Link href="/reminders">
                Ver recordatorios <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Ciberseguridad
            </CardTitle>
            <CardDescription>Herramientas para tus estudios</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Utilidades para tus estudios y prácticas de ciberseguridad.</p>
            <Button asChild>
              <Link href="/cybersecurity">
                Ver herramientas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Datos Guardados
            </CardTitle>
            <CardDescription>Consulta tus búsquedas y datos guardados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Accede a todas tus búsquedas y datos guardados anteriormente.</p>
            <Button asChild>
              <Link href="/saved">
                Ver datos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
