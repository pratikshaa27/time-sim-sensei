
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onStartTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
  isActive: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStartTask, onCompleteTask, isActive }) => {
  const getPriorityLabel = (priority: string): string => {
    switch (priority) {
      case 'urgent-important': return 'Urgent & Important';
      case 'urgent-not-important': return 'Urgent';
      case 'not-urgent-important': return 'Important';
      case 'not-urgent-not-important': return 'Neither';
      default: return 'Unknown';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'urgent-important': return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent-not-important': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not-urgent-important': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not-urgent-not-important': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={`task-card priority-${task.priority} ${isActive ? 'ring-2 ring-tm-purple' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <Badge className={`${getPriorityColor(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </Badge>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="py-2">
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </CardContent>
      )}
      <CardFooter className="pt-2 justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{task.completedPomodoros}/{task.estimatedPomodoros} pomodoros</span>
        </div>
        {task.status === 'pending' ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onStartTask(task.id)}
            className="border-tm-purple text-tm-purple hover:bg-tm-purple/10"
          >
            Start
          </Button>
        ) : task.status === 'in-progress' ? (
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onCompleteTask(task.id)}
            className="bg-tm-green hover:bg-tm-green/90"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Complete
          </Button>
        ) : (
          <Badge variant="outline" className="bg-tm-green/10 text-tm-green border-tm-green/20">
            Completed
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
