import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import '../style/styles.css';
import UploadModal from './uploadModal';

class Header extends Component {
  componentDidMount(){
    let pageurl = window.location.href;
    if(pageurl.includes('com/music')){
      let e = document.getElementById("toggleBtn");
      e.setAttribute('href','/');
      e.innerHTML = 'Go Home';
       }
    else{
      let e = document.getElementById("toggleBtn");
      e.setAttribute('href','/music');
      e.innerHTML="Go to Playlist";
    }
    console.log(pageurl);
  }

  render() {
    return (
      <Fragment>
      <div className="header-container">
      <div className="container-fluid header">
      <span className="musica ">MUSICA</span>
      <span className="playthemusic">Play the Music</span>
      <a className="toogleBtn" href="/" id='toggleBtn' onClick={this.redirectToggle}>Go to Playlist</a>
      </div>
      <div className='container-fluid header-line'></div>
      </div>

      </Fragment>
    );
  }
}

export default Header;
