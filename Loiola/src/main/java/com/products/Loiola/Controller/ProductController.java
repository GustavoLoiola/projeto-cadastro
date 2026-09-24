package com.products.Loiola.Controller;

import com.products.Loiola.Model.Product;
import com.products.Loiola.Service.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;


    public ProductController(@Valid ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<Product> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Product save(@RequestBody Product product) {
        return service.save(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        return service.update(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        service.deleteByID(id);
    }
}
