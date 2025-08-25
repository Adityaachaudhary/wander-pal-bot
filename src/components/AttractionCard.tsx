import { useState } from 'react';
import { MapPin, Heart, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Attraction } from '@/services/travelApi';
import { useNavigate } from 'react-router-dom';

interface AttractionCardProps {
  attraction: Attraction;
  variant?: 'default' | 'compact';
}

const AttractionCard = ({ attraction, variant = 'default' }: AttractionCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/attractions/${attraction.id}`);
  };

  const getAttractionEmoji = (name: string) => {
    if (name.toLowerCase().includes('beach')) return '🏖️';
    if (name.toLowerCase().includes('fort') || name.toLowerCase().includes('temple')) return '🏛️';
    if (name.toLowerCase().includes('mall') || name.toLowerCase().includes('road')) return '🛍️';
    if (name.toLowerCase().includes('garden') || name.toLowerCase().includes('park')) return '🌳';
    return '📍';
  };

  if (variant === 'compact') {
    return (
      <div className="travel-gradient-card rounded-lg travel-shadow hover:travel-shadow-elevated travel-transition group cursor-pointer">
        <div className="p-4" onClick={handleViewDetails}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-base group-hover:text-primary travel-transition line-clamp-1">
              {attraction.name}
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
            <MapPin className="h-3 w-3" />
            <span>{attraction.location_name}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {attraction.short_description}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-primary">{attraction.city}</span>
            <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Explore
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
        <div className="aspect-video bg-gradient-to-br from-travel-success to-travel-ocean flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-2">{getAttractionEmoji(attraction.name)}</div>
            <p className="text-sm opacity-80">{attraction.city}</p>
          </div>
        </div>
        
        {/* Overlay Content */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-primary">
            {attraction.location_name}
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
      </div>

      {/* Content Section */}
      <div className="p-6" onClick={handleViewDetails}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 text-card-foreground group-hover:text-primary travel-transition line-clamp-2">
              {attraction.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{attraction.location_name}, {attraction.city}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {attraction.short_description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Navigation className="h-4 w-4" />
            <span>View on map</span>
          </div>
          <Button 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="travel-gradient-accent hover:shadow-md travel-transition text-white border-0"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;