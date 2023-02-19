import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


/**
 * Component for opening dialog showing movie synopsis and details, opened from main movies page 
 */

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public movie: {
      Title: string;
      Description: string;
    }
  ) {}
}
