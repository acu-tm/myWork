import { Injectable } from '@angular/core';
import {Movie} from "../models/movie";
import {HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class MovieService {

  baseURL = "http://localhost:8088/api/";

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  // test with appbe api
  public getAllMoviesData() : Observable<Movie[]> {
    let url = "http://localhost:8088/api/get-allmovies"
    return this.http.get<Movie[]>(url).pipe(catchError(this.handleError));
  }
  getMoviesByDateParam(targetDate:string){
    const endPoint = 'http://localhost:8088/api/get-movies-starting-on/'+targetDate;
    return this.http.get<Movie[]>(endPoint).pipe(catchError(this.handleError));
  }


  private bibi:String = '2022-01-09'
  public getMoviesByDate(): Observable<Movie[]> {
    let url1 = this.baseURL + 'get-movies-starting-on/' + this.bibi;
    return this.http.get<Movie[]>(url1).pipe(catchError(this.handleError));
  }
}
