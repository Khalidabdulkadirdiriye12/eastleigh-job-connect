import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Calendar, 
  User,
  Star,
  Clock,
  DollarSign
} from "lucide-react";

interface ServiceProvider {
  id: string;
  user_id: string;
  name: string;
  photo_url?: string;
  service_type: string;
  location: string;
  experience_years: number;
  availability: string;
  gender: string;
  bio?: string;
  contact_info: string;
  hourly_rate?: string;
  languages?: string[];
  created_at: string;
}

interface ServiceProviderCardProps {
  provider: ServiceProvider;
  onClick: () => void;
  isLoggedIn: boolean;
}

export function ServiceProviderCard({ provider, onClick, isLoggedIn }: ServiceProviderCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'busy':
        return 'bg-warning text-warning-foreground';
      case 'not_available':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'not_available':
        return 'Not Available';
      default:
        return 'Unknown';
    }
  };

  const formatServiceType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/80 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarImage src={provider.photo_url} alt={provider.name} />
              <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                {getInitials(provider.name)}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-background ${
              provider.availability === 'available' 
                ? 'bg-success' 
                : provider.availability === 'busy' 
                ? 'bg-warning' 
                : 'bg-secondary'
            }`} />
          </div>

          {/* Name and Service Type */}
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {provider.name}
            </h3>
            <p className="text-primary font-medium">
              {formatServiceType(provider.service_type)}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-2 w-full">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{provider.location}</span>
            </div>
            
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{provider.experience_years} years experience</span>
            </div>

            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="capitalize">{provider.gender}</span>
            </div>

            {provider.hourly_rate && (
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>{provider.hourly_rate}/hour</span>
              </div>
            )}
          </div>

          {/* Availability Badge */}
          <Badge className={`${getAvailabilityColor(provider.availability)} px-3 py-1`}>
            <Clock className="h-3 w-3 mr-1" />
            {getAvailabilityText(provider.availability)}
          </Badge>

          {/* Languages */}
          {provider.languages && provider.languages.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {provider.languages.slice(0, 3).map((language, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {language}
                </Badge>
              ))}
              {provider.languages.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{provider.languages.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Action Hint */}
          <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            {isLoggedIn ? 'Click to view profile' : 'Sign in to view contact details'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}