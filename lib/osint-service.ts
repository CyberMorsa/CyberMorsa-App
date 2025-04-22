import axios from "axios"

// Interfaces para los resultados de las APIs
interface EmailReputation {
  email: string
  reputation: number
  breached: boolean
  breachDetails?: {
    name: string
    date: string
    count: number
  }[]
  firstSeen?: string
  lastSeen?: string
  sources?: string[]
}

interface SocialProfile {
  platform: string
  username: string
  url: string
  followers?: number
  bio?: string
  verified?: boolean
  lastActive?: string
}

interface PersonInfo {
  name?: string
  username?: string
  email?: string
  phone?: string
  location?: string
  occupation?: string
  socialProfiles: SocialProfile[]
  websites?: string[]
  imageUrl?: string
}

interface BreachInfo {
  name: string
  domain: string
  date: string
  count: number
  description: string
  dataClasses: string[]
}

// Clase principal para servicios OSINT
export class OsintService {
  private apiKeys: {
    emailRep?: string
    hunter?: string
    haveibeenpwned?: string
    fullcontact?: string
    clearbit?: string
    shodan?: string
  }

  constructor() {
    // Cargar claves API desde variables de entorno
    this.apiKeys = {
      emailRep: process.env.EMAILREP_API_KEY,
      hunter: process.env.HUNTER_API_KEY,
      haveibeenpwned: process.env.HAVEIBEENPWNED_API_KEY,
      fullcontact: process.env.FULLCONTACT_API_KEY,
      clearbit: process.env.CLEARBIT_API_KEY,
      shodan: process.env.SHODAN_API_KEY,
    }
  }

  // Verificar si tenemos las claves API necesarias
  public hasRequiredApiKeys(): boolean {
    // Verificamos al menos una clave API para funcionalidad básica
    return !!(this.apiKeys.emailRep || this.apiKeys.hunter || this.apiKeys.haveibeenpwned)
  }

