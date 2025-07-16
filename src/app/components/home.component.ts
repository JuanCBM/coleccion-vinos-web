import { Component } from '@angular/core';
import {WineTableComponent} from './wine-table/wine-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    WineTableComponent
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
