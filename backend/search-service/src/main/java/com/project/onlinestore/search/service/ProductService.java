
// package com.project.onlinestore.search.service;

// import com.project.onlinestore.search.model.Product;
// import com.project.onlinestore.search.repository.ProductRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// @RequiredArgsConstructor
// public class ProductService {

//     private final ProductRepository repository;

//     public List<Product> findAll() {
//         return repository.findAll();
//     }

//     public List<Product> searchByName(String name) {
//         return repository.findByNameContainingIgnoreCase(name);
//     }

//     public Product findById(Long id) {
//         return repository.findById(id).orElse(null);
//     }
// }

package com.project.onlinestore.search.service;

import com.project.onlinestore.search.model.Product;
import com.project.onlinestore.search.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public List<Product> findAll() {
        return repository.findAll();
    }

    public List<Product> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    // 🆕 Buscar por SKU
    public Product findBySku(String sku) {
        return repository.findBySku(sku)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con SKU: " + sku));
    }

    public Product findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }
}