  // Buscar información por email
  public async searchByEmail(email: string): Promise<any> {
    try {
      const results: any = {
        email,
        source: "real-api",
        socialProfiles: [],
        dataBreaches: [],
      }

      // Obtener reputación de email (EmailRep.io)
      if (this.apiKeys.emailRep) {
        try {
          const emailRepData = await this.getEmailReputation(email)
          results.reputation = emailRepData.reputation * 100 // Convertir a porcentaje
          results.firstSeen = emailRepData.firstSeen
          results.lastSeen = emailRepData.lastSeen

          if (emailRepData.breached) {
            results.dataBreaches = emailRepData.breachDetails || []
          }
        } catch (error) {
          console.error("Error al obtener reputación de email:", error)
        }
      }

      // Obtener información de Hunter.io
      if (this.apiKeys.hunter) {
        try {
          const hunterData = await this.getHunterInfo(email)
          if (hunterData.data && hunterData.data.first_name && hunterData.data.last_name) {
            results.name = `${hunterData.data.first_name} ${hunterData.data.last_name}`
          }
          if (hunterData.data && hunterData.data.company) {
            results.occupation = `${hunterData.data.position || "Empleado"} en ${hunterData.data.company}`
          }
          if (hunterData.data && hunterData.data.linkedin) {
            results.socialProfiles.push({
              platform: "LinkedIn",
              username: hunterData.data.linkedin.split("/").pop() || "",
              url: hunterData.data.linkedin,
            })
          }
          if (hunterData.data && hunterData.data.twitter) {
            results.socialProfiles.push({
              platform: "Twitter",
              username: hunterData.data.twitter.split("/").pop() || "",
              url: hunterData.data.twitter,
            })
          }
        } catch (error) {
          console.error("Error al obtener información de Hunter:", error)
        }
      }

      // Obtener información de HaveIBeenPwned
      if (this.apiKeys.haveibeenpwned) {
        try {
          const breachData = await this.getBreachInfo(email)
          if (breachData && breachData.length > 0) {
            // Añadir a las filtraciones existentes
            results.dataBreaches = [
              ...results.dataBreaches,
              ...breachData.map((breach: BreachInfo) => ({
                name: breach.name,
                date: breach.date,
                count: breach.count,
                info: breach.description,
                severity: breach.count > 1000000 ? "high" : breach.count > 100000 ? "medium" : "low",
                affectedData: breach.dataClasses,
              })),
            ]
          }
        } catch (error) {
          console.error("Error al obtener información de brechas:", error)
        }
      }

      // Obtener información de FullContact
      if (this.apiKeys.fullcontact) {
        try {
          const personData = await this.getFullContactInfo(email)
          if (personData) {
            if (personData.name && !results.name) {
              results.name = `${personData.name.givenName || ""} ${personData.name.familyName || ""}`.trim()
            }
            if (personData.location) {
              results.location = personData.location
            }
            if (personData.socialProfiles && personData.socialProfiles.length > 0) {
              results.socialProfiles = [
                ...results.socialProfiles,
                ...personData.socialProfiles.map((profile: any) => ({
                  platform: profile.type,
                  username: profile.username || profile.url.split("/").pop() || "",
                  url: profile.url,
                  followers: profile.followers,
                  bio: profile.bio,
                })),
              ]
            }
            if (personData.photos && personData.photos.length > 0) {
              results.profileImage = personData.photos[0].url
            }
          }
        } catch (error) {
          console.error("Error al obtener información de FullContact:", error)
        }
      }

      // Si no tenemos suficiente información, usar Clearbit como respaldo
      if (this.apiKeys.clearbit && (!results.name || results.socialProfiles.length === 0)) {
        try {
          const clearbitData = await this.getClearbitInfo(email)
          if (clearbitData && clearbitData.person) {
            if (!results.name && clearbitData.person.name) {
              results.name =
                `${clearbitData.person.name.givenName || ""} ${clearbitData.person.name.familyName || ""}`.trim()
            }
            if (!results.location && clearbitData.person.location) {
              results.location = clearbitData.person.location
            }
            if (clearbitData.person.employment) {
              results.occupation = `${clearbitData.person.employment.title || "Empleado"} en ${clearbitData.person.employment.name}`
            }
            if (clearbitData.person.avatar) {
              results.profileImage = clearbitData.person.avatar
            }

            // Añadir perfiles sociales
            if (clearbitData.person.twitter && !results.socialProfiles.some((p) => p.platform === "Twitter")) {
              results.socialProfiles.push({
                platform: "Twitter",
                username: clearbitData.person.twitter.handle,
                url: `https://twitter.com/${clearbitData.person.twitter.handle}`,
                followers: clearbitData.person.twitter.followers,
              })
            }
            if (clearbitData.person.linkedin && !results.socialProfiles.some((p) => p.platform === "LinkedIn")) {
              results.socialProfiles.push({
                platform: "LinkedIn",
                username: clearbitData.person.linkedin.handle,
                url: `https://linkedin.com/in/${clearbitData.person.linkedin.handle}`,
              })
            }
            if (clearbitData.person.github && !results.socialProfiles.some((p) => p.platform === "GitHub")) {
              results.socialProfiles.push({
                platform: "GitHub",
                username: clearbitData.person.github.handle,
                url: `https://github.com/${clearbitData.person.github.handle}`,
                followers: clearbitData.person.github.followers,
              })
            }
          }
        } catch (error) {
          console.error("Error al obtener información de Clearbit:", error)
        }
      }

      // Calcular puntuación de riesgo basada en datos reales
      results.riskScore = this.calculateRiskScore(results)

      // Añadir fecha de última actualización
      results.lastUpdated = new Date().toISOString().split("T")[0]

      return results
    } catch (error) {
      console.error("Error en la búsqueda por email:", error)
      throw new Error("Error al realizar la búsqueda OSINT por email")
    }
  }

