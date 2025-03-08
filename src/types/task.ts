
export type Priority = 'urgent-important' | 'urgent-not-important' | 'not-urgent-important' | 'not-urgent-not-important';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export type MoodRating = 1 | 2 | 3 | 4 | 5;

export type MoodLabel = 'Awful' | 'Bad' | 'Okay' | 'Good' | 'Amazing';

export interface Mood {
  rating: MoodRating;
  label: MoodLabel;
  timestamp: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  estimatedPomodoros: number;
  completedPomodoros: number;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface GameSession {
  score: number;
  tasksCompleted: number;
  pomodorosCompleted: number;
  distractionsAvoided: number;
  distractionsYielded: number;
  day: number;
}
