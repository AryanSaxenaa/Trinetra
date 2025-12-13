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
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center mr-3">
                <span className="text-black text-sm font-black">T</span>
              </div>
              <h1 className="text-xl font-black uppercase tracking-tight">Trinetra AI</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`flex items-center px-4 py-2 border-2 transition-all font-bold uppercase text-xs ${
                      isActive
                        ? 'bg-white text-black border-white'
                        : 'text-white border-white hover:bg-white hover:text-black'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="md:hidden">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value as Page)}
                className="bg-black text-white px-3 py-2 text-xs font-bold border-2 border-white focus:outline-none uppercase"
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
