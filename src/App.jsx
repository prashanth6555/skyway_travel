import { useState } from 'react'
import {
  Plane, Menu, X, ArrowRight, ArrowUpRight, MapPin, CalendarDays,
  Users, Search, ShieldCheck, Headphones, Wallet, Globe2,
  Clock3, CheckCircle2, Send, Camera, MessageCircle
} from 'lucide-react';

const destinations = [
  { name: 'Bali, Indonesia', tag: 'ISLAND ESCAPE', price: '₹24,999', image: 'photo-1537996194471-e657df975ab4', days: '5 days' },
  { name: 'Swiss Alps, Switzerland', tag: 'MOUNTAIN MAGIC', price: '₹48,500', image: 'photo-1531366936337-7c912a4589a7', days: '7 days' },
  { name: 'Dubai, UAE', tag: 'CITY OF WONDERS', price: '₹18,499', image: 'photo-1512453979798-5ea266f8880c', days: '4 days' },
]
const offers = [
  { label: 'WEEKEND GETAWAY', title: 'A little escape goes a long way.', price: 'from ₹9,999', image: 'photo-1518548419970-58e3b4079ab2', tone: 'blue' },
  { label: 'EARLY BIRD SPECIAL', title: 'Your next big adventure, for less.', price: 'Save up to 25%', image: 'photo-1500530855697-b586d89ba3ee', tone: 'sand' },
]
const services = [
  { icon: Plane, title: 'Flight bookings', text: 'Compare routes and find a flight that fits your plans.' },
  { icon: ShieldCheck, title: 'Travel protected', text: 'Travel confidently with support when plans change.' },
  { icon: Wallet, title: 'Best-value packages', text: 'Thoughtfully bundled trips without the guesswork.' },
  { icon: Headphones, title: 'Here for you', text: 'Friendly travel specialists, from takeoff to touchdown.' },
]
const sampleFlights = [
  { id: 'sky-214', airline: 'Skyway Air', code: 'SW 214', departure: '06:20', arrival: '12:10', duration: '5h 50m', fare: 12499 },
  { id: 'north-608', airline: 'Northstar Airways', code: 'NS 608', departure: '10:45', arrival: '17:05', duration: '6h 20m', fare: 14750 },
  { id: 'cloud-332', airline: 'Cloudline', code: 'CL 332', departure: '18:15', arrival: '00:05', duration: '5h 50m', fare: 16999 },
]
const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const travelerCount = (travelers) => travelers === 'Family (2+2)' ? 4 : Number.parseInt(travelers, 10)
const formatPrice = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(amount)
const formatDate = (date) => new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
}).format(new Date(`${date}T00:00:00`))

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tripType, setTripType] = useState('Round trip')
  const [from, setFrom] = useState('Hyderabad (HYD)')
  const [to, setTo] = useState('Bali (DPS)')
  const [depart, setDepart] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [travelers, setTravelers] = useState('1 Adult')
  const [notice, setNotice] = useState('')
  const [flightSearch, setFlightSearch] = useState(null)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [passenger, setPassenger] = useState({ name: '', email: '' })
  const [bookingConfirmation, setBookingConfirmation] = useState(null)
  const [contact, setContact] = useState({ name: '', email: '', message: '' })

  const submitSearch = (e) => {
    e.preventDefault()
    setNotice('')
    setBookingConfirmation(null)
    setSelectedFlight(null)
    setPassenger({ name: '', email: '' })
    setFlightSearch({ tripType, from, to, depart, returnDate, travelers })
  }
  const confirmBooking = (e) => {
    e.preventDefault()
    setBookingConfirmation({
      reference: `SKY-${Date.now().toString(36).toUpperCase()}`,
      search: flightSearch,
      flight: selectedFlight,
      passenger,
    })
  }
  const submitContact = (e) => {
    e.preventDefault()
    setNotice(`Thanks${contact.name ? `, ${contact.name}` : ''}! Your enquiry has been captured in this demo. Connect a backend to receive submissions.`)
    setContact({ name: '', email: '', message: '' })
  }

  return (
    <div className="site-shell">
      <div className="topline"><span><Plane size={14} /> Your next adventure is closer than you think</span><span className="topline-right">Need help? <a href="#contact">Talk to our travel team <ArrowUpRight size={13} /></a></span></div>
      <header className="navbar">
        <a href="#home" className="brand" aria-label="Skyway Travel home"><span className="brand-icon"><Plane size={22} fill="currentColor" /></span><span>skyway<span className="brand-light">travel</span><small>GO BEYOND ORDINARY</small></span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a>
          <a href="#offers" onClick={() => setMenuOpen(false)}>Flight deals</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Our services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
        </nav>
        <a className="nav-cta" href="#booking">Plan my trip <ArrowRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={photo('photo-1436491865332-7a61a109cc05', 2000)} alt="Airplane wing above soft clouds at sunset" />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="eyebrow light"><span></span> THE WORLD IS YOURS TO EXPLORE</div>
            <h1>Take the scenic<br />route to <em>somewhere</em><br />extraordinary.</h1>
            <p>New places. Fresh perspectives. Unforgettable stories. Let's get you there.</p>
            <div className="hero-actions"><a className="button button-lime" href="#booking">Find your flight <ArrowRight size={17} /></a><a className="text-link light-link" href="#destinations">Explore destinations <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="hero-note"><span className="note-icon"><Globe2 size={18} /></span><span><b>120+ destinations</b><small>One world of possibilities</small></span></div>
          <div className="hero-pagination"><span className="active"></span><span></span><span></span><small>01 / 03</small></div>
        </section>

        <section className="booking-wrap" id="booking">
          <form className="booking-card" onSubmit={submitSearch}>
            <div className="booking-head"><div><span className="eyebrow">LET'S GET YOU THERE</span><h2>Find your flight</h2></div><div className="trip-tabs">{['Round trip', 'One way'].map(t => <button type="button" className={tripType === t ? 'selected' : ''} onClick={() => setTripType(t)} key={t}>{t}</button>)}</div></div>
            <div className="flight-fields">
              <label className="field"><span>FROM</span><div><MapPin size={18} /><input value={from} onChange={e => setFrom(e.target.value)} aria-label="Departure airport" required /></div></label>
              <button className="swap" type="button" onClick={() => { setFrom(to); setTo(from) }} aria-label="Swap airports">⇄</button>
              <label className="field"><span>TO</span><div><MapPin size={18} /><input value={to} onChange={e => setTo(e.target.value)} aria-label="Destination airport" required /></div></label>
              <label className="field"><span>DEPARTURE</span><div><CalendarDays size={18} /><input type="date" min={new Date().toISOString().slice(0, 10)} value={depart} onChange={e => setDepart(e.target.value)} required /></div></label>
              {tripType === 'Round trip' && <label className="field"><span>RETURN</span><div><CalendarDays size={18} /><input type="date" value={returnDate} min={depart || undefined} onChange={e => setReturnDate(e.target.value)} required /></div></label>}
              <label className="field"><span>TRAVELERS</span><div><Users size={18} /><select value={travelers} onChange={e => setTravelers(e.target.value)}><option>1 Adult</option><option>2 Adults</option><option>3 Adults</option><option>4 Adults</option><option>Family (2+2)</option></select></div></label>
              <button className="button search-button" type="submit"><Search size={18} /> Search flights</button>
            </div>
            {notice && <p className="notice" role="status">{notice}</p>}
            <div className="booking-foot"><span><CheckCircle2 size={14} /> No hidden booking fees</span><span><ShieldCheck size={14} /> Secure booking experience</span><span><Clock3 size={14} /> Quick and easy planning</span></div>
          </form>
          {flightSearch && (
            <div className="flight-results" aria-live="polite">
              <div className="results-heading">
                <div>
                  <span className="eyebrow">DEMO FLIGHT OPTIONS</span>
                  <h2>{flightSearch.from} <ArrowRight size={19} /> {flightSearch.to}</h2>
                  <p>{formatDate(flightSearch.depart)}{flightSearch.tripType === 'Round trip' ? ` – ${formatDate(flightSearch.returnDate)}` : ''} · {flightSearch.tripType} · {flightSearch.travelers}</p>
                </div>
                <span className="demo-label">Sample fares</span>
              </div>
              <div className="flight-option-list">
                {sampleFlights.map(flight => {
                  const total = flight.fare * travelerCount(flightSearch.travelers)
                  return (
                    <article className={`flight-option${selectedFlight?.id === flight.id ? ' flight-option-selected' : ''}`} key={flight.id}>
                      <div className="flight-airline"><span className="flight-icon"><Plane size={19} /></span><div><b>{flight.airline}</b><small>{flight.code}</small></div></div>
                      <div className="flight-time"><b>{flight.departure}</b><small>{flightSearch.from}</small></div>
                      <div className="flight-duration"><span>{flight.duration}</span><span className="flight-line"></span><small>Non-stop · Sample schedule</small></div>
                      <div className="flight-time"><b>{flight.arrival}</b><small>{flightSearch.to}</small></div>
                      <div className="flight-price"><b>{formatPrice(total)}</b><small>{formatPrice(flight.fare)} / traveler</small></div>
                      <button className="button flight-select" type="button" onClick={() => { setSelectedFlight(flight); setBookingConfirmation(null) }}>
                        {selectedFlight?.id === flight.id ? 'Selected' : 'Select flight'}
                      </button>
                    </article>
                  )
                })}
              </div>
              {selectedFlight && !bookingConfirmation && (
                <form className="passenger-form" onSubmit={confirmBooking}>
                  <div>
                    <span className="eyebrow">PASSENGER DETAILS</span>
                    <h3>Who is traveling?</h3>
                    <p>Enter the lead passenger's details for this demo booking.</p>
                  </div>
                  <label>Lead passenger name<input autoComplete="name" value={passenger.name} onChange={e => setPassenger({ ...passenger, name: e.target.value })} placeholder="Full name" required /></label>
                  <label>Email address<input type="email" autoComplete="email" value={passenger.email} onChange={e => setPassenger({ ...passenger, email: e.target.value })} placeholder="you@example.com" required /></label>
                  <button className="button button-dark" type="submit">Confirm demo booking <ArrowRight size={17} /></button>
                </form>
              )}
              {bookingConfirmation && (
                <div className="booking-confirmation" role="status">
                  <div className="confirmation-heading"><CheckCircle2 size={25} /><div><span className="eyebrow">DEMO BOOKING CONFIRMED</span><h3>Your itinerary is ready, {bookingConfirmation.passenger.name}.</h3></div></div>
                  <div className="confirmation-details">
                    <div><span>REFERENCE</span><b>{bookingConfirmation.reference}</b></div>
                    <div><span>FLIGHT</span><b>{bookingConfirmation.flight.airline} · {bookingConfirmation.flight.code}</b></div>
                    <div><span>ROUTE</span><b>{bookingConfirmation.search.from} → {bookingConfirmation.search.to}</b></div>
                    <div><span>TRAVEL DATE</span><b>{formatDate(bookingConfirmation.search.depart)}{bookingConfirmation.search.tripType === 'Round trip' ? ` – ${formatDate(bookingConfirmation.search.returnDate)}` : ''}</b></div>
                    <div><span>TRAVELERS</span><b>{bookingConfirmation.search.travelers}</b></div>
                    <div><span>DEMO TOTAL</span><b>{formatPrice(bookingConfirmation.flight.fare * travelerCount(bookingConfirmation.search.travelers))}</b></div>
                  </div>
                  <p className="demo-disclaimer">This is a demo only. No flight has been reserved, no payment was taken, and this is not a valid ticket.</p>
                  <button className="button button-outline" type="button" onClick={() => { setFlightSearch(null); setSelectedFlight(null); setBookingConfirmation(null) }}>Search another flight</button>
                </div>
              )}
              <p className="results-disclaimer">These flight schedules and fares are sample data for demonstration only. Live availability and ticketing require a flight-booking provider.</p>
            </div>
          )}
        </section>

        <section className="section destinations-section" id="destinations">
          <div className="section-heading"><div><div className="eyebrow"><span></span> A WORLD OF POSSIBILITIES</div><h2>Places that stay<br /><em>with you.</em></h2></div><div className="heading-aside"><p>From slow mornings by the sea to cities that never sleep, your next favourite place is waiting.</p><a className="text-link" href="#booking">See all destinations <ArrowRight size={16} /></a></div></div>
          <div className="destination-grid">{destinations.map((d, i) => <article className={`destination-card destination-${i}`} key={d.name}><img src={photo(d.image, 900)} alt={d.name} /><div className="destination-shade"></div><span className="destination-tag">{d.tag}</span><div className="destination-info"><div><h3>{d.name}</h3><span><Clock3 size={14} /> {d.days} · Flights + stay</span></div><div className="destination-bottom"><p>Packages from <b>{d.price}</b></p><a href="#booking" aria-label={`Explore ${d.name}`}><ArrowUpRight size={20} /></a></div></div></article>)}</div>
          <div className="center-link"><a href="#booking" className="button button-outline">Find your kind of getaway <ArrowRight size={17} /></a></div>
        </section>

        <section className="offers-section" id="offers"><div className="section offers-inner"><div className="section-heading"><div><div className="eyebrow"><span></span> GOOD TRIPS, BETTER PRICES</div><h2>Little deals.<br /><em>Big memories.</em></h2></div><p className="offer-intro">A little inspiration for your next escape. Discover seasonal offers made for going further.</p></div><div className="offer-grid">{offers.map(o => <article className={`offer-card ${o.tone}`} key={o.label}><img src={photo(o.image, 1000)} alt="Travel destination offer" /><div className="offer-shade"></div><div className="offer-copy"><span>{o.label}</span><h3>{o.title}</h3><p>{o.price}</p><a href="#booking" aria-label={`Explore ${o.label}`}><ArrowUpRight size={20} /></a></div></article>)}</div></div></section>

        <section className="section services-section" id="services"><div className="section-heading"><div><div className="eyebrow"><span></span> MORE THAN A TICKET</div><h2>Every detail,<br /><em>taken care of.</em></h2></div><p className="offer-intro">Good travel should feel effortless. We're here to make the whole journey feel as good as the destination.</p></div><div className="services-grid">{services.map(({ icon: Icon, title, text }, i) => <article className="service-card" key={title}><div className="service-icon"><Icon size={23} /></div><span className="service-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Learn about ${title}`}><ArrowUpRight size={17} /></a></article>)}</div></section>

        <section className="about-section" id="about"><div className="about-image"><img src={photo('photo-1464822759023-fed622ff2c3b', 1200)} alt="Sunlit mountain range under a clear sky" /><div className="image-stamp"><Plane size={21} /><span>Travel more.<br />Worry less.</span></div></div><div className="about-copy"><div className="eyebrow"><span></span> A LITTLE ABOUT US</div><h2>We believe the<br />best things happen<br /><em>out there.</em></h2><p>At Skyway Travel, we're here for the curious, the spontaneous, and the dreamers with a map full of pins. We make planning your next adventure simpler, so you can focus on the moments that matter.</p><div className="about-stats"><div><b>10k+</b><span>Happy travelers</span></div><div><b>120+</b><span>Destinations</span></div><div><b>4.9<span className="star">★</span></b><span>Traveler rating</span></div></div><a href="#contact" className="button button-dark">Get to know us <ArrowRight size={17} /></a></div></section>

        <section className="testimonial-section"><div className="testimonial-mark">“</div><div className="eyebrow light">NOT JUST OUR WORD</div><blockquote>“The trip was seamless from the first search to the flight home. All we had to do was show up and enjoy every second.”</blockquote><div className="reviewer"><div className="avatar">AM</div><div><b>Arjun & Meera</b><span><span className="stars">★★★★★</span> · Bali getaway</span></div></div><div className="testimonial-bottom"><span>REAL TRIPS. REAL STORIES.</span><span>TRAVEL WELL, LIVE FULLY.</span></div></section>

        <section className="contact-section section" id="contact"><div className="contact-copy"><div className="eyebrow"><span></span> YOUR NEXT CHAPTER STARTS HERE</div><h2>Got a place<br />in <em>mind?</em></h2><p>Tell us what you're dreaming of. We'll help you turn those “one day” plans into “remember when” stories.</p><div className="contact-detail"><span><Send size={17} /></span><div><b>Let's talk travel</b><small>hello@skywaytravel.example</small></div></div><div className="contact-detail"><span><Headphones size={17} /></span><div><b>Travel support</b><small>Mon–Sat, 9 AM–6 PM IST</small></div></div></div><form className="contact-form" onSubmit={submitContact}><h3>Let's plan something good.</h3><p>Share a few details and our travel team will be in touch.</p><label>Your name<input value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="How should we call you?" required /></label><label>Email address<input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" required /></label><label>Tell us about your trip<textarea value={contact.message} onChange={e => setContact({ ...contact, message: e.target.value })} placeholder="Destination, dates, or just a dream..." rows="3" required /></label><button className="button button-dark" type="submit">Send your enquiry <ArrowRight size={17} /></button>{notice && <p className="notice" role="status">{notice}</p>}</form></section>
      </main>

      <footer className="footer"><div className="footer-main"><a href="#home" className="brand footer-brand"><span className="brand-icon"><Plane size={22} fill="currentColor" /></span><span>skyway<span className="brand-light">travel</span><small>GO BEYOND ORDINARY</small></span></a><p>For the places you'll go<br />and the person you'll become.</p><div className="socials"><a href="#contact" aria-label="Instagram"><Camera size={17} /></a><a href="#contact" aria-label="Facebook"><Users size={17} /></a><a href="#contact" aria-label="Twitter"><MessageCircle size={17} /></a></div></div><div className="footer-links"><div><b>EXPLORE</b><a href="#destinations">Destinations</a><a href="#offers">Flight deals</a><a href="#services">Our services</a></div><div><b>SKYWAY</b><a href="#about">Our story</a><a href="#contact">Contact us</a><a href="#booking">Book a flight</a></div><div className="footer-newsletter"><b>A NOTE FROM THE WORLD</b><p>Travel inspiration and little offers, delivered occasionally.</p><form onSubmit={e => { e.preventDefault(); setNotice('Thanks for joining our travel list!') }}><input type="email" aria-label="Newsletter email" placeholder="Your email address" required /><button aria-label="Subscribe"><ArrowRight size={17} /></button></form></div></div><div className="footer-bottom"><span>© 2026 Skyway Travel. Made for the curious.</span><span>Privacy · Terms · Built for better journeys</span></div></footer>
    </div>
  )
}

export default App