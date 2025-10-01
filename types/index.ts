
export type UserType = 'owner' | 'trainer';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  avatar?: string;
  createdAt: Date;
}

export interface Owner extends User {
  type: 'owner';
  dogs: Dog[];
}

export interface Trainer extends User {
  type: 'trainer';
  certificates: string[];
  experience: number; // years
  specialization: string[];
  rating: number;
  completedCourses: number;
  reviews: Review[];
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  temperament: 'calm' | 'active' | 'aggressive' | 'shy';
  behaviorIssues: string[];
  level: TrainingLevel;
  xp: number;
  ownerId: string;
  trainerId?: string;
  avatar?: string;
  createdAt: Date;
}

export type TrainingLevel = 'beginner' | 'student' | 'experienced' | 'master';

export interface Assessment {
  id: string;
  dogId: string;
  basicCommands: number; // 1-5
  streetBehavior: number; // 1-5
  concentration: number; // 1-5
  leashPulling: number; // 1-5
  barking: number; // 1-5
  createdAt: Date;
}

export interface Task {
  id: string;
  dogId: string;
  trainerId: string;
  title: string;
  description: string;
  frequency: string; // "daily", "3 times a week", etc.
  deadline: Date;
  completed: boolean;
  rating?: number; // 1-5 stars
  feedback?: string;
  media?: string[]; // photo/video URLs
  xpReward: number;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpRequired?: number;
  condition: string; // "complete_7_days_streak", "first_task", etc.
}

export interface UserAchievement {
  id: string;
  dogId: string;
  achievementId: string;
  unlockedAt: Date;
}

export interface Review {
  id: string;
  trainerId: string;
  ownerId: string;
  dogId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  date: Date;
}

export interface Progress {
  dogId: string;
  skill: string;
  value: number; // 0-100
  history: ProgressPoint[];
}

export interface ProgressPoint {
  date: Date;
  value: number;
}
