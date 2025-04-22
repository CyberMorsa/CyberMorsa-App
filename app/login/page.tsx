import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Iniciar Sesión</h1>

          <LoginForm />

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Acceso restringido solo para usuarios autorizados.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
