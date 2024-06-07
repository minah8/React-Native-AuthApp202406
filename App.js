import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthForm from './components/Auth/AuthForm';
import AuthContent from './components/Auth/AuthContent';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
