import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SavedEmails } from "@/components/saved/saved-emails"
import { SavedDomains } from "@/components/saved/saved-domains"
import { SavedIps } from "@/components/saved/saved-ips"
import { SavedUsernames } from "@/components/saved/saved-usernames"

export default function SavedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Datos Guardados</h1>
        <p className="text-muted-foreground">Consulta tus búsquedas y datos guardados anteriormente.</p>
      </div>

      <Tabs defaultValue="emails" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="domains">Dominios</TabsTrigger>
          <TabsTrigger value="ips">IPs</TabsTrigger>
          <TabsTrigger value="usernames">Usuarios</TabsTrigger>
        </TabsList>
        <TabsContent value="emails">
          <Card>
            <CardHeader>
              <CardTitle>Emails Guardados</CardTitle>
              <CardDescription>Lista de emails que has guardado anteriormente.</CardDescription>
            </CardHeader>
            <CardContent>
              <SavedEmails />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="domains">
          <Card>
            <CardHeader>
              <CardTitle>Dominios Guardados</CardTitle>
              <CardDescription>Lista de dominios que has guardado anteriormente.</CardDescription>
            </CardHeader>
            <CardContent>
              <SavedDomains />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ips">
          <Card>
            <CardHeader>
              <CardTitle>IPs Guardadas</CardTitle>
              <CardDescription>Lista de IPs que has guardado anteriormente.</CardDescription>
            </CardHeader>
            <CardContent>
              <SavedIps />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usernames">
          <Card>
            <CardHeader>
              <CardTitle>Usuarios Guardados</CardTitle>
              <CardDescription>Lista de usuarios que has guardado anteriormente.</CardDescription>
            </CardHeader>
            <CardContent>
              <SavedUsernames />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
