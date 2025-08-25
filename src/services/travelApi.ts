// Mock Travel API Service using localStorage
// Implements the API specification provided

interface Trip {
  id: string;
  title: string;
  city: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  short_description: string;
  highlights: string[];
  images: string[];
  tags: string[];
  created_at: string;
  itinerary?: { day: number; plan: string }[];
}

interface Hotel {
  id: string;
  name: string;
  city: string;
  price_per_night: number;
  currency: string;
  rating: number;
  short_description: string;
  amenities: string[];
  images: string[];
}

interface Attraction {
  id: string;
  name: string;
  city: string;
  location_name: string;
  short_description: string;
  coords: { lat: number; lon: number };
  images: string[];
}

interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    pages?: number;
    count?: number;
  };
}

interface ChatMessage {
  type: 'text' | 'hotel' | 'trip' | 'attraction';
  text?: string;
  id?: string;
  name?: string;
  title?: string;
  price?: number;
  price_per_night?: number;
  rating?: number;
  short_description?: string;
}

interface ChatResponse {
  reply: string;
  messages: ChatMessage[];
  cards: ChatMessage[];
  suggestions: string[];
}

// Mock data
const mockTrips: Trip[] = [
  {
    id: "trip_101",
    title: "Goa Beaches & Nightlife - 3N/4D",
    city: "Goa",
    duration: "3N/4D",
    price: 12999,
    currency: "INR",
    rating: 4.5,
    short_description: "Beach hopping, watersports and nightlife in North Goa",
    highlights: ["Baga Beach", "Parasailing", "Beach party"],
    images: [],
    tags: ["popular", "couples"],
    created_at: "2025-07-10T12:00:00Z",
    itinerary: [
      { day: 1, plan: "Arrive in Goa, check-in and beach relaxation" },
      { day: 2, plan: "Full day water sports and beach hopping" },
      { day: 3, plan: "Sightseeing and nightlife experience" },
      { day: 4, plan: "Departure" }
    ]
  },
  {
    id: "trip_102",
    title: "Goa Family Package - 4N/5D",
    city: "Goa",
    duration: "4N/5D",
    price: 15999,
    currency: "INR",
    rating: 4.1,
    short_description: "Family-friendly beaches, cultural tours and relaxation",
    highlights: ["Family beaches", "Spice plantation", "Dolphin cruise"],
    images: [],
    tags: ["family", "cultural"],
    created_at: "2025-07-11T12:00:00Z"
  },
  {
    id: "trip_103",
    title: "Manali Adventure - 2N/3D",
    city: "Manali",
    duration: "2N/3D",
    price: 8999,
    currency: "INR",
    rating: 4.6,
    short_description: "Trekking, river rafting and mountain adventures",
    highlights: ["Rohtang Pass", "River rafting", "Hadimba Temple"],
    images: [],
    tags: ["adventure", "trekking"],
    created_at: "2025-07-12T12:00:00Z"
  },
  {
    id: "trip_104",
    title: "Mumbai City Explorer - 2N/3D",
    city: "Mumbai",
    duration: "2N/3D",
    price: 9999,
    currency: "INR",
    rating: 4.3,
    short_description: "Explore the city of dreams with iconic landmarks",
    highlights: ["Gateway of India", "Marine Drive", "Bollywood tour"],
    images: [],
    tags: ["city", "cultural"],
    created_at: "2025-07-13T12:00:00Z"
  },
  {
    id: "trip_105",
    title: "Shimla Heritage Walk - 3N/4D",
    city: "Shimla",
    duration: "3N/4D",
    price: 11999,
    currency: "INR",
    rating: 4.4,
    short_description: "Colonial architecture and hill station charm",
    highlights: ["Mall Road", "Toy train", "Kufri"],
    images: [],
    tags: ["heritage", "hills"],
    created_at: "2025-07-14T12:00:00Z"
  }
];

