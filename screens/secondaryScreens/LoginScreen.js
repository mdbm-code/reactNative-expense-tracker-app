import { useContext, useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
// import { loginUser } from '../util/auth';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
import { authenticateWithSecureStore, setUserParams } from '../../store/redux/features/user/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLoginMutation } from '../../store/redux/api/usersApiSlice';
import { authenticate } from '../../store/redux/features/user';
// import { AuthContext } from '../store/auth.contex';

function LoginScreen() {
  const dispatch = useDispatch();
  const [login, status, error] = useLoginMutation();
  const theme = useSelector(getTheme);
  const [isAuthentiacting, setIsAuthenticating] = useState(false);

  // const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(authenticate(user));
      console.log('Результат аутентификации', user);
    } catch (error) {
      console.log('catch', error);
    }
  }

  // console.log('LoginScreen.isAuthentiacting', isAuthentiacting);

  if (isAuthentiacting) {
    return <LoadingOverlay message={'Авторизация пользователя...'} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} theme={theme} />;
}

export default LoginScreen;
