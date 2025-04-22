import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SecurityScoreCard } from "@/components/security/security-score-card"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { ThreatMap } from "@/components/dashboard/threat-map"
import { SecurityStats } from "@/components/dashboard/security-stats"
import { AlertCircle, ArrowRight, Shield, Database, Search } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-white">Dashboard</h1>
          <p className="text-gray-400">Bienvenido a CyberMorsa - Tu plataforma de ciberseguridad</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/security">
              <Shield className="mr-2 h-4 w-4" />
              Análisis de Seguridad
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/osint">
              <Search className="mr-2 h-4 w-4" />
              OSINT
            </Link>
          </Button>
        </div>
      </div>

      <Alert variant="destructive" className="bg-red-900/20 border-red-900">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Alerta de Seguridad</AlertTitle>
        <AlertDescription>
          Se han detectado 3 vulnerabilidades críticas en tu infraestructura. Revisa el informe de seguridad para más
          detalles.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SecurityScoreCard />
        <Card className="bg-gray-800 border-gray-700 col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Actividad Reciente</CardTitle>
            <CardDescription>Últimas actividades detectadas en tu red</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Estadísticas de Seguridad</CardTitle>
            <CardDescription>Resumen de eventos de seguridad</CardDescription>
          </CardHeader>
          <CardContent>
            <SecurityStats />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Mapa de Amenazas</CardTitle>
            <CardDescription>Distribución geográfica de amenazas detectadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ThreatMap />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Estado de APIs</CardTitle>
            <CardDescription>Conexión con servicios externos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">SecurityTrails</span>
                <Badge className="bg-green-500/20 text-green-400">Conectado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Shodan</span>
                <Badge className="bg-green-500/20 text-green-400">Conectado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">AlienVault OTX</span>
                <Badge className="bg-red-500/20 text-red-400">Desconectado</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">VirusTotal</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">Limitado</Badge>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/settings">Configurar APIs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Base de Datos</CardTitle>
            <CardDescription>Estado de la base de datos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Uso de almacenamiento</span>
                  <span className="text-sm text-gray-300">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Registros totales</span>
                  <span className="text-sm text-white">12,458</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">Última actualización</span>
                  <span className="text-sm text-white">Hace 5 minutos</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/dashboard/database">
                  <Database className="mr-2 h-4 w-4" />
                  Gestionar Base de Datos
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Acciones Rápidas</CardTitle>
            <CardDescription>Accesos directos a funciones comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link href="/dashboard/osint/email-intelligence">
                  Análisis de Email
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link href="/dashboard/osint/ip-intelligence">
                  Análisis de IP
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link href="/dashboard/osint/domain-scanner">
                  Escaneo de Dominio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-between" asChild>
                <Link href="/dashboard/security/vulnerability-checker">
                  Verificar Vulnerabilidades
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
