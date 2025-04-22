import { LoginForm } from "@/components/login-form"
import { verifyAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DebugHelper } from "@/components/debug-helper"

export default async function LoginPage() {
  // Si el usuario ya está autenticado, redirigir al dashboard
  const user = await verifyAuth()
  if (user) {
    redirect("/dashboard")
  }

  // Verificar si las variables de entorno están configuradas
  const envCheck = {
    adminUser: !!process.env.ADMIN_USERNAME,
    adminPass: !!process.env.ADMIN_PASSWORD,
    guestUser: !!process.env.GUEST_USERNAME,
    guestPass: !!process.env.GUEST_PASSWORD,
    jwtSecret: !!process.env.JWT_SECRET,
  }

  const allConfigured = Object.values(envCheck).every(Boolean)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Iniciar Sesión</h1>

          {!allConfigured ? (
            <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium mb-1">⚠️ Configuración incompleta</p>
              <p className="text-sm">
                Algunas variables de entorno no están configuradas. La autenticación podría no funcionar correctamente.
              </p>
            </div>
          ) : null}

          <LoginForm />

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Acceso restringido solo para usuarios autorizados.</p>
          </div>
        </div>
      </div>

      {/* Ayudante de depuración (solo visible en desarrollo) */}
      <DebugHelper />
    </div>
  )
}
