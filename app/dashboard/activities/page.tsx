import { ActivityCounter } from "@/components/activity-counter"

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Actividades</h1>
        <p className="text-gray-400">Lleva un registro de actividades y puntuaciones con tu pareja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityCounter title="Citas" description="Registro de salidas juntos" initialCount={0} id="dates" />

        <ActivityCounter title="Puntos" description="Registro de puntos acumulados" initialCount={0} id="points" />
      </div>
    </div>
  )
}
