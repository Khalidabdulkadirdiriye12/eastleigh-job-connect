import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User as UserIcon, Settings, Plus, BarChart3, Briefcase, Menu, X } from "lucide-react";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user profile when logged in
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setUserProfile(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <header className="border-b bg-card shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
          <Briefcase className="h-6 w-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold gradient-bg bg-clip-text text-transparent">
            Eastleigh Jobs
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-smooth font-medium">
            Home
          </Link>
          <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-smooth font-medium">
            Browse Jobs
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth font-medium">
            About
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth font-medium">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="font-bold text-primary">Eastleigh Jobs</span>
                </Link>
              </div>
              
              <nav className="space-y-4">
                <Link 
                  to="/" 
                  className="mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/jobs" 
                  className="mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Jobs
                </Link>
                <Link 
                  to="/about" 
                  className="mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="mobile-nav-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {user && isAdmin && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-medium text-foreground mb-2">Admin Panel</h3>
                      <Link 
                        to="/admin/post-job" 
                        className="mobile-nav-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Plus className="h-4 w-4 mr-2 inline" />
                        Post Job
                      </Link>
                      <Link 
                        to="/admin/dashboard" 
                        className="mobile-nav-item"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BarChart3 className="h-4 w-4 mr-2 inline" />
                        Dashboard
                      </Link>
                    </div>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          {/* Desktop User Menu */}
          {user ? (
            <>
              {isAdmin && (
                <div className="hidden lg:flex items-center space-x-2">
                  <Button asChild variant="outline" size="sm" className="btn-secondary">
                    <Link to="/admin/post-job">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Job
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="btn-secondary">
                    <Link to="/admin/dashboard">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                </div>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative transition-smooth hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userProfile?.full_name?.charAt(0) || user.email?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isAdmin && (
                      <Badge variant="secondary" className="ml-2 text-xs gradient-button text-white">
                        Admin
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="transition-smooth">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="transition-smooth">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="transition-smooth">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild className="gradient-button text-white font-medium px-6">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}