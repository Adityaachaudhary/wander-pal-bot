import { useState } from 'react';
import { Star, MapPin, Wifi, Coffee, Car, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/services/travelApi';
import { useNavigate } from 'react-router-dom';

interface HotelCardProps {
  hotel: Hotel;
  variant?: 'default' | 'compact';
}

const HotelCard = ({ hotel, variant = 'default' }: HotelCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'WiFi': Wifi,
      'Breakfast': Coffee,
      'Pool': MapPin,
      'Parking': Car,
      'Gym': MapPin,
      'AC': MapPin,
    };
    
    const IconComponent = iconMap[amenity] || MapPin;
    return <IconComponent className="h-3 w-3" />;
  };

  if (variant === 'compact') {
    return (
      <div className="travel-gradient-card rounded-lg travel-shadow hover:travel-shadow-elevated travel-transition group cursor-pointer">
        <div className="p-4" onClick={handleViewDetails}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base group-hover:text-primary travel-transition line-clamp-1">
              {hotel.name}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="p-1 hover:bg-secondary rounded travel-transition"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{hotel.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{hotel.city}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {hotel.short_description}
          </p>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {formatPrice(hotel.price_per_night)}
              </div>
              <div className="text-xs text-muted-foreground">per night</div>
            </div>
            <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="travel-gradient-card rounded-xl travel-shadow hover:travel-shadow-elevated travel-transition group cursor-pointer">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="aspect-video bg-gradient-to-br from-travel-ocean to-primary flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl mb-2">🏨</div>
            <p className="text-sm opacity-80">{hotel.city}</p>
          </div>
        </div>
        
        {/* Overlay Content */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge variant="secondary" className="bg-white/90 text-primary hover:bg-white">
            ⭐ {hotel.rating}
          </Badge>
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
              {formatPrice(hotel.price_per_night)}
            </div>
            <div className="text-xs text-muted-foreground">
              per night
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6" onClick={handleViewDetails}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 text-card-foreground group-hover:text-primary travel-transition line-clamp-2">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{hotel.city}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {hotel.short_description}
        </p>

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
                >
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
              {hotel.amenities.length > 4 && (
                <span className="inline-block text-xs px-2 py-1 text-muted-foreground">
                  +{hotel.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{hotel.rating}</span>
            <span className="text-sm text-muted-foreground">Rating</span>
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

export default HotelCard;