const mockHotels: Hotel[] = [
  {
    id: "hotel_201",
    name: "Seaside Comfort Hotel",
    city: "Goa",
    price_per_night: 2999,
    currency: "INR",
    rating: 4.2,
    short_description: "200m from the beach, breakfast included",
    amenities: ["WiFi", "Breakfast", "Pool"],
    images: []
  },
  {
    id: "hotel_202",
    name: "Goa Budget Inn",
    city: "Goa",
    price_per_night: 1999,
    currency: "INR",
    rating: 3.9,
    short_description: "Affordable stay near Baga Beach",
    amenities: ["WiFi", "AC"],
    images: []
  },
  {
    id: "hotel_203",
    name: "Hillside Retreat",
    city: "Manali",
    price_per_night: 3499,
    currency: "INR",
    rating: 4.5,
    short_description: "Mountain views & fireplace in every room",
    amenities: ["WiFi", "Fireplace", "Mountain view"],
    images: []
  },
  {
    id: "hotel_204",
    name: "Mumbai Business Hotel",
    city: "Mumbai",
    price_per_night: 4999,
    currency: "INR",
    rating: 4.1,
    short_description: "Modern amenities in the heart of the city",
    amenities: ["WiFi", "Gym", "Business center"],
    images: []
  },
  {
    id: "hotel_205",
    name: "Shimla Palace Hotel",
    city: "Shimla",
    price_per_night: 3999,
    currency: "INR",
    rating: 4.3,
    short_description: "Heritage hotel with colonial charm",
    amenities: ["WiFi", "Heritage architecture", "Valley view"],
    images: []
  }
];

const mockAttractions: Attraction[] = [
  {
    id: "attr_301",
    name: "Fort Aguada",
    city: "Goa",
    location_name: "Sinquerim",
    short_description: "17th-century Portuguese fort with lighthouse & sea views",
    coords: { lat: 15.4978, lon: 73.7624 },
    images: []
  },
  {
    id: "attr_302",
    name: "Baga Beach",
    city: "Goa",
    location_name: "North Goa",
    short_description: "Popular beach for watersports and nightlife",
    coords: { lat: 15.5559, lon: 73.7516 },
    images: []
  },
  {
    id: "attr_303",
    name: "Hadimba Temple",
    city: "Manali",
    location_name: "Dhungiri Van Vihar",
    short_description: "Ancient wooden temple dedicated to Hadimba Devi",
    coords: { lat: 32.2396, lon: 77.1887 },
    images: []
  },
  {
    id: "attr_304",
    name: "Gateway of India",
    city: "Mumbai",
    location_name: "Colaba",
    short_description: "Iconic arch monument overlooking the Arabian Sea",
    coords: { lat: 18.9220, lon: 72.8347 },
    images: []
  },
  {
    id: "attr_305",
    name: "Mall Road",
    city: "Shimla",
    location_name: "The Ridge",
    short_description: "Famous shopping street with colonial architecture",
    coords: { lat: 31.1048, lon: 77.1734 },
    images: []
  }
];

const supportedCities = ["Goa", "Manali", "Shimla", "Mumbai"];

class TravelApi {
  private trips: Trip[] = mockTrips;
  private hotels: Hotel[] = mockHotels;
  private attractions: Attraction[] = mockAttractions;

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const storedTrips = localStorage.getItem('travelApi_trips');
    const storedHotels = localStorage.getItem('travelApi_hotels');
    const storedAttractions = localStorage.getItem('travelApi_attractions');

