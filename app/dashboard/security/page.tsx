import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecurityScanner } from "@/components/security/security-scanner"
import { VulnerabilityChecker } from "@/components/security/vulnerability-checker"
import { PasswordAudit } from "@/components/security/password-audit"
import { NetworkScanner } from "@/components/security/network-scanner"
import { SecurityReport } from "@/components/security/security-report"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Seguridad</h1>
        <p className="text-gray-400">Herramientas para analizar y mejorar la seguridad de tu infraestructura.</p>
      </div>

      <Tabs defaultValue="scanner" className="space-y-4">
        <TabsList className="bg-gray-800 p-1">
          <TabsTrigger value="scanner" className="data-[state=active]:bg-gray-700">
            Escáner
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-gray-700">
            Vulnerabilidades
          </TabsTrigger>
          <TabsTrigger value="passwords" className="data-[state=active]:bg-gray-700">
            Contraseñas
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-gray-700">
            Red
          </TabsTrigger>
          <TabsTrigger value="report" className="data-[state=active]:bg-gray-700">
            Informe
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Escáner de Seguridad</CardTitle>
              <CardDescription>Analiza la seguridad de tu sistema y detecta posibles vulnerabilidades</CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityScanner />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Verificador de Vulnerabilidades</CardTitle>
              <CardDescription>Comprueba si tu sistema tiene vulnerabilidades conocidas</CardDescription>
            </CardHeader>
            <CardContent>
              <VulnerabilityChecker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passwords" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Auditoría de Contraseñas</CardTitle>
              <CardDescription>Verifica la fortaleza de tus contraseñas y si han sido comprometidas</CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordAudit />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Escáner de Red</CardTitle>
              <CardDescription>Analiza tu red para detectar dispositivos y servicios</CardDescription>
            </CardHeader>
            <CardContent>
              <NetworkScanner />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="mt-0">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Informe de Seguridad</CardTitle>
              <CardDescription>Resumen completo del estado de seguridad de tu sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityReport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
