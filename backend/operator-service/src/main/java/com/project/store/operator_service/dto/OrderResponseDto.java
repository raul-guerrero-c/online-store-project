package com.project.store.operator_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO de salida para un pedido completo.
 * Incluye datos del cliente, totales y las líneas de pedido.
 */
public class OrderResponseDto {

    private Long id;
    private String orderCode;
    private LocalDateTime orderDate;

    private String customerName;
    private String customerEmail;
    private String customerPhone;

    private BigDecimal totalAmount;
    private String currency;
    private String status;

    private List<OrderItemResponseDto> items;

    public OrderResponseDto() {
    }

    public OrderResponseDto(Long id,
                            String orderCode,
                            LocalDateTime orderDate,
                            String customerName,
                            String customerEmail,
                            String customerPhone,
                            BigDecimal totalAmount,
                            String currency,
                            String status,
                            List<OrderItemResponseDto> items) {
        this.id = id;
        this.orderCode = orderCode;
        this.orderDate = orderDate;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.totalAmount = totalAmount;
        this.currency = currency;
        this.status = status;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public String getStatus() {
        return status;
    }

    public List<OrderItemResponseDto> getItems() {
        return items;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setItems(List<OrderItemResponseDto> items) {
        this.items = items;
    }
}
