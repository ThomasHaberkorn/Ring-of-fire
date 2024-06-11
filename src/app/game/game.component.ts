import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import {MatCardModule} from '@angular/material/card';
import { collection, Firestore, collectionData,  addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, GameInfoComponent, MatCardModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game: Game;
  gameId: string | undefined;
  firestore: Firestore = inject(Firestore);
  item$: Observable<Game[]>;

  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.game = new Game();
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData(itemCollection) as Observable<Game[]>;
  }

 
  ngOnInit() {
    this.route.params.subscribe(params => {
    this.gameId = params['id'];
      console.log("Route params", this.gameId);
      const gamesCollection = collection(this.firestore, 'games');
        // this.newGame();
        console.log("Loaded game:", this.game);
        if (this.gameId) {
          this.loadGame(this.gameId);
        }
    }
    );
  }

  loadGame(id: string) {
      const gameDoc = doc(this.firestore, `games/${id}`); 
    docData(gameDoc).subscribe((game: any) => {
      this.game = game as Game;
      console.log("Loaded game:", this.game);
    }, (error: any) => {
      console.error("Error loading game:", error);
    });
  }


  async newGame() {
    // this.game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    addDoc(gamesCollection,  this.game.toJson())
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
    
      if (card !== undefined) {
        this.currentCard = card;
        console.log(this.currentCard);
        this.pickCardAnimation = true;

        this.game.currentPlayer++;  
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
        setTimeout(() => {
          if (this.currentCard !== undefined) {
            this.game.playedCards.push(this.currentCard);
            this.saveGame();
          }
          this.pickCardAnimation = false;
        }, 1000);
      } else {
        console.error("No more cards in the stack");
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    if (this.gameId) {
      updateDoc(doc(this.firestore, 'games', this.gameId), this.game.toJson());
    } else {
      console.error('gameId is now undefined');
    }
  }
  
  
}


