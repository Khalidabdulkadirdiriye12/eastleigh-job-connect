import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Phone, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    location: string;
    salary?: string;
    contact_info: string;
    company_name: string;
    created_at: string;
  };
  isLoggedIn: boolean;
  showContactInfo?: boolean;
}

export function JobCard({ job, isLoggedIn, showContactInfo = true }: JobCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatSalary = (salary?: string) => {
    if (!salary) return null;
    return salary.includes('$') ? salary : `$${salary}`;
  };

  const formatContactInfo = (contact: string) => {
    // Check if it's a phone number (contains only numbers, spaces, dashes, parentheses, plus)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    const isPhone = phoneRegex.test(contact.replace(/\s/g, ''));
    
    if (isPhone) {
      return {
        type: 'phone',
        value: contact,
        icon: Phone,
        href: `tel:${contact.replace(/\s/g, '')}`,
      };
    } else {
      // Assume it's WhatsApp or other contact method
      return {
        type: 'whatsapp',
        value: contact,
        icon: MessageCircle,
        href: `https://wa.me/${contact.replace(/\D/g, '')}`,
      };
    }
  };

  const contactInfo = formatContactInfo(job.contact_info);
  const timeAgo = formatDistanceToNow(new Date(job.created_at), { addSuffix: true });
  
  const truncatedDescription = job.description.length > 150 
    ? job.description.substring(0, 150) + "..."
    : job.description;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 hover:scale-[1.02] transform">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-primary hover:text-primary/80 cursor-pointer">
              {job.title}
            </CardTitle>
            <p className="text-muted-foreground font-medium">{job.company_name}</p>
          </div>
          {job.salary && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              <DollarSign className="h-3 w-3 mr-1" />
              {formatSalary(job.salary)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          {job.location}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {timeAgo}
        </div>

        <div className="text-sm">
          <p className="text-foreground">
            {showFullDescription ? job.description : truncatedDescription}
          </p>
          {job.description.length > 150 && (
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show less" : "Read more"}
            </Button>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {isLoggedIn && showContactInfo ? (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Contact Employer:</span>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <a href={contactInfo.href} target="_blank" rel="noopener noreferrer">
                  <contactInfo.icon className="h-4 w-4 mr-2" />
                  {contactInfo.value}
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <Button
            asChild
            variant="secondary"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <Link to="/auth">
              Login to view contact info
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}