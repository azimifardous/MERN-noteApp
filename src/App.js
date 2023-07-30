import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import Notes from "./components/notes";
import Dashboard from './components/dashboard';
import AuthLayout from "./components/authLayout";
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
          <Profile />
        </Dashboard>
      </ProtectedRoute>
      <Route path='/login'>
        <AuthLayout>
          <LoginForm />
        </AuthLayout>
      </Route>
      <Route path='/register'>
        <AuthLayout>
          <RegisterForm />
        </AuthLayout>
      </Route>
      <Redirect from="/" to="/home" />
    </Switch >
  );
}

export default App;
