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
    pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-300', label: 'Pending' },
    confirmed: { color: 'bg-blue-100 text-blue-700 border-blue-300', label: 'Confirmed' },
    completed: { color: 'bg-green-100 text-green-700 border-green-300', label: 'Completed' },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">Service Scheduling</h1>
        <p className="text-gray-500">Book maintenance appointments at your convenience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">{currentMonth}</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth().map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`)}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all ${
                  day === null
                    ? 'invisible'
                    : day === today.getDate()
                    ? 'bg-gray-900 text-white font-medium'
                    : selectedDate === `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                    ? 'bg-gray-200 text-gray-900 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Suggested Times</h3>
            </div>

            <div className="space-y-3">
              {suggestedTimes.map((slot, index) => (
                <button
                  key={index}
                  disabled={!slot.available}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    slot.available
                      ? 'border-gray-200 hover:border-gray-900 hover:shadow-md'
                      : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{slot.time}</span>
                    {slot.available ? (
                      <span className="text-xs text-green-600 font-medium">Available</span>
                    ) : (
                      <span className="text-xs text-red-600 font-medium">Booked</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{slot.reason}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-lg text-white">
            <MapPin className="w-6 h-6 mb-3" />
            <h3 className="text-lg font-light mb-2">Service Center</h3>
            <p className="text-sm text-gray-300 mb-3">Premium Auto Care</p>
            <p className="text-xs text-gray-400">123 Main Street, Downtown</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Upcoming Services</h2>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No scheduled services</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => {
              const config = statusConfig[service.status];
              return (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      {service.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Calendar className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{service.service_type}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{new Date(service.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>{service.scheduled_time}</span>
                        {service.location && <span>{service.location}</span>}
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-medium border ${config.color}`}>
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
