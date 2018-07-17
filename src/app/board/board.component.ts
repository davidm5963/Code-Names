import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  gameId: string;
  cards: any;
  isCodeMaster: boolean;

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.cards = this.gameService.getGameCards(this.gameId).valueChanges();
    this.gameService.getCurrentPlayer(this.gameId).subscribe(player => {
      this.isCodeMaster = player.role == 'codemaster';
    })
  }



}
