import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import MusicPlayer from './components/musicPlayer';
import HomePage from './components/homePage';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {firebase} from './firebase_folder';
import Login from './components/login';
import Welcome from './components/welcome.js';
import ForgotPassword from './components/forgotPassword.js';
import ChangePassword from './components/changePassword.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:"start",
    }
  }

  componentDidMount(){
    this.authListener();
  }

//this function is called whenever a user logs in or logs out
  authListener(){
    firebase.app_initializer.auth().onAuthStateChanged((user)=>{
      console.log(user);
      if(user){
        this.setState({user});
        localStorage.setItem('user',user.uid);
      }else{
        this.setState({user:null});
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    //when the user is logged in..
    if(this.state.user!="start" && this.state.user ){
      return (
        <Router>
        <Fragment>
            <Route path="/" exact strict component={() => <HomePage user = {this.state.user}/>}/>
            <Route path="/music" exact strict component={() => <MusicPlayer user={this.state.user}/>}/>
            <Route path="/changePassword" exact strict component={() => <ChangePassword user={this.state.user}/>}/>
        </Fragment>
        </Router>
      );
    }
    //when the user state is not set.
    else if(this.state.user=='start'){
      return(
        <Router>
        <Fragment>
            <Route path="/" exact strict component={() => <Welcome/>}/>
            <Route path="/music" exact strict component={() => <Welcome/>}/>
            <Route path="/forgotPassword" exact strict component={() => <Welcome/>}/>
            <Route path="/changePassword" exact strict component={() => <Welcome/>}/>
        </Fragment>
        </Router>
      )
    }
    //when the user object is null..
    else{
      return(
        <Router>
        <Fragment>
            <Route path="/" exact strict component={() => <Login/>}/>
            <Route path="/music" exact strict component={() => <Login/>}/>
            <Route path="/forgotPassword" exact strict component={() => <ForgotPassword/>}/>
            <Route path="/changePassword" exact strict component={() => <Login/> }/>
        </Fragment>
        </Router>
      )
  }
}
}
export default App;
