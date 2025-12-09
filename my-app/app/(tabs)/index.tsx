import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

import { useMealsStore } from '../../src/state/meals';
import { useGoalsStore } from '../../src/state/goals';
import { useWeeklyCheckIn } from '../../src/hooks/useWeeklyCheckIn';
import WeeklyCheckInOverlay from '../../src/screens/WeeklyCheckInOverlay';

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function TodayScreen() {
  const getMealsForDay = useMealsStore((state) => state.getMealsForDay);
  const getLoggedDaysCount = useMealsStore((state) => state.getLoggedDaysCount);
  const copyYesterday = useMealsStore((state) => state.copyYesterday);
  const addMealForDate = useMealsStore((state) => state.addMealForDate);

  const dailyCaloriesTarget = useGoalsStore(
    (state) => state.dailyCaloriesTarget
  );
  const statusMessage = useGoalsStore((state) => state.statusMessage);
  const updateTodayIntake = useGoalsStore(
    (state) => state.updateTodayIntake
  );

  const weeklyCheckIn = useWeeklyCheckIn();

  // Which day are we viewing?
  const [viewDate, setViewDate] = useState<Date>(new Date());

  const dayMeals = getMealsForDay(viewDate);
  const totalForDay = dayMeals.reduce(
    (sum, meal) => sum + meal.totalCalories,
    0
  );

  const loggedLast7 = getLoggedDaysCount(7);

  // Only update adaptive goals when we're looking at *today*
  useEffect(() => {
    const today = new Date();
    if (isSameDay(today, viewDate)) {
      updateTodayIntake(totalForDay);
    }
  }, [totalForDay, viewDate, updateTodayIntake]);

  const handleOpenCamera = () => {
    router.push('/camera');
  };

  const handlePrevDay = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const handleNextDay = () => {
    setViewDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);

      const today = new Date();
      // don't go into the future
      if (d > today) return prev;
      return d;
    });
  };

  const handleQuickAdd = () => {
    // Dev helper: add a 500 kcal "meal" to the currently viewed day
    addMealForDate(500, viewDate);
  };

  // Copy yesterday → current viewDate
  const handleCopyYesterday = () => {
    copyYesterday(viewDate);
    Alert.alert(
      'Copied',
      'Meals from yesterday have been copied to this day.'
    );
  };

  const today = new Date();
  const isViewingToday = isSameDay(today, viewDate);

  const dateLabel = isViewingToday
    ? 'Today'
    : viewDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });

  // Determine if yesterday (relative to viewDate) has any meals
  const prevDate = new Date(viewDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const hasPreviousDayMeals = getMealsForDay(prevDate).length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MealFlash – {dateLabel}</Text>

      <View style={styles.dateRow}>
        <Button title="Previous" onPress={handlePrevDay} />
        <Text style={styles.dateText}>{dateLabel}</Text>
        <Button title="Next" onPress={handleNextDay} />
      </View>

      <Text style={styles.text}>
        {isViewingToday ? 'Calories today' : 'Calories this day'}: {totalForDay} /{' '}
        {dailyCaloriesTarget}
      </Text>
      <Text style={styles.text}>{statusMessage}</Text>
      <Text style={styles.text}>Logged {loggedLast7} of last 7 days</Text>

      <View style={styles.spacer} />

      <Button title="OPEN CAMERA" onPress={handleOpenCamera} />

      <View style={styles.spacerSmall} />

      {hasPreviousDayMeals && (
        <Button
          title={
            isViewingToday
              ? 'Copy yesterday to today'
              : 'Copy previous day to this day'
          }
          onPress={handleCopyYesterday}
        />
      )}

      <View style={styles.spacerSmall} />

      <Button
        title="Quick add 500 kcal to this day (dev)"
        onPress={handleQuickAdd}
      />

      <WeeklyCheckInOverlay
        visible={weeklyCheckIn.visible}
        daysLogged={weeklyCheckIn.daysLoggedThisWeek}
        avgIntake={weeklyCheckIn.avgIntakeThisWeek}
        targetCalories={weeklyCheckIn.targetCalories}
        goalDateLabel={weeklyCheckIn.goalDateLabel}
        summaryMessage={weeklyCheckIn.summaryMessage}
        onDismiss={weeklyCheckIn.dismiss}
      />
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
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
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
