
import { Post } from '@/data/data_types';

export interface FilteringOptions {
  posts: Post[];
  filterCoordinates: { lat: number; lng: number } | null;
  searchRadius?: number;
  searchLocation?: string;
  showAllByDefault?: boolean;
}

export interface FilteringResult {
  filteredPosts: Post[];
  loading: boolean;
}
