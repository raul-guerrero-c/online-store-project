package com.project.store.operator_service.service;

import com.project.store.operator_service.dto.CreateOrderRequestDto;
import com.project.store.operator_service.dto.CreateReturnRequestDto;
import com.project.store.operator_service.dto.OrderResponseDto;
import com.project.store.operator_service.dto.ReturnResponseDto;

import java.util.List;

/**
 * Servicio de negocio para gestionar pedidos y devoluciones.
 */
public interface OrderService {

    /**
     * Crea un nuevo pedido a partir de la información recibida desde el front-end.
     */
    OrderResponseDto createOrder(CreateOrderRequestDto request);

    /**
     * Obtiene un pedido por su identificador.
     */
    OrderResponseDto getOrderById(Long orderId);

    /**
     * Obtiene la lista completa de pedidos (sin paginación por ahora).
     */
    List<OrderResponseDto> getAllOrders();

    /**
     * Registra una solicitud de devolución para un pedido concreto.
     */
    ReturnResponseDto createReturn(Long orderId, CreateReturnRequestDto request);

    /**
     * Obtiene todas las devoluciones asociadas a un pedido.
     */
    List<ReturnResponseDto> getReturnsByOrderId(Long orderId);
}
