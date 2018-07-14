import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-game',
  templateUrl: './find-game.component.html',
  styleUrls: ['./find-game.component.css']
})
export class FindGameComponent implements OnInit {

  joinGameForm: FormGroup;

  constructor(private gameService: GameService, private fb: FormBuilder) { }

  ngOnInit() {
    this.joinGameForm = this.fb.group({
      'gameId' : ['', [Validators.required]],
      'userName' : ['', [Validators.required]]
    });
  }

  joinGame(){
    this.gameService.joinGame(this.gameId, this.userName);
  }

  get gameId(){
    return this.joinGameForm.get('gameId');
  }

  get userName(){
    return this.joinGameForm.get('userName');
  }

}
