import { useEffect, useState } from 'react';
import { Cloud, Navigation, TrendingUp, AlertTriangle } from 'lucide-react';
import { supabase, ContextData } from '../lib/supabase';

export function ContextAwareness() {
  const [contextData, setContextData] = useState<ContextData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContextData();
  }, []);

  async function loadContextData() {
    try {
      const { data } = await supabase
        .from('context_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setContextData(data);
      }
    } catch (error) {
      console.error('Error loading context data:', error);
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

  if (!contextData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black font-bold">No context data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Context Awareness</h1>
        <p className="text-gray-600 font-bold">Environmental and operational factors affecting your vehicle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border-4 border-black p-8 hover:bg-gray-50 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-black border-2 border-black flex items-center justify-center">
              <Cloud className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-black">{contextData.temperature}°C</p>
              <p className="text-xs text-gray-600 font-bold uppercase">{contextData.weather_condition}</p>
            </div>
          </div>

          <h3 className="text-lg font-black text-black mb-3 uppercase">Weather Impact</h3>

          <div className="bg-gray-100 border-2 border-black p-4 mb-4">
            <p className="text-sm text-black font-bold mb-2">{contextData.weather_impact}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-bold uppercase">System Load</span>
              <span className="text-sm font-black text-black">+{contextData.weather_impact_percentage}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600 font-bold uppercase">
              <span>Impact Level</span>
              <span>{contextData.weather_impact_percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3 border-2 border-black">
              <div
                className="bg-black h-full transition-all duration-500"
                style={{ width: `${contextData.weather_impact_percentage}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-start bg-black p-3 border-2 border-black">
            <AlertTriangle className="w-4 h-4 text-white mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white font-bold">
              Cooling system under higher load. Monitor coolant levels regularly.
            </p>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-8 hover:bg-gray-50 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-black border-2 border-black flex items-center justify-center">
              <Navigation className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-black uppercase">{contextData.traffic_condition}</p>
              <p className="text-xs text-gray-600 font-bold uppercase">Current Status</p>
            </div>
          </div>

          <h3 className="text-lg font-black text-black mb-3 uppercase">Traffic Condition</h3>

          <div className="bg-gray-100 border-2 border-black p-4 mb-4">
            <p className="text-sm text-black font-bold">{contextData.traffic_impact}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 border-2 border-black p-3">
              <p className="text-xs text-gray-600 font-bold uppercase mb-1">Stop & Go</p>
              <p className="text-lg font-black text-black">Moderate</p>
            </div>
            <div className="bg-gray-100 border-2 border-black p-3">
              <p className="text-xs text-gray-600 font-bold uppercase mb-1">Brake Usage</p>
              <p className="text-lg font-black text-black">Elevated</p>
            </div>
          </div>

          <div className="mt-4 flex items-start bg-black p-3 border-2 border-black">
            <AlertTriangle className="w-4 h-4 text-white mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white font-bold">
              Heavy traffic increases brake and transmission wear.
            </p>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-8 hover:bg-gray-50 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-black border-2 border-black flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-black">{contextData.terrain_stress_index}</p>
              <p className="text-xs text-gray-600 font-bold uppercase">Stress Index</p>
            </div>
          </div>

          <h3 className="text-lg font-black text-black mb-3 uppercase">Terrain Stress</h3>

          <div className="bg-gray-100 border-2 border-black p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black font-bold uppercase">Terrain Type</span>
              <span className="text-sm font-black text-black uppercase">{contextData.terrain_type}</span>
            </div>
            <div className="text-xs text-gray-600 font-bold">
              Current driving conditions are within normal parameters
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-gray-600 font-bold uppercase">
              <span>Stress Level</span>
              <span>{contextData.terrain_stress_index}/100</span>
            </div>
            <div className="w-full bg-gray-200 h-3 border-2 border-black">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${contextData.terrain_stress_index}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 border-2 border-black p-3">
              <p className="text-xs text-gray-600 font-bold uppercase mb-1">Suspension</p>
              <p className="text-sm font-black text-black">Normal</p>
            </div>
            <div className="bg-gray-100 border-2 border-black p-3">
              <p className="text-xs text-gray-600 font-bold uppercase mb-1">Drivetrain</p>
              <p className="text-sm font-black text-black">Optimal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black border-4 border-black p-8 text-white">
        <h3 className="text-xl font-black mb-4 uppercase">AI Insights</h3>
        <p className="text-white font-bold leading-relaxed">
          Based on current environmental conditions, your vehicle is operating within optimal parameters.
          The elevated temperature may cause increased cooling system load over the next few days.
          Consider checking coolant levels before your next long trip. Traffic patterns suggest scheduling
          maintenance during off-peak hours for better efficiency.
        </p>
      </div>
    </div>
  );
}
