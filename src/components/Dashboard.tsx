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
        <div className="text-black font-bold">Loading...</div>
      </div>
    );
  }

  if (!vehicle || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black font-bold">No vehicle data available</div>
      </div>
    );
  }

  const statusColors = {
    'Healthy': 'bg-black',
    'Needs Attention': 'bg-gray-600',
    'Service Required': 'bg-gray-900',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white border-4 border-black p-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-black text-black mb-8 uppercase tracking-tight">Vehicle Wellness</h2>

            <div className="relative w-64 h-64 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="#e5e5e5"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="#000000"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 112}`}
                  strokeDashoffset={`${2 * Math.PI * 112 * (1 - vehicle.wellness_score / 100)}`}
                  strokeLinecap="square"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-black">{vehicle.wellness_score}</span>
                <span className="text-gray-600 text-sm font-bold uppercase">/ 100</span>
              </div>
            </div>

            <div className={`inline-flex items-center px-6 py-2 border-2 border-black ${statusColors[vehicle.status as keyof typeof statusColors]}`}>
              <span className={`w-2 h-2 ${statusColors[vehicle.status as keyof typeof statusColors]} mr-2 border border-white`}></span>
              <span className="text-sm font-black text-white uppercase">{vehicle.status}</span>
            </div>

            <div className="mt-8 w-full border-t-2 border-black pt-4">
              <p className="text-sm text-black font-bold mb-1">{vehicle.name}</p>
              <p className="text-xs text-gray-600 font-bold uppercase">{vehicle.model} • {vehicle.year}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-white border-4 border-black p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center mr-4">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase">Mileage</p>
                  <p className="text-2xl font-black text-black">{vehicle.mileage.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-xs text-gray-600 font-bold uppercase">km</span>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center mr-4">
                  <Battery className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase">Battery Health</p>
                  <p className="text-2xl font-black text-black">{metrics.battery_health}%</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-black" />
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center mr-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase">Engine Wear</p>
                  <p className="text-2xl font-black text-black">{metrics.engine_wear}%</p>
                </div>
              </div>
              <span className={`text-xs font-black uppercase ${metrics.engine_wear < 30 ? 'text-black' : metrics.engine_wear < 60 ? 'text-gray-600' : 'text-gray-900'}`}>
                {metrics.engine_wear < 30 ? 'Excellent' : metrics.engine_wear < 60 ? 'Good' : 'Check'}
              </span>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v5l3 3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-bold uppercase">Tire Wear</p>
                  <p className="text-2xl font-black text-black">{metrics.tire_wear}%</p>
                </div>
              </div>
              <span className={`text-xs font-black uppercase ${metrics.tire_wear < 40 ? 'text-black' : metrics.tire_wear < 70 ? 'text-gray-600' : 'text-gray-900'}`}>
                {metrics.tire_wear < 40 ? 'Excellent' : metrics.tire_wear < 70 ? 'Monitor' : 'Replace'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
