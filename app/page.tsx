import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold">OSINT Personal</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="container max-w-5xl py-12 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block p-2 bg-primary/10 rounded-full mb-4">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">OSINT Personal</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plataforma para herramientas OSINT, ciberseguridad y aplicaciones personales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-lg p-6 space-y-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Herramientas OSINT</h3>
              <p className="text-muted-foreground">
                Busca información sobre emails, dominios, IPs y nombres de usuario.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 space-y-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Ciberseguridad</h3>
              <p className="text-muted-foreground">Utilidades para tus estudios y prácticas de ciberseguridad.</p>
            </div>

            <div className="bg-card border rounded-lg p-6 space-y-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Aplicaciones Personales</h3>
              <p className="text-muted-foreground">Gestiona actividades, recordatorios y más en un solo lugar.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="animate-pulse">
              <Link href="/login">
                Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-muted/40">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span className="font-medium">OSINT Personal</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OSINT Personal. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
