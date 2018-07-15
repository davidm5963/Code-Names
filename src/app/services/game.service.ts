import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentGame: AngularFirestoreDocument<Game>;
  currentPlayers: Player[];
  currentPlayerId: string;

  constructor(private afs: AngularFirestore, private router: Router) { }

  joinGame(gameId: string, userName: string){

    this.afs.collection('players').add({
      userName: userName,
      isCreator: false,
      role: '',
      team: ''
    }).then(user => {
      this.currentPlayerId = user.id;
      this.getGameById(gameId).ref.get().then(game => {
        let players = game.get('players');
        players.push({
          playerId: this.currentPlayerId
        });
        this.currentPlayers = players;
        this.router.navigate(['game/waiting', game.id])
        
        console.log(this.currentPlayers)        
        this.getGameById(gameId).update({players: players});
        }
      )
    });    
  }

  createGame(userName: string){
    this.afs.collection('players').add({
      userName: userName,
      isCreator: true,
      role: '',
      team: ''
    }).then(creator => {
      this.afs.collection('games').add(
        {
          status: 'waiting',
          board: [],
          players: [{
            playerId: creator.id
          }]
        }
      ).then(game => {
          this.router.navigate(['game/waiting/', game.id])        
        }
      );
    })
    
  }

  getGameById(gameId: string){
    this.currentGame = this.afs.doc('games/'+gameId);
    return this.currentGame;
  }
}
