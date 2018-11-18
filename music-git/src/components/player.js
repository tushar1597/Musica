import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import firebase from 'firebase';
import { database } from "../firebase_folder";
import { db } from "../firebase_folder/firebase";
import $ from 'jquery';
import  musicImg from "../image/musicImg.jpg";
import ReactLoader from './ReactLoader';
import DeleteModal from './deleteModal';

let keys = [];
let filenames = [];
let urls = [];



class Player extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      displayLinks:false,
    }
  }

  componentDidMount(){
    let dbResponse;
    let userPath = db.ref(`Songs`);
          userPath.once("value", function(snapshot) {
          dbResponse = snapshot.val();

          for (var key in dbResponse) {
            //console.log(dbResponse[key]);
            keys.push(key);
            filenames.push(dbResponse[key]['name']);
            urls.push(dbResponse[key]['url']);

          }
          //console.log(filenames);
          //console.log(urls);
          //console.log(keys);
          this.setState({
            displayLinks:true,
          });
          }.bind(this));
  }

addMarquee(id){
          let check;

          let  element = document.getElementById("overflow"+id.index);

						check=this.isElementOverflowing(element);
						if (check){
							this.wrapContentsInMarquee(element);
						}
}
isElementOverflowing(element) {

				let overflowX = element.offsetWidth < element.scrollWidth;
				let overflowY = element.offsetHeight < element.scrollHeight;

				return (overflowX || overflowY);
			}



	wrapContentsInMarquee(element) {
			{
					let marqueeid= "marqueetagid"
					let marquee = document.createElement('marquee');
					let contents = element.innerText;
					marquee.setAttribute('id', marqueeid);
          marquee.innerText=contents;
          element.innerHTML="";
					element.appendChild(marquee);

				}
			}
removeMarquee(id){
  let elementID = "overflow"+id.index;
  if(document.getElementById('marqueetagid')){
	let songtitle = document.getElementById('marqueetagid').innerHTML;
	var element = document.getElementById('marqueetagid');
	element.parentNode.removeChild(element);
	document.getElementById(elementID).innerHTML = songtitle;
}

}

autoplayfunction(id){
//id is of the song file that is in play
  //console.log(id);
  $("audio").on("play", function() {
  				$("audio").not(this).each(function(index, audio) {
  					audio.pause();

  				});
  			});
  this.setState({
    currentSongID:id.index
  })
}


setKey(key){
  this.setState({
    keyToBeDeleted:key,
  })
}

  render() {
    if(this.state.displayLinks){

      let audios = keys.map((key,index) =>{
        let audio_url = urls[index];
          let audio_name = filenames[index];
        let container_id = "container"+index.toString();
        let well_id = "well"+index.toString();
        let subcontainer_id= "sc"+index.toString();
        let del_btn = "delbtn"+index.toString();
        let img_id = "img"+index.toString();
        let overflow_id = "overflow"+index.toString();
        let div_id = "div"+index.toString();
        let audio_id = "audio"+index.toString();
        let source_id = "source"+index.toString();
        return (
          <div className="col-md-3 col-sm-4 col-remove-padding" key={container_id} onMouseLeave={()=>this.removeMarquee({index})}>
            <div className="well well2" key={well_id}>
            <div key={subcontainer_id}>
            <button className="btn btn-del" key={del_btn} data-toggle="modal" data-target="#deleteModal" onClick={()=>this.setKey({key})} >x</button>
            <img src={musicImg} className="songimg"  key={img_id} onMouseOver={()=>this.addMarquee({index})}/></div>
          <div className="overflow" key={overflow_id} id={overflow_id}>
            {audio_name}
          </div>
          <div key={div_id}>
            <audio controls className="audio" preload="auto"  key={audio_id} id={index} onMouseOver={()=>this.addMarquee({index})} controlsList="nodownload" onPlay={()=>this.autoplayfunction({index})}>
              <source  src={audio_url} type="audio/mp3" key={source_id}/ >
                1. Your browser does not support the audio element.
              </audio>
            </div>
            </div>
            <DeleteModal keyToBeDeleted={this.state.keyToBeDeleted}/>
          </div>
        )
      });

      return (
        <div className="container audios-container">
        <div className='row'>

        {audios}

        </div>
        </div>
      );
    }
    else{
      return (
        <ReactLoader/>

      );
    }

  }
}

export default Player;
