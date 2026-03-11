import { useBookingsStore } from '../store/bookingsStore';
import { useAuthStore } from '../store/authStore';

export function useBooking() {
    const { addBooking, cancelBooking, getUpcomingBookings, getPastBookings } = useBookingsStore();
    const { user } = useAuthStore();

    return {
        addBooking,
        cancelBooking,
        upcomingBookings: getUpcomingBookings(),
        pastBookings: getPastBookings(),
        isAuthenticated: !!user
    };
}
