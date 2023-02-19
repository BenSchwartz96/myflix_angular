
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {

  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend


 /**
  * Close login dialog and send login form inputs to the backend via API call
  * @function loginUser
  */
  loginUser(): void {
      this.fetchApiData.userLogin(this.loginData).subscribe((result) => {

        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result)
      this.snackBar.open('User logged in', 'OK', {
          duration: 5000
      });
      this.router.navigate(['movies']);        //this points to the moviecard component (route set in app.module.ts)
      }, (result) => {
        this.snackBar.open('Unable to log in user', 'OK', {
          duration: 5000
        });
      });
    }

}