  // Buscar información por nombre de usuario
  public async searchByUsername(username: string): Promise<any> {
    try {
      const results: any = {
        username,
        source: "real-api",
        socialProfiles: [],
        dataBreaches: [],
      }

      // Aquí implementaríamos la búsqueda en plataformas sociales
      // Por ejemplo, usando APIs como SocialAnalyzer, Sherlock, etc.

      // Como ejemplo, vamos a simular la búsqueda en plataformas comunes
      const platforms = [
        { name: "GitHub", url: `https://github.com/${username}` },
        { name: "Twitter", url: `https://twitter.com/${username}` },
        { name: "Instagram", url: `https://instagram.com/${username}` },
        { name: "LinkedIn", url: `https://linkedin.com/in/${username}` },
        { name: "Facebook", url: `https://facebook.com/${username}` },
      ]

      // Verificar existencia en cada plataforma (en una implementación real, esto se haría con APIs)
      for (const platform of platforms) {
        try {
          // En una implementación real, verificaríamos si el perfil existe
          // Aquí solo simulamos una verificación básica
          const response = await axios.head(platform.url, {
            timeout: 5000,
            validateStatus: (status) => status < 500, // Aceptar cualquier respuesta que no sea error del servidor
          })

          if (response.status === 200) {
            results.socialProfiles.push({
              platform: platform.name,
              username: username,
              url: platform.url,
            })
          }
        } catch (error) {
          // Si hay error, asumimos que el perfil no existe
          console.log(`Perfil no encontrado en ${platform.name}`)
        }
      }

      // Calcular puntuación de riesgo
      results.riskScore = this.calculateRiskScore(results)

      // Añadir fecha de última actualización
      results.lastUpdated = new Date().toISOString().split("T")[0]

      return results
    } catch (error) {
      console.error("Error en la búsqueda por username:", error)
      throw new Error("Error al realizar la búsqueda OSINT por username")
    }
  }

  // Métodos privados para interactuar con APIs específicas
  private async getEmailReputation(email: string): Promise<EmailReputation> {
    try {
      const response = await axios.get(`https://emailrep.io/query/${email}`, {
        headers: {
          Key: this.apiKeys.emailRep,
          Accept: "application/json",
        },
      })

      return {
        email,
        reputation: response.data.reputation || 0,
        breached: response.data.details?.data_breach || false,
        firstSeen: response.data.details?.first_seen,
        lastSeen: response.data.details?.last_seen,
        sources: response.data.details?.profiles || [],
      }
    } catch (error) {
      console.error("Error al consultar EmailRep:", error)
      throw error
    }
  }

  private async getHunterInfo(email: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.hunter.io/v2/email-finder?email=${email}&api_key=${this.apiKeys.hunter}`,
      )
      return response.data
    } catch (error) {
      console.error("Error al consultar Hunter:", error)
      throw error
    }
  }

  private async getBreachInfo(email: string): Promise<BreachInfo[]> {
    try {
      const response = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
        headers: {
          "hibp-api-key": this.apiKeys.haveibeenpwned,
          Accept: "application/json",
        },
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // No se encontraron brechas
        return []
      }
      console.error("Error al consultar HaveIBeenPwned:", error)
      throw error
    }
  }

  private async getFullContactInfo(email: string): Promise<any> {
    try {
      const response = await axios.post(
        "https://api.fullcontact.com/v3/person.enrich",
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKeys.fullcontact}`,
            "Content-Type": "application/json",
          },
        },
      )
      return response.data
    } catch (error) {
      console.error("Error al consultar FullContact:", error)
      throw error
    }
  }

  private async getClearbitInfo(email: string): Promise<any> {
    try {
      const response = await axios.get(`https://person.clearbit.com/v2/people/find?email=${email}`, {
        headers: {
          Authorization: `Bearer ${this.apiKeys.clearbit}`,
        },
      })
      return response.data
    } catch (error) {
      console.error("Error al consultar Clearbit:", error)
      throw error
    }
  }

  // Calcular puntuación de riesgo basada en datos reales
  private calculateRiskScore(data: any): number {
    let score = 30 // Puntuación base

    // Factores que aumentan el riesgo
    if (data.dataBreaches && data.dataBreaches.length > 0) {
      score += data.dataBreaches.length * 10

      // Filtraciones recientes son más peligrosas
      const recentBreaches = data.dataBreaches.filter((breach: any) => {
        const breachDate = new Date(breach.date)
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
        return breachDate > oneYearAgo
      })

      score += recentBreaches.length * 5
    }

    // Exposición en redes sociales
    if (data.socialProfiles && data.socialProfiles.length > 0) {
      score += data.socialProfiles.length * 3

      // Perfiles con muchos seguidores tienen más exposición
      const highFollowerProfiles = data.socialProfiles.filter(
        (profile: any) => profile.followers && profile.followers > 1000,
      )

      score += highFollowerProfiles.length * 5
    }

    // Limitar el score entre 0 y 100
    return Math.min(Math.max(score, 0), 100)
  }
}

// Exportar una instancia del servicio
export const osintService = new OsintService()
