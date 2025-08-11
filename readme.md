## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

Folders in order:
  1,Root index.html

  This is Vite's entry point during development
  Vite serves this file and injects the compiled JavaScript/CSS
  Contains a <div id="root"></div> where React mounts
  References /src/main.tsx via a script tag

  2,src/ folder

  Contains your source code (uncompiled)
  main.tsx: The entry point that renders your React app
  App.tsx: Your main React component
  This code needs to be built/compiled before deployment.
  "npm run dev" uses this

  3,public/ folder (Firebase)

  Contains static files served directly by Firebase
  Should contain your built/compiled application
  This is what visitors actually receive

  Overall: 
  src/ (source code) → npm run build → dist/ (browser-ready files)

Given code's database reply:

1. Database Structure
  The project uses Supabase (PostgreSQL) with this structure:

  posts table:

  id - UUID (primary key, auto-generated)
  image_url - Text (URL to uploaded image)
  username - Text (who posted it)
  location - JSONB (coordinates: {lat: number, lng: number})
  timestamp - Timestamp (when posted)
  created_at - Timestamp (database creation time)
  RLS Policies:

  Anyone can view posts (SELECT)
  Anyone can insert posts (INSERT)
  No UPDATE/DELETE allowed

2. Site Communication
  The site communicates via the Supabase JavaScript client:

  Uses REST API calls through @supabase/supabase-js
  Configured in src/lib/supabase.ts
  Direct database queries like: supabase.from('posts').select('*')

3. Database-Connected Files
  Core Database Files:

  src/lib/supabase.ts - Client configuration & types
  src/hooks/usePostsFetcher.ts - Fetches all posts from database
  src/pages/Post.tsx - Saves new posts to database
  Data Flow:

  Camera → Post page → Supabase database
  Database → usePostsFetcher → PostsFeed → UI display
  The app is essentially a photo-posting platform where users capture images with location data and store them in Supabase for others to view.

Example:

1. Posting a New Item - Example Flow
User Action: Takes photo on /camera → Reviews on /post → Clicks "Post it"

Code Flow:


// In src/pages/Post.tsx - savePost function
const savePost = async () => {
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      image_url: photo,           // "data:image/jpeg;base64,/9j/4AAQ..."
      username: username,         // "john_doe"
      location: location_,        // {lat: 51.5074, lng: -0.1278}
      timestamp: new Date().toISOString()
    }]);
}
Database Result: New row in posts table with all the data.

2. Loading New Item on List - Example Flow
Code Flow:


// In src/hooks/usePostsFetcher.ts
const { data: supabasePosts, error } = await supabase
  .from('posts')
  .select('*');

// Transforms to UI format:
{
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Found Item",
  image: "data:image/jpeg;base64,/9j/4AAQ...",
  location: {name: "Posted Location", lat: 51.5074, lng: -0.1278},
  username: "john_doe"
}
UI Result: New post appears in PostsList component automatically.

3. Database Console Access
Within Lovable: No direct database console available.

External Access: Yes! Supabase provides a full SQL editor:

Go to: https://supabase.com/dashboard/project/rehmwvkkhomzhphwmawt/sql/new
Run queries like: SELECT * FROM posts ORDER BY created_at DESC;
Full PostgreSQL access with table browser, RLS policy editor, etc.
The Supabase dashboard gives you complete database management outside of Lovable.