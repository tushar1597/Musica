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


class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);


    this.state = {
      email: '',
    };

  }

  componentDidMount(){

    document.getElementById('body').style.backgroundImage = "url("+background+")";

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  changePassword(e){
    e.preventDefault();
    //document.getElementById('loading-3').setAttribute('style', 'display:block !important');
    //console.log("Method called..");
    let password1= document.getElementById('passwordID1').value;
    let password2= document.getElementById('passwordID2').value;
    if(password1==password2){
      //console.log(firebase.app_initializer.auth());
      firebase.app_initializer.auth().currentUser.updatePassword(password1).then((r) => {
                  //mailed successfully..
                  console.log(r);
                  //document.getElementById('loading-3').setAttribute('style', 'display:none !important');
                  document.getElementById('pw-groupID1').style.display='none';
                  document.getElementById('pw-groupID2').style.display='none';
                  document.getElementById('send-email-btn').setAttribute('style', 'display:none !important');
                  document.getElementById('tickID').setAttribute('style', 'display:block !important');
                  document.getElementById('resetMsg1').setAttribute('style', 'display:block !important');
              })
              .catch((error) => {
                document.getElementById('loading-1').setAttribute('style', 'display:none !important');
                document.getElementById('pw-groupID1').style.display='block';
                document.getElementById('pw-groupID2').style.display='block';
                document.getElementById('send-email-btn').setAttribute('style', 'display:block !important');
                document.getElementById('tickID').setAttribute('style', 'display:none !important');
                document.getElementById('resetMsg1').setAttribute('style', 'display:none !important');
                document.getElementById('errorMsg').style.display='block';
                document.getElementById('hrForm').style.display='block';
                document.getElementById('errorMsg').innerHTML=error.message+"*";
                console.log(error);

              });
    }
    else{
      document.getElementById('errorMsg').style.display='block';
      document.getElementById('hrForm').style.display='block';
      document.getElementById('errorMsg').innerHTML="The two passwords must match."+"*";
    }

  }


  render() {
    return (
      <Fragment>
      <Header user={this.props.user}/>
      <div className="container fp-container">
        <div className='header-form-container'>
      <div className="container-fluid formHeader">
      <p className="formHeading">Change your Account Password...</p>
      </div>

       <form className="loginInForm" >
       <img src={loadingImg} className="loading" id="loading-3"/>
       <img src={tick} id="tickID" className="tickStyle-fp"/>
       <p className="errorMsg" id='errorMsg'>Error</p>
       <hr className='hr-form'id="hrForm"/>
       <div className="form-group" id='pw-groupID1'>
        <label htmlFor="passwordID1" className="form-items">New Password</label>
        <input value={this.state.password} onChange={this.handleChange} type="password" name="password1" className="form-control form-input" id="passwordID1" aria-describedby="emailHelp" placeholder="Enter new password" />

       </div>
      <div className="form-group" id='pw-groupID2'>
       <label htmlFor="passwordID2" className="form-items">Enter new password</label>
       <input value={this.state.password} onChange={this.handleChange} type="password" name="password2" className="form-control form-input" id="passwordID2" aria-describedby="emailHelp" placeholder="Enter new password" />
       <small id="emailHelp" className="form-text text-muted">The two passwords must match.</small>
      </div>
      <p className="resetMsg" id='resetMsg1'>Your Password has been updated. Thanks for being a part of Musica!</p>
      <div className='form-btns'>
      <button  type='submit' onClick={this.changePassword} className="btn btn-signup" id='send-email-btn'>Change Password</button>


      </div>

 </form>
</div>
 </div>
      <Footer/>
 </Fragment>
    );
  }
}
export default ChangePassword;
