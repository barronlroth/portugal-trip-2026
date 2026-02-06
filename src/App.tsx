import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

// ============ CONSTANTS ============
const TRIP_DATE = new Date('2026-05-13T18:00:00')

const UNSPLASH_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2000&q=80',
  douroValley: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=2000&q=80',
  douroVineyard: 'https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?auto=format&fit=crop&w=1600&q=80',
  lisbon: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=2000&q=80',
  lisbonTram: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
  azulejos: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=1600&q=80',
  wine: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80',
  porto: 'https://images.unsplash.com/photo-1555881400-69089f4de890?auto=format&fit=crop&w=1600&q=80',
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
  madrid: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80',
  toledo: 'https://images.unsplash.com/photo-1559590185-558ae7f6fc73?auto=format&fit=crop&w=1600&q=80',
  prado: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1600&q=80',
}

// Option colors
const OPTION_COLORS = {
  A: { primary: '#c05621', light: '#dd6b20', name: 'terracotta' }, // Spanish Sojourn
  B: { primary: '#2b6cb0', light: '#4299e1', name: 'azulejo' },    // Straight to Portugal
  C: { primary: '#d69e2e', light: '#ecc94b', name: 'gold' },       // Best of Both
}

// ============ ANIMATION VARIANTS ============
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
}

