import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';
import { supabase, ComponentHealth } from '../lib/supabase';

export function HealthInsights() {
  const [components, setComponents] = useState<ComponentHealth[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
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

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black font-bold">Loading...</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-black';
      case 'warning':
        return 'bg-gray-600';
      case 'critical':
        return 'bg-gray-900';
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
        <h1 className="text-4xl font-black text-black mb-2 uppercase tracking-tight">Health Insights</h1>
        <p className="text-gray-600 font-bold">Monitor component health and performance trends</p>
      </div>

      <div className="space-y-4">
        {components.map((component) => {
          const isExpanded = expandedId === component.id;
          const trendDirection = getTrendDirection(component.trend_data as number[]);

          return (
            <div
              key={component.id}
              className="bg-white border-4 border-black overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(component.id)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 border-2 border-black ${getStatusColor(component.status)}`} />
                  <div className="text-left">
                    <h3 className="text-xl font-black text-black uppercase">{component.component_name}</h3>
                    <p className="text-sm text-gray-600 font-bold uppercase">{getStatusLabel(component.status)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-4xl font-black text-black">{component.health_score}%</div>
                    <div className="text-xs text-gray-600 font-bold uppercase">Health Score</div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-8 pb-8 border-t-4 border-black">
                  <div className="flex items-center justify-between mb-4 mt-6">
                    <h4 className="text-sm font-black text-black uppercase">Performance Trend</h4>
                    {trendDirection === 'up' && (
                      <TrendingUp className="w-5 h-5 text-black" />
                    )}
                    {trendDirection === 'down' && (
                      <TrendingDown className="w-5 h-5 text-black" />
                    )}
                  </div>

                  {component.trend_data && Array.isArray(component.trend_data) && component.trend_data.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-end justify-between h-32 gap-1">
                        {component.trend_data.map((value, index) => {
                          const maxValue = Math.max(...(component.trend_data as number[]));
                          const height = (value / maxValue) * 100;

                          return (
                            <div key={index} className="flex-1 flex flex-col justify-end group relative">
                              <div
                                className="w-full bg-black border border-white transition-all hover:bg-gray-800"
                                style={{ height: `${height}%` }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-600 font-bold uppercase">30 days ago</span>
                        <span className="text-xs text-gray-600 font-bold uppercase">Today</span>
                      </div>
                    </div>
                  )}

                  {component.reason && (
                    <div className="bg-gray-100 border-2 border-black p-4">
                      <p className="text-sm text-black font-bold leading-relaxed">{component.reason}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
