import { View, Text, Button, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMealsStore } from '../src/state/meals';

export default function EditMealScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri?: string }>();
  const addMeal = useMealsStore((state) => state.addMeal);

  // For now we hardcode this meal to 440 kcal (240 + 200)
  const totalCalories = 240 + 200;

  const handleSave = () => {
    addMeal(totalCalories);
    router.push('/'); // back to Today
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Meal</Text>

      <Text style={styles.text}>Editing meal from photo:</Text>
      <Text style={styles.mono}>{photoUri ?? 'no photo uri'}</Text>

      <View style={styles.spacer} />

      <Text style={styles.text}>Mock items:</Text>
      <Text style={styles.text}>• Grilled chicken – 240 kcal</Text>
      <Text style={styles.text}>• Rice – 200 kcal</Text>

      <View style={styles.spacer} />

      <Button title="Save Meal" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
  },
  mono: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  spacer: {
    height: 16,
  },
});


