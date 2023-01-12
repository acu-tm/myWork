package com.ibm.appbe.controller;

import com.ibm.appbe.model.Movie;
import com.ibm.appbe.service.crud.MovieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class MovieController {
    private final static Logger LOG = LoggerFactory.getLogger(MovieController.class);

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService courseService) {
        this.movieService = courseService;
    }

    @GetMapping("/get-allmovies")
    private ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movi = movieService.getAllMovies();
        return new ResponseEntity<>(movi, HttpStatus.OK);
    }

    @GetMapping("/get-movie/{movieId}")
    private ResponseEntity<Movie> getMovieById(@PathVariable("movieId") long crsId) {
        Movie movie = movieService.getMovieById(crsId);
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    @GetMapping("/get-movies-starting-on/{searchDate}")
    private ResponseEntity<List<Movie>> getMoviesStartingOn(@PathVariable("searchDate") String searchDate) {
        List<Movie> matchCours = movieService.getMoviesByStartDate(searchDate);
        return new ResponseEntity<>(matchCours, HttpStatus.OK);
    }

    @GetMapping("/get-movies-starting-between/{startDate}/{endDate}")
    private ResponseEntity<List<Movie>> getMoviesStartingBetween(@PathVariable("startDate") String startDate, @PathVariable("endDate") String endDate) {
        List<Movie> matchCours = movieService.getMoviesStartingBetween(startDate, endDate);
        return new ResponseEntity<>(matchCours, HttpStatus.OK);
    }

    @PostMapping("/movie")
    public ResponseEntity<String> createMovie(@Valid @RequestBody Movie crs) {
        LOG.info("Movie  ::Movie Name {}", crs.getMovieName());
        movieService.createMovie(crs);
        return new ResponseEntity<>("Course with Name:" + crs.getMovieName() + " has been inserted.", HttpStatus.OK);
    }

    @PutMapping("/movie/{movieId}")
    public ResponseEntity<String> updateMovie(@PathVariable("movieId") long crsId, @Valid @RequestBody Movie crs) {
        LOG.info("Movie  ::Movie Name {}", crs.getMovieName());
        movieService.updateMovie(crsId, crs);
        return new ResponseEntity<>("Movie with Name:" + crs.getMovieName() + " has been updated.", HttpStatus.OK);
    }

    @DeleteMapping("/movie/{movieId}")
    public ResponseEntity<String> removeMovie(@PathVariable("movieId") long crsId) {
        movieService.removeMovie(crsId);
        return new ResponseEntity<>("Movie with Id:" + crsId + " has been removed.", HttpStatus.OK);
    }

}
