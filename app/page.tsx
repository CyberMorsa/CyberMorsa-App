import Link from "next/link"
import { WelcomeAnimation } from "@/components/welcome-animation"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <WelcomeAnimation />

          <div className="mt-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Bienvenido a CyberMorsa</h1>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Tu plataforma de seguridad personalizada. Accede a herramientas OSINT, análisis de datos y aplicaciones
              personalizadas para mejorar tu día a día.
            </p>

            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CyberMorsa Apps - Todos los derechos reservados
      </footer>
    </div>
  )
}
