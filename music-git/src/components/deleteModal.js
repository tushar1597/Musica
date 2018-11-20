import React, { Component } from 'react';
import loadingImg from '../image/load.gif';
import firebase from 'firebase';
import { database } from "../firebase_folder";
import { db } from "../firebase_folder/firebase";
import tick from '../image/tick.png';

let userid;

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        if(this.props.user){
          userid = this.props.user.uid;
        }
    }
  deleteSong(keyObj){
    //Deleting the audio file from firebase and storage itself..
    let key = keyObj.key;
    document.getElementById('del-msg').innerHTML = "Deleting, Please Wait..";
    document.getElementById('loading-2').style.display='block';
    let storageRef = firebase.storage().ref('/allSongs/'+key);
    storageRef.delete().then(function() {
      // File deleted successfully
      //removing from database...
      let userPath = db.ref(`Songs/${userid}/${key}`);
      userPath.remove();
      window.location.reload();

    }.bind(this)).catch(function(error) {
        document.getElementById('fileStatus').innerHTML = "File not deleted due to some errors, please try again..";
        document.getElementById('loading-2').style.display='none';
        // Uh-oh, an error occurred!
      });
  }








    render() {
        return (
            <div className="modal fade " id="deleteModal" tabIndex="-2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog uploadModalStyle" role="document">

                    <div className="modal-content">

                        <div className="modal-header modal-header-custom">
                        <h4 className="modal-title modalheading">Be a part of Musica</h4>
                            <p className="fbpopup-content" id="exampleModalLabel"></p>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                        </div>
                        <div className="container-fluid header-line"></div>

                        <div className="modal-body">

                				{/*upload song FORM ===================================================== */}
                					<form className="pcform" name="uploadform" >

                					<div className="modal-body">
                          <img src={loadingImg} className="loading" id="loading-2"/>

                          <p className="modal-msg fileStatus" id="fileStatus"></p>
                						<p className="modal-msg fileStatus" id="del-msg">Are you sure to delete the file?</p>





                					</div>
                					<div className="modal-footer modal-footer-ma">
                						<input type="button" className="btn btn-default btn-close" id="uploadBtn" value="Yes" onClick={()=>this.deleteSong(this.props.keyToBeDeleted)} />
                						<button type="button" className="btn btn-default btn-close" data-dismiss="modal">No</button>
                					</div>
                				</form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteModal;
