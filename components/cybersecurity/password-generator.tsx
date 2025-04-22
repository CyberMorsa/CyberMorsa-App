"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Clipboard, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?/"

    if (charset === "") {
      toast({
        title: "Error",
        description: "Debes seleccionar al menos un tipo de carácter.",
        variant: "destructive",
      })
      return
    }

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      newPassword += charset[randomIndex]
    }

    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    if (!password) return

    navigator.clipboard.writeText(password)
    toast({
      title: "Copiado",
      description: "Contraseña copiada al portapapeles.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Input value={password} readOnly placeholder="Tu contraseña aparecerá aquí" className="font-mono" />
          <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!password}>
            <Clipboard className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={generatePassword}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="length">Longitud: {length}</Label>
          </div>
          <Slider
            id="length"
            min={8}
            max={32}
            step={1}
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">Incluir mayúsculas (A-Z)</Label>
            <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="lowercase">Incluir minúsculas (a-z)</Label>
            <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">Incluir números (0-9)</Label>
            <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="symbols">Incluir símbolos (!@#$%...)</Label>
            <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
          </div>
        </div>
      </div>

      <Button onClick={generatePassword} className="w-full">
        Generar Contraseña
      </Button>
    </div>
  )
}
