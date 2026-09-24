package com.products.Loiola.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank(message = "O nome é obrigatório")
        String name,
        String description,
        @NotBlank(message = "O preço é obrigatório")
        @PositiveOrZero(message = "O preço deve ser maior que 0.")
        BigDecimal price,
        @PositiveOrZero(message = "A quantidade deve ser maior ou igual a 0.")
        @Size(min = 0)
        int quantity
) {
}
