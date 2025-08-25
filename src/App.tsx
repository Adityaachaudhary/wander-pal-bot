import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import TripDetail from "./pages/TripDetail";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Attractions from "./pages/Attractions";
import AttractionDetail from "./pages/AttractionDetail";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index onChatToggle={() => setIsChatOpen(!isChatOpen)} />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/trips/:id" element={<TripDetail />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/attractions/:id" element={<AttractionDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
