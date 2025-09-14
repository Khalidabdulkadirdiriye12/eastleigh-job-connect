import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceProviderCard } from "@/components/services/ServiceProviderCard";
import { ServiceProviderModal } from "@/components/services/ServiceProviderModal";
import { Search, Filter, Users } from "lucide-react";

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

export default function ServicesPage() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  
  // Modal states
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    checkUser();
    fetchProviders();
  }, []);

  useEffect(() => {
    filterProviders();
  }, [providers, searchTerm, serviceTypeFilter, locationFilter, availabilityFilter, genderFilter]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
    setCurrentUser(session?.user || null);

    if (session?.user) {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();
      
      setUserProfile(profile);
      setIsAdmin(profile?.role === 'admin');
    }
  };

  const fetchProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProviders(data || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProviders = () => {
    let filtered = providers;

    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (serviceTypeFilter) {
      filtered = filtered.filter(provider => provider.service_type === serviceTypeFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter(provider =>
        provider.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (availabilityFilter) {
      filtered = filtered.filter(provider => provider.availability === availabilityFilter);
    }

    if (genderFilter) {
      filtered = filtered.filter(provider => provider.gender === genderFilter);
    }

    setFilteredProviders(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setServiceTypeFilter("");
    setLocationFilter("");
    setAvailabilityFilter("");
    setGenderFilter("");
  };

  const handleProviderClick = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Service Providers
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find trusted professionals for all your household and business needs in Nairobi, Kenya
          </p>
        </div>

        {/* Action Buttons - Only show for admin */}
        {isLoggedIn && isAdmin && (
          <div className="flex justify-center mb-8">
            <p className="text-center text-muted-foreground">
              Service providers are managed through the Admin Dashboard.{' '}
              <a href="/admin/dashboard" className="text-primary hover:underline">
                Go to Admin Dashboard
              </a>
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Find Service Providers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="relative xl:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, service, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maid">Maid</SelectItem>
                <SelectItem value="watchman">Watchman</SelectItem>
                <SelectItem value="cleaner">Cleaner</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="cook">Cook</SelectItem>
                <SelectItem value="gardener">Gardener</SelectItem>
                <SelectItem value="nanny">Nanny</SelectItem>
                <SelectItem value="security_guard">Security Guard</SelectItem>
                <SelectItem value="handyman">Handyman</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="not_available">Not Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              {filteredProviders.length} service provider{filteredProviders.length !== 1 ? 's' : ''} found
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Provider List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No service providers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters or check back later for new providers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProviders.map((provider) => (
              <ServiceProviderCard
                key={provider.id}
                provider={provider}
                onClick={() => handleProviderClick(provider)}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
      
      <ServiceProviderModal
        provider={selectedProvider}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}