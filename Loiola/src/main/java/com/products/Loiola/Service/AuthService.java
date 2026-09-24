package com.products.Loiola.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.products.Loiola.DTO.RegisterRequest;
import com.products.Loiola.Exceptions.InvalidUserException;
import com.products.Loiola.Model.User;
import com.products.Loiola.Model.UserRole;
import com.products.Loiola.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${api.security.token.secret:my-secret-key}")
    private String secret;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new  UsernameNotFoundException("Usuário não encontrado: " + email));
    }

    public void register(RegisterRequest data) {

        if (userRepository.findByEmail(data.email()).isPresent()) {
            throw new InvalidUserException(
                    "Já existe um usuário com esse Email cadastrado no sistema."
            );
        }

        String encryptedPassword = passwordEncoder.encode(data.password());

        User newUser = new User();

        newUser.setName(data.name());
        newUser.setEmail(data.email());
        newUser.setPassword(encryptedPassword);
        newUser.setPhone(data.phone());

        newUser.setRole(UserRole.USER);

        userRepository.save(newUser);

    }

        public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("loiola-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new  RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("loiola-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}