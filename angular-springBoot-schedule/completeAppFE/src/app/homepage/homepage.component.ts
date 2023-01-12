import { Component, OnInit } from '@angular/core';
import { Movie } from "../core/models/movie";
import { MovieService } from "../core/services/movie.service";
import { MessageService } from "../core/services/message.service";
import { Subscription } from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  // for page initialization with filtering on current day
  private todayDate = moment();

  private subscription!: Subscription;

  // arrays to keep daily matched courses
  public dailyMovie1: Movie[] = [];
  public dailyMovie2: Movie[] = [];
  public dailyMovie3: Movie[] = [];
  public dailyMovie4: Movie[] = [];
  public dailyMovie5: Movie[] = [];

  // constructor injection for needed services
  constructor(private movieService: MovieService, private messageService: MessageService) { }

  ngOnInit(): void {
    // update schedule table on page opening / refresh - always start on current date
    //initialization done by default messageSource of the service.


    // subscribe to messageService and get updates
    // from currentMessage channel on user changes of the navbar datepicker date.
    this.subscription = this.messageService.currentMessage.subscribe(message => {
        let userSelectionDate = moment(message);
        this.getWeekScheduledMovies(userSelectionDate);
      }
    )

  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // function to get daily scheduled courses from beck end for 5 days
  private getWeekScheduledMovies(startDate: moment.Moment) {

    this.movieService
      .getMoviesByDateParam(startDate.format('YYYY-MM-DD'))
      .subscribe(responseData1 => {
        this.dailyMovie1 = responseData1;
      })
      this.movieService
        .getMoviesByDateParam(startDate.clone().add(1,'days').format('YYYY-MM-DD'))
        .subscribe(responseData2 => {
        this.dailyMovie2 = responseData2;
      })
      this.movieService
        .getMoviesByDateParam(startDate.clone().add(2,'days').format('YYYY-MM-DD'))
        .subscribe(responseData3 => {
        this.dailyMovie3 = responseData3;
      })
      this.movieService
        .getMoviesByDateParam(startDate.clone().add(3,'days').format('YYYY-MM-DD'))
        .subscribe(responseData4 => {
        this.dailyMovie4 = responseData4;
      })
      this.movieService
        .getMoviesByDateParam(startDate.clone().add(4,'days').format('YYYY-MM-DD'))
        .subscribe(responseData5 => {
        this.dailyMovie5 = responseData5;
      })

  }

}
