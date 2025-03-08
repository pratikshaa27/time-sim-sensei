
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameSession } from '@/types/task';
import { Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface GameStatsProps {
  gameSession: GameSession;
}

const GameStats: React.FC<GameStatsProps> = ({ gameSession }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Game Stats - Day {gameSession.day}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-2 bg-tm-light-purple rounded-md">
            <span className="text-2xl font-bold text-tm-purple">{gameSession.score}</span>
            <span className="text-sm text-muted-foreground">Score</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-md">
            <span className="text-2xl font-bold text-green-600">{gameSession.tasksCompleted}</span>
            <span className="text-sm text-muted-foreground">Tasks Completed</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-blue-50 rounded-md">
            <span className="text-2xl font-bold text-blue-600">{gameSession.pomodorosCompleted}</span>
            <span className="text-sm text-muted-foreground">Pomodoros</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-orange-50 rounded-md">
            <span className="text-2xl font-bold text-orange-600">
              {gameSession.distractionsAvoided}/{gameSession.distractionsAvoided + gameSession.distractionsYielded}
            </span>
            <span className="text-sm text-muted-foreground">Distractions Avoided</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;
