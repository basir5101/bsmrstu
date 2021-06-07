import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Signin from './pages/Signin';



export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    token: localStorage.getItem('token')
  })
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}> 
      <Router>
        <Navbar />
        <Switch>
          <Route exact path ='/'>
            <Home />
          </Route>
          <Route path = '/signup'>
            <Registration />
          </Route>
          <Route path = '/login'>
            <Signin />
          </Route>
          <PrivateRoute path = '/profile'>
            <Profile />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
