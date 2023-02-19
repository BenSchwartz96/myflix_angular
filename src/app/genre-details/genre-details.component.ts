import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


/**
 * Component for opening dialog showing genre synopsis and details, opened from main movies page 
 */

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public genre: {
      Name: string;
      Description: string;
    }
  ) {}
}
