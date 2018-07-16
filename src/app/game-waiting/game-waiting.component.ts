import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Player } from '../models/player';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';

@Component({
  selector: 'app-game-waiting',
  templateUrl: './game-waiting.component.html',
  styleUrls: ['./game-waiting.component.css']
})
export class GameWaitingComponent implements OnInit {

  gameId: string;
  game: Observable<Game>;
  players: Observable<Player[]>;
  currentPlayer: any;

  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) {

   }
   
   sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  ngOnInit() {
    console.log("ngOnInit called")
    this.gameId = this.route.snapshot.params['gameId'];

    this.gameService.getGameById(this.gameId).valueChanges().subscribe(game => {
      if(game.status == 'in progress'){
        this.router.navigate(['game/board/', this.gameId])
      }
    });
    
    this.players = this.gameService.getPlayers(this.gameId).valueChanges();

    this.getUser();
  }
  getUser(){
    this.sleep(1000).then(() =>{
      this.gameService.getCurrentPlayer(this.gameId).valueChanges().subscribe(player =>{
        console.log(player)
        this.currentPlayer = player;
      });  
    })
  }
  onStartGame(){
    this.gameService.startGame(this.gameId);
  }

}
