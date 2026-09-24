package com.products.Loiola.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "O nome é obrigatório")
        @Size(min = 3, message = "O nome deve ter pelo menos 3 letras")
        String name,
        @NotBlank(message = "O email é obrigatório!")
        @Email
        String email,
        @NotBlank(message = "A senha é obrigatória!")
        @Pattern(
                regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$",
                message = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
        )
        String password,
        @Pattern(
                regexp = "^$|^[0-9]{11}$",
                message = "O telefone deve conter exatamente 11 números."
        )
        String phone) {

}
