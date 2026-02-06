import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

// ============ CONSTANTS ============
const TRIP_DATE = new Date('2026-05-19T10:00:00')

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
  pasteis: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=1600&q=80',
}

// ============ ANIMATION VARIANTS ============
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
}

// ============ COMPONENTS ============

// Animated Section Wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Countdown Timer
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
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.05 }}
    >
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

// Navigation
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
    { href: '#douro', label: 'Douro Valley' },
    { href: '#lisbon', label: 'Lisbon' },
    { href: '#wedding', label: 'Wedding' },
    { href: '#packing', label: 'Packing' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[var(--color-navy)]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-[Playfair_Display] text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-[var(--color-gold)]">◆</span>
          Portugal 2026
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {links.map(link => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-sm font-medium text-white/80 hover:text-[var(--color-gold)] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-gold)] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white"
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-navy)] border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4">
              {links.map(link => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="block py-3 text-white/80 hover:text-[var(--color-gold)] border-b border-white/10 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Hero Section with Parallax
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url('${UNSPLASH_IMAGES.hero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/60 via-[var(--color-navy)]/40 to-[var(--color-navy)]" />
      </motion.div>

      {/* Decorative Azulejo Pattern Overlay */}
      <div className="absolute inset-0 azulejo-border opacity-20" />
      
      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl tracking-[0.4em] uppercase mb-6 text-[var(--color-gold)]">
            May 19-25, 2026
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-[Playfair_Display] text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-shadow-luxury"
        >
          Portugal
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
          <span className="text-[var(--color-gold)] text-2xl">◆</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white/90 mb-12 leading-relaxed"
        >
          A journey through ancient vineyards of the Douro Valley, 
          the sun-kissed streets of Lisbon, and a celebration of love
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-white/60 mb-4">Your adventure begins in</p>
          <CountdownTimer />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a 
            href="#douro" 
            className="group relative overflow-hidden bg-[var(--color-gold)] text-[var(--color-navy)] px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-[var(--color-gold)]/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Explore the Journey</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.a>
          <motion.a 
            href="#wedding" 
            className="group border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Wedding Details
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div 
            className="w-1.5 h-3 bg-[var(--color-gold)] rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// Overview Section
function Overview() {
  const travelers = [
    { initials: 'B+N', names: 'Barron & Nina', dates: 'Full trip: May 19-25', color: 'var(--color-navy)' },
    { initials: 'Z+L', names: 'Zach & Lauren', dates: 'Douro Valley: May 19-22', color: 'var(--color-terracotta)' },
  ]

  const stats = [
    { num: '7', label: 'Days of Adventure' },
    { num: '2', label: 'Stunning Regions' },
    { num: '∞', label: 'Glasses of Wine' },
    { num: '1', label: 'Beautiful Wedding' },
  ]

  return (
    <section id="overview" className="py-24 px-4 bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[var(--color-terracotta)] text-sm uppercase tracking-[0.3em]">The Journey Awaits</span>
          <h2 className="font-[Playfair_Display] text-4xl md:text-6xl mt-4 text-[var(--color-navy)]">
            Your Portuguese Adventure
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="w-24 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
            <span className="text-[var(--color-gold)]">◆</span>
            <span className="w-24 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-azulejo)] via-[var(--color-gold)] to-[var(--color-terracotta)]" />
            
            <motion.div 
              className="space-y-8 md:space-y-0"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: '✈️', title: 'Arrive in Portugal', desc: 'Land in Porto at 10am, pick up car', date: 'May 19', side: 'left' },
                { icon: '🍷', title: 'Douro Valley', desc: '3 nights in wine country with friends', date: 'May 19-22', side: 'right' },
                { icon: '🚗', title: 'Road Trip to Lisbon', desc: '4-hour scenic drive south', date: 'May 22', side: 'left' },
                { icon: '🏛️', title: 'Explore Lisbon', desc: 'Historic neighborhoods, amazing food', date: 'May 22-24', side: 'right' },
                { icon: '💒', title: 'Wedding Celebration', desc: 'Welcome party + Wedding at Palácio do Grilo', date: 'May 23-24', side: 'left' },
                { icon: '🏠', title: 'Journey Home', desc: 'LIS → JFK → SFO, arrive 6:49pm', date: 'May 25', side: 'right' },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className={`md:flex items-center gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${item.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`card-luxury p-6 inline-block ${item.side === 'right' ? '' : 'md:ml-auto'}`}>
                      <span className="text-3xl mb-2 block">{item.icon}</span>
                      <p className="text-xs uppercase tracking-widest text-[var(--color-terracotta)] mb-1">{item.date}</p>
                      <h3 className="font-[Playfair_Display] text-xl font-semibold text-[var(--color-navy)]">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-[var(--color-navy)] items-center justify-center text-white font-bold text-sm z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Travelers */}
        <AnimatedSection className="mt-20">
          <h3 className="font-[Playfair_Display] text-2xl text-center mb-8 text-[var(--color-navy)]">The Travelers</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {travelers.map((t, i) => (
              <motion.div 
                key={i}
                className="card-luxury p-6 flex items-center gap-4 min-w-[280px]"
                whileHover={{ scale: 1.02 }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-navy)]">{t.names}</p>
                  <p className="text-sm text-gray-500">{t.dates}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <p className="font-[Playfair_Display] text-5xl md:text-6xl font-bold text-[var(--color-terracotta)]">
                  {stat.num}
                </p>
                <p className="text-gray-600 text-sm mt-2 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Expandable Day Card
interface DayData {
  date: string;
  title: string;
  description: string;
  activities: string[];
  accommodation?: { name: string; url: string; note?: string };
  dining?: Array<{ name: string; type: string; url?: string }>;
  image: string;
}

function ExpandableDayCard({ day }: { day: DayData }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className="card-luxury overflow-hidden cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: -4 }}
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={day.image}
          alt={day.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs uppercase tracking-widest text-[var(--color-gold)]">{day.date}</p>
          <h3 className="font-[Playfair_Display] text-2xl font-semibold mt-1">{day.title}</h3>
        </div>
        <motion.div 
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600">{day.description}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 space-y-6 border-t border-gray-100 mt-6">
                {/* Activities */}
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-widest text-[var(--color-azulejo)] mb-3">Activities</h4>
                  <ul className="space-y-2">
                    {day.activities.map((activity, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-[var(--color-gold)] mt-1">◆</span>
                        {activity}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Accommodation */}
                {day.accommodation && (
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-widest text-[var(--color-azulejo)] mb-2">Stay</h4>
                    <a 
                      href={day.accommodation.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--color-terracotta)] hover:underline font-medium inline-flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {day.accommodation.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {day.accommodation.note && (
                      <p className="text-sm text-gray-500 mt-1">{day.accommodation.note}</p>
                    )}
                  </div>
                )}

                {/* Dining */}
                {day.dining && day.dining.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-widest text-[var(--color-azulejo)] mb-2">Dining</h4>
                    <div className="space-y-2">
                      {day.dining.map((r, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {r.url ? (
                            <a 
                              href={r.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[var(--color-terracotta)] hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {r.name}
                            </a>
                          ) : (
                            <span>{r.name}</span>
                          )}
                          <span className="text-gray-400 text-sm">— {r.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-[var(--color-azulejo)] mt-4 uppercase tracking-wide">
          {isExpanded ? 'Click to collapse' : 'Click to expand'}
        </p>
      </div>
    </motion.div>
  )
}

// Douro Valley Section
function DouroValley() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const days: DayData[] = [
    {
      date: 'Monday, May 19',
      title: 'Arrival & Douro Valley',
      description: 'Land in Porto at 10am, pick up rental car and drive ~1.5 hours through stunning countryside to the Douro Valley.',
      activities: [
        'Pick up rental car at Porto Airport (OPO)',
        'Scenic drive along the Douro River',
        'Check in and settle at the hotel',
        'Evening wine tasting to kick off the trip',
      ],
      accommodation: { name: 'Six Senses Douro Valley', url: 'https://www.sixsenses.com/en/resorts/douro-valley/', note: 'IHG points eligible • Spa & vineyard views' },
      image: UNSPLASH_IMAGES.douroValley,
    },
    {
      date: 'Tuesday, May 20',
      title: 'Wine Exploration',
      description: 'A full day of winery visits and tastings. The Douro Valley is UNESCO World Heritage with 2,000+ years of winemaking.',
      activities: [
        'Morning: Quinta do Bomfim (Dow\'s Port)',
        'Afternoon: Quinta Nova for lunch with views',
        'Evening: Quinta de la Rosa tasting',
        'Sunset over the terraced vineyards',
      ],
      accommodation: { name: 'Six Senses Douro Valley', url: 'https://www.sixsenses.com/en/resorts/douro-valley/' },
      dining: [
        { name: 'Quinta Nova', type: 'Lunch with valley views', url: 'https://www.quintanova.com/' },
        { name: 'DOC Restaurant', type: 'Michelin-recommended', url: 'https://ruipaula.com/doc/' },
      ],
      image: UNSPLASH_IMAGES.wine,
    },
    {
      date: 'Wednesday, May 21',
      title: 'Douro Discovery',
      description: 'More quintas, stunning viewpoints, and perhaps a cruise on the legendary Douro River.',
      activities: [
        'Morning: Quinta do Vallado experience',
        'Optional Douro River boat cruise',
        'Visit Pinhão\'s famous tile train station',
        'Olive oil tasting at Lagar da Sancha',
        'Farewell dinner with Zach & Lauren',
      ],
      accommodation: { name: 'Six Senses Douro Valley', url: 'https://www.sixsenses.com/en/resorts/douro-valley/' },
      dining: [
        { name: 'Quinta do Vallado', type: 'Lunch', url: 'https://www.quintadovallado.com/' },
        { name: 'Castas e Pratos', type: 'Dinner in Peso da Régua', url: 'https://www.castasepratos.com/' },
      ],
      image: UNSPLASH_IMAGES.douroVineyard,
    },
    {
      date: 'Thursday, May 22',
      title: 'Douro → Lisbon',
      description: 'Bid farewell to Zach & Lauren. Drive ~4 hours south through beautiful Portuguese countryside to Lisbon.',
      activities: [
        'Leisurely breakfast at the hotel',
        'Scenic drive to Lisbon (~4 hours)',
        'Optional: Stop in Coimbra or Aveiro',
        'Evening stroll through Lisbon',
        'Check into Lisbon hotel',
      ],
      accommodation: { name: 'Lisbon Hotel', url: '#', note: 'Baixa, Alfama, or Príncipe Real' },
      image: UNSPLASH_IMAGES.porto,
    },
  ]

  const wineries = [
    { name: 'Quinta do Bomfim', owner: 'Symington (Dow\'s)', highlight: 'Stunning estate, premium tastings', url: 'https://www.symington.com/visit-our-quintas/quinta-do-bomfim' },
    { name: 'Quinta Nova', owner: 'Est. 1725', highlight: 'Oldest quinta, excellent restaurant', url: 'https://www.quintanova.com/' },
    { name: 'Quinta de la Rosa', owner: 'Family-owned', highlight: 'Intimate tastings near Pinhão', url: 'https://www.quintadelarosa.com/' },
    { name: 'Quinta do Vallado', owner: 'Historic Estate', highlight: 'Free tastings for hotel guests', url: 'https://www.quintadovallado.com/' },
    { name: 'Quinta do Seixo', owner: 'Sandeman', highlight: 'Modern visitor center', url: 'https://www.sograpevinhos.com/quintas/Quinta-do-Seixo' },
    { name: 'Quinta das Carvalhas', owner: 'Real Companhia Velha', highlight: 'Panoramic hilltop views', url: 'https://www.realcompanhiavelha.pt/' },
  ]

  return (
    <section id="douro" className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -z-10"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${UNSPLASH_IMAGES.douroValley}')` }}
        />
        <div className="absolute inset-0 bg-[var(--color-navy)]/90" />
        <div className="absolute inset-0 azulejo-pattern opacity-10" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em]">May 19-22 • Wine Country</span>
          <h2 className="font-[Playfair_Display] text-5xl md:text-7xl mt-4 text-white">
            Douro Valley
          </h2>
          <p className="text-white/70 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            The world's oldest demarcated wine region. UNESCO World Heritage terraced vineyards 
            cascading down to the meandering Douro River.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="w-32 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
            <span className="text-[var(--color-gold)] text-2xl">🍷</span>
            <span className="w-32 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
          </div>
        </AnimatedSection>

        {/* Day Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {days.map((day, i) => (
            <motion.div key={i} variants={scaleIn}>
              <ExpandableDayCard day={day} />
            </motion.div>
          ))}
        </motion.div>

        {/* Wineries Section */}
        <AnimatedSection>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
            <h3 className="font-[Playfair_Display] text-3xl text-center mb-8 text-white">
              Premier Quintas to Visit
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wineries.map((w, i) => (
                <motion.a
                  key={i}
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl p-5 transition-all hover:shadow-xl"
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-terracotta)] transition-colors">
                    {w.name}
                  </h4>
                  <p className="text-xs text-[var(--color-azulejo)] uppercase tracking-wide mt-1">{w.owner}</p>
                  <p className="text-sm text-gray-600 mt-2">{w.highlight}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Hotel Comparison */}
        <AnimatedSection className="mt-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Six Senses */}
            <motion.div 
              className="relative overflow-hidden rounded-3xl"
              whileHover={{ scale: 1.02 }}
            >
              <img src={UNSPLASH_IMAGES.douroVineyard} alt="Six Senses" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="relative p-8 pt-48 text-white">
                <span className="text-xs uppercase tracking-widest text-[var(--color-gold)]">Luxury Resort</span>
                <h3 className="font-[Playfair_Display] text-3xl mt-2">Six Senses Douro Valley</h3>
                <p className="text-white/80 mt-3 text-sm leading-relaxed">
                  Restored 19th-century manor with world-class spa, organic gardens, and breathtaking vineyard views.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li className="flex items-center gap-2"><span className="text-[var(--color-gold)]">✓</span> IHG One Rewards eligible</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--color-gold)]">✓</span> Award-winning spa</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--color-gold)]">✓</span> Infinity pool with views</li>
                </ul>
                <a 
                  href="https://www.sixsenses.com/en/resorts/douro-valley/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-[var(--color-gold)] text-[var(--color-navy)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-white transition-colors"
                >
                  View Property →
                </a>
              </div>
            </motion.div>

            {/* Quinta do Vallado */}
            <motion.div 
              className="relative overflow-hidden rounded-3xl"
              whileHover={{ scale: 1.02 }}
            >
              <img src={UNSPLASH_IMAGES.wine} alt="Quinta do Vallado" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-terracotta)]/90 via-[var(--color-terracotta)]/50 to-transparent" />
              <div className="relative p-8 pt-48 text-white">
                <span className="text-xs uppercase tracking-widest text-[var(--color-gold)]">Wine Estate Hotel</span>
                <h3 className="font-[Playfair_Display] text-3xl mt-2">Quinta do Vallado</h3>
                <p className="text-white/80 mt-3 text-sm leading-relaxed">
                  Family-owned estate with boutique hotel immersed in the vineyards. Modern design meets centuries of winemaking.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li className="flex items-center gap-2"><span className="text-[var(--color-gold)]">✓</span> Free wine tasting for guests</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--color-gold)]">✓</span> Outstanding restaurant</li>
                  <li className="flex items-center gap-2"><span className="text-[var(--color-gold)]">✓</span> Intimate, romantic setting</li>
                </ul>
                <a 
                  href="https://www.quintadovallado.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-white text-[var(--color-terracotta)] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors"
                >
                  View Property →
                </a>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Lisbon Section
