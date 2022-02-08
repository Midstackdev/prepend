import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Home from './Home';
import Login from './Login';
import axios from 'axios';

axios.defaults.baseURL = 'http://app.prepend.test';
axios.defaults.withCredentials = true;

function App() {
  const { user } = false;
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={() => user ? <Redirect to="/" /> : <Login />} />
      </Switch>
    </Router>
  );
}

export default App;
