import { Route, BrowserRouter as Router, Switch, Redirect, Link } from 'react-router-dom'
import './App.css';
import Home from './Home';
import Login from './Login';
import axios from 'axios';
import Show from './Show';

axios.defaults.baseURL = 'http://app.prepend.test/';
axios.defaults.withCredentials = true;


function App() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const LogoutButton = () => {
  
    const logout = async() => {
        await axios.post('http://app.prepend.test/logout')
        await localStorage.removeItem('user')
        window.location.reload()
    }
  
    return user ? (
      <>
        <Link to={`/`}>
            Home
        </Link>
        <br />
        <button className='btn btn-danger' onClick={logout}>
            Logout
        </button>
      </>
    ) : (
      <>
        <Link to={`/`}>
              Home
        </Link>
      </>
    )
  }
  
  return (
    <Router>
      <div>
      <LogoutButton />
      <Switch>
        <Route path="/" exact component={() => !user ? <Redirect to="/login" /> : <Home />} />
        <Route path="/pokemon/:id" exact component={() => !user ? <Redirect to="/login" /> : <Show />} />
        <Route path="/login" exact component={() => user ? <Redirect to="/" /> : <Login />} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
