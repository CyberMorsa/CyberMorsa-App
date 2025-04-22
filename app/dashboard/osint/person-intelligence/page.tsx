"use client"

import { PersonIntelligenceSearcher } from "@/components/osint/person-intelligence-searcher"

export default function PersonIntelligencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Person Intelligence</h1>
        <p className="text-gray-400">Busca información sobre personas utilizando nombre, email o username</p>
      </div>

      <PersonIntelligenceSearcher />
    </div>
  )
}
