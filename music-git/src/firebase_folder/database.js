import { db } from './firebase';

// User API
//creating a new song in firebase..
export const createNewSong = (id,name,url)=>
db.ref(`Songs/${id}`).set({
    name,
    url
});


export const createSongsCount = (songscount)=>
db.ref(`SongsCount`).set({
  songscount,

});
