
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Dog, Task, DailyTask, Achievement, UserAchievement } from '../types';
import { mockDogs, mockTasks, mockDailyTasks, mockAchievements } from '../data/mockData';
import { useStorage } from '../hooks/useStorage';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  dogs: Dog[];
  setDogs: (dogs: Dog[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  dailyTasks: DailyTask[];
  setDailyTasks: (tasks: DailyTask[]) => void;
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  setUserAchievements: (achievements: UserAchievement[]) => void;
  completeTask: (taskId: string, rating?: number, feedback?: string) => void;
  completeDailyTask: (taskId: string) => void;
  addXP: (dogId: string, xp: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useStorage<User | null>('currentUser', null);
  const [dogs, setDogs] = useStorage<Dog[]>('dogs', mockDogs);
  const [tasks, setTasks] = useStorage<Task[]>('tasks', mockTasks);
  const [dailyTasks, setDailyTasks] = useStorage<DailyTask[]>('dailyTasks', mockDailyTasks);
  const [userAchievements, setUserAchievements] = useStorage<UserAchievement[]>('userAchievements', []);

  const completeTask = (taskId: string, rating?: number, feedback?: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: true, rating, feedback };
        // Add XP to dog
        const dog = dogs.find(d => d.id === task.dogId);
        if (dog) {
          addXP(dog.id, task.xpReward);
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const completeDailyTask = (taskId: string) => {
    setDailyTasks(dailyTasks.map(task => {
      if (task.id === taskId && !task.completed) {
        // Add XP to first dog (simplified)
        if (dogs.length > 0) {
          addXP(dogs[0].id, task.xpReward);
        }
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  const addXP = (dogId: string, xp: number) => {
    setDogs(dogs.map(dog => {
      if (dog.id === dogId) {
        const newXP = dog.xp + xp;
        let newLevel = dog.level;
        
        // Level up logic
        if (newXP >= 1000 && dog.level !== 'master') {
          newLevel = 'master';
        } else if (newXP >= 500 && dog.level === 'beginner' || dog.level === 'student') {
          newLevel = 'experienced';
        } else if (newXP >= 200 && dog.level === 'beginner') {
          newLevel = 'student';
        }

        return { ...dog, xp: newXP, level: newLevel };
      }
      return dog;
    }));
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    dogs,
    setDogs,
    tasks,
    setTasks,
    dailyTasks,
    setDailyTasks,
    achievements: mockAchievements,
    userAchievements,
    setUserAchievements,
    completeTask,
    completeDailyTask,
    addXP
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
