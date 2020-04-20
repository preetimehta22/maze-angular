import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  public current;
  public currentX;
  public currentY;
  public marioImg = '<img style="display: block;margin: 0 auto;" width="80%;" src="../assets/images/super-mario.png">';
  public keypressed;
  public userInputWidth;
  public userInputHeight;
  public userInput;
  public htmlCollection;
  title = 'maze';
  ngOnInit() {
    this.userInputWidth = parseInt(prompt("Please enter the board width", "10"));
    this.userInputHeight = parseInt(prompt("Please enter the board height", "10"));
    this.userInput = Math.min(this.userInputWidth, this.userInputHeight);
  }
  ngAfterViewInit(){
    this.htmlCollection = document.getElementsByClassName("cell");
    let cells = [];
    let x =  Math.trunc(this.userInputHeight/2);
    let y = Math.trunc(this.userInputWidth/2);
    let playerID =  x.toString().concat(y.toString());
    this.currentX = x;
    this.currentY = y;
    console.log(playerID);
    for (var i = 0; i < this.htmlCollection.length; i++){
      var id = this.htmlCollection[i].id;
      cells.push(id);
    }
    var filtered = cells.filter(function(value, index, arr){ return value != playerID;});
    var cellsToSHow = filtered.sort(() => Math.random() - Math.random()).slice(0, this.userInput);
    for (var i = 0; i < this.userInput; i++){
document.getElementById(cellsToSHow[i]).innerHTML = '<img class="sprites" style="display: block;margin: 0 auto;" width="50%;" src="../assets/images/sprite.png">';
    }
    document.getElementById(playerID).innerHTML = this.marioImg;

  }
  public turns = 0;
  public startTime=0;
  public timer;
  increment() {
    this.startTime++;
    this.turns++;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    this.keypressed = event.key;
    var e = this;
    var timer;
   for(var i = parseInt(document.getElementById("timer").innerHTML) - 5; i <= parseInt(document.getElementById("timer").innerHTML) + 5; i++){
     window.clearInterval(i);
   }


    if (this.keypressed == 'ArrowLeft'){
this.left();

    }
    else if (this.keypressed == 'ArrowRight'){
      this.right();
    }
    else if (this.keypressed == 'ArrowUp'){
      this.up();

    }
    else if (this.keypressed == 'ArrowDown'){
this.down();
    }

  }
right(){

  var e = this;
   var timer = setInterval(function(){
document.getElementById("timer").innerHTML = timer.toString();

    if (e.currentY  < e.userInputWidth - 1) {
      document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = '';
      e.currentY = e.currentY + 1;
      e.turns++;
      document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = e.marioImg;
    }
    else{
      clearInterval(timer);
      e.left();
    }
     if (document.getElementsByClassName('sprites').length == 0){
       alert('It took you '+e.turns+' turns to clear all sprites.');
       clearInterval(timer);
     }
  }, 200);
}
left(){

var e = this;
  var timer = setInterval(function(){
    document.getElementById("timer").innerHTML = timer.toString();


    if (e.currentY > 0) {
      document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = '';
      e.currentY = e.currentY - 1;
      e.turns++;
      document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = e.marioImg;
    }
    else{
      clearInterval(timer);
      e.right();
    }
    if (document.getElementsByClassName('sprites').length == 0){
      alert('It took you '+e.turns+' turns to clear all sprites.');
      clearInterval(timer);
    }
  }, 200);
}

  up(){
    var e = this;
    var timer = setInterval(function(){
      document.getElementById("timer").innerHTML = timer.toString();


      if (e.currentX > 0) {
        document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = '';
        e.currentX = e.currentX - 1;
        e.turns++;
        document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = e.marioImg;
      }
      else{
        clearInterval(timer);
        e.down();
      }
      if (document.getElementsByClassName('sprites').length == 0){
        alert('It took you '+e.turns+' turns to clear all sprites.');
        clearInterval(timer);
      }
    }, 200);
  }

  down(){

    var e = this;
    var timer = setInterval(function(){
      document.getElementById("timer").innerHTML = timer.toString();

      if (e.currentX < e.userInputHeight - 1) {
        document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = '';
        e.currentX = e.currentX + 1;
        e.turns++;
        document.getElementById(e.currentX.toString().concat(e.currentY.toString())).innerHTML = e.marioImg;
      }
      else{
        clearInterval(timer);
        e.up();
      }
      if (document.getElementsByClassName('sprites').length == 0){
        alert('It took you '+e.turns+' turns to clear all sprites.');
        clearInterval(timer);
      }
    }, 200);
  }
}
