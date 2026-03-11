import { useState, useEffect } from 'react';
import { services, serviceCategories } from '../lib/mockData';
import { Service, ServiceCategory } from '../types/database';

export function useServices() {
    const [data, setData] = useState<{ services: Service[], categories: ServiceCategory[] }>({
        services: [],
        categories: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate network delay for fetching services
        const timer = setTimeout(() => {
            setData({ services, categories: serviceCategories });
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return {
        services: data.services,
        categories: data.categories,
        isLoading
    };
}
