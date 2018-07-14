import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { FindGameComponent } from './find-game/find-game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameWaitingComponent } from './game-waiting/game-waiting.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    FindGameComponent,
    CreateGameComponent,
    GameWaitingComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