// ============ COMPONENTS ============

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  )
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TRIP_DATE.getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
      <div className="glass rounded-xl px-4 py-3 md:px-6 md:py-4">
        <span className="font-[Playfair_Display] text-3xl md:text-5xl font-bold text-white">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm uppercase tracking-widest text-white/70 mt-2 block">{label}</span>
    </motion.div>
  )

  return (
    <div className="flex gap-3 md:gap-6 justify-center">
      <TimeBlock value={timeLeft.days} label="Days" />
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  )
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#overview', label: 'Overview' },
    { href: '#options', label: 'Options' },
    { href: '#douro', label: 'Douro Valley' },
    { href: '#lisbon', label: 'Lisbon' },
    { href: '#wedding', label: 'Wedding' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--color-navy)]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-[Playfair_Display] text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-[var(--color-gold)]">◆</span>
          Iberia 2026
        </a>
        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/80 hover:text-[var(--color-gold)] transition-colors relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-gold)] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-navy)] border-t border-white/10 overflow-hidden">
            <div className="px-6 py-4">
              {links.map(link => (
                <a key={link.href} href={link.href} className="block py-3 text-white/80 hover:text-[var(--color-gold)] border-b border-white/10 last:border-0"
                  onClick={() => setIsOpen(false)}>{link.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: `url('${UNSPLASH_IMAGES.hero}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/60 via-[var(--color-navy)]/40 to-[var(--color-navy)]" />
      </motion.div>
      <div className="absolute inset-0 azulejo-border opacity-20" />
      
      <motion.div style={{ opacity }} className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-xl tracking-[0.4em] uppercase mb-6 text-[var(--color-gold)]">
          May 13-25, 2026
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
          className="font-[Playfair_Display] text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-shadow-luxury">
          Spain & Portugal
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
          <span className="text-[var(--color-gold)] text-2xl">🇪🇸 🇵🇹</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white/90 mb-12 leading-relaxed">
          From Madrid's vibrant plazas to the terraced vineyards of Douro, 
          culminating in a wedding celebration in Lisbon
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="mb-12">
          <p className="text-sm uppercase tracking-widest text-white/60 mb-4">Your adventure begins in</p>
          <CountdownTimer />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4">
          <motion.a href="#options" className="group relative overflow-hidden bg-[var(--color-gold)] text-[var(--color-navy)] px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[var(--color-gold)]/30"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <span className="relative z-10">Choose Your Adventure</span>
          </motion.a>
          <motion.a href="#wedding" className="group border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            Wedding Details
          </motion.a>
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div className="w-1.5 h-3 bg-[var(--color-gold)] rounded-full" animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
        </div>
      </motion.div>
    </section>
  )
}

function Overview() {
  const milestones = [
    { icon: '✈️', date: 'Wed, May 13', title: 'Depart JFK', desc: 'Overnight flight to Madrid' },
    { icon: '🇪🇸', date: 'Thu, May 14', title: 'Arrive Madrid', desc: 'Begin your adventure' },
    { icon: '🎯', date: 'May 14-18', title: 'Flexible Days', desc: '3 route options below!', highlight: true },
    { icon: '🤝', date: 'Mon, May 19', title: 'Friends Arrive', desc: 'Zach & Lauren join in Porto' },
    { icon: '🍷', date: 'May 19-22', title: 'Douro Valley', desc: '3 nights in wine country' },
    { icon: '🚗', date: 'Thu, May 22', title: 'Drive to Lisbon', desc: '~4 hours scenic route' },
    { icon: '🥂', date: 'Sat, May 23', title: 'Welcome Party', desc: 'Cocktails, casual dress' },
    { icon: '💒', date: 'Sun, May 24', title: 'Wedding Day', desc: 'Palácio do Grilo' },
    { icon: '🏠', date: 'Mon, May 25', title: 'Fly Home', desc: 'LIS → JFK → SFO' },
  ]

  return (
    <section id="overview" className="py-24 px-4 bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[var(--color-terracotta)] text-sm uppercase tracking-[0.3em]">13 Days of Adventure</span>
          <h2 className="font-[Playfair_Display] text-4xl md:text-6xl mt-4 text-[var(--color-navy)]">The Journey</h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="w-24 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
            <span className="text-[var(--color-gold)]">◆</span>
            <span className="w-24 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-terracotta)] via-[var(--color-gold)] to-[var(--color-azulejo)]" />
            <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {milestones.map((m, i) => (
                <motion.div key={i} variants={fadeInUp} className={`relative flex items-center gap-4 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`} />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl z-10 ${m.highlight ? 'bg-[var(--color-gold)] animate-pulse' : 'bg-white shadow-md'}`}>
                    {m.icon}
                  </div>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`card-luxury p-4 inline-block ${m.highlight ? 'ring-2 ring-[var(--color-gold)]' : ''}`}>
                      <p className="text-xs uppercase tracking-widest text-[var(--color-terracotta)]">{m.date}</p>
                      <h3 className="font-semibold text-[var(--color-navy)]">{m.title}</h3>
                      <p className="text-sm text-gray-600">{m.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Travelers */}
        <AnimatedSection className="mt-16">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="card-luxury p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--color-navy)] flex items-center justify-center text-white font-bold">B+N</div>
              <div>
                <p className="font-semibold text-[var(--color-navy)]">Barron & Nina</p>
                <p className="text-sm text-gray-500">Full trip: May 13-25</p>
              </div>
            </div>
            <div className="card-luxury p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--color-terracotta)] flex items-center justify-center text-white font-bold">Z+L</div>
              <div>
                <p className="font-semibold text-[var(--color-navy)]">Zach & Lauren</p>
                <p className="text-sm text-gray-500">Join May 19 for Douro + Wedding</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============ ITINERARY OPTIONS SECTION ============
interface OptionDay {
  date: string;
  title: string;
  activities: string[];
  dining?: string[];
  stay?: string;
  image?: string;
}

interface ItineraryOption {
  id: 'A' | 'B' | 'C';
  name: string;
  tagline: string;
  icon: string;
  summary: string;
  pros: string[];
  days: OptionDay[];
}

const OPTIONS: ItineraryOption[] = [
  {
    id: 'A',
    name: 'The Spanish Sojourn',
    tagline: 'Madrid + Toledo + Porto',
    icon: '🇪🇸',
    summary: 'Embrace Spain before Portugal. Explore Madrid\'s world-class museums and tapas bars, take a day trip to medieval Toledo, then train to Porto for a taste of port wine.',
    pros: ['World-class Prado Museum', 'Toledo day trip (UNESCO site)', 'Scenic train through Iberia', 'Porto port wine cellars'],
    days: [
      {
        date: 'Thu, May 14',
        title: 'Arrive in Madrid',
        activities: ['Land Madrid-Barajas Airport', 'Check into hotel near Sol/Gran Vía', 'Afternoon: Explore Puerta del Sol & Plaza Mayor', 'Evening: Tapas crawl on Calle Ponzano'],
        dining: ['Casa Toni (classic tapas)', 'Bar La Campana', 'Los Gatos for vermut'],
        stay: 'Dear Hotel Madrid or Hotel Atlántico',
        image: UNSPLASH_IMAGES.madrid,
      },
      {
        date: 'Fri, May 15',
        title: 'Madrid Museums & Culture',
        activities: ['Morning: Prado Museum (book ahead!)', 'Lunch at Mercado de San Miguel', 'Afternoon: Retiro Park & Crystal Palace', 'Evening: Sunset drinks at rooftop bar'],
        dining: ['Raza (upscale meats)', 'Casa Labra (cod croquettes since 1860)'],
        stay: 'Dear Hotel Madrid',
        image: UNSPLASH_IMAGES.prado,
      },
      {
        date: 'Sat, May 16',
        title: 'Day Trip to Toledo',
        activities: ['Train from Atocha (30 min)', 'UNESCO World Heritage medieval city', 'Visit Toledo Cathedral & Alcázar', 'Wander Jewish Quarter', 'Return to Madrid for dinner'],
        dining: ['Lunch in Toledo: Alfileritos 24', 'Dinner Madrid: Sobrino de Botín (world\'s oldest restaurant)'],
        stay: 'Dear Hotel Madrid',
        image: UNSPLASH_IMAGES.toledo,
      },
      {
        date: 'Sun, May 17',
        title: 'Train to Porto',
        activities: ['Morning train Madrid → Porto (~6-7 hours)', 'Scenic journey through Spanish countryside', 'Arrive Porto late afternoon', 'Evening walk along Ribeira waterfront'],
        dining: ['Dinner: Adega de São Nicolau'],
        stay: 'Hotel & Wine in Porto',
        image: UNSPLASH_IMAGES.porto,
      },
      {
        date: 'Mon, May 18',
        title: 'Porto Exploration',
        activities: ['Morning: Livraria Lello & Clérigos Tower', 'Cross Dom Luís I Bridge to Gaia', 'Port wine cellar tastings (Graham\'s, Sandeman)', 'Francesinha lunch tradition', 'Evening: Ribeira sunset'],
        dining: ['Café Santiago (best Francesinha)', 'Wine Quay Bar', 'Vinhas d\'Alho for dinner'],
        stay: 'Hotel & Wine in Porto',
        image: UNSPLASH_IMAGES.porto,
      },
    ],
  },
  {
    id: 'B',
    name: 'Straight to Portugal',
    tagline: 'Quick Madrid → Porto Focus',
    icon: '🇵🇹',
    summary: 'Maximize your Portugal time! Quick overnight in Madrid, then fly to Porto for 4 full days exploring the city and early Douro Valley wine tastings.',
    pros: ['4 full days in Porto', 'More time for port wine cellars', 'Early Douro Valley preview', 'Relaxed pace, less travel'],
    days: [
      {
        date: 'Thu, May 14',
        title: 'Madrid Overnight',
        activities: ['Land Madrid-Barajas Airport', 'Check into airport hotel', 'Quick dinner & rest', 'Early night for morning flight'],
        dining: ['Hotel restaurant or Terminal 4'],
        stay: 'NH Collection Madrid Airport',
      },
      {
        date: 'Fri, May 15',
        title: 'Fly to Porto + Explore',
        activities: ['Morning flight MAD → OPO (1 hour)', 'Check into Porto hotel', 'Afternoon: São Bento Station & Cathedral', 'Walk Ribeira UNESCO waterfront', 'First port wine tasting'],
        dining: ['Lunch: O Comercial', 'Dinner: DOP by Chef Rui Paula'],
        stay: 'Pestana Vintage Porto or The Yeatman',
        image: UNSPLASH_IMAGES.porto,
      },
      {
        date: 'Sat, May 16',
        title: 'Port Wine Deep Dive',
        activities: ['Morning: Cross to Vila Nova de Gaia', 'Graham\'s Lodge tour & tasting', 'Lunch with views', 'Afternoon: Sandeman or Taylor\'s', 'Cable car ride along river'],
        dining: ['Lunch: Vinum at Graham\'s', 'Dinner: Cantinho do Avillez'],
        stay: 'Pestana Vintage Porto',
        image: UNSPLASH_IMAGES.wine,
      },
      {
        date: 'Sun, May 17',
        title: 'Day Trip to Douro Valley',
        activities: ['Scenic train to Pinhão (2.5 hours)', 'Visit 1-2 quintas for tastings', 'Lunch at Quinta Nova', 'See famous Pinhão tile station', 'Train back to Porto'],
        dining: ['Lunch: Quinta Nova restaurant', 'Dinner: Taberna dos Mercadores'],
        stay: 'Pestana Vintage Porto',
        image: UNSPLASH_IMAGES.douroValley,
      },
      {
        date: 'Mon, May 18',
        title: 'Porto Hidden Gems',
        activities: ['Morning: Foz do Douro beach area', 'Serralves Museum of Contemporary Art', 'Lunch in Matosinhos (seafood!)', 'Afternoon: Bolhão Market', 'Evening prep for friends arriving'],
        dining: ['Matosinhos seafood restaurants', 'Dinner: Wine Box Porto'],
        stay: 'Pestana Vintage Porto',
        image: UNSPLASH_IMAGES.azulejos,
      },
    ],
  },
  {
    id: 'C',
    name: 'Best of Both Worlds',
    tagline: 'Madrid → Lisbon → North',
    icon: '⚖️',
    summary: 'See the highlights of Madrid, then take the overnight train to Lisbon for a sneak preview before heading north to meet friends. You\'ll book-end the trip with Lisbon!',
    pros: ['Two capital cities', 'Overnight train experience', 'Preview Lisbon before wedding', 'Unique reverse route'],
    days: [
      {
        date: 'Thu, May 14',
        title: 'Arrive in Madrid',
        activities: ['Land Madrid-Barajas Airport', 'Check into central hotel', 'Afternoon: Plaza Mayor & Puerta del Sol', 'Evening: Tapas in La Latina'],
        dining: ['Casa Amadeo Los Caracoles', 'El Doble on Calle Ponzano'],
        stay: 'NH Collection Suecia',
        image: UNSPLASH_IMAGES.madrid,
      },
      {
        date: 'Fri, May 15',
        title: 'Madrid Highlights',
        activities: ['Morning: Prado Museum (essential!)', 'Lunch at Mercado de San Miguel', 'Afternoon: Retiro Park stroll', 'Pack for overnight train', 'Evening: Trenhotel to Lisbon (departs ~9:45pm)'],
        dining: ['Sobrino de Botín', 'Quick tapas before train'],
        stay: 'Trenhotel overnight',
        image: UNSPLASH_IMAGES.prado,
      },
      {
        date: 'Sat, May 16',
        title: 'Arrive Lisbon + Explore',
        activities: ['Arrive Lisbon Santa Apolónia ~7:30am', 'Check into hotel, freshen up', 'Breakfast pastéis de nata', 'Walk Alfama neighborhood', 'Afternoon: Belém (Tower + Monastery)'],
        dining: ['Pastéis de Belém', 'Dinner: Taberna da Rua das Flores'],
        stay: 'Hotel in Baixa or Alfama',
        image: UNSPLASH_IMAGES.lisbon,
      },
      {
        date: 'Sun, May 17',
        title: 'Lisbon Discovery',
        activities: ['Morning: Tram 28 experience', 'LX Factory brunch & market', 'Afternoon: Bairro Alto & Chiado', 'Sunset at Miradouro da Senhora do Monte', 'Time Out Market dinner'],
        dining: ['Landeau Chocolate at LX', 'Time Out Market vendors'],
        stay: 'Hotel in Baixa or Alfama',
        image: UNSPLASH_IMAGES.lisbonTram,
      },
      {
        date: 'Mon, May 18',
        title: 'Train to Porto',
        activities: ['Morning Alfa Pendular to Porto (3 hours)', 'Scenic coastal route', 'Arrive Porto mid-afternoon', 'Quick Ribeira walk', 'One port cellar tasting'],
        dining: ['Dinner: Adega de São Nicolau'],
        stay: 'Porto hotel (1 night)',
        image: UNSPLASH_IMAGES.porto,
      },
    ],
  },
]

function ItineraryOptions() {
  const [activeOption, setActiveOption] = useState<'A' | 'B' | 'C'>('A')
  const [expandedDay, setExpandedDay] = useState<number | null>(0)

  const option = OPTIONS.find(o => o.id === activeOption)!
  const color = OPTION_COLORS[activeOption]

  return (
    <section id="options" className="py-24 px-4 bg-[var(--color-navy)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em]">May 14-18 • Choose Your Path</span>
          <h2 className="font-[Playfair_Display] text-4xl md:text-6xl mt-4 text-white">Three Ways to Begin</h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Before meeting Zach & Lauren on May 19, you have 5 flexible days. Pick your adventure:
          </p>
        </AnimatedSection>

        {/* Option Tabs */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {OPTIONS.map(opt => (
              <motion.button
                key={opt.id}
                onClick={() => { setActiveOption(opt.id); setExpandedDay(0); }}
                className={`relative px-6 py-4 rounded-2xl font-semibold transition-all ${
                  activeOption === opt.id 
                    ? 'text-white shadow-lg' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                style={{ backgroundColor: activeOption === opt.id ? OPTION_COLORS[opt.id].primary : undefined }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl mr-2">{opt.icon}</span>
                <span className="hidden sm:inline">{opt.name}</span>
                <span className="sm:hidden">Option {opt.id}</span>
                {activeOption === opt.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl -z-10"
                    style={{ backgroundColor: OPTION_COLORS[opt.id].primary }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Option Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOption}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Option Header */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{option.icon}</span>
                    <div>
                      <h3 className="font-[Playfair_Display] text-3xl text-white">{option.name}</h3>
                      <p className="text-white/60">{option.tagline}</p>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">{option.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {option.pros.map((pro, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: color.primary + '30', color: color.light }}>
                        ✓ {pro}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-64 h-48 rounded-2xl overflow-hidden">
                  <img src={option.days[0].image || UNSPLASH_IMAGES.madrid} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Day-by-Day */}
            <div className="space-y-4">
              {option.days.map((day, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                  initial={false}
                >
                  <button
                    onClick={() => setExpandedDay(expandedDay === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: color.primary }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest" style={{ color: color.primary }}>{day.date}</p>
                        <h4 className="font-semibold text-[var(--color-navy)] text-lg">{day.title}</h4>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: expandedDay === i ? 180 : 0 }}>
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedDay === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 grid md:grid-cols-2 gap-6">
                          {day.image && (
                            <div className="rounded-xl overflow-hidden h-48">
                              <img src={day.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className={day.image ? '' : 'md:col-span-2'}>
                            <h5 className="font-semibold text-sm uppercase tracking-wide text-gray-400 mb-3">Activities</h5>
                            <ul className="space-y-2 mb-4">
                              {day.activities.map((a, j) => (
                                <li key={j} className="flex items-start gap-2 text-gray-700">
                                  <span style={{ color: color.primary }}>◆</span> {a}
                                </li>
                              ))}
                            </ul>
                            {day.dining && (
                              <>
                                <h5 className="font-semibold text-sm uppercase tracking-wide text-gray-400 mb-2">Dining</h5>
                                <p className="text-gray-600 text-sm">{day.dining.join(' • ')}</p>
                              </>
                            )}
                            {day.stay && (
                              <p className="mt-3 text-sm"><span className="font-semibold" style={{ color: color.primary }}>Stay:</span> {day.stay}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Convergence Note */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <p className="text-white/80">
                <span className="text-[var(--color-gold)] font-semibold">→ May 19:</span> All paths lead to Porto Airport where you'll pick up Zach & Lauren at 10am, 
                then head to the Douro Valley together!
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ============ DOURO VALLEY SECTION ============
function DouroValley() {
  const days = [
    {
      date: 'Mon-Tue, May 19-20',
      title: 'Wine Country Immersion',
      activities: ['Pick up Zach & Lauren at Porto Airport', 'Drive ~1.5 hours to Douro Valley', 'Check into Six Senses or Quinta do Vallado', 'Quinta do Bomfim (Dow\'s) tasting', 'Quinta Nova for lunch with views', 'Sunset over terraced vineyards'],
      image: UNSPLASH_IMAGES.douroValley,
    },
    {
      date: 'Wed, May 21',
      title: 'Deep Douro Discovery',
      activities: ['Quinta de la Rosa tasting', 'Optional: Douro River boat cruise', 'Famous Pinhão tile train station', 'Olive oil tasting at Lagar da Sancha', 'Farewell dinner with friends', 'Stargazing over the valley'],
      image: UNSPLASH_IMAGES.wine,
    },
    {
      date: 'Thu, May 22',
      title: 'Douro → Lisbon',
      activities: ['Leisurely breakfast', 'Say goodbye to Zach & Lauren', '~4 hour scenic drive south', 'Optional: Stop in Coimbra', 'Arrive Lisbon, check in', 'Evening neighborhood stroll'],
      image: UNSPLASH_IMAGES.porto,
    },
  ]

  const wineries = [
    { name: 'Quinta do Bomfim', note: 'Dow\'s Port, stunning views' },
    { name: 'Quinta Nova', note: 'Est. 1725, excellent restaurant' },
    { name: 'Quinta de la Rosa', note: 'Intimate, near Pinhão' },
    { name: 'Quinta do Vallado', note: 'Free tastings for guests' },
  ]

  return (
    <section id="douro" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={UNSPLASH_IMAGES.douroValley} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-navy)]/90" />
      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em]">May 19-22 • All Together</span>
          <h2 className="font-[Playfair_Display] text-5xl md:text-7xl mt-4 text-white">Douro Valley</h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            UNESCO World Heritage wine region. 2,000 years of winemaking. 4 friends. Countless bottles.
          </p>
        </AnimatedSection>

        <motion.div className="grid md:grid-cols-3 gap-6 mb-12" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {days.map((day, i) => (
            <motion.div key={i} variants={scaleIn} className="card-luxury overflow-hidden group">
              <div className="h-40 overflow-hidden">
                <img src={day.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-[var(--color-terracotta)]">{day.date}</p>
                <h3 className="font-semibold text-lg text-[var(--color-navy)] mt-1 mb-3">{day.title}</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {day.activities.slice(0, 4).map((a, j) => <li key={j}>• {a}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Wineries */}
        <AnimatedSection>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Top Quintas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wineries.map((w, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="font-semibold text-white">{w.name}</p>
                  <p className="text-xs text-white/60 mt-1">{w.note}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============ LISBON SECTION ============
function Lisbon() {
  const days = [
    { date: 'Thu Evening, May 22', title: 'Arrive in Lisbon', items: ['Check into hotel', 'Sunset at a miradouro', 'Light dinner in Baixa'] },
    { date: 'Fri, May 23', title: 'Explore + Welcome Party', items: ['Belém: Tower, Monastery, Pastéis', 'Time Out Market or LX Factory', 'Alfama wander', 'Evening: Wedding welcome party 🎉'] },
    { date: 'Sat, May 24', title: 'Wedding Day 💒', items: ['Relax morning', 'Get ready in style', 'Wedding at Palácio do Grilo', 'Dance the night away'] },
    { date: 'Sun, May 25', title: 'Fly Home', items: ['Early flight LIS → JFK → SFO', 'Arrive SFO 6:49pm', 'Dream of returning...'] },
  ]

  const neighborhoods = [
    { name: 'Alfama', icon: '🎸', vibe: 'Fado, narrow streets' },
    { name: 'Belém', icon: '🏛️', vibe: 'Monuments, pastries' },
    { name: 'Bairro Alto', icon: '🌙', vibe: 'Nightlife, bars' },
    { name: 'LX Factory', icon: '🎨', vibe: 'Creative hub' },
  ]

  return (
    <section id="lisbon" className="py-24 px-4 bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[var(--color-terracotta)] text-sm uppercase tracking-[0.3em]">May 22-25 • Grand Finale</span>
          <h2 className="font-[Playfair_Display] text-5xl md:text-7xl mt-4 text-[var(--color-navy)]">Lisboa</h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {days.map((d, i) => (
            <motion.div key={i} className="card-luxury p-5" whileHover={{ y: -4 }}>
              <p className="text-xs uppercase tracking-widest text-[var(--color-terracotta)]">{d.date}</p>
              <h3 className="font-semibold text-[var(--color-navy)] mt-1 mb-3">{d.title}</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {d.items.map((item, j) => <li key={j}>• {item}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {neighborhoods.map((n, i) => (
            <motion.div key={i} className="card-luxury p-4 text-center" whileHover={{ scale: 1.05 }}>
              <span className="text-3xl">{n.icon}</span>
              <h4 className="font-semibold text-[var(--color-navy)] mt-2">{n.name}</h4>
              <p className="text-xs text-gray-500">{n.vibe}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ WEDDING SECTION ============
function Wedding() {
  return (
    <section id="wedding" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={UNSPLASH_IMAGES.wedding} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-terracotta)]/90 to-[var(--color-navy)]/95" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em]">May 23-24, 2026</span>
          <h2 className="font-[Playfair_Display] text-5xl md:text-7xl mt-4 text-white">The Wedding</h2>
          <div className="flex items-center justify-center gap-4 mt-6 mb-12">
            <span className="w-24 h-px bg-[var(--color-gold)]" />
            <span className="text-4xl">💒</span>
            <span className="w-24 h-px bg-[var(--color-gold)]" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div className="bg-white/10 backdrop-blur-md rounded-3xl p-8" whileHover={{ scale: 1.02 }}>
            <span className="text-4xl mb-4 block">🥂</span>
            <h3 className="font-[Playfair_Display] text-2xl text-white">Welcome Party</h3>
            <p className="text-white/70 mt-2">Saturday, May 23 • Evening</p>
            <p className="text-[var(--color-gold)] mt-1">Cocktail / Casual</p>
          </motion.div>
          <motion.div className="bg-white rounded-3xl p-8 shadow-2xl" whileHover={{ scale: 1.02 }}>
            <span className="text-4xl mb-4 block">💒</span>
            <h3 className="font-[Playfair_Display] text-2xl text-[var(--color-navy)]">Wedding Ceremony</h3>
            <p className="text-gray-600 mt-2">Sunday, May 24 • Palácio do Grilo</p>
            <p className="text-[var(--color-terracotta)] mt-1 font-semibold">Black Tie Optional</p>
          </motion.div>
        </div>

        <AnimatedSection>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-lg mx-auto">
            <h3 className="font-semibold text-white mb-4">Palácio do Grilo</h3>
            <p className="text-white/70 text-sm">
              18th-century palace in Lisbon's Beato district. An immersive venue combining art, 
              theater, and historic grandeur.
            </p>
            <a 
              href="https://maps.google.com/?q=Palacio+do+Grilo+Lisbon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:underline mt-4 text-sm"
            >
              📍 Calçada do Duque de Lafões 1, Lisbon
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-16 h-px bg-[var(--color-gold)]" />
          <span className="text-[var(--color-gold)] text-2xl">◆</span>
          <span className="w-16 h-px bg-[var(--color-gold)]" />
        </div>
        <p className="font-[Playfair_Display] text-3xl mb-4">Spain & Portugal 2026</p>
        <p className="text-white/60">May 13-25 • Barron & Nina</p>
        <div className="flex justify-center gap-6 mt-8 text-3xl">
          <span>🇪🇸</span><span>🇵🇹</span><span>🍷</span><span>💒</span>
        </div>
        <p className="text-white/40 text-xs mt-8">Made with ❤️ for an unforgettable adventure</p>
      </div>
    </footer>
  )
}

// ============ APP ============
function App() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Overview />
      <ItineraryOptions />
      <DouroValley />
      <Lisbon />
      <Wedding />
      <Footer />
    </main>
  )
}

export default App
