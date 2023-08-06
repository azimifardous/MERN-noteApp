import LoginPage from './components/loginPage';
import RegisterForm from "./components/registerForm";
import ProfilePage from './components/profilePage';
import Notes from "./components/notes";
import Dashboard from './components/dashboard';
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/logout" component={Logout} />
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
