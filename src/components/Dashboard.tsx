
import { Scene } from './3d/Scene';
import { Activity, Battery, Zap, AlertTriangle, ShieldCheck, Clock, Calendar } from 'lucide-react';

/*
  Dashboard for AntarDrishti
  Features:
  - 3D Digital Twin (Scene)
  - Real-time vehicle telematics
*/

export function Dashboard() {
  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-700 pb-2">
      {/* Top Summary Banner - Compact */}
      <div className="bg-brand-black text-white px-6 py-3 rounded-2xl shadow-lg border-l-4 border-yellow-500 flex flex-col md:flex-row items-center justify-between shrink-0 mt-2">
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">Vehicle Status</span>
            <span className="text-sm font-bold flex items-center text-yellow-500">ATTENTION <span className="ml-2 text-yellow-500"></span></span>
          </div>
          <div className="h-6 w-px bg-white/20 hidden md:block" />
          <div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">Wellness Score</span>
            <span className="text-sm font-bold text-white">75 / 100</span>
          </div>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">Next Recommended Action</span>
          <span className="text-xs font-medium text-white">Brake Check-up Recommended</span>
        </div>
      </div>

      {/* Main Content - Takes remaining height */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">

        {/* LEFT: Main 3D Display (66%) */}
        <div className="lg:col-span-8 relative h-full min-h-[400px] bg-brand-gray-50 rounded-3xl overflow-hidden border border-brand-gray-100">
          <Scene />

          <div className="absolute top-4 right-4 flex space-x-2 pointer-events-none">
            <span className="px-2 py-1 rounded bg-white/80 backdrop-blur-md shadow-sm text-[10px] text-brand-black font-medium border border-brand-gray-100">
              LIVE
            </span>
            <span className="px-2 py-1 rounded bg-white/80 backdrop-blur-md shadow-sm text-[10px] text-brand-gray-800 border border-brand-gray-100">
              12ms
            </span>
          </div>
        </div>

        {/* RIGHT: Status & Metrics (33%) */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-y-auto pr-1">

          {/* Status Report */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-brand-gray-100 flex flex-col justify-between shrink-0">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-brand-black tracking-tight font-heading">Status Report</h2>
                  <p className="text-brand-gray-800 text-[10px] font-mono">ID: ANT-2025-X7</p>
                </div>
                <button className="px-3 py-1.5 rounded-none border border-brand-primary bg-brand-primary text-white hover:bg-white hover:text-brand-black transition-all text-[10px] font-heading font-bold uppercase tracking-widest">
                  Schedule
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-brand-gray-50 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-lg bg-brand-primary text-white mr-2">
                        <ShieldCheck size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-medium uppercase">System Health</p>
                        <p className="font-bold text-brand-black text-sm">78.5%</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[78.5%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-gray-50 border border-brand-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-lg bg-brand-primary text-white mr-2">
                        <Battery size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium uppercase">Battery Level</p>
                        <p className="font-bold text-brand-black text-sm">87%</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[87%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-brand-gray-100 flex items-center justify-between text-xs">
              <p className="text-brand-gray-800 flex items-center font-medium">
                <Calendar size={12} className="mr-1" /> Next Maint:
              </p>
              <p className="text-brand-primary font-bold">URGENT</p>
            </div>
          </div>

          {/* Secondary Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            {[
              { label: 'Tire Pressure', value: '32 PSI', icon: Zap },
              { label: 'Oil Life', value: '88%', icon: Activity },
              { label: 'Brake Pads', value: 'Warning', icon: ShieldCheck },
              { label: 'Active Alerts', value: '1 Warning', icon: AlertTriangle },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-brand-gray-100 shadow-sm hover:border-brand-primary/50 transition-all group flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-1.5 rounded-lg bg-brand-gray-50 text-brand-black group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300`}>
                    <stat.icon size={14} />
                  </div>
                  <span className="text-[8px] text-gray-500 font-mono">S_{i + 1}</span>
                </div>
                <p className={`text-lg font-bold ${stat.value.includes('Warning') ? 'text-brand-primary' : 'text-brand-black'} leading-none mb-1`}>{stat.value}</p>
                <p className="text-[10px] text-brand-gray-800 font-medium uppercase tracking-wide truncate">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
