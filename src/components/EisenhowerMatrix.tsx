
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task, Priority } from '@/types/task';
import TaskCard from './TaskCard';

interface EisenhowerMatrixProps {
  tasks: Task[];
  onStartTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  activeTaskId?: string;
}

const EisenhowerMatrix: React.FC<EisenhowerMatrixProps> = ({ 
  tasks, 
  onStartTask, 
  onCompleteTask,
  activeTaskId 
}) => {
  const getPriorityTasks = (priority: Priority) => {
    return tasks.filter(task => task.priority === priority && task.status !== 'completed');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Quadrant 1: Urgent & Important */}
      <Card className="border-t-4 border-t-tm-red">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <div className="w-3 h-3 rounded-full bg-tm-red mr-2"></div>
            Urgent & Important
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              Do First
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {getPriorityTasks('urgent-important').length > 0 ? (
            getPriorityTasks('urgent-important').map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStartTask={onStartTask} 
                onCompleteTask={onCompleteTask}
                isActive={task.id === activeTaskId}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-2">No urgent and important tasks</p>
          )}
        </CardContent>
      </Card>

      {/* Quadrant 2: Not Urgent but Important */}
      <Card className="border-t-4 border-t-tm-blue">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <div className="w-3 h-3 rounded-full bg-tm-blue mr-2"></div>
            Important, Not Urgent
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              Schedule
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {getPriorityTasks('not-urgent-important').length > 0 ? (
            getPriorityTasks('not-urgent-important').map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStartTask={onStartTask} 
                onCompleteTask={onCompleteTask}
                isActive={task.id === activeTaskId}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-2">No important, non-urgent tasks</p>
          )}
        </CardContent>
      </Card>

      {/* Quadrant 3: Urgent but Not Important */}
      <Card className="border-t-4 border-t-tm-yellow">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <div className="w-3 h-3 rounded-full bg-tm-yellow mr-2"></div>
            Urgent, Not Important
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              Delegate
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {getPriorityTasks('urgent-not-important').length > 0 ? (
            getPriorityTasks('urgent-not-important').map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStartTask={onStartTask} 
                onCompleteTask={onCompleteTask}
                isActive={task.id === activeTaskId}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-2">No urgent, non-important tasks</p>
          )}
        </CardContent>
      </Card>

      {/* Quadrant 4: Not Urgent and Not Important */}
      <Card className="border-t-4 border-t-tm-green">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <div className="w-3 h-3 rounded-full bg-tm-green mr-2"></div>
            Not Urgent or Important
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              Eliminate
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {getPriorityTasks('not-urgent-not-important').length > 0 ? (
            getPriorityTasks('not-urgent-not-important').map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStartTask={onStartTask} 
                onCompleteTask={onCompleteTask}
                isActive={task.id === activeTaskId}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-2">No non-urgent, non-important tasks</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EisenhowerMatrix;
