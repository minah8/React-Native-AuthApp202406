import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { Colors } from './constants/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import { useContext } from 'react';
import { AuthContext } from './store/auth-context';
import { StatusBar } from 'expo-status-bar';
import IconButton from './components/ui/IconButton';

const Stack = createNativeStackNavigator();

// 아직 인증이 되지 않은 사용자가 보게 될 화면 stack
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // Header 블록에 대한 스타일
        headerStyle: { backgroundColor: Colors.primary500 },
        // Header에 텍스트, 버튼 색상
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
};

// 인증이 완료된 사용자가 보게 될 stack
const AuthenticatedStack = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerRight: () => {
            return (
              <IconButton
                icon='exit'
                color='white'
                size={30}
                onPress={logout}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  console.log('isLoggedIn: ', authCtx.isLoggedIn);
  return (
    <NavigationContainer>
      {!authCtx.isLoggedIn && <AuthStack />}
      {authCtx.isLoggedIn && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <AuthContext.Provider>
        <Navigation />
      </AuthContext.Provider>
    </>
  );
}
