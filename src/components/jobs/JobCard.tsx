import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, MessageCircle, Building2, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  contact_info?: string | null;
  company_name: string;
  created_at: string;
  posted_by?: string;
}

interface JobCardProps {
  job: Job;
  isLoggedIn: boolean;
  showContactInfo: boolean;
  onJobClick: (job: Job) => void;
}

export function JobCard({ job, isLoggedIn, showContactInfo, onJobClick }: JobCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatSalary = (salary?: string) => {
    if (!salary) return null;
    return salary.startsWith('£') ? salary : `£${salary}`;
  };

  const formatContactInfo = (contact?: string | null) => {
    if (!contact) return null;
    
    const phoneRegex = /^(\+44|0)[\d\s\-()]{10,}$/;
    const isPhone = phoneRegex.test(contact.replace(/\s/g, ''));
    
    return {
      type: isPhone ? 'phone' : 'whatsapp',
      value: contact,
      icon: isPhone ? Phone : MessageCircle,
      href: isPhone ? `tel:${contact}` : `https://wa.me/${contact.replace(/\D/g, '')}`
    };
  };

  const contactInfo = job.contact_info ? formatContactInfo(job.contact_info) : null;
  const timeAgo = formatDistanceToNow(new Date(job.created_at), { addSuffix: true });
  
  const truncatedDescription = job.description.length > 150 
    ? job.description.substring(0, 150) + "..."
    : job.description;

  return (
    <Card className="card-hover cursor-pointer shadow-soft hover:shadow-medium transition-smooth" onClick={() => onJobClick(job)}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
          <CardTitle className="text-xl font-semibold text-primary hover:text-primary/80 transition-smooth">
            {job.title}
          </CardTitle>
          {job.salary && (
            <Badge variant="secondary" className="gradient-button text-white font-semibold px-3 py-1 self-start">
              {formatSalary(job.salary)}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground">{job.company_name}</p>
        </div>
      </CardHeader>

      <CardContent className="py-4">
        <div className="flex flex-wrap items-center text-muted-foreground mb-3 gap-2 sm:gap-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{timeAgo}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {showFullDescription ? job.description : truncatedDescription}
          </p>
          {job.description.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullDescription(!showFullDescription);
              }}
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium transition-smooth"
            >
              {showFullDescription ? "Read less" : "Read more"}
            </Button>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onJobClick(job);
            }}
            variant="outline" 
            className="flex-1 btn-secondary"
          >
            View Details
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
          
          {isLoggedIn && showContactInfo && contactInfo ? (
            <Button asChild className="flex-1 gradient-button text-white">
              <a 
                href={contactInfo.href} 
                className="flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <contactInfo.icon className="h-4 w-4 mr-2" />
                {contactInfo.type === 'phone' ? 'Call Now' : 'WhatsApp'}
              </a>
            </Button>
          ) : (
            <Button asChild className="flex-1 gradient-button text-white">
              <a href="/auth" onClick={(e) => e.stopPropagation()}>
                Sign In to Apply
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}