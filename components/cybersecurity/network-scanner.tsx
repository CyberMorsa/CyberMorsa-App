"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function NetworkScanner() {
  const [domain, setDomain] = useState("")
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(false)
  const [dnsResults, setDnsResults] = useState<any>(null)
  const [whoisResults, setWhoisResults] = useState<any>(null)
  const { toast } = useToast()

  const performDnsLookup = async () => {
    if (!domain) return

    setLoading(true)
    setDnsResults(null)

    try {
      // Simulamos una búsqueda DNS
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo
      setDnsResults({
        a: ["192.168.1.1", "192.168.1.2"],
        aaaa: ["2001:0db8:85a3:0000:0000:8a2e:0370:7334"],
        mx: ["mail.example.com", "mail2.example.com"],
        ns: ["ns1.example.com", "ns2.example.com"],
        txt: ["v=spf1 include:_spf.example.com ~all"],
        soa: {
          primary: "ns1.example.com",
          admin: "admin.example.com",
          serial: "2023121001",
          refresh: "3600",
          retry: "1800",
          expire: "604800",
          ttl: "86400",
        },
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al realizar la búsqueda DNS.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const performWhoisLookup = async () => {
    if (!domain && !ip) return

    setLoading(true)
    setWhoisResults(null)

    try {
      // Simulamos una búsqueda WHOIS
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Datos de ejemplo
      setWhoisResults({
        domain: domain || "example.com",
        registrar: "Example Registrar, Inc.",
        registrantName: "John Doe",
        registrantOrg: "Example Organization",
        registrantCountry: "US",
        createdDate: "2010-08-15T23:00:00Z",
        updatedDate: "2022-08-15T23:00:00Z",
        expiryDate: "2024-08-15T23:00:00Z",
        status: ["clientTransferProhibited", "serverDeleteProhibited"],
        nameservers: ["ns1.example.com", "ns2.example.com"],
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al realizar la búsqueda WHOIS.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="dns" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dns">Búsqueda DNS</TabsTrigger>
          <TabsTrigger value="whois">WHOIS</TabsTrigger>
        </TabsList>

        <TabsContent value="dns" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Dominio</Label>
            <div className="flex gap-2">
              <Input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="ejemplo.com" />
              <Button onClick={performDnsLookup} disabled={!domain || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Buscar
              </Button>
            </div>
          </div>

          {dnsResults && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Registros A</h3>
                  <div className="bg-muted p-2 rounded-md">
                    {dnsResults.a.map((record: string, index: number) => (
                      <div key={index} className="font-mono text-xs">
                        {record}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Registros AAAA</h3>
                  <div className="bg-muted p-2 rounded-md">
                    {dnsResults.aaaa.map((record: string, index: number) => (
                      <div key={index} className="font-mono text-xs">
                        {record}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Registros MX</h3>
                  <div className="bg-muted p-2 rounded-md">
                    {dnsResults.mx.map((record: string, index: number) => (
                      <div key={index} className="font-mono text-xs">
                        {record}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Registros NS</h3>
                  <div className="bg-muted p-2 rounded-md">
                    {dnsResults.ns.map((record: string, index: number) => (
                      <div key={index} className="font-mono text-xs">
                        {record}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Registros TXT</h3>
                  <div className="bg-muted p-2 rounded-md">
                    {dnsResults.txt.map((record: string, index: number) => (
                      <div key={index} className="font-mono text-xs">
                        {record}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Registro SOA</h3>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="font-mono text-xs">Primary: {dnsResults.soa.primary}</div>
                    <div className="font-mono text-xs">Admin: {dnsResults.soa.admin}</div>
                    <div className="font-mono text-xs">Serial: {dnsResults.soa.serial}</div>
                    <div className="font-mono text-xs">Refresh: {dnsResults.soa.refresh}</div>
                    <div className="font-mono text-xs">Retry: {dnsResults.soa.retry}</div>
                    <div className="font-mono text-xs">Expire: {dnsResults.soa.expire}</div>
                    <div className="font-mono text-xs">TTL: {dnsResults.soa.ttl}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="whois" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="domain-ip">Dominio o IP</Label>
            <div className="flex gap-2">
              <Input
                id="domain-ip"
                value={domain || ip}
                onChange={(e) => {
                  // Determinar si es un dominio o IP
                  const value = e.target.value
                  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(value)) {
                    setIp(value)
                    setDomain("")
                  } else {
                    setDomain(value)
                    setIp("")
                  }
                }}
                placeholder="ejemplo.com o 192.168.1.1"
              />
              <Button onClick={performWhoisLookup} disabled={(!domain && !ip) || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Buscar
              </Button>
            </div>
          </div>

          {whoisResults && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Dominio</p>
                      <p className="font-medium">{whoisResults.domain}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Registrador</p>
                      <p className="font-medium">{whoisResults.registrar}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Registrante</p>
                      <p className="font-medium">{whoisResults.registrantName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Organización</p>
                      <p className="font-medium">{whoisResults.registrantOrg}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">País</p>
                      <p className="font-medium">{whoisResults.registrantCountry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Creado</p>
                      <p className="font-medium">{new Date(whoisResults.createdDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Actualizado</p>
                      <p className="font-medium">{new Date(whoisResults.updatedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expira</p>
                      <p className="font-medium">{new Date(whoisResults.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {whoisResults.status.map((status: string, index: number) => (
                        <span key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Servidores de nombres</p>
                    <div className="flex flex-col gap-1 mt-1">
                      {whoisResults.nameservers.map((ns: string, index: number) => (
                        <span key={index} className="font-mono text-xs">
                          {ns}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
