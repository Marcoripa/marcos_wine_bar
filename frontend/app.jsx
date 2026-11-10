import React, { useState } from 'react';
import { 
  Wine, 
  MapPin, 
  Mail, 
  ChevronRight, 
  Award, 
  Briefcase, 
  Grape, 
  GlassWater 
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-yellow-900 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Pedigree />
        <Services />
        {/* <WineBarTeaser /> */}
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-xl font-serif tracking-widest text-white uppercase">
          Marco<span className="text-yellow-600">.</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-light text-neutral-400">
          <a href="#pedigree" className="hover:text-yellow-600 transition-colors">Pedigree</a>
          <a href="#services" className="hover:text-yellow-600 transition-colors">Consulting</a>
          <a href="#winebar" className="hover:text-yellow-600 transition-colors">The Bar</a>
        </div>
        <a href="#contact" className="hidden md:inline-flex items-center text-xs uppercase tracking-widest border border-yellow-600/50 text-yellow-600 px-4 py-2 hover:bg-yellow-600 hover:text-white transition-all">
          Contact
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-yellow-600 uppercase tracking-[0.3em] text-sm font-semibold mb-6">
          Sommelier & Wine Consultant
        </h2>
        <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-8 leading-tight">
          Elevating the <br />
          <span className="italic text-neutral-400">Mornington</span> Experience.
        </h1>
        <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          From the vineyards of Barolo and Champagne to the Mornington Peninsula. 
          Expert wine curation, pop-up masterclasses, and bespoke beverage programs for regional venues.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#services" className="px-8 py-4 bg-yellow-600 text-white uppercase tracking-widest text-sm hover:bg-yellow-700 transition-colors w-full sm:w-auto">
            Explore Services
          </a>
          <a href="#winebar" className="px-8 py-4 border border-white/20 text-white uppercase tracking-widest text-sm hover:border-yellow-600 hover:text-yellow-600 transition-colors w-full sm:w-auto">
            Discover the Bar
          </a>
        </div>
      </div>
    </section>
  );
}