    if (storedTrips) this.trips = JSON.parse(storedTrips);
    if (storedHotels) this.hotels = JSON.parse(storedHotels);
    if (storedAttractions) this.attractions = JSON.parse(storedAttractions);
  }

  private saveToLocalStorage() {
    localStorage.setItem('travelApi_trips', JSON.stringify(this.trips));
    localStorage.setItem('travelApi_hotels', JSON.stringify(this.hotels));
    localStorage.setItem('travelApi_attractions', JSON.stringify(this.attractions));
  }

  // Cities endpoint
  getCities(): Promise<ApiResponse<string[]>> {
    return Promise.resolve({
      data: supportedCities,
      meta: { count: supportedCities.length }
    });
  }

  // Trips endpoints
  getTrips(params: {
    city?: string;
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    duration?: string;
    tags?: string;
    sort?: string;
    limit?: number;
    page?: number;
  } = {}): Promise<ApiResponse<Trip[]>> {
    let filteredTrips = [...this.trips];

    // Apply filters
    if (params.city) {
      filteredTrips = filteredTrips.filter(trip => 
        trip.city.toLowerCase() === params.city!.toLowerCase()
      );
    }

    if (params.q) {
      const query = params.q.toLowerCase();
      filteredTrips = filteredTrips.filter(trip =>
        trip.title.toLowerCase().includes(query) ||
        trip.short_description.toLowerCase().includes(query)
      );
    }

    if (params.minPrice) {
      filteredTrips = filteredTrips.filter(trip => trip.price >= params.minPrice!);
    }

    if (params.maxPrice) {
      filteredTrips = filteredTrips.filter(trip => trip.price <= params.maxPrice!);
    }

    if (params.duration) {
      filteredTrips = filteredTrips.filter(trip => trip.duration === params.duration);
    }

    if (params.tags) {
      const tags = params.tags.split(',').map(tag => tag.trim().toLowerCase());
      filteredTrips = filteredTrips.filter(trip =>
        trip.tags.some(tag => tags.includes(tag.toLowerCase()))
      );
    }

    // Apply sorting
    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          filteredTrips.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredTrips.sort((a, b) => b.price - a.price);
          break;
        case 'rating_desc':
          filteredTrips.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    // Apply pagination
    const limit = params.limit || 10;
    const page = params.page || 1;
    const total = filteredTrips.length;
    const pages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedTrips = filteredTrips.slice(offset, offset + limit);

    return Promise.resolve({
      data: paginatedTrips,
      meta: { total, page, limit, pages }
    });
  }

  getTrip(id: string): Promise<ApiResponse<Trip | null>> {
    const trip = this.trips.find(t => t.id === id);
    if (!trip) {
      return Promise.reject({ error: "Trip not found", code: 404 });
    }
    return Promise.resolve({ data: trip });
  }

  // Hotels endpoints
  getHotels(params: {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    limit?: number;
    page?: number;
    sort?: string;
  } = {}): Promise<ApiResponse<Hotel[]>> {
    let filteredHotels = [...this.hotels];

    if (params.city) {
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.city.toLowerCase() === params.city!.toLowerCase()
      );
    }

    if (params.minPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price_per_night >= params.minPrice!);
    }

    if (params.maxPrice) {
      filteredHotels = filteredHotels.filter(hotel => hotel.price_per_night <= params.maxPrice!);
    }

    if (params.rating) {
      filteredHotels = filteredHotels.filter(hotel => hotel.rating >= params.rating!);
    }

    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          filteredHotels.sort((a, b) => a.price_per_night - b.price_per_night);
          break;
        case 'price_desc':
          filteredHotels.sort((a, b) => b.price_per_night - a.price_per_night);
          break;
        case 'rating_desc':
          filteredHotels.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    const limit = params.limit || 10;
    const page = params.page || 1;
    const total = filteredHotels.length;
    const pages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedHotels = filteredHotels.slice(offset, offset + limit);

    return Promise.resolve({
      data: paginatedHotels,
      meta: { total, page, limit, pages }
    });
  }

  getHotel(id: string): Promise<ApiResponse<Hotel | null>> {
    const hotel = this.hotels.find(h => h.id === id);
    if (!hotel) {
      return Promise.reject({ error: "Hotel not found", code: 404 });
    }
    return Promise.resolve({ data: hotel });
  }

  // Attractions endpoints
  getAttractions(params: {
    city?: string;
    limit?: number;
    page?: number;
  } = {}): Promise<ApiResponse<Attraction[]>> {
    let filteredAttractions = [...this.attractions];

    if (params.city) {
      filteredAttractions = filteredAttractions.filter(attraction => 
        attraction.city.toLowerCase() === params.city!.toLowerCase()
      );
    }

    const limit = params.limit || 10;
    const page = params.page || 1;
    const total = filteredAttractions.length;
    const pages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedAttractions = filteredAttractions.slice(offset, offset + limit);

    return Promise.resolve({
      data: paginatedAttractions,
      meta: { total, page, limit, pages }
    });
  }

  getAttraction(id: string): Promise<ApiResponse<Attraction | null>> {
    const attraction = this.attractions.find(a => a.id === id);
    if (!attraction) {
      return Promise.reject({ error: "Attraction not found", code: 404 });
    }
    return Promise.resolve({ data: attraction });
  }

  // Unified search endpoint
  search(params: {
    q: string;
    city?: string;
    type?: 'trips' | 'hotels' | 'attractions' | 'all';
    limit?: number;
  }): Promise<{
    query: string;
    results: {
      trips: Trip[];
      hotels: Hotel[];
      attractions: Attraction[];
    };
    meta: { total: number };
  }> {
    const { q, city, type = 'all', limit = 5 } = params;
    const query = q.toLowerCase();

    let trips: Trip[] = [];
    let hotels: Hotel[] = [];
    let attractions: Attraction[] = [];

    if (type === 'all' || type === 'trips') {
      trips = this.trips
        .filter(trip => {
          const matchesQuery = trip.title.toLowerCase().includes(query) ||
                             trip.short_description.toLowerCase().includes(query) ||
                             trip.city.toLowerCase().includes(query);
          const matchesCity = !city || trip.city.toLowerCase() === city.toLowerCase();
          return matchesQuery && matchesCity;
        })
        .slice(0, limit);
    }

    if (type === 'all' || type === 'hotels') {
      hotels = this.hotels
        .filter(hotel => {
          const matchesQuery = hotel.name.toLowerCase().includes(query) ||
                             hotel.short_description.toLowerCase().includes(query) ||
                             hotel.city.toLowerCase().includes(query);
          const matchesCity = !city || hotel.city.toLowerCase() === city.toLowerCase();
          return matchesQuery && matchesCity;
        })
        .slice(0, limit);
    }

    if (type === 'all' || type === 'attractions') {
      attractions = this.attractions
        .filter(attraction => {
          const matchesQuery = attraction.name.toLowerCase().includes(query) ||
                             attraction.short_description.toLowerCase().includes(query) ||
                             attraction.city.toLowerCase().includes(query);
          const matchesCity = !city || attraction.city.toLowerCase() === city.toLowerCase();
          return matchesQuery && matchesCity;
        })
        .slice(0, limit);
    }

    const total = trips.length + hotels.length + attractions.length;

    return Promise.resolve({
      query: q,
      results: { trips, hotels, attractions },
      meta: { total }
    });
  }

  // Chat endpoint
  chat(params: {
    sessionId?: string;
    message: string;
    context?: any;
  }): Promise<ChatResponse> {
    const message = params.message.toLowerCase().trim();
    
    // Extract city names
    const mentionedCity = supportedCities.find(city => 
      message.includes(city.toLowerCase())
    );

    // Check for intent keywords
    const isAskingForTrips = message.includes('trip') || message.includes('package') || message.includes('tour');
    const isAskingForHotels = message.includes('hotel') || message.includes('stay') || message.includes('accommodation');
    const isAskingForAttractions = message.includes('visit') || message.includes('see') || message.includes('attraction') || message.includes('places');
    const isAskingForPrice = message.includes('price') || message.includes('cost') || message.includes('budget');

    // Extract price range
    const priceMatch = message.match(/under (\d+)|below (\d+)|less than (\d+)/);
    const maxPrice = priceMatch ? parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3]) : undefined;

    let reply = "I'm here to help you plan your perfect trip! ";
    const messages: ChatMessage[] = [];
    const cards: ChatMessage[] = [];
    const suggestions: string[] = [
      "Show trips to Goa",
      "Best hotels in Manali",
      "What to visit in Mumbai"
    ];

    if (mentionedCity) {
      if (isAskingForTrips) {
        const cityTrips = this.trips.filter(trip => 
          trip.city.toLowerCase() === mentionedCity.toLowerCase() &&
          (!maxPrice || trip.price <= maxPrice)
        ).slice(0, 3);

        if (cityTrips.length > 0) {
          reply = `I found ${cityTrips.length} amazing trip${cityTrips.length > 1 ? 's' : ''} to ${mentionedCity}${maxPrice ? ` under ₹${maxPrice}` : ''}:`;
          messages.push({ type: 'text', text: reply });
          
          cityTrips.forEach(trip => {
            cards.push({
              type: 'trip',
              id: trip.id,
              title: trip.title,
              price: trip.price,
              rating: trip.rating,
              short_description: trip.short_description
            });
          });

          suggestions.push(`Show hotels in ${mentionedCity}`, `Attractions in ${mentionedCity}`);
        } else {
          reply = `Sorry, I couldn't find any trips to ${mentionedCity}${maxPrice ? ` under ₹${maxPrice}` : ''}. Try different criteria.`;
        }
      } else if (isAskingForHotels) {
        const cityHotels = this.hotels.filter(hotel => 
          hotel.city.toLowerCase() === mentionedCity.toLowerCase() &&
          (!maxPrice || hotel.price_per_night <= maxPrice)
        ).slice(0, 3);

        if (cityHotels.length > 0) {
          reply = `Here are ${cityHotels.length} great hotel${cityHotels.length > 1 ? 's' : ''} in ${mentionedCity}${maxPrice ? ` under ₹${maxPrice}` : ''}:`;
          messages.push({ type: 'text', text: reply });
          
          cityHotels.forEach(hotel => {
            cards.push({
              type: 'hotel',
              id: hotel.id,
              name: hotel.name,
              price_per_night: hotel.price_per_night,
              rating: hotel.rating,
              short_description: hotel.short_description
            });
          });

          suggestions.push(`Show trips to ${mentionedCity}`, `Attractions in ${mentionedCity}`);
        } else {
          reply = `Sorry, I couldn't find any hotels in ${mentionedCity}${maxPrice ? ` under ₹${maxPrice}` : ''}. Try different criteria.`;
        }
      } else if (isAskingForAttractions) {
        const cityAttractions = this.attractions.filter(attraction => 
          attraction.city.toLowerCase() === mentionedCity.toLowerCase()
        ).slice(0, 3);

        if (cityAttractions.length > 0) {
          reply = `Here are top places to visit in ${mentionedCity}:`;
          messages.push({ type: 'text', text: reply });
          
          cityAttractions.forEach(attraction => {
            cards.push({
              type: 'attraction',
              id: attraction.id,
              name: attraction.name,
              short_description: attraction.short_description
            });
          });

          suggestions.push(`Show trips to ${mentionedCity}`, `Hotels in ${mentionedCity}`);
        } else {
          reply = `Sorry, I don't have attraction information for ${mentionedCity} yet.`;
        }
      } else {
        // General city inquiry
        reply = `${mentionedCity} is a wonderful destination! What would you like to know about it?`;
        suggestions.push(
          `Show trips to ${mentionedCity}`,
          `Best hotels in ${mentionedCity}`,
          `What to visit in ${mentionedCity}`
        );
      }
    } else {
      // No specific city mentioned
      reply = "I can help you find trips, hotels, and attractions. Which city are you interested in?";
      suggestions.push(
        "Show trips to Goa",
        "Best hotels in Manali",
        "What to visit in Mumbai",
        "Attractions in Shimla"
      );
    }

    messages.push({ type: 'text', text: reply });

    return Promise.resolve({
      reply,
      messages,
      cards,
      suggestions
    });
  }

  // Mock booking endpoint
  createBooking(params: {
    userId: string;
    itemType: 'trip' | 'hotel';
    itemId: string;
    guests: number;
    startDate: string;
  }): Promise<{ bookingId: string; status: string; message: string }> {
    const bookingId = `bk_${Date.now()}`;
    
    return Promise.resolve({
      bookingId,
      status: "pending",
      message: "Booking created (demo only)"
    });
  }
}

export const travelApi = new TravelApi();
export type { Trip, Hotel, Attraction, ApiResponse, ChatResponse, ChatMessage };