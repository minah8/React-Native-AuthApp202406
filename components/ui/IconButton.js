import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 아이콘의 종류, 컬러, 사이즈는 각 컴포넌트에서 다양하게 사용될 것이기 때문에
// props를 이용해서 아이콘의 속성을 설정하겠다.
function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
