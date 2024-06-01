import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() player: string | undefined = '';
  @Input() playerActive: boolean | undefined = false;
  @Input() name: string | undefined = '';
 
}
