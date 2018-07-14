import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  createGame(){
    this.gameService.createGame('David');
  }

}
