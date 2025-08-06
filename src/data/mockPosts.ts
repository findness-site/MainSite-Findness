
export interface Post {
  id: string;
  title: string;
  description: string;
  image?: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  distance?: number; // in miles
  date: string;
  username: string;
}

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Lost Beanie",
    description: "Black beanie hat lost on wooden fence near park entrance",
    image: "/lovable-uploads/92421672-38d3-4a1d-af43-fc40208ab4bb.png",
    location: {
      name: "Liverpool, UK",
      lat: 53.4084,
      lng: -2.9916
    },
    date: "2025-04-26",
    username: "Sarah"
  },
  {
    id: "2", 
    title: "Lost Croc",
    description: "Lime green croc shoe left on wall outside house",
    image: "/lovable-uploads/2c081867-ce10-4c37-ad4e-087cd78633fe.png",
    location: {
      name: "Norwich, UK",
      lat: 52.6309,
      lng: 1.2974
    },
    date: "2025-04-25",
    username: "Michael"
  },
  {
    id: "3",
    title: "Lost Shades",
    description: "Brown sunglasses hanging on green fence at tennis court",
    image: "/lovable-uploads/addf0755-c536-45b3-9b7b-55eb3631050c.png",
    location: {
      name: "London, UK",
      lat: 51.5074,
      lng: -0.1278
    },
    date: "2025-04-22",
    username: "Alex"
  }
];

// Import the calculateDistance function from the new location utils instead
export { calculateDistance } from '@/utils/locationUtils';
