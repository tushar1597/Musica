import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import {firebase} from '../firebase_folder';
import Header from './header.js';
import Footer from './footer.js';
import background from '../image/background4.jpg';
import { database } from "../firebase_folder";
let defaultPicURL = "https://firebasestorage.googleapis.com/v0/b/music-1597.appspot.com/o/allUsers%2Fdefault.jpg?alt=media&token=2a5b4a3b-9270-47fb-936d-c9c64feaec78";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);

    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount(){
    document.getElementById('profileBtn').style.display = "none";
    document.getElementById('body').style.backgroundImage = "url("+background+")";
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    firebase.app_initializer.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
        document.getElementById('errorMsg').style.display='block';
        document.getElementById('hrForm').style.display='block';
        document.getElementById('errorMsg').innerHTML=error.message+"*";
      });
  }

  forgotPassword(){

  }

  signup(e){
    document.getElementById('errorMsg').style.display='none';
    document.getElementById('hrForm').style.display='none';
    e.preventDefault();
    firebase.app_initializer.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      //saving the details in firebase
      console.log(u);
      let userID = u.user.uid;
      let email = u.user.email;

      console.log(u.user.uid,u.user.email);
      let username = email.substring(0,email.indexOf('@'));
      database.createUser(userID,username,defaultPicURL);

    }).catch((error) => {
        console.log(error);
        document.getElementById('errorMsg').style.display='block';
        document.getElementById('hrForm').style.display='block';
        document.getElementById('errorMsg').innerHTML=error.message+"*";
      })
  }
  render() {
    return (
      <Fragment>
      <Header/>
      <div className="container fp-container" >
        <div className='header-form-container'>
      <div className="container-fluid formHeader">
      <p className="formHeading"> Be a part of Musica..</p>
      </div>

       <form className="loginInForm ">
       <p className="errorMsg" id='errorMsg'>Error</p>
       <hr className='hr-form'id="hrForm"/>
      <div className="form-group">
       <label htmlFor="exampleInputEmail1" className="form-items">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control form-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
       <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
       <div className="form-group">
      <label htmlFor="exampleInputPassword1" className="form-items">Password</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control form-input" id="exampleInputPassword1" placeholder="Password" />
      </div>

      <button type="submit" onClick={this.login} className="btn btn-login" id='login-btn'> Login</button>
      <button onClick={this.signup} style={{marginLeft: '15px'}} className="btn btn-signup" id='signup-btn'>Signup</button>
      <a href="/forgotPassword" style={{marginLeft: '15px'}} className="btn btn-fpassword" id='forgotPasswordText'>Forgot Password?</a>
       </form>
</div>
 </div>
      <Footer/>
 </Fragment>
    );
  }
}
export default Login;
