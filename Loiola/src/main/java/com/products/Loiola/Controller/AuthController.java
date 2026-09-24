package com.products.Loiola.Controller;

import com.products.Loiola.DTO.LoginRequest;
import com.products.Loiola.DTO.LoginResponse;
import com.products.Loiola.DTO.RegisterRequest;
import com.products.Loiola.Model.User;
import com.products.Loiola.Repository.UserRepository;
import com.products.Loiola.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.products.Loiola.Model.UserRole.USER;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest data) {
        var userNamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(userNamePassword);

        User authenticatedUser = (User) auth.getPrincipal();
        var token = this.authService.generateToken(authenticatedUser);

        return ResponseEntity.ok(new LoginResponse(token, authenticatedUser.getName()));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest data) {
        System.out.println("--> DADOS CHEGANDO NO REQUEST: " + data);

        if (this.userRepository.findByEmail(data.email()).isPresent()) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado no sistema.");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());

        User newUser = new User();
        newUser.setName(data.name());
        newUser.setEmail(data.email());
        newUser.setPassword(encryptedPassword);
        newUser.setPhone(data.phone());
        newUser.setRole(USER);

        System.out.println("EMAIL ATRIBUÍDO NO USER: " + newUser.getEmail());

        this.userRepository.save(newUser);

        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }
}