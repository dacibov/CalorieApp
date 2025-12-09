import { View, Text } from 'react-native';

type Props = {
  loggedDays?: number;
};

export default function ConsistencyIndicator({ loggedDays = 0 }: Props) {
  return (
    <View>
      <Text>Logged {loggedDays} of last 7 days (placeholder)</Text>
    </View>
  );
}
