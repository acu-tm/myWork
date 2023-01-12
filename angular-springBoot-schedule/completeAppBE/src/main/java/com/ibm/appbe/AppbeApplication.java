package com.ibm.appbe;

import com.ibm.appbe.model.Movie;
import com.ibm.appbe.model.User;
import com.ibm.appbe.repository.MovieRepository;
import com.ibm.appbe.repository.UserRepository;
import com.ibm.appbe.utils.StubbedData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@Slf4j
@EnableJpaRepositories
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class AppbeApplication {

	private final UserRepository userRepository;
	private final MovieRepository movieRepository;

	@Autowired
	public AppbeApplication(UserRepository userRepository, MovieRepository movieRepository) {
		this.userRepository = userRepository;
		this.movieRepository = movieRepository;
	}

	public static void main(String[] args) {

		SpringApplication.run(AppbeApplication.class, args);
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			List<User> users = userRepository.findAll();
			if (users.isEmpty()) {
				log.info("******* Inserting Users to DB *******");
				userRepository.saveAll(StubbedData.userSupplier.get());
			} else {
				log.info("******* Users stored in DB Size :: {}", users.size());
				log.info("******* Users stored in DB :: {}", users);
			}

			List<Movie> cours = movieRepository.findAll();
			if (cours.isEmpty()) {
				log.info("******* Inserting Courses to DB *******");
				movieRepository.saveAll(StubbedData.movieSupplier.get());
			} else {
				log.info("******* Users stored in DB Size :: {}", users.size());
				log.info("******* Users stored in DB :: {}", users);
			}

		};
	}

}
