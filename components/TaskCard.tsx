
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Task } from '../types';
import { IconSymbol } from './IconSymbol';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onPress?: () => void;
}

export function TaskCard({ task, onComplete, onPress }: TaskCardProps) {
  const isOverdue = new Date() > task.deadline && !task.completed;
  
  return (
    <Pressable style={[styles.card, isOverdue && styles.overdueCard]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.frequency}>{task.frequency}</Text>
        </View>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>+{task.xpReward} XP</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{task.description}</Text>
      
      <View style={styles.footer}>
        <Text style={[styles.deadline, isOverdue && styles.overdueText]}>
          До: {task.deadline.toLocaleDateString('ru-RU')}
        </Text>
        
        {task.completed ? (
          <View style={styles.completedContainer}>
            <IconSymbol name="checkmark.circle.fill" size={20} color="#4ECDC4" />
            <Text style={styles.completedText}>Выполнено</Text>
            {task.rating && (
              <View style={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <IconSymbol
                    key={i}
                    name="star.fill"
                    size={16}
                    color={i < task.rating! ? '#FFD700' : '#E0E0E0'}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <Pressable style={styles.completeButton} onPress={() => onComplete(task.id)}>
            <Text style={styles.completeButtonText}>Выполнить</Text>
          </Pressable>
        )}
      </View>
      
      {task.feedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Отзыв тренера:</Text>
          <Text style={styles.feedback}>{task.feedback}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  overdueCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  frequency: {
    fontSize: 12,
    color: '#666',
  },
  xpBadge: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadline: {
    fontSize: 12,
    color: '#666',
  },
  overdueText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  completedText: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
  completeButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  feedbackContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  feedbackLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  feedback: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
});