function Lisbon() {
  const lisbonDays: DayData[] = [
    {
      date: 'Thursday Evening, May 22',
      title: 'Arriving in Lisbon',
      description: 'Check into the hotel and soak in the magic of Lisbon. A relaxed evening before wedding festivities.',
      activities: [
        'Arrive and check into hotel',
        'Sunset stroll to a miradouro',
        'Light dinner in Alfama or Baixa',
        'Sample the famous pastéis de nata',
      ],
      dining: [{ name: 'Taberna da Rua das Flores', type: 'Portuguese tapas', url: 'https://www.tabernaruadasflores.com/' }],
      image: UNSPLASH_IMAGES.lisbonTram,
    },
    {
      date: 'Friday, May 23',
      title: 'Lisbon Exploration + Welcome Party',
      description: 'Discover Lisbon\'s best neighborhoods by day, then celebrate at the wedding welcome party!',
      activities: [
        'Morning: Belém — Tower, Monastery, pastéis',
        'Lunch: Time Out Market or LX Factory',
        'Afternoon: Alfama neighborhood wander',
        'Evening: Wedding welcome party 🎉',
      ],
      dining: [
        { name: 'Pastéis de Belém', type: 'The famous custard tarts', url: 'https://pasteisdebelem.pt/' },
        { name: 'Time Out Market', type: 'Food hall', url: 'https://www.timeoutmarket.com/lisbon/' },
      ],
      image: UNSPLASH_IMAGES.lisbon,
    },
    {
      date: 'Saturday, May 24',
      title: 'The Wedding Day 💒',
      description: 'The main event! A celebration of love at the stunning Palácio do Grilo.',
      activities: [
        'Morning: Relax and recharge',
        'Afternoon: Get ready in style',
        'Evening: Wedding ceremony & reception',
        'Dress code: Black tie optional',
      ],
      image: UNSPLASH_IMAGES.wedding,
    },
    {
      date: 'Sunday, May 25',
      title: 'Homeward Bound',
      description: 'Early flight home, hearts full of memories. LIS → JFK → SFO.',
      activities: [
        'Early wake-up call (sorry!)',
        'LIS 10am departure',
        'Arrive SFO 6:49pm',
        'Dream of returning to Portugal...',
      ],
      image: UNSPLASH_IMAGES.azulejos,
    },
  ]

  const neighborhoods = [
    { name: 'Alfama', vibe: 'Historic maze, Fado music, soul of Lisbon', icon: '🎸' },
    { name: 'Belém', vibe: 'Monuments, maritime history, famous pastries', icon: '🏛️' },
    { name: 'Bairro Alto', vibe: 'Bohemian nightlife, rooftop bars', icon: '🌙' },
    { name: 'LX Factory', vibe: 'Industrial creative hub, Sunday markets', icon: '🎨' },
    { name: 'Baixa/Chiado', vibe: 'Grand plazas, shopping, historic cafés', icon: '☕' },
    { name: 'Príncipe Real', vibe: 'Upscale gardens, boutiques, brunch', icon: '🌳' },
  ]

  const restaurants = [
    { name: 'Belcanto', area: 'Chiado', type: 'Michelin 2-star experience', stars: '⭐⭐' },
    { name: 'Cervejaria Ramiro', area: 'Intendente', type: 'Legendary seafood', stars: '🦐' },
    { name: 'Tasca do Chico', area: 'Bairro Alto', type: 'Fado & petiscos', stars: '🎵' },
    { name: 'Time Out Market', area: 'Cais do Sodré', type: 'Best of Lisbon under one roof', stars: '🍽️' },
  ]

  return (
    <section id="lisbon" className="py-24 px-4 bg-[var(--color-cream)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[var(--color-terracotta)] text-sm uppercase tracking-[0.3em]">May 22-25 • The Capital</span>
          <h2 className="font-[Playfair_Display] text-5xl md:text-7xl mt-4 text-[var(--color-navy)]">
            Lisboa
          </h2>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            The city of seven hills, azulejo-adorned facades, and golden hour light. 
            Where old-world charm meets contemporary cool.
          </p>
        </AnimatedSection>

        {/* Featured Image */}
        <AnimatedSection className="mb-16">
          <div className="relative h-[50vh] rounded-3xl overflow-hidden">
            <img 
              src={UNSPLASH_IMAGES.lisbon}
              alt="Lisbon"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/80 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white max-w-md">
              <p className="text-[var(--color-gold)] uppercase tracking-widest text-sm">The City Awaits</p>
              <h3 className="font-[Playfair_Display] text-4xl mt-2">Where every corner tells a story</h3>
            </div>
          </div>
        </AnimatedSection>

        {/* Day Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {lisbonDays.map((day, i) => (
            <motion.div key={i} variants={scaleIn}>
              <ExpandableDayCard day={day} />
            </motion.div>
          ))}
        </motion.div>

        {/* Neighborhoods Grid */}
        <AnimatedSection className="mb-16">
          <h3 className="font-[Playfair_Display] text-3xl text-center mb-8 text-[var(--color-navy)]">
            Neighborhoods to Explore
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {neighborhoods.map((n, i) => (
              <motion.div
                key={i}
                className="card-luxury p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl mb-3 block">{n.icon}</span>
                <h4 className="font-semibold text-[var(--color-navy)]">{n.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{n.vibe}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Restaurant Recommendations */}
        <AnimatedSection>
          <div className="bg-[var(--color-navy)] rounded-3xl p-8 md:p-12">
            <h3 className="font-[Playfair_Display] text-3xl text-center mb-8 text-white">
              Where to Eat
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {restaurants.map((r, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 rounded-xl p-5 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-white">{r.name}</h4>
                      <p className="text-white/60 text-sm">{r.area}</p>
                      <p className="text-[var(--color-gold)] text-sm mt-1">{r.type}</p>
                    </div>
                    <span className="text-2xl">{r.stars}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Wedding Section
function Wedding() {
  return (
    <section id="wedding" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img src={UNSPLASH_IMAGES.wedding} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-terracotta)]/90 to-[var(--color-navy)]/95" />
      </div>
      <div className="absolute inset-0 azulejo-pattern opacity-5" />

      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-[var(--color-gold)] text-sm uppercase tracking-[0.3em]">May 23-24, 2026</span>
          <h2 className="font-[Playfair_Display] text-5xl md:text-7xl mt-4 text-white">
            The Wedding
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="w-24 h-px bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
            <span className="text-[var(--color-gold)] text-3xl">💒</span>
            <span className="w-24 h-px bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
          </div>
        </AnimatedSection>

        {/* Event Cards */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Welcome Party */}
          <motion.div 
            variants={scaleIn}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <span className="text-5xl mb-4 block">🥂</span>
            <h3 className="font-[Playfair_Display] text-3xl text-white">Welcome Party</h3>
            <div className="mt-6 space-y-3 text-white/90">
              <p><span className="text-[var(--color-gold)] font-semibold">Date:</span> Saturday, May 23</p>
              <p><span className="text-[var(--color-gold)] font-semibold">Time:</span> Evening</p>
              <p><span className="text-[var(--color-gold)] font-semibold">Dress:</span> Cocktail / Smart Casual</p>
              <p><span className="text-[var(--color-gold)] font-semibold">Vibe:</span> Relaxed gathering with drinks & friends</p>
            </div>
          </motion.div>

          {/* Wedding */}
          <motion.div 
            variants={scaleIn}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <span className="text-5xl mb-4 block">💒</span>
            <h3 className="font-[Playfair_Display] text-3xl text-[var(--color-navy)]">The Ceremony</h3>
            <div className="mt-6 space-y-3 text-gray-700">
              <p><span className="text-[var(--color-terracotta)] font-semibold">Date:</span> Sunday, May 24</p>
              <p><span className="text-[var(--color-terracotta)] font-semibold">Venue:</span> Palácio do Grilo</p>
              <p><span className="text-[var(--color-terracotta)] font-semibold">Location:</span> Beato, Lisbon</p>
              <p><span className="text-[var(--color-terracotta)] font-semibold">Dress:</span> Black Tie Optional</p>
            </div>
            <motion.a 
              href="https://palaciogrilo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-[var(--color-terracotta)] text-white px-6 py-3 rounded-full text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              View Venue →
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Venue Info */}
        <AnimatedSection>
          <div className="text-center text-white mb-12">
            <h3 className="font-[Playfair_Display] text-3xl mb-4">About Palácio do Grilo</h3>
            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
              An 18th-century palace in Lisbon's Beato district, overlooking the Tagus River. 
              This stunning venue combines immersive art, theatrical performance, and historic grandeur 
              for an unforgettable celebration.
            </p>
            <motion.a 
              href="https://maps.google.com/?q=Palacio+do+Grilo+Lisbon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:underline mt-4"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Calçada do Duque de Lafões 1, Lisbon
            </motion.a>
          </div>
        </AnimatedSection>

        {/* Dress Code */}
        <AnimatedSection>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="font-semibold text-xl text-center mb-6 text-white">Black Tie Optional Guide</h3>
            <div className="grid md:grid-cols-2 gap-8 text-white/90">
              <div>
                <h4 className="font-medium text-[var(--color-gold)] mb-3 flex items-center gap-2">
                  <span>👔</span> For Him
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• Dark suit (navy, charcoal, black)</li>
                  <li>• Tuxedo if you want to dress up</li>
                  <li>• Tie or bow tie</li>
                  <li>• Polished dress shoes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[var(--color-gold)] mb-3 flex items-center gap-2">
                  <span>👗</span> For Her
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• Floor-length gown or elegant cocktail dress</li>
                  <li>• Dressy separates also work</li>
                  <li>• Heels or chic flats</li>
                  <li>• Statement jewelry welcome</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Packing Section
function Packing() {
  const categories = [
    { title: 'Attire', icon: '👔', items: ['Black tie outfit for wedding', 'Cocktail attire for welcome party', 'Casual day clothes (60-75°F)', 'Light layers for evenings', 'Comfortable walking shoes', 'Swimsuit (hotel pools!)'] },
    { title: 'Tech', icon: '📱', items: ['Passport (valid 6+ months)', 'Phone + charger', 'EU power adapter (Type C/F)', 'Camera for wine country', 'Portable battery'] },
    { title: 'Essentials', icon: '🧴', items: ['Sunscreen', 'Medications', 'Motion sickness meds', 'Hand sanitizer', 'Basic first aid'] },
    { title: 'Pro Tips', icon: '💡', items: ['Download offline Google Maps', 'International driving permit', 'Notify bank of travel', 'Pack wine opener!', 'Empty bag for wine bottles'] },
  ]

  return (
    <section id="packing" className="py-24 px-4 bg-[var(--color-cream-dark)]">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-[var(--color-terracotta)] text-sm uppercase tracking-[0.3em]">Be Prepared</span>
          <h2 className="font-[Playfair_Display] text-4xl md:text-6xl mt-4 text-[var(--color-navy)]">
            Packing List
          </h2>
          <p className="text-gray-600 mt-4">
            Portugal in late May: warm days (65-78°F), cool evenings
          </p>
        </AnimatedSection>

        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className="card-luxury p-6"
            >
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-[var(--color-navy)]">
                <span className="text-2xl">{cat.icon}</span>
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-700">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-[var(--color-azulejo)] text-[var(--color-azulejo)] focus:ring-[var(--color-azulejo)]" 
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Weather Card */}
        <AnimatedSection className="mt-12">
          <div className="bg-gradient-to-r from-[var(--color-azulejo)] to-[var(--color-azulejo-dark)] rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <span className="text-4xl">🌤️</span>
              <div>
                <h4 className="font-semibold text-lg">May Weather</h4>
                <p className="text-white/80 text-sm mt-1">
                  Expect pleasant spring weather! Douro Valley can be slightly warmer. 
                  Lisbon: highs 70-75°F (21-24°C), lows 55-60°F (13-16°C). 
                  Bring a light jacket for evenings.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-16 h-px bg-[var(--color-gold)]" />
            <span className="text-[var(--color-gold)] text-2xl">◆</span>
            <span className="w-16 h-px bg-[var(--color-gold)]" />
          </div>
          <p className="font-[Playfair_Display] text-3xl mb-4">
            Portugal 2026
          </p>
          <p className="text-white/60 text-sm">
            May 19-25 • Barron & Nina
          </p>
          <div className="flex justify-center gap-6 mt-8 text-3xl">
            <span>🇵🇹</span>
            <span>🍷</span>
            <span>💒</span>
          </div>
          <p className="text-white/40 text-xs mt-8">
            Made with ❤️ for an unforgettable adventure
          </p>
        </motion.div>
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
