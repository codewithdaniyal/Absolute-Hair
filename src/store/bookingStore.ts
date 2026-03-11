import { create } from 'zustand';
import { Service, Stylist } from '../types/database';

interface BookingState {
  selectedService: Service | null;
  selectedStylist: Stylist | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  notes: string;
  addOns: Service[];
  
  setSelectedService: (service: Service | null) => void;
  setSelectedStylist: (stylist: Stylist | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setNotes: (notes: string) => void;
  addAddOn: (service: Service) => void;
  removeAddOn: (serviceId: string) => void;
  clearBooking: () => void;
  getTotalPrice: () => number;
  getTotalDuration: () => number;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedService: null,
  selectedStylist: null,
  selectedDate: null,
  selectedTime: null,
  notes: '',
  addOns: [],
  
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedStylist: (stylist) => set({ selectedStylist: stylist }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setNotes: (notes) => set({ notes }),
  
  addAddOn: (service) => set((state) => ({
    addOns: [...state.addOns, service]
  })),
  
  removeAddOn: (serviceId) => set((state) => ({
    addOns: state.addOns.filter(s => s.id !== serviceId)
  })),
  
  clearBooking: () => set({
    selectedService: null,
    selectedStylist: null,
    selectedDate: null,
    selectedTime: null,
    notes: '',
    addOns: []
  }),
  
  getTotalPrice: () => {
    const state = get();
    const servicePrice = state.selectedService?.price || 0;
    const addOnsPrice = state.addOns.reduce((sum, addon) => sum + addon.price, 0);
    return servicePrice + addOnsPrice;
  },
  
  getTotalDuration: () => {
    const state = get();
    const serviceDuration = state.selectedService?.durationMinutes || 0;
    const addOnsDuration = state.addOns.reduce((sum, addon) => sum + addon.durationMinutes, 0);
    return serviceDuration + addOnsDuration;
  }
}));
