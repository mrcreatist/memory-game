import { Component, OnInit } from '@angular/core';
import { Tile } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tiles: Array<Tile>;
  sequence: Array<number> = [];
  userSequence: Array<number> = [];
  interval: any;
  level: number = 1;
  score: number = 0;
  highScore: number = 0;

  ngOnInit(): void {
    this.initializeTiles();
  }

  start() {
    this.resetTiles();
    this.resetSequence();
    this.setAvailable(true);

    while (!this.sequence.length) {
      this.sequence = this.generateSequence();
    }
    console.log(this.sequence);
    if (this.sequence.length) {
      this.highlightPattern(this.sequence);
    }
  }

  initializeTiles() {
    this.tiles = new Array(5).fill(true).map((_, i) => {
      return <Tile>{
        index: i,
        active: false,
        error: false,
        available: true
      }
    });
  }

  highlightPattern(pattern: Array<number>) {
    if (!pattern.length) {
      console.log('length error')
    } else {
      pattern.push(-1);
      let index = 0;
      this.interval = setInterval(() => {
        this.resetTiles();
        if (pattern[index] !== -1) {
          this.tiles[pattern[index]].active = true;
        }
        index++;

        if (index === pattern.length) {
          pattern.pop();
          clearInterval(this.interval);
          this.interval = null;
        }
      }, 500);
    }
  }

  generateSequence(): Array<number> {
    let seq: Array<number> = [];
    for (let i = 0; i < this.level; i++) {
      let item: number = this.getRandom();
      if (i !== 0) {
        while (item === seq[i - 1]) {
          item = this.getRandom();
        }
      }
      seq.push(item);
    }
    return seq;
  }

  getRandom(max = 4, min = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  resetTiles() {
    this.tiles.forEach(tile => {
      tile.active = false;
      tile.error = false;
    });
  }

  addToSequence(index: number) {
    this.userSequence.push(index);
    this.checkLogic();
  }

  resetSequence() {
    this.userSequence = [];
    this.sequence = [];
  }

  checkLogic() {
    let sanity = true;
    this.userSequence.forEach((item, index) => {
      if (item !== this.sequence[index]) {
        console.log('error');
        this.tiles[item].error = true;
        sanity = false;
      }
    });

    if (!sanity) {
      this.setAvailable(false);
    }

    if (this.userSequence.length === this.sequence.length) {
      this.setAvailable(false);
      this.manageLevel(sanity);
    }
  }

  manageLevel(result: boolean) {
    if (result) {
      this.level++;
      this.score++;
      this.highScore = this.score > this.highScore ? this.score : this.highScore;
      this.start();
    } else {
      this.level = 0;
      this.score = 0;
    }
  }

  setAvailable(value: boolean) {
    this.tiles.forEach(tile => tile.available = value)
  }
}
