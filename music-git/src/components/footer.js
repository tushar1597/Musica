import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import '../style/styles.css';


class Footer extends Component {

  render() {
    return (
      <Fragment>
      <div className="footer" id="footerid">
      <div className='row'>
      <div className="col-sm-4"><div className="musiciconfooter"><i className="fa fa-music"></i> <span > MUSICA</span></div></div>
      <div className="col-sm-4 playthemusicfooter">Play the music</div>
      <div className="col-sm-4 lastfootersection">Developed By Tushar Sibal<br/><i className="fa fa-envelope"></i> <a href="mailto:tusharsibal1597@gmail.com" className="email" >tusharsibal1597@gmail.com</a></div>
      </div>
      <div className="row">
      <div className="col-sm-12 footerbottom"><p className="copyright">Copyright © Musica 2018</p></div>
      </div>
      </div>
      </Fragment>
    );
  }
}

export default Footer;
