import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailIntelligence } from "@/components/osint/email-intelligence"
import { PhoneIntelligence } from "@/components/osint/phone-intelligence"
import { UsernameIntelligence } from "@/components/osint/username-intelligence"
import { IpIntelligence } from "@/components/osint/ip-intelligence"
import { PersonIntelligence } from "@/components/osint/person-intelligence"
import { ThreatIntelligence } from "@/components/osint/threat-intelligence"
import { OsintDashboard } from "@/components/osint/osint-dashboard"

export default function OsintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">OSINT</h1>
        <p className="text-gray-200">Centro de inteligencia de fuentes abiertas con múltiples APIs integradas.</p>
      </div>

      <OsintDashboard />

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList className="bg-gray-800 p-1 w-full flex flex-wrap">
          <TabsTrigger value="email" className="data-[state=active]:bg-gray-700 flex-1">
            Email
          </TabsTrigger>
          <TabsTrigger value="phone" className="data-[state=active]:bg-gray-700 flex-1">
            Teléfono
          </TabsTrigger>
          <TabsTrigger value="username" className="data-[state=active]:bg-gray-700 flex-1">
            Username
          </TabsTrigger>
          <TabsTrigger value="ip" className="data-[state=active]:bg-gray-700 flex-1">
            IP
          </TabsTrigger>
          <TabsTrigger value="person" className="data-[state=active]:bg-gray-700 flex-1">
            Persona
          </TabsTrigger>
          <TabsTrigger value="threat" className="data-[state=active]:bg-gray-700 flex-1">
            Amenazas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-6">
          <EmailIntelligence />
        </TabsContent>

        <TabsContent value="phone" className="mt-6">
          <PhoneIntelligence />
        </TabsContent>

        <TabsContent value="username" className="mt-6">
          <UsernameIntelligence />
        </TabsContent>

        <TabsContent value="ip" className="mt-6">
          <IpIntelligence />
        </TabsContent>

        <TabsContent value="person" className="mt-6">
          <PersonIntelligence />
        </TabsContent>

        <TabsContent value="threat" className="mt-6">
          <ThreatIntelligence />
        </TabsContent>
      </Tabs>
    </div>
  )
}
