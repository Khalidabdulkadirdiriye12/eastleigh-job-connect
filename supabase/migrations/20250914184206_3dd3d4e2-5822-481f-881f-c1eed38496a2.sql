-- Create storage bucket for service provider photos
INSERT INTO storage.buckets (id, name, public) VALUES ('service-photos', 'service-photos', true);

-- Create storage policies for service provider photos
CREATE POLICY "Service photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'service-photos');

CREATE POLICY "Authenticated users can upload service photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'service-photos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own service photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'service-photos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own service photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'service-photos' AND auth.uid() IS NOT NULL);