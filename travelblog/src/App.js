import './App.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import BlogDetails from './Pages/Blog-details';
function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                  <Home />
            </Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/contact"><Contact /></Route>
            <Route exact path="/policy"><Policy /></Route>
            <Route exact path="/:slug"><BlogDetails /></Route>
        </Switch>
  </Router>
  );
}

export default App;
