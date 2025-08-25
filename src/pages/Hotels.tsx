import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { travelApi } from "@/services/travelApi";
import { MapPin, Search, Filter } from "lucide-react";

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

const Hotels = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState(searchParams.get("city") || "");
  const [sortBy, setSortBy] = useState("rating_desc");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    fetchHotels();
  }, [searchParams, sortBy, priceRange]);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const params: {
        city?: string;
        minPrice?: number;
        maxPrice?: number;
        rating?: number;
        limit?: number;
        page?: number;
        sort?: string;
      } = {};
      
      if (searchParams.get("city")) params.city = searchParams.get("city")!;
      if (sortBy) params.sort = sortBy;
      if (priceRange !== "all") {
        if (priceRange === "budget") {
          params.maxPrice = 2500;
        } else if (priceRange === "mid") {
          params.minPrice = 2501;
          params.maxPrice = 5000;
        } else if (priceRange === "luxury") {
          params.minPrice = 5001;
        }
      }
      
      const response = await travelApi.getHotels(params);
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    if (searchCity) {
      newParams.set("city", searchCity);
    } else {
      newParams.delete("city");
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchCity("");
    setSortBy("rating_desc");
    setPriceRange("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover comfortable hotels and resorts for your next adventure
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter city..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating_desc">Highest Rated</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget (Under ₹2,500)</SelectItem>
                  <SelectItem value="mid">Mid-range (₹2,501 - ₹5,000)</SelectItem>
                  <SelectItem value="luxury">Luxury (₹5,001+)</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 animate-pulse">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : hotels.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  {hotels.length} Hotels Found
                  {searchParams.get("city") && (
                    <span className="text-muted-foreground ml-2">
                      in {searchParams.get("city")}
                    </span>
                  )}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No Hotels Found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or explore different cities
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hotels;