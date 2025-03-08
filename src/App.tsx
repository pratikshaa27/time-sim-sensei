
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import MoodTracker from "./components/MoodTracker";
import { MoodLabel, MoodRating } from "./types/task";

const queryClient = new QueryClient();

const App = () => {
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  
  useEffect(() => {
    // Show mood tracker after a short delay when app loads
    const timer = setTimeout(() => {
      setShowMoodTracker(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMoodSelection = (rating: MoodRating, label: MoodLabel) => {
    console.log(`Selected mood: ${label} (${rating})`);
    // Here you would typically save this to your game state or database
    setShowMoodTracker(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <MoodTracker 
          isOpen={showMoodTracker}
          onSelectMood={handleMoodSelection}
          onClose={() => setShowMoodTracker(false)}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
