import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Rocket,
  Zap,
  LineChart,
  BarChart,
  Target,
  Share2,
  Globe2,
  CheckCircle,
  ArrowUpCircle,
  Sparkles,
  Star,
  DollarSign,
  ShoppingCart,
  CreditCard,
  ArrowDown,
  Users,
  TrendingUp,
  Shield,
  Laptop,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
  Infinity
} from 'lucide-react';
import Logo from '../components/Logo';

const integrations = [
  { name: "Kiwify", logo: "https://ext.same-assets.com/566091141/209278665.png" },
  { name: "IExperience", logo: "https://ext.same-assets.com/1915266246/1415355751.png" },
  { name: "PerfectPay", logo: "https://ext.same-assets.com/2927460062/1589351797.png" },
  { name: "Doppus", logo: "https://ext.same-assets.com/593279382/386948482.png" },
  { name: "Orbita", logo: "https://ext.same-assets.com/3682954899/2381348732.png" },
  { name: "Hotmart", logo: "https://ext.same-assets.com/1393434948/951560450.png" },
  { name: "Eduzz", logo: "https://ext.same-assets.com/2866914255/1470969735.png" },
  { name: "Kirvano", logo: "https://ext.same-assets.com/2475253346/1681915123.png" },
  { name: "Vega", logo: "https://ext.same-assets.com/1710078370/2825223246.png" },
  { name: "Pepper", logo: "https://ext.same-assets.com/2766346942/2605853472.png" },
  { name: "Ticto", logo: "https://ext.same-assets.com/4146222776/497266115.png" },
  { name: "Monetizze", logo: "https://ext.same-assets.com/1489017789/1587913887.png" },
  { name: "Payt", logo: "https://ext.same-assets.com/795882594/378165872.png" },
  { name: "Zippify", logo: "https://ext.same-assets.com/1362134753/495955947.png" },
  { name: "Guru", logo: "https://ext.same-assets.com/1611842427/1831627910.png" },
  { name: "Greenn", logo: "https://ext.same-assets.com/3595190026/1288617338.png" },
  { name: "Yampi", logo: "https://ext.same-assets.com/1487268240/1144060460.png" },
  { name: "Adoorei", logo: "https://ext.same-assets.com/2102150173/2794590048.png" },
  { name: "Braip", logo: "https://ext.same-assets.com/2180000218/3312231067.png" },
  { name: "BuyGoods", logo: "https://ext.same-assets.com/1898251416/2713172727.png" },
  { name: "OctusPay", logo: "https://ext.same-assets.com/3390401798/1032188925.png" },
  { name: "Appmax", logo: "https://ext.same-assets.com/1013585170/2774652150.png" },
  { name: "Cartpanda", logo: "https://ext.same-assets.com/1177191976/743979502.png" },
  { name: "TriboPay", logo: "https://ext.same-assets.com/493906308/1307270.png" }
];

const features = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Rastreamento Preciso',
    description: 'Monitore cada clique e conversão com precisão absoluta.',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: 'Analytics Avançado',
    description: 'Tome decisões baseadas em dados em tempo real.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: 'Automação Inteligente',
    description: 'Automatize suas campanhas com regras personalizadas.',
    gradient: 'from-emerald-500 to-green-500'
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: 'Integração Universal',
    description: 'Conecte-se com todas as principais plataformas.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: 'Multi-plataforma',
    description: 'Gerencie campanhas em diferentes canais.',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Validação Automática',
    description: 'Garanta a precisão dos seus links UTM.',
    gradient: 'from-indigo-500 to-blue-500'
  }
];

const stats = [
  { 
    value: '99.9%', 
    label: 'Uptime', 
    icon: <Zap className="h-5 w-5" />,
    gradient: 'from-purple-600 to-indigo-600'
  },
  { 
    value: '+500', 
    label: 'Clientes Ativos', 
    icon: <Star className="h-5 w-5" />,
    gradient: 'from-blue-600 to-cyan-600'
  },
  { 
    value: '+1M', 
    label: 'UTMs Gerados', 
    icon: <ShoppingCart className="h-5 w-5" />,
    gradient: 'from-emerald-600 to-green-600'
  },
  { 
    value: '+50M', 
    label: 'Clicks Rastreados', 
    icon: <CreditCard className="h-5 w-5" />,
    gradient: 'from-rose-600 to-pink-600'
  }
];

