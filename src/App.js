import LoginPage from './components/auth/loginPage';
import RegisterForm from "./components/registration/registerForm";
import ProfilePage from './components/profile/profilePage';
import Notes from "./components/notes/notes";
import Dashboard from './components/dashboard/dashboard';
import ProtectedRoute from "./components/common/protectedRoute";
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <ProtectedRoute path='/home'>
        <Dashboard>
          <Notes />
        </Dashboard>
      </ProtectedRoute>
      <ProtectedRoute path='/me'>
        <Dashboard>
          <ProfilePage />
        </Dashboard>
      </ProtectedRoute>
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={RegisterForm} />
      <Redirect from="/" to="/home" />
    </Switch >
  );
}

export default App;
