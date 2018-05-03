import { Component, OnInit } from '@angular/core';
import { CustomTextService } from '../shared/custom-text.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameEdditedText : string[] = [];
  timer;
  ngOnInit() {
    if(!this.service.checkForTextInArray()){
      this.router.navigate(['wild/newgame']);
    } else {
      this.gameEdditedText = this.service.getEdditTextForGame();

      this.currentWord = this.gameEdditedText[this.currentWordIndex];
      for(let i = this.currentWordIndex + 1; i < this.gameEdditedText.length; i++){
        this.remainWords += this.gameEdditedText[i] + " ";
      }
    }
  }

  startTime : Date // Время начала игры
  endTime : Date // Время окончания игры
  checkForStartTimer : boolean = false; // Переменная для проверки на старт таймера
  currentWordIndex : number = 0; // Текущий индекс слова

  userInputText: string; // Поле для ввода

  copletedWords : string = ""; // Текст, который юыл уже введён правильно
  completedPath : string = ""; // Текст, который вводится и является правильным
  errorWord : string = ""; // Если в вводимом слове есть ошибка
  currentWord : string = ""; // Вводимое слово или оставшаяся для ввода часть
  remainWords : string = ""; // Слова которые осталось ввести

  gameTime : string = "0.0"; // Текущее время игры

  constructor( private router : Router, private service : CustomTextService ) {
    this.timer = setInterval(()=>{
      if(this.startTime){
        let cutTime = new Date;
        this.timeValue(+(cutTime.getTime() - this.startTime.getTime())/1000);
      }
    }, 100);
   }
  
  // Game logic

  onInputText() {
    this.isStartTest();
    let currentPrintWord = this.gameEdditedText[this.currentWordIndex] + " ";
    if(this.userInputText != currentPrintWord){
      this.checkForCorrect(currentPrintWord);
    } else {
      this.copletedWords += currentPrintWord;
      this.completedPath = this.errorWord = this.remainWords = "";
      this.currentWordIndex++;
      for(let i = this.currentWordIndex + 1; i < this.gameEdditedText.length; i++){
        this.remainWords += this.gameEdditedText[i] + " ";
      }
      this.currentWord = this.gameEdditedText[this.currentWordIndex];
      this.userInputText = "";
    }
    if(this.currentWordIndex >= this.gameEdditedText.length){
      document.getElementById("text").setAttribute('disabled', 'disabled');
      this.endTime = new Date;
  
      clearInterval(this.timer);
      this.timeValue(+(this.endTime.getTime() - this.startTime.getTime())/1000);
    }
  }

  isStartTest() { // Функция проверки на начало работы, if срабатываем один раз при первом запуске функции
    if(!this.checkForStartTimer){
      this.startTime = new Date; // Запомнили дату
      this.checkForStartTimer = true; // Исключили вероятность повторного запуска условия
    }
  }

  timeValue(timeInSec) {
    timeInSec;	
    if(timeInSec < 60){
      this.gameTime = (Math.round(timeInSec*10)/10).toFixed(1);
    }else{
      this.gameTime = (Math.round(timeInSec/60)) + "min " + (Math.round((timeInSec%60)*10)/10).toFixed(1);
    }
  }

  

  checkForCorrect(currentPrintWord : string){
    let printPiece = "",
     currentPositionInWord = this.userInputText.length;
     for(let i = 0; i < currentPositionInWord; i++){
       printPiece += currentPrintWord[i];
     }
     if(this.userInputText == printPiece){
       this.completedPath = printPiece;
       this.errorWord = this.currentWord = "";
       for(let i = currentPositionInWord; i < currentPrintWord.length; i++){
				this.currentWord += currentPrintWord[i];
			}
     } else {
      this.completedPath = this.currentWord = "";
      this.errorWord = currentPrintWord;
     }
  }
}
