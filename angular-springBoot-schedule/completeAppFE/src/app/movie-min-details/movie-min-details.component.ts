import { Component, Input } from '@angular/core';
import { Movie } from "../core/models/movie";
import {MovieService} from "../core/services/movie.service";

@Component({
  selector: 'app-course-min-details',
  template: `
    <mat-card style="margin-top:12px;">
      <mat-card-header>
        <mat-card-title>{{movie.movieName}}</mat-card-title>
        <mat-card-subtitle>Start Date: {{movie.startDate}}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <table class="table table-bordered">
          <thead>
          <td>Start Time</td>
          <td>End Time</td>
          </thead>
          <tbody>
          <td>{{movie.startTime}}</td>
          <td>{{movie.endTime}}</td>
          </tbody>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button> Booking</button>
        <button mat-button> Details</button>
      </mat-card-actions>
    </mat-card>`,
  styleUrls: ['./movie-min-details.component.css']
})

export class MovieMinDetailsComponent {
  @Input() movie!: Movie;
  // @Input('startDate') courseStartDate = '';
  constructor() { }
}
