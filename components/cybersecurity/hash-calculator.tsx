"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clipboard, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function HashCalculator() {
  const [input, setInput] = useState("")
  const [hashType, setHashType] = useState("md5")
  const [result, setResult] = useState("")
  const { toast } = useToast()

  const calculateHash = async () => {
    if (!input) return

    try {
      // Simulamos el cálculo de hash (en una aplicación real, usaríamos crypto)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generamos un hash simulado
      let hash = ""
      const characters = "0123456789abcdef"

      // Diferentes longitudes según el tipo de hash
      let length = 32 // md5 por defecto

      if (hashType === "sha1") length = 40
      else if (hashType === "sha256") length = 64
      else if (hashType === "sha512") length = 128

      for (let i = 0; i < length; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length))
      }

      setResult(hash)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al calcular el hash.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = () => {
    if (!result) return

    navigator.clipboard.writeText(result)
    toast({
      title: "Copiado",
      description: "Hash copiado al portapapeles.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="input">Texto a procesar</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingresa el texto para calcular su hash..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hash-type">Tipo de Hash</Label>
        <Select value={hashType} onValueChange={setHashType}>
          <SelectTrigger id="hash-type">
            <SelectValue placeholder="Selecciona tipo de hash" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="md5">MD5</SelectItem>
            <SelectItem value="sha1">SHA-1</SelectItem>
            <SelectItem value="sha256">SHA-256</SelectItem>
            <SelectItem value="sha512">SHA-512</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={calculateHash} disabled={!input} className="w-full">
        Calcular Hash <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {result && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Resultado ({hashType.toUpperCase()})</Label>
                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                  <Clipboard className="h-4 w-4" />
                </Button>
              </div>
              <Input value={result} readOnly className="font-mono text-xs" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
