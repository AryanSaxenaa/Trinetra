import { useEffect, useState } from 'react';
import { Cloud, Navigation, TrendingUp, AlertTriangle } from 'lucide-react';
import { ContextData } from '../lib/supabase';

// Mock Data for "Pro" Monochrome Look
const MOCK_CONTEXT: ContextData = {
  id: '1',
  vehicle_id: 'TRI-X7',
  temperature: 24,
  weather_condition: 'Partly Cloudy',
  weather_impact: 'Optimal for electric efficiency',
  weather_impact_percentage: 98,
  traffic_condition: 'Moderate Flow',
  traffic_impact: 'Standard consumption',
  terrain_type: 'Urban Asphalt',
  terrain_stress_index: 12, // Low stress
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-black mb-1">Context Awareness</h1>
        <p className="text-gray-500">Environmental factors affecting vehicle performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Weather Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-brand-gray-50 rounded-xl flex items-center justify-center">
              <Cloud className="w-6 h-6 text-brand-black" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-brand-black">{contextData.temperature}°C</p>
              <p className="text-xs text-brand-gray-800 font-medium uppercase">{contextData.weather_condition}</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-black mb-3">Weather Impact</h3>

          <div className="bg-brand-gray-50 rounded-2xl p-4 mb-4 border border-brand-gray-100">
            <p className="text-sm text-brand-black mb-2 font-medium">{contextData.weather_impact}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 uppercase font-bold">System Load</span>
              <span className="text-sm font-bold text-brand-black">+{contextData.weather_impact_percentage}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500 font-bold uppercase">
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

        {/* Traffic Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-brand-gray-50 rounded-xl flex items-center justify-center">
              <Navigation className="w-6 h-6 text-brand-black" />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-brand-black">{contextData.traffic_condition}</p>
              <p className="text-xs text-brand-gray-800 font-medium uppercase">Current Status</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-black mb-3">Traffic Analysis</h3>

          <div className="bg-brand-gray-50 rounded-2xl p-4 mb-4 border border-brand-gray-100">
            <p className="text-sm text-brand-black font-medium">{contextData.traffic_impact}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-brand-gray-100 rounded-2xl p-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Stop & Go</p>
              <p className="text-lg font-bold text-brand-black">Moderate</p>
            </div>
            <div className="bg-white border border-brand-gray-100 rounded-2xl p-3">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Brake Usage</p>
              <p className="text-lg font-bold text-brand-black">Normal</p>
            </div>
          </div>
        </div>

        {/* Terrain Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-brand-gray-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-brand-black" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-brand-black">{contextData.terrain_stress_index}</p>
              <p className="text-xs text-brand-gray-800 font-medium uppercase">Stress Index</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-black mb-3">Terrain Data</h3>

          <div className="bg-brand-gray-50 rounded-2xl p-4 mb-4 border border-brand-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 font-bold uppercase">Type</span>
              <span className="text-sm font-bold text-brand-black">{contextData.terrain_type}</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-gray-500 font-bold uppercase">
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

      <div className="bg-brand-black rounded-3xl p-8 shadow-lg text-white">
        <h3 className="text-xl font-bold mb-2">AI Summary</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Vehicle is operating at peak efficiency. Urban terrain conditions are favorable.
          Recommendation: Maintain current driving profile for maximum range.
        </p>
      </div>
    </div>
  );
}
