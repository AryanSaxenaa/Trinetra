import { useEffect, useState } from 'react';
import { Activity, Battery, Gauge, TrendingUp } from 'lucide-react';
import { supabase, Vehicle, VehicleHealthMetrics } from '../lib/supabase';

export function Dashboard() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [metrics, setMetrics] = useState<VehicleHealthMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: vehicleData } = await supabase
        .from('vehicles')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (vehicleData) {
        setVehicle(vehicleData);

        const { data: metricsData } = await supabase
          .from('vehicle_health_metrics')
          .select('*')
          .eq('vehicle_id', vehicleData.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        setMetrics(metricsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!vehicle || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">No vehicle data available</div>
      </div>
    );
  }

  const statusColors = {
    'Healthy': 'bg-green-500',
    'Needs Attention': 'bg-yellow-500',
    'Service Required': 'bg-red-500',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-light text-gray-800 mb-8">Vehicle Wellness</h2>

            <div className="relative w-64 h-64 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="#f0f0f0"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke={vehicle.wellness_score >= 80 ? '#10b981' : vehicle.wellness_score >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 112}`}
                  strokeDashoffset={`${2 * Math.PI * 112 * (1 - vehicle.wellness_score / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-light text-gray-900">{vehicle.wellness_score}</span>
                <span className="text-gray-500 text-sm">out of 100</span>
              </div>
            </div>

            <div className={`inline-flex items-center px-6 py-2 rounded-full ${statusColors[vehicle.status as keyof typeof statusColors]} bg-opacity-10`}>
              <span className={`w-2 h-2 rounded-full ${statusColors[vehicle.status as keyof typeof statusColors]} mr-2`}></span>
              <span className="text-sm font-medium text-gray-900">{vehicle.status}</span>
            </div>

            <div className="mt-8 w-full">
              <p className="text-sm text-gray-600 mb-2">{vehicle.name}</p>
              <p className="text-xs text-gray-400">{vehicle.model} • {vehicle.year}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mr-4">
                  <Gauge className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="text-2xl font-light text-gray-900">{vehicle.mileage.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">km</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
                  <Battery className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Battery Health</p>
                  <p className="text-2xl font-light text-gray-900">{metrics.battery_health}%</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engine Wear</p>
                  <p className="text-2xl font-light text-gray-900">{metrics.engine_wear}%</p>
                </div>
              </div>
              <span className={`text-xs ${metrics.engine_wear < 30 ? 'text-green-500' : metrics.engine_wear < 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {metrics.engine_wear < 30 ? 'Excellent' : metrics.engine_wear < 60 ? 'Good' : 'Check'}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tire Wear</p>
                  <p className="text-2xl font-light text-gray-900">{metrics.tire_wear}%</p>
                </div>
              </div>
              <span className={`text-xs ${metrics.tire_wear < 40 ? 'text-green-500' : metrics.tire_wear < 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                {metrics.tire_wear < 40 ? 'Excellent' : metrics.tire_wear < 70 ? 'Monitor' : 'Replace'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
