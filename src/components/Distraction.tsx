
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, X } from 'lucide-react';

interface DistractionProps {
  onIgnore: () => void;
  onYield: () => void;
  isActive: boolean;
}

const distractions = [
  { title: "Social Media Notification", description: "Your friend just posted a new photo. Check it out?" },
  { title: "Email Alert", description: "You've received a new email. Want to read it now?" },
  { title: "Text Message", description: "You have a new text message. Respond now?" },
  { title: "YouTube Recommendation", description: "A new video you might like is trending. Watch it?" },
  { title: "News Alert", description: "Breaking news just came in. Read the headline?" },
  { title: "App Update", description: "A new update is available for your app. Update now?" },
  { title: "Game Invitation", description: "Your friend invited you to play a game. Join them?" },
  { title: "Random Thought", description: "Hmm, I wonder what's in the refrigerator right now..." },
  { title: "Phone Call", description: "Unknown number is calling. Answer the phone?" },
  { title: "Shopping Deal", description: "Flash sale on your wishlist item! Check it out?" }
];

const Distraction: React.FC<DistractionProps> = ({ onIgnore, onYield, isActive }) => {
  const [distraction, setDistraction] = useState(distractions[0]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      const randomIndex = Math.floor(Math.random() * distractions.length);
      setDistraction(distractions[randomIndex]);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  const handleIgnore = () => {
    setIsVisible(false);
    onIgnore();
  };

  const handleYield = () => {
    setIsVisible(false);
    onYield();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <Card className="w-full max-w-md m-4 animate-fade-in distraction-notification">
        <CardContent className="pt-6 pb-4">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-10 w-10 text-tm-yellow shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-1">{distraction.title}</h3>
              <p className="text-muted-foreground">{distraction.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button 
            variant="default" 
            className="w-full bg-tm-purple hover:bg-tm-purple/90"
            onClick={handleIgnore}
          >
            <X className="h-4 w-4 mr-2" />
            Ignore
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleYield}
          >
            Yield to Distraction
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Distraction;
