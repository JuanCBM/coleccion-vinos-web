import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ImageSliderData {
  wineName: string;
  images: string[];
}

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  currentIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<ImageSliderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageSliderData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  nextImage(): void {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  get currentImage(): string {
    return this.data.images[this.currentIndex];
  }

  get hasMultipleImages(): boolean {
    return this.data.images.length > 1;
  }
}
