import { useState } from 'react';
import { LayoutDashboard, Activity, Cloud, Wrench, Calendar, Menu, X } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { HealthInsights } from './components/HealthInsights';
import { ContextAwareness } from './components/ContextAwareness';
import { MaintenanceRecommendations } from './components/MaintenanceRecommendations';
import { Scheduling } from './components/Scheduling';

type Page = 'dashboard' | 'health' | 'context' | 'maintenance' | 'scheduling';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'health', name: 'Health Insights', icon: Activity },
    { id: 'context', name: 'Context Awareness', icon: Cloud },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench },
    { id: 'scheduling', name: 'Scheduling', icon: Calendar },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'health':
        return <HealthInsights />;
      case 'context':
        return <ContextAwareness />;
      case 'maintenance':
        return <MaintenanceRecommendations />;
      case 'scheduling':
        return <Scheduling />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <h1 className="text-lg font-light">Trinetra AI</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <div>
              <h1 className="text-xl font-light text-gray-900">Trinetra AI</h1>
              <p className="text-xs text-gray-500">Digital Twin with a Conscience</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as Page);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 rounded-2xl mb-2 transition-all ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 text-white">
            <p className="text-xs font-medium mb-1">AI Status</p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              <span className="text-sm">Active & Monitoring</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
