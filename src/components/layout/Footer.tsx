import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-card via-muted/20 to-card border-t shadow-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="p-2 gradient-bg rounded-xl shadow-md group-hover:shadow-lg transition-smooth">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Eastleigh Jobs
              </h3>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Your premier job portal for Nairobi. Connecting job seekers with employers 
              across Kenya. Find your dream job or post positions for top talent.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <div className="p-1 bg-muted rounded-md mr-3">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Eastleigh, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <div className="p-1 bg-muted rounded-md mr-3">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+254794940900</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">For Employers</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all"></span>
                  Contact Support
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground flex items-center">
                  <span className="w-1 h-1 bg-muted rounded-full mr-3"></span>
                  Admin Access
                </span>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="border-t border-border/50 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Eastleigh Jobs. Made with ❤️ in Kenya
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted"
                title="Email us"
              >
                <Mail className="h-5 w-5" />
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted"
                title="Call us"
              >
                <Phone className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}