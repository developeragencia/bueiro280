import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from './components/ui/toast';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import UTMs from './pages/UTMs';
import Integrations from './pages/Integrations';
import Rules from './pages/Rules';
import Rates from './pages/Rates';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        {/* Protected routes */}
        <Route element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campanhas" element={<Campaigns />} />
          <Route path="/utms" element={<UTMs />} />
          
          {/* Admin-only routes */}
          <Route path="/integracoes" element={
            <AdminRoute>
              <Integrations />
            </AdminRoute>
          } />
          <Route path="/regras" element={
            <AdminRoute>
              <Rules />
            </AdminRoute>
          } />
          <Route path="/taxas" element={
            <AdminRoute>
              <Rates />
            </AdminRoute>
          } />
          <Route path="/despesas" element={
            <AdminRoute>
              <Expenses />
            </AdminRoute>
          } />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/configuracoes" element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          } />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}