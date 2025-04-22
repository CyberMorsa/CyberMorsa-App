"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clipboard, ArrowDownUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function EncoderDecoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [method, setMethod] = useState("base64")
  const { toast } = useToast()

  const encode = () => {
    if (!input) return

    try {
      let result = ""

      switch (method) {
        case "base64":
          // En un entorno real, usaríamos btoa()
          result = btoa(input)
          break
        case "url":
          result = encodeURIComponent(input)
          break
        case "hex":
          // Simulación simple de codificación hex
          result = Array.from(input)
            .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("")
          break
        case "binary":
          // Simulación simple de codificación binaria
          result = Array.from(input)
            .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" ")
          break
        default:
          result = input
      }

      setOutput(result)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al codificar el texto.",
        variant: "destructive",
      })
    }
  }

  const decode = () => {
    if (!input) return

    try {
      let result = ""

      switch (method) {
        case "base64":
          // En un entorno real, usaríamos atob()
          result = atob(input)
          break
        case "url":
          result = decodeURIComponent(input)
          break
        case "hex":
          // Simulación simple de decodificación hex
          result =
            input
              .match(/.{1,2}/g)
              ?.map((byte) => String.fromCharCode(Number.parseInt(byte, 16)))
              .join("") || ""
          break
        case "binary":
          // Simulación simple de decodificación binaria
          result =
            input
              .split(" ")
              .map((bin) => String.fromCharCode(Number.parseInt(bin, 2)))
              .join("") || ""
          break
        default:
          result = input
      }

      setOutput(result)
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al decodificar el texto. Asegúrate de que el formato sea correcto.",
        variant: "destructive",
      })
    }
  }

  const swapInputOutput = () => {
    setInput(output)
    setOutput("")
  }

  const copyToClipboard = () => {
    if (!output) return

    navigator.clipboard.writeText(output)
    toast({
      title: "Copiado",
      description: "Texto copiado al portapapeles.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="method">Método</Label>
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger id="method">
            <SelectValue placeholder="Selecciona método" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="base64">Base64</SelectItem>
            <SelectItem value="url">URL</SelectItem>
            <SelectItem value="hex">Hexadecimal</SelectItem>
            <SelectItem value="binary">Binario</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="input">Texto de entrada</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingresa el texto para codificar o decodificar..."
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <Tabs defaultValue="encode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Codificar</TabsTrigger>
            <TabsTrigger value="decode">Decodificar</TabsTrigger>
          </TabsList>
          <TabsContent value="encode" className="pt-2">
            <Button onClick={encode} disabled={!input} className="w-full">
              Codificar
            </Button>
          </TabsContent>
          <TabsContent value="decode" className="pt-2">
            <Button onClick={decode} disabled={!input} className="w-full">
              Decodificar
            </Button>
          </TabsContent>
        </Tabs>

        <Button variant="outline" size="icon" onClick={swapInputOutput} disabled={!output}>
          <ArrowDownUp className="h-4 w-4" />
        </Button>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="output">Resultado</Label>
            <Button variant="ghost" size="icon" onClick={copyToClipboard}>
              <Clipboard className="h-4 w-4" />
            </Button>
          </div>
          <Textarea id="output" value={output} readOnly rows={4} className="font-mono" />
        </div>
      )}
    </div>
  )
}
