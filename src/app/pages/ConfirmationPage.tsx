import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useBookingsStore } from '../../store/bookingsStore';
import { formatDate, formatPrice } from '../../lib/utils';

export function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id');
  const { clearBooking } = useBookingStore();
  const { bookings } = useBookingsStore();

  const booking = bookings.find(b => b.id === bookingId);

  useEffect(() => {
    // Clear booking store after confirmation
    clearBooking();
  }, [clearBooking]);

  if (!booking) {
    return (
      <div className= "min-h-screen pt-32 px-4" >
      <div className="max-w-2xl mx-auto text-center" >
        <p className="text-white/60 font-['DM_Sans']" > Booking not found </p>
          </div>
          </div>
    );
  }

  return (
    <div className= "min-h-screen pt-32 pb-20" >
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8" >
      <motion.div
          initial={ { opacity: 0, scale: 0.9 } }
  animate = {{ opacity: 1, scale: 1 }
}
transition = {{ duration: 0.5 }}
className = "text-center space-y-8"
  >
  {/* Animated Checkmark */ }
  < div className = "flex justify-center" >
    <motion.div
              initial={ { scale: 0 } }
animate = {{ scale: 1 }}
transition = {{
  type: "spring",
    stiffness: 200,
      damping: 15,
        delay: 0.2
}}
className = "inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-white"
  >
  <Check className="w-12 h-12 text-white" />
    </motion.div>
    </div>

    < motion.div
initial = {{ opacity: 0, y: 20 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ delay: 0.4 }}
className = "space-y-4"
  >
  <h1 className="font-['Raleway'] font-extralight text-4xl md:text-5xl text-white" >
    Booking Confirmed!
      </h1>
      < p className = "text-white/60 font-['DM_Sans']" >
        We've sent a confirmation to your email
          </p>
          </motion.div>

{/* Booking Reference */ }
<motion.div
            initial={ { opacity: 0, y: 20 } }
animate = {{ opacity: 1, y: 0 }}
transition = {{ delay: 0.6 }}
className = "inline-block bg-white/5 border border-white/10 rounded-[4px] px-6 py-3"
  >
  <div className="text-sm text-white/60 font-['DM_Sans'] mb-1" > Booking Reference </div>
    < div className = "font-mono text-lg text-white tracking-wider" >
      { booking.id.toUpperCase().slice(0, 10) }
      </div>
      </motion.div>

{/* Booking Details */ }
<motion.div
            initial={ { opacity: 0, y: 20 } }
animate = {{ opacity: 1, y: 0 }}
transition = {{ delay: 0.8 }}
className = "bg-white/[0.04] border border-white/10 rounded-[4px] p-8 text-left space-y-4"
  >
  <h3 className="font-['Raleway'] font-light text-xl text-white mb-4" >
    Appointment Details
      </h3>

      < div className = "space-y-3 font-['DM_Sans']" >
        <div className="flex justify-between" >
          <span className="text-white/60" > Location </span>
            < span className = "text-white" > Absolute Hair </span>
              </div>

              < div className = "flex justify-between" >
                <span className="text-white/60" > Service </span>
                  < span className = "text-white" > { booking.service?.name } </span>
                    </div>

{
  booking.stylist && (
    <div className="flex justify-between" >
      <span className="text-white/60" > Stylist </span>
        < span className = "text-white" > { booking.stylist.name } </span>
          </div>
              )
}

<div className="flex justify-between" >
  <span className="text-white/60" > Date </span>
    < span className = "text-white" > { formatDate(booking.bookingDate) } </span>
      </div>

      < div className = "flex justify-between" >
        <span className="text-white/60" > Time </span>
          < span className = "text-white" > { booking.bookingTime } </span>
            </div>

            < div className = "flex justify-between pt-3 border-t border-white/10" >
              <span className="text-white font-['Raleway']" > Total </span>
                < span className = "text-white font-['Raleway'] font-semibold text-xl" >
                  { formatPrice(booking.totalPrice) }
                  </span>
                  </div>
                  </div>
                  </motion.div>

{/* Actions */ }
<motion.div
            initial={ { opacity: 0, y: 20 } }
animate = {{ opacity: 1, y: 0 }}
transition = {{ delay: 1 }}
className = "flex flex-col sm:flex-row gap-4 pt-4"
  >
  <Link
              to="/"
className = "flex-1 py-3 bg-white text-black text-center font-['Raleway'] font-semibold rounded-[4px] transition-all duration-200 hover:bg-white/90"
  >
  Back to Home
    </Link>
    </motion.div>
    </motion.div>
    </div>
    </div>
  );
}
