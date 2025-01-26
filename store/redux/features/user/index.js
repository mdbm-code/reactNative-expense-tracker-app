import userReducer from './userSlice';
import { authenticate, logout } from './userThunks';

export { authenticate, logout };
export default userReducer;