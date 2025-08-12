export interface Post {
  id: string;
  image_url: string;    // <--- Changed from 'image'
  username: string;
  location: { 
    lat: number; 
    lng: number; 
    name?: string; // The 'name' field is optional
  };
  timestamp: number;
  created_at: number;
  // 'title' is removed
}