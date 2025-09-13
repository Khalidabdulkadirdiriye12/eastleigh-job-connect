import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  DollarSign, 
  Phone, 
  MessageCircle, 
  Building2, 
  Calendar,
  User,
  ExternalLink
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  contact_info?: string;
  company_name: string;
  created_at: string;
  posted_by?: string;
}

interface JobModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

export function JobModal({ job, isOpen, onClose, isLoggedIn }: JobModalProps) {
  if (!job) return null;

  const formatSalary = (salary?: string) => {
    if (!salary) return null;
    return salary.startsWith('KSH') ? salary : salary.startsWith('£') ? salary : `KSH ${salary}`;
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

  const contactInfo = formatContactInfo(job.contact_info);
  const timeAgo = formatDistanceToNow(new Date(job.created_at), { addSuffix: true });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-primary leading-tight">
                {job.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground">{job.company_name}</span>
              </div>
            </div>
            {job.salary && (
              <Badge variant="secondary" className="text-lg font-semibold px-3 py-1 gradient-button text-white">
                {formatSalary(job.salary)}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Posted {timeAgo}</span>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Job Description
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            {isLoggedIn ? (
              contactInfo ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    asChild 
                    className="flex-1 gradient-button text-white hover:opacity-90"
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
                  Sign in to view contact information and apply for this position
                </p>
                <Button asChild className="gradient-button text-white">
                  <a href="/auth">Sign In to Apply</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}