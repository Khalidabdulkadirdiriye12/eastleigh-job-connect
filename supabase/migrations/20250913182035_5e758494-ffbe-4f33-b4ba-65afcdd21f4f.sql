-- First, let's create a sample admin user if one doesn't exist
-- We'll use a placeholder UUID that we can reference
INSERT INTO profiles (id, full_name, role) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Admin User', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Now insert sample jobs
INSERT INTO jobs (title, description, location, salary, contact_info, company_name, posted_by) VALUES 
('Sales Assistant', 'We are looking for a friendly and motivated Sales Assistant to join our team. You will be responsible for helping customers, processing sales, and maintaining store displays. Previous retail experience preferred but not required. Full training provided.', 'Eastleigh Town Centre', '£9.50/hour', '+44 7700 900123', 'Electronics Plus', '00000000-0000-0000-0000-000000000001'),
('Barista', 'Join our busy coffee shop as a Barista! We need someone with a passion for coffee and great customer service skills. You will be making drinks, serving food, and creating a welcoming atmosphere for our customers. Experience with coffee machines preferred.', 'High Street, Eastleigh', '£10.00/hour', '+44 7700 900456', 'The Daily Grind Café', '00000000-0000-0000-0000-000000000001'),
('Delivery Driver', 'Local delivery driver needed for our growing business. Must have a clean driving license and own vehicle. Flexible hours available including weekends. Great opportunity for someone looking for part-time or full-time work.', 'Eastleigh Industrial Estate', '£12.00/hour + fuel allowance', '07700900789', 'QuickDelivery Services', '00000000-0000-0000-0000-000000000001');