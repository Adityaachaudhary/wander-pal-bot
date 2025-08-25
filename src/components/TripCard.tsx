import { useState } from 'react';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trip } from '@/services/travelApi';
import { useNavigate } from 'react-router-dom';

interface TripCardProps {
  trip: Trip;
  variant?: 'default' | 'featured';
}

const TripCard = ({ trip, variant = 'default' }: TripCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/trips/${trip.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const cardSizeClass = variant === 'featured' ? 'md:col-span-2' : '';

  return (
    <div className={`travel-gradient-card rounded-xl travel-shadow hover:travel-shadow-elevated travel-transition group cursor-pointer ${cardSizeClass}`}>
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-video bg-gradient-to-br from-travel-sky to-travel-ocean flex items-center justify-center">
          <div className="text-center text-white">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-60" />
            <p className="text-sm opacity-80">{trip.city}</p>
          </div>
        </div>
        
        {/* Overlay Content */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex gap-2">
            {trip.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-white/90 text-primary hover:bg-white text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 travel-transition"
          >
            <Heart 
              className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-lg font-bold text-primary">
              {formatPrice(trip.price)}
            </div>
            <div className="text-xs text-muted-foreground">
              per person
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6" onClick={handleViewDetails}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 text-card-foreground group-hover:text-primary travel-transition line-clamp-2">
              {trip.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {trip.short_description}
        </p>

        {/* Highlights */}
        {trip.highlights && trip.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {trip.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="inline-block text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
                >
                  {highlight}
                </span>
              ))}
              {trip.highlights.length > 3 && (
                <span className="inline-block text-xs px-2 py-1 text-muted-foreground">
                  +{trip.highlights.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{trip.city}</span>
          </div>
          <Button 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="travel-gradient-accent hover:shadow-md travel-transition text-white border-0"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;