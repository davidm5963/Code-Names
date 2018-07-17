import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';

import { switchMap, filter } from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentGame: AngularFirestoreDocument<Game>;
  currentPlayerId: string;
  
  currentPlayer: AngularFirestoreDocument<any>;
  players: AngularFirestoreCollection<Player>;

  constructor(private afs: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
   }

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

  joinGame(gameId: string, userName: string){

    this.signIn();

    this.setPlayerDoc(userName, false, gameId).then(user => {

        this.getGameById(gameId).ref.get().then(game => {
          this.router.navigate(['game/waiting', gameId]);
        }
      )
    });    
  }

  private setPlayerDoc(userName: string, isCreator: boolean, gameId: string){
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

  createGame(userName: string){

    this.signIn();
    
    this.afs.collection('games').add(
        {
          status: 'waiting',
          board: [],
        }
      ).then(game => {
          this.setPlayerDoc(userName, true, game.id);
          
          this.router.navigate(['game/waiting/', game.id])        
        }
      );    
  }

  getGameById(gameId: string){
    this.currentGame = this.afs.doc('games/'+gameId);
    return this.currentGame;
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

  getGameCards(gameId: string){
    return this.afs.collection(`games/${gameId}/cards`);
  }
  startGame(gameId: string){
    this.afs.doc(`games/${gameId}`).update({status: 'in progress'});
    this.createBoard(gameId);
    this.setPlayers(gameId);
  }

  createBoard(gameId: string){
    let board_size = 25;
    let gameRef = this.afs.doc(`games/${gameId}`).ref;
      gameRef.get().then(game => {
        for (let index = 0; index < board_size; index++) {
          //add random card to cards collection in game document
          this.afs.collection('cards').doc(Math.floor((Math.random()*29)+1).toString()).ref.get().then(doc =>{
            console.log(doc.data())
            this.afs.doc(`games/${gameId}`).collection('cards').doc(index.toString()).set(doc.data());
          //update the cards team color
          this.afs.doc(`games/${gameId}`).collection('cards').doc(index.toString()).ref.update({team: (index%2==0 ? 'red' : 'blue')});
        })
          
        }

      })
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
