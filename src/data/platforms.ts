import {
  ShoppingBag,
  Rocket,
  DollarSign,
  Globe,
  ShoppingCart,
  BarChart,
  Store,
  CreditCard
} from 'lucide-react';

export interface Platform {
  id: string;
  name: string;
  description: string;
  category: 'E-commerce' | 'Pagamentos' | 'Marketplace' | 'Logística' | 'Marketing' | 'Plataforma' | 'Afiliados';
  logo: string;
  icon: any;
  color: string;
  fields: {
    name: string;
    type: 'text' | 'password' | 'email';
    label: string;
    placeholder: string;
    required: boolean;
  }[];
}

export const PLATFORMS: Platform[] = [
  {
    id: 'kiwify',
    name: 'Kiwify',
    description: 'Plataforma de produtos digitais e infoprodutos',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/566091141/209278665.png',
    icon: ShoppingBag,
    color: 'bg-purple-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'iexperience',
    name: 'IExperience',
    description: 'Plataforma de ensino e cursos online',
    category: 'Plataforma',
    logo: 'https://ext.same-assets.com/1915266246/1415355751.png',
    icon: Rocket,
    color: 'bg-violet-600',
    fields: [
      {
        name: 'clientId',
        type: 'text',
        label: 'Client ID',
        placeholder: 'Digite seu Client ID',
        required: true
      },
      {
        name: 'clientSecret',
        type: 'password',
        label: 'Client Secret',
        placeholder: 'Digite seu Client Secret',
        required: true
      }
    ]
  },
  {
    id: 'perfectpay',
    name: 'PerfectPay',
    description: 'Gateway de pagamentos e checkout',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/2927460062/1589351797.png',
    icon: DollarSign,
    color: 'bg-green-600',
    fields: [
      {
        name: 'token',
        type: 'password',
        label: 'Token de Acesso',
        placeholder: 'Digite seu token de acesso',
        required: true
      }
    ]
  },
  {
    id: 'doppus',
    name: 'Doppus',
    description: 'Plataforma de vendas e marketing digital',
    category: 'Plataforma',
    logo: 'https://ext.same-assets.com/593279382/386948482.png',
    icon: Globe,
    color: 'bg-orange-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'orbita',
    name: 'Orbita',
    description: 'Plataforma de marketing digital',
    category: 'Marketing',
    logo: 'https://ext.same-assets.com/3682954899/2381348732.png',
    icon: BarChart,
    color: 'bg-blue-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'hotmart',
    name: 'Hotmart',
    description: 'Plataforma de produtos digitais e afiliados',
    category: 'Marketplace',
    logo: 'https://ext.same-assets.com/1393434948/951560450.png',
    icon: ShoppingCart,
    color: 'bg-red-600',
    fields: [
      {
        name: 'clientId',
        type: 'text',
        label: 'Client ID',
        placeholder: 'Digite seu Client ID',
        required: true
      },
      {
        name: 'clientSecret',
        type: 'password',
        label: 'Client Secret',
        placeholder: 'Digite seu Client Secret',
        required: true
      }
    ]
  },
  {
    id: 'eduzz',
    name: 'Eduzz',
    description: 'Plataforma de produtos digitais e afiliados',
    category: 'Marketplace',
    logo: 'https://ext.same-assets.com/2866914255/1470969735.png',
    icon: ShoppingCart,
    color: 'bg-blue-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'kirvano',
    name: 'Kirvano',
    description: 'Plataforma de e-commerce',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/2475253346/1681915123.png',
    icon: Store,
    color: 'bg-indigo-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'vega',
    name: 'Vega',
    description: 'Plataforma de pagamentos',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/1710078370/2825223246.png',
    icon: CreditCard,
    color: 'bg-emerald-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'pepper',
    name: 'Pepper',
    description: 'Plataforma de pagamentos',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/2766346942/2605853472.png',
    icon: CreditCard,
    color: 'bg-emerald-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'ticto',
    name: 'Ticto',
    description: 'Plataforma de produtos digitais',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/4146222776/497266115.png',
    icon: Store,
    color: 'bg-indigo-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'monetizze',
    name: 'Monetizze',
    description: 'Plataforma de afiliados',
    category: 'Afiliados',
    logo: 'https://ext.same-assets.com/1489017789/1587913887.png',
    icon: ShoppingCart,
    color: 'bg-blue-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'payt',
    name: 'Payt',
    description: 'Gateway de pagamentos',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/795882594/378165872.png',
    icon: CreditCard,
    color: 'bg-emerald-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'zippify',
    name: 'Zippify',
    description: 'Plataforma de e-commerce',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/1362134753/495955947.png',
    icon: Store,
    color: 'bg-indigo-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'guru',
    name: 'Guru',
    description: 'Plataforma de ensino',
    category: 'Plataforma',
    logo: 'https://ext.same-assets.com/1611842427/1831627910.png',
    icon: Rocket,
    color: 'bg-violet-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'greenn',
    name: 'Greenn',
    description: 'Plataforma de pagamentos',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/3595190026/1288617338.png',
    icon: CreditCard,
    color: 'bg-emerald-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'yampi',
    name: 'Yampi',
    description: 'Plataforma de e-commerce',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/1487268240/1144060460.png',
    icon: Store,
    color: 'bg-indigo-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'adoorei',
    name: 'Adoorei',
    description: 'Plataforma de vendas',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/2102150173/2794590048.png',
    icon: Store,
    color: 'bg-indigo-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'braip',
    name: 'Braip',
    description: 'Plataforma de produtos digitais',
    category: 'Marketplace',
    logo: 'https://ext.same-assets.com/2180000218/3312231067.png',
    icon: ShoppingCart,
    color: 'bg-red-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'buygoods',
    name: 'BuyGoods',
    description: 'Gateway de pagamentos',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/1898251416/2713172727.png',
    icon: CreditCard,
    color: 'bg-emerald-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'octuspay',
    name: 'OctusPay',
    description: 'Gateway de pagamentos',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/3390401798/1032188925.png',
    icon: CreditCard,
    color: 'bg-emerald-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'appmax',
    name: 'Appmax',
    description: 'Plataforma de vendas',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/1013585170/2774652150.png',
    icon: Store,
    color: 'bg-indigo-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'cartpanda',
    name: 'Cartpanda',
    description: 'Plataforma de e-commerce',
    category: 'E-commerce',
    logo: 'https://ext.same-assets.com/1177191976/743979502.png',
    icon: Store,
    color: 'bg-indigo-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  },
  {
    id: 'tribopay',
    name: 'TriboPay',
    description: 'Gateway de pagamentos',
    category: 'Pagamentos',
    logo: 'https://ext.same-assets.com/493906308/1307270.png',
    icon: CreditCard,
    color: 'bg-emerald-600',
    fields: [
      {
        name: 'apiKey',
        type: 'password',
        label: 'Chave da API',
        placeholder: 'Digite sua chave da API',
        required: true
      }
    ]
  }
];

export const CATEGORIES = Array.from(new Set(PLATFORMS.map(p => p.category)));