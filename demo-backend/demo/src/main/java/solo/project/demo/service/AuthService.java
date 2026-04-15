package solo.project.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import solo.project.demo.model.UserEntity;
import solo.project.demo.repository.UserRepository;

@Service
public class AuthService {

    private static final String ADMIN_EMAIL = "admin@gmail.com";
    private static final String ADMIN_PASSWORD = "admin@123";

    @Autowired
    private UserRepository userRepository;

    // Login logic
    public Object login(UserEntity loginUser) {

        if (loginUser.getEmail() == null || loginUser.getPassword() == null) {
            return "Email and password are required";
        }

        // Fixed admin credentials (not stored in DB)
        if (ADMIN_EMAIL.equalsIgnoreCase(loginUser.getEmail())) {
            if (!ADMIN_PASSWORD.equals(loginUser.getPassword())) {
                return "Invalid password";
            }

            UserEntity admin = new UserEntity();
            admin.setId(0L);
            admin.setName("Admin");
            admin.setEmail(ADMIN_EMAIL);
            admin.setRole("ADMIN");
            admin.setPassword(null);
            return admin;
        }

        Optional<UserEntity> userOpt = userRepository.findByEmail(loginUser.getEmail());

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        UserEntity user = userOpt.get();

        if (!user.getPassword().equals(loginUser.getPassword())) {
            return "Invalid password";
        }

        if (!"STUDENT".equalsIgnoreCase(user.getRole())) {
            return "Only student accounts are allowed here";
        }

        user.setPassword(null);
        return user;
    }

    // Student signup logic
    public Object signup(UserEntity signupUser) {

        if (signupUser.getName() == null || signupUser.getName().isBlank()) {
            return "Name is required";
        }

        if (signupUser.getEmail() == null || signupUser.getEmail().isBlank()) {
            return "Email is required";
        }

        if (signupUser.getPassword() == null || signupUser.getPassword().isBlank()) {
            return "Password is required";
        }

        if (ADMIN_EMAIL.equalsIgnoreCase(signupUser.getEmail())) {
            return "This email is reserved for admin";
        }

        Optional<UserEntity> existingUser = userRepository.findByEmail(signupUser.getEmail());

        if (existingUser.isPresent()) {
            return "User already exists with this email";
        }

        UserEntity user = new UserEntity();
        user.setName(signupUser.getName());
        user.setEmail(signupUser.getEmail());
        user.setPassword(signupUser.getPassword());
        user.setRole("STUDENT");

        UserEntity savedUser = userRepository.save(user);
        savedUser.setPassword(null);
        return savedUser;
    }
}