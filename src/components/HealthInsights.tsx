import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
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
        .order('health_score', { ascending: true });

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

  const statusConfig = {
    good: {
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    warning: {
      icon: AlertCircle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    },
    critical: {
      icon: XCircle,
      color: 'text-red-500',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Health Insights</h1>
        <p className="text-gray-500">Detailed component analysis and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {components.map((component) => {
          const config = statusConfig[component.status];
          const Icon = config.icon;

          return (
            <div
              key={component.id}
              className={`bg-white rounded-3xl p-6 shadow-lg border-2 ${config.border} transition-all hover:shadow-xl`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${config.bg} rounded-2xl flex items-center justify-center mr-4`}>
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{component.component_name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{component.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light text-gray-900">{component.health_score}</div>
                  <div className="text-xs text-gray-400">Score</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Health Status</span>
                  <span>{component.health_score}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      component.status === 'good'
                        ? 'bg-green-500'
                        : component.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${component.health_score}%` }}
                  />
                </div>
              </div>

              {component.trend_data && Array.isArray(component.trend_data) && component.trend_data.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Trend (Last 7 Days)</p>
                  <div className="flex items-end justify-between h-16 gap-1">
                    {component.trend_data.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col justify-end">
                        <div
                          className={`w-full rounded-t transition-all ${
                            value >= 80
                              ? 'bg-green-400'
                              : value >= 60
                              ? 'bg-yellow-400'
                              : 'bg-red-400'
                          }`}
                          style={{ height: `${value}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`${config.bg} rounded-2xl p-4 border ${config.border}`}>
                <p className="text-xs font-medium text-gray-700 mb-1">Analysis</p>
                <p className="text-sm text-gray-600">{component.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
