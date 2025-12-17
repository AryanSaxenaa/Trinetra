import { LayoutDashboard, Activity, Cloud, Wrench, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
    currentPage: string;
    setCurrentPage: (page: any) => void;
}

export function Header({ currentPage, setCurrentPage }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { id: 'dashboard', name: 'Vehicle Overview', icon: LayoutDashboard },
        { id: 'health', name: 'Vehicle Health', icon: Activity },
        { id: 'context', name: 'Driving Context', icon: Cloud },
        { id: 'maintenance', name: 'Proactive Maintenance', icon: Wrench },
        { id: 'scheduling', name: 'Smart Scheduling', icon: Calendar },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 h-[88px] bg-[#111011] z-50 transition-all duration-300">
            <div className="h-full max-w-[1800px] mx-auto px-6 lg:px-12 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center group cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
                    <img src="/logo.png" alt="Trinetra Logo" className="w-14 h-14 object-contain mr-4 hover:scale-105 transition-transform duration-300" />
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-widest font-heading uppercase">AntarDrishti</h1>
                        <p className="text-[10px] text-brand-primary uppercase tracking-[0.3em] font-bold hidden sm:block">Enterprise Twin</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navigation.map((item) => {
                        const isActive = currentPage === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setCurrentPage(item.id)}
                                className={`
                                    relative py-2 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 font-heading
                                    ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}
                                `}
                            >
                                {item.name}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary animate-in fade-in duration-300" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white hover:text-brand-primary transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`
                fixed inset-0 bg-brand-black/95 z-40 lg:hidden transition-all duration-300 backdrop-blur-xl
                ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
            `}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {navigation.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setCurrentPage(item.id);
                                setIsMenuOpen(false);
                            }}
                            className={`
                                text-lg font-bold uppercase tracking-[0.25em] font-heading transition-colors duration-300
                                ${currentPage === item.id ? 'text-brand-primary' : 'text-white hover:text-gray-300'}
                            `}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
}
