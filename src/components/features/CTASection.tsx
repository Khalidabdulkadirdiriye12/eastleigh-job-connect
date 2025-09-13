import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  Search, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Target,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  const features = [
    {
      icon: Search,
      title: "Smart Job Search",
      description: "Find opportunities that match your skills and location preferences"
    },
    {
      icon: Users,
      title: "Direct Employer Contact",
      description: "Connect directly with hiring managers and employers"
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get notified immediately when new jobs in your field are posted"
    },
    {
      icon: Target,
      title: "Location-Based",
      description: "Focus on opportunities in Nairobi and surrounding areas"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Join 1000+ Job Seekers
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Your Career Journey
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Starts Here
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have found their dream jobs through our platform. 
            Whether you're starting your career or making a change, we're here to help.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="card-glass border-0 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 mx-auto w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Free to Use</h4>
                  <p className="text-muted-foreground text-sm">Browse jobs and connect with employers at no cost</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Verified Employers</h4>
                  <p className="text-muted-foreground text-sm">All job postings are from verified local businesses</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Quick Applications</h4>
                  <p className="text-muted-foreground text-sm">Apply directly through phone or WhatsApp contact</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-card to-muted/50 p-8 rounded-2xl shadow-xl border">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Ready to Get Started?</h3>
                <p className="text-muted-foreground">Join our community and take the next step in your career</p>
              </div>
              
              <div className="space-y-4">
                <Button asChild className="w-full btn-primary text-lg py-6">
                  <Link to="/auth">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full btn-secondary">
                  <Link to="/jobs">
                    Browse Jobs First
                    <Briefcase className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>1000+ Users</span>
                </div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 text-primary mr-1" />
                  <span>500+ Jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}