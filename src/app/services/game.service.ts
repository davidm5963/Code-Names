import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private afs: AngularFirestore) { }

  joinGame(gameId: string, userName: string){
    console.log(gameId);
    this.getGameById(gameId).get().then(doc => {
      console.log(doc.data());
        let players = doc.get('players');
        players.push({
          userName: userName,
          role: '',
          isCreator: false
        })
        this.getGameById(gameId).update({players: players})
      }
    )
  }

  createGame(userName: string){
    this.afs.collection('games').add(
      {
        status: 'waiting',
        board: [],
        players: [{
          userName: userName,
          role: '',
          isCreator: true
        }]

      }
    )
  }

  getGameById(gameId: string){
    return this.afs.doc('games/'+gameId).ref;
  }
}
