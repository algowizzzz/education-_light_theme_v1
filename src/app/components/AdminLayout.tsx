import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Brain,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Link2
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return localStorage.getItem('adminSidebarOpen') === 'true';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('adminSidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Students', path: '/admin/students' },
    { icon: GraduationCap, label: 'Teachers', path: '/admin/teachers' },
    { icon: Brain, label: 'Behavioral Experts', path: '/admin/experts' },
    { icon: UserCircle, label: 'Parents', path: '/admin/parents' },
    { icon: Link2, label: 'Assignments', path: '/admin/assignments' },
    { icon: Settings, label: 'Settings', path: '/admin/account' }
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-sidebar transition-all duration-300 shadow-lg ${
          sidebarOpen ? 'w-[280px]' : 'w-[72px]'
        } md:block hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Logo & Toggle */}
          <div className="p-5 border-b border-sidebar-border flex-shrink-0">
            <div className="flex items-center justify-between">
              {sidebarOpen ? (
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-lg p-1">
                    <img src="/logos/png-transparent/2.png" alt="BehaveBridge" className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg text-white tracking-tight">BehaveBridge</span>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-1 mx-auto">
                  <img src="/logos/png-transparent/2.png" alt="BB" className="w-8 h-8" />
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white/70 hover:text-white ml-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-sidebar-border flex-shrink-0">
            <div className={`flex items-center px-3 py-2 ${!sidebarOpen && 'justify-center'}`}>
              <div className={`rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 ${
                sidebarOpen ? 'w-9 h-9' : 'w-11 h-11'
              }`}>
                <UserCircle className={sidebarOpen ? "w-5 h-5 text-white" : "w-7 h-7 text-white"} />
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">Admin User</div>
                  <div className="text-xs text-white/60">Administrator</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className={sidebarOpen ? "flex-1 p-3 space-y-1 overflow-hidden" : "flex-1 px-2 py-3 space-y-1 overflow-hidden"}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm border-l-3 border-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  } ${sidebarOpen ? 'px-4 py-2.5' : 'py-3 justify-center'}`}
                >
                  <Icon className={sidebarOpen ? "w-5 h-5" : "w-6 h-6"} />
                  {sidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className={sidebarOpen ? "p-3 border-t border-sidebar-border flex-shrink-0" : "px-2 py-3 border-t border-sidebar-border flex-shrink-0"}>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full rounded-lg transition-colors text-white/70 hover:bg-white/10 hover:text-white ${
                sidebarOpen ? 'px-4 py-2.5' : 'py-3 justify-center'
              }`}
            >
              <LogOut className={sidebarOpen ? "w-5 h-5" : "w-6 h-6"} />
              {sidebarOpen && <span className="ml-3 text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarOpen ? 'md:ml-[280px]' : 'md:ml-[72px]'
      }`}>
        {/* Mobile Header */}
        <header className="md:hidden bg-sidebar px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-white/80 hover:text-white rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-lg p-0.5">
              <img src="/logos/png-transparent/2.png" alt="BB" className="w-6 h-6" />
            </div>
            <h1 className="font-bold text-lg text-white">BehaveBridge</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-white" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-sidebar transition-transform duration-300 w-[280px] md:hidden shadow-lg ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-sidebar-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-lg p-1">
                  <img src="/logos/png-transparent/2.png" alt="BehaveBridge" className="w-8 h-8" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">BehaveBridge</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-sidebar-border flex-shrink-0">
            <div className="flex items-center px-3 py-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-white">Admin User</div>
                <div className="text-xs text-white/60">Administrator</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm border-l-3 border-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="ml-3 text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-sidebar-border flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3 text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
