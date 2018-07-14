import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router'

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'

//angular material modules
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material';



import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { FindGameComponent } from './find-game/find-game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameWaitingComponent } from './game-waiting/game-waiting.component';


import { GameService } from './services/game.service';

import { environment } from '../environments/environment';

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
    MatButtonModule,
    MatInputModule,

    BrowserModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
