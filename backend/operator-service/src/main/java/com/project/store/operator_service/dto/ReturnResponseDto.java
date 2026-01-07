package com.project.store.operator_service.dto;

import java.math.BigDecimal;

/**
 * DTO de salida para una devolución registrada.
 */
public class ReturnResponseDto {

    private Long id;
    private Long orderId;
    private Long orderItemId;
    private Long productId;

    private Integer quantity;
    private String reason;
    private String status;
    private BigDecimal refundAmount;

    public ReturnResponseDto() {
    }

    public ReturnResponseDto(Long id,
                             Long orderId,
                             Long orderItemId,
                             Long productId,
                             Integer quantity,
                             String reason,
                             String status,
                             BigDecimal refundAmount) {
        this.id = id;
        this.orderId = orderId;
        this.orderItemId = orderItemId;
        this.productId = productId;
        this.quantity = quantity;
        this.reason = reason;
        this.status = status;
        this.refundAmount = refundAmount;
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getOrderItemId() {
        return orderItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getReason() {
        return reason;
    }

    public String getStatus() {
        return status;
    }

    public BigDecimal getRefundAmount() {
        return refundAmount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setRefundAmount(BigDecimal refundAmount) {
        this.refundAmount = refundAmount;
    }
}
