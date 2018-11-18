import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Player from './player';
import Header from './header.js';
import UploadModal from './uploadModal';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
      <Header/>
      <div className="container-fluid homePage-container">
      <button className="uploadBtn" data-toggle="modal" data-target="#uploadModal">Add Songs</button>
      </div>
      <UploadModal/>
      </Fragment>

    );
  }
}

export default HomePage;
