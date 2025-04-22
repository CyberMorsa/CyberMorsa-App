import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SecurityScanner } from "@/components/security/security-scanner"
import { VulnerabilityChecker } from "@/components/security/vulnerability-checker"
import { PasswordAudit } from "@/components/security/password-audit"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Seguridad</h1>
        <p className="text-gray-200">Herramientas y análisis de seguridad para tus necesidades.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Estado de Seguridad</span>
            </CardTitle>
            <CardDescription className="text-gray-300">Estado general del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-white">Autenticación segura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-white">Variables de entorno protegidas</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-white">Actualización de seguridad pendiente</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar estado
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gray-800 border-gray-700 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Análisis de Seguridad</CardTitle>
            <CardDescription className="text-gray-300">Resultados del último análisis de seguridad</CardDescription>
          </CardHeader>
          <CardContent>
            <SecurityScanner />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Verificación de Vulnerabilidades</CardTitle>
            <CardDescription className="text-gray-300">
              Comprueba si tus sistemas tienen vulnerabilidades conocidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VulnerabilityChecker />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Auditoría de Contraseñas</CardTitle>
            <CardDescription className="text-gray-300">Verifica la seguridad de tus contraseñas</CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordAudit />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
