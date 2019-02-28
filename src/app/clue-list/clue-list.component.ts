import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-clue-list',
  templateUrl: './clue-list.component.html',
  styleUrls: ['./clue-list.component.css']
})
export class ClueListComponent implements OnInit {

  clues: any;
  currentTeam: string;
  gameId: string;

  constructor(private route: ActivatedRoute, private gameService: GameService, private playerService: PlayerService) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.playerService.getCurrentPlayer(this.gameId).subscribe(player => {
      this.currentTeam = player.team;

      this.clues = this.gameService.getClues(this.gameId, this.currentTeam).valueChanges();
    });

    }
  }
