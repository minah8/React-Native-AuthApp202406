import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticate = (token) => {
    console.log('authenticate called!');
    AsyncStorage.setItem('ACCESS_TOKEN', token.access_token);
    AsyncStorage.setItem('REFRESH_TOKEN', token.refresh_token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    AsyncStorage.clear();
  };

  const value = {
    isLoggedIn,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
