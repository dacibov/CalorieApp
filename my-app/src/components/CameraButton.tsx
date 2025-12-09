import { Pressable, Text } from 'react-native';

type Props = {
  onPress?: () => void;
};

export default function CameraButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text>CameraButton (placeholder)</Text>
    </Pressable>
  );
}
