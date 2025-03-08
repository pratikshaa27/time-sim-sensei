
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Task } from '@/types/task';
import { Badge } from '@/components/ui/badge';

interface CompletedTasksProps {
  tasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  if (completedTasks.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-tm-green" />
          Completed Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {completedTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-tm-green" />
                <span>{task.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {task.completedPomodoros} pomodoros
                </Badge>
                {task.completedAt && (
                  <span className="text-xs text-muted-foreground">
                    {formatDate(task.completedAt)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CompletedTasks;
