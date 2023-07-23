import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import Notes from "./components/notes";
import Dashboard from './components/dashboard';
import AuthLayout from "./components/authLayout";
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path='/home'>
        <Dashboard>
          <Notes />
        </Dashboard>
      </Route>
      <Route path='/me'>
        <Dashboard>
          <Profile />
        </Dashboard>
      </Route>
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
    </Switch >
  );
}

export default App;
