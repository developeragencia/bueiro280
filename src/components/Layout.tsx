import { type FC } from 'react';
import { Outlet, useLocation, Link, Navigate } from 'react-router-dom';
import { 
  Settings, 
  Link as LinkIcon, 
  Copy, 
  Home,
  DollarSign,
  Percent,
  FileText,
  Bell,
  LogOut,
  ArrowLeft,
  BarChart3,
  Menu,
  X,
  Settings as SettingsIcon
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  adminOnly?: boolean;
  onClick?: () => void;
}

const NavItem: FC<NavItemProps> = ({ icon, text, to, adminOnly = false, onClick }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const isActive = location.pathname === to;

  if (adminOnly && !isAdmin) return null;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-blue-50 text-blue-600 font-medium shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const Layout: FC = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const pageTitle = location.pathname === '/dashboard'
    ? 'Dashboard Principal'
    : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-200">
          <Logo showLink={true} />
        </div>
        
        <nav className="p-4 space-y-1">
          <NavItem icon={<Home size={20} />} text="Dashboard" to="/dashboard" onClick={closeMobileMenu} />
          <NavItem icon={<BarChart3 size={20} />} text="Campanhas" to="/campanhas" onClick={closeMobileMenu} />
          <NavItem icon={<LinkIcon size={20} />} text="UTMs" to="/utms" onClick={closeMobileMenu} />
          <NavItem icon={<Settings size={20} />} text="Integrações" to="/integracoes" adminOnly onClick={closeMobileMenu} />
          <NavItem icon={<Copy size={20} />} text="Regras" to="/regras" adminOnly onClick={closeMobileMenu} />
          <NavItem icon={<Percent size={20} />} text="Taxas" to="/taxas" adminOnly onClick={closeMobileMenu} />
          <NavItem icon={<DollarSign size={20} />} text="Despesas" to="/despesas" adminOnly onClick={closeMobileMenu} />
          <NavItem icon={<FileText size={20} />} text="Relatórios" to="/relatorios" onClick={closeMobileMenu} />
          {isAdmin && (
            <NavItem icon={<SettingsIcon size={20} />} text="Configurações" to="/configuracoes" adminOnly onClick={closeMobileMenu} />
          )}
        </nav>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <main className="flex-1">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="hidden lg:flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Voltar para Home</span>
            </Link>
            <span className="hidden lg:block text-gray-300">|</span>
            <h2 className="text-lg font-semibold text-gray-900 ml-12 lg:ml-0">{pageTitle}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                  <span className="text-sm font-medium">
                    {user?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</span>
                </div>
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;