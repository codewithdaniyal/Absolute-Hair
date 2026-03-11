import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Booking } from '../types/database';

interface BookingsState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => string;
  cancelBooking: (id: string) => void;
  getUpcomingBookings: () => Booking[];
  getPastBookings: () => Booking[];
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      
      addBooking: (bookingData) => {
        const id = 'booking-' + Math.random().toString(36).substr(2, 9);
        const newBooking: Booking = {
          ...bookingData,
          id,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          bookings: [...state.bookings, newBooking]
        }));
        
        return id;
      },
      
      cancelBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.map(booking =>
            booking.id === id
              ? { ...booking, status: 'cancelled' as const }
              : booking
          )
        }));
      },
      
      getUpcomingBookings: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().bookings
          .filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate >= today && booking.status !== 'cancelled';
          })
          .sort((a, b) => new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime());
      },
      
      getPastBookings: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().bookings
          .filter(booking => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate < today || booking.status === 'cancelled';
          })
          .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
      },
    }),
    {
      name: 'bookings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);