package com.products.Loiola.Service;

import com.products.Loiola.Model.Product;
import com.products.Loiola.Repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProductService {

    private final ProductRepository repository;


    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Product save(Product product) {
        return repository.save(product);
    }

    public Product update(Long id, Product product) {
        Product exists = findById(id);

        exists.setName(product.getName());
        exists.setDescription(product.getDescription());
        exists.setPrice(product.getPrice());
        exists.setQuantity(product.getQuantity());

        return repository.save(exists);
    }

    public void deleteByID(Long id) {
        Product product = findById(id);
        repository.delete(product);
    }
}
