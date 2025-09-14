import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  DollarSign, 
  Phone, 
  MessageCircle, 
  Calendar,
  User,
  ExternalLink,
  Clock,
  Star,
  Languages
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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

interface ServiceProviderModalProps {
  provider: ServiceProvider | null;
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

export function ServiceProviderModal({ provider, isOpen, onClose, isLoggedIn }: ServiceProviderModalProps) {
  if (!provider) return null;

  const formatContactInfo = (contact?: string | null) => {
    if (!contact) return null;
    
    const phoneRegex = /^(\+254|254|07)[\d\s\-()]{8,}$/;
    const isPhone = phoneRegex.test(contact.replace(/\s/g, ''));
    
    return {
      type: isPhone ? 'phone' : 'whatsapp',
      value: contact,
      icon: isPhone ? Phone : MessageCircle,
      href: isPhone ? `tel:${contact}` : `https://wa.me/${contact.replace(/\D/g, '')}`
    };
  };

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
        return 'Available Now';
      case 'busy':
        return 'Currently Busy';
      case 'not_available':
        return 'Not Available';
      default:
        return 'Status Unknown';
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

  const contactInfo = formatContactInfo(provider.contact_info);
  const timeAgo = formatDistanceToNow(new Date(provider.created_at), { addSuffix: true });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <Avatar className="h-20 w-20 border-4 border-primary/20">
                <AvatarImage src={provider.photo_url} alt={provider.name} />
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {getInitials(provider.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <DialogTitle className="text-2xl font-bold text-primary leading-tight">
                  {provider.name}
                </DialogTitle>
                <p className="text-lg font-medium text-foreground mt-1">
                  {formatServiceType(provider.service_type)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground capitalize">{provider.gender}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Badge className={`${getAvailabilityColor(provider.availability)} text-sm font-semibold px-3 py-2`}>
                <Clock className="h-4 w-4 mr-1" />
                {getAvailabilityText(provider.availability)}
              </Badge>
              {provider.hourly_rate && (
                <Badge variant="secondary" className="text-sm font-semibold px-3 py-2 bg-accent text-accent-foreground">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {provider.hourly_rate}/hour
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{provider.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{provider.experience_years} years experience</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Joined {timeAgo}</span>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-6" />

        <div className="space-y-6">
          {/* Bio */}
          {provider.bio && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <User className="h-5 w-5" />
                About
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {provider.bio}
                </p>
              </div>
            </div>
          )}

          {/* Languages */}
          {provider.languages && provider.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {provider.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            {isLoggedIn ? (
              contactInfo ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    asChild 
                    className="flex-1 btn-primary"
                  >
                    <a href={contactInfo.href} className="flex items-center justify-center gap-2">
                      <contactInfo.icon className="h-4 w-4" />
                      {contactInfo.type === 'phone' ? 'Call Now' : 'Message on WhatsApp'}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  <div className="flex items-center justify-center text-muted-foreground bg-muted px-3 py-2 rounded-md">
                    {contactInfo.value}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  No contact information available
                </div>
              )
            ) : (
              <div className="text-center py-6 space-y-3">
                <p className="text-muted-foreground">
                  Sign in to view contact information and connect with this service provider
                </p>
                <Button asChild className="btn-primary">
                  <a href="/auth">Sign In to Contact</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}