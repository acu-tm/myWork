package com.ibm.appbe.utils;

import com.ibm.appbe.config.HardcodedLabels.*;
import com.ibm.appbe.model.Movie;
import com.ibm.appbe.model.User;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;

public class StubbedData {

    private StubbedData() {
    }

    public static Supplier<List<User>> userSupplier = () ->
            Arrays.asList(
                    User.builder().loginName("admin").password("pass").fullName("sir Admin").email("admin@yahoo.com").role(ROLE.ADMIN).preference(GENRE.DRAMA).build(),
                    User.builder().loginName("instM1").password("pass").fullName("sir instM1").email("instM1@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.COMEDY).build(),
                    User.builder().loginName("instB1").password("pass").fullName("sir instB1").email("instB1@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.ACTION).build(),
                    User.builder().loginName("studM1").password("pass").fullName("sir studM1").email("studM1@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.COMEDY).build(),
                    User.builder().loginName("studM2").password("pass").fullName("sir studM2").email("studM2@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.COMEDY).build(),
                    User.builder().loginName("studM3").password("pass").fullName("sir studM3").email("studM3@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.COMEDY).build(),
                    User.builder().loginName("studM4").password("pass").fullName("sir studM4").email("studM4@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.COMEDY).build(),
                    User.builder().loginName("studM5").password("pass").fullName("sir studM5").email("studM5@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.COMEDY).build(),
                    User.builder().loginName("studB1").password("pass").fullName("sir studB1").email("studB1@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.ACTION).build(),
                    User.builder().loginName("studB2").password("pass").fullName("sir studB2").email("studB2@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.ACTION).build(),
                    User.builder().loginName("studB3").password("pass").fullName("sir studB3").email("studB3@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.ACTION).build(),
                    User.builder().loginName("studB4").password("pass").fullName("sir studB4").email("studB4@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.ACTION).build(),
                    User.builder().loginName("studB5").password("pass").fullName("sir studB5").email("studB5@yahoo.com").role(ROLE.CUSTOMER).preference(GENRE.ACTION).build()
            );

    private static final LocalDate today = LocalDate.now();

    public static Supplier<List<Movie>> movieSupplier = () ->
            Arrays.asList(
                    Movie.builder().movieName("Inception").startDate(today).startTime(LocalTime.parse("08:00")).endTime(LocalTime.parse("10:30")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Avengers").startDate(today).startTime(LocalTime.parse("08:00")).endTime(LocalTime.parse("10:30")).room(ROOM.RAHOVA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Batman").startDate(today).startTime(LocalTime.parse("11:00")).endTime(LocalTime.parse("12:00")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Spiderman").startDate(today).startTime(LocalTime.parse("12:00")).endTime(LocalTime.parse("14:30")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),

                    Movie.builder().movieName("Avengers").startDate(today.plusDays(1)).startTime(LocalTime.parse("11:00")).endTime(LocalTime.parse("14:00")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Godfather").startDate(today.plusDays(1)).startTime(LocalTime.parse("08:00")).endTime(LocalTime.parse("10:00")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),

                    Movie.builder().movieName("Solaris").startDate(today.plusDays(2)).startTime(LocalTime.parse("08:00")).endTime(LocalTime.parse("10:30")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Elysium").startDate(today.plusDays(2)).startTime(LocalTime.parse("08:00")).endTime(LocalTime.parse("10:30")).room(ROOM.RAHOVA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("I Robot").startDate(today.plusDays(2)).startTime(LocalTime.parse("11:00")).endTime(LocalTime.parse("12:00")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),

                    Movie.builder().movieName("Avengers").startDate(today.plusDays(4)).startTime(LocalTime.parse("08:00")).endTime(LocalTime.parse("10:30")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Real Steel").startDate(today.plusDays(4)).startTime(LocalTime.parse("08:00")).endTime(LocalTime.parse("10:30")).room(ROOM.RAHOVA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Venom").startDate(today.plusDays(4)).startTime(LocalTime.parse("11:00")).endTime(LocalTime.parse("12:00")).room(ROOM.PLEVNA).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Terminator").startDate(today.plusDays(4)).startTime(LocalTime.parse("11:00")).endTime(LocalTime.parse("12:00")).room(ROOM.GIURGIU).capacity(4).is3d(false).build(),
                    Movie.builder().movieName("Matrix").startDate(today.plusDays(4)).startTime(LocalTime.parse("16:00")).endTime(LocalTime.parse("20:00")).room(ROOM.GIURGIU).capacity(4).is3d(false).build()
            );
}

