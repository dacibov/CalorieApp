import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  visible: boolean;
  daysLogged: number;
  avgIntake: number;
  targetCalories: number;
  goalDateLabel: string;
  summaryMessage: string;
  onDismiss: () => void;
};

export default function WeeklyCheckInOverlay({
  visible,
  daysLogged,
  avgIntake,
  targetCalories,
  goalDateLabel,
  summaryMessage,
  onDismiss,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.backdrop}>
      <View style={styles.card}>
        <Text style={styles.title}>Weekly Check-In</Text>

        <Text style={styles.line}>
          Days logged this week: <Text style={styles.bold}>{daysLogged}</Text>
        </Text>
        <Text style={styles.line}>
          Avg intake: <Text style={styles.bold}>{avgIntake}</Text> kcal
          {targetCalories > 0 ? ` (target ~${targetCalories})` : ''}
        </Text>
        <Text style={styles.line}>
          Goal projection:{' '}
          <Text style={styles.bold}>{goalDateLabel}</Text>
        </Text>

        <View style={styles.spacer} />

        <Text style={styles.message}>{summaryMessage}</Text>

        <View style={styles.spacer} />

        <Pressable style={styles.button} onPress={onDismiss}>
          <Text style={styles.buttonText}>Got it</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  line: {
    fontSize: 15,
    marginBottom: 4,
  },
  bold: {
    fontWeight: '600',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
  },
  spacer: {
    height: 12,
  },
  button: {
    marginTop: 8,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
