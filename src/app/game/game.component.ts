import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Game } from '../../models/game';
// import { Game } from 'src/models/game';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  game: Game = new Game();
  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    this.pickCardAnimation = true;
  }

}
