import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JobTracker } from './job-tracker';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
     'Referrer-Policy': 'origin' 
    })
  }

@Injectable({ providedIn: 'root' })

export class JobsService {
  base_path = 'http://localhost:3000/jobs';
  gmai_path = 'http://localhost:5000/search-emails';

  constructor( private http: HttpClient) { }

  searchEmail(email,word: string): Observable<any> {
    const params = {email, word };
    return this.http.post<any>(this.gmai_path, { params },httpOptions);
  }

  createItem(item): Observable<JobTracker> {
    return this.http
      .post<JobTracker>(this.base_path, JSON.stringify(item), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  httpOptions<T>(base_path: string, arg1: string, httpOptions: any) {
    throw new Error("Method not implemented.");
  }

  getItem(id): Observable<JobTracker> {
    return this.http
      .get<JobTracker>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  getList(): Observable<JobTracker> {
    return this.http
      .get<JobTracker>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateItem(id, item): Observable<JobTracker> {
    return this.http
      .put<JobTracker>(this.base_path + '/' + id, JSON.stringify(item), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteItem(id) {
    return this.http
      .delete<JobTracker>(this.base_path + '/' + id, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
    
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


}



 

