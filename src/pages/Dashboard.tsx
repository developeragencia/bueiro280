import React, { useState, useEffect } from 'react';
import { 
  DollarSign,
  Tags,
  BarChart3,
  AlertCircle,
  Plus,
  Settings,
  Trash2,
  LayoutGrid
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Filter from '../components/Filter';
import MetricCard from '../components/MetricCard';
import MetricRow from '../components/MetricRow';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Dashboard {
  id: string;
  name: string;
  description?: string;
  layout: any[];
  is_default: boolean;
}

const PAYMENT_DATA = [
  { name: 'Pix', value: 48, color: '#3B82F6' },
  { name: 'Cartão', value: 27, color: '#22D3EE' },
  { name: 'Boleto', value: 15, color: '#EAB308' },
  { name: 'Outros', value: 8, color: '#EF4444' }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('Últimos 7 dias');
  const [account, setAccount] = useState('Todas');
  const [platform, setPlatform] = useState('Qualquer');
  const [product, setProduct] = useState('Qualquer');
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [newDashboardDescription, setNewDashboardDescription] = useState('');

  useEffect(() => {
    if (user) {
      fetchDashboards();
    }
  }, [user]);

  const fetchDashboards = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('dashboards')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setDashboards(data || []);
      if (data && data.length > 0) {
        const defaultDashboard = data.find(d => d.is_default) || data[0];
        setSelectedDashboard(defaultDashboard);
      }
    } catch (err) {
      console.error('Error fetching dashboards:', err);
    }
  };

  const createDashboard = async () => {
    if (!user || !newDashboardName.trim()) return;

    try {
      const { data, error } = await supabase
        .from('dashboards')
        .insert([
          {
            name: newDashboardName.trim(),
            description: newDashboardDescription.trim(),
            created_by: user.id,
            is_default: dashboards.length === 0,
            layout: []
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setDashboards([...dashboards, data]);
      setSelectedDashboard(data);
      setIsCreating(false);
      setNewDashboardName('');
      setNewDashboardDescription('');
    } catch (err) {
      console.error('Error creating dashboard:', err);
    }
  };

  const deleteDashboard = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este dashboard?')) return;

    try {
      const { error } = await supabase
        .from('dashboards')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const updatedDashboards = dashboards.filter(d => d.id !== id);
      setDashboards(updatedDashboards);
      
      if (selectedDashboard?.id === id) {
        setSelectedDashboard(updatedDashboards[0] || null);
      }
    } catch (err) {
      console.error('Error deleting dashboard:', err);
    }
  };

  const setDefaultDashboard = async (id: string) => {
    if (!user) return;

    try {
      // Update all dashboards to not be default
      await supabase
        .from('dashboards')
        .update({ is_default: false })
        .eq('created_by', user.id);

      // Set the selected dashboard as default
      const { error } = await supabase
        .from('dashboards')
        .update({ is_default: true })
        .eq('id', id);

      if (error) throw error;

      const updatedDashboards = dashboards.map(d => ({
        ...d,
        is_default: d.id === id
      }));
      setDashboards(updatedDashboards);
    } catch (err) {
      console.error('Error setting default dashboard:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <LayoutGrid className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Seus Dashboards</h2>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Novo Dashboard</span>
          </button>
        </div>

        {isCreating && (
          <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Dashboard
              </label>
              <input
                type="text"
                value={newDashboardName}
                onChange={(e) => setNewDashboardName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Ex: Dashboard Principal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição (opcional)
              </label>
              <input
                type="text"
                value={newDashboardDescription}
                onChange={(e) => setNewDashboardDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Ex: Métricas principais do negócio"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={createDashboard}
                disabled={!newDashboardName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Criar Dashboard
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className={`relative group p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                selectedDashboard?.id === dashboard.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-500/50 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedDashboard(dashboard)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{dashboard.name}</h3>
                  {dashboard.description && (
                    <p className="text-sm text-gray-500">{dashboard.description}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDefaultDashboard(dashboard.id);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Definir como padrão"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteDashboard(dashboard.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Excluir dashboard"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {dashboard.is_default && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  Padrão
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-6">
        <Filter 
          label="Data de cadastro"
          value={dateRange}
          onChange={setDateRange}
          options={['Hoje', 'Últimos 7 dias', 'Este mês', 'Personalizado']}
        />
        <Filter 
          label="Conta de Anúncio"
          value={account}
          onChange={setAccount}
          options={['Todas', 'Conta 1', 'Conta 2', 'Conta 3']}
        />
        <Filter 
          label="Plataforma"
          value={platform}
          onChange={setPlatform}
          options={['Qualquer', 'Facebook', 'Instagram', 'Google Ads']}
        />
        <Filter 
          label="Produto"
          value={product}
          onChange={setProduct}
          options={['Qualquer', 'Produto 1', 'Produto 2', 'Produto 3']}
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Faturamento Líquido"
          value="R$ 635.789,23"
          icon={<DollarSign size={20} className="text-green-600" />}
          trend={{ value: '+12.5%', positive: true }}
        />
        <MetricCard
          title="Gastos com anúncios"
          value="R$ 456.827,90"
          icon={<Tags size={20} className="text-red-600" />}
          trend={{ value: '+8.3%', positive: false }}
        />
        <MetricCard
          title="ROAS"
          value="1.39"
          icon={<BarChart3 size={20} className="text-blue-600" />}
          trend={{ value: '+4.2%', positive: true }}
        />
        <MetricCard
          title="Lucro"
          value="R$ 159.887,65"
          icon={<DollarSign size={20} className="text-green-600" />}
          trend={{ value: '+15.7%', positive: true }}
        />
      </div>

      {/* Charts and Additional Metrics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-gray-900">Vendas por Pagamento</h3>
            <button className="text-gray-400 hover:text-gray-500">
              <Settings size={16} />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PAYMENT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {PAYMENT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {PAYMENT_DATA.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <MetricRow 
            title="Vendas Pendentes" 
            value="R$ 89.289,38"
            icon={<AlertCircle size={20} className="text-yellow-500" />}
            info="Vendas aguardando confirmação de pagamento"
          />
          <MetricRow 
            title="Vendas Reembolsadas" 
            value="R$ 18.459,20"
            icon={<AlertCircle size={20} className="text-red-500" />}
            info="Total de vendas reembolsadas no período"
          />
          <MetricRow 
            title="Imposto" 
            value="R$ 19.073,68"
            icon={<DollarSign size={20} className="text-gray-500" />}
            info="Total de impostos sobre as vendas"
          />
          <MetricRow 
            title="Chargeback" 
            value="0.7%" 
            icon={<AlertCircle size={20} className="text-orange-500" />}
            info="Taxa de chargeback do período"
          />
        </div>
      </div>
    </div>
  );
}