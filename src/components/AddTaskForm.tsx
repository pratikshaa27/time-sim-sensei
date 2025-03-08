
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Priority } from '@/types/task';
import { PlusCircle } from 'lucide-react';

interface AddTaskFormProps {
  onAddTask: (task: {
    title: string;
    description: string;
    priority: Priority;
    estimatedPomodoros: number;
  }) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('urgent-important');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    onAddTask({
      title,
      description,
      priority,
      estimatedPomodoros
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('urgent-important');
    setEstimatedPomodoros(1);
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2 border-dashed border-2"
        onClick={() => setIsExpanded(true)}
      >
        <PlusCircle className="h-5 w-5" />
        Add New Task
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Add New Task</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Task Priority (Eisenhower Matrix)</Label>
            <RadioGroup
              value={priority}
              onValueChange={(value) => setPriority(value as Priority)}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="urgent-important" id="urgent-important" />
                <Label htmlFor="urgent-important" className="text-sm cursor-pointer">
                  Urgent & Important
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="not-urgent-important" id="not-urgent-important" />
                <Label htmlFor="not-urgent-important" className="text-sm cursor-pointer">
                  Important, Not Urgent
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="urgent-not-important" id="urgent-not-important" />
                <Label htmlFor="urgent-not-important" className="text-sm cursor-pointer">
                  Urgent, Not Important
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <RadioGroupItem value="not-urgent-not-important" id="not-urgent-not-important" />
                <Label htmlFor="not-urgent-not-important" className="text-sm cursor-pointer">
                  Neither
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pomodoros">Estimated Pomodoros</Label>
            <Select
              value={estimatedPomodoros.toString()}
              onValueChange={(value) => setEstimatedPomodoros(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of pomodoros" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'pomodoro' : 'pomodoros'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setIsExpanded(false)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-tm-purple hover:bg-tm-purple/90"
          >
            Add Task
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddTaskForm;
