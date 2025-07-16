import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Wine } from '../models/wine.model';

@Injectable({
  providedIn: 'root'
})
export class WineService {
  private csvUrl = '/coleccion-vinos-web/assets/data/wines.csv';

  constructor(private http: HttpClient) { }

  getWines(): Observable<Wine[]> {
    return this.http.get(this.csvUrl, { responseType: 'text' })
      .pipe(
        map(data => this.parseCSV(data))
      );
  }

  parseCSV(data: string): Wine[] {
    const lines = data.trim().split('\n');
    const result: Wine[] = [];
    for (let i = 1; i < lines.length; i++) {
      const [name, year, bottles, images] = lines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(s => s.replace(/^"|"$/g, ''));
      result.push({
        name,
        year: Number(year),
        bottles: Number(bottles),
        images: images.split(',').map(img => img.trim().replace(/^"|"$/g, ''))
      });
    }
    return result;
  }
}
