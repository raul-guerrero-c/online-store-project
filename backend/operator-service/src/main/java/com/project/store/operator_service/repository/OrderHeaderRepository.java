package com.project.store.operator_service.repository;

import com.project.store.operator_service.model.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositorio JPA para la cabecera de pedidos.
 */
public interface OrderHeaderRepository extends JpaRepository<OrderHeader, Long> {

    Optional<OrderHeader> findByOrderCode(String orderCode);
}
