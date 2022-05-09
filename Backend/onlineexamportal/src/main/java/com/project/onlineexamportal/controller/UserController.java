package com.project.onlineexamportal.controller;

import com.project.onlineexamportal.model.Role;
import com.project.onlineexamportal.model.User;
import com.project.onlineexamportal.model.UserRole;
import com.project.onlineexamportal.service.RoleService;
import com.project.onlineexamportal.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User createUser(@RequestBody User user) throws Exception {
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
