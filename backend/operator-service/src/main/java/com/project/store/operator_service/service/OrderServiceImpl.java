package com.project.store.operator_service.service;

import com.project.store.operator_service.dto.CreateOrderRequestDto;
import com.project.store.operator_service.dto.CreateReturnRequestDto;
import com.project.store.operator_service.dto.OrderItemRequestDto;
import com.project.store.operator_service.dto.OrderItemResponseDto;
import com.project.store.operator_service.dto.OrderResponseDto;
import com.project.store.operator_service.dto.ReturnResponseDto;
import com.project.store.operator_service.exception.InvalidRequestException;
import com.project.store.operator_service.exception.ResourceNotFoundException;
import com.project.store.operator_service.model.OrderHeader;
import com.project.store.operator_service.model.OrderItem;
import com.project.store.operator_service.model.ReturnRequest;
import com.project.store.operator_service.repository.OrderHeaderRepository;
import com.project.store.operator_service.repository.OrderItemRepository;
import com.project.store.operator_service.repository.ReturnRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Implementación del servicio de negocio para pedidos y devoluciones.
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderHeaderRepository orderHeaderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ReturnRequestRepository returnRequestRepository;

    public OrderServiceImpl(OrderHeaderRepository orderHeaderRepository,
                            OrderItemRepository orderItemRepository,
                            ReturnRequestRepository returnRequestRepository) {
        this.orderHeaderRepository = orderHeaderRepository;
        this.orderItemRepository = orderItemRepository;
        this.returnRequestRepository = returnRequestRepository;
    }

    @Override
    public OrderResponseDto createOrder(CreateOrderRequestDto request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new InvalidRequestException("El pedido debe contener al menos un producto");
        }

        // Calcular subtotales y total del pedido.
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItemRequestDto item : request.getItems()) {
            BigDecimal subtotal = item.getUnitPrice()
                    .multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(subtotal);
        }

        // Generar un código de pedido sencillo (podría mejorarse si se requiere).
        String orderCode = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Crear la cabecera del pedido.
        OrderHeader orderHeader = new OrderHeader(
                orderCode,
                LocalDateTime.now(),
                request.getCustomerName(),
                request.getCustomerEmail(),
                request.getCustomerPhone(),
                total,
                request.getCurrency(),
                "CONFIRMED"
        );

        // Crear las líneas de pedido.
        for (OrderItemRequestDto itemRequest : request.getItems()) {
            BigDecimal subtotal = itemRequest.getUnitPrice()
                    .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            OrderItem orderItem = new OrderItem(
                    orderHeader,
                    itemRequest.getProductId(),
                    itemRequest.getQuantity(),
                    itemRequest.getUnitPrice(),
                    subtotal
            );

            orderHeader.addItem(orderItem);
        }

        // Persistir el pedido completo.
        OrderHeader saved = orderHeaderRepository.save(orderHeader);

        // Devolver el pedido en forma de DTO.
        return mapToOrderResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDto getOrderById(Long orderId) {
        OrderHeader order = orderHeaderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No se encontró el pedido con id " + orderId
                ));
        return mapToOrderResponseDto(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDto> getAllOrders() {
        return orderHeaderRepository.findAll().stream()
                .map(this::mapToOrderResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReturnResponseDto createReturn(Long orderId, CreateReturnRequestDto request) {
        // Buscar la cabecera del pedido.
        OrderHeader order = orderHeaderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No se encontró el pedido con id " + orderId
                ));

        // Buscar la línea del pedido a devolver.
        OrderItem orderItem = orderItemRepository.findById(request.getOrderItemId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No se encontró la línea de pedido con id " + request.getOrderItemId()
                ));

        // Validar que la línea pertenece al pedido indicado.
        if (!orderItem.getOrder().getId().equals(order.getId())) {
            throw new InvalidRequestException(
                    "La línea de pedido no pertenece al pedido indicado"
            );
        }

        // Validar cantidad.
        if (request.getQuantity() <= 0) {
            throw new InvalidRequestException("La cantidad de la devolución debe ser mayor que cero");
        }
        if (request.getQuantity() > orderItem.getQuantity()) {
            throw new InvalidRequestException(
                    "La cantidad a devolver no puede ser mayor que la cantidad del pedido"
            );
        }

        // Calcular el importe a reembolsar.
        BigDecimal refundAmount = orderItem.getUnitPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        // Crear la solicitud de devolución.
        ReturnRequest returnRequest = new ReturnRequest(
                order,
                orderItem,
                orderItem.getProductId(),
                request.getQuantity(),
                request.getReason(),
                "REQUESTED",
                refundAmount
        );

        order.addReturn(returnRequest);

        ReturnRequest saved = returnRequestRepository.save(returnRequest);

        return mapToReturnResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReturnResponseDto> getReturnsByOrderId(Long orderId) {
        OrderHeader order = orderHeaderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No se encontró el pedido con id " + orderId
                ));

        return order.getReturns().stream()
                .map(this::mapToReturnResponseDto)
                .collect(Collectors.toList());
    }

    // ============================================================
    // Métodos privados de mapeo entre entidades y DTOs
    // ============================================================

    private OrderResponseDto mapToOrderResponseDto(OrderHeader order) {
        List<OrderItemResponseDto> itemDtos = order.getItems().stream()
                .map(this::mapToOrderItemResponseDto)
                .collect(Collectors.toList());

        return new OrderResponseDto(
                order.getId(),
                order.getOrderCode(),
                order.getOrderDate(),
                order.getCustomerName(),
                order.getCustomerEmail(),
                order.getCustomerPhone(),
                order.getTotalAmount(),
                order.getCurrency(),
                order.getStatus(),
                itemDtos
        );
    }

    private OrderItemResponseDto mapToOrderItemResponseDto(OrderItem item) {
        return new OrderItemResponseDto(
                item.getId(),
                item.getProductId(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getSubtotal()
        );
    }

    private ReturnResponseDto mapToReturnResponseDto(ReturnRequest request) {
        return new ReturnResponseDto(
                request.getId(),
                request.getOrder().getId(),
                request.getOrderItem().getId(),
                request.getProductId(),
                request.getQuantity(),
                request.getReason(),
                request.getStatus(),
                request.getRefundAmount()
        );
    }
}
