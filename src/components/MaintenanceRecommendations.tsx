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
        <div className="text-black font-bold">Loading...</div>
      </div>
    );
  }

  const urgencyConfig = {
    critical: {
      icon: AlertCircle,
      color: 'text-black',
      bg: 'bg-gray-900',
      border: 'border-black',
      badge: 'bg-black',
    },
    high: {
      icon: AlertTriangle,
      color: 'text-black',
      bg: 'bg-gray-700',
      border: 'border-black',
      badge: 'bg-gray-700',
    },
    medium: {
      icon: Info,
      color: 'text-black',
      bg: 'bg-gray-400',
      border: 'border-black',
      badge: 'bg-gray-400',
    },
    low: {
      icon: Info,
      color: 'text-black',
      bg: 'bg-gray-200',
      border: 'border-black',
      badge: 'bg-gray-200',
    },
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Maintenance Recommendations</h1>
        <p className="text-gray-600 font-bold">AI-powered maintenance suggestions for optimal vehicle health</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-white border-4 border-black p-12 text-center">
          <div className="w-16 h-16 bg-black border-2 border-black flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-black mb-2 uppercase">All Clear!</h3>
          <p className="text-gray-600 font-bold uppercase">No maintenance recommendations at this time</p>
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
                className={`bg-white p-6 border-4 ${config.border} transition-all hover:bg-gray-50`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start flex-1">
                    <div className={`w-12 h-12 ${config.bg} border-2 border-black flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-black text-black uppercase">{recommendation.title}</h3>
                        <span className={`${config.badge} border-2 border-black text-white text-xs px-3 py-1 uppercase font-black`}>
                          {recommendation.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-bold mb-3">{recommendation.description}</p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-600 font-bold uppercase mr-2">Estimated Cost:</span>
                          <span className="font-black text-black">${recommendation.estimated_cost}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 font-bold uppercase mr-2">Priority:</span>
                          <span className="font-black capitalize text-black uppercase">{recommendation.urgency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleExpanded(recommendation.id)}
                  className={`w-full ${config.bg} p-4 flex items-center justify-between hover:opacity-80 transition-all border-2 border-black`}
                >
                  <span className="text-sm font-black text-white uppercase">
                    Why this is recommended
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-4 bg-gray-100 p-5 border-2 border-black animate-in slide-in-from-top duration-200">
                    <p className="text-sm font-black text-black mb-2 uppercase">Detailed Analysis</p>
                    <p className="text-sm text-black font-bold leading-relaxed">{recommendation.reasoning}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-black border-4 border-black p-8 text-white">
        <h3 className="text-xl font-black mb-4 uppercase">Preventive Care Advantage</h3>
        <p className="text-white font-bold leading-relaxed mb-4">
          Addressing maintenance recommendations proactively can save you up to 40% in long-term repair costs.
          Our AI analyzes thousands of data points to predict issues before they become expensive problems.
        </p>
        <div className="flex items-center justify-between bg-gray-800 border-2 border-white p-4">
          <div>
            <p className="text-xs text-gray-300 font-bold uppercase mb-1">Potential Savings</p>
            <p className="text-2xl font-black">$1,200 - $3,500</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 font-bold uppercase mb-1">Over Next</p>
            <p className="text-2xl font-black">12 Months</p>
          </div>
        </div>
      </div>
    </div>
  );
}
