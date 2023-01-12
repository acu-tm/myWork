package com.ibm.appbe.service;

import com.ibm.appbe.model.Movie;
import com.ibm.appbe.model.User;
import com.ibm.appbe.repository.MovieRepository;
import com.ibm.appbe.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.Set;

@Service
public class EnrollmentService {

    private final static Logger LOG = LoggerFactory.getLogger(EnrollmentService.class);
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    @Autowired
    public EnrollmentService(UserRepository userRepository, MovieRepository courseRepository) {
        this.userRepository = userRepository;
        this.movieRepository = courseRepository;
    }


    // Subscribe a set of users to a target course id if it exists
    public void subscribeUserToMovie(Long userId, Long movieId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("** User not found by id :: " + userId));
        Set<Movie> subscriptions = user.getSubscriptions();

        Movie requestedMovie = movieRepository.findById(movieId).orElseThrow(() -> new NotFoundException("** Course not found by id :: " + movieId));
        Set<User> subscribers = requestedMovie.getSubscribers();
        if (subscriptions.contains(requestedMovie)) {
            throw new NotFoundException("** User already enrolled to course name :: " + requestedMovie.getMovieId());
        }

        subscriptions.add(requestedMovie);
        subscribers.add(user);
        // salveaza cursul
        movieRepository.save(requestedMovie);
        LOG.info("Enroll User :: {}" + userId + user.getLoginName() + " to Movie :: " + movieId + requestedMovie.getMovieName());
    }




}
