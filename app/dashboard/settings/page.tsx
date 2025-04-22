import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-gray-400">Personaliza la aplicación según tus preferencias.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Preferencias Generales</CardTitle>
            <CardDescription>Configura las opciones generales de la aplicación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Modo Oscuro</Label>
                  <p className="text-sm text-gray-400">Activa el modo oscuro para reducir la fatiga visual</p>
                </div>
                <Switch id="dark-mode" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificaciones</Label>
                  <p className="text-sm text-gray-400">Recibe notificaciones sobre eventos importantes</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Analíticas</Label>
                  <p className="text-sm text-gray-400">Recopila datos anónimos para mejorar la aplicación</p>
                </div>
                <Switch id="analytics" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>Configura las opciones de seguridad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticación de dos factores</Label>
                  <p className="text-sm text-gray-400">Añade una capa adicional de seguridad</p>
                </div>
                <Switch id="two-factor" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="session-timeout">Tiempo de sesión extendido</Label>
                  <p className="text-sm text-gray-400">Mantén la sesión activa por más tiempo</p>
                </div>
                <Switch id="session-timeout" />
              </div>

              <div className="mt-6">
                <Button className="w-full bg-red-500 hover:bg-red-600">Cambiar Contraseña</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Configuración de APIs</CardTitle>
          <CardDescription>Gestiona las conexiones con APIs externas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-700">
              <div>
                <p className="text-sm font-medium">EmailRep.io</p>
                <p className="text-xs text-gray-400">API para análisis de correos</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                Configurar
              </Button>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-700">
              <div>
                <p className="text-sm font-medium">SecurityTrails</p>
                <p className="text-xs text-gray-400">API para análisis de dominios</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                Configurar
              </Button>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-gray-700">
              <div>
                <p className="text-sm font-medium">Shodan</p>
                <p className="text-xs text-gray-400">API para búsqueda de dispositivos</p>
              </div>
              <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-700">
                Configurar
              </Button>
            </div>

            <Button className="w-full mt-4">Añadir Nueva API</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
