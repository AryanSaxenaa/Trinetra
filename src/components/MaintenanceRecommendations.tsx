import { useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, MaintenanceRecommendation } from '../lib/supabase';

export function MaintenanceRecommendations() {
  const [recommendations, setRecommendations] = useState<MaintenanceRecommendation[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  async function loadRecommendations() {
    try {
      const { data } = await supabase
        .from('maintenance_recommendations')
        .select('*')
        .eq('completed', false)
        .order('urgency', { ascending: false });

      if (data) {
        const sortedData = data.sort((a, b) => {
          const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return urgencyOrder[a.urgency as keyof typeof urgencyOrder] - urgencyOrder[b.urgency as keyof typeof urgencyOrder];
        });
        setRecommendations(sortedData);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
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
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const urgencyConfig = {
    critical: {
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-300',
      badge: 'bg-red-600',
    },
    high: {
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      badge: 'bg-orange-600',
    },
    medium: {
      icon: Info,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      badge: 'bg-yellow-600',
    },
    low: {
      icon: Info,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      badge: 'bg-blue-600',
    },
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Maintenance Recommendations</h1>
        <p className="text-gray-500">AI-powered maintenance suggestions for optimal vehicle health</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">All Clear!</h3>
          <p className="text-gray-500">No maintenance recommendations at this time</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((recommendation) => {
            const config = urgencyConfig[recommendation.urgency];
            const Icon = config.icon;
            const isExpanded = expandedId === recommendation.id;

            return (
              <div
                key={recommendation.id}
                className={`bg-white rounded-3xl p-6 shadow-lg border-2 ${config.border} transition-all hover:shadow-xl`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start flex-1">
                    <div className={`w-12 h-12 ${config.bg} rounded-2xl flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{recommendation.title}</h3>
                        <span className={`${config.badge} text-white text-xs px-3 py-1 rounded-full uppercase font-medium`}>
                          {recommendation.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">Estimated Cost:</span>
                          <span className="font-medium text-gray-900">${recommendation.estimated_cost}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">Priority:</span>
                          <span className="font-medium capitalize text-gray-900">{recommendation.urgency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleExpanded(recommendation.id)}
                  className={`w-full ${config.bg} rounded-2xl p-4 flex items-center justify-between hover:opacity-80 transition-all border ${config.border}`}
                >
                  <span className={`text-sm font-medium ${config.color}`}>
                    Why this is recommended
                  </span>
                  {isExpanded ? (
                    <ChevronUp className={`w-5 h-5 ${config.color}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${config.color}`} />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-4 bg-gray-50 rounded-2xl p-5 border border-gray-200 animate-in slide-in-from-top duration-200">
                    <p className="text-sm font-medium text-gray-900 mb-2">Detailed Analysis</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{recommendation.reasoning}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-lg text-white">
        <h3 className="text-xl font-light mb-4">Preventive Care Advantage</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          Addressing maintenance recommendations proactively can save you up to 40% in long-term repair costs.
          Our AI analyzes thousands of data points to predict issues before they become expensive problems.
        </p>
        <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-2xl p-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Potential Savings</p>
            <p className="text-2xl font-light">$1,200 - $3,500</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Over Next</p>
            <p className="text-2xl font-light">12 Months</p>
          </div>
        </div>
      </div>
    </div>
  );
}
