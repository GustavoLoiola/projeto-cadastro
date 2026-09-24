package com.products.Loiola.Model;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    ADMIN("admin"),
    USER("user");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    @Override
    public String getAuthority() {
        return "ROLE_" + this.name();
    }
}
