import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Player from './player';
import Header from './header.js';
import ReactLoader from './ReactLoader';

class Welcome extends Component {
  render() {
    return (
      <Fragment>
      <ReactLoader/>
      </Fragment>

    );
  }
}

export default Welcome;
