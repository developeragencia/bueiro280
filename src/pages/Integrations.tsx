import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { PLATFORMS, CATEGORIES, Platform } from '../data/platforms';
import PlatformCard from '../components/PlatformCard';
import PlatformModal from '../components/PlatformModal';
import IntegrationSetup from '../components/IntegrationSetup';

interface IntegrationStatus {
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  account?: string;
}

export default function Integrations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [integrationStatuses, setIntegrationStatuses] = useState<Record<string, IntegrationStatus>>({});
  const [showSetup, setShowSetup] = useState<string | null>(null);

  const filteredPlatforms = PLATFORMS.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Todos' || platform.category === selectedType;
    return matchesSearch && matchesType;
  });

  const handleConnect = (platform: Platform) => {
    if (platform.id === 'ticto' || platform.id === 'clickbank' || platform.id === 'buygoods') {
      setShowSetup(platform.id);
    } else {
      setSelectedPlatform(platform);
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (data: Record<string, string>) => {
    if (!selectedPlatform) return;

    setIntegrationStatuses(prev => ({
      ...prev,
      [selectedPlatform.id]: {
        status: 'connected',
        lastSync: 'Agora',
        account: 'Conta Principal'
      }
    }));

    setIsModalOpen(false);
  };

  const handleDisconnect = (platformId: string) => {
    setIntegrationStatuses(prev => ({
      ...prev,
      [platformId]: {
        status: 'disconnected'
      }
    }));
  };

  const handleSync = (platformId: string) => {
    setIntegrationStatuses(prev => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        lastSync: 'Agora'
      }
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar integrações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="flex items-center space-x-2">
            {['Todos', ...CATEGORIES].map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedType(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedType === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showSetup && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-scale-up">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Configurar {showSetup.toUpperCase()}
          </h2>
          <IntegrationSetup
            platform={showSetup}
            onSave={() => {
              setIntegrationStatuses(prev => ({
                ...prev,
                [showSetup]: {
                  status: 'connected',
                  lastSync: 'Agora',
                  account: 'Configurado'
                }
              }));
              setShowSetup(null);
            }}
          />
        </div>
      )}

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlatforms.map((platform, index) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            status={integrationStatuses[platform.id]?.status || 'disconnected'}
            lastSync={integrationStatuses[platform.id]?.lastSync}
            account={integrationStatuses[platform.id]?.account}
            onConnect={() => handleConnect(platform)}
            onDisconnect={() => handleDisconnect(platform.id)}
            onSync={() => handleSync(platform.id)}
            onSettings={() => handleConnect(platform)}
            index={index}
          />
        ))}
      </div>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        platform={selectedPlatform}
        onSubmit={handleSubmit}
      />
    </div>
  );
}