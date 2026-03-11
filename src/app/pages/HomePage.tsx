import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, CreditCard, Train, Coffee, Phone } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { SALON_DATA } from '../../config/salon';
import { stylists, services, serviceCategories, reviews } from '../../lib/mockData';
import { ServiceCard } from '../components/ui/ServiceCard';
import { StylistCard } from '../components/ui/StylistCard';
import { ReviewCard } from '../components/ui/ReviewCard';
import { StarRating } from '../components/ui/StarRating';
import { useBookingStore } from '../../store/bookingStore';
import { formatTime, getOpenHoursLabel } from '../../lib/utils';
import { fadeUp, staggerContainer } from '../../lib/animations';
import { Service } from '../../types/database';

export function HomePage() {
  const navigate = useNavigate();
  const { setSelectedService } = useBookingStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const salon = SALON_DATA;

  const popularServices = services.filter(s => s.isPopular);
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.categoryId === selectedCategory);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    navigate(`/book/${service.id}`);
  };

  // Calculate average sub-ratings
  const avgAmbience = reviews.reduce((sum, r) => sum + r.ambienceRating, 0) / reviews.length;
  const avgCleanliness = reviews.reduce((sum, r) => sum + r.cleanlinessRating, 0) / reviews.length;
  const avgStaff = reviews.reduce((sum, r) => sum + r.staffRating, 0) / reviews.length;

  return (
    <div className= "min-h-screen pt-24 bg-[#0D0D0D]" >
    {/* Hero Header */ }
    < section className = "relative h-[60vh] md:h-[70vh] overflow-hidden" >
      <img
          src={ salon.coverImageUrl }
  alt = { salon.name }
  className = "w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent" />

      <motion.div
          initial={ { opacity: 0, y: 30 } }
  animate = {{ opacity: 1, y: 0 }
}
transition = {{ duration: 0.8, delay: 0.2 }}
className = "absolute bottom-0 left-0 right-0 p-6 md:p-12"
  >
  <div className="max-w-7xl mx-auto" >
    <div className="flex items-baseline gap-2 mb-4" >
      <h1 className="font-['Raleway'] font-extralight text-4xl md:text-6xl text-white" >
        absolute
        </h1>
        < h1 className = "font-['Cormorant_Garamond'] italic text-4xl md:text-6xl text-white" >
          hair
          </h1>
          </div>

          < div className = "flex flex-wrap items-center gap-4" >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20" >
              <Star className="w-4 h-4 fill-white text-white" />
                <span className="font-['Raleway'] text-white" > { salon.rating } </span>
                  < span className = "text-white/60 font-['DM_Sans'] text-sm" > ({ salon.reviewCount } reviews)</span>
                    </div>

                    < div className = "flex items-center gap-2 text-white/80 font-['DM_Sans']" >
                      <MapPin className="w-4 h-4" />
                        <span className="text-sm" > { salon.address } </span>
                          </div>

                          < div className = "px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-['DM_Sans'] rounded-full border border-white/20" >
                            { getOpenHoursLabel(salon) }
                            </div>
                            </div>
                            </div>
                            </motion.div>
                            </section>

{/* Popular Services */ }
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" >
  <motion.div
          initial="hidden"
whileInView = "visible"
viewport = {{ once: true, margin: "-100px" }}
variants = { staggerContainer }
  >
  <motion.h2
            variants={ fadeUp }
className = "font-['Raleway'] font-extralight text-3xl md:text-4xl text-white mb-8"
  >
  Popular Services
    </motion.h2>

    < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
      {
        popularServices.map((service) => (
          <ServiceCard
                key= { service.id }
                service = { service }
                onSelect = {() => handleServiceSelect(service)}
      />
            ))}
</div>
  </motion.div>
  </section>

{/* Full Services Browser */ }
<section id="services" className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-32" >
  <motion.div
          initial="hidden"
whileInView = "visible"
viewport = {{ once: true, margin: "-100px" }}
variants = { staggerContainer }
  >
  <motion.h2
            variants={ fadeUp }
className = "font-['Raleway'] font-extralight text-3xl md:text-4xl text-white mb-8"
  >
  All Services
    </motion.h2>

    < div className = "grid grid-cols-1 lg:grid-cols-4 gap-8" >
      {/* Category Sidebar */ }
      < div className = "lg:col-span-1" >
        <div className="space-y-2 lg:sticky lg:top-32" >
          <button
                  onClick={ () => setSelectedCategory('all') }
className = {`w-full text-left px-4 py-3 rounded-[4px] font-['DM_Sans'] transition-all duration-200 ${selectedCategory === 'all'
  ? 'bg-white/10 text-white border border-white/30'
  : 'text-white/60 hover:text-white hover:bg-white/5'
  }`}
                >
  All Services
    </button>
{
  serviceCategories.map((category) => (
    <button
                    key= { category.id }
                    onClick = {() => setSelectedCategory(category.id)}
className = {`w-full text-left px-4 py-3 rounded-[4px] font-['DM_Sans'] transition-all duration-200 ${selectedCategory === category.id
  ? 'bg-white/10 text-white border border-white/30'
  : 'text-white/60 hover:text-white hover:bg-white/5'
  }`}
                  >
  { category.name }
  </button>
                ))}
</div>
  </div>

{/* Services Grid */ }
<div className="lg:col-span-3" >
  <motion.div
                key={ selectedCategory }
initial = {{ opacity: 0, x: 20 }}
animate = {{ opacity: 1, x: 0 }}
transition = {{ duration: 0.3 }}
className = "grid grid-cols-1 md:grid-cols-2 gap-6"
  >
  {
    filteredServices.map((service) => (
      <ServiceCard
                    key= { service.id }
                    service = { service }
                    onSelect = {() => handleServiceSelect(service)}
  />
                ))}
</motion.div>
  </div>
  </div>
  </motion.div>
  </section>

{/* Gallery */ }
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" >
  <motion.div
          initial="hidden"
whileInView = "visible"
viewport = {{ once: true, margin: "-100px" }}
variants = { staggerContainer }
  >
  <motion.h2
            variants={ fadeUp }
className = "font-['Raleway'] font-extralight text-3xl md:text-4xl text-white mb-8"
  >
  Our Work
    </motion.h2>

    < Masonry columnsCount = { 3} gutter = "16px" >
    {
      salon.galleryImages.map((image, index) => (
        <motion.div
                key= { index }
                variants = { fadeUp }
                className = "relative overflow-hidden rounded-[4px] group cursor-pointer"
        >
        <img
                  src={ image }
                  alt = {`Gallery ${index + 1}`}
className = "w-full h-auto transition-transform duration-300 group-hover:scale-105"
  />
  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" >
    <span className="text-white font-['DM_Sans']" > View </span>
      </div>
      </motion.div>
            ))}
</Masonry>
  </motion.div>
  </section>

{/* Reviews */ }
<section id="reviews" className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-32" >
  <motion.div
          initial="hidden"
whileInView = "visible"
viewport = {{ once: true, margin: "-100px" }}
variants = { staggerContainer }
  >
  <motion.h2
            variants={ fadeUp }
className = "font-['Raleway'] font-extralight text-3xl md:text-4xl text-white mb-8"
  >
  Reviews
  </motion.h2>

{/* Overall Rating */ }
<motion.div
            variants={ fadeUp }
className = "bg-white/[0.04] border border-white/10 rounded-[4px] p-8 mb-8"
  >
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8" >
    <div className="text-center md:text-left" >
      <div className="font-['Cormorant_Garamond'] text-6xl text-white mb-2" >
        { salon.rating }
        </div>
        < StarRating rating = { salon.rating } size = "lg" />
          <p className="mt-2 text-white/60 font-['DM_Sans']" >
            Based on { salon.reviewCount } reviews
              </p>
              </div>

              < div className = "space-y-3" >
                <div className="space-y-1" >
                  <div className="flex items-center justify-between text-sm" >
                    <span className="text-white/70 font-['DM_Sans']" > Ambience </span>
                      < span className = "text-white font-['Raleway']" > { avgAmbience.toFixed(1) } </span>
                        </div>
                        < div className = "h-1.5 bg-white/10 rounded-full overflow-hidden" >
                          <div
                      className="h-full bg-white rounded-full transition-all duration-500"
style = {{ width: `${(avgAmbience / 5) * 100}%` }}
                    />
  </div>
  </div>

  < div className = "space-y-1" >
    <div className="flex items-center justify-between text-sm" >
      <span className="text-white/70 font-['DM_Sans']" > Cleanliness </span>
        < span className = "text-white font-['Raleway']" > { avgCleanliness.toFixed(1) } </span>
          </div>
          < div className = "h-1.5 bg-white/10 rounded-full overflow-hidden" >
            <div
                      className="h-full bg-white rounded-full transition-all duration-500"
style = {{ width: `${(avgCleanliness / 5) * 100}%` }}
                    />
  </div>
  </div>

  < div className = "space-y-1" >
    <div className="flex items-center justify-between text-sm" >
      <span className="text-white/70 font-['DM_Sans']" > Staff </span>
        < span className = "text-white font-['Raleway']" > { avgStaff.toFixed(1) } </span>
          </div>
          < div className = "h-1.5 bg-white/10 rounded-full overflow-hidden" >
            <div
                      className="h-full bg-white rounded-full transition-all duration-500"
style = {{ width: `${(avgStaff / 5) * 100}%` }}
                    />
  </div>
  </div>
  </div>
  </div>
  </motion.div>

{/* Review Cards */ }
<div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
{
  reviews.map((review) => (
    <ReviewCard key= { review.id } review = { review } />
            ))
}
  </div>
  </motion.div>
  </section>

{/* Team */ }
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" >
  <motion.div
          initial="hidden"
whileInView = "visible"
viewport = {{ once: true, margin: "-100px" }}
variants = { staggerContainer }
  >
  <motion.h2
            variants={ fadeUp }
className = "font-['Raleway'] font-extralight text-3xl md:text-4xl text-white mb-8"
  >
  Meet the Team
    </motion.h2>

    < div className = "flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide" >
    {
      stylists.map((stylist) => (
        <StylistCard key= { stylist.id } stylist = { stylist } />
            ))
    }
      </div>
      </motion.div>
      </section>

{/* About & Hours */ }
<section id="about" className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-32" >
  <motion.div
          initial="hidden"
whileInView = "visible"
viewport = {{ once: true, margin: "-100px" }}
variants = { staggerContainer }
  >
  <motion.h2
            variants={ fadeUp }
className = "font-['Raleway'] font-extralight text-3xl md:text-4xl text-white mb-8"
  >
  About
  </motion.h2>

  < div className = "grid grid-cols-1 md:grid-cols-2 gap-8" >
    {/* Description */ }
    < motion.div variants = { fadeUp } className = "space-y-6" >
      <p className="text-white/80 leading-relaxed font-['DM_Sans']" >
        { salon.description }
        </p>

        < div className = "space-y-4" >
          <h3 className="font-['Raleway'] font-light text-xl text-white" > Amenities </h3>
            < div className = "flex flex-wrap gap-3" >
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-[4px]" >
                <CreditCard className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white/80 font-['DM_Sans']" > Card Payments </span>
                    </div>
                    < div className = "flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-[4px]" >
                      <Train className="w-4 h-4 text-white/60" />
                        <span className="text-sm text-white/80 font-['DM_Sans']" > Public Transport </span>
                          </div>
                          < div className = "flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-[4px]" >
                            <Coffee className="w-4 h-4 text-white/60" />
                              <span className="text-sm text-white/80 font-['DM_Sans']" > Refreshments </span>
                                </div>
                                </div>
                                </div>

                                < div className = "space-y-3" >
                                  <h3 className="font-['Raleway'] font-light text-xl text-white" > Contact </h3>
                                    < div className = "flex items-center gap-2 text-white/70 font-['DM_Sans']" >
                                      <Phone className="w-4 h-4" />
                                        <span>{ salon.phone } </span>
                                        </div>
                                        < div className = "flex items-center gap-2 text-white/70 font-['DM_Sans']" >
                                          <MapPin className="w-4 h-4" />
                                            <span>{ salon.address }, { salon.city }, { salon.postcode } </span>
                                            </div>
                                            </div>
                                            </motion.div>

{/* Hours */ }
<motion.div variants={ fadeUp } className = "bg-white/[0.04] border border-white/10 rounded-[4px] p-6" >
  <h3 className="font-['Raleway'] font-light text-xl text-white mb-4 flex items-center gap-2" >
    <Clock className="w-5 h-5" />
      Opening Hours
        </h3>
        < div className = "space-y-3 font-['DM_Sans']" >
        {
          Object.entries(salon.hours).map(([day, hours]) => (
            <div key= { day } className = "flex items-center justify-between" >
            <span className="capitalize text-white/70" > { day } </span>
          < span className = { hours? 'text-white': 'text-white/45' } >
          { hours? hours.split('-').map(t => formatTime(t)).join(' – ') : 'Closed'}
          </span>
          </div>
          ))
        }
          </div>
          </motion.div>
          </div>
          </motion.div>
          </section>
          </div>
  );
}
