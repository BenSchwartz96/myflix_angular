import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


/**
 * Component for opening dialog showing movie synopsis and details, opened from main movies page 
 */

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss']
})
export class DirectorDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public director: {
      Name: string;
      Bio: string;
      Birth: number;
    }
  ) {}
}

