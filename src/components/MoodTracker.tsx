
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodRating, MoodLabel } from '@/types/task';
import { X, FrownIcon, MehIcon, SmileIcon, HeartIcon, Laugh } from 'lucide-react';

interface MoodOption {
  rating: MoodRating;
  label: MoodLabel;
  color: string;
  icon: React.ReactNode;
}

interface MoodTrackerProps {
  onSelectMood: (rating: MoodRating, label: MoodLabel) => void;
  onClose: () => void;
  isOpen: boolean;
}

const moodOptions: MoodOption[] = [
  { 
    rating: 1, 
    label: 'Awful', 
    color: 'bg-red-400 hover:bg-red-500',
    icon: <FrownIcon className="h-7 w-7" />
  },
  { 
    rating: 2, 
    label: 'Bad', 
    color: 'bg-orange-400 hover:bg-orange-500',
    icon: <MehIcon className="h-7 w-7" />
  },
  { 
    rating: 3, 
    label: 'Okay', 
    color: 'bg-yellow-300 hover:bg-yellow-400',
    icon: <SmileIcon className="h-7 w-7" />
  },
  { 
    rating: 4, 
    label: 'Good', 
    color: 'bg-green-400 hover:bg-green-500',
    icon: <HeartIcon className="h-7 w-7" />
  },
  { 
    rating: 5, 
    label: 'Amazing', 
    color: 'bg-emerald-400 hover:bg-emerald-500',
    icon: <Laugh className="h-7 w-7" />
  },
];

const MoodTracker: React.FC<MoodTrackerProps> = ({ onSelectMood, onClose, isOpen }) => {
  const [hoveredMood, setHoveredMood] = useState<MoodLabel | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <Card className="w-full max-w-md p-6 relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">How do you feel today?</h2>
          <p className="text-sm text-muted-foreground">
            Help us track your mood to optimize your productivity
          </p>
        </div>
        
        <div className="flex justify-between items-end mb-8">
          {moodOptions.map((mood) => (
            <div key={mood.rating} className="flex flex-col items-center">
              <button
                onClick={() => onSelectMood(mood.rating, mood.label)}
                onMouseEnter={() => setHoveredMood(mood.label)}
                onMouseLeave={() => setHoveredMood(null)}
                className={`${mood.color} w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 mb-2`}
              >
                {mood.icon}
              </button>
              <span className={`text-xs ${hoveredMood === mood.label ? 'font-semibold' : ''}`}>
                {mood.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Skip for later
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MoodTracker;
