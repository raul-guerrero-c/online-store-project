
// package com.project.onlinestore.search.controller;

// import com.project.onlinestore.search.model.Product;
// import com.project.onlinestore.search.service.ProductService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/product")
// @RequiredArgsConstructor
// public class ProductController {

//     private final ProductService service;

//     @GetMapping
//     public List<Product> getAll() {
//         return service.findAll();
//     }

//     @GetMapping("/search")
//     public List<Product> search(@RequestParam String name) {
//         return service.searchByName(name);
//     }

//     @GetMapping("/{id}")
//     public Product getById(@PathVariable Long id) {
//         return service.findById(id);
//     }
// }

package com.project.onlinestore.search.controller;

import com.project.onlinestore.search.model.Product;
import com.project.onlinestore.search.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    // 📄 Listado
    @GetMapping
    public List<Product> getAll() {
        return service.findAll();
    }

    // 🔍 Búsqueda por nombre
    @GetMapping("/search")
    public List<Product> searchByName(@RequestParam String name) {
        return service.searchByName(name);
    }

    // 🆕 Búsqueda por SKU
    @GetMapping("/sku/{sku}")
    public Product getBySku(@PathVariable String sku) {
        return service.findBySku(sku);
    }

    // 📦 Detalle por ID
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return service.findById(id);
    }
}

