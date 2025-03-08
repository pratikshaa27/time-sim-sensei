
import { Task, Priority, GameSession } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';

// Initial game session
export const initialGameSession: GameSession = {
  score: 0,
  tasksCompleted: 0,
  pomodorosCompleted: 0,
  distractionsAvoided: 0,
  distractionsYielded: 0,
  day: 1,
};

// Sample tasks
export const sampleTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Complete math homework',
    description: 'Solve problems from chapter 5',
    priority: 'urgent-important',
    estimatedPomodoros: 3,
    completedPomodoros: 0,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Prepare for history presentation',
    description: 'Research and create slides',
    priority: 'not-urgent-important',
    estimatedPomodoros: 4,
    completedPomodoros: 0,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Reply to club emails',
    priority: 'urgent-not-important',
    estimatedPomodoros: 1,
    completedPomodoros: 0,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Check social media updates',
    priority: 'not-urgent-not-important',
    estimatedPomodoros: 1,
    completedPomodoros: 0,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Function to calculate score based on task priority and pomodoros
export const calculateTaskScore = (task: Task): number => {
  let priorityMultiplier = 1;
  
  switch (task.priority) {
    case 'urgent-important':
      priorityMultiplier = 2.5;
      break;
    case 'not-urgent-important':
      priorityMultiplier = 2.0;
      break;
    case 'urgent-not-important':
      priorityMultiplier = 1.5;
      break;
    case 'not-urgent-not-important':
      priorityMultiplier = 1.0;
      break;
  }
  
  return Math.round(task.completedPomodoros * 100 * priorityMultiplier);
};

// Calculate points for avoiding distractions
export const distractionAvoidedPoints = 50;

// Calculate points for yielding to distractions
export const distractionYieldPenalty = -25;

// Function to calculate total score
export const calculateTotalScore = (
  tasks: Task[], 
  distractionsAvoided: number, 
  distractionsYielded: number
): number => {
  const taskScores = tasks
    .filter(task => task.status === 'completed')
    .reduce((total, task) => total + calculateTaskScore(task), 0);
  
  const distractionScore = (distractionsAvoided * distractionAvoidedPoints) + 
                          (distractionsYielded * distractionYieldPenalty);
  
  return taskScores + distractionScore;
};
