package com.ibm.appbe.controller;

import com.ibm.appbe.service.EnrollmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EnrollmentController {
    private final static Logger LOG = LoggerFactory.getLogger(EnrollmentController.class);

    private final EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @Operation( summary = "Delete a course by ID if it exists", description = "No Notes please")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "The request has succeeded."),
            @ApiResponse(responseCode = "400", description = "Invalid arguments supplied."),
            @ApiResponse(responseCode = "404", description = "Supplied course id Not Found.")
    }
    )
    @PutMapping("/SubscribeUser/{userId}/ToMovie/{movieId}")
    public ResponseEntity<String> subscribeUserToMovie(@PathVariable Long userId, @PathVariable Long movieId) {
        enrollmentService.subscribeUserToMovie(userId, movieId);
        return new ResponseEntity<>("Users has been successfully enrolled to Movie :: " + movieId, HttpStatus.OK);
    }

}
