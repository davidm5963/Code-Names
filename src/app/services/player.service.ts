import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Player } from '../models/player';

import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  players: AngularFirestoreCollection<Player>;
  currentPlayerId: string;
  currentPlayer: AngularFirestoreDocument<any>;  

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  signIn(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
          firebase.auth().signInAnonymously().then(user =>{
              this.currentPlayerId = user.user.uid;
            }
            ).catch(function(error) {
            // Handle Errors here.
            console.log(error.message);
            // ...
          });
      });
  }

  setPlayerDoc(userName: string, isCreator: boolean, gameId: string){
    const playerRef: AngularFirestoreDocument<Player> = this.afs.doc(`games/${gameId}/players/${firebase.auth().currentUser.uid}`);

    const data: Player = {
      userName: userName,
      isCreator: isCreator,
      role: '',
      team: '',
      gameId: gameId
    }
    this.currentPlayer = playerRef;

    return playerRef.set(data)
}

  getPlayerById(playerId: string){
    return this.afs.doc<Player>('players/'+playerId);
  }

  getPlayers(gameId: string){
    this.players = this.afs.doc(`games/${gameId}`).collection('players');
    return this.players;
  }

  getCurrentPlayer(gameId: string){

    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // logged in, get custom user from Firestore
          return this.afs.doc<Player>(`games/${gameId}/players/${user.uid}`).valueChanges();
        }
      })
    )
  }

  setPlayers(gameId: string){
    let playersRef = this.afs.collection(`games/${gameId}/players`).ref;
    playersRef.get().then(players =>{
      let i = 0;
      players.forEach(player => {
        i++
        player.ref.update({team: (i%2==0 ? 'red' : 'blue'), role: 'detective'})
      })
    })

    playersRef.where('team', '==', 'red').where(firebase.firestore.FieldPath.documentId(), '>', (Math.random()*2).toString())
    .limit(1)
    .get().then(player => {
      player.forEach(player => {
        this.afs.collection(`games/${gameId}/players`).doc(player.id).ref.update({role: 'codemaster'});
      })
    });

    playersRef.where('team', '==', 'blue').where(firebase.firestore.FieldPath.documentId(), '>', (Math.random()*2).toString())
    .limit(1)
    .get().then(player => {
      player.forEach(player => {
        this.afs.collection(`games/${gameId}/players`).doc(player.id).ref.update({role: 'codemaster'});
      })
    });
  }
}
