import React from 'react';
import { Scene } from './3d/Scene';
import { Activity, Battery, Zap, AlertTriangle, ShieldCheck, Clock, Calendar } from 'lucide-react';

/*
  Dashboard for Trinetra - AntarDrishti
  Features:
  - 3D Digital Twin (Scene)
  - Real-time vehicle telematics
*/

export function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 3D Display - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2 relative">
          <Scene />

          {/* Overlay controls or info if needed */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <span className="px-2 py-1 rounded bg-white shadow-sm text-xs text-brand-black font-medium">
              LIVE
            </span>
            <span className="px-2 py-1 rounded bg-white shadow-sm text-xs text-brand-gray-800">
              12ms
            </span>
          </div>
        </div>

        {/* Real-time Status Panel */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl h-full flex flex-col justify-between shadow-sm border border-brand-gray-100 min-h-[500px]">

            <div>
              <h2 className="text-2xl font-bold mb-1 text-brand-black tracking-tight">Status Report</h2>
              <p className="text-brand-gray-800/60 text-sm mb-8">ID: TRI-2025-X7</p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-brand-gray-50 border border-brand-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-black text-white mr-3">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase">System Health</p>
                        <p className="font-bold text-brand-black">98.5%</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[98.5%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-gray-50 border border-brand-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-black text-white mr-3">
                        <Battery size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase">Battery Level</p>
                        <p className="font-bold text-brand-black">87%</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[87%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-gray-50 border border-brand-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-black text-white mr-3">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase">MTBF Prediction</p>
                        <p className="font-bold text-brand-black">2,450 Hrs</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+15%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-gray-100">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 mb-1 flex items-center font-medium">
                    <Calendar size={12} className="mr-1" /> NEXT MAINTENANCE
                  </p>
                  <p className="text-lg text-brand-black font-bold">In 14 Days</p>
                </div>
                <button className="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition-all text-sm font-medium shadow-lg shadow-black/20">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of secondary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tire Pressure', value: '32 PSI', icon: Zap },
          { label: 'Oil Life', value: '68%', icon: Activity },
          { label: 'Brake Pads', value: 'Good', icon: ShieldCheck },
          { label: 'Active Alerts', value: '0 Active', icon: AlertTriangle },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-brand-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg bg-brand-gray-50 text-brand-black group-hover:bg-black group-hover:text-white transition-colors duration-300`}>
                <stat.icon size={18} />
              </div>
              <span className="text-[10px] text-gray-400 font-mono">SENSOR_{i + 1}</span>
            </div>
            <p className="text-2xl font-bold text-brand-black mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
