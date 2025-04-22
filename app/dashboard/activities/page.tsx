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

      <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">¿Cómo usar los contadores?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>Haz clic en el título o descripción para editarlos</li>
          <li>Usa los botones para sumar o restar puntos</li>
          <li>Los cambios se guardan automáticamente</li>
          <li>Puedes reiniciar el contador a cero con el botón de reinicio</li>
        </ul>
      </div>
    </div>
  )
}
