import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-codemaster-message-form',
  templateUrl: './codemaster-message-form.component.html',
  styleUrls: ['./codemaster-message-form.component.css']
})
export class CodemasterMessageFormComponent implements OnInit {

  isCodemaster: boolean;
  playerTeam: string;
  isTurn: boolean;
  gameId: string;

  messageForm: FormGroup

  constructor(private playerService: PlayerService, private route: ActivatedRoute, private fb: FormBuilder, private gameService: GameService) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      'clue' : ['', [Validators.required]],
    });

    this.gameId = this.route.snapshot.params['gameId'];

    this.playerService.getCurrentPlayer(this.gameId).subscribe(player => {
      this.isCodemaster = player.role === 'codemaster';
      console.log(this.isCodemaster)
      this.playerTeam = player.team;

      this.gameService.getGameById(this.gameId).valueChanges().subscribe(game => {
        console.log("Game turn: " + game.turn);
        this.isTurn = game.turn === this.playerTeam;
        console.log(this.isTurn)
      }) 
    });
  }

  get clue(){
    return this.messageForm.get('clue');
  }

  sendClue(){
    this.gameService.sendClue(this.gameId, this.clue.value, this.playerTeam)
  }

}
