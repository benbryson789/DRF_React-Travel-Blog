import './App.css';
import {Route, BrowserRouter as Router, Switch,Redirect} from 'react-router-dom';
//import { BrowserRouter} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import BlogDetails from './Pages/Blog-details';
import Map from './Pages/Map';
import CDC from './Pages/CDC';
import NearestPlaces from './Pages/NearestPlaces';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';
import ManageBlogs from './Pages/ManageBlogs';
import AddBlog from './Pages/AddBlog';
import EditBlog from './Pages/EditBlog';
import React from 'react';
function App() {
  return (
    // <BrowserRouter>
      <Router>
          <Switch>
              <Route exact path="/">
                    <Home />
              </Route>
              <Route exact path="/about"><About /></Route>
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/change-password" component={ChangePassword} />
              <PrivateRoute exact path="/manage-blogs" component={ManageBlogs} />
              <PrivateRoute exact path="/manage-blogs/add" component={AddBlog} />
              <PrivateRoute exact path="/manage-blogs/edit/:id" component={EditBlog} />
              <Route exact path="/register"><Register /></Route>
              <Route exact path="/login"><Login /></Route>
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

  // private route added profile menu items in sidebar
  //user can access private route after login
  //private route function calls private route for profile above or any component which one we need to make private
  //component in react.createelement refers private components in routing;
  //rest attribute captures the code in the routing components and delivers it line 62 {...rest}
  function PrivateRoute({component,...rest}){
    //local storatge checking if user is logged in or not 
    
    return(
      
        (! localStorage.getItem("loginStatus")) ?
      <Redirect to="login"/>
      :
      <Route 
      // exact path="/change-password" 
      // passes parameters dynamically in {...rest} which are ther url for the path
        {...rest}
        render={props=>(
          React.createElement(component,props)
        )

        }
      />
    )
  }
}

export default App;
