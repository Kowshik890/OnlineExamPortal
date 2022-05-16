package com.project.onlineexamportal.config;

import com.project.onlineexamportal.service.LoadUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final LoadUserDetailsService loadUserDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // find out the Authorization Header
        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        // separate the username and JwtToken from requestTokenHeader
        if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = this.jwtUtil.extractUsername(jwtToken);
            } catch (ExpiredJwtException e) {
                e.printStackTrace();
                System.out.println("JWT Token has expired!");
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("Error!!");
            }
        } else {
            System.out.println("Invalid token, not start with BEARER string.");
        }

        // is validated done properly
        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            final UserDetails userDetails = this.loadUserDetailsService.loadUserByUsername(username);

            if(this.jwtUtil.validateToken(jwtToken, userDetails)) {
                // token is valid
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        } else {
            System.out.println("Token is not valid!");
        }

        filterChain.doFilter(request, response);
    }
}
