import './App.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import BlogDetails from './Pages/Blog-details';
import Map from './Pages/Map';
import CDC from './Pages/CDC';
import NearestPlaces from './Pages/NearestPlaces';
function App() {
  return (
    // <BrowserRouter>
      <Router>
          <Switch>
              <Route exact path="/">
                    <Home />
              </Route>
              <Route exact path="/about"><About /></Route>
              <Route exact path="/contact"><Contact /></Route>
              <Route exact path="/policy"><Policy /></Route>
              <Route exact path="/map"><Map /></Route>
              <Route exact path="/cdc"><CDC /></Route>
              <Route exact path="/nearest-places"><NearestPlaces /></Route>
              <Route exact path="/:slug"><BlogDetails /></Route>
          </Switch>
    </Router>
  // </BrowserRouter>
  );
}

export default App;
