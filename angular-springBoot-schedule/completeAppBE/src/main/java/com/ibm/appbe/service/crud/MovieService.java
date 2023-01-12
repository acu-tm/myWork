package com.ibm.appbe.service.crud;

import com.ibm.appbe.model.Movie;
import com.ibm.appbe.repository.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDate;
import java.util.List;

@Service
public class MovieService {

    private final static Logger LOG = LoggerFactory.getLogger(MovieService.class);
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(final MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // get a list with all courses
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    //get a specific course by id
    public Movie getMovieById(long id) {
        return movieRepository.findById(id).orElseThrow(() -> new NotFoundException("** Course not found for id :: " + id));
    }

    // get courses by StartDate
    public List<Movie> getMoviesByStartDate(String targetDate) {
        return  movieRepository.findByStartDateEquals(LocalDate.parse(targetDate));
    }

    // get courses by interval of StartDates
    public List<Movie> getMoviesStartingBetween(String fromDate, String toDate) {
        return  movieRepository.findByStartDateBetween(LocalDate.parse(fromDate), LocalDate.parse(toDate));
    }


    // add entry in Course table by a course object
    public Movie createMovie(Movie movie) {
        movie = movieRepository.save(movie);
        LOG.info("Course: {} has been successfully created. ", movie.getMovieId());
        return movie;
    }

    // update course table by course id
    public Movie updateMovie(long id, Movie movie) {
        movieRepository.findById(id).orElseThrow(() -> new NotFoundException("** Course not found for id :: " + id));
        movie.setMovieId(id);
        return movieRepository.save(movie);
    }

    // delete entry in Course table by its id.
    public void removeMovie(Long courseId) {
        Movie movie = movieRepository.findById(courseId).orElseThrow(() -> new NotFoundException("** Course not found by id :: " + courseId));
        movieRepository.delete(movie);
    }

}
