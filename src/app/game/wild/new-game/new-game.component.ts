import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTextService } from '../shared/custom-text.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  userInputText : string = "";
  userEditText : Array<string> = [];

  constructor( private router:Router, private service : CustomTextService) { }

  ngOnInit() {
  }

  getFormattedText():void{
    if(this.checkTextForEmptiness()){
      return;
    }
    this.userEditText = [];
    let singleText : Array<string> = this.userInputText.split(/[@,.?!\n\t-:;'" ]/);
    for(let key in singleText){
      if(singleText[key]){
        let lowercase = singleText[key].toLowerCase();
        this.userEditText.push(lowercase);
      }
    }
    this.service.setCustomUsetText(this.userEditText); // Создаём новый объект в сервисе
    this.router.navigate(['wild/game']); // Начинаем игру
  }

  checkTextForEmptiness() : boolean{
    if(!this.userInputText.length){
      alert("Поле не должно быть пустым.");
      return true;      
    } else return false;
  }

}
