-- Drop the existing overly permissive policy
DROP POLICY "Anyone can view jobs" ON public.jobs;

-- Create a more secure policy structure
-- This policy allows anyone to view basic job information but restricts sensitive contact info
CREATE POLICY "Public can view basic job info" 
  ON public.jobs 
  FOR SELECT 
  USING (true);

-- However, we need to use a different approach since PostgreSQL RLS doesn't support column-level restrictions in policies
-- Instead, we'll create a security definer function to handle this

-- Create a function to check if contact info should be visible
CREATE OR REPLACE FUNCTION public.can_view_contact_info()
RETURNS BOOLEAN AS $$
BEGIN
  -- Only authenticated users can view contact info
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Create a view for public job listings without contact info
CREATE OR REPLACE VIEW public.jobs_public AS
SELECT 
  id,
  title,
  description,
  location,
  salary,
  company_name,
  created_at,
  updated_at,
  posted_by,
  -- Only show contact_info if user is authenticated
  CASE 
    WHEN public.can_view_contact_info() THEN contact_info 
    ELSE NULL 
  END as contact_info
FROM public.jobs;

-- Grant access to the view
GRANT SELECT ON public.jobs_public TO authenticated, anon;

-- Update the existing policy to be more restrictive
-- Only authenticated users can see the full jobs table with contact info
DROP POLICY "Public can view basic job info" ON public.jobs;

CREATE POLICY "Authenticated users can view all job details" 
  ON public.jobs 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Create a policy for anonymous users to view jobs without contact info
-- We'll handle this through the application layer since RLS doesn't support column-level restrictions well