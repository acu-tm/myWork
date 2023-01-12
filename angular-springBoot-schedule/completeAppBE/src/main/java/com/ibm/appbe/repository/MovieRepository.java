package com.ibm.appbe.repository;

import com.ibm.appbe.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    List<Movie> findByStartDateEquals(LocalDate targetDate);

    List<Movie> findByStartDateBetween(LocalDate fromDate, LocalDate toDate);

}
