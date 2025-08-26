import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { travelApi, Trip, Hotel, Attraction } from '@/services/travelApi';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TripCard from '@/components/TripCard';
import HotelCard from '@/components/HotelCard';
import AttractionCard from '@/components/AttractionCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface IndexProps {
  onChatToggle?: () => void;
}

const Index = ({ onChatToggle }: IndexProps) => {
  const [featuredTrips, setFeaturedTrips] = useState<Trip[]>([]);
  const [popularHotels, setPopularHotels] = useState<Hotel[]>([]);
  const [topAttractions, setTopAttractions] = useState<Attraction[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [tripsResponse, hotelsResponse, attractionsResponse] = await Promise.all([
          travelApi.getTrips({ limit: 6, sort: 'rating_desc' }),
          travelApi.getHotels({ limit: 6, sort: 'rating_desc' }),
          travelApi.getAttractions({ limit: 6 })
        ]);

        setFeaturedTrips(tripsResponse.data);
        setPopularHotels(hotelsResponse.data);
        setTopAttractions(attractionsResponse.data);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };

    loadHomeData();
  }, []);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchSubmit={handleSearch} />
      
      {/* Hero Section */}
      <Hero />

      <main className="container mx-auto px-4 py-16 space-y-16">
        {/* Featured Trips */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Trip Packages
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover handpicked destinations with the best ratings and experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/search?q=trips')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Trips
            </Button>
          </div>
        </section>

        <Separator />

        {/* Popular Hotels */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular Hotels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay at the most loved hotels with excellent amenities and service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/search?q=hotels')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Hotels
            </Button>
          </div>
        </section>

        <Separator />

        {/* Top Attractions */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Must-Visit Places
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore iconic landmarks and hidden gems across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/search?q=attractions')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Explore More Places
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <div className="travel-gradient-hero rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy travelers who have discovered amazing destinations with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/search')}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              >
                Start Planning
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onChatToggle}
                className="border-white text-white hover:bg-white/10 font-semibold px-8"
              >
                Get Help Planning
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">TravelEase</h3>
              <p className="text-muted-foreground mb-4">
                Your trusted travel companion for discovering amazing destinations across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => handleSearch('Goa')} className="hover:text-primary travel-transition">Goa</button></li>
                <li><button onClick={() => handleSearch('Manali')} className="hover:text-primary travel-transition">Manali</button></li>
                <li><button onClick={() => handleSearch('Mumbai')} className="hover:text-primary travel-transition">Mumbai</button></li>
                <li><button onClick={() => handleSearch('Shimla')} className="hover:text-primary travel-transition">Shimla</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate('/search?q=trips')} className="hover:text-primary travel-transition">Trip Packages</button></li>
                <li><button onClick={() => navigate('/search?q=hotels')} className="hover:text-primary travel-transition">Hotel Booking</button></li>
                <li><button onClick={() => navigate('/search?q=attractions')} className="hover:text-primary travel-transition">Attractions</button></li>
                <li><button onClick={onChatToggle} className="hover:text-primary travel-transition">Travel Assistant</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>📧 help@travelease.com</li>
                <li>📞 1800-123-4567</li>
                <li>⏰ 24/7 Support</li>
                <li><button onClick={onChatToggle} className="hover:text-primary travel-transition">💬 Live Chat</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TravelEase. All rights reserved. | Made with ❤️ for travelers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
