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

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    
  }



}
