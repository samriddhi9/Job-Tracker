// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly clientId = '278258666547-cgbk05tq1et9hpipp1j2fm97o9004u4r.apps.googleusercontent.com';
  private readonly redirectUri = 'http://localhost:4200/auth/callback';
  private readonly scope = 'email openid profile'; // Add additional scopes as needed
  private readonly tokenEndpoint = 'https://oauth2.googleapis.com/token';
  public isloggedin :boolean = true
  email: any;
  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=${this.scope}`;
    this.isloggedin = true;
    window.location.href = url;
  }

  handleCallback(): void {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    if (code) {
      this.exchangeCodeForToken(code).subscribe(
        (res) => {
           this.email = res;
          this.router.navigate(['/']);
           
        },
        error => {
        
          console.error('Error exchanging code for token:', error);
          this.isloggedin  = true;
          this.router.navigate(['/']);
          // Handle error
        }
      );
    } 
  }

  private exchangeCodeForToken(code: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `code=${code}&redirect_uri=${this.redirectUri}&client_id=${this.clientId}&grant_type=authorization_code`;
    return this.http.post<any>(this.tokenEndpoint, body, { headers });
  }
}
