package com.project.store.operator_service.repository;

import com.project.store.operator_service.model.ReturnRequest;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio JPA para las solicitudes de devolución.
 */
public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Long> {
}
