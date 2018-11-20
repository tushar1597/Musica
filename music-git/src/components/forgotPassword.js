import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom';
import {firebase} from '../firebase_folder';
import Header from './header.js';
import Footer from './footer.js';
import background from '../image/background4.jpg';
import { database } from "../firebase_folder";
import tick from '../image/tick.png';
import loadingImg from '../image/load.gif';

let defaultPicURL = "https://firebasestorage.googleapis.com/v0/b/music-1597.appspot.com/o/allUsers%2Fdefault.jpg?alt=media&token=2a5b4a3b-9270-47fb-936d-c9c64feaec78";


class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);


    this.state = {
      email: '',
    };

  }

  componentDidMount(){

    document.getElementById('profileBtn').style.display = "none";
    document.getElementById('body').style.backgroundImage = "url("+background+")";

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  forgotPassword(e){
    e.preventDefault();
    document.getElementById('loading-1').setAttribute('style', 'display:block !important');
    //console.log("Method called..");
    let email= document.getElementById('emailID').value;
    console.log(email);
    //console.log(firebase.app_initializer.auth());
    firebase.app_initializer.auth().sendPasswordResetEmail(email).then(() => {
                //mailed successfully..
                document.getElementById('loading-1').setAttribute('style', 'display:none !important');
                document.getElementById('email-groupID').style.display='none';
                document.getElementById('send-email-btn').setAttribute('style', 'display:none !important');
                document.getElementById('tickID').setAttribute('style', 'display:block !important');
                document.getElementById('resetMsg').setAttribute('style', 'display:block !important');
            })
            .catch((error) => {
              document.getElementById('loading-1').setAttribute('style', 'display:none !important');
              document.getElementById('email-groupID').style.display='block';
              document.getElementById('send-email-btn').setAttribute('style', 'display:block !important');
              document.getElementById('tickID').setAttribute('style', 'display:none !important');
              document.getElementById('resetMsg').setAttribute('style', 'display:none !important');
              document.getElementById('errorMsg').style.display='block';
              document.getElementById('hrForm').style.display='block';
              document.getElementById('errorMsg').innerHTML=error.message+"*";
              console.log(error);

            });
  }


  render() {
    return (
      <Fragment>
      <Header/>
      <div className="container fp-container">
        <div className='header-form-container'>
      <div className="container-fluid formHeader">
      <p className="formHeading"> Forgot Password?</p>
      </div>

       <form className="loginInForm" >
       <img src={loadingImg} className="loading" id="loading-1"/>
       <img src={tick} id="tickID" className="tickStyle-fp"/>
       <p className="errorMsg" id='errorMsg'>Error</p>
       <hr className='hr-form'id="hrForm"/>
      <div className="form-group" id='email-groupID'>
       <label htmlFor="exampleInputEmail1" className="form-items">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control form-input" id="emailID" aria-describedby="emailHelp" placeholder="Enter email" />
       <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <p className="resetMsg" id='resetMsg'>The Password Reset Link has been sent to your Email. Kindly check your email and change your pasword.. Thankyou!</p>
      <div className='form-btns'>
      <button  type='submit' onClick={this.forgotPassword} className="btn btn-signup" id='send-email-btn'>Send Password Reset Email</button>
      <br className='fp-break'/>
      <a href='/' style={{marginLeft: '15px'}} className="btn btn-login-fp" id='login-btn'> Login</a>
      <a href='/' style={{marginLeft: '15px'}} className="btn btn-signup-fp" id='signup-btn'>Signup</a>
      </div>

 </form>
</div>
 </div>
      <Footer/>
 </Fragment>
    );
  }
}
export default ForgotPassword;
