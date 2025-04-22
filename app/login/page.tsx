import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - CyberMorsa",
  description: "Iniciar sesión en CyberMorsa",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">CyberMorsa</h1>
        <LoginForm />
      </div>
    </div>
  )
}
