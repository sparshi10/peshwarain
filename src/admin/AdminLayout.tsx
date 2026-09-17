import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  MessageSquareQuote, 
  Building2, 
  FileText, 
  Image as ImageIcon, 
  Inbox, 
  Users, 
  LogOut, 
  ExternalLink, 
  Menu as MenuIcon, 
  X, 
  ShieldCheck, 
  UserCheck,
  RotateCcw,
  Store
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { useToast } from './ToastContext';

interface AdminLayoutProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentScreen,
  onSelectScreen,
  children
}) => {
  const { 
    currentUser, 
    logout, 
    setCurrentView, 
    tableRequests, 
    businessInfo, 
    resetToDefaults 
  } = useRestaurant();
  const { showToast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const unreadRequests = (tableRequests || []).filter(r => r.status === 'New').length;
  const isAdmin = currentUser?.role === 'Admin';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu Items', icon: UtensilsCrossed },
    { id: 'reviews', label: 'Reviews & Rating', icon: MessageSquareQuote },
    { id: 'business', label: 'Business Info', icon: Building2 },
    { id: 'content', label: 'Homepage Copy', icon: FileText },
    { id: 'photos', label: 'Photo Gallery', icon: ImageIcon },
    { id: 'requests', label: 'Table Requests', icon: Inbox, badge: unreadRequests > 0 ? unreadRequests : undefined },
    { id: 'users', label: 'Users & Roles', icon: Users, adminOnly: true }
  ];

  const handleNavClick = (id: string) => {
    onSelectScreen(id);
    setMobileMenuOpen(false);
  };

  const handleResetDefaults = () => {
    resetToDefaults();
    showToast('Reset all restaurant data to factory seed defaults', 'info');
    setResetConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-gray-900 flex font-sans selection:bg-[#B5502F] selection:text-white">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col justify-between shrink-0 sticky top-0 h-screen z-30">
        <div>
          {/* Logo / Restaurant Name */}
          <div className="p-5 border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#B5502F] flex items-center justify-center font-bold text-lg border border-orange-100">
              <Store className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bold text-sm text-gray-900 truncate">
                PeshWarain ~ Wari
              </h1>
              <span className="text-[11px] text-gray-400 block truncate">
                Admin Management
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              const isLocked = item.adminOnly && !isAdmin;

              if (isLocked) return null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#B5502F] text-white shadow-2xs'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-[#B5502F]' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* Seed Data Reset Button */}
          {isAdmin && (
            <button
              onClick={() => setResetConfirmOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              title="Reset all modified data back to initial brief seed data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span>Reset Seed Demo Data</span>
            </button>
          )}

          {/* User Mini Card */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-700 shrink-0">
                {currentUser?.name.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-gray-800 truncate">
                  {currentUser?.name.split(' ')[0] || 'Tariq'}
                </div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  {currentUser?.role === 'Admin' ? (
                    <span className="text-[#B5502F] font-semibold">Admin</span>
                  ) : (
                    <span className="text-gray-500">Kitchen Staff</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Rankin St Location
              </span>
              <div className="text-sm font-bold text-gray-900">
                {businessInfo.name} <span className="font-normal font-serif text-gray-500">({businessInfo.bengaliName})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Live Public Site Button */}
            <button
              onClick={() => setCurrentView('public')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Logout on mobile */}
            <button
              onClick={logout}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex">
            <div className="w-64 bg-white h-full p-4 flex flex-col justify-between animate-in slide-in-from-left duration-200 shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="font-bold text-sm text-gray-900">
                    PeshWarain Admin
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-4 space-y-1">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentScreen === item.id;
                    if (item.adminOnly && !isAdmin) return null;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer ${
                          isActive
                            ? 'bg-[#B5502F] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => { setCurrentView('public'); setMobileMenuOpen(false); }}
                  className="w-full py-2 text-xs text-center font-semibold bg-gray-100 text-gray-700 rounded-lg cursor-pointer"
                >
                  View Public Website
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 text-xs text-center font-semibold text-red-600 rounded-lg cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Factory Reset Confirmation Dialog */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <h3 className="text-sm font-bold text-gray-900">
              Reset to Factory Seed Data?
            </h3>
            <p className="text-xs text-gray-500 mt-1.5">
              This will restore all default dishes (Nihari ৳520, Butter Chicken ৳480, etc.), featured reviews, and business hours from the project brief.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#B5502F] hover:bg-[#9E4226] text-white rounded-lg transition-colors cursor-pointer"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
