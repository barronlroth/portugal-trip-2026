import { useState } from 'react'

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '#overview', label: 'Overview' },
    { href: '#douro', label: 'Douro Valley' },
    { href: '#lisbon', label: 'Lisbon' },
    { href: '#wedding', label: 'Wedding' },
    { href: '#packing', label: 'Packing' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="font-[Playfair_Display] text-xl font-semibold text-[var(--color-wine)]">
          Portugal 2026
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-sm font-medium text-gray-600 hover:text-[var(--color-wine)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4">
          {links.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              className="block py-2 text-gray-600 hover:text-[var(--color-wine)]"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <p className="text-lg md:text-xl tracking-[0.3em] uppercase mb-4 opacity-90">May 19-25, 2026</p>
        <h1 className="font-[Playfair_Display] text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow">
          Portugal
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto opacity-90 mb-8">
          Wine country in Douro Valley, a wedding celebration in Lisbon, and unforgettable memories
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#douro" className="bg-white text-[var(--color-wine)] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition">
            Explore Itinerary
          </a>
          <a href="#wedding" className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[var(--color-wine)] transition">
            Wedding Info
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

// Overview Section
function Overview() {
  return (
    <section id="overview" className="py-20 px-4 bg-[var(--color-cream)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[Playfair_Display] text-4xl md:text-5xl text-center mb-4 text-[var(--color-slate-warm)]">
          The Journey
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          From the terraced vineyards of Douro to the cobblestone streets of Lisbon
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Trip Summary Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-semibold text-xl mb-4 text-[var(--color-wine)]">Trip Overview</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)]">✈</span>
                <span><strong>Arrive:</strong> May 19, land at 10am</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)]">🍷</span>
                <span><strong>May 19-22:</strong> Douro Valley wine country</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)]">🏙</span>
                <span><strong>May 22-24:</strong> Lisbon exploration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)]">💒</span>
                <span><strong>May 23-24:</strong> Wedding celebrations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-gold)]">✈</span>
                <span><strong>Depart:</strong> May 25, LIS → JFK → SFO</span>
              </li>
            </ul>
          </div>

          {/* Travelers Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-semibold text-xl mb-4 text-[var(--color-wine)]">Travelers</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-wine)] rounded-full flex items-center justify-center text-white font-semibold">
                  B+N
                </div>
                <div>
                  <p className="font-medium">Barron & Nina</p>
                  <p className="text-sm text-gray-500">Full trip: May 19-25</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-white font-semibold">
                  Z+L
                </div>
                <div>
                  <p className="font-medium">Zach & Lauren</p>
                  <p className="text-sm text-gray-500">Douro Valley: May 19-22</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '7', label: 'Days' },
            { num: '2', label: 'Regions' },
            { num: '3', label: 'Nights in Douro' },
            { num: '2', label: 'Nights in Lisbon' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-[Playfair_Display] text-4xl font-bold text-[var(--color-wine)]">{stat.num}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Day Card Component
interface DayCardProps {
  date: string;
  title: string;
  description: string;
  activities: string[];
  accommodation?: {
    name: string;
    url: string;
    note?: string;
  };
  dining?: Array<{
    name: string;
    type: string;
    url?: string;
  }>;
  mapUrl?: string;
}

function DayCard({ date, title, description, activities, accommodation, dining, mapUrl }: DayCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="gradient-wine text-white p-6">
        <p className="text-sm uppercase tracking-wider opacity-80">{date}</p>
        <h3 className="font-[Playfair_Display] text-2xl font-semibold mt-1">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-400 mb-2">Activities</h4>
            <ul className="space-y-2">
              {activities.map((activity, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-[var(--color-gold)] mt-1">•</span>
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          {accommodation && (
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-400 mb-2">Stay</h4>
              <a 
                href={accommodation.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--color-wine)] hover:underline font-medium"
              >
                {accommodation.name} ↗
              </a>
              {accommodation.note && (
                <p className="text-sm text-gray-500 mt-1">{accommodation.note}</p>
              )}
            </div>
          )}

          {dining && dining.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-400 mb-2">Dining</h4>
              <div className="space-y-1">
                {dining.map((restaurant, i) => (
                  <div key={i}>
                    {restaurant.url ? (
                      <a 
                        href={restaurant.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--color-wine)] hover:underline"
                      >
                        {restaurant.name}
                      </a>
                    ) : (
                      <span className="text-gray-700">{restaurant.name}</span>
                    )}
                    <span className="text-gray-500 text-sm ml-2">— {restaurant.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mapUrl && (
            <a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-wine)] mt-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              View on Maps
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// Douro Valley Section
function DouroValley() {
  const days = [
    {
      date: 'Monday, May 19',
      title: 'Arrival & Douro Valley',
      description: 'Land in Porto at 10am, pick up rental car and drive ~1.5 hours to the Douro Valley. Meet up with Zach & Lauren!',
      activities: [
        'Pick up rental car at Porto Airport (OPO)',
        'Scenic drive along the Douro River',
        'Check in and settle at the hotel',
        'Evening wine tasting to kick off the trip',
      ],
      accommodation: {
        name: 'Six Senses Douro Valley',
        url: 'https://www.sixsenses.com/en/resorts/douro-valley/',
        note: 'IHG points eligible • Spa & vineyard views'
      },
      mapUrl: 'https://maps.google.com/?q=Six+Senses+Douro+Valley+Portugal'
    },
    {
      date: 'Tuesday, May 20',
      title: 'Wine Exploration Day',
      description: 'A full day of winery visits and tastings. The Douro Valley is UNESCO World Heritage with 2,000+ years of winemaking.',
      activities: [
        'Morning: Quinta do Bomfim (Dow\'s Port)',
        'Afternoon: Quinta Nova for lunch with valley views',
        'Evening: Quinta de la Rosa tasting',
        'Sunset watching over the terraced vineyards',
      ],
      accommodation: {
        name: 'Six Senses Douro Valley',
        url: 'https://www.sixsenses.com/en/resorts/douro-valley/',
      },
      dining: [
        { name: 'Quinta Nova', type: 'Lunch with views', url: 'https://www.quintanova.com/' },
        { name: 'DOC Restaurant', type: 'Dinner option', url: 'https://ruipaula.com/doc/' },
      ],
      mapUrl: 'https://maps.google.com/?q=Pinhao+Douro+Valley+Portugal'
    },
    {
      date: 'Wednesday, May 21',
      title: 'Douro Discovery',
      description: 'More wineries, stunning viewpoints, and perhaps a boat cruise on the Douro River.',
      activities: [
        'Morning: Quinta do Vallado wine experience',
        'Douro River boat cruise (optional)',
        'Visit Pinhão train station (famous blue tiles)',
        'Olive oil tasting at Lagar da Sancha',
        'Farewell dinner with Zach & Lauren',
      ],
      accommodation: {
        name: 'Six Senses Douro Valley',
        url: 'https://www.sixsenses.com/en/resorts/douro-valley/',
      },
      dining: [
        { name: 'Quinta do Vallado Restaurant', type: 'Lunch', url: 'https://www.quintadovallado.com/' },
        { name: 'Castas e Pratos', type: 'Dinner in Peso da Régua', url: 'https://www.castasepratos.com/' },
      ],
      mapUrl: 'https://maps.google.com/?q=Quinta+do+Vallado+Portugal'
    },
    {
      date: 'Thursday, May 22',
      title: 'Douro → Lisbon',
      description: 'Say goodbye to Zach & Lauren as they head home. Drive ~4 hours south to Lisbon (or scenic stops in Coimbra).',
      activities: [
        'Leisurely breakfast at the hotel',
        'Drive to Lisbon (~4 hours)',
        'Optional: Stop in Coimbra or Aveiro',
        'Evening: Explore Lisbon neighborhood',
        'Check into Lisbon hotel',
      ],
      accommodation: {
        name: 'TBD - Lisbon Hotel',
        url: '#',
        note: 'Ideally in Baixa, Alfama, or Príncipe Real'
      },
      mapUrl: 'https://maps.google.com/?q=Lisbon+Portugal'
    },
  ]

  const wineries = [
    {
      name: 'Quinta do Bomfim',
      owner: 'Symington (Dow\'s)',
      highlight: 'Beautiful estate with stunning views',
      url: 'https://www.symington.com/visit-our-quintas/quinta-do-bomfim'
    },
    {
      name: 'Quinta Nova',
      owner: 'Est. 1725',
      highlight: 'One of the oldest quintas, excellent restaurant',
      url: 'https://www.quintanova.com/'
    },
    {
      name: 'Quinta de la Rosa',
      owner: 'Family-owned',
      highlight: '5 min from Pinhão, intimate tastings',
      url: 'https://www.quintadelarosa.com/'
    },
    {
      name: 'Quinta do Vallado',
      owner: 'Historic estate',
      highlight: 'Beautiful hotel, free tastings for guests',
      url: 'https://www.quintadovallado.com/'
    },
    {
      name: 'Quinta do Seixo',
      owner: 'Sandeman',
      highlight: 'Modern visitor center, great views',
      url: 'https://www.sograpevinhos.com/quintas/Quinta-do-Seixo'
    },
    {
      name: 'Quinta das Carvalhas',
      owner: 'Real Companhia Velha',
      highlight: 'Panoramic views from the top',
      url: 'https://www.realcompanhiavelha.pt/'
    },
  ]

  return (
    <section id="douro" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-widest">May 19-22</span>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl mt-2 text-[var(--color-slate-warm)]">
            Douro Valley
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            UNESCO World Heritage wine region with 2,000 years of winemaking history. 
            Terraced vineyards cascade down to the Douro River.
          </p>
        </div>

        {/* Day by Day */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {days.map((day, i) => (
            <DayCard key={i} {...day} />
          ))}
        </div>

        {/* Wineries Grid */}
        <div className="bg-[var(--color-cream)] rounded-2xl p-8">
          <h3 className="font-[Playfair_Display] text-2xl text-center mb-8 text-[var(--color-wine)]">
            Top Wineries to Visit
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wineries.map((winery, i) => (
              <a 
                key={i}
                href={winery.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition group"
              >
                <h4 className="font-semibold text-[var(--color-wine)] group-hover:underline">
                  {winery.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{winery.owner}</p>
                <p className="text-sm text-gray-600 mt-2">{winery.highlight}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Hotels Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white rounded-2xl p-8">
            <h3 className="font-[Playfair_Display] text-2xl mb-4">Six Senses Douro Valley</h3>
            <p className="text-white/80 mb-4">
              Luxury wellness resort in a restored 19th-century manor. Spa, organic gardens, 
              and spectacular vineyard views.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>✓ IHG One Rewards points eligible</li>
              <li>✓ Award-winning spa</li>
              <li>✓ Wine experiences on-site</li>
              <li>✓ Pool with valley views</li>
            </ul>
            <a 
              href="https://www.sixsenses.com/en/resorts/douro-valley/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-white text-[var(--color-wine)] px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
            >
              View Property ↗
            </a>
          </div>
          <div className="bg-gradient-to-br from-[var(--color-wine)] to-[var(--color-wine-dark)] text-white rounded-2xl p-8">
            <h3 className="font-[Playfair_Display] text-2xl mb-4">Quinta do Vallado</h3>
            <p className="text-white/80 mb-4">
              A family-owned wine estate with a boutique hotel right in the vineyards. 
              Modern design meets historic winemaking.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>✓ Free wine tasting for guests</li>
              <li>✓ Excellent on-site restaurant</li>
              <li>✓ Pool overlooking vineyards</li>
              <li>✓ Intimate, romantic setting</li>
            </ul>
            <a 
              href="https://www.quintadovallado.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-white text-[var(--color-wine)] px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
            >
              View Property ↗
            </a>
          </div>
        </div>

        {/* Transportation Tip */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚗</span>
            <div>
              <h4 className="font-semibold text-amber-800">Transportation Tip</h4>
              <p className="text-amber-700 text-sm mt-1">
                Rent a car at Porto Airport (OPO). The drive to Douro Valley is about 1.5 hours along scenic roads. 
                Having a car is essential for visiting multiple wineries. Roads are winding but well-maintained!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Lisbon Section
function Lisbon() {
  const lisbonDays = [
    {
      date: 'Thursday, May 22 (Evening)',
      title: 'Arrive in Lisbon',
      description: 'Check into the hotel and explore the neighborhood. Easy evening to recharge before wedding festivities.',
      activities: [
        'Arrive and check into hotel',
        'Sunset stroll to Miradouro da Senhora do Monte',
        'Light dinner in Alfama or Baixa',
        'Sample pastéis de nata',
      ],
      dining: [
        { name: 'Taberna da Rua das Flores', type: 'Casual Portuguese', url: 'https://www.tabernaruadasflores.com/' },
      ],
    },
    {
      date: 'Friday, May 23',
      title: 'Explore Lisbon + Welcome Party',
      description: 'Daytime exploration of Lisbon\'s best neighborhoods before the wedding welcome party in the evening.',
      activities: [
        'Morning: Belém — Tower, Monastery, Pastéis de Belém',
        'Lunch: Time Out Market or LX Factory',
        'Afternoon: Alfama neighborhood walk',
        'Evening: Wedding welcome party 🎉',
      ],
      dining: [
        { name: 'Pastéis de Belém', type: 'Famous custard tarts', url: 'https://pasteisdebelem.pt/' },
        { name: 'Time Out Market', type: 'Food hall', url: 'https://www.timeoutmarket.com/lisbon/' },
      ],
    },
    {
      date: 'Saturday, May 24',
      title: 'Wedding Day! 💒',
      description: 'The main event! Wedding ceremony and celebration at the stunning Palácio do Grilo.',
      activities: [
        'Morning: Relax, light breakfast',
        'Afternoon: Get ready for the wedding',
        'Evening: Wedding at Palácio do Grilo',
        'Dress code: Black tie optional',
      ],
    },
    {
      date: 'Sunday, May 25',
      title: 'Homeward Bound',
      description: 'Early morning flight home. LIS 10am → JFK → SFO, arriving 6:49pm.',
      activities: [
        'Wake up early (sorry!)',
        'Lisbon → JFK → SFO',
        'Arrive San Francisco 6:49pm',
        'Dream of Portugal...',
      ],
    },
  ]

  const neighborhoods = [
    {
      name: 'Alfama',
      vibe: 'Historic, narrow streets, Fado music',
      mustDo: 'Get lost in the alleys, hear Fado at Tasca do Chico',
    },
    {
      name: 'Belém',
      vibe: 'Monuments, maritime history, pastries',
      mustDo: 'Torre de Belém, Jerónimos Monastery, pastéis de nata',
    },
    {
      name: 'Bairro Alto',
      vibe: 'Bohemian, nightlife, trendy',
      mustDo: 'Evening drinks, street art, rooftop bars',
    },
    {
      name: 'LX Factory',
      vibe: 'Creative hub, industrial chic',
      mustDo: 'Sunday market, Landeau chocolate cake, bookshop',
    },
    {
      name: 'Baixa/Chiado',
      vibe: 'City center, shopping, cafés',
      mustDo: 'Praça do Comércio, Elevador de Santa Justa',
    },
    {
      name: 'Príncipe Real',
      vibe: 'Upscale, leafy, boutiques',
      mustDo: 'Garden, brunch spots, concept stores',
    },
  ]

  const restaurants = [
    { name: 'Taberna Londrina', area: 'Bairro Alto', type: 'Best Francesinha in Lisbon', url: 'https://www.tabernalondrina.com/' },
    { name: 'Tasca do Chico', area: 'Bairro Alto', type: 'Fado bar with great food', url: '#' },
    { name: 'Belcanto', area: 'Chiado', type: 'Michelin 2-star (splurge!)', url: 'https://www.belcanto.pt/' },
    { name: 'Cervejaria Ramiro', area: 'Intendente', type: 'Famous seafood', url: 'https://www.cervejariaramiro.pt/' },
    { name: 'Time Out Market', area: 'Cais do Sodré', type: 'Food hall, many options', url: 'https://www.timeoutmarket.com/lisbon/' },
    { name: 'O Velho Eurico', area: 'Alfama', type: 'Traditional Portuguese', url: '#' },
  ]

  return (
    <section id="lisbon" className="py-20 px-4 bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-widest">May 22-25</span>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl mt-2 text-[var(--color-slate-warm)]">
            Lisbon
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            The city of seven hills, azulejo tiles, and custard tarts. 
            A perfect blend of old-world charm and modern cool.
          </p>
        </div>

        {/* Day by Day */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {lisbonDays.map((day, i) => (
            <DayCard key={i} {...day} />
          ))}
        </div>

        {/* Neighborhoods */}
        <div className="mb-12">
          <h3 className="font-[Playfair_Display] text-2xl text-center mb-8 text-[var(--color-wine)]">
            Neighborhoods to Explore
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {neighborhoods.map((hood, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-[var(--color-wine)]">{hood.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{hood.vibe}</p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-medium">Must do:</span> {hood.mustDo}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Restaurants */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="font-[Playfair_Display] text-2xl text-center mb-6 text-[var(--color-wine)]">
            Restaurant Recommendations
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {restaurants.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-[var(--color-wine)] transition">
                <div>
                  <a 
                    href={r.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--color-wine)] hover:underline"
                  >
                    {r.name}
                  </a>
                  <p className="text-sm text-gray-500">{r.area} — {r.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Wedding Section
function Wedding() {
  return (
    <section id="wedding" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-widest">May 23-24, 2026</span>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl mt-2 text-[var(--color-slate-warm)]">
            Wedding Celebration
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Welcome Party */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🥂</span>
              <h3 className="font-[Playfair_Display] text-2xl text-[var(--color-wine)]">Welcome Party</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><strong>Date:</strong> Saturday, May 23, 2026</p>
              <p><strong>Time:</strong> Evening</p>
              <p><strong>Dress Code:</strong> Cocktails / Casual</p>
              <p><strong>Vibe:</strong> Relaxed gathering to meet everyone before the big day!</p>
            </div>
          </div>

          {/* Wedding */}
          <div className="bg-gradient-to-br from-[var(--color-wine)] to-[var(--color-wine-dark)] text-white rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💒</span>
              <h3 className="font-[Playfair_Display] text-2xl">The Wedding</h3>
            </div>
            <div className="space-y-3 text-white/90">
              <p><strong className="text-white">Date:</strong> Sunday, May 24, 2026</p>
              <p><strong className="text-white">Venue:</strong> Palácio do Grilo</p>
              <p><strong className="text-white">Dress Code:</strong> Black Tie Optional</p>
              <p><strong className="text-white">Location:</strong> Beato district, Lisbon</p>
            </div>
            <a 
              href="https://palaciogrilo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-white text-[var(--color-wine)] px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
            >
              View Venue ↗
            </a>
          </div>
        </div>

        {/* Venue Info */}
        <div className="mt-12 text-center">
          <h3 className="font-[Playfair_Display] text-2xl mb-4 text-[var(--color-wine)]">
            About Palácio do Grilo
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A stunning 18th-century palace in Lisbon's Beato district, next to the Tagus River. 
            The palace combines immersive art, performance, and historic architecture for an unforgettable venue.
          </p>
          <div className="mt-6">
            <a 
              href="https://maps.google.com/?q=Palacio+do+Grilo+Lisbon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-wine)] hover:underline"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Calçada do Duque de Lafões 1, 1950-207 Lisboa
            </a>
          </div>
        </div>

        {/* Dress Code Tips */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <h3 className="font-semibold text-lg mb-4 text-center">Black Tie Optional Guide</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-[var(--color-wine)] mb-2">For Him</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Dark suit (navy, charcoal, black)</li>
                <li>• Tuxedo if you want to go all out</li>
                <li>• Tie or bow tie</li>
                <li>• Dress shoes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[var(--color-wine)] mb-2">For Her</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Floor-length gown or elegant cocktail dress</li>
                <li>• Dressy separates work too</li>
                <li>• Heels or dressy flats</li>
                <li>• Statement jewelry</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Packing Section
function Packing() {
  const categories = [
    {
      title: '👔 Clothing',
      items: [
        'Black tie optional outfit for wedding',
        'Cocktail attire for welcome party',
        'Casual day clothes (May weather ~60-75°F)',
        'Light layers for cool evenings',
        'Comfortable walking shoes',
        'Sandals for warm days',
        'Swimsuit (hotel pools!)',
      ]
    },
    {
      title: '📱 Tech & Essentials',
      items: [
        'Passport (valid 6+ months)',
        'Phone + charger',
        'EU power adapter (Type C/F)',
        'Camera for wine country views',
        'Portable battery pack',
      ]
    },
    {
      title: '🧴 Toiletries & Health',
      items: [
        'Sunscreen',
        'Medications',
        'Motion sickness meds (winding roads)',
        'Hand sanitizer',
        'Basic first aid',
      ]
    },
    {
      title: '💡 Pro Tips',
      items: [
        'Download offline Google Maps for Douro',
        'Get international driving permit (recommended)',
        'Notify bank of travel dates',
        'Pack wine opener (for post-winery purchases!)',
        'Bring an empty bag for wine bottles home',
      ]
    },
  ]

  return (
    <section id="packing" className="py-20 px-4 bg-[var(--color-cream)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl text-[var(--color-slate-warm)]">
            Packing List
          </h2>
          <p className="text-gray-600 mt-4">
            Portugal in late May: warm days (65-78°F), cool evenings, occasional rain possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-700 text-sm">
                    <input type="checkbox" className="mt-0.5 rounded border-gray-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Weather Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌤</span>
            <div>
              <h4 className="font-semibold text-blue-800">May Weather in Portugal</h4>
              <p className="text-blue-700 text-sm mt-1">
                Expect pleasant spring weather! Douro Valley can be slightly warmer. 
                Lisbon: highs around 70-75°F (21-24°C), lows around 55-60°F (13-16°C). 
                Light jacket for evenings and occasional rain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="gradient-wine text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-[Playfair_Display] text-2xl mb-4">
          Portugal 2026 🇵🇹
        </p>
        <p className="text-white/70 text-sm">
          May 19-25, 2026 • Barron & Nina
        </p>
        <p className="text-white/50 text-xs mt-8">
          Made with ❤️ for an unforgettable adventure
        </p>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Overview />
      <DouroValley />
      <Lisbon />
      <Wedding />
      <Packing />
      <Footer />
    </main>
  )
}

export default App
