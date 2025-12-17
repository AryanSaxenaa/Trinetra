import { Activity, Heart, Thermometer, Wind, AlertCircle, Info, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

export function HealthInsights() {
  return (
    <div className="space-y-4 animate-in fade-in duration-700 h-full flex flex-col">
      {/* Top Dashboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">

        {/* Wellness Score (Left) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl shadow-sm border border-brand-gray-100 flex flex-col justify-center relative overflow-hidden">
          <div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-1">Wellness Score</span>
            <span className="text-6xl font-black text-brand-black tracking-tighter block mb-2">75</span>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full inline-flex items-center">
              <ArrowDown size={12} className="mr-1" /> 12% vs Last Week
            </span>
          </div>
        </div>

        {/* Radar Chart (Center) */}
        <div className="lg:col-span-4 bg-white p-4 rounded-3xl shadow-sm border border-brand-gray-100 flex items-center justify-center">
          <div className="w-full h-48 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {[40, 60, 80].map((r, i) => (
                <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#e5e7eb" strokeWidth="1" />
              ))}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#d1d5db" strokeWidth="1" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="#e5e7eb" strokeWidth="1" />
              <text x="100" y="15" textAnchor="middle" fontSize="8" fill="#6b7280" fontWeight="bold">POWER</text>
              <text x="190" y="103" textAnchor="middle" fontSize="8" fill="#6b7280" fontWeight="bold">BRAKE</text>
              <text x="100" y="192" textAnchor="middle" fontSize="8" fill="#6b7280" fontWeight="bold">ELEC</text>
              <text x="10" y="103" textAnchor="middle" fontSize="8" fill="#6b7280" fontWeight="bold">SUSP</text>
              {/* Adjusted Radar Polygon for Low Braking Score */}
              <path d="M100 21.6 L150 100 L100 168 L23.2 100 Z" fill="rgba(217, 8, 60, 0.2)" stroke="#D9083C" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle cx="100" cy="21.6" r="3" fill="#D9083C" />
              <circle cx="150" cy="100" r="3" fill="#D9083C" />
              <circle cx="100" cy="168" r="3" fill="#D9083C" />
              <circle cx="23.2" cy="100" r="3" fill="#D9083C" />
            </svg>
          </div>
        </div>

        {/* Key Metrics (Right) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl shadow-sm border border-brand-gray-100 flex flex-col justify-center gap-4">
          {[
            { label: 'Powertrain', value: 98, color: 'bg-green-500', trend: 'stable' },
            { label: 'Braking', value: 72, color: 'bg-red-500', trend: 'down' },
            { label: 'Battery', value: 85, color: 'bg-gray-600', trend: 'up' },
            { label: 'Suspension', value: 90, color: 'bg-gray-400', trend: 'stable' },
          ].map((metric) => (
            <div key={metric.label} className="group">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs text-brand-gray-800 font-medium">{metric.label}</span>
                <span className={`text-sm font-bold ${metric.value < 80 ? 'text-brand-primary' : 'text-brand-black'}`}>{metric.value}%</span>
              </div>
              <div className="relative h-1.5 bg-brand-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${metric.color} rounded-full`} style={{ width: `${metric.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        {[
          { title: 'Engine Temp', value: '195°F', status: 'Normal', icon: Thermometer },
          { title: 'Intake Pressure', value: '14.2 PSI', status: 'Optimal', icon: Wind },
          { title: 'Oil Quality', value: 'Good', status: 'Change in 3k mi', icon: Heart },
        ].map((card, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl flex items-center space-x-3 hover:shadow-md transition-shadow border border-brand-gray-100">
            <div className="p-2 bg-brand-gray-50 rounded-xl text-brand-black">
              <card.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{card.title}</p>
              <p className="text-lg font-bold text-brand-black leading-tight">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Diagnostic Trends Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Engine Temperature History */}
        <div className="bg-white p-5 rounded-3xl border border-brand-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-heading font-bold text-base text-brand-black">Engine Temperature (24h)</h3>
            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Normal</span>
          </div>
          <div className="w-full relative h-32">
            {/* Simple Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-gray-400">
              <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
              <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
              <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
            </div>
            {/* SVG Line Chart */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D9083C" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#D9083C" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area */}
              <path d="M0 50 L0 40 Q 20 10 40 15 T 80 12 T 100 15 V 50 Z" fill="url(#tempGradient)" />
              {/* Line */}
              <path d="M0 40 Q 20 10 40 15 T 80 12 T 100 15" fill="none" stroke="#D9083C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-gray-400 mt-1">
              <span>00:00</span>
              <span>12:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* Weekly Efficiency Bar Chart */}
        <div className="bg-white p-5 rounded-3xl border border-brand-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-heading font-bold text-base text-brand-black">Weekly Efficiency</h3>
            <span className="text-[10px] text-brand-gray-800">Avg: 94%</span>
          </div>
          <div className="w-full relative flex items-end justify-between px-2 gap-2 h-32">
            {[
              { day: 'Mon', val: 85, color: '#e8e8e8' },
              { day: 'Tue', val: 92, color: '#e8e8e8' },
              { day: 'Wed', val: 96, color: '#000000' },
              { day: 'Thu', val: 94, color: '#e8e8e8' },
              { day: 'Fri', val: 88, color: '#e8e8e8' },
              { day: 'Sat', val: 98, color: '#D9083C' }, // Peak
              { day: 'Sun', val: 90, color: '#e8e8e8' },
            ].map((d, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                <div className="relative w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${d.val}%`, backgroundColor: d.color }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {d.val}%
                  </div>
                </div>
                <span className="text-[8px] text-gray-500 font-medium mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
