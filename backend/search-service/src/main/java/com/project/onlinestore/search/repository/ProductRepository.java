
// package com.project.onlinestore.search.repository;

// import com.project.onlinestore.search.model.Product;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;

// public interface ProductRepository extends JpaRepository<Product, Long> {
//     List<Product> findByNameContainingIgnoreCase(String name);
// }

package com.project.onlinestore.search.repository;

import com.project.onlinestore.search.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 🔍 búsqueda por nombre
    List<Product> findByNameContainingIgnoreCase(String name);

    // 🆕 Búsqueda por SKU
    Optional<Product> findBySku(String sku);

    // 🟢 solo productos activos (opcional)
    List<Product> findByActiveTrue();
}

