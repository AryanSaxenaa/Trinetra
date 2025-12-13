import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
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
    { time: '09:00 AM', type: 'Morning', available: true, reason: 'Low traffic, quick service' },
    { time: '11:00 AM', type: 'Late Morning', available: true, reason: 'Convenient timing' },
    { time: '02:00 PM', type: 'Afternoon', available: false, reason: 'High demand' },
    { time: '04:00 PM', type: 'Late Afternoon', available: true, reason: 'After work convenience' },
  ];

  const statusConfig = {
    pending: { color: 'bg-gray-200 text-black border-black', label: 'Pending' },
    confirmed: { color: 'bg-gray-600 text-white border-black', label: 'Confirmed' },
    completed: { color: 'bg-black text-white border-black', label: 'Completed' },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-black font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Service Scheduling</h1>
        <p className="text-gray-600 font-bold">Book maintenance appointments at your convenience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border-4 border-black p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-black uppercase">{currentMonth}</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center hover:bg-gray-800 transition-all">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center hover:bg-gray-800 transition-all">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-black text-black py-2 uppercase">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth().map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)}
                className={`aspect-square border-2 flex items-center justify-center text-sm transition-all font-bold ${
                  day === null
                    ? 'invisible'
                    : day === today.getDate()
                    ? 'bg-black text-white border-black'
                    : selectedDate === `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                    ? 'bg-gray-200 text-black border-black'
                    : 'hover:bg-gray-100 text-black border-black'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border-4 border-black p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-black mr-2" />
              <h3 className="text-lg font-black text-black uppercase">Suggested Times</h3>
            </div>

            <div className="space-y-3">
              {suggestedTimes.map((slot, index) => (
                <button
                  key={index}
                  disabled={!slot.available}
                  className={`w-full p-4 border-2 text-left transition-all ${
                    slot.available
                      ? 'border-black hover:bg-gray-100'
                      : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-black uppercase">{slot.time}</span>
                    {slot.available ? (
                      <span className="text-xs text-black font-black uppercase">Available</span>
                    ) : (
                      <span className="text-xs text-gray-600 font-black uppercase">Booked</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 font-bold">{slot.reason}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black border-4 border-black p-6 text-white">
            <MapPin className="w-6 h-6 mb-3" />
            <h3 className="text-lg font-black mb-2 uppercase">Service Center</h3>
            <p className="text-sm text-white font-bold mb-3">Premium Auto Care</p>
            <p className="text-xs text-gray-300 font-bold">123 Main Street, Downtown</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-8">
        <h2 className="text-xl font-black text-black mb-6 uppercase">Upcoming Services</h2>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-black mx-auto mb-3" />
            <p className="text-gray-600 font-bold uppercase">No scheduled services</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => {
              const config = statusConfig[service.status];
              return (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-6 bg-gray-50 border-2 border-black hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center">
                      {service.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Calendar className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-black mb-1 uppercase">{service.service_type}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 font-bold uppercase">
                        <span>{new Date(service.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>{service.scheduled_time}</span>
                        {service.location && <span>{service.location}</span>}
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 text-xs font-black border-2 uppercase ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
