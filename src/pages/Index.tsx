import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobList } from "@/components/jobs/JobList";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Compact Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Find Jobs in Eastleigh
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse opportunities, connect directly with employers
          </p>
          
          {!user && (
            <Button 
              asChild 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link to="/auth">
                Sign Up to View Contact Info
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Main Jobs Section */}
      <section id="jobs" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Latest Job Opportunities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover your next career move with jobs from local employers in Eastleigh
            </p>
          </div>
          
          <JobList isLoggedIn={!!user} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Job Opportunities</h3>
              <p className="text-muted-foreground">Find the perfect role for you</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Direct Contact</h3>
              <p className="text-muted-foreground">Connect directly with employers</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Local Jobs</h3>
              <p className="text-muted-foreground">Opportunities in Eastleigh area</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
