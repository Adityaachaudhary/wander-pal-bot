import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar, Star, Users } from 'lucide-react';
import { travelApi, Trip } from '@/services/travelApi';
import Header from '@/components/Header';
import TripCard from '@/components/TripCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('rating_desc');
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const cities = ['Goa', 'Manali', 'Shimla', 'Mumbai', 'Jaipur', 'Kerala', 'Rajasthan'];
  const priceRanges = [
    { label: 'Under ₹10,000', value: '0-10000' },
    { label: '₹10,000 - ₹20,000', value: '10000-20000' },
    { label: '₹20,000 - ₹30,000', value: '20000-30000' },
    { label: 'Above ₹30,000', value: '30000-999999' }
  ];

  useEffect(() => {
    const initialQuery = searchParams.get('q') || '';
    const initialCity = searchParams.get('city') || '';
    setSearchQuery(initialQuery);
    setSelectedCity(initialCity);
    
    loadTrips();
  }, [searchParams]);

  const loadTrips = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      
      const query = searchParams.get('q') || searchQuery;
      const city = searchParams.get('city') || selectedCity;
      
      if (query) filters.q = query;
      if (city) filters.city = city;
      if (priceRange) {
        const [min, max] = priceRange.split('-');
        filters.minPrice = parseInt(min);
        filters.maxPrice = parseInt(max);
      }
      if (sortBy) filters.sort = sortBy;
      
      const response = await travelApi.getTrips(filters);
      setTrips(response.data);
    } catch (error) {
      console.error('Error loading trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCity) params.set('city', selectedCity);
    navigate(`/trips?${params.toString()}`);
    loadTrips();
  };

  const handleFilter = () => {
    loadTrips();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setPriceRange('');
    setSortBy('rating_desc');
    navigate('/trips');
    loadTrips();
  };

  const handleSearchSubmit = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearchSubmit={handleSearchSubmit} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-1"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchSubmit={handleSearchSubmit} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Trip Packages
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover amazing destinations and experiences across India
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search trip packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              <Button onClick={handleSearch} className="px-6">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="px-6"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Cities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Prices</SelectItem>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating_desc">Highest Rated</SelectItem>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="price_desc">Price: High to Low</SelectItem>
                      <SelectItem value="duration_asc">Duration: Short to Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button onClick={handleFilter} className="flex-1">
                    Apply
                  </Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found {trips.length} trip packages
            {selectedCity && ` in ${selectedCity}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Trip Grid */}
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No trips found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse our featured destinations
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {cities.slice(0, 4).map((city) => (
                  <Badge
                    key={city}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setSelectedCity(city);
                      setSearchQuery('');
                      handleFilter();
                    }}
                  >
                    {city}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Popular Destinations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cities.slice(0, 4).map((city) => (
              <Card
                key={city}
                className="cursor-pointer hover:shadow-lg travel-transition group"
                onClick={() => {
                  setSelectedCity(city);
                  setSearchQuery('');
                  handleFilter();
                }}
              >
                <CardContent className="p-4 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2 group-hover:scale-110 travel-transition" />
                  <h3 className="font-semibold text-foreground group-hover:text-primary travel-transition">
                    {city}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Trips;