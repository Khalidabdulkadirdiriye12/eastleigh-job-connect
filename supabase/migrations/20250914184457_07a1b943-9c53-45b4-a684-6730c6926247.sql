-- Update RLS policies for service_providers to be admin-only managed
DROP POLICY IF EXISTS "Users can create their own provider profile" ON public.service_providers;
DROP POLICY IF EXISTS "Users can update their own provider profile" ON public.service_providers;
DROP POLICY IF EXISTS "Users can delete their own provider profile" ON public.service_providers;

-- Create new admin-only policies
CREATE POLICY "Only admins can create service providers" 
ON public.service_providers 
FOR INSERT 
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update service providers" 
ON public.service_providers 
FOR UPDATE 
USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete service providers" 
ON public.service_providers 
FOR DELETE 
USING (is_admin(auth.uid()));