package com.ibm.appbe.service.crud;

import com.ibm.appbe.exception.UserCourseIllegalStateException;
import com.ibm.appbe.model.User;
import com.ibm.appbe.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final static Logger LOG = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Autowired
    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //get a list with all users records
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //get a specific user by id
    public User getUserById(long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("** User not found by id :: " + id));
    }

    // add a new user
    public User createUser(User user) {
        user = userRepository.save(user);
        LOG.info("User {} Successfully created", user.getUserId());
        return user;
    }

    // update user by id
    public User updateUser(Long id, User user) {
        userRepository.findById(id).orElseThrow(() -> new NotFoundException("** User not found by id :: " + id));
        user.setUserId(id);
        return userRepository.save(user);
    }

    // delete a specific user by id
    public void removeUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("** User not found by id :: " + userId));
        userRepository.delete(user);
    }

}
