import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailSearch } from "@/components/osint/email-search"
import { DomainSearch } from "@/components/osint/domain-search"
import { IpSearch } from "@/components/osint/ip-search"
import { UsernameSearch } from "@/components/osint/username-search"

export default function OsintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Herramientas OSINT</h1>
        <p className="text-muted-foreground">Busca información sobre emails, dominios, IPs y nombres de usuario.</p>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="domain">Dominio</TabsTrigger>
          <TabsTrigger value="ip">IP</TabsTrigger>
          <TabsTrigger value="username">Usuario</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Búsqueda de Email</CardTitle>
              <CardDescription>Busca información sobre direcciones de correo electrónico.</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailSearch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle>Búsqueda de Dominio</CardTitle>
              <CardDescription>Busca información sobre dominios web.</CardDescription>
            </CardHeader>
            <CardContent>
              <DomainSearch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ip">
          <Card>
            <CardHeader>
              <CardTitle>Búsqueda de IP</CardTitle>
              <CardDescription>Busca información sobre direcciones IP.</CardDescription>
            </CardHeader>
            <CardContent>
              <IpSearch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="username">
          <Card>
            <CardHeader>
              <CardTitle>Búsqueda de Usuario</CardTitle>
              <CardDescription>Busca información sobre nombres de usuario en diferentes plataformas.</CardDescription>
            </CardHeader>
            <CardContent>
              <UsernameSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
