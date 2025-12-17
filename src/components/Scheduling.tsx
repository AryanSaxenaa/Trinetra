import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { supabase, ScheduledService } from '../lib/supabase';

export function Scheduling() {
  const [services, setServices] = useState<ScheduledService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const { data } = await supabase
        .from('scheduled_services')
        .select('*')
        .order('scheduled_date', { ascending: true });

      if (data) {
        setServices(data);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  const getDaysInMonth = () => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const suggestedTimes = [
    { time: '09:00 AM', type: 'Morning', available: true, reason: 'Fastest' },
    { time: '11:00 AM', type: 'Late Morn', available: true, reason: 'Standard' },
    { time: '02:00 PM', type: 'Afternoon', available: false, reason: 'Busy' },
    { time: '04:00 PM', type: 'Evening', available: true, reason: 'Flexible' },
  ];

  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-300', label: 'Pending' },
    confirmed: { color: 'bg-blue-100 text-blue-700 border-blue-300', label: 'Confirmed' },
    completed: { color: 'bg-green-100 text-green-700 border-green-300', label: 'Completed' },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 animate-pulse">Loading schedule...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-700 h-full flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">

        {/* LEFT COLUMN: Calendar & Center Info (33%) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col">

          {/* Calendar Widget */}
          <div className="bg-white p-5 rounded-3xl border border-brand-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">{currentMonth}</h2>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft size={16} className="text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <ChevronRight size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="text-center text-[10px] font-bold text-gray-400 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth().map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && setSelectedDate(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)}
                  disabled={!day}
                  className={`
                        aspect-square rounded-lg flex items-center justify-center text-xs transition-all relative
                        ${!day ? 'invisible' : ''}
                        ${day === today.getDate()
                      ? 'bg-brand-black text-white font-bold'
                      : day && selectedDate === `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                        ? 'bg-brand-primary text-white font-bold shadow-md shadow-brand-primary/30'
                        : 'hover:bg-gray-50 text-gray-600 hover:text-brand-black font-medium'
                    }
                        `}
                >
                  {day}
                  {/* Dot for events could go here */}
                </button>
              ))}
            </div>
          </div>

          {/* Service Center Info Card */}
          <div className="bg-brand-black text-white p-5 rounded-3xl shadow-xl relative overflow-hidden group flex-1 flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <MapPin size={80} />
            </div>
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Preferred Center</h3>
              <div className="flex items-start space-x-3 mb-2">
                <div className="p-2 bg-white/10 rounded-lg">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-bold text-base leading-tight">Premium Auto Care</p>
                  <p className="text-[10px] text-gray-400 mt-1">123 Main Street, Downtown</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-green-400 font-bold flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Open Now
                </span>
                <span className="text-[10px] text-gray-500">0.8 miles away</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Slots & List (66%) */}
        <div className="lg:col-span-8 space-y-4 flex flex-col h-full">

          {/* Time Slot Picker */}
          <div className="bg-white p-5 rounded-3xl border border-brand-gray-100 shadow-sm shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-brand-primary" />
                <h3 className="font-heading font-bold text-xs text-brand-black uppercase tracking-wider">Available Slots</h3>
              </div>
              <button className="flex items-center space-x-2 bg-brand-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary border border-brand-primary transition-all">
                <Plus size={14} />
                <span>New Booking</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {suggestedTimes.map((slot, index) => (
                <button
                  key={index}
                  disabled={!slot.available}
                  className={`
                            relative p-3 rounded-xl border text-left transition-all group overflow-hidden
                            ${slot.available
                      ? 'border-gray-100 hover:border-brand-primary hover:shadow-md cursor-pointer'
                      : 'border-gray-50 bg-gray-50 opacity-50 cursor-not-allowed'}
                        `}
                >
                  <div className="relative z-10">
                    <span className="block text-sm font-bold text-brand-black">{slot.time}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{slot.type}</span>

                    <div className="mt-1 flex items-center">
                      {slot.available ? (
                        <span className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">Open</span>
                      ) : (
                        <span className="text-[8px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">Full</span>
                      )}
                    </div>
                  </div>
                  {slot.available && <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming List - Scrollable */}
          <div className="bg-white p-5 rounded-3xl border border-brand-gray-100 shadow-sm flex-1 overflow-hidden flex flex-col min-h-0">
            <h3 className="font-heading font-bold text-sm text-brand-black mb-4 shrink-0">Upcoming Appointments</h3>

            <div className="overflow-y-auto pr-2 space-y-3 flex-1">
              {services.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-gray-100 rounded-2xl min-h-[150px]">
                  <Calendar className="w-8 h-8 text-gray-200 mb-2" />
                  <p className="text-sm font-bold text-brand-black">No services scheduled</p>
                  <p className="text-xs text-gray-400">Select a date to book your next maintenance</p>
                </div>
              ) : (
                services.map((service) => {
                  const config = statusConfig[service.status];
                  return (
                    <div
                      key={service.id}
                      className="group flex items-center justify-between p-3 bg-white border border-brand-gray-100 rounded-2xl hover:border-brand-primary/30 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${service.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-brand-gray-50 text-brand-black'}`}>
                          {service.status === 'completed' ? <CheckCircle size={16} /> : <Calendar size={16} />}
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-black text-xs">{service.service_type}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                            <span className="flex items-center"><Calendar size={10} className="mr-1" /> {new Date(service.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span className="flex items-center"><Clock size={10} className="mr-1" /> {service.scheduled_time}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide border ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
