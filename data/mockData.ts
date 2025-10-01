
import { Dog, Trainer, Owner, Achievement, Task, DailyTask } from '../types';

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Первый шаг',
    description: 'Выполните первое задание',
    icon: '🎯',
    condition: 'first_task'
  },
  {
    id: '2',
    title: 'Железная дисциплина',
    description: 'Выполняйте задания 7 дней подряд',
    icon: '💪',
    condition: 'complete_7_days_streak'
  },
  {
    id: '3',
    title: 'Социальный пёс',
    description: 'Достигните 80% в социализации',
    icon: '🐕‍🦺',
    condition: 'socialization_80'
  },
  {
    id: '4',
    title: 'Мастер команд',
    description: 'Изучите 10 базовых команд',
    icon: '🏆',
    condition: 'learn_10_commands'
  }
];

export const mockDogs: Dog[] = [
  {
    id: '1',
    name: 'Рекс',
    breed: 'Немецкая овчарка',
    age: 2,
    gender: 'male',
    temperament: 'active',
    behaviorIssues: ['Тянет поводок', 'Лает на других собак'],
    level: 'student',
    xp: 450,
    ownerId: 'owner1',
    trainerId: 'trainer1',
    avatar: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=200&h=200&fit=crop&crop=face',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Белла',
    breed: 'Лабрадор',
    age: 1,
    gender: 'female',
    temperament: 'calm',
    behaviorIssues: ['Прыгает на людей'],
    level: 'beginner',
    xp: 120,
    ownerId: 'owner2',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face',
    createdAt: new Date('2024-02-01')
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    dogId: '1',
    trainerId: 'trainer1',
    title: 'Команда "Сидеть"',
    description: 'Тренируйте команду "сидеть" по 5 минут 3 раза в день',
    frequency: '3 раза в день',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completed: false,
    xpReward: 50,
    createdAt: new Date()
  },
  {
    id: '2',
    dogId: '1',
    trainerId: 'trainer1',
    title: 'Прогулка без поводка',
    description: 'Практикуйте ходьбу рядом без натяжения поводка',
    frequency: 'Ежедневно',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    completed: true,
    rating: 4,
    feedback: 'Отличный прогресс! Рекс почти не тянет поводок.',
    xpReward: 75,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

export const mockDailyTasks: DailyTask[] = [
  {
    id: '1',
    title: 'Утренняя тренировка',
    description: 'Потренируйте базовые команды 10 минут',
    xpReward: 25,
    completed: false,
    date: new Date()
  },
  {
    id: '2',
    title: 'Социализация',
    description: 'Встретьтесь с другими собаками в парке',
    xpReward: 30,
    completed: true,
    date: new Date()
  }
];

export const mockTrainers: Trainer[] = [
  {
    id: 'trainer1',
    email: 'ivan@example.com',
    name: 'Иван Петров',
    type: 'trainer',
    certificates: ['Сертификат кинолога РКФ', 'Специалист по коррекции поведения'],
    experience: 8,
    specialization: ['Базовая дрессировка', 'Коррекция поведения', 'Аджилити'],
    rating: 4.8,
    completedCourses: 156,
    reviews: [],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    createdAt: new Date('2023-01-01')
  }
];

export const getLevelInfo = (level: string) => {
  const levels = {
    beginner: { name: 'Новичок', color: '#FF6B6B', minXP: 0 },
    student: { name: 'Ученик', color: '#4ECDC4', minXP: 200 },
    experienced: { name: 'Опытный', color: '#45B7D1', minXP: 500 },
    master: { name: 'Мастер', color: '#FFA07A', minXP: 1000 }
  };
  return levels[level as keyof typeof levels] || levels.beginner;
};

export const getXPForNextLevel = (currentXP: number, level: string) => {
  const levels = {
    beginner: 200,
    student: 500,
    experienced: 1000,
    master: 2000
  };
  return levels[level as keyof typeof levels] || 200;
};
