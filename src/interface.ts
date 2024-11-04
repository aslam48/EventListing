export interface Event {
    id: number;
    name: string;
    date: string;
    time: string;
    location: string;
    price: number;
    category: string;
    image: string;
    description: string;
  }
  
 export interface EventCardProps {
    event: Event;
    onViewDetails: (event: Event) => void;
  }