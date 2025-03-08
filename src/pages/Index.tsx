
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GameProvider, useGame } from '@/context/GameContext';
import PomodoroTimer from '@/components/PomodoroTimer';
import EisenhowerMatrix from '@/components/EisenhowerMatrix';
import AddTaskForm from '@/components/AddTaskForm';
import GameStats from '@/components/GameStats';
import CompletedTasks from '@/components/CompletedTasks';
import Distraction from '@/components/Distraction';
import { Calendar, Lightbulb } from 'lucide-react';

const GameInstructions = () => {
  return (
    <Card className="p-4 mb-6 bg-tm-light-purple">
      <div className="flex items-start gap-3">
        <Lightbulb className="h-6 w-6 text-tm-purple shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold mb-1">How to Play Time Master</h3>
          <ul className="text-sm space-y-1">
            <li>• Add tasks and assign priorities using the <strong>Eisenhower Matrix</strong> (urgent/important)</li>
            <li>• Start tasks and focus using the <strong>Pomodoro Technique</strong> (25 min work, 5 min break)</li>
            <li>• Avoid distractions that pop up randomly to maintain your productivity</li>
            <li>• Complete tasks to earn points based on priority and effort</li>
            <li>• End the day when you're done to see your final productivity score</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

const GameContent = () => {
  const { 
    tasks, 
    gameSession, 
    activeTaskId, 
    isDistractionActive,
    startTask, 
    completeTask, 
    addTask, 
    completePomodoro, 
    completeBreak,
    ignoreDistraction,
    yieldToDistraction,
    advanceToNextDay
  } = useGame();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Time Master</h1>
        <p className="text-center text-muted-foreground">Master the art of time management and productivity</p>
      </header>

      <GameInstructions />
      
      <GameStats gameSession={gameSession} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <PomodoroTimer 
            onPomodoroComplete={completePomodoro} 
            onBreakComplete={completeBreak} 
          />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Add New Tasks</h2>
          <AddTaskForm onAddTask={addTask} />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Task Management (Eisenhower Matrix)</h2>
      <EisenhowerMatrix 
        tasks={tasks} 
        onStartTask={startTask} 
        onCompleteTask={completeTask}
        activeTaskId={activeTaskId}
      />
      
      <CompletedTasks tasks={tasks} />
      
      <div className="flex justify-center mt-8 mb-4">
        <Button 
          onClick={advanceToNextDay}
          className="bg-tm-blue hover:bg-tm-blue/90"
        >
          <Calendar className="h-5 w-5 mr-2" />
          End Day & Continue Tomorrow
        </Button>
      </div>
      
      {isDistractionActive && (
        <Distraction 
          onIgnore={ignoreDistraction} 
          onYield={yieldToDistraction}
          isActive={isDistractionActive}
        />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;
