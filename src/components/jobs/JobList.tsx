import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { JobCard } from "./JobCard";
import { JobModal } from "./JobModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Loader2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  contact_info?: string | null; // Made optional and nullable for security
  company_name: string;
  created_at: string;
  posted_by?: string;
}

interface JobListProps {
  isLoggedIn: boolean;
}

export function JobList({ isLoggedIn }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [isLoggedIn]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, locationFilter]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const fetchJobs = async () => {
    try {
      let query;
      
      if (isLoggedIn) {
        // Authenticated users can see all job details including contact info
        query = supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });
      } else {
        // Anonymous users can only see job details WITHOUT contact info
        query = supabase
          .from('jobs')
          .select('id, title, description, location, salary, company_name, created_at, posted_by')
          .order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // For anonymous users, we explicitly set contact_info to null to prevent any leakage
      const sanitizedData = isLoggedIn 
        ? data 
        : (data || []).map(job => ({ ...job, contact_info: null }));

      setJobs(sanitizedData || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchTerm.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter.trim()) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="w-full">
      {/* Search and Filter Form */}
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search jobs by title, description, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => {
              setSearchTerm("");
              setLocationFilter("");
            }}
            variant="outline"
            className="px-6"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Job Results */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <div className="text-6xl opacity-20">🔍</div>
          <p className="text-muted-foreground text-lg font-medium">No jobs found matching your criteria</p>
          <p className="text-muted-foreground text-sm">Try adjusting your search terms or location filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isLoggedIn={isLoggedIn}
              showContactInfo={true}
              onJobClick={handleJobClick}
            />
          ))}
        </div>
      )}

      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}