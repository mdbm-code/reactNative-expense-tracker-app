import { useContext, useState } from 'react';
import AuthContent from '../../components/Auth/AuthContent';
// import { createUser } from '../util/auth';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import { getTheme } from '../../store/redux/selectors/theme';
import { useSelector } from 'react-redux';
// import { AuthContext } from '../store/auth.contex';

function SignupScreen() {
  const theme = useSelector(getTheme);
  const [isAuthentiacting, setIsAuthenticating] = useState(false);
  // const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    //   setIsAuthenticating(true);
    //   try {
    //     const token = await createUser(email, password);
    //     authCtx.authenticate(token);
    //   } catch (error) {
    //     Alert.alert('Ошибка регистрации', error.message);
    //     setIsAuthenticating(false);
    //   }
  }

  if (isAuthentiacting) {
    return <LoadingOverlay message={'Регистрация пользователя...'} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} theme={theme} />;
}

export default SignupScreen;
