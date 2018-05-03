import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GeneralComponent } from './content/general/general.component';
import { NewGameComponent } from './game/wild/new-game/new-game.component';
import { WildRulesComponent } from './game/wild/wild-rules/wild-rules.component';
import { FormsModule } from '@angular/forms';
import { CustomTextService } from './game/wild/shared/custom-text.service';
import { GameComponent } from './game/wild/game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    NewGameComponent,
    WildRulesComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    CustomTextService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
