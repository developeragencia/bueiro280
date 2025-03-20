import { useState, useEffect } from 'react';
import { AlertCircle, Copy, CheckCircle } from 'lucide-react';
import { INTEGRATION_CONFIGS, getIntegrationSettings, saveIntegrationSettings } from '../lib/integrations';

interface IntegrationSetupProps {
  platform: string;
  onSave?: () => void;
}

type IntegrationConfig = {
  name: string;
  webhookUrl: string;
  requiresId: boolean;
  requiresSecretKey?: boolean;
  events?: Record<string, { template: string }>;
};

export default function IntegrationSetup({ platform, onSave }: IntegrationSetupProps) {
  const [id, setId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const config = INTEGRATION_CONFIGS[platform as keyof typeof INTEGRATION_CONFIGS] as IntegrationConfig;

  useEffect(() => {
    loadSettings();
  }, [platform]);

  const loadSettings = async () => {
    try {
      const settings = await getIntegrationSettings(platform);
      if (settings) {
        setId(settings.settings.id || '');
        setSecretKey(settings.settings.secretKey || '');
        updateWebhookUrl(settings.settings.id);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setError('Erro ao carregar configurações');
    }
  };

  const updateWebhookUrl = (newId: string) => {
    if (!newId) {
      setWebhookUrl('');
      return;
    }

    try {
      if (platform === 'buygoods' && config.events) {
        const approvedUrl = INTEGRATION_CONFIGS.buygoods.webhookUrl + config.events.sale_approved.template + '&id=' + newId;
        const refundedUrl = INTEGRATION_CONFIGS.buygoods.webhookUrl + config.events.sale_refunded.template + '&id=' + newId;
        setWebhookUrl(`${approvedUrl}\n${refundedUrl}`);
      } else {
        setWebhookUrl(`${config.webhookUrl}?id=${newId}`);
      }
    } catch (err) {
      console.error('Error updating webhook URL:', err);
      setError('Erro ao gerar URL do webhook');
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');

      const settings = {
        id,
        ...(config.requiresSecretKey && { secretKey })
      };

      await saveIntegrationSettings(platform, settings);
      onSave?.();
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ID da Integração
        </label>
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            updateWebhookUrl(e.target.value);
          }}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          placeholder="Digite o ID da integração"
        />
      </div>

      {config.requiresSecretKey && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chave Secreta
          </label>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder="Digite a chave secreta"
          />
        </div>
      )}

      {webhookUrl && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL do Webhook
          </label>
          <div className="relative">
            <textarea
              readOnly
              value={webhookUrl}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 pr-10"
              rows={webhookUrl.includes('\n') ? 4 : 2}
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-500"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading || !id}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
}