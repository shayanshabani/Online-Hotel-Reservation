import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import Rooms from './pages/Rooms';
import Navbar from './components/navbar/navbar.component';
import SingleRoom from "./pages/SingleRoom";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Navbar />
      
      <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/rooms" component={Rooms}></Route>
        <Route exact path="/rooms/:slug" component={SingleRoom}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/signup" component={SignUpPage}></Route>
        <Route exact path="/profile" component={ProfilePage}></Route>
      </Switch>
    
    </>
  );
}

export default App;