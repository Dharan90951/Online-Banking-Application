package com.banking.controller;

import com.banking.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller for handling authentication requests.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    /**
     * Handles user registration.
     *
     * @param user the user to register
     * @return the response entity with the registered user and token
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // For now, just return a success response
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", 1);
        userResponse.put("email", user.getEmail());
        userResponse.put("firstName", user.getFirstName());
        userResponse.put("lastName", user.getLastName());
        
        response.put("user", userResponse);
        response.put("token", "dummy-jwt-token");
        return ResponseEntity.ok(response);
    }

    /**
     * Handles user login.
     *
     * @param credentials the login credentials
     * @return the response entity with the user and token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        // For now, just return a success response
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", 1);
        userResponse.put("email", credentials.get("email"));
        userResponse.put("firstName", "John");
        userResponse.put("lastName", "Doe");
        
        response.put("user", userResponse);
        response.put("token", "dummy-jwt-token");
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint to check if the user is authenticated.
     *
     * @return the response entity with the user details
     */
    @PostMapping("/me")
    public ResponseEntity<?> me() {
        // For now, just return a success response
        Map<String, Object> response = new HashMap<>();
        response.put("id", 1);
        response.put("email", "user@example.com");
        response.put("firstName", "John");
        response.put("lastName", "Doe");
        return ResponseEntity.ok(response);
    }
    
    /**
     * GET endpoint to check if the user is authenticated.
     * This is an alternative to the POST method for clients that use GET.
     *
     * @return the response entity with the user details
     */
    @RequestMapping(value = "/me", method = org.springframework.web.bind.annotation.RequestMethod.GET)
    public ResponseEntity<?> getCurrentUser() {
        // For now, just return a success response
        Map<String, Object> response = new HashMap<>();
        response.put("id", 1);
        response.put("email", "user@example.com");
        response.put("firstName", "John");
        response.put("lastName", "Doe");
        return ResponseEntity.ok(response);
    }
}