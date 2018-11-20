import { db } from './firebase';

// User API
//creating a new song in firebase..
export const createNewSong = (uid,id,name,url)=>
db.ref(`Songs/${uid}/${id}`).set({
    name,
    url
});


export const createSongsCount = (songscount)=>
db.ref(`SongsCount`).set({
  songscount,

});

export const createUser = (userID,username,picURL)=>
db.ref(`Users/${userID}`).set({
  username,
  picURL,
});
