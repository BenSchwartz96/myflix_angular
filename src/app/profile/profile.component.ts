import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any={}
  movies: any={}    //idk if {} is right here
  favMovies: any={}

  @Input() updateUser = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getMovieIds();
  }


  /**
   * Gets user info, then changes the format of 'Birthday',
   * then returns object with user information
   * User info consists of 'Username', 'Email', 'Birthday', 'FavoriteMovies'
  **/
  getUserInfo(): void {
    this.fetchApiDataService.getUser().subscribe((response: any)=>{

      this.user={
        ...response,
        Birthday: new Date(response.Birthday).toLocaleDateString()
      };

      this.favMovies = response.FavoriteMovies

      return this.user;
    })
  }

  getMovieIds(): void {
    this.fetchApiDataService.getAllMovies().subscribe((response: any)=>{

      this.movies = response
    })
  }


  /**
   * Update user info
   * Makes API call to update the user, then resets the localstorage and reloads profile
   */
  onUserUpdate(): void {
    this.fetchApiDataService.updateUser(this.updateUser).subscribe((res) => {
      localStorage.setItem('username', res.Username);
      this.snackBar.open('Your profile has been updated.', 'OK', {
        duration: 4000
      });
      window.location.reload();
    }, (res) => {
      console.log(res); ///////
      this.snackBar.open(res, "OK", {
        duration: 6000,
      });
    });
  }


}
