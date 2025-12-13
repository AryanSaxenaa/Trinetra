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
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!contextData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">No context data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Context Awareness</h1>
        <p className="text-gray-500">Environmental and operational factors affecting your vehicle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Cloud className="w-7 h-7 text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-light text-gray-900">{contextData.temperature}°C</p>
              <p className="text-xs text-gray-500">{contextData.weather_condition}</p>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-3">Weather Impact</h3>

          <div className="bg-blue-50 rounded-2xl p-4 mb-4 border border-blue-200">
            <p className="text-sm text-gray-700 mb-2">{contextData.weather_impact}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">System Load</span>
              <span className="text-sm font-medium text-blue-600">+{contextData.weather_impact_percentage}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Impact Level</span>
              <span>{contextData.weather_impact_percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${contextData.weather_impact_percentage}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-start bg-gray-50 rounded-2xl p-3">
            <AlertTriangle className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              Cooling system under higher load. Monitor coolant levels regularly.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Navigation className="w-7 h-7 text-orange-600" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{contextData.traffic_condition}</p>
              <p className="text-xs text-gray-500">Current Status</p>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-3">Traffic Condition</h3>

          <div className="bg-orange-50 rounded-2xl p-4 mb-4 border border-orange-200">
            <p className="text-sm text-gray-700">{contextData.traffic_impact}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-500 mb-1">Stop & Go</p>
              <p className="text-lg font-light text-gray-900">Moderate</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-500 mb-1">Brake Usage</p>
              <p className="text-lg font-light text-gray-900">Elevated</p>
            </div>
          </div>

          <div className="mt-4 flex items-start bg-gray-50 rounded-2xl p-3">
            <AlertTriangle className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              Heavy traffic increases brake and transmission wear.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-light text-gray-900">{contextData.terrain_stress_index}</p>
              <p className="text-xs text-gray-500">Stress Index</p>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-3">Terrain Stress</h3>

          <div className="bg-green-50 rounded-2xl p-4 mb-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Terrain Type</span>
              <span className="text-sm font-medium text-gray-900">{contextData.terrain_type}</span>
            </div>
            <div className="text-xs text-gray-600">
              Current driving conditions are within normal parameters
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Stress Level</span>
              <span>{contextData.terrain_stress_index}/100</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  contextData.terrain_stress_index < 40
                    ? 'bg-green-500'
                    : contextData.terrain_stress_index < 70
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${contextData.terrain_stress_index}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-500 mb-1">Suspension</p>
              <p className="text-sm font-medium text-green-600">Normal</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3">
              <p className="text-xs text-gray-500 mb-1">Drivetrain</p>
              <p className="text-sm font-medium text-green-600">Optimal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-lg text-white">
        <h3 className="text-xl font-light mb-4">AI Insights</h3>
        <p className="text-gray-300 leading-relaxed">
          Based on current environmental conditions, your vehicle is operating within optimal parameters.
          The elevated temperature may cause increased cooling system load over the next few days.
          Consider checking coolant levels before your next long trip. Traffic patterns suggest scheduling
          maintenance during off-peak hours for better efficiency.
        </p>
      </div>
    </div>
  );
}
