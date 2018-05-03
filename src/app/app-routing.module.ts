import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './content/general/general.component';
import { WildRulesComponent } from './game/wild/wild-rules/wild-rules.component';
import { NewGameComponent } from './game/wild/new-game/new-game.component';
import { GameComponent } from './game/wild/game/game.component';

const wildGame:Routes = [
  { path: "newgame", component: NewGameComponent },
  { path: "game", component: GameComponent },
  { path: "**", pathMatch: "full", redirectTo: "newgame" },
]

const routes: Routes = [
  { path: "", component: GeneralComponent},
  { path: "wild", component: WildRulesComponent, children: wildGame},
  { path: "**", pathMatch: "full", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
