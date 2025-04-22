import { pgTable, serial, text, integer, timestamp, boolean, varchar, jsonb } from "drizzle-orm/pg-core"

// Tabla para usuarios
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Tabla para almacenar datos de emails (OSINT)
export const emailsData = pgTable("emails_data", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  domain: text("domain"),
  reputationScore: integer("reputation_score"),
  inBreach: boolean("in_breach").default(false),
  hasSocialLinks: boolean("has_social_links").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  source: text("source"),
  metadata: jsonb("metadata"),
})

// Tabla para almacenar datos de usernames (OSINT)
export const usernamesData = pgTable("usernames_data", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  platform: text("platform").notNull(),
  found: boolean("found").default(false),
  profileUrl: text("profile_url"),
  lastChecked: timestamp("last_checked").defaultNow().notNull(),
  metadata: jsonb("metadata"),
})

// Tabla para almacenar datos de IPs (OSINT)
export const ipsData = pgTable("ips_data", {
  id: serial("id").primaryKey(),
  ipAddress: text("ip_address").notNull().unique(),
  asn: text("asn"),
  isp: text("isp"),
  country: text("country"),
  city: text("city"),
  isAbusive: boolean("is_abusive").default(false),
  lastReported: timestamp("last_reported"),
  abuseScore: integer("abuse_score"),
  metadata: jsonb("metadata"),
})

// Tabla para almacenar datos de dominios (OSINT)
export const domainsData = pgTable("domains_data", {
  id: serial("id").primaryKey(),
  domain: text("domain").notNull().unique(),
  subdomainCount: integer("subdomain_count").default(0),
  firstSeen: timestamp("first_seen"),
  technologies: text("technologies").array(),
  openPorts: integer("open_ports").array(),
  metadata: jsonb("metadata"),
})

// Tabla para almacenar datos de filtraciones (OSINT)
export const leaksData = pgTable("leaks_data", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  source: text("source").notNull(),
  passwordHash: text("password_hash"),
  leakDate: timestamp("leak_date"),
  metadata: jsonb("metadata"),
})

// Tabla para actividades de pareja
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: integer("created_by").references(() => users.id),
})

// Tabla para puntos de actividades
export const activityPoints = pgTable("activity_points", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id")
    .references(() => activities.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  points: integer("points").notNull().default(0),
  date: timestamp("date").defaultNow().notNull(),
  notes: text("notes"),
})

// Tabla para búsquedas OSINT guardadas
export const savedSearches = pgTable("saved_searches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  searchType: varchar("search_type", { length: 50 }).notNull(), // 'email', 'domain', 'ip', etc.
  searchTerm: text("search_term").notNull(),
  results: jsonb("results"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
