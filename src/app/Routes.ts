import { Routes } from '@angular/router';
import { FindGameComponent } from './find-game/find-game.component';
import { GameWaitingComponent } from './game-waiting/game-waiting.component';
import { BoardComponent } from './board/board.component';
import { GameComponent } from './game/game.component';

export const appRoutes: Routes = [
    { path: 'findGame', component: FindGameComponent },
    { path: 'game/waiting/:gameId', component: GameWaitingComponent },
    { path: 'game/board/:gameId', component: GameComponent},
    { path: '', redirectTo: '/findGame', pathMatch: 'full'},
];