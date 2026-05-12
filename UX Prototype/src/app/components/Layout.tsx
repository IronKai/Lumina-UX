import { Outlet, Link, useLocation } from 'react-router';
import { Search, Bell, User, Activity, LayoutDashboard, Building2, FileText, Users, AlertCircle, Code, BarChart3, HeartPulse, Settings } from 'lucide-react';
import { useState } from 'react';
import { LuminaLogo } from './LuminaLogo';

export function Layout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/accounts', label: 'Accounts', icon: Building2 },
    { path: '/census', label: 'Census', icon: FileText },
    { path: '/deduction', label: 'Deduction', icon: FileText },
    { path: '/tasks', label: 'Tasks & Exceptions', icon: AlertCircle },
    { path: '/rules', label: 'Rule Studio', icon: Code },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/system-health', label: 'System Health', icon: HeartPulse },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <LuminaLogo size="md" showText={true} />
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search accounts / files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* System Health Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-700">All Systems Operational</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-100 rounded-lg">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">Sarah Chen</div>
              <div className="text-xs text-slate-500">Operations User</div>
            </div>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation */}
        <nav className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}