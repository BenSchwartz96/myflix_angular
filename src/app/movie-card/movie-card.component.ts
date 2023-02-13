import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service'
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
  user: any={};
  favoriteMovies: any[]=[];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }


  //Functions to fetch all movies, as well as users favorite movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any)=>{
      this.favoriteMovies=resp.FavoriteMovies;
      return this.favoriteMovies;
    });
  }



  //Dialog functions

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
  getDirectorDetails(name: string, bio: string, birth: number): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
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

  //function to add a movie to favorites
  toggleFavMovie(id: string): void {

    if(!this.favoriteMovies.includes(id)) {
      this.fetchApiData.addFaveMovie(id).subscribe((resp)=> {
        this.favoriteMovies=resp.FavoriteMovies;
        this.snackBar.open('Movie added to favorites.', 'OK', {
          duration: 4000
       })
      }, (error) => {
        //Error resp
        this.snackBar.open(error.message, 'OK', {
          duration: 4000
        });
      })
    } else {
      this.fetchApiData.removeFaveMovie(id).subscribe((resp)=>{
        this.favoriteMovies=resp.FavoriteMovies;
        this.snackBar.open('Movie removed from favorites.', 'OK', {
          duration: 4000
       })
      }, (error) => {
        //Error resp
        this.snackBar.open(error.message, 'OK', {
          duration: 4000
        });
      })
    }
  }




}