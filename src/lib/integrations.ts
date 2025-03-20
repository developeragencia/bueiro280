import { supabase } from './supabase';

export interface IntegrationSettings {
  id: string;
  platform: string;
  settings: {
    webhookUrl?: string;
    secretToken?: string;
    secretKey?: string;
    [key: string]: any;
  };
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const INTEGRATION_CONFIGS = {
  ticto: {
    name: 'Ticto',
    webhookUrl: 'https://api.utmify.com.br/webhooks/ticto',
    requiresId: true
  },
  clickbank: {
    name: 'ClickBank',
    webhookUrl: 'https://api.utmify.com.br/webhooks/click-bank',
    requiresId: true,
    requiresSecretKey: true
  },
  buygoods: {
    name: 'BuyGoods',
    webhookUrl: 'https://api4.utmify.com.br/webhooks/buygoods',
    requiresId: true,
    events: {
      sale_approved: {
        template: '?orderId={ORDERID}&commission={COMMISSION_AMOUNT}&subId={SUBID}&subId2={SUBID2}&subId3={SUBID3}&subId4={SUBID4}&subId5={SUBID5}&email={EMAILHASH}&type={CONV_TYPE}&product={PRODUCT_CODENAME}&event=sale_approved'
      },
      sale_refunded: {
        template: '?orderId={ORDERID}&commission={COMMISSION_AMOUNT}&subId={SUBID}&subId2={SUBID2}&subId3={SUBID3}&subId4={SUBID4}&subId5={SUBID5}&email={EMAILHASH}&type={CONV_TYPE}&product={PRODUCT_CODENAME}&event=sale_refunded'
      }
    }
  }
};

export async function saveIntegrationSettings(platform: string, settings: any) {
  const { data: existingSettings } = await supabase
    .from('integration_settings')
    .select('*')
    .eq('platform', platform)
    .single();

  if (existingSettings) {
    const { data, error } = await supabase
      .from('integration_settings')
      .update({ settings })
      .eq('id', existingSettings.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const { data, error } = await supabase
    .from('integration_settings')
    .insert([{ platform, settings }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getIntegrationSettings(platform: string) {
  const { data, error } = await supabase
    .from('integration_settings')
    .select('*')
    .eq('platform', platform)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export function buildWebhookUrl(platform: string, id: string, event?: string) {
  const config = INTEGRATION_CONFIGS[platform as keyof typeof INTEGRATION_CONFIGS];
  if (!config) throw new Error(`Invalid platform: ${platform}`);

  let url = `${config.webhookUrl}?id=${id}`;

  if (event && config.events?.[event]) {
    url = `${config.webhookUrl}${config.events[event].template}&id=${id}`;
  }

  return url;
}