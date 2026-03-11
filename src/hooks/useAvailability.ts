import { useState, useEffect } from 'react';
import { format, isBefore, startOfDay, addDays } from 'date-fns';
import { generateTimeSlots } from '../lib/utils';
import { SALON_DATA } from '../config/salon';

export function useAvailability(date: Date | undefined, durationMinutes: number) {
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!date) {
            setAvailableSlots([]);
            return;
        }

        setIsLoading(true);

        const checkAvailability = () => {
            // Basic mock logic: generate slots for the salon's open hours
            // and remove past times if it's today
            const allSlots = generateTimeSlots('09:00', '18:00', 30);

            const filteredSlots = allSlots.filter(time => {
                if (isBefore(date, startOfDay(new Date()))) return false;

                if (format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')) {
                    const [hours, minutes] = time.split(':').map(Number);
                    const slotTime = new Date();
                    slotTime.setHours(hours, minutes, 0, 0);
                    return slotTime > new Date();
                }

                return true;
            });

            setAvailableSlots(filteredSlots);
            setIsLoading(false);
        };

        // Simulate API delay
        const timer = setTimeout(checkAvailability, 300);
        return () => clearTimeout(timer);

    }, [date, durationMinutes]);

    return {
        availableSlots,
        isLoading
    };
}
