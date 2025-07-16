import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Bienvenido a la Colección de Vinos</h1>
    <!-- Aquí puedes incluir componentes hijos, por ejemplo: -->
    <app-wine-table></app-wine-table>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}

