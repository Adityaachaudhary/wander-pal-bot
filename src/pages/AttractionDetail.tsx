import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { travelApi } from "@/services/travelApi";
import { Star, MapPin, Clock, Camera, ArrowLeft, Navigation } from "lucide-react";

interface Attraction {
  id: string;
  name: string;
  city: string;
  location_name: string;
  short_description: string;
  coords?: {
    lat: number;
    lon: number;
  };
  images: string[];
  category?: string;
  rating?: number;
  full_description?: string;
  best_time_to_visit?: string;
  entry_fee?: string;
  timings?: string;
  tips?: string[];
}

const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAttraction();
    }
  }, [id]);

  const fetchAttraction = async () => {
    setLoading(true);
    try {
      const response = await travelApi.getAttraction(id!);
      setAttraction(response.data);
    } catch (error) {
      console.error("Error fetching attraction:", error);
    }
    setLoading(false);
  };

  const handleGetDirections = () => {
    if (attraction?.coords) {
      const { lat, lon } = attraction.coords;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
      window.open(url, '_blank');
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

  if (!attraction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Header />
        <div className="pt-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🏛️</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Attraction Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the attraction you're looking for.
            </p>
            <Button onClick={() => navigate("/attractions")}>
              Browse All Attractions
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

          {/* Attraction Images */}
          <div className="relative h-96 rounded-xl overflow-hidden mb-8 bg-muted">
            {attraction.images && attraction.images.length > 0 ? (
              <img 
                src={attraction.images[0]} 
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏛️</div>
                  <p>No image available</p>
                </div>
              </div>
            )}
            {attraction.images && attraction.images.length > 1 && (
              <Badge className="absolute bottom-4 right-4 bg-black/50 text-white">
                <Camera className="h-3 w-3 mr-1" />
                {attraction.images.length} Photos
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Attraction Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{attraction.location_name}, {attraction.city}</span>
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">{attraction.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  {attraction.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{attraction.rating}</span>
                    </div>
                  )}
                  {attraction.category && (
                    <Badge variant="secondary" className="capitalize">
                      {attraction.category}
                    </Badge>
                  )}
                  <Badge variant="outline">{attraction.city}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  {attraction.full_description || attraction.short_description}
                </p>
              </div>

              {/* Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attraction.best_time_to_visit && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Best Time to Visit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {attraction.best_time_to_visit}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {attraction.entry_fee && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Entry Fee</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold">{attraction.entry_fee}</p>
                    </CardContent>
                  </Card>
                )}

                {attraction.timings && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Timings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {attraction.timings}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Tips */}
              {attraction.tips && attraction.tips.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Visitor Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {attraction.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary font-semibold">•</span>
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Location & Actions */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Location</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{attraction.location_name}</p>
                        <p>{attraction.city}, India</p>
                      </div>
                    </div>

                    {attraction.coords && (
                      <Button 
                        className="w-full" 
                        onClick={handleGetDirections}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    )}

                    {attraction.rating && (
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{attraction.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {attraction.category && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Category</span>
                        <span className="capitalize">{attraction.category}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetail;