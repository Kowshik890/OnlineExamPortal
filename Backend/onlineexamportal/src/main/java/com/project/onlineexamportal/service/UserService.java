package com.project.onlineexamportal.service;

import com.project.onlineexamportal.model.Role;
import com.project.onlineexamportal.model.User;
import com.project.onlineexamportal.model.UserRole;
import com.project.onlineexamportal.repository.RoleRepository;
import com.project.onlineexamportal.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserService {

    private final RoleService roleService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(User user) throws Exception {

        User tempUser = this.userRepository.findByUsername(user.getUsername());

        if(tempUser!=null) {
            System.out.println("User already exists.");
            throw new Exception("User already exists.");
        } else {
            // fetch role as user using id = 2 from Role Table
            Role role = this.roleService.findById(2L);

            Set<UserRole> userRoles = new HashSet<>();

            UserRole userRole = new UserRole();
            userRole.setUser(user);
            userRole.setRole(role);

            userRoles.add(userRole);

            /*
            // insert into Role Table with hard coded data
            for(UserRole ur: userRoles) {
                roleRepository.save(ur.getRole());
            }*/

            user.getUserRoles().addAll(userRoles);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            tempUser = this.userRepository.save(user);
        }
        return tempUser;
    }

    public List<User> findAllUser() {
        return this.userRepository.findAll();
    }

    public User findUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public void deleteUserById(Long userid) {
        this.userRepository.deleteById(userid);
    }

    public User updateUserById(Long id, User user) {
        User tempUser = this.userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find user with id - " + id));

        tempUser.setUsername(user.getUsername());
        tempUser.setFirstName(user.getFirstName());
        tempUser.setLastName(user.getLastName());
        tempUser.setEmail(user.getEmail());
        tempUser.setPassword(passwordEncoder.encode(user.getPassword()));
        tempUser.setPhone(user.getPhone());
        tempUser.setProfile(user.getProfile());

        return this.userRepository.save(tempUser);
    }
}
