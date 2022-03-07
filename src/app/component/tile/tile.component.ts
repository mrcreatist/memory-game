import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tile } from '../../model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() tile: Tile;
  @Output() onClick = new EventEmitter();

  addSequence() {
    this.onClick.emit();
  }
}
