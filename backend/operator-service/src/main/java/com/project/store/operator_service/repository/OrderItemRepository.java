package com.project.store.operator_service.repository;

import com.project.store.operator_service.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio JPA para las líneas de pedido.
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
