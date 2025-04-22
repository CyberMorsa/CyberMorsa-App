import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityStats } from "@/components/activities/activity-stats"
import { PersonStats } from "@/components/activities/person-stats"
import { TimeStats } from "@/components/activities/time-stats"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas de Actividades</h1>
        <p className="text-muted-foreground">Análisis detallado de tus actividades y puntos.</p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Resumen</TabsTrigger>
          <TabsTrigger value="by-person">Por Persona</TabsTrigger>
          <TabsTrigger value="by-time">Por Tiempo</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Actividades</CardTitle>
              <CardDescription>Visión general de todas tus actividades.</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityStats />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-person">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas por Persona</CardTitle>
              <CardDescription>Análisis de actividades por persona.</CardDescription>
            </CardHeader>
            <CardContent>
              <PersonStats />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-time">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas por Tiempo</CardTitle>
              <CardDescription>Análisis de actividades a lo largo del tiempo.</CardDescription>
            </CardHeader>
            <CardContent>
              <TimeStats />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
