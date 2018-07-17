import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';

import { switchMap, filter } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentGame: AngularFirestoreDocument<Game>;


  constructor(private afs: AngularFirestore, private router: Router, private afAuth: AngularFireAuth, private playerService: PlayerService) {
   }

  joinGame(gameId: string, userName: string){

    this.playerService.signIn();

    this.playerService.setPlayerDoc(userName, false, gameId).then(user => {

        this.getGameById(gameId).ref.get().then(game => {
          this.router.navigate(['game/waiting', gameId]);
        }
      )
    });    
  }

  

  createGame(userName: string){

    this.playerService.signIn();
    
    this.afs.collection('games').add(
        {
          status: 'waiting',
          board: [],
        }
      ).then(game => {
          this.playerService.setPlayerDoc(userName, true, game.id);
          
          this.router.navigate(['game/waiting/', game.id])        
        }
      );    
  }

  getGameById(gameId: string){
    this.currentGame = this.afs.doc('games/'+gameId);
    return this.currentGame;
  }

  

  getGameCards(gameId: string){
    return this.afs.collection(`games/${gameId}/cards`);
  }
  startGame(gameId: string){
    this.afs.doc(`games/${gameId}`).update({status: 'in progress'});
    this.createBoard(gameId);
    this.playerService.setPlayers(gameId);
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
}