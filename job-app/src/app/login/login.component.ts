import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/authService';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.handleCallback()
  }

  login(): void {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }

}
