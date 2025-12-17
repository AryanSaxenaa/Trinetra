import { useState } from 'react';
import { LayoutDashboard, Activity, Cloud, Wrench, Calendar, Menu, X } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
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
    <div className="min-h-screen bg-brand-gray-50 text-brand-black font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-brand-gray-100 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <h1 className="text-lg font-medium text-brand-black tracking-tight">Trinetra</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-gray-100 transition-all text-brand-black"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="lg:pl-20 transition-[padding] duration-300 pt-16 lg:pt-0 min-h-screen relative overflow-hidden">

        <div className="relative z-10 p-6 lg:p-10 max-w-7xl mx-auto">
          {/* Breadcrumb / Page Title */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-brand-black mb-1 tracking-tight">{navigation.find(n => n.id === currentPage)?.name}</h2>
              <div className="h-1 w-12 bg-black" />
            </div>
            <div className="hidden md:flex text-xs font-medium text-gray-400 space-x-4">
              <span>SYS.UPTIME: 99.9%</span>
              <span>NETWORK: SECURE</span>
            </div>
          </div>

          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
