"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  Globe,
  FileCode,
  Download,
  ExternalLink,
  Info,
  Zap,
  Lock,
  Unlock,
  MapPin,
  Calendar,
} from "lucide-react"

export default function ThreatIntelligencePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [threatData, setThreatData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError(null)

    // Simulación de búsqueda
    setTimeout(() => {
      // Detectar si es una IP, dominio, hash o URL
      let type = "unknown"
      let data = null

      // IP regex (simple)
      if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(searchQuery)) {
        type = "ip"
        data = generateIpThreatData(searchQuery)
      }
      // Domain regex (simple)
      else if (/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(searchQuery)) {
        type = "domain"
        data = generateDomainThreatData(searchQuery)
      }
      // URL regex (simple)
      else if (/^https?:\/\//i.test(searchQuery)) {
        type = "url"
        data = generateUrlThreatData(searchQuery)
      }
      // Hash regex (MD5, SHA1, SHA256)
      else if (
        /^[a-f0-9]{32}$/i.test(searchQuery) ||
        /^[a-f0-9]{40}$/i.test(searchQuery) ||
        /^[a-f0-9]{64}$/i.test(searchQuery)
      ) {
        type = "hash"
        data = generateHashThreatData(searchQuery)
      } else {
        setError("Formato no reconocido. Introduce una IP, dominio, URL o hash.")
      }

      setThreatData(data)
      setIsLoading(false)
    }, 1500)
  }

  // Función para generar datos de amenaza para IP
  const generateIpThreatData = (ip: string) => {
    // Generamos un hash simple para el IP para tener consistencia
    const ipHash = ip.split(".").reduce((acc, octet) => acc + Number.parseInt(octet), 0)

    const malicious = ipHash % 3 === 0
    const suspicious = !malicious && ipHash % 2 === 0

    return {
      type: "ip",
      value: ip,
      threatScore: malicious ? 85 + (ipHash % 15) : suspicious ? 50 + (ipHash % 30) : 10 + (ipHash % 30),
      classification: malicious ? "malicious" : suspicious ? "suspicious" : "clean",
      lastSeen: "2023-05-15",
      firstSeen: "2022-11-23",
      location: {
        country: ["Estados Unidos", "Rusia", "China", "Brasil", "India"][ipHash % 5],
        city: ["Nueva York", "Moscú", "Beijing", "São Paulo", "Mumbai"][ipHash % 5],
        coordinates: [40.7128, -74.006],
      },
      asn: {
        number: `AS${10000 + (ipHash % 50000)}`,
        name: ["Amazon AWS", "Google Cloud", "Microsoft Azure", "Digital Ocean", "OVH"][ipHash % 5],
      },
      categories: malicious
        ? ["Malware", "Botnet", "Spam", "Phishing"].slice(0, 1 + (ipHash % 4))
        : suspicious
          ? ["Suspicious", "Anonymizer", "Proxy"].slice(0, 1 + (ipHash % 3))
          : ["Clean"],
      relatedIps: [
        `192.168.${ipHash % 255}.${(ipHash + 1) % 255}`,
        `192.168.${ipHash % 255}.${(ipHash + 2) % 255}`,
        `192.168.${ipHash % 255}.${(ipHash + 3) % 255}`,
      ],
      ports: [80, 443, 22, 21, 25, 3389].slice(0, 2 + (ipHash % 5)),
      reports: malicious
        ? [
            {
              source: "VirusTotal",
              date: "2023-04-12",
              details: "Detectado como parte de una red de botnet",
            },
            {
              source: "AbuseIPDB",
              date: "2023-03-28",
              details: "Reportado por actividad de escaneo",
            },
          ]
        : suspicious
          ? [
              {
                source: "AbuseIPDB",
                date: "2023-02-15",
                details: "Actividad sospechosa detectada",
              },
            ]
          : [],
    }
  }

  // Función para generar datos de amenaza para dominio
  const generateDomainThreatData = (domain: string) => {
    // Generamos un hash simple para el dominio para tener consistencia
    const domainHash = domain.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const malicious = domainHash % 3 === 0
    const suspicious = !malicious && domainHash % 2 === 0

    return {
      type: "domain",
      value: domain,
      threatScore: malicious ? 85 + (domainHash % 15) : suspicious ? 50 + (domainHash % 30) : 10 + (domainHash % 30),
      classification: malicious ? "malicious" : suspicious ? "suspicious" : "clean",
      lastSeen: "2023-05-15",
      firstSeen: "2022-11-23",
      registrar: ["GoDaddy", "Namecheap", "Google Domains", "NameSilo", "Cloudflare"][domainHash % 5],
      registrationDate: "2020-03-15",
      expirationDate: "2025-03-15",
      nameservers: [`ns1.${domain}`, `ns2.${domain}`],
      ipAddresses: [
        `192.168.${domainHash % 255}.${(domainHash + 1) % 255}`,
        `192.168.${domainHash % 255}.${(domainHash + 2) % 255}`,
      ],
      categories: malicious
        ? ["Malware", "Phishing", "Spam", "Scam"].slice(0, 1 + (domainHash % 4))
        : suspicious
          ? ["Suspicious", "Newly Registered", "Typosquatting"].slice(0, 1 + (domainHash % 3))
          : ["Clean"],
      ssl: {
        valid: domainHash % 4 !== 0,
        issuer: ["Let's Encrypt", "DigiCert", "Comodo", "GeoTrust"][domainHash % 4],
        validFrom: "2023-01-15",
        validTo: "2024-01-15",
      },
      reports: malicious
        ? [
            {
              source: "VirusTotal",
              date: "2023-04-12",
              details: "Detectado como sitio de phishing",
            },
            {
              source: "PhishTank",
              date: "2023-03-28",
              details: "Reportado como sitio fraudulento",
            },
          ]
        : suspicious
          ? [
              {
                source: "URLhaus",
                date: "2023-02-15",
                details: "Actividad sospechosa detectada",
              },
            ]
          : [],
    }
  }

  // Función para generar datos de amenaza para URL
  const generateUrlThreatData = (url: string) => {
    // Generamos un hash simple para la URL para tener consistencia
    const urlHash = url.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const malicious = urlHash % 3 === 0
    const suspicious = !malicious && urlHash % 2 === 0

    // Extraer dominio de la URL (simplificado)
    const domainMatch = url.match(/^https?:\/\/([^/]+)/)
    const domain = domainMatch ? domainMatch[1] : "example.com"

    return {
      type: "url",
      value: url,
      domain: domain,
      threatScore: malicious ? 85 + (urlHash % 15) : suspicious ? 50 + (urlHash % 30) : 10 + (urlHash % 30),
      classification: malicious ? "malicious" : suspicious ? "suspicious" : "clean",
      lastSeen: "2023-05-15",
      firstSeen: "2022-11-23",
      categories: malicious
        ? ["Malware", "Phishing", "Spam", "Scam"].slice(0, 1 + (urlHash % 4))
        : suspicious
          ? ["Suspicious", "Redirector", "Clickbait"].slice(0, 1 + (urlHash % 3))
          : ["Clean"],
      redirects:
        suspicious || malicious ? [`https://redirect1.${domain}/path`, `https://redirect2.${domain}/path`] : [],
      technologies: ["WordPress", "PHP", "jQuery", "Bootstrap", "Google Analytics"].slice(0, 2 + (urlHash % 4)),
      screenshot: "/placeholder.svg?height=300&width=500",
      reports: malicious
        ? [
            {
              source: "VirusTotal",
              date: "2023-04-12",
              details: "Detectado como sitio de phishing",
            },
            {
              source: "PhishTank",
              date: "2023-03-28",
              details: "Reportado como sitio fraudulento",
            },
          ]
        : suspicious
          ? [
              {
                source: "URLhaus",
                date: "2023-02-15",
                details: "Actividad sospechosa detectada",
              },
            ]
          : [],
    }
  }

  // Función para generar datos de amenaza para hash
  const generateHashThreatData = (hash: string) => {
    // Generamos un valor basado en la longitud del hash
    const hashType = hash.length === 32 ? "MD5" : hash.length === 40 ? "SHA1" : "SHA256"
    const hashValue = hash.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

    const malicious = hashValue % 3 === 0
    const suspicious = !malicious && hashValue % 2 === 0

    return {
      type: "hash",
      value: hash,
      hashType: hashType,
      threatScore: malicious ? 85 + (hashValue % 15) : suspicious ? 50 + (hashValue % 30) : 10 + (hashValue % 30),
      classification: malicious ? "malicious" : suspicious ? "suspicious" : "clean",
      lastSeen: "2023-05-15",
      firstSeen: "2022-11-23",
      fileInfo: {
        name: `malware_${hashValue % 1000}.${["exe", "dll", "js", "vbs", "ps1"][hashValue % 5]}`,
        size: 100 + (hashValue % 900) + " KB",
        type: ["Ejecutable Windows", "Biblioteca DLL", "Script JavaScript", "Script VBScript", "PowerShell Script"][
          hashValue % 5
        ],
      },
      categories: malicious
        ? ["Trojan", "Ransomware", "Spyware", "Backdoor", "Worm"].slice(0, 1 + (hashValue % 5))
        : suspicious
          ? ["Suspicious", "PUA", "Adware"].slice(0, 1 + (hashValue % 3))
          : ["Clean"],
      detectionRatio: malicious ? `${30 + (hashValue % 40)}/70` : suspicious ? `${5 + (hashValue % 25)}/70` : "0/70",
      signatures: malicious
        ? [
            {
              name: ["Trojan.Win32.Generic", "Ransom.Win32.WannaCry", "Backdoor.Win32.BlackEnergy"][hashValue % 3],
              vendor: ["Kaspersky", "Symantec", "McAfee", "Microsoft", "ClamAV"][hashValue % 5],
              category: ["Trojan", "Ransomware", "Backdoor"][hashValue % 3],
            },
            {
              name: ["Malware.Generic.123", "Trojan.Generic.456", "Spyware.Win32.789"][hashValue % 3],
              vendor: ["Avast", "AVG", "Bitdefender", "ESET", "F-Secure"][hashValue % 5],
              category: ["Malware", "Trojan", "Spyware"][hashValue % 3],
            },
          ]
        : suspicious
          ? [
              {
                name: ["Suspicious.Win32.Generic", "PUA.Win32.Generic", "Adware.Win32.Generic"][hashValue % 3],
                vendor: ["Kaspersky", "Symantec", "McAfee", "Microsoft", "ClamAV"][hashValue % 5],
                category: ["Suspicious", "PUA", "Adware"][hashValue % 3],
              },
            ]
          : [],
      reports: malicious
        ? [
            {
              source: "VirusTotal",
              date: "2023-04-12",
              details: "Detectado como malware por múltiples motores antivirus",
            },
            {
              source: "Hybrid Analysis",
              date: "2023-03-28",
              details: "Comportamiento malicioso observado en sandbox",
            },
          ]
        : suspicious
          ? [
              {
                source: "VirusTotal",
                date: "2023-02-15",
                details: "Comportamiento sospechoso detectado",
              },
            ]
          : [],
    }
  }

  const getThreatColor = (classification: string) => {
    switch (classification) {
      case "malicious":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "suspicious":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "clean":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getThreatIcon = (classification: string) => {
    switch (classification) {
      case "malicious":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "suspicious":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "clean":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      default:
        return <Info className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Threat Intelligence</h1>
        <p className="text-gray-400">Analiza IPs, dominios, URLs y hashes para detectar amenazas</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Analizador de Amenazas</CardTitle>
          <CardDescription className="text-gray-400">
            Introduce una IP, dominio, URL o hash para analizar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="IP, dominio, URL o hash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Analizando...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Analizar
                </>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4 bg-red-900/20 border-red-900/50 text-red-400">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Analizando amenazas potenciales...</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Reputación</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-blue-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Malware</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-red-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Phishing</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-yellow-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Botnets</p>
              <div className="flex items-center">
                <div className="animate-pulse bg-purple-500/20 h-2 w-full rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {threatData && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 md:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Resumen de Amenaza</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400">Información general sobre la amenaza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div
                  className={`h-32 w-32 rounded-full flex items-center justify-center text-3xl font-bold
                  ${threatData.classification === "malicious" ? "bg-red-600/20 text-red-400" : ""}
                  ${threatData.classification === "suspicious" ? "bg-yellow-600/20 text-yellow-400" : ""}
                  ${threatData.classification === "clean" ? "bg-green-600/20 text-green-400" : ""}
                `}
                >
                  {threatData.threatScore}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-300">Nivel de amenaza</p>
                  <Badge
                    className={`
                    mt-1
                    ${threatData.classification === "malicious" ? "bg-red-600/20 text-red-400" : ""}
                    ${threatData.classification === "suspicious" ? "bg-yellow-600/20 text-yellow-400" : ""}
                    ${threatData.classification === "clean" ? "bg-green-600/20 text-green-400" : ""}
                  `}
                  >
                    {threatData.classification === "malicious" && "MALICIOSO"}
                    {threatData.classification === "suspicious" && "SOSPECHOSO"}
                    {threatData.classification === "clean" && "LIMPIO"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Tipo</p>
                    <p className="text-white">
                      {threatData.type === "ip" && "Dirección IP"}
                      {threatData.type === "domain" && "Dominio"}
                      {threatData.type === "url" && "URL"}
                      {threatData.type === "hash" && `Hash (${threatData.hashType})`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Valor</p>
                    <p className="text-white break-all">{threatData.value}</p>
                  </div>
                </div>

                {threatData.categories && (
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">Categorías</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {threatData.categories.map((category: string, index: number) => (
                          <Badge
                            key={index}
                            className={`
                              ${category === "Clean" ? "bg-green-600/20 text-green-400" : ""}
                              ${
                                [
                                  "Malware",
                                  "Phishing",
                                  "Spam",
                                  "Scam",
                                  "Trojan",
                                  "Ransomware",
                                  "Spyware",
                                  "Backdoor",
                                  "Worm",
                                ].includes(category)
                                  ? "bg-red-600/20 text-red-400"
                                  : ""
                              }
                              ${
                                [
                                  "Suspicious",
                                  "Newly Registered",
                                  "Typosquatting",
                                  "PUA",
                                  "Adware",
                                  "Anonymizer",
                                  "Proxy",
                                ].includes(category)
                                  ? "bg-yellow-600/20 text-yellow-400"
                                  : ""
                              }
                            `}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Primera vez visto</p>
                    <p className="text-white">{threatData.firstSeen}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-400">Última vez visto</p>
                    <p className="text-white">{threatData.lastSeen}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Análisis Detallado</CardTitle>
              <CardDescription className="text-gray-400">Información detallada sobre la amenaza</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="bg-gray-700 mb-4">
                  <TabsTrigger value="details" className="data-[state=active]:bg-gray-600">
                    Detalles
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="data-[state=active]:bg-gray-600">
                    Reportes
                  </TabsTrigger>
                  {threatData.type === "ip" && (
                    <TabsTrigger value="geo" className="data-[state=active]:bg-gray-600">
                      Geolocalización
                    </TabsTrigger>
                  )}
                  {threatData.type === "domain" && (
                    <TabsTrigger value="whois" className="data-[state=active]:bg-gray-600">
                      WHOIS
                    </TabsTrigger>
                  )}
                  {threatData.type === "hash" && (
                    <TabsTrigger value="signatures" className="data-[state=active]:bg-gray-600">
                      Firmas
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  {/* IP Details */}
                  {threatData.type === "ip" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gray-700 border-gray-600">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-white text-base">Información de Red</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">ASN:</span>
                                <span className="text-white">{threatData.asn.number}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Organización:</span>
                                <span className="text-white">{threatData.asn.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Puertos abiertos:</span>
                                <div className="flex flex-wrap gap-1 justify-end">
                                  {threatData.ports.map((port: number, index: number) => (
                                    <Badge key={index} className="bg-blue-600/20 text-blue-400">
                                      {port}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-700 border-gray-600">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-white text-base">IPs Relacionadas</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {threatData.relatedIps.map((ip: string, index: number) => (
                                <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                                  <span className="text-white">{ip}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      setSearchQuery(ip)
                                      handleSearch({ preventDefault: () => {} } as any)
                                    }}
                                  >
                                    <Search className="h-4 w-4 text-gray-400" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                  {/* Domain Details */}
                  {threatData.type === "domain" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gray-700 border-gray-600">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-white text-base">Información de Dominio</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Registrador:</span>
                                <span className="text-white">{threatData.registrar}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Fecha de registro:</span>
                                <span className="text-white">{threatData.registrationDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Fecha de expiración:</span>
                                <span className="text-white">{threatData.expirationDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Nameservers:</span>
                                <div className="text-right">
                                  {threatData.nameservers.map((ns: string, index: number) => (
                                    <div key={index} className="text-white">
                                      {ns}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-700 border-gray-600">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-white text-base">Información SSL</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Estado:</span>
                                <span className="flex items-center text-white">
                                  {threatData.ssl.valid ? (
                                    <>
                                      <Lock className="h-4 w-4 text-green-400 mr-1" />
                                      Válido
                                    </>
                                  ) : (
                                    <>
                                      <Unlock className="h-4 w-4 text-red-400 mr-1" />
                                      No válido
                                    </>
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Emisor:</span>
                                <span className="text-white">{threatData.ssl.issuer}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Válido desde:</span>
                                <span className="text-white">{threatData.ssl.validFrom}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Válido hasta:</span>
                                <span className="text-white">{threatData.ssl.validTo}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-base">IPs Asociadas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {threatData.ipAddresses.map((ip: string, index: number) => (
                              <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                                <span className="text-white">{ip}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    setSearchQuery(ip)
                                    handleSearch({ preventDefault: () => {} } as any)
                                  }}
                                >
                                  <Search className="h-4 w-4 text-gray-400" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {/* URL Details */}
                  {threatData.type === "url" && (
                    <>
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-base">Información de URL</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Dominio:</span>
                              <span className="text-white">{threatData.domain}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Tecnologías detectadas:</span>
                              <div className="flex flex-wrap gap-1 justify-end">
                                {threatData.technologies.map((tech: string, index: number) => (
                                  <Badge key={index} className="bg-blue-600/20 text-blue-400">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {threatData.redirects && threatData.redirects.length > 0 && (
                        <Card className="bg-gray-700 border-gray-600">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-white text-base">Redirecciones</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {threatData.redirects.map((redirect: string, index: number) => (
                                <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded">
                                  <span className="text-white">{redirect}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      setSearchQuery(redirect)
                                      handleSearch({ preventDefault: () => {} } as any)
                                    }}
                                  >
                                    <Search className="h-4 w-4 text-gray-400" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-300">Vista previa no disponible</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hash Details */}
                  {threatData.type === "hash" && (
                    <>
                      <Card className="bg-gray-700 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-base">Información del Archivo</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Nombre:</span>
                              <span className="text-white">{threatData.fileInfo.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Tamaño:</span>
                              <span className="text-white">{threatData.fileInfo.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Tipo:</span>
                              <span className="text-white">{threatData.fileInfo.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Detecciones:</span>
                              <span className="text-white">{threatData.detectionRatio}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                  {threatData.reports && threatData.reports.length > 0 ? (
                    threatData.reports.map((report: any, index: number) => (
                      <Card key={index} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                              <FileCode className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-white">{report.source}</h4>
                                <span className="text-sm text-gray-400">{report.date}</span>
                              </div>
                              <p className="text-sm text-gray-300 mt-1">{report.details}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Info className="h-12 w-12 text-gray-500 mb-4" />
                      <p className="text-white text-lg font-medium">No se encontraron reportes</p>
                      <p className="text-gray-400">No hay reportes disponibles para esta entidad</p>
                    </div>
                  )}
                </TabsContent>

                {threatData.type === "ip" && (
                  <TabsContent value="geo" className="space-y-4">
                    <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-300">Mapa no disponible en esta versión</p>
                        {threatData.location.coordinates && (
                          <p className="text-sm text-gray-400">
                            Coordenadas: {threatData.location.coordinates.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">País</p>
                        <p className="font-medium text-white">{threatData.location.country}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-400">Ciudad</p>
                        <p className="font-medium text-white">{threatData.location.city}</p>
                      </div>
                    </div>
                  </TabsContent>
                )}

                {threatData.type === "domain" && (
                  <TabsContent value="whois" className="space-y-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-base">Información WHOIS</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm text-gray-300 overflow-auto max-h-96">
                          <p>Domain Name: {threatData.value.toUpperCase()}</p>
                          <p>Registrar: {threatData.registrar}</p>
                          <p>Registration Date: {threatData.registrationDate}</p>
                          <p>Expiration Date: {threatData.expirationDate}</p>
                          <p>Name Servers:</p>
                          {threatData.nameservers.map((ns: string, index: number) => (
                            <p key={index}> {ns}</p>
                          ))}
                          <p>Status: Active</p>
                          <p>DNSSEC: unsigned</p>
                          <p>Last Updated: {threatData.lastSeen}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                {threatData.type === "hash" && threatData.signatures && (
                  <TabsContent value="signatures" className="space-y-4">
                    {threatData.signatures.length > 0 ? (
                      threatData.signatures.map((signature: any, index: number) => (
                        <Card key={index} className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-400">
                                <Zap className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-white">{signature.name}</h4>
                                  <Badge className="bg-red-600/20 text-red-400">{signature.category}</Badge>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">Detectado por {signature.vendor}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-400 mb-4" />
                        <p className="text-white text-lg font-medium">No se encontraron firmas maliciosas</p>
                        <p className="text-gray-400">Este hash no ha sido detectado como malicioso</p>
                      </div>
                    )}
                  </TabsContent>
                )}
              </Tabs>

              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => {
                    setSearchQuery("")
                    setThreatData(null)
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Nueva búsqueda
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar informe
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver informe completo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
