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



 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(`${apiUrl}/users`, userDetails)
    .pipe(catchError(this.handleError));
  }

  
  //
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(`${apiUrl}/login`, userDetails)
    .pipe(catchError(this.handleError));
  }


  //
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


  //
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


  //
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


  //
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


  //
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


  //
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


  //
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


  //
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


  //
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


  //
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

