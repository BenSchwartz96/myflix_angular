import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


import { UserRegistrationService } from '../fetch-api-data.service'
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog
    ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

//function that opens genre dialog
getGenreDetails(name: string, description: string): void {
  this.dialog.open(GenreDetailsComponent, {
    data: {
      Name: name,
      Description: description,
    }
  });
}

//function that opens director dialog
getDirectorDetails(name: string, bio: string): void {
  this.dialog.open(DirectorDetailsComponent, {
    data: {
      Name: name,
      Bio: bio,
    }
  });
}

//function that opens movie details dialog
getMovieDetails(name: string, description: string): void {
  this.dialog.open(MovieDetailsComponent, {
    data: {
      Name: name,
      Description: description,
    }
  });
}



  nonimplementedfunction_director(): void {
    // this will become the function that routes you to the genreview
  }

  nonimplementedfunction_movie(): void {
    // this will become the function that routes you to the movie details view
  }



}