import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function CameraScreen() {
  const handleCapture = () => {
    router.push({
      pathname: '/edit-meal',
      params: { photoUri: 'mock://photo' },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera</Text>
      <Text style={styles.text}>
        (Camera placeholder – we’ll use the real camera later.)
      </Text>

      <View style={styles.spacer} />

      <Button title="Simulate Capture" onPress={handleCapture} />
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
});

