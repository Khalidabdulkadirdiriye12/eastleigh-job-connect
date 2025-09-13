import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, MapPin, Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About Eastleigh Jobs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're passionate about connecting local talent with opportunities in Eastleigh. 
            Our platform makes it easy for job seekers to find work and employers to find great candidates.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle>Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To bridge the gap between local employers and job seekers in Eastleigh by providing 
                a simple, direct platform that facilitates meaningful employment connections within our community.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-6 w-6 text-secondary" />
                <CardTitle>Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the go-to platform for employment opportunities in Eastleigh, 
                fostering economic growth and helping build a stronger, more connected local community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Job Listings</h3>
              <p className="text-muted-foreground">
                We provide a platform for local employers to post job opportunities 
                across various industries and skill levels in the Eastleigh area.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Direct Connections</h3>
              <p className="text-muted-foreground">
                Our platform facilitates direct communication between job seekers and employers, 
                eliminating unnecessary intermediaries and speeding up the hiring process.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Local Focus</h3>
              <p className="text-muted-foreground">
                We specialize in opportunities within Eastleigh and surrounding areas, 
                supporting local businesses and helping residents find work close to home.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <Card className="mb-16">
          <CardHeader>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-secondary" />
              <CardTitle className="text-center">Why Choose Eastleigh Jobs?</CardTitle>
            </div>
            <CardDescription className="text-center">
              Here's what makes us different from other job platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">🎯 Local Focus</h4>
                  <p className="text-sm text-muted-foreground">
                    Exclusively focused on Eastleigh opportunities, ensuring relevance for our community.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">⚡ Direct Contact</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect directly with employers via phone or WhatsApp - no lengthy application processes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">💼 All Industries</h4>
                  <p className="text-sm text-muted-foreground">
                    From retail to professional services, we cover all types of employment opportunities.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">🆓 Free to Use</h4>
                  <p className="text-sm text-muted-foreground">
                    Completely free for job seekers to browse and apply to positions.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">📱 Mobile Friendly</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimized for mobile devices so you can search for jobs on the go.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">🤝 Community Driven</h4>
                  <p className="text-sm text-muted-foreground">
                    Built by and for the Eastleigh community to support local economic growth.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're looking for your next opportunity or have positions to fill, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#jobs" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2"
            >
              Browse Jobs
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;