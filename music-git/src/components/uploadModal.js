import React, { Component } from 'react';
import loadingImg from '../image/load.gif';
import firebase from 'firebase';
import { database } from "../firebase_folder";
import { db } from "../firebase_folder/firebase";
import tick from '../image/tick.png';

let userid;

class UploadModal extends Component {
    constructor(props) {
        super(props);
        this.saveToFirebase = this.saveToFirebase.bind(this);
        userid = this.props.user.uid;
    }



    saveToFirebase(){
      let uploadedFileDownloadURL;
      let e=document.getElementById('fileID');
      let  file = e.files[0];
      console.log(file);
      document.getElementById("tickUpload").style.display='none';



      if(file){
        let filename;
        filename = file.name;

        let songID;
        let userPath = db.ref(`SongsCount`);
          userPath.once("value", function(snapshot) {
        let dbResponse = snapshot.val();

      //usercount updation=============================================================================
        if(dbResponse){
          //if usercount present then updating it..
          let count = Number(dbResponse.songscount)+1;
          songID = 's'+count;

        }
        else{
          //If usercount not there than updating it.
          songID = 's1';
        }

        //Storing the image to firebase Start=========================================================
            let storageRef = firebase.storage().ref('/allSongs/'+songID);
            let uploadTask = storageRef.put(file);
            document.getElementById("fileUploadStatus").innerHTML='Uploading, Please wait..';
            document.getElementById("uploadBtn").disabled = true;

            // Register three observers:
            document.getElementById("progressbarupload").setAttribute('style', 'display:flex !important');
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progressbaruploadstatus").style.width=progress+"%";
            //document.getElementById("progressbarstatus").setAttribute('style', 'width: "50%" !important');

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'

                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'

                break;
            }
          }, function(error) {

            // Handle unsuccessful uploads
            document.getElementById("fileUploadStatus").innerHTML='File Upload Unsuccessful..<br/>Please try again:';
            document.getElementById("uploadBtn").disabled = false;
          }, function() {
            // Handle successful uploads on complete
            let songID;
            let userPath = db.ref(`SongsCount`);
              userPath.once("value", function(snapshot) {
            let dbResponse = snapshot.val();


          //usercount updation=============================================================================
            if(dbResponse){
              //if usercount present then updating it..
              let count = Number(dbResponse.songscount)+1;
              db.ref(`SongsCount`).update({songscount:count,});
              songID = 's'+count;
            }
            else{
              //If usercount not there than updating it.
              database.createSongsCount(1);
              songID = 's1';
            }})
            document.getElementById("tickUpload").style.display='block';
            document.getElementById("progressbarupload").setAttribute('style', 'display:none !important');
            document.getElementById("fileUploadStatus").innerHTML='File Uploaded Successfully..<br/>Select another file to be uploaded:';
            document.getElementById('fileID').value = null;
            document.getElementById("uploadBtn").disabled = false;

            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              uploadedFileDownloadURL = downloadURL;

              database.createNewSong(userid,songID,filename,uploadedFileDownloadURL);
              //database.createUserDetails(userID,name,email,uploadedImgDownloadURL,themeNum);
            });
          });


      })
        //storing the file to firebase stop===========================================================
        console.log("Saved to firebase");
      }
    }

    checkFile(){
      let e=document.getElementById('fileID');
        console.log(e);
      let  file = e.files[0];

      if(!file.type.includes("audio")){
        e.value = null;
      }
    }




    render() {
        return (
            <div className="modal fade " id="uploadModal" tabIndex="-2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
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
                          <img src={loadingImg} className="loading" id="loading-1"/>
                          <div className="progress progress-custom" id='progressbarupload'>
                           <div className="progress-bar  progress-bar-striped active-custom " role="progressbar" id='progressbaruploadstatus'aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:"0%"}}>
                             <span className="sr-only">70% Complete</span>
                           </div>
                         </div>
                         <img src={tick} id="tickUpload" className="tickStyle"/>
                						<p className="modal-msg fileStatus" id="fileUploadStatus">Select the file to be uploaded: <br/></p>



                							<input type="file"  id="fileID" name="musicfile" accept="audio/*" onChange={this.checkFile}  required={true}/>

                					</div>
                					<div className="modal-footer modal-footer-ma">
                						<input type="button" className="btn btn-default btn-close" id="uploadBtn" value="Upload" onClick={this.saveToFirebase} />
                						</div>
                				</form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UploadModal;
