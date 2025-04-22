import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReminderList } from "@/components/reminders/reminder-list"
import { AddReminderButton } from "@/components/reminders/add-reminder-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recordatorios</h1>
          <p className="text-muted-foreground">Organiza tus tareas y recordatorios por prioridad.</p>
        </div>
        <AddReminderButton />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="high">Muy Importantes</TabsTrigger>
          <TabsTrigger value="medium">Importantes</TabsTrigger>
          <TabsTrigger value="low">Normales</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Recordatorios</CardTitle>
              <CardDescription>Visualiza todos tus recordatorios ordenados por prioridad.</CardDescription>
            </CardHeader>
            <CardContent>
              <ReminderList filter="all" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high">
          <Card>
            <CardHeader>
              <CardTitle>Recordatorios Muy Importantes</CardTitle>
              <CardDescription>Tareas críticas que requieren atención inmediata.</CardDescription>
            </CardHeader>
            <CardContent>
              <ReminderList filter="high" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medium">
          <Card>
            <CardHeader>
              <CardTitle>Recordatorios Importantes</CardTitle>
              <CardDescription>Tareas importantes pero no urgentes.</CardDescription>
            </CardHeader>
            <CardContent>
              <ReminderList filter="medium" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low">
          <Card>
            <CardHeader>
              <CardTitle>Recordatorios Normales</CardTitle>
              <CardDescription>Tareas de baja prioridad.</CardDescription>
            </CardHeader>
            <CardContent>
              <ReminderList filter="low" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
