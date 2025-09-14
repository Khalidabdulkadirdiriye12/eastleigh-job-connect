import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const serviceProviderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  photo_url: z.string().url().optional().or(z.literal("")),
  service_type: z.enum([
    "maid", "watchman", "cleaner", "driver", "cook", 
    "gardener", "nanny", "security_guard", "handyman", "other"
  ]),
  location: z.string().min(2, "Location is required"),
  experience_years: z.number().min(0).max(50),
  availability: z.enum(["available", "not_available", "busy"]),
  gender: z.enum(["male", "female", "other"]),
  bio: z.string().optional(),
  contact_info: z.string().min(10, "Contact information is required"),
  hourly_rate: z.string().optional(),
  languages: z.array(z.string()).optional(),
});

type ServiceProviderFormData = z.infer<typeof serviceProviderSchema>;

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

interface ServiceProviderFormProps {
  provider?: ServiceProvider | null;
  onSuccess: () => void;
}

const availableLanguages = [
  "English", "Swahili", "French", "Spanish", "Arabic", "Kikuyu", "Luo", "Luhya", "Kalenjin", "Kamba"
];

export function ServiceProviderForm({ provider, onSuccess }: ServiceProviderFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(provider?.languages || []);
  const { toast } = useToast();

  const form = useForm<ServiceProviderFormData>({
    resolver: zodResolver(serviceProviderSchema),
    defaultValues: {
      name: provider?.name || "",
      photo_url: provider?.photo_url || "",
      service_type: (provider?.service_type as any) || "maid",
      location: provider?.location || "",
      experience_years: provider?.experience_years || 0,
      availability: (provider?.availability as any) || "available",
      gender: (provider?.gender as any) || "male",
      bio: provider?.bio || "",
      contact_info: provider?.contact_info || "",
      hourly_rate: provider?.hourly_rate || "",
      languages: provider?.languages || [],
    },
  });

  useEffect(() => {
    form.setValue("languages", selectedLanguages);
  }, [selectedLanguages, form]);

  const onSubmit = async (data: ServiceProviderFormData) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const insertData = {
        user_id: provider?.user_id || crypto.randomUUID(), // Use existing user_id or generate new one for admin-created providers
        name: data.name,
        photo_url: data.photo_url || null,
        service_type: data.service_type,
        location: data.location,
        experience_years: data.experience_years,
        availability: data.availability,
        gender: data.gender,
        bio: data.bio || null,
        contact_info: data.contact_info,
        hourly_rate: data.hourly_rate || null,
        languages: selectedLanguages,
      };

      if (provider) {
        // Update existing provider
        const { error } = await supabase
          .from('service_providers')
          .update(insertData)
          .eq('id', provider.id);

        if (error) throw error;
        
        toast({
          title: "Profile updated successfully!",
          description: "Your service provider profile has been updated.",
        });
      } else {
        // Create new provider
        const { error } = await supabase
          .from('service_providers')
          .insert(insertData);

        if (error) throw error;
        
        toast({
          title: "Profile created successfully!",
          description: "Your service provider profile is now live.",
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error('Error saving provider:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages(prev => [...prev, language]);
    } else {
      setSelectedLanguages(prev => prev.filter(l => l !== language));
    }
  };

  const formatServiceType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/photo.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="service_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Eastleigh, Nairobi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="experience_years"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    max="50" 
                    {...field} 
                    onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="not_available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contact_info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Information</FormLabel>
                <FormControl>
                  <Input placeholder="+254794940900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hourly_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Rate (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="KSH 500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell potential clients about yourself, your experience, and what makes you special..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Languages (Select all that apply)</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {availableLanguages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={(checked) => handleLanguageChange(language, !!checked)}
                />
                <label
                  htmlFor={language}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {language}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="btn-primary flex-1">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {provider ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
}