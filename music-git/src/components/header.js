import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import '../style/styles.css';
import {firebase} from '../firebase_folder';
import ChangePicModal from './changePicModal';
import { db } from "../firebase_folder/firebase";

let userid;
  let defaultPicURL = "https://firebasestorage.googleapis.com/v0/b/music-1597.appspot.com/o/allUsers%2Fdefault.jpg?alt=media&token=2a5b4a3b-9270-47fb-936d-c9c64feaec78";
class Header extends Component {
  componentDidMount(){
    let pageurl = window.location.href;
    if(pageurl.includes('com/music') || pageurl.includes('7000/music')){
      let e = document.getElementById("toggleBtn");
      e.setAttribute('href','/');
      e.innerHTML = 'Home';
       }
    else{
      let e = document.getElementById("toggleBtn");
      e.setAttribute('href','/music');
      e.innerHTML="Go to Playlist";
    }
    console.log(pageurl);
    if(this.props.user){
          userid = this.props.user.uid;
    //Setting the username and profile pic
          let userPath = db.ref(`Users/${userid}`);
          userPath.once("value", function(snapshot) {
          let userObj = snapshot.val();
          document.getElementById('hiUsername').innerHTML = 'Hi '+userObj.username;
          document.getElementById('profileBtn').style.background = "url("+userObj.picURL+")";
          if(userObj.picURL==defaultPicURL){
            document.getElementById('removePicBtn').disabled = true;
          }
              })
    //Setting the username and profile pic end **
  }
}

  logout(){
    firebase.app_initializer.auth().signOut().then((u)=>{
      window.location.reload();
    }).catch((error) => {
        console.log(error);

      });

  }

  render() {
    return (
      <Fragment>
      <div className="header-container">

      <div className="container-fluid header">
      <span className="musica ">MUSICA</span>
      <span className="playthemusic">Play the Music</span>
      <p className="hiUsername profileBtn dropdown-toggle" data-toggle="dropdown" id="hiUsername" ></p>
      <div className='profileBtnContainer' id="profileBtn">


      <ul className="dropdown-menu">

        <li><p className="centerStyle"><a href="/" className="optionStyle" id='toggleBtn' onClick={this.redirectToggle}>Go to playlist </a></p></li>
        <hr className="hrStyle"/>
        <li><p className="centerStyle"><button data-toggle="modal" data-target="#changePicModal" className="optionStyle">Change Pic</button></p></li>
        <hr className="hrStyle"/>
        <li><p className="centerStyle"><a href='/changePassword' className="optionStyle" >Change Pwd</a></p></li>
        <hr className="hrStyle"/>
        <li><p className="centerStyle"><button className="optionStyle" onClick={this.logout}>Logout</button></p></li>
      </ul>

      </div>

      </div>



      <div className='container-fluid header-line'></div>
      </div>
      <ChangePicModal user={this.props.user}/>
      </Fragment>
    );
  }
}

export default Header;
