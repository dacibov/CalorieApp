import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useMealsStore } from '../../state/meals';

export default function TodayScreen() {
  const getMealsForDay = useMealsStore((state) => state.getMealsForDay);
  const getLoggedDaysCount = useMealsStore((state) => state.getLoggedDaysCount);
  const copyYesterday = useMealsStore((state) => state.copyYesterday);

  const todayMeals = getMealsForDay(new Date());
  const totalToday = todayMeals.reduce(
    (sum, meal) => sum + meal.totalCalories,
    0
  );

  const loggedLast7 = getLoggedDaysCount(7);

  const handleOpenCamera = () => {
    router.push('/camera');
  };

  const handleCopyYesterday = () => {
    copyYesterday();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MealFlash – Today</Text>

      <Text style={styles.text}>Calories today: {totalToday} / 1800</Text>
      <Text style={styles.text}>On track to hit 72 kg by March 12</Text>
      <Text style={styles.text}>Logged {loggedLast7} of last 7 days</Text>

      <View style={styles.spacer} />

      <Button title="OPEN CAMERA" onPress={handleOpenCamera} />

      <View style={styles.spacerSmall} />

      <Button title="Copy yesterday" onPress={handleCopyYesterday} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  spacer: {
    height: 24,
  },
  spacerSmall: {
    height: 12,
  },
});
