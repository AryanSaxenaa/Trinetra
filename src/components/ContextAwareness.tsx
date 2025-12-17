import { useEffect, useState } from 'react';
import { Cloud, Navigation, TrendingUp, AlertTriangle } from 'lucide-react';
import { ContextData } from '../lib/supabase';

// Mock Data for "Pro" Monochrome Look
const MOCK_CONTEXT: ContextData = {
  id: '1',
  vehicle_id: 'TRI-X7',
  temperature: 34,
  weather_condition: 'High Heat',
  weather_impact: 'Cooling demand high',
  weather_impact_percentage: 15,
  traffic_condition: 'Heavy Urban',
  traffic_impact: 'Frequent hard-braking',
  terrain_type: 'City Stop-Go',
  terrain_stress_index: 85, // High stress due to braking
  created_at: new Date().toISOString(),
};

export function ContextAwareness() {
  const [contextData, setContextData] = useState<ContextData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setContextData(MOCK_CONTEXT);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!contextData) {
    return <div className="p-8">No Data</div>;
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500 h-full">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

        {/* Weather Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-brand-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-brand-gray-50 rounded-xl flex items-center justify-center">
                <Cloud className="w-5 h-5 text-brand-black" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-brand-black">{contextData.temperature}°C</p>
                <p className="text-[10px] text-brand-gray-800 font-medium uppercase">{contextData.weather_condition}</p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-brand-black mb-2">Weather Impact</h3>

            <div className="bg-brand-gray-50 rounded-2xl p-3 mb-3 border border-brand-gray-100">
              <p className="text-xs text-brand-black mb-1 font-medium">{contextData.weather_impact}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 uppercase font-bold">System Load</span>
                <span className="text-xs font-bold text-brand-black">+{contextData.weather_impact_percentage}%</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                <span>Impact Level</span>
                <span>{contextData.weather_impact_percentage}%</span>
              </div>
              <div className="w-full bg-brand-gray-100 rounded-full h-1.5">
                <div
                  className="bg-black h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${contextData.weather_impact_percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-brand-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-brand-gray-50 rounded-xl flex items-center justify-center">
                <Navigation className="w-5 h-5 text-brand-black" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-brand-black">{contextData.traffic_condition}</p>
                <p className="text-[10px] text-brand-gray-800 font-medium uppercase">Current Status</p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-brand-black mb-2">Traffic Analysis</h3>

            <div className="bg-brand-gray-50 rounded-2xl p-3 mb-3 border border-brand-gray-100">
              <p className="text-xs text-brand-black font-medium">{contextData.traffic_impact}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-brand-gray-100 rounded-2xl p-2.5">
                <p className="text-[8px] text-gray-500 font-bold uppercase mb-0.5">Stop & Go</p>
                <p className="text-sm font-bold text-brand-black">Intense</p>
              </div>
              <div className="bg-white border border-brand-primary rounded-2xl p-2.5 bg-red-50">
                <p className="text-[8px] text-brand-primary font-bold uppercase mb-0.5">Brake Load</p>
                <p className="text-sm font-bold text-brand-black">High</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terrain Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-brand-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-brand-gray-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-brand-black" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-brand-black">{contextData.terrain_stress_index}</p>
                <p className="text-[10px] text-brand-gray-800 font-medium uppercase">Stress Index</p>
              </div>
            </div>

            <h3 className="text-sm font-bold text-brand-black mb-2">Terrain Data</h3>

            <div className="bg-brand-gray-50 rounded-2xl p-3 mb-3 border border-brand-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-bold uppercase">Type</span>
                <span className="text-xs font-bold text-brand-black">{contextData.terrain_type}</span>
              </div>
            </div>

            <div className="space-y-1 mb-2">
              <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                <span>Stress Level</span>
                <span>{contextData.terrain_stress_index}/100</span>
              </div>
              <div className="w-full bg-brand-gray-100 rounded-full h-1.5">
                <div
                  className="bg-black h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${contextData.terrain_stress_index}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-black rounded-3xl p-5 shadow-lg text-white">
        <h3 className="text-sm font-bold mb-1">AI Summary</h3>
        <p className="text-gray-400 text-xs leading-relaxed">
          <span className="text-brand-primary font-bold">ALERT:</span> Data Analysis Agent detects increased brake hydraulic pressure correlated with frequent hard-braking events.
          Recommendation: Schedule a brake inspection immediately to prevent potential pad failure.
        </p>
      </div>
    </div>
  );
}
