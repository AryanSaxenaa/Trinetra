import { useState } from 'react';
import { LayoutDashboard, Activity, Cloud, Wrench, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

type Page = 'dashboard' | 'health' | 'context' | 'maintenance' | 'scheduling';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    const navigation = [
        { id: 'dashboard', name: 'Vehicle Overview', icon: LayoutDashboard },
        { id: 'health', name: 'Vehicle Health', icon: Activity },
        { id: 'context', name: 'Driving Context', icon: Cloud },
        { id: 'maintenance', name: 'Proactive Maintenance', icon: Wrench },
        { id: 'scheduling', name: 'Smart Scheduling', icon: Calendar },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Container */}
            <aside
                className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out border-r border-brand-gray-100 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          ${collapsed ? 'lg:w-20' : 'lg:w-80'}
          bg-brand-black text-white shadow-2xl border-r-0
        `}
            >
                <div className="h-full flex flex-col justify-between relative">
                    {/* Toggle Button (Desktop) */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-brand-gray-100 rounded-full items-center justify-center text-brand-black hover:scale-110 transition-all z-50 shadow-md"
                    >
                        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>

                    <div>
                        {/* Header */}
                        <div className={`p-6 flex items-center ${collapsed ? 'justify-center' : ''} border-b border-white/5`}>
                            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-primary/20">
                                <span className="text-white text-xl font-bold tracking-tighter">A</span>
                            </div>

                            {!collapsed && (
                                <div className="ml-5 transition-opacity animate-in fade-in duration-300">
                                    <h1 className="text-xl font-bold text-white tracking-widest font-heading uppercase">AntarDrishti</h1>
                                    <p className="text-[10px] text-brand-gray-8 uppercase tracking-[0.3em] font-medium mt-1">Enterprise Twin</p>
                                </div>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="p-4 space-y-1 mt-4">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentPage === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setCurrentPage(item.id as Page);
                                            setIsOpen(false);
                                        }}
                                        className={`
                      w-full flex items-center rounded-lg transition-all duration-200 group relative
                      ${collapsed ? 'justify-center p-4' : 'px-6 py-4'}
                      ${isActive
                                                ? 'text-white'
                                                : 'text-brand-gray-8 hover:text-white'}
                    `}
                                    >

                                        <Icon className={`w-5 h-5 ${!collapsed && 'mr-4'} ${isActive ? 'text-brand-primary' : ''}`} strokeWidth={2} />

                                        {!collapsed && (
                                            <span className="text-xs font-heading font-bold uppercase tracking-[0.25em]">{item.name}</span>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Footer Status */}
                    <div className={`p-4 border-t border-white/10 ${collapsed ? 'items-center flex flex-col' : ''}`}>
                        {!collapsed ? (
                            <div className="flex items-center justify-between text-xs text-brand-gray-100/50">
                                <span>v2.4.0</span>
                                <div className="flex items-center">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                    <span>Online</span>
                                </div>
                            </div>
                        ) : (
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
