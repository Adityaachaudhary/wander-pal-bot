import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Calendar, Users, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { travelApi, Trip } from '@/services/travelApi';
import Header from '@/components/Header';
import BookingModal from '@/components/BookingModal';

const TripDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const loadTrip = async () => {
      if (!id) return;
      
      try {
        const response = await travelApi.getTrip(id);
        setTrip(response.data);
      } catch (error) {
        console.error('Error loading trip:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadTrip();
  }, [id, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip?.title,
          text: trip?.short_description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Trip not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="aspect-video rounded-xl overflow-hidden travel-shadow">
              <div className="w-full h-full bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">✈️</div>
                  <h2 className="text-2xl font-bold">{trip.city}</h2>
                  <p className="opacity-80">{trip.duration}</p>
                </div>
              </div>
            </div>

            {/* Trip Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {trip.title}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{trip.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {trip.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {trip.short_description}
              </p>
            </div>

            {/* Highlights */}
            {trip.highlights && trip.highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Trip Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trip.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Itinerary */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Itinerary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trip.itinerary.map((day, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Day {day.day}</h4>
                          <p className="text-muted-foreground">{day.plan}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="travel-shadow-elevated">
                <CardHeader>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {formatPrice(trip.price)}
                    </div>
                    <p className="text-muted-foreground">per person</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    size="lg"
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full travel-gradient-accent text-white border-0 hover:shadow-lg travel-transition"
                  >
                    Book Now
                  </Button>

                  <Separator />

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{trip.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{trip.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{trip.city}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="text-center text-sm text-muted-foreground">
                    <p>🛡️ Free cancellation up to 24 hours</p>
                    <p>📞 24/7 customer support</p>
                    <p>✨ Best price guarantee</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        item={{
          id: trip.id,
          title: trip.title,
          price: trip.price,
          type: 'trip',
          city: trip.city
        }}
      />
    </div>
  );
};

export default TripDetail;