package com.project.store.operator_service.controller;

import com.project.store.operator_service.dto.CreateOrderRequestDto;
import com.project.store.operator_service.dto.CreateReturnRequestDto;
import com.project.store.operator_service.dto.OrderResponseDto;
import com.project.store.operator_service.dto.ReturnResponseDto;
import com.project.store.operator_service.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * Controlador REST para gestionar pedidos y devoluciones.
 */
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Endpoint para crear un nuevo pedido.
     *
     * Ejemplo de petición:
     * POST /orders
     */
    @PostMapping
    public ResponseEntity<OrderResponseDto> createOrder(
            @Valid @RequestBody CreateOrderRequestDto request) {

        OrderResponseDto created = orderService.createOrder(request);

        // Construir Location: /orders/{id}
        URI location = URI.create("/orders/" + created.getId());

        return ResponseEntity
                .created(location)
                .body(created);
    }

    /**
     * Obtiene un pedido por su identificador.
     *
     * GET /orders/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getOrder(@PathVariable("id") Long id) {
        OrderResponseDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    /**
     * Lista todos los pedidos.
     *
     * GET /orders
     */
    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        List<OrderResponseDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    /**
     * Registra una devolución para un pedido concreto.
     *
     * POST /orders/{id}/returns
     */
    @PostMapping("/{id}/returns")
    public ResponseEntity<ReturnResponseDto> createReturn(
            @PathVariable("id") Long orderId,
            @Valid @RequestBody CreateReturnRequestDto request) {

        ReturnResponseDto created = orderService.createReturn(orderId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Obtiene todas las devoluciones asociadas a un pedido.
     *
     * GET /orders/{id}/returns
     */
    @GetMapping("/{id}/returns")
    public ResponseEntity<List<ReturnResponseDto>> getReturnsByOrder(
            @PathVariable("id") Long orderId) {

        List<ReturnResponseDto> returns = orderService.getReturnsByOrderId(orderId);
        return ResponseEntity.ok(returns);
    }
}
