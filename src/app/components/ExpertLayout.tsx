import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

interface ExpertLayoutProps {
  children: React.ReactNode;
}

export function ExpertLayout({ children }: ExpertLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return localStorage.getItem('expertSidebarOpen') === 'true';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('expertSidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/expert/dashboard' },
    { icon: AlertTriangle, label: 'Escalated Cases', path: '/expert/cases' },
    { icon: Users, label: 'All Students', path: '/expert/students' },
    { icon: Bell, label: 'Notifications', path: '/expert/notifications' },
    { icon: Settings, label: 'Settings', path: '/expert/account' },
  ];

  const handleLogout = () => {
    navigate('/expert/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-sidebar transition-all duration-300 ${
          sidebarOpen ? 'w-[280px]' : 'w-[72px]'
        } md:block hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Toggle */}
          <div className="p-6 border-b border-white/15 flex-shrink-0">
            {sidebarOpen ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-lg p-1">
                    <img src="/logos/png-transparent/2.png" alt="BehaveBridge" className="w-8 h-8" />
                  </div>
                  <h1 className="font-bold text-xl text-white">BehaveBridge</h1>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/70 hover:text-white">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/70 hover:text-white">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* User Profile - Top, Non-clickable */}
          <div className="p-4 border-b border-white/15 flex-shrink-0">
            <div
              className={`flex items-center px-4 py-3 ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <Avatar className={sidebarOpen ? "w-8 h-8 bg-white/20" : "w-[50px] h-[50px] bg-white/20"}>
                <AvatarFallback className="text-white">SW</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">
                    Dr. Sarah Williams
                  </div>
                  <div className="text-xs text-white/60">Behavioral Expert</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className={sidebarOpen ? "flex-1 p-4 space-y-2 overflow-hidden" : "flex-1 px-2 py-4 space-y-2 overflow-hidden"}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  } ${sidebarOpen ? 'px-4 py-3' : 'py-4 justify-center'}`}
                >
                  <Icon className={sidebarOpen ? "w-5 h-5" : "w-6 h-6"} />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout Button - Bottom */}
          <div className={sidebarOpen ? "p-4 border-t border-white/15 flex-shrink-0" : "px-2 py-4 border-t border-white/15 flex-shrink-0"}>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full rounded-lg transition-colors text-white/70 hover:bg-white/10 hover:text-white ${
                sidebarOpen ? 'px-4 py-3' : 'py-4 justify-center'
              }`}
            >
              <LogOut className={sidebarOpen ? "w-5 h-5" : "w-6 h-6"} />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'md:ml-[280px]' : 'md:ml-[72px]'
        }`}
      >
        {/* Mobile Header */}
        <header className="md:hidden bg-sidebar px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-lg p-0.5">
              <img src="/logos/png-transparent/2.png" alt="BehaveBridge" className="w-6 h-6" />
            </div>
            <h1 className="font-bold text-lg text-white">BehaveBridge</h1>
          </div>
          <Avatar className="w-8 h-8 bg-white/20">
            <AvatarFallback className="text-white text-sm">SW</AvatarFallback>
          </Avatar>
        </header>

        {/* Page Content - Scrollable */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-sidebar shadow-lg transition-transform duration-300 w-[280px] md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Toggle */}
          <div className="p-6 border-b border-white/15 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white rounded-lg p-1">
                  <img src="/logos/png-transparent/2.png" alt="BehaveBridge" className="w-8 h-8" />
                </div>
                <h1 className="font-bold text-xl text-white">
                  BehaveBridge
                </h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile - Top, Non-clickable */}
          <div className="p-4 border-b border-white/15 flex-shrink-0">
            <div className="flex items-center px-4 py-3">
              <Avatar className="w-8 h-8 bg-white/20">
                <AvatarFallback className="text-white">SW</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">
                  Dr. Sarah Williams
                </div>
                <div className="text-xs text-white/60">Behavioral Expert</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button - Bottom */}
          <div className="p-4 border-t border-white/15 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
