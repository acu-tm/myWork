package com.ibm.appbe.controller;

import com.ibm.appbe.model.User;
import com.ibm.appbe.service.crud.UserService;
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
public class UserController {

    private final static Logger LOG = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-allusers")
    private ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/get-user/{userId}")
    private ResponseEntity<User> getUserById(@PathVariable("userId") long userId) {
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<String> createUser(@Valid @RequestBody User usr) {
        LOG.info("User :: User Name {}", usr.getFullName());
        userService.createUser(usr);
        return new ResponseEntity<>("User with Name:" + usr.getFullName() + " has been inserted.", HttpStatus.OK);
    }

    @PutMapping("/user/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable("userId") long userId, @Valid @RequestBody User usr) {
        LOG.info("User  ::User Name {}", usr.getLoginName());
        userService.updateUser(userId, usr);
        return new ResponseEntity<>("User with Name:" + usr.getLoginName() + " has been updated.", HttpStatus.OK);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> removeUser(@PathVariable("userId") long usrID) {
        userService.removeUser(usrID);
        return new ResponseEntity<>("User with Id:" + usrID + " has been removed.", HttpStatus.OK);
    }

}