const testimonials = [
  {
    name: "João Silva",
    role: "Marketing Manager",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "Desde que começamos a usar o Bueiro Digital, nossa eficiência em rastreamento de campanhas aumentou em 300%. É uma ferramenta indispensável."
  },
  {
    name: "Maria Santos",
    role: "Digital Strategist",
    company: "Growth Agency",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "A facilidade de uso e a precisão dos dados nos ajudaram a otimizar nossas campanhas de maneira extraordinária."
  },
  {
    name: "Pedro Costa",
    role: "CEO",
    company: "Digital Solutions",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "O suporte é excepcional e as integrações são perfeitas. Recomendo fortemente para qualquer empresa séria."
  }
];

const benefits = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Aumente seu ROI",
    description: "Otimize suas campanhas com dados precisos e tome decisões mais inteligentes."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Dados Seguros",
    description: "Seus dados estão protegidos com a mais alta tecnologia de segurança."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Colaboração em Equipe",
    description: "Trabalhe em conjunto com sua equipe de forma eficiente e organizada."
  },
  {
    icon: <Laptop className="h-6 w-6" />,
    title: "Fácil de Usar",
    description: "Interface intuitiva que não requer conhecimento técnico avançado."
  }
];

const highlights = [
  "Rastreamento em tempo real",
  "Integrações automáticas",
  "Relatórios personalizados",
  "Suporte 24/7"
];

function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 3000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const heroTexts = [
    "Potencialize seus resultados",
    "Maximize seu ROI",
    "Otimize suas campanhas",
    "Alcance o sucesso"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-8">
              <a 
                href="#integrations" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
              >
                Integrações
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
              </a>
              <a 
                href="#features" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
              >
                Recursos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
              </a>
              <Link
                to="/login"
                className="group relative inline-flex items-center px-6 py-2.5 rounded-lg text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 group-hover:scale-110" />
                <span className="relative flex items-center font-medium">
                  Entrar na plataforma
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-white to-blue-100/40" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  backgroundColor: `rgba(${Math.random() * 100 + 155}, ${
                    Math.random() * 100 + 155
                  }, 255, ${Math.random() * 0.3 + 0.1})`,
                  borderRadius: '50%',
                  filter: 'blur(1px)',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Pre-headline badge */}
            <div className="hero-badge mb-8">
              <Infinity className="h-4 w-4 mr-2 animate-spin-slow" />
              Descubra o poder do rastreamento inteligente
            </div>

            {/* Animated headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              <span className="hero-title animate-gradient">
                {heroTexts[animationStep]}
              </span>
              <br />
              <span className="mt-4 block text-4xl md:text-6xl text-gray-900 animate-fade-in">
                com precisão e estratégia
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto hero-subtitle">
              Transforme dados em resultados extraordinários com nossa plataforma 
              completa de gestão e otimização de campanhas digitais.
            </p>

            {/* Highlights with staggered animation */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="flex items-center space-x-2 text-gray-700 animate-slide-up"
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    opacity: 0
                  }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 animate-bounce-subtle" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="hero-cta group relative inline-flex items-center px-8 py-3 rounded-lg text-white overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 animate-gradient" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shine" />
                <span className="relative flex items-center font-medium">
                  Começar agora
                  <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
              <a 
                href="#features"
                className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300"
              >
                <span className="relative">
                  Saiba mais
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Por que escolher o Bueiro Digital?
            </h2>
            <p className="mt-4 text-gray-600">
              Tudo que você precisa para o sucesso das suas campanhas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-12 h-12 flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white transform transition-transform group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Recursos Poderosos
            </h2>
            <p className="mt-4 text-gray-600">
              Tudo que você precisa para o sucesso das suas campanhas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white w-12 h-12 flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section id="integrations" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Integrações Disponíveis
            </h2>
            <p className="mt-4 text-gray-600">
              Conecte-se com suas plataformas favoritas
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="h-12 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/logos/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-2 text-sm text-center font-medium text-gray-900">{integration.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              O que nossos clientes dizem
            </h2>
            <p className="mt-4 text-gray-600">
              Histórias de sucesso de quem já utiliza nossa plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Pronto para transformar suas campanhas?
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              Comece agora mesmo e descubra como nossa plataforma pode 
              ajudar você a alcançar resultados extraordinários.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 rounded-lg text-purple-600 bg-white hover:bg-purple-50 transition-colors duration-300 group"
              >
                <span className="font-medium">Criar conta gratuita</span>
                <ArrowUpRight className="ml-2 h-5 w-5 text-purple-600 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-8">
              <Logo />
              <nav className="flex space-x-6">
                <a href="#integrations" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Integrações
                </a>
                <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Recursos
                </a>
                <Link to="/login" className="text-gray-500 hover:text-gray-900 transition-colors">
                  Login
                </Link>
              </nav>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-sm text-gray-500">
                © 2025 Bueiro Digital. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;