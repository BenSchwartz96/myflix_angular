import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://elt-myflix.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }



  /**
   * POST to the '/users' API endpoint to register a new user
   * 
   * @param {any} userDetails 
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns a user object, if resolved, or an error object, if rejected.
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(`${apiUrl}/users`, userDetails)
    .pipe(catchError(this.handleError));
  }

  

  /**
   * POST to the '/login' API endpoint to log a user in.
   * They will then be redirected to the movies page. 
   * 
   * @param {any} userDetails 
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns a user object, if resolved, or an error object, if rejected.
   * @function userLogin
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(`${apiUrl}/login`, userDetails)
    .pipe(catchError(this.handleError));
  }


  /**
   * GET request to the '/movies' endpoint to get full list of movies
   * 
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding data of all movies in the DB, if resolved, or an error object, if rejected.
   * @function getAllMovies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  } 


  /**
   * GET request to the '/movies/[Movie]' endpoint to get data on a specific movie
   * 
   * @param {string} title
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding data of the specified movie, if resolved, or an error object, if rejected.
   * @function getMovie
   */
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/${title}`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  } 


  /**
   * GET request to the '/movies/directors/[Director]' endpoint to get data on a specific director
   * 
   * @param {string} dire_name
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding data of the specified director, if resolved, or an error object, if rejected.
   * @function getDirector
   */
  getDirector(dire_name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/directors/${dire_name}`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  } 


  /**
   * GET request to the '/movies/genres/[Genre]' endpoint to get data on a specific genre
   * 
   * @param {string} genre_name
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding data of the specified genre, if resolved, or an error object, if rejected.
   * @function getGenre
   */
  getGenre(genre_name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(`${apiUrl}/movies/genres/${genre_name}`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  } 


  /**
   * GET request to the '/users/[User]' endpoint to get data on a specific user
   * 
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding data of the specified user, if resolved, or an error object, if rejected.
   * @function getUser
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("username");
    return this.http
    .get(`${apiUrl}/users/${user}`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
  } 


  /**
   * GET request to the '/users/[User]' endpoint to get data on a specific users favorite movies
   * 
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an array holding IDs of the users favorite movies, if resolved, or an error object, if rejected.
   * @function getFaveMovies
   */
  getFaveMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("username");
    return this.http
    .get(`${apiUrl}/users/${user}`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError));
  } 


  /**
   * POST request to the '/users/[User]/movies/[Movie]' endpoint to add a movie to the users list of favorites
   * 
   * @param {string} movieId
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding the updated user data, if resolved, or an error object, if rejected.
   * @function addFaveMovie
   */
  addFaveMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("username");
    return this.http
    .post(`${apiUrl}/users/${user}/movies/${movieId}`, { FavoriteMovie: movieId }, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  } 


  /**
   * DELETE request to the '/users/[User]/movies/[Movie]' endpoint to remove a movie from the users list of favorites
   * 
   * @param {string} movieId
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding the updated user data, if resolved, or an error object, if rejected.
   * @function removeFaveMovie
   */
  removeFaveMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("username");
    return this.http
    .delete(`${apiUrl}/users/${user}/movies/${movieId}`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  } 


  /**
   * PUT request to the '/users/[User]' endpoint to update user information.
   * 
   * @param {any} updatedUser
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns an object holding the updated user data, if resolved, or an error object, if rejected.
   * @function updateUser
   */
  updateUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("username");
    return this.http
    .put(`${apiUrl}/users/${user}`, updatedUser, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  } 


  /**
   * DELETE request to the '/users/[User]' endpoint to update user information.
   * 
   * @returns An Observable, which asynchronously reacts to the response when available. 
   * The response returns a message from the server acknowledging the deletion of the user object, if resolved, or an error object, if rejected.
   * @function deleteUser
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem("username");
    return this.http
    .delete(`${apiUrl}/users/${user}`, 
    {headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  } 



  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


 /**
  * Error handler
  * 
  * @param {HttpErrorResponse} error
  * @returns error message
  */
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error.error)}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

