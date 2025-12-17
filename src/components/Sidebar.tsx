import React, { useState } from 'react';
import { LayoutDashboard, Activity, Cloud, Wrench, Calendar, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
        { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { id: 'health', name: 'Health Insights', icon: Activity },
        { id: 'context', name: 'Context Awareness', icon: Cloud },
        { id: 'maintenance', name: 'Maintenance', icon: Wrench },
        { id: 'scheduling', name: 'Scheduling', icon: Calendar },
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
          ${collapsed ? 'lg:w-20' : 'lg:w-72'}
          bg-brand-black text-white shadow-xl
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
                        <div className={`p-6 flex items-center ${collapsed ? 'justify-center' : ''} border-b border-white/10`}>
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-brand-black text-xl font-bold tracking-tighter">T</span>
                            </div>

                            {!collapsed && (
                                <div className="ml-3 transition-opacity animate-in fade-in duration-300">
                                    <h1 className="text-lg font-medium text-white tracking-tight">Trinetra</h1>
                                    <p className="text-[10px] text-brand-gray-100/60 uppercase tracking-widest">Enterprise Twin</p>
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
                      ${collapsed ? 'justify-center p-3' : 'px-4 py-3'}
                      ${isActive
                                                ? 'bg-white text-brand-black font-medium'
                                                : 'text-brand-gray-100/70 hover:text-white hover:bg-white/10'}
                    `}
                                    >

                                        <Icon className={`w-5 h-5 ${!collapsed && 'mr-3'}`} strokeWidth={isActive ? 2.5 : 2} />

                                        {!collapsed && (
                                            <span className="text-sm">{item.name}</span>
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
