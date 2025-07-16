import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Wine } from '../../models/wine.model';
import { WineService } from '../../services/wine.service';
import { ImageSliderComponent, ImageSliderData } from '../image-slider/image-slider.component';

@Component({
  selector: 'app-wine-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './wine-table.component.html',
  styleUrls: ['./wine-table.component.css']
})
export class WineTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'year', 'bottles', 'image'];
  dataSource: Wine[] = [];

  constructor(
    private wineService: WineService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadWines();
  }

  loadWines(): void {
    this.wineService.getWines().subscribe({
      next: (wines) => {
        // Ordenar por nombre antes de asignar
        this.dataSource = wines.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (error) => {
        console.error('Error loading wines:', error);
      }
    });
  }

  openImageSlider(wine: Wine): void {
    if (wine.images && wine.images.length > 0) {
      this.dialog.open(ImageSliderComponent, {
        width: '800px',
        data: {
          wineName: wine.name,
          images: wine.images
        } as ImageSliderData
      });
    }
  }
}
