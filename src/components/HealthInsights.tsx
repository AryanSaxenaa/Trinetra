import { useEffect, useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { supabase, ComponentHealth } from '../lib/supabase';

export function HealthInsights() {
  const [components, setComponents] = useState<ComponentHealth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComponents();
  }, []);

  async function loadComponents() {
    try {
      const { data } = await supabase
        .from('component_health')
        .select('*')
        .order('health_score', { ascending: false });

      if (data) {
        setComponents(data);
      }
    } catch (error) {
      console.error('Error loading components:', error);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'good':
        return 'Optimal';
      case 'warning':
        return 'Attention';
      case 'critical':
        return 'Critical';
      default:
        return status;
    }
  };

  const getTrendDirection = (trendData: number[]) => {
    if (!trendData || trendData.length < 2) return 'neutral';
    const first = trendData[0];
    const last = trendData[trendData.length - 1];
    return last > first ? 'up' : last < first ? 'down' : 'neutral';
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-normal text-gray-900 mb-2">Health Insights</h1>
        <p className="text-gray-600">Monitor component health and performance trends</p>
      </div>

      <div className="space-y-4">
        {components.map((component) => {
          const trendDirection = getTrendDirection(component.trend_data as number[]);

          return (
            <div
              key={component.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(component.status)}`} />
                    <div>
                      <h3 className="text-xl font-normal text-gray-900">{component.component_name}</h3>
                      <p className="text-sm text-gray-500">{getStatusLabel(component.status)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-5xl font-light text-gray-900">{component.health_score}%</div>
                      <div className="text-xs text-gray-500">Health Score</div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Performance Trend</h4>
                    {trendDirection === 'up' && (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    )}
                    {trendDirection === 'down' && (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </div>

                  {component.trend_data && Array.isArray(component.trend_data) && component.trend_data.length > 0 && (
                    <div>
                      <div className="flex items-end justify-between h-32 gap-1">
                        {component.trend_data.map((value, index) => {
                          const maxValue = Math.max(...(component.trend_data as number[]));
                          const height = (value / maxValue) * 100;

                          return (
                            <div key={index} className="flex-1 flex flex-col justify-end">
                              <div
                                className="w-full bg-gray-800 rounded-t-sm transition-all"
                                style={{ height: `${height}%`, minHeight: '4px' }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">30 days ago</span>
                        <span className="text-xs text-gray-500">Today</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
