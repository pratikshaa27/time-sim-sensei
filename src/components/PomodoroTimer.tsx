
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlarmClock, Pause, Play, SkipForward } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PomodoroTimerProps {
  onPomodoroComplete: () => void;
  onBreakComplete: () => void;
}

// Pomodoro settings in minutes
const WORK_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;
const POMODORO_CYCLE = 4;

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onPomodoroComplete, onBreakComplete }) => {
  const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>('work');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
  const [cycle, setCycle] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Handle timer completion
      if (mode === 'work') {
        // Pomodoro completed
        onPomodoroComplete();
        toast({
          title: "Pomodoro completed!",
          description: "Great job focusing. Take a break now.",
        });
        
        // Check if it's time for a long break
        if (cycle % POMODORO_CYCLE === 0) {
          setMode('long-break');
          setTimeLeft(LONG_BREAK_MINUTES * 60);
        } else {
          setMode('short-break');
          setTimeLeft(SHORT_BREAK_MINUTES * 60);
        }
        setCycle(prev => prev + 1);
      } else {
        // Break completed
        onBreakComplete();
        toast({
          title: "Break completed!",
          description: "Ready to focus again?",
        });
        setMode('work');
        setTimeLeft(WORK_MINUTES * 60);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, cycle, onPomodoroComplete, onBreakComplete, toast]);

  const toggleTimer = () => {
    setIsActive(prev => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setTimeLeft(WORK_MINUTES * 60);
    } else if (mode === 'short-break') {
      setTimeLeft(SHORT_BREAK_MINUTES * 60);
    } else {
      setTimeLeft(LONG_BREAK_MINUTES * 60);
    }
  };

  const skipTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      onPomodoroComplete();
      if (cycle % POMODORO_CYCLE === 0) {
        setMode('long-break');
        setTimeLeft(LONG_BREAK_MINUTES * 60);
      } else {
        setMode('short-break');
        setTimeLeft(SHORT_BREAK_MINUTES * 60);
      }
      setCycle(prev => prev + 1);
    } else {
      onBreakComplete();
      setMode('work');
      setTimeLeft(WORK_MINUTES * 60);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const getProgressPercentage = (): number => {
    const totalSeconds = mode === 'work' 
      ? WORK_MINUTES * 60 
      : mode === 'short-break' 
        ? SHORT_BREAK_MINUTES * 60 
        : LONG_BREAK_MINUTES * 60;
    
    return 100 - (timeLeft / totalSeconds * 100);
  };

  // Get card color based on mode
  const getCardColor = (): string => {
    switch (mode) {
      case 'work': return 'bg-tm-light-purple';
      case 'short-break': return 'bg-green-50';
      case 'long-break': return 'bg-blue-50';
      default: return 'bg-white';
    }
  };

  return (
    <Card className={`${getCardColor()} shadow-md`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlarmClock className="h-5 w-5 text-tm-purple" />
            <span>{mode === 'work' ? 'Focus Time' : mode === 'short-break' ? 'Short Break' : 'Long Break'}</span>
          </div>
          <div className="text-sm font-normal bg-tm-purple/10 px-2 py-1 rounded-full">
            Cycle: {cycle}/{POMODORO_CYCLE}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl font-bold text-tm-purple">
            {formatTime(timeLeft)}
          </div>
          <Progress value={getProgressPercentage()} className="w-full h-2" />
        </div>
      </CardContent>
      <CardFooter className="justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetTimer}
          className="border-tm-purple text-tm-purple hover:bg-tm-purple/10"
        >
          Reset
        </Button>
        <Button 
          onClick={toggleTimer} 
          size="sm"
          className="bg-tm-purple hover:bg-tm-purple/90"
        >
          {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isActive ? 'Pause' : 'Start'} 
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={skipTimer}
          className="text-tm-purple hover:bg-tm-purple/10"
        >
          <SkipForward className="h-4 w-4 mr-2" />
          Skip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PomodoroTimer;
