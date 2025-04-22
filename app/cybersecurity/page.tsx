import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PasswordGenerator } from "@/components/cybersecurity/password-generator"
import { HashCalculator } from "@/components/cybersecurity/hash-calculator"
import { EncoderDecoder } from "@/components/cybersecurity/encoder-decoder"
import { NetworkScanner } from "@/components/cybersecurity/network-scanner"

export default function CybersecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Herramientas de Ciberseguridad</h1>
        <p className="text-muted-foreground">Utilidades para tus estudios y prácticas de ciberseguridad.</p>
      </div>

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="password">Contraseñas</TabsTrigger>
          <TabsTrigger value="hash">Hashes</TabsTrigger>
          <TabsTrigger value="encoder">Codificación</TabsTrigger>
          <TabsTrigger value="network">Red</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Generador de Contraseñas</CardTitle>
              <CardDescription>Genera contraseñas seguras con diferentes parámetros.</CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordGenerator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hash">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Hashes</CardTitle>
              <CardDescription>Calcula diferentes tipos de hashes para un texto dado.</CardDescription>
            </CardHeader>
            <CardContent>
              <HashCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encoder">
          <Card>
            <CardHeader>
              <CardTitle>Codificador/Decodificador</CardTitle>
              <CardDescription>Codifica y decodifica texto en diferentes formatos.</CardDescription>
            </CardHeader>
            <CardContent>
              <EncoderDecoder />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Herramientas de Red</CardTitle>
              <CardDescription>Utilidades para análisis de red y DNS.</CardDescription>
            </CardHeader>
            <CardContent>
              <NetworkScanner />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
