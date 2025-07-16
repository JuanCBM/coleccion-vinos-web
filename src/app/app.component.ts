import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WineTableComponent} from './components/wine-table/wine-table.component';

@Component({
  selector: 'app-root',
  imports: [WineTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coleccion-vinos-web';
}
