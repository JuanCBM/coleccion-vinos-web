import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

import { Wine } from '../../models/wine.model';
import { WineService } from '../../services/wine.service';
import { ImageSliderComponent, ImageSliderData } from '../image-slider/image-slider.component';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';

@Component({
  selector: 'app-wine-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  templateUrl: './wine-table.component.html',
  styleUrls: ['./wine-table.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
})
export class WineTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'year', 'bottles', 'image'];
  dataSource = new MatTableDataSource<Wine>();

  // Referencia al paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private wineService: WineService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadWines();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadWines(): void {
    this.wineService.getWines().subscribe({
      next: (wines) => {
        // Ordenar por nombre antes de asignar
        this.dataSource.data = wines.sort((a, b) => a.name.localeCompare(b.name));
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
          wineName: wine.name + ' ('+wine.year+')',
          images: wine.images
        } as ImageSliderData
      });
    }
  }
}
