import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  mileage: number;
  wellness_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface VehicleHealthMetrics {
  id: string;
  vehicle_id: string;
  battery_health: number;
  engine_wear: number;
  tire_wear: number;
  engine_temp: number;
  brake_wear: number;
  coolant_level: number;
  oil_quality: number;
  transmission_health: number;
  created_at: string;
}

export interface ComponentHealth {
  id: string;
  vehicle_id: string;
  component_name: string;
  health_score: number;
  status: 'good' | 'warning' | 'critical';
  trend_data: number[];
  reason: string;
  updated_at: string;
}

export interface MaintenanceRecommendation {
  id: string;
  vehicle_id: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimated_cost: number;
  reasoning: string;
  completed: boolean;
  created_at: string;
}

export interface ContextData {
  id: string;
  vehicle_id: string;
  weather_condition: string;
  temperature: number;
  weather_impact: string;
  weather_impact_percentage: number;
  traffic_condition: string;
  traffic_impact: string;
  terrain_type: string;
  terrain_stress_index: number;
  created_at: string;
}

export interface ScheduledService {
  id: string;
  vehicle_id: string;
  service_type: string;
  scheduled_date: string;
  scheduled_time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed';
  created_at: string;
}
