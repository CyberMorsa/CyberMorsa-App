import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailAnalyzer } from "@/components/osint/email-analyzer"
import { DomainScanner } from "@/components/osint/domain-scanner"
import { UsernameTracker } from "@/components/osint/username-tracker"
import { IpAnalyzer } from "@/components/osint/ip-analyzer"

export default function OsintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">OSINT</h1>
        <p className="text-gray-200">Herramientas de inteligencia de fuentes abiertas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Análisis de Email</CardTitle>
            <CardDescription className="text-gray-300">
              Verifica información sobre direcciones de correo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmailAnalyzer />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Análisis de Dominios</CardTitle>
            <CardDescription className="text-gray-300">Información sobre dominios y subdominios</CardDescription>
          </CardHeader>
          <CardContent>
            <DomainScanner />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Análisis de Usuarios</CardTitle>
            <CardDescription className="text-gray-300">Información sobre nombres de usuario</CardDescription>
          </CardHeader>
          <CardContent>
            <UsernameTracker />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Análisis de IP</CardTitle>
            <CardDescription className="text-gray-300">Información sobre direcciones IP</CardDescription>
          </CardHeader>
          <CardContent>
            <IpAnalyzer />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
