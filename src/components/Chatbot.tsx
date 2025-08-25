import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { travelApi, ChatMessage, ChatResponse } from '@/services/travelApi';
import TripCard from './TripCard';
import HotelCard from './HotelCard';
import AttractionCard from './AttractionCard';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  cards?: ChatMessage[];
  suggestions?: string[];
  timestamp: Date;
}

const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: "Hi there! I'm your travel assistant. I can help you find trips, hotels, and attractions. What are you looking for?",
        suggestions: [
          "Show trips to Goa",
          "Best hotels in Manali under 4000",
          "What to visit in Mumbai",
          "Show me adventure trips"
        ],
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response: ChatResponse = await travelApi.chat({
        sessionId: 'demo-session',
        message: inputValue.trim()
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.reply,
        cards: response.cards,
        suggestions: response.suggestions,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Sorry, I'm having trouble processing your request. Please try again.",
        suggestions: [
          "Show trips to Goa",
          "Best hotels in Manali",
          "What to visit in Mumbai"
        ],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderCard = (card: ChatMessage, index: number) => {
    if (card.type === 'trip') {
      const tripData = {
        id: card.id || '',
        title: card.title || '',
        city: 'City',
        duration: '3N/4D',
        price: card.price || 0,
        currency: 'INR',
        rating: card.rating || 4.0,
        short_description: card.short_description || '',
        highlights: [],
        images: [],
        tags: [],
        created_at: new Date().toISOString()
      };
      return <TripCard key={index} trip={tripData} variant="default" />;
    }
    
    if (card.type === 'hotel') {
      const hotelData = {
        id: card.id || '',
        name: card.name || '',
        city: 'City',
        price_per_night: card.price_per_night || 0,
        currency: 'INR',
        rating: card.rating || 4.0,
        short_description: card.short_description || '',
        amenities: [],
        images: []
      };
      return <HotelCard key={index} hotel={hotelData} variant="compact" />;
    }
    
    if (card.type === 'attraction') {
      const attractionData = {
        id: card.id || '',
        name: card.name || '',
        city: 'City',
        location_name: 'Location',
        short_description: card.short_description || '',
        coords: { lat: 0, lon: 0 },
        images: []
      };
      return <AttractionCard key={index} attraction={attractionData} variant="compact" />;
    }
    
    return null;
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setInputValue('')}
          size="lg"
          className="rounded-full h-14 w-14 travel-gradient-accent hover:shadow-lg travel-bounce text-white border-0"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-card border travel-shadow-elevated rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b travel-gradient-hero">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Travel Assistant</h3>
            <p className="text-xs text-white/80">Always here to help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`max-w-[75%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                <div
                  className={`rounded-xl p-3 ${
                    message.type === 'user'
                      ? 'travel-gradient-accent text-white'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                
                {/* Cards */}
                {message.cards && message.cards.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.cards.map((card, index) => renderCard(card, index))}
                  </div>
                )}
                
                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 travel-transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about trips, hotels, or places..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="travel-gradient-accent text-white border-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;