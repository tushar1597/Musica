import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Player from './player';
import Header from './header.js';
import Footer from './footer';
class MusicPlayer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Fragment>
      <Header user={this.props.user}/>
      <Player user={this.props.user}/>
      <Footer/>
      </Fragment>

    );
  }
}

export default MusicPlayer;
