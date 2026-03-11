
export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  isActive: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  sortOrder: number;
}

export interface Service {
  id: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  originalPrice?: number;
  hairLengthVariant?: 'short_medium' | 'long_thick' | 'standard' | null;
  isPopular: boolean;
  isActive: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  stylistId: string | null;
  customerId: string;
  bookingDate: string;
  bookingTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string;
  totalPrice: number;
  createdAt: string;
  // Populated fields
  service?: Service;
  stylist?: Stylist;
}

export interface Review {
  id: string;
  bookingId: string | null;
  customerId: string;
  stylistId: string | null;
  serviceName: string;
  rating: number;
  body: string;
  ambienceRating: number;
  cleanlinessRating: number;
  staffRating: number;
  isVerified: boolean;
  venueReply: string | null;
  createdAt: string;
  // Populated fields
  customerName?: string;
  stylistName?: string;
}

export interface Profile {
  id: string;
  fullName: string;
  phone: string;
  avatarUrl: string;
  createdAt: string;
}
