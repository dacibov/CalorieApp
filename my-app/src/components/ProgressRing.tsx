import { View, Text } from 'react-native';

type Props = {
  progress?: number; // 0–1
};

export default function ProgressRing({ progress = 0 }: Props) {
  return (
    <View>
      <Text>ProgressRing: {Math.round(progress * 100)}% (placeholder)</Text>
    </View>
  );
}
