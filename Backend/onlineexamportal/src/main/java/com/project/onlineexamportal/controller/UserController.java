package com.project.onlineexamportal.controller;

import com.project.onlineexamportal.model.User;
import com.project.onlineexamportal.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/test")
    public String test() {
        return "Welcome to backend API of Exam Portal.";
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User createUser(@RequestBody User user) throws Exception {

        System.out.println("Username: " + user.getUsername());
        return this.userService.createUser(user);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<User> findAllUser() {
        return this.userService.findAllUser();
    }

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public User findUserByUsername(@PathVariable("username") String username) {
        return this.userService.findUserByUsername(username);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUserById(@PathVariable("id") Long id) {
        this.userService.deleteUserById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User updateUserById(@PathVariable("id") Long id, @RequestBody User user) {
        return this.userService.updateUserById(id, user);
    }
}
