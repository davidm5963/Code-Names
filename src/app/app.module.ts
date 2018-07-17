import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//angular material modules
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { FindGameComponent } from './find-game/find-game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameWaitingComponent } from './game-waiting/game-waiting.component';


import { GameService } from './services/game.service';

import { environment } from '../environments/environment';
import { appRoutes } from './Routes';
import { CodemasterMessageFormComponent } from './codemaster-message-form/codemaster-message-form.component';
import { GameComponent } from './game/game.component';
import { PlayerService } from './services/player.service';
import { ClueListComponent } from './clue-list/clue-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    FindGameComponent,
    CreateGameComponent,
    GameWaitingComponent,
    CodemasterMessageFormComponent,
    GameComponent,
    ClueListComponent,
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,

    
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes)

  ],
  providers: [GameService, PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
