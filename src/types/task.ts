
export type Priority = 'urgent-important' | 'urgent-not-important' | 'not-urgent-important' | 'not-urgent-not-important';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

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
