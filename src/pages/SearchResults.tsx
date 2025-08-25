import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { travelApi, Trip, Hotel, Attraction } from '@/services/travelApi';
import TripCard from '@/components/TripCard';
import HotelCard from '@/components/HotelCard';
import AttractionCard from '@/components/AttractionCard';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  const [searchResults, setSearchResults] = useState<{
    trips: Trip[];
    hotels: Hotel[];
    attractions: Attraction[];
  }>({
    trips: [],
    hotels: [],
    attractions: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    rating: ''
  });

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const response = await travelApi.search({
        q: searchQuery,
        type: activeTab === 'all' ? 'all' : activeTab as 'trips' | 'hotels' | 'attractions',
        limit: 20
      });
      setSearchResults(response.results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, activeTab]);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getTotalResults = () => {
    return searchResults.trips.length + searchResults.hotels.length + searchResults.attractions.length;
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearchSubmit={handleSearch} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">
            Start your search to discover amazing destinations
          </h1>
          <p className="text-muted-foreground">
            Try searching for cities, hotels, or attractions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchSubmit={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">
              Search results for "{query}"
            </h1>
            <Badge variant="secondary">
              {getTotalResults()} results found
            </Badge>
          </div>
          
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg travel-shadow">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              className="w-32"
            />
            
            <Input
              placeholder="Min price"
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="w-32"
            />
            
            <Input
              placeholder="Max price"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="w-32"
            />

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All ({getTotalResults()})</TabsTrigger>
            <TabsTrigger value="trips">Trips ({searchResults.trips.length})</TabsTrigger>
            <TabsTrigger value="hotels">Hotels ({searchResults.hotels.length})</TabsTrigger>
            <TabsTrigger value="attractions">Places ({searchResults.attractions.length})</TabsTrigger>
          </TabsList>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Searching for the best options...</p>
              </div>
            </div>
          )}

          {/* All Results */}
          <TabsContent value="all" className="space-y-8">
            {!isLoading && (
              <>
                {/* Trips Section */}
                {searchResults.trips.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-semibold">Trip Packages</h2>
                      <Badge variant="outline">{searchResults.trips.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.trips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                      ))}
                    </div>
                  </section>
                )}

                {searchResults.trips.length > 0 && (searchResults.hotels.length > 0 || searchResults.attractions.length > 0) && (
                  <Separator />
                )}

                {/* Hotels Section */}
                {searchResults.hotels.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-semibold">Hotels</h2>
                      <Badge variant="outline">{searchResults.hotels.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                      ))}
                    </div>
                  </section>
                )}

                {searchResults.hotels.length > 0 && searchResults.attractions.length > 0 && (
                  <Separator />
                )}

                {/* Attractions Section */}
                {searchResults.attractions.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-xl font-semibold">Places to Visit</h2>
                      <Badge variant="outline">{searchResults.attractions.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.attractions.map((attraction) => (
                        <AttractionCard key={attraction.id} attraction={attraction} />
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </TabsContent>

          {/* Individual Tab Contents */}
          <TabsContent value="trips">
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hotels">
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="attractions">
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.attractions.map((attraction) => (
                  <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* No Results */}
        {!isLoading && getTotalResults() === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters
            </p>
            <div className="space-x-2">
              <Button onClick={() => handleSearch('Goa')} variant="outline">
                Try "Goa"
              </Button>
              <Button onClick={() => handleSearch('Manali')} variant="outline">
                Try "Manali"
              </Button>
              <Button onClick={() => handleSearch('hotels')} variant="outline">
                Try "Hotels"
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;