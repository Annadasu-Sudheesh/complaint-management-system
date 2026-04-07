    package solo.project.demo.controller;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RestController;

    import solo.project.demo.model.UserEntity;
    import solo.project.demo.service.AuthService;

    @RestController
    @CrossOrigin(origins = "http://localhost:5173")
    public class AuthController {

        @Autowired
        private AuthService authService;

        // Login
        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody UserEntity loginUser) {

            Object response = authService.login(loginUser);

            if (response instanceof String) {
                return ResponseEntity.status(401).body(response);
            }

            return ResponseEntity.ok(response);
        }
    }