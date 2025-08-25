import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { travelApi } from "@/services/travelApi";
import { Star, MapPin, Wifi, Coffee, Car, Waves, ArrowLeft, Calendar } from "lucide-react";

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
  full_description?: string;
  location?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
}

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchHotel();
    }
  }, [id]);

  const fetchHotel = async () => {
    setLoading(true);
    try {
      const response = await travelApi.getHotel(id!);
      setHotel(response.data);
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
    setLoading(false);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'breakfast': return <Coffee className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'pool': return <Waves className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Header />
        <div className="pt-24 px-4">
          <div className="max-w-6xl mx-auto animate-pulse">
            <div className="bg-muted h-8 w-32 rounded mb-6"></div>
            <div className="bg-muted h-96 rounded-xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-muted h-12 rounded mb-4"></div>
                <div className="bg-muted h-6 rounded mb-4"></div>
                <div className="bg-muted h-24 rounded"></div>
              </div>
              <div className="bg-muted h-96 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Header />
        <div className="pt-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🏨</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Hotel Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the hotel you're looking for.
            </p>
            <Button onClick={() => navigate("/hotels")}>
              Browse All Hotels
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <div className="pt-24 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Hotel Images */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8 bg-muted">
            {hotel.images && hotel.images.length > 0 ? (
              <img 
                src={hotel.images[0]} 
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏨</div>
                  <p>No image available</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hotel Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{hotel.city}</span>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">{hotel.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                  <Badge variant="secondary">{hotel.city}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  {hotel.full_description || hotel.short_description}
                </p>
              </div>

              {/* Amenities */}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {getAmenityIcon(amenity)}
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Location & Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Location & Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{hotel.location || `${hotel.city}, India`}</span>
                  </div>
                  {hotel.contact?.phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm">{hotel.contact.phone}</span>
                    </div>
                  )}
                  {hotel.contact?.email && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm">{hotel.contact.email}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-foreground mb-2">
                      ₹{hotel.price_per_night.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">per night</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{hotel.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span>{hotel.city}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    onClick={() => setBookingModalOpen(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Free cancellation • No booking fees
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        item={{...hotel, type: "hotel"}}
      />
    </div>
  );
};

export default HotelDetail;