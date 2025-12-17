import { useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, Info, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { MaintenanceRecommendation } from '../lib/supabase';

const MOCK_RECOMMENDATIONS: MaintenanceRecommendation[] = [
  {
    id: '1',
    vehicle_id: 'TRI-X7',
    title: 'Brake Pad Replacement',
    description: 'Front brake pads have reached 20% thickness.',
    urgency: 'high',
    estimated_cost: 350,
    reasoning: 'Heavy traffic patterns have accelerated wear. Replacement recommended to ensure safety.',
    completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    vehicle_id: 'TRI-X7',
    title: 'Tire Rotation',
    description: 'Uneven wear detected on rear tires.',
    urgency: 'medium',
    estimated_cost: 80,
    reasoning: 'Routine rotation will extend tire life by approximately 5,000 miles.',
    completed: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    vehicle_id: 'TRI-X7',
    title: 'Software Update 2.4.1',
    description: 'Optimizes battery thermal management.',
    urgency: 'low',
    estimated_cost: 0,
    reasoning: 'Over-the-air update available. Will improve range by 2%.',
    completed: false,
    created_at: new Date().toISOString(),
  }
];

export function MaintenanceRecommendations() {
  const [recommendations, setRecommendations] = useState<MaintenanceRecommendation[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecommendations(MOCK_RECOMMENDATIONS);
      setLoading(false);
    }, 500);
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Monochrome Urgency Config
  const urgencyConfig = {
    critical: {
      icon: AlertCircle,
      iconColor: 'text-black',
      borderColor: 'border-black',
      badgeBg: 'bg-black',
      badgeText: 'text-white',
    },
    high: {
      icon: AlertTriangle,
      iconColor: 'text-brand-black',
      borderColor: 'border-gray-400',
      badgeBg: 'bg-gray-800',
      badgeText: 'text-white',
    },
    medium: {
      icon: Info,
      iconColor: 'text-gray-600',
      borderColor: 'border-gray-200',
      badgeBg: 'bg-gray-200',
      badgeText: 'text-black',
    },
    low: {
      icon: Info,
      iconColor: 'text-gray-400',
      borderColor: 'border-gray-100',
      badgeBg: 'bg-gray-100',
      badgeText: 'text-gray-600',
    },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-black mb-1">Maintenance Recommendations</h1>
        <p className="text-gray-500">AI-powered maintenance suggestions for optimal vehicle health</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-brand-gray-100 text-center">
          <div className="w-16 h-16 bg-brand-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-brand-black mb-2">All Clear!</h3>
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
                className={`bg-white rounded-3xl p-6 shadow-sm border-2 ${config.borderColor} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start flex-1">
                    <div className={`w-12 h-12 bg-brand-gray-50 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-brand-black">{recommendation.title}</h3>
                        <span className={`${config.badgeBg} ${config.badgeText} text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider`}>
                          {recommendation.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-400 font-bold uppercase text-[10px] mr-2">Est. Cost</span>
                          <span className="font-bold text-brand-black">${recommendation.estimated_cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-gray-50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleExpanded(recommendation.id)}
                    className="w-full px-5 py-3 flex items-center justify-between hover:bg-brand-gray-100 transition-colors"
                  >
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Analysis & Reasoning
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 animate-in slide-in-from-top duration-200">
                      <p className="text-sm text-gray-700 leading-relaxed">{recommendation.reasoning}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-black rounded-3xl p-8 shadow-lg text-white">
        <h3 className="text-xl font-bold mb-4">Proactive Care</h3>
        <p className="text-gray-400 leading-relaxed mb-6 text-sm">
          Addressing maintenance recommendations proactively can save you up to 40% in long-term repair costs.
          Our AI analyzes thousands of data points to predict issues before they become expensive problems.
        </p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Potential Savings</p>
            <p className="text-2xl font-bold">$1,200</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Horizon</p>
            <p className="text-2xl font-bold">12 Mo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
