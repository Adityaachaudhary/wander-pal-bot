import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-travel.jpg';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery || destination;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const popularDestinations = [
    { name: 'Goa', description: 'Beaches & Nightlife' },
    { name: 'Manali', description: 'Mountains & Adventure' },
    { name: 'Mumbai', description: 'City & Culture' },
    { name: 'Shimla', description: 'Hills & Heritage' }
  ];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Beautiful travel destination" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your Next
            <span className="block text-travel-sky">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore amazing destinations, find the perfect hotels, and create unforgettable memories
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 travel-shadow-elevated max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4 md:space-y-0">
              {/* Mobile-first layout */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Destination Input */}
                <div className="md:col-span-2 relative">
                  <div className="flex items-center">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Where do you want to go?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-11 pr-4 py-3 text-base border-0 bg-transparent focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Additional Search Input */}
                <div className="relative">
                  <div className="flex items-center">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Trips, hotels, places..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 pr-4 py-3 text-base border-0 bg-transparent focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-3 text-base font-semibold travel-gradient-accent hover:shadow-lg travel-transition text-white border-0"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Popular Destinations */}
          <div className="mt-12">
            <p className="text-white/80 mb-6 text-lg">Popular Destinations</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {popularDestinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(dest.name)}`)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 text-white hover:bg-white/30 travel-transition group"
                >
                  <div className="font-semibold group-hover:text-travel-sky travel-transition">
                    {dest.name}
                  </div>
                  <div className="text-sm text-white/80 mt-1">
                    {dest.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;