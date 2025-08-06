
import { createClient } from '@supabase/supabase-js';

// Using environment variables for Supabase URL and anon key
// These should be set in Lovable's secrets
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rehmwvkkhomzhphwmawt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaG13dmtraG9temhwaHdtYXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTkyMzksImV4cCI6MjA2MTQ5NTIzOX0.TWWYFBJj1ptNXpjsVOOv0FIxDv4KC-c8_cS06rbwBLI';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("Using hardcoded Supabase credentials. It's recommended to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in project secrets.");
}

// Initialize the Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Define database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          image_url: string;
          username: string;
          location: {
            lat: number;
            lng: number;
          };
          timestamp: string;
          created_at?: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          username: string;
          location: {
            lat: number;
            lng: number;
          };
          timestamp: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          username?: string;
          location?: {
            lat: number;
            lng: number;
          };
          timestamp?: string;
          created_at?: string;
        };
      };
    };
    // Add other tables as needed
  };
};
