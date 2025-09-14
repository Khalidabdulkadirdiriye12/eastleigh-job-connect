-- Create enum for service types
CREATE TYPE public.service_type AS ENUM (
  'maid',
  'watchman', 
  'cleaner',
  'driver',
  'cook',
  'gardener',
  'nanny',
  'security_guard',
  'handyman',
  'other'
);

-- Create enum for availability status
CREATE TYPE public.availability_status AS ENUM (
  'available',
  'not_available',
  'busy'
);

-- Create enum for gender
CREATE TYPE public.gender AS ENUM (
  'male',
  'female',
  'other'
);

-- Create service_providers table
CREATE TABLE public.service_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  photo_url TEXT,
  service_type service_type NOT NULL,
  location TEXT NOT NULL,
  experience_years INTEGER DEFAULT 0,
  availability availability_status NOT NULL DEFAULT 'available',
  gender gender NOT NULL,
  bio TEXT,
  contact_info TEXT NOT NULL,
  hourly_rate TEXT,
  languages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;

-- Create policies for service_providers
CREATE POLICY "Everyone can view service providers" 
ON public.service_providers 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own provider profile" 
ON public.service_providers 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own provider profile" 
ON public.service_providers 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own provider profile" 
ON public.service_providers 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_service_providers_updated_at
BEFORE UPDATE ON public.service_providers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_service_providers_service_type ON public.service_providers(service_type);
CREATE INDEX idx_service_providers_location ON public.service_providers(location);
CREATE INDEX idx_service_providers_availability ON public.service_providers(availability);
CREATE INDEX idx_service_providers_user_id ON public.service_providers(user_id);