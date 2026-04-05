package solo.project.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import solo.project.demo.model.UserEntity;
import solo.project.demo.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserEntity user) {

        Optional<UserEntity> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.status(400).body("Email already exists");
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity loginUser) {

        Optional<UserEntity> userOpt = userRepository.findByEmail(loginUser.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        UserEntity user = userOpt.get();

        if (!user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

       if (!user.getRole().equalsIgnoreCase(loginUser.getRole())) {
    return ResponseEntity.status(401).body("Invalid role");
}

        return ResponseEntity.ok(user);
    }
}