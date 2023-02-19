
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public router: Router) {}



 /**
  * Logs out user, navigates them back to the welcome screen, and clears localstorage
  * @function logout
  */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}