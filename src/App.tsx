import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Heart, Share2 } from 'lucide-react';
import { Event, EventCardProps } from './interface';
import { allEvents } from './mockData/MockData';


const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <div className="relative aspect-[8/2] w-full">
      <img 
        src={event.image} 
        alt={event.name} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-white'} shadow-lg transition-colors duration-300`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'text-white' : 'text-gray-600'}`} />
        </button>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            // Share functionality could be implemented here
          }}
          className="p-2 rounded-full bg-white shadow-lg"
        >
          <Share2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          ${event.price}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

      <button 
        onClick={() => onViewDetails(event)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
      >
        View Details
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
  )
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [visibleEvents, setVisibleEvents] = useState<number>(3);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const categories: string[] = ['All', 'Music', 'Technology', 'Food & Drink', 'Sports', 'Arts'];

  const filteredEvents = allEvents.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  );

  const handleLoadMore = (): void => {
    setVisibleEvents(prev => Math.min(prev + 3, filteredEvents.length));
  };

  const handleViewDetails = (event: Event): void => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="mt-2 text-gray-600">Discover and book amazing events near you</p>
        </div>

        {/* Event Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleEvents(3);
              }}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              } transition-colors duration-300 whitespace-nowrap shadow-sm`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredEvents.slice(0, visibleEvents).map((event) => (
            <EventCard
              key={event.id} 
              event={event} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleEvents < filteredEvents.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-2 px-6 rounded-lg shadow-sm transition-colors duration-300"
            >
              Load More Events
            </button>
          </div>
        )}

        {/* Event Details Modal */}
        {isModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name} 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="space-y-4">
                  <p className="text-gray-600">{selectedEvent.description}</p>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-bold text-gray-900">
                        Price: ${selectedEvent.price}
                      </p>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;