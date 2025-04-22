import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TargetProfiler } from "@/components/osint/target-profiler"
import { RelationshipGraph } from "@/components/osint/relationship-graph"
import { WatchlistMonitor } from "@/components/osint/watchlist-monitor"
import { OsintDashboard } from "@/components/osint/osint-dashboard"
import { OsintAnalytics } from "@/components/osint/osint-analytics"

export default function OsintPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">OSINT</h1>
        <p className="text-gray-200">Centro de inteligencia de fuentes abiertas con múltiples APIs integradas.</p>
      </div>

      <OsintDashboard />

      <OsintAnalytics />

      <Tabs defaultValue="profiler" className="space-y-4">
        <TabsList className="bg-gray-800 p-1 w-full flex flex-wrap">
          <TabsTrigger value="profiler" className="data-[state=active]:bg-gray-700 flex-1">
            Perfilador
          </TabsTrigger>
          <TabsTrigger value="graph" className="data-[state=active]:bg-gray-700 flex-1">
            Grafo de Relaciones
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="data-[state=active]:bg-gray-700 flex-1">
            Watchlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profiler" className="mt-6">
          <TargetProfiler />
        </TabsContent>

        <TabsContent value="graph" className="mt-6">
          <RelationshipGraph />
        </TabsContent>

        <TabsContent value="watchlist" className="mt-6">
          <WatchlistMonitor />
        </TabsContent>
      </Tabs>
    </div>
  )
}
