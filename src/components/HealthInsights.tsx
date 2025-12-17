import React from 'react';
import { Activity, Heart, Thermometer, Wind, AlertCircle } from 'lucide-react';

export function HealthInsights() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="bg-white p-8 rounded-3xl relative overflow-hidden shadow-sm border border-brand-gray-100">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity size={100} className="text-black" />
        </div>

        <h2 className="text-2xl font-bold text-brand-black mb-2 tracking-tight">Vehicle Wellness Score</h2>
        <div className="flex items-end space-x-4 mb-8">
          <span className="text-6xl font-black text-brand-black tracking-tighter">
            94
          </span>
          <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full mb-2">▲ 2.5% vs Last Week</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Radar Chart Placeholder */}
          <div className="aspect-square bg-brand-gray-50 rounded-2xl flex items-center justify-center relative border border-brand-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[80%] border border-brand-gray-200 rounded-full" />
              <div className="absolute w-[60%] h-[60%] border border-brand-gray-200 rounded-full" />
              <div className="absolute w-[40%] h-[40%] border border-brand-gray-200 rounded-full" />

              <div className="absolute w-[70%] h-[70%] bg-black/5 rotate-45 skew-x-12 border border-black/10" />
            </div>
            <span className="relative z-10 text-[10px] font-bold tracking-widest text-center text-brand-gray-800 uppercase">
              Multi-Point<br />Analysis
            </span>
          </div>

          <div className="md:col-span-2 space-y-5">
            {[
              { label: 'Powertrain Efficiency', value: 98, color: 'bg-green-500' },
              { label: 'Braking System', value: 92, color: 'bg-black' },
              { label: 'Electrical/Battery', value: 85, color: 'bg-gray-600' },
              { label: 'Suspension Integrity', value: 96, color: 'bg-gray-400' },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-brand-gray-800 font-medium">{metric.label}</span>
                  <span className="text-brand-black font-bold">{metric.value}%</span>
                </div>
                <div className="h-2 bg-brand-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Engine Temp', value: '195°F', status: 'Normal', icon: Thermometer },
          { title: 'Intake Pressure', value: '14.2 PSI', status: 'Optimal', icon: Wind },
          { title: 'Oil Quality', value: 'Good', status: 'Change in 3k mi', icon: Heart },
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl flex items-start space-x-4 hover:shadow-md transition-shadow border border-brand-gray-100">
            <div className="p-3 bg-brand-gray-50 rounded-xl text-brand-black">
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{card.title}</p>
              <p className="text-xl font-bold text-brand-black my-1">{card.value}</p>
              <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">
                {card.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
