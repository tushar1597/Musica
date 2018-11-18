import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import MusicPlayer from './components/musicPlayer';
import HomePage from './components/homePage';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Router>
      <Fragment>
          <Route path="/" exact strict component={() => <HomePage/>}/>
          <Route path="/music" exact strict component={() => <MusicPlayer/>}/>
      </Fragment>
      </Router>

    );
  }
}

export default App;
