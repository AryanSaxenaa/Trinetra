/*
  # AntarDrishti AI Vehicle Monitoring Schema

  1. New Tables
    - `vehicles`
      - `id` (uuid, primary key)
      - `name` (text) - Vehicle name/identifier
      - `model` (text) - Vehicle model
      - `year` (integer) - Manufacturing year
      - `mileage` (integer) - Current mileage in km
      - `wellness_score` (integer) - Overall wellness score 0-100
      - `status` (text) - "Healthy", "Needs Attention", or "Service Required"
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `vehicle_health_metrics`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `battery_health` (integer) - Battery health percentage
      - `engine_wear` (integer) - Engine wear percentage
      - `tire_wear` (integer) - Tire wear percentage
      - `engine_temp` (decimal) - Current engine temperature
      - `brake_wear` (integer) - Brake wear percentage
      - `coolant_level` (integer) - Coolant level percentage
      - `oil_quality` (integer) - Oil quality percentage
      - `transmission_health` (integer) - Transmission health percentage
      - `created_at` (timestamptz)

    - `component_health`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `component_name` (text) - Name of the component
      - `health_score` (integer) - Health score 0-100
      - `status` (text) - "good", "warning", "critical"
      - `trend_data` (jsonb) - Historical trend data
      - `reason` (text) - Explanation for the current status
      - `updated_at` (timestamptz)

    - `maintenance_recommendations`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `title` (text) - Recommendation title
      - `description` (text) - Detailed description
      - `urgency` (text) - "low", "medium", "high", "critical"
      - `estimated_cost` (integer) - Estimated cost in currency
      - `reasoning` (text) - Why this is recommended
      - `completed` (boolean) - Whether completed
      - `created_at` (timestamptz)

    - `context_data`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `weather_condition` (text) - Current weather
      - `temperature` (decimal) - Temperature in Celsius
      - `weather_impact` (text) - Impact description
      - `weather_impact_percentage` (integer) - Impact percentage
      - `traffic_condition` (text) - Traffic status
      - `traffic_impact` (text) - Traffic impact description
      - `terrain_type` (text) - Terrain type
      - `terrain_stress_index` (integer) - Stress index 0-100
      - `created_at` (timestamptz)

    - `scheduled_services`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, foreign key)
      - `service_type` (text) - Type of service
      - `scheduled_date` (date) - Date of service
      - `scheduled_time` (time) - Time of service
      - `location` (text) - Service location
      - `status` (text) - "pending", "confirmed", "completed"
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their vehicle data
*/

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  mileage integer DEFAULT 0,
  wellness_score integer DEFAULT 100,
  status text DEFAULT 'Healthy',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vehicle_health_metrics table
CREATE TABLE IF NOT EXISTS vehicle_health_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  battery_health integer DEFAULT 100,
  engine_wear integer DEFAULT 0,
  tire_wear integer DEFAULT 0,
  engine_temp decimal DEFAULT 90.0,
  brake_wear integer DEFAULT 0,
  coolant_level integer DEFAULT 100,
  oil_quality integer DEFAULT 100,
  transmission_health integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

-- Create component_health table
CREATE TABLE IF NOT EXISTS component_health (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  component_name text NOT NULL,
  health_score integer DEFAULT 100,
  status text DEFAULT 'good',
  trend_data jsonb DEFAULT '[]'::jsonb,
  reason text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Create maintenance_recommendations table
CREATE TABLE IF NOT EXISTS maintenance_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  urgency text DEFAULT 'low',
  estimated_cost integer DEFAULT 0,
  reasoning text DEFAULT '',
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create context_data table
CREATE TABLE IF NOT EXISTS context_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  weather_condition text DEFAULT '',
  temperature decimal DEFAULT 25.0,
  weather_impact text DEFAULT '',
  weather_impact_percentage integer DEFAULT 0,
  traffic_condition text DEFAULT '',
  traffic_impact text DEFAULT '',
  terrain_type text DEFAULT '',
  terrain_stress_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create scheduled_services table
CREATE TABLE IF NOT EXISTS scheduled_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  scheduled_date date NOT NULL,
  scheduled_time time NOT NULL,
  location text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE component_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE context_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_services ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
-- In production, these should be restricted to authenticated users

CREATE POLICY "Allow public read access to vehicles"
  ON vehicles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to vehicle_health_metrics"
  ON vehicle_health_metrics FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to component_health"
  ON component_health FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to maintenance_recommendations"
  ON maintenance_recommendations FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to context_data"
  ON context_data FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to scheduled_services"
  ON scheduled_services FOR SELECT
  TO anon
  USING (true);

-- Insert policies for authenticated users
CREATE POLICY "Allow authenticated users full access to vehicles"
  ON vehicles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to vehicle_health_metrics"
  ON vehicle_health_metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to component_health"
  ON component_health FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to maintenance_recommendations"
  ON maintenance_recommendations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to context_data"
  ON context_data FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to scheduled_services"
  ON scheduled_services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);