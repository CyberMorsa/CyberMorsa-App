import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityList } from "@/components/activities/activity-list"
import { AddActivityButton } from "@/components/activities/add-activity-button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contador de Actividades</h1>
          <p className="text-muted-foreground">Lleva el conteo de actividades con tu pareja.</p>
        </div>
        <AddActivityButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividades Recientes</CardTitle>
            <CardDescription>Las últimas actividades registradas.</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>Resumen de puntos y actividades.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Total de Actividades</p>
                <p className="text-3xl font-bold">5</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-muted-foreground text-sm">Puntos Totales</p>
                <p className="text-3xl font-bold">42</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Actividad más frecuente</h3>
              <p className="text-muted-foreground">Cena romántica (8 veces)</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Último registro</h3>
              <p className="text-muted-foreground">Hace 2 días</p>
            </div>

            <Button asChild className="w-full">
              <Link href="/activities/stats">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ver estadísticas completas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
