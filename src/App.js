import LoginForm from "./components/loginForm";
import { Redirect, Route, Switch } from 'react-router-dom';
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
}

export default App;
