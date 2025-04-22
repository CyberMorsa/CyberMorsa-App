-- Esquema de la base de datos para CyberMorsa

-- Tabla para contadores de actividades
CREATE TABLE IF NOT EXISTS activity_counters (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(id, user_id)
);

-- Tabla para contadores mejorados
CREATE TABLE IF NOT EXISTS enhanced_counters (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  players_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(id, user_id)
);

-- Tabla para perfiles OSINT
CREATE TABLE IF NOT EXISTS osint_profiles (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- email, username, ip, phone
  value VARCHAR(255) NOT NULL,
  raw_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para relaciones OSINT
CREATE TABLE IF NOT EXISTS osint_relationships (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  source_type VARCHAR(50) NOT NULL,
  target VARCHAR(255) NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  relation VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para watchlist OSINT
CREATE TABLE IF NOT EXISTS osint_watchlist (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  value VARCHAR(255) NOT NULL,
  notify_email BOOLEAN DEFAULT FALSE,
  notify_telegram BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, type, value)
);

-- Tabla para alertas de watchlist
CREATE TABLE IF NOT EXISTS osint_alerts (
  id SERIAL PRIMARY KEY,
  watchlist_id INTEGER REFERENCES osint_watchlist(id),
  message TEXT NOT NULL,
  severity VARCHAR(50) NOT NULL, -- low, medium, high, critical
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_activity_counters_user_id ON activity_counters(user_id);
CREATE INDEX IF NOT EXISTS idx_enhanced_counters_user_id ON enhanced_counters(user_id);
CREATE INDEX IF NOT EXISTS idx_osint_profiles_user_id ON osint_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_osint_profiles_type_value ON osint_profiles(type, value);
CREATE INDEX IF NOT EXISTS idx_osint_relationships_source ON osint_relationships(source, source_type);
CREATE INDEX IF NOT EXISTS idx_osint_relationships_target ON osint_relationships(target, target_type);
CREATE INDEX IF NOT EXISTS idx_osint_watchlist_user_id ON osint_watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_osint_alerts_watchlist_id ON osint_alerts(watchlist_id);
