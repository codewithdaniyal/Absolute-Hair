import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
    <motion.nav
        initial= {{ y: -100 }
}
animate = {{ y: 0 }}
className = {`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
  ? 'bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/10'
  : 'bg-[#0D0D0D]/80 backdrop-blur-md'
  }`}
      >
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
    <div className="flex items-center justify-between h-16" >
      {/* Logo */ }
      < Link to = "/" className = "flex items-baseline gap-1 group" >
        <span className="font-['Raleway'] font-extralight text-xl text-white transition-opacity group-hover:opacity-70" >
          absolute
          </span>
          < span className = "font-['Cormorant_Garamond'] italic text-xl text-white transition-opacity group-hover:opacity-70" >
            hair
            </span>
            </Link>

{/* Desktop Navigation Links */ }
<div className="hidden md:flex items-center gap-8 ml-12" >
  <button
                onClick={ () => scrollToSection('services') }
className = "text-white/70 hover:text-white font-['DM_Sans'] text-sm transition-colors"
  >
  Services
  </button>
  < button
onClick = {() => scrollToSection('reviews')}
className = "text-white/70 hover:text-white font-['DM_Sans'] text-sm transition-colors"
  >
  Reviews
  </button>
  < button
onClick = {() => scrollToSection('about')}
className = "text-white/70 hover:text-white font-['DM_Sans'] text-sm transition-colors"
  >
  About
  </button>
  </div>

{/* Desktop Navigation */ }
<div className="hidden md:flex items-center gap-4" >
  <Link
                to="/book"
className = "px-6 py-2 bg-white text-black font-['Raleway'] font-semibold rounded-[4px] transition-all duration-200 hover:bg-white/90"
  >
  Book Now
    </Link>
    </div>

{/* Mobile Menu Button */ }
<button
              onClick={ () => setIsMobileMenuOpen(!isMobileMenuOpen) }
className = "md:hidden p-2 text-white"
  >
  { isMobileMenuOpen?<X className = "w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
  </div>
  </div>
  </motion.nav>

{/* Mobile Menu */ }
<AnimatePresence>
  { isMobileMenuOpen && (
    <motion.div
            initial={ { opacity: 0, height: 0 } }
animate = {{ opacity: 1, height: 'auto' }}
exit = {{ opacity: 0, height: 0 }}
className = "fixed top-16 left-0 right-0 z-40 bg-[#0D0D0D] border-b border-white/10 md:hidden overflow-hidden"
  >
  <div className="px-4 py-6 space-y-4" >
    <button
                onClick={ () => scrollToSection('services') }
className = "block w-full text-left text-lg text-white/70 hover:text-white font-['DM_Sans'] transition-colors"
  >
  Services
  </button>
  < button
onClick = {() => scrollToSection('reviews')}
className = "block w-full text-left text-lg text-white/70 hover:text-white font-['DM_Sans'] transition-colors"
  >
  Reviews
  </button>
  < button
onClick = {() => scrollToSection('about')}
className = "block w-full text-left text-lg text-white/70 hover:text-white font-['DM_Sans'] transition-colors"
  >
  About
  </button>
  < Link
to = "/book"
onClick = {() => setIsMobileMenuOpen(false)}
className = "block w-full py-3 bg-white text-black text-center font-['Raleway'] font-bold rounded-[4px]"
  >
  Book Now
    </Link>
    </div>
    </motion.div>
        )}
</AnimatePresence>
  </>
  );
}
