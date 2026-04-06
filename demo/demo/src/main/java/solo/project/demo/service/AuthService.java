package solo.project.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import solo.project.demo.model.UserEntity;
import solo.project.demo.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Login logic
    public Object login(UserEntity loginUser) {

        Optional<UserEntity> userOpt = userRepository.findByEmail(loginUser.getEmail());

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        UserEntity user = userOpt.get();

        if (!user.getPassword().equals(loginUser.getPassword())) {
            return "Invalid password";
        }

        if (!user.getRole().equalsIgnoreCase(loginUser.getRole())) {
            return "Invalid role";
        }

        return user;
    }
}