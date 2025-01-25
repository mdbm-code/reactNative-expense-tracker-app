import { useContext, useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
// import { loginUser } from '../util/auth';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from '../../store/redux/selectors/theme';
// import { AuthContext } from '../store/auth.contex';

function LoginScreen() {
  const theme = useSelector(getTheme);
  const [isAuthentiacting, setIsAuthenticating] = useState(false);

  // const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    //   setIsAuthenticating(true);
    //   try {
    //     const token = await await loginUser(email, password);
    //     authCtx.authenticate(token);
    //   } catch (error) {
    //     Alert.alert('Ошибка авторизации', error.message);
    //     setIsAuthenticating(false);
    //   }
  }

  // console.log('LoginScreen.isAuthentiacting', isAuthentiacting);

  if (isAuthentiacting) {
    return <LoadingOverlay message={'Авторизация пользователя...'} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} theme={theme} />;
}

export default LoginScreen;
