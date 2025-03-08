
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, GameSession, Priority } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';
import { 
  initialGameSession, 
  sampleTasks,
  calculateTaskScore,
  calculateTotalScore,
  distractionAvoidedPoints,
  distractionYieldPenalty
} from '@/lib/game-data';
import { useToast } from '@/hooks/use-toast';
import { shouldGenerateDistraction, resetDistractionTimer } from '@/lib/distraction-generator';

interface GameContextType {
  tasks: Task[];
  gameSession: GameSession;
  activeTaskId: string | null;
  isTimerActive: boolean;
  isDistractionActive: boolean;
  startTask: (taskId: string) => void;
  completeTask: (taskId: string) => void;
  addTask: (task: {
    title: string;
    description: string;
    priority: Priority;
    estimatedPomodoros: number;
  }) => void;
  completePomodoro: () => void;
  completeBreak: () => void;
  ignoreDistraction: () => void;
  yieldToDistraction: () => void;
  advanceToNextDay: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [gameSession, setGameSession] = useState<GameSession>(initialGameSession);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isDistractionActive, setIsDistractionActive] = useState(false);
  const { toast } = useToast();

  // Check for distractions periodically when timer is active
  useEffect(() => {
    if (!isTimerActive || isDistractionActive) return;
    
    const checkForDistraction = () => {
      if (shouldGenerateDistraction()) {
        setIsDistractionActive(true);
      }
    };
    
    const interval = setInterval(checkForDistraction, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [isTimerActive, isDistractionActive]);

  const startTask = (taskId: string) => {
    if (activeTaskId) {
      toast({
        title: "Task already in progress",
        description: "Complete or pause the current task before starting a new one.",
        variant: "destructive"
      });
      return;
    }
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'in-progress', updatedAt: new Date() } 
          : task
      )
    );
    
    setActiveTaskId(taskId);
    setIsTimerActive(true);
    toast({
      title: "Task started",
      description: "Focus on your task now. The Pomodoro timer has started."
    });
  };
  
  const completeTask = (taskId: string) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    
    if (!taskToComplete) return;
    
    const updatedTask = { 
      ...taskToComplete, 
      status: 'completed', 
      updatedAt: new Date(),
      completedAt: new Date()
    };
    
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === taskId ? updatedTask : task)
    );
    
    // Update game session
    const taskScore = calculateTaskScore(updatedTask);
    setGameSession(prev => ({
      ...prev,
      score: prev.score + taskScore,
      tasksCompleted: prev.tasksCompleted + 1
    }));
    
    setActiveTaskId(null);
    setIsTimerActive(false);
    
    toast({
      title: "Task completed!",
      description: `You earned ${taskScore} points. Good job!`
    });
  };
  
  const addTask = (taskData: {
    title: string;
    description: string;
    priority: Priority;
    estimatedPomodoros: number;
  }) => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      estimatedPomodoros: taskData.estimatedPomodoros,
      completedPomodoros: 0,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: "Task added",
      description: "New task has been added to your list."
    });
  };
  
  const completePomodoro = () => {
    if (!activeTaskId) return;
    
    // Update the task's completed pomodoros
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === activeTaskId 
          ? { 
              ...task, 
              completedPomodoros: task.completedPomodoros + 1,
              updatedAt: new Date() 
            } 
          : task
      )
    );
    
    // Update game session
    setGameSession(prev => ({
      ...prev,
      pomodorosCompleted: prev.pomodorosCompleted + 1
    }));
  };
  
  const completeBreak = () => {
    // Nothing to do when break completes except re-enable the timer
    setIsTimerActive(true);
  };
  
  const ignoreDistraction = () => {
    setIsDistractionActive(false);
    
    // Update game session
    setGameSession(prev => ({
      ...prev,
      distractionsAvoided: prev.distractionsAvoided + 1,
      score: prev.score + distractionAvoidedPoints
    }));
    
    toast({
      title: "Distraction ignored",
      description: `You earned ${distractionAvoidedPoints} points for staying focused!`
    });
  };
  
  const yieldToDistraction = () => {
    setIsDistractionActive(false);
    setIsTimerActive(false);
    
    // Update game session
    setGameSession(prev => ({
      ...prev,
      distractionsYielded: prev.distractionsYielded + 1,
      score: prev.score + distractionYieldPenalty
    }));
    
    toast({
      title: "Yielded to distraction",
      description: `You lost ${Math.abs(distractionYieldPenalty)} points. The timer has been paused.`,
      variant: "destructive"
    });
  };
  
  const advanceToNextDay = () => {
    // Calculate final score for the day
    const finalScore = calculateTotalScore(
      tasks, 
      gameSession.distractionsAvoided, 
      gameSession.distractionsYielded
    );
    
    // Reset the game for a new day
    setGameSession({
      score: finalScore,
      tasksCompleted: 0,
      pomodorosCompleted: 0,
      distractionsAvoided: 0,
      distractionsYielded: 0,
      day: gameSession.day + 1,
    });
    
    // Move completed tasks to archive (not implemented yet)
    // and clean up tasks
    setTasks(prevTasks => prevTasks.filter(task => task.status !== 'completed'));
    
    setActiveTaskId(null);
    setIsTimerActive(false);
    setIsDistractionActive(false);
    resetDistractionTimer();
    
    toast({
      title: `Day ${gameSession.day} completed!`,
      description: `Final score: ${finalScore}. Ready for a new day!`
    });
  };

  return (
    <GameContext.Provider 
      value={{
        tasks,
        gameSession,
        activeTaskId,
        isTimerActive,
        isDistractionActive,
        startTask,
        completeTask,
        addTask,
        completePomodoro,
        completeBreak,
        ignoreDistraction,
        yieldToDistraction,
        advanceToNextDay
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
