import { useState } from 'react';
import { Home, Activity, Cloud, Wrench, Calendar } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { HealthInsights } from './components/HealthInsights';
import { ContextAwareness } from './components/ContextAwareness';
import { MaintenanceRecommendations } from './components/MaintenanceRecommendations';
import { Scheduling } from './components/Scheduling';

type Page = 'dashboard' | 'health' | 'context' | 'maintenance' | 'scheduling';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('health');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'health', name: 'Health Insights', icon: Activity },
    { id: 'context', name: 'Context Awareness', icon: Cloud },
    { id: 'maintenance', name: 'Maintenance', icon: Wrench },
    { id: 'scheduling', name: 'Schedule', icon: Calendar },
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span className="text-black text-sm font-bold">T</span>
              </div>
              <h1 className="text-xl font-semibold">Trinetra AI</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white text-black font-medium'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="md:hidden">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value as Page)}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-white"
              >
                {navigation.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
