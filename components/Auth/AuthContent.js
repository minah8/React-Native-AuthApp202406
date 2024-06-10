import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import AuthForm from './AuthForm';
import FlatButton from '../ui/FlatButton';
import { Colors } from '../../constants/styles';

const AuthContent = (onAuthenticate) => {
  const [isLogin, setIsLogin] = useState(true);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  const submitHandler = (credentials) => {
    let { email, name, password, confirmPassword } = credentials;
    console.log('submitHandler email: ', email);

    email = email.trim();
    password = password.trim();
    const nameRegex = /^[가-힣]{2,5}$/;

    // 실제로 적용하실 때는 각 입력 창마다 정규표현식으로 빡세게 검사하세요.
    const emailIsValid = email.includes('@');
    const nameIsValid = nameRegex.test(name);
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !passwordsAreEqual)) // isLogin값에 따라 검증 해야할 게 있고 안해야 할 게 있다.
    ) {
      Alert.alert(
        '유효하지 않은 입력값이 있습니다. 확인 후 다시 입력해 주세요.',
      );
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !nameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    // 회원가입 or 로그인 처리

    onAuthenticate({ email, password, name });
  };

  return (
    <View style={styles.AuthContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View>
        <FlatButton>
          {isLogin ? '회원 가입하기' : '로그인 화면으로 이동하기'}
        </FlatButton>
      </View>
    </View>
  );
};

export default authContent;

const styles = StyleSheet.create({
  AuthContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
