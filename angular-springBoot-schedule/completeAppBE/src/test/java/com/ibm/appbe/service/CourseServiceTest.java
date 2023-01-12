package com.ibm.appbe.service;

import java.util.Optional;

import com.ibm.appbe.model.Movie;
import com.ibm.appbe.repository.MovieRepository;
import com.ibm.appbe.service.crud.MovieService;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Mockito;
import org.testng.annotations.*;
import org.testng.Assert;


public class CourseServiceTest {

    @Mock
    private MovieRepository courseRepositoryMock;

    @InjectMocks
    private MovieService courseService;

    @BeforeTest
    public void initMocks() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddCourse() {
        Movie movie = new Movie();
        movie.setMovieId(100l);
        Mockito.when(courseRepositoryMock.save(Mockito.any(Movie.class))).thenReturn(movie);
        Long courseId = courseService.createMovie(movie).getMovieId();
        Assert.assertEquals(100, courseId.longValue());
    }

    @Test
    public void testRemoveCourse() {
        Long courseId = 100l;
        Movie movie = new Movie();
        movie.setMovieId(courseId);
        movie.setMovieName("Spring");
        Mockito.when(courseRepositoryMock.findById(Mockito.anyLong())).thenReturn(Optional.of(movie));
        courseService.removeMovie(courseId);
    }

}
