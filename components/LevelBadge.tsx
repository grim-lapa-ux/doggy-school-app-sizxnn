
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getLevelInfo } from '../data/mockData';

interface LevelBadgeProps {
  level: string;
  size?: 'small' | 'medium' | 'large';
}

export function LevelBadge({ level, size = 'medium' }: LevelBadgeProps) {
  const levelInfo = getLevelInfo(level);
  const sizeStyles = getSizeStyles(size);

  return (
    <View style={[styles.badge, { backgroundColor: levelInfo.color }, sizeStyles.container]}>
      <Text style={[styles.text, sizeStyles.text]}>{levelInfo.name}</Text>
    </View>
  );
}

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return {
        container: { paddingHorizontal: 8, paddingVertical: 4 },
        text: { fontSize: 12 }
      };
    case 'large':
      return {
        container: { paddingHorizontal: 16, paddingVertical: 8 },
        text: { fontSize: 16 }
      };
    default:
      return {
        container: { paddingHorizontal: 12, paddingVertical: 6 },
        text: { fontSize: 14 }
      };
  }
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
});
