import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Player from './player';
import Header from './header.js';
import Footer from './footer';
class MusicPlayer extends Component {
  render() {
    return (
      <Fragment>
      <Header/>
      <Player/>
      <Footer/>
      </Fragment>

    );
  }
}

export default MusicPlayer;
