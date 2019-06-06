import { Component, Input } from '@angular/core';
import { ApiProvider } from "../../providers/api/api";


@Component({
  selector: 'stats',
  templateUrl: 'stats.html'
})
export class StatsComponent {
  @Input() container: any;
  text: string;

  constructor() {
    console.log('Hello StatsComponent Component');
    this.text = 'Hello World';
  }

}
