import './App.css';
import WordCard from "./components/WordCard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./pages/home";
import Login from './pages/login';
import Register from './pages/register';
import {useSelector} from "react-redux";
import Dicts from "./pages/dictionary";
import Practice from "./pages/practice";

function App() {
  const token = useSelector(state => state.client.token);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            { token ? <Redirect to="/home/" /> : <Redirect to="/login/" /> }
          </Route>
          <Route exact path="/login/" component={!token ? Login : () => <Redirect to="/home/" /> } />
          <Route exact path="/register/" component={!token ? Register : () => <Redirect to="/home/" /> } />
          <Route exact path="/home/" component={token ? Home : () => <Redirect to="/login/" /> } />
          <Route exact path="/home/dicts/:id" component={token ? Dicts : () => <Redirect to="/login/" /> } />
          <Route exact path="/home/dicts/:id/practice/" component={token ? Practice : () => <Redirect to="/login/" /> } />
          <Route exact path="/learn/:word/" component={token ? WordCard : () => <Redirect to="/login/" /> } />
          <Route component={() => <Redirect to="/login/" />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
