package com.project.onlineexamportal.controller;

import com.project.onlineexamportal.config.JwtUtil;
import com.project.onlineexamportal.model.JwtRequest;
import com.project.onlineexamportal.model.JwtResponse;
import com.project.onlineexamportal.service.LoadUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthenticateController {

    private final AuthenticationManager authenticationManager;
    private final LoadUserDetailsService loadUserDetailsService;
    private final JwtUtil jwtUtil;


    // generate token
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("Username not found!");
        }

        // authenticate

        UserDetails userDetails = this.loadUserDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch(DisabledException e) {
            throw new Exception("USER DISABLED" + e.getMessage());
        } catch (BadCredentialsException e)  {
            throw new Exception("Invalid Credentials " + e.getMessage());
        }
    }
}
