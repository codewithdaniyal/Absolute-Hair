import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Clock, User } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import { SALON_DATA } from '../../config/salon';
import { stylists, services } from '../../lib/mockData';
import { StylistCard } from '../components/ui/StylistCard';
import { useBookingStore } from '../../store/bookingStore';
import { useBookingsStore } from '../../store/bookingsStore';
import { formatPrice, formatDuration, generateTimeSlots } from '../../lib/utils';

const STEPS = ['Service', 'Stylist', 'Date & Time', 'Details'];

export function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useBookingsStore();
  const {
    selectedService,
    selectedStylist,
    selectedDate,
    selectedTime,
    notes,
    setSelectedService,
    setSelectedStylist,
    setSelectedDate,
    setSelectedTime,
    setNotes,
    getTotalPrice,
    getTotalDuration
  } = useBookingStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      notes: notes
    }
  });

  // Load service if not in store
  useEffect(() => {
    if (serviceId && !selectedService) {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [serviceId, selectedService, setSelectedService]);

  const salon = SALON_DATA;

  // Get available times for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const dayName = format(selectedDate, 'EEEE').toLowerCase() as keyof typeof salon.hours;
    const hours = salon.hours[dayName];

    if (!hours) return [];

    const [start, end] = hours.split('-');
    return generateTimeSlots(start, end, getTotalDuration());
  };

  const availableTimeSlots = getAvailableTimeSlots();

  // Calendar logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const today = startOfDay(new Date());
  const isDayAvailable = (date: Date) => {
    if (isBefore(date, today)) return false;
    const dayName = format(date, 'EEEE').toLowerCase() as keyof typeof salon.hours;
    return !!salon.hours[dayName];
  };

  const canProceed = () => {
    if (currentStep === 0) return !!selectedService;
    if (currentStep === 1) return true; // Stylist is optional
    if (currentStep === 2) return !!selectedDate && !!selectedTime;
    return true;
  };

  const handleNext = () => {
    if (canProceed() && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const onSubmit = (data: any) => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const bookingId = addBooking({
      serviceId: selectedService.id,
      stylistId: selectedStylist?.id || null,
      customerId: 'guest',
      bookingDate: format(selectedDate, 'yyyy-MM-dd'),
      bookingTime: selectedTime,
      status: 'confirmed',
      notes: data.notes || notes,
      totalPrice: getTotalPrice(),
      service: selectedService,
      stylist: selectedStylist || undefined
    });

    navigate(`/booking/confirmed?id=${bookingId}`);
  };

  if (!selectedService) {
    return (
      <div className= "min-h-screen pt-32 px-4" >
      <div className="max-w-2xl mx-auto text-center" >
        <p className="text-white/60 font-['DM_Sans']" > Service not selected.Please go back to the home page.</p>
          </div>
          </div>
    );
  }

  return (
    <div className= "min-h-screen pt-24 pb-20" >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" >
      {/* Header */ }
      < div className = "mb-8" >
        <button
            onClick={ handleBack }
  className = "flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 font-['DM_Sans']"
    >
    <ChevronLeft className="w-4 h-4" />
      Back
      </button>

      < h1 className = "font-['Raleway'] font-extralight text-3xl md:text-4xl text-white mb-2" >
        Book Your Appointment
          </h1>
          < p className = "text-white/60 font-['DM_Sans']" > { salon.name } </p>
            </div>

  {/* Progress Bar */ }
  <div className="mb-12" >
    <div className="flex items-center justify-between mb-2" >
    {
      STEPS.map((step, index) => (
        <div
                key= { step }
                className = {`text-sm font-['DM_Sans'] ${index <= currentStep ? 'text-white' : 'text-white/30'}`}
      >
      { step }
      </div>
            ))
}
</div>
  < div className = "h-0.5 bg-white/10 rounded-full overflow-hidden" >
    <motion.div
              className="h-full bg-white"
initial = {{ width: '0%' }}
animate = {{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
transition = {{ duration: 0.3 }}
            />
  </div>
  </div>

{/* Steps */ }
<AnimatePresence mode="wait" >
  {/* Step 1: Service Confirmation */ }
{
  currentStep === 0 && (
    <motion.div
              key="step-0"
  initial = {{ opacity: 0, x: 20 }
}
animate = {{ opacity: 1, x: 0 }}
exit = {{ opacity: 0, x: -20 }}
className = "space-y-6"
  >
  <div className="bg-white/[0.04] border border-white/10 rounded-[4px] p-6" >
    <h3 className="font-['Raleway'] font-light text-xl text-white mb-4" >
      Selected Service
        </h3>
        < div className = "space-y-3" >
          <div className="flex items-start justify-between" >
            <div>
            <h4 className="font-['Raleway'] text-white mb-1" >
              { selectedService.name }
              </h4>
{
  selectedService.description && (
    <p className="text-sm text-white/60 font-['DM_Sans']" >
      { selectedService.description }
      </p>
                      )
}
</div>
  < div className = "text-right" >
  {
    selectedService.originalPrice && (
      <div className="text-sm text-white/30 line-through">
        { formatPrice(selectedService.originalPrice) }
        </div>
                      )
  }
    < div className = "text-xl font-['Raleway'] font-semibold text-white" >
      { formatPrice(selectedService.price) }
      </div>
      </div>
      </div>
      < div className = "flex items-center gap-2 text-sm text-white/60 pt-3 border-t border-white/10" >
        <Clock className="w-4 h-4" />
          <span className="font-['DM_Sans']" >
            { formatDuration(selectedService.durationMinutes) }
            </span>
            </div>
            </div>
            </div>

            < button
onClick = { handleNext }
className = "w-full py-3 bg-white text-black font-['Raleway'] font-semibold rounded-[4px] transition-all duration-200 hover:bg-white/90"
  >
  Continue
  </button>
  </motion.div>
          )}

{/* Step 2: Choose Stylist */ }
{
  currentStep === 1 && (
    <motion.div
              key="step-1"
  initial = {{ opacity: 0, x: 20 }
}
animate = {{ opacity: 1, x: 0 }}
exit = {{ opacity: 0, x: -20 }}
className = "space-y-6"
  >
  <div>
  <h3 className="font-['Raleway'] font-light text-xl text-white mb-6" >
    Choose Your Stylist
      </h3>

      < div className = "grid grid-cols-2 md:grid-cols-3 gap-6" >
        <div
                    onClick={ () => setSelectedStylist(null) }
className = {`cursor-pointer p-4 rounded-[4px] border transition-all ${!selectedStylist
    ? 'border-white bg-white/10'
    : 'border-white/10 hover:border-white/30'
  }`}
                  >
  <div className="text-center space-y-2" >
    <div className="w-16 h-16 mx-auto rounded-full border border-white/30 flex items-center justify-center" >
      <User className="w-8 h-8 text-white/60" />
        </div>
        < div className = "font-['Raleway'] text-white" > No Preference </div>
          </div>
          </div>

{
  stylists.map((stylist) => (
    <div
                      key= { stylist.id }
                      onClick = {() => setSelectedStylist(stylist)}
className = {`cursor-pointer p-4 rounded-[4px] border transition-all ${selectedStylist?.id === stylist.id
    ? 'border-white bg-white/10'
    : 'border-white/10 hover:border-white/30'
  }`}
                    >
  <StylistCard
                        stylist={ stylist }
isSelected = { selectedStylist?.id === stylist.id}
                      />
  </div>
                  ))}
</div>
  </div>

  < button
onClick = { handleNext }
className = "w-full py-3 bg-white text-black font-['Raleway'] font-semibold rounded-[4px] transition-all duration-200 hover:bg-white/90"
  >
  Continue
  </button>
  </motion.div>
          )}

{/* Step 3: Date & Time */ }
{
  currentStep === 2 && (
    <motion.div
              key="step-2"
  initial = {{ opacity: 0, x: 20 }
}
animate = {{ opacity: 1, x: 0 }}
exit = {{ opacity: 0, x: -20 }}
className = "space-y-6"
  >
  <div>
  <h3 className="font-['Raleway'] font-light text-xl text-white mb-6" >
    Select Date & Time
      </h3>

{/* Calendar */ }
<div className="bg-white/[0.04] border border-white/10 rounded-[4px] p-6 mb-6" >
  <div className="flex items-center justify-between mb-6" >
    <button
                      onClick={ () => setCurrentMonth(addDays(currentMonth, -30)) }
className = "p-2 text-white/60 hover:text-white"
  >
  <ChevronLeft className="w-5 h-5" />
    </button>
    < h4 className = "font-['Raleway'] text-white" >
      { format(currentMonth, 'MMMM yyyy') }
      </h4>
      < button
onClick = {() => setCurrentMonth(addDays(currentMonth, 30))}
className = "p-2 text-white/60 hover:text-white"
  >
  <ChevronLeft className="w-5 h-5 rotate-180" />
    </button>
    </div>

    < div className = "grid grid-cols-7 gap-2" >
    {
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key= { day } className = "text-center text-xs text-white/40 font-['DM_Sans'] py-2" >
        { day }
        </div>
      ))
    }
{
  daysInMonth.map((day, index) => {
    const available = isDayAvailable(day);
    const selected = selectedDate && isSameDay(day, selectedDate);
    const isTodayDate = isToday(day);

    return (
      <motion.button
                          key= { index }
    whileHover = { available? { scale: 1.05 } : { }
  }
                          whileTap = { available? { scale: 0.95 } : {}}
onClick = {() => available && setSelectedDate(day)}
disabled = {!available}
className = {`aspect-square rounded-full flex items-center justify-center text-sm font-['DM_Sans'] transition-all ${selected
    ? 'bg-white text-black scale-110'
    : isTodayDate
      ? 'border border-white text-white'
      : available
        ? 'text-white hover:bg-white/10'
        : 'text-white/20 cursor-not-allowed'
  }`}
                        >
  { format(day, 'd') }
  </motion.button>
                      );
                    })}
</div>
  </div>

{/* Time Slots */ }
{
  selectedDate && availableTimeSlots.length > 0 && (
    <motion.div
                    initial={ { opacity: 0, y: 20 } }
  animate = {{ opacity: 1, y: 0 }
}
                  >
  <h4 className="font-['Raleway'] text-white mb-4" > Available Times </h4>
    < div className = "grid grid-cols-3 md:grid-cols-4 gap-3" >
    {
      availableTimeSlots.map((time) => (
        <motion.button
                          key= { time }
                          whileHover = {{ scale: 1.05 }}
whileTap = {{ scale: 0.95 }}
onClick = {() => setSelectedTime(time)}
className = {`py-3 rounded-[4px] font-['DM_Sans'] transition-all ${selectedTime === time
    ? 'bg-white text-black'
    : 'border border-white/30 text-white hover:bg-white/10'
  }`}
                        >
  { time }
  </motion.button>
                      ))}
</div>
  </motion.div>
                )}
</div>

  < button
onClick = { handleNext }
disabled = {!selectedDate || !selectedTime}
className = "w-full py-3 bg-white text-black font-['Raleway'] font-semibold rounded-[4px] transition-all duration-200 hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed"
  >
  Continue
  </button>
  </motion.div>
          )}

{/* Step 4: Details */ }
{
  currentStep === 3 && (
    <motion.div
              key="step-3"
  initial = {{ opacity: 0, x: 20 }
}
animate = {{ opacity: 1, x: 0 }}
exit = {{ opacity: 0, x: -20 }}
            >
  <form onSubmit={ handleSubmit(onSubmit) } className = "space-y-6" >
    <div>
    <h3 className="font-['Raleway'] font-light text-xl text-white mb-6" >
      Your Details
        </h3>

        < div className = "space-y-4" >
          <div>
          <label className="block text-sm text-white/70 font-['DM_Sans'] mb-2" >
            Full Name
              </label>
              < input
{...register('fullName', { required: true }) }
className = "w-full px-0 py-3 bg-transparent border-b border-white/30 text-white placeholder:text-white/30 font-['DM_Sans'] focus:outline-none focus:border-white transition-colors"
placeholder = "Enter your name"
  />
  </div>

  < div >
  <label className="block text-sm text-white/70 font-['DM_Sans'] mb-2" >
    Phone Number
      </label>
      < input
{...register('phone', { required: true }) }
className = "w-full px-0 py-3 bg-transparent border-b border-white/30 text-white placeholder:text-white/30 font-['DM_Sans'] focus:outline-none focus:border-white transition-colors"
placeholder = "Enter your phone number"
  />
  </div>

  < div >
  <label className="block text-sm text-white/70 font-['DM_Sans'] mb-2" >
    Notes for stylist(optional)
      </label>
      < textarea
                        { ...register('notes') }
                        onChange = {(e) => setNotes(e.target.value)}
rows = { 3}
className = "w-full px-0 py-3 bg-transparent border-b border-white/30 text-white placeholder:text-white/30 font-['DM_Sans'] focus:outline-none focus:border-white transition-colors resize-none"
placeholder = "Any special requests or information..."
  />
  </div>
  </div>
  </div>

{/* Summary */ }
<div className="bg-white/[0.04] border border-white/10 rounded-[4px] p-6 space-y-4" >
  <h4 className="font-['Raleway'] text-white" > Booking Summary </h4>
    < div className = "space-y-2 text-sm font-['DM_Sans']" >
      <div className="flex justify-between" >
        <span className="text-white/60" > Service </span>
          < span className = "text-white" > { selectedService.name } </span>
            </div>
{
  selectedStylist && (
    <div className="flex justify-between" >
      <span className="text-white/60" > Stylist </span>
        < span className = "text-white" > { selectedStylist.name } </span>
          </div>
                    )
}
<div className="flex justify-between" >
  <span className="text-white/60" > Date </span>
    < span className = "text-white" >
      { selectedDate && format(selectedDate, 'EEEE, d MMMM')}
</span>
  </div>
  < div className = "flex justify-between" >
    <span className="text-white/60" > Time </span>
      < span className = "text-white" > { selectedTime } </span>
        </div>
        < div className = "flex justify-between pt-3 border-t border-white/10" >
          <span className="text-white" > Total </span>
            < span className = "text-white font-['Raleway'] font-semibold text-lg" >
              { formatPrice(getTotalPrice())}
</span>
  </div>
  </div>
  </div>

  < button
type = "submit"
className = "w-full py-3 bg-white text-black font-['Raleway'] font-semibold rounded-[4px] transition-all duration-200 hover:bg-white/90"
  >
  Confirm Booking
    </button>
    </form>
    </motion.div>
          )}
</AnimatePresence>
  </div>
  </div>
  );
}
