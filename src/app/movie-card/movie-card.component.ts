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

 /**
  * Get all movies via an API call upon initiation and store them in component state
  * @returns object containing all movies in DB 
  * @function getMovies
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

 /**
  * Get a users favorite movies via API call upon initiation and store them in component state
  * @returns array containing IDs of all movies from users Favorite Movies 
  * @function getFavMovies
  */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any)=>{
      this.favoriteMovies=resp.FavoriteMovies;
      return this.favoriteMovies;
    });
  }


  //
  //Dialog functions
  //

 /**
  * Opens dialog displaying genre details 
  * 
  * @param {string} name
  * @param {string} description
  * @function getGenreDetails
  */
  getGenreDetails(name: string, description: string): void {
    this.dialog.open(GenreDetailsComponent, {
      data: {
        Name: name,
        Description: description,
      }
    });
  }


 /**
  * Opens dialog displaying director details 
  * 
  * @param {string} name
  * @param {string} bio
  * @param {number} birth
  * @function getDirectorDetails
  */
  getDirectorDetails(name: string, bio: string, birth: number): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      }
    });
  }


 /**
  * Opens dialog displaying genre details 
  * 
  * @param {string} name
  * @param {string} description
  * @function getMovieDetails
  */
  getMovieDetails(name: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Name: name,
        Description: description,
      }
    });
  }

 /**
  * Adds or removes a movie from the users list of favorite movies via API call
  * 
  * @param {string} id
  * @function toggleFavMovie
  */
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