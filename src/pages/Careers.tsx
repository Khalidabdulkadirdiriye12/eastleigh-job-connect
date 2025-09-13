import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  MapPin, 
  Star, 
  TrendingUp, 
  Clock, 
  Heart,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const benefits = [
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible hours and remote work options to help you maintain a healthy balance."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear progression paths and opportunities for professional development."
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with passionate, talented individuals who support each other."
    },
    {
      icon: Star,
      title: "Competitive Benefits",
      description: "Comprehensive benefits package including health insurance and pension."
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We embrace new ideas and technologies to solve problems creatively."
    },
    {
      title: "Community",
      description: "We're committed to supporting local businesses and job seekers in Eastleigh."
    },
    {
      title: "Excellence",
      description: "We strive for quality in everything we do, from code to customer service."
    },
    {
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical business practices."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Be part of the mission to connect talent with opportunity in Eastleigh. 
            Build the future of local employment with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Link to="/jobs">
                View Open Positions
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Why Work With Us */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Work With Us?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            We're building something special - a platform that genuinely makes a difference 
            in people's careers and local businesses' success.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-hover shadow-soft text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our company culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-secondary mt-1" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="gradient-card rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Growing Together
            </h2>
            <p className="text-lg text-muted-foreground">
              Join a team that's making a real impact in the local community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Local Employers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">Job Seekers Helped</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </section>

        {/* Current Openings Preview */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Current Opportunities
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for talented individuals to join our mission.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="card-hover shadow-soft text-left">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">Frontend Developer</CardTitle>
                  <Badge className="gradient-button text-white">Full-time</Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Eastleigh / Remote</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join our development team to build amazing user experiences with React and TypeScript.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted 2 days ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover shadow-soft text-left">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">UX/UI Designer</CardTitle>
                  <Badge className="gradient-button text-white">Full-time</Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Eastleigh / Remote</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Design intuitive and beautiful interfaces that delight our users and employers.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted 1 week ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover shadow-soft text-left">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">Community Manager</CardTitle>
                  <Badge className="gradient-button text-white">Part-time</Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Eastleigh</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Build relationships with local businesses and help grow our community presence.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted 3 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button asChild size="lg" className="gradient-button text-white">
            <Link to="/jobs">
              View All Positions
              <Briefcase className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-primary/5 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't see the perfect role? We're always interested in hearing from talented 
            individuals who share our vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-button text-white">
              <Link to="/contact">
                Send Us Your CV
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;