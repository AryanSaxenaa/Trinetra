import { useState } from 'react';
import { LayoutDashboard, Activity, Cloud, Wrench, Calendar } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { HealthInsights } from './components/HealthInsights';
import { ContextAwareness } from './components/ContextAwareness';
import { MaintenanceRecommendations } from './components/MaintenanceRecommendations';
import { Scheduling } from './components/Scheduling';

type Page = 'dashboard' | 'health' | 'context' | 'maintenance' | 'scheduling';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Vehicle Overview', icon: LayoutDashboard },
    { id: 'health', name: 'Vehicle Health', icon: Activity },
    { id: 'context', name: 'Driving Context', icon: Cloud },
    { id: 'maintenance', name: 'Proactive Maintenance', icon: Wrench },
    { id: 'scheduling', name: 'Smart Scheduling', icon: Calendar },
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
    <div className="min-h-screen bg-brand-gray-50 text-brand-black font-sans selection:bg-brand-primary selection:text-white">

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <main className="pt-[88px] min-h-screen relative overflow-hidden transition-all duration-500">

        <div className="relative z-10 px-6 lg:px-10 pb-10 pt-2 max-w-[1800px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
