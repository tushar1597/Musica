import React, { Component } from 'react';
import loadingImg from '../image/load.gif';
import firebase from 'firebase';
import { database } from "../firebase_folder";
import { db } from "../firebase_folder/firebase";
import tick from '../image/tick.png';
import defaultpic from '../image/default.jpg';

let userid;

class ChangePicModal extends Component {
    constructor(props) {
        super(props);
        this.saveToFirebase = this.savePicToFirebase.bind(this);
        if(this.props.user){
        userid = this.props.user.uid;
        console.log("Change pic==",userid);
      }
    }

    removePicFromFirebase(){

      //document.getElementById('del-msg').innerHTML = "Deleting, Please Wait..";
      document.getElementById('loading-1').style.display='block';
      document.getElementById('fileStatus').innerHTML = "Removing the display picture, please wait.."
      let storageRef = firebase.storage().ref('/allUsers/'+userid);
      storageRef.delete().then(function() {
        // File deleted successfully
        db.ref(`Users/${userid}`).update({
        picURL:"https://firebasestorage.googleapis.com/v0/b/music-1597.appspot.com/o/allUsers%2Fdefault.jpg?alt=media&token=2a5b4a3b-9270-47fb-936d-c9c64feaec78",
      });

        window.location.reload();

      }.bind(this)).catch(function(error) {
          document.getElementById('fileStatus').innerHTML = "Picture not removed due to some errors, please try again..";
          document.getElementById('loading-1').style.display='none';
          // Uh-oh, an error occurred!
        });
    }



    savePicToFirebase(){
      let uploadedFileDownloadURL;
      let e=document.getElementById('fileId');
      let  file = e.files[0];
      console.log(file);
      document.getElementById("tick").style.display='none';



      if(file){
        let filename;
        filename = file.name;

        let songID;
        let userPath = db.ref(`Users/${userid}`);
        //Storing the image to firebase Start=========================================================
            let storageRef = firebase.storage().ref('/allUsers/'+userid);
            let uploadTask = storageRef.put(file);
            document.getElementById("fileStatus").innerHTML='Uploading, Please wait..';
            document.getElementById("uploadPicBtn").disabled = true;
            document.getElementById("removePicBtn").disabled = true;
            // Register three observers:
            document.getElementById("progressbar").setAttribute('style', 'display:flex !important');
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("progressbarstatus").style.width=progress+"%";
            //document.getElementById("progressbarstatus").setAttribute('style', 'width: "50%" !important');

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'

                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'

                break;
            }
          }, function(error) {

            // Handle unsuccessful uploads
            document.getElementById("fileStatus").innerHTML='File Upload Unsuccessful..<br/>Please try again:';
            document.getElementById("uploadPicBtn").disabled = false;
          }, function() {
            // Handle successful uploads on complete
            document.getElementById("tick").style.display='block';

            document.getElementById("removePicBtn").disabled = true;
            document.getElementById("progressbar").setAttribute('style', 'display:none !important');
            document.getElementById("fileStatus").innerHTML='Pic changed successfully, please wait while server is updating..';
            document.getElementById('fileId').value = null;


            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              uploadedFileDownloadURL = downloadURL;
                            let dbResponse;
                          //saving the pic to database
                                  console.log("Updated in firebase")
                                  db.ref(`Users/${userid}`).update({
                                    picURL:uploadedFileDownloadURL
                                  });
                          //Saving the pic to database ** end
                          window.location.reload();
          });



        //storing the file to firebase stop===========================================================
        console.log("Saved to firebase");
        //window.location.reload();
    })
  }
}

    checkFile(){
      let e=document.getElementById('fileId');
      let  file = e.files[0];
      console.log(file);
      if(!file.type.includes("image")){
        e.value = null;
      }
    }




    render() {
        return (
            <div className="modal fade " id="changePicModal" tabIndex="-2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog uploadModalStyle" role="document">

                    <div className="modal-content">

                        <div className="modal-header modal-header-custom">
                        <h4 className="modal-title modalheading">Change your Display Picture</h4>
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
                          <div className="progress progress-custom" id='progressbar'>
                           <div className="progress-bar  progress-bar-striped active-custom " role="progressbar" id='progressbarstatus'aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width:"0%"}}>
                             <span className="sr-only">70% Complete</span>
                           </div>
                         </div>
                         <img src={tick} id="tick" className="tickStyle"/>
                						<p className="modal-msg fileStatus" id="fileStatus">Upload your pic: <br/></p>



                							<input type="file"  id="fileId" name="musicfile" accept="image/*" onChange={this.checkFile}  required={true}/>

                					</div>
                					<div className="modal-footer modal-footer-ma">
                						<input type="button" className="btn btn-default btn-close" id="uploadPicBtn" value="Upload" onClick={this.savePicToFirebase} />
                            <input type="button" className="btn btn-default btn-close" id="removePicBtn" value="Remove" onClick={this.removePicFromFirebase} />
                						</div>
                				</form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePicModal;
