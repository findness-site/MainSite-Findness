
-- First, let's add a proper name field to store human-readable location names
-- We'll update the existing location jsonb to include a proper 'name' field

-- Update existing posts with human-readable location names based on their coordinates
-- This uses reverse geocoding logic to assign realistic UK place names

UPDATE posts SET location = jsonb_set(location, '{name}', '"Manchester"') 
WHERE (location->>'lat')::float BETWEEN 53.45 AND 53.55 
AND (location->>'lng')::float BETWEEN -2.35 AND -2.15;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Birmingham"') 
WHERE (location->>'lat')::float BETWEEN 52.45 AND 52.55 
AND (location->>'lng')::float BETWEEN -1.95 AND -1.85;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Liverpool"') 
WHERE (location->>'lat')::float BETWEEN 53.35 AND 53.45 
AND (location->>'lng')::float BETWEEN -3.05 AND -2.85;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Leeds"') 
WHERE (location->>'lat')::float BETWEEN 53.75 AND 53.85 
AND (location->>'lng')::float BETWEEN -1.60 AND -1.50;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Sheffield"') 
WHERE (location->>'lat')::float BETWEEN 53.35 AND 53.45 
AND (location->>'lng')::float BETWEEN -1.50 AND -1.40;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Bristol"') 
WHERE (location->>'lat')::float BETWEEN 51.40 AND 51.50 
AND (location->>'lng')::float BETWEEN -2.65 AND -2.55;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Newcastle"') 
WHERE (location->>'lat')::float BETWEEN 54.95 AND 55.05 
AND (location->>'lng')::float BETWEEN -1.65 AND -1.55;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Nottingham"') 
WHERE (location->>'lat')::float BETWEEN 52.90 AND 53.00 
AND (location->>'lng')::float BETWEEN -1.20 AND -1.10;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Southampton"') 
WHERE (location->>'lat')::float BETWEEN 50.85 AND 50.95 
AND (location->>'lng')::float BETWEEN -1.45 AND -1.35;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Portsmouth"') 
WHERE (location->>'lat')::float BETWEEN 50.75 AND 50.85 
AND (location->>'lng')::float BETWEEN -1.15 AND -1.05;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Leicester"') 
WHERE (location->>'lat')::float BETWEEN 52.60 AND 52.70 
AND (location->>'lng')::float BETWEEN -1.15 AND -1.05;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Coventry"') 
WHERE (location->>'lat')::float BETWEEN 52.35 AND 52.45 
AND (location->>'lng')::float BETWEEN -1.55 AND -1.45;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Bradford"') 
WHERE (location->>'lat')::float BETWEEN 53.75 AND 53.85 
AND (location->>'lng')::float BETWEEN -1.80 AND -1.70;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Cardiff"') 
WHERE (location->>'lat')::float BETWEEN 51.45 AND 51.55 
AND (location->>'lng')::float BETWEEN -3.25 AND -3.15;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Belfast"') 
WHERE (location->>'lat')::float BETWEEN 54.55 AND 54.65 
AND (location->>'lng')::float BETWEEN -6.00 AND -5.90;

UPDATE posts SET location = jsonb_set(location, '{name}', '"Edinburgh"') 
WHERE (location->>'lat')::float BETWEEN 55.90 AND 56.00 
AND (location->>'lng')::float BETWEEN -3.25 AND -3.15;

-- For any remaining posts that don't match the above ranges, give them generic but reasonable names
UPDATE posts SET location = jsonb_set(location, '{name}', '"Local Area"') 
WHERE location->>'name' LIKE 'Location at%';