function Pedigree() {
  const experiences = [
    { name: "Milan", role: "Degree in Winemaking", icon: <Award className="w-6 h-6" /> },
    { name: "G.D. Vajra", role: "Barolo, Italy", icon: <Grape className="w-6 h-6" /> },
    { name: "Maison Michel Rocourt", role: "Champagne, France", icon: <GlassWater className="w-6 h-6" /> },
    { name: "Cloudy Bay", role: "Marlborough, NZ", icon: <Briefcase className="w-6 h-6" /> },
    { name: "Chandon", role: "Victoria, AUS", icon: <Briefcase className="w-6 h-6" /> },
  ];

  return (
    <section id="pedigree" className="py-24 bg-neutral-900 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-serif text-white mb-4">A Global Pedigree</h3>
          <div className="w-12 h-[1px] bg-yellow-600 mx-auto" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-neutral-950 flex items-center justify-center text-yellow-600 mb-4 border border-white/5 group-hover:border-yellow-600/50 transition-colors">
                {exp.icon}
              </div>
              <h4 className="text-white font-serif text-lg mb-1">{exp.name}</h4>
              <p className="text-xs uppercase tracking-wider text-neutral-500">{exp.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "Restaurant Takeovers",
      description: "Transform your traditionally quiet Tuesday or Wednesday nights. I take over the floor, curating and pouring a premium, high-margin Italian wine list while you focus on the food. Zero upfront capital, shared revenue.",
      icon: <Wine className="w-8 h-8 text-yellow-600 mb-6" />
    },
    {
      title: "Pop-Up Masterclasses",
      description: "Ticketed, high-end educational wine events hosted at your venue. From 'Debunking Wine Snobbery' to 'Barolo Communes Unmasked'. An incredible way to monetize dead space and attract a sophisticated demographic.",
      icon: <GlassWater className="w-8 h-8 text-yellow-600 mb-6" />
    },
    {
      title: "Beverage Program Consulting",
      description: "Leveraging my background as a software engineer and global sommelier, I overhaul your wine list and inventory systems to maximize gross profit, eliminate dead stock, and train your staff to sell with confidence.",
      icon: <Briefcase className="w-8 h-8 text-yellow-600 mb-6" />
    }
  ];

  return (
    <section id="services" className="py- relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 md:w-2/3">
          <h2 className="text-yellow-600 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            Consulting & Partnerships
          </h2>
          <h3 className="text-4xl font-serif text-white mb-6 leading-tight">
            Elevating Regional Venues. <br />
            <span className="text-neutral-500 italic">One glass at a time.</span>
          </h3>
          <p className="text-neutral-400 font-light text-lg">
            Regional Australia is home to brilliant chefs and stunning venues that often lack a dedicated beverage expert. I bring global pedigree to your floor, turning a standard service into a destination wine event.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-neutral-900/50 p-10 border border-white/5 hover:border-yellow-600/30 transition-all group">
              {service.icon}
              <h4 className="text-xl font-serif text-white mb-4 group-hover:text-yellow-500 transition-colors">{service.title}</h4>
              <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
                {service.description}
              </p>
              <a href="#contact" className="inline-flex items-center text-xs uppercase tracking-widest text-yellow-600 hover:text-white transition-colors">
                Inquire <ChevronRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WineBarTeaser() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="winebar" className="py-32 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/5 via-neutral-900 to-neutral-900 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-yellow-600/30 mb-8">
          <Wine className="w-6 h-6 text-yellow-600" />
        </div>
        
        <h2 className="text-yellow-600 uppercase tracking-[0.4em] text-xs font-semibold mb-6">
          Hush Hush
        </h2>
        <h3 className="text-5xl md:text-6xl font-serif text-white mb-8">
          Marco's Wine Bar
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-neutral-400 uppercase tracking-widest text-sm font-light mb-12">
          <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-yellow-600" /> Mornington Peninsula</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="flex items-center"><Award className="w-4 h-4 mr-2 text-yellow-600" /> 80+ Label Speakeasy</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="text-yellow-600">Coming 2027</span>
        </div>

        <p className="text-neutral-400 font-light text-lg max-w-2xl mx-auto mb-12">
          A high-end, intimate speakeasy dedicated to premium Italian varietals, rare Coravin pours, and the art of true hospitality. The location is a secret. The experience will be unforgettable.
        </p>

        <div className="max-w-md mx-auto bg-neutral-950 p-8 border border-white/5 shadow-2xl">
          <h4 className="text-white font-serif text-xl mb-2">Join the Guestlist</h4>
          <p className="text-neutral-500 text-sm mb-6">Be the first to know the location and secure opening week reservations.</p>
          
          {submitted ? (
            <div className="p-4 bg-yellow-600/10 border border-yellow-600/30 text-yellow-600 text-sm">
              Grazie! You have been added to the guestlist.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-900 border border-white/10 px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-yellow-600 transition-colors"
              />
              <button 
                type="submit" 
                className="bg-yellow-600 text-white uppercase tracking-widest text-sm py-3 hover:bg-yellow-700 transition-colors"
              >
                Secure Access
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-12 border-t border-white/5 bg-neutral-950 text-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-2xl font-serif tracking-widest text-white uppercase mb-6 md:mb-0">
          Marco<span className="text-yellow-600">.</span>
        </div>
        
        <div className="flex items-center justify-center gap-8 mb-6 md:mb-0">
          <a href="mailto:ciao@marcoswinebar.com.au" className="flex items-center text-sm text-neutral-400 hover:text-yellow-600 transition-colors">
            <Mail className="w-4 h-4 mr-2" />
            ciao@marcoswinebar.com.au
          </a>
        </div>

        <div className="text-xs uppercase tracking-wider text-neutral-600">
          © {new Date().getFullYear()} Marco Sommelier. All rights reserved.
        </div>
      </div>
    </footer>
  );
}