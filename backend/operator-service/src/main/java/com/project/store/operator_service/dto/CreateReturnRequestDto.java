package com.project.store.operator_service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO de entrada para registrar una devolución sobre un pedido.
 */
public class CreateReturnRequestDto {

    @NotNull(message = "El identificador de la línea de pedido es obligatorio")
    private Long orderItemId;

    @NotNull(message = "La cantidad a devolver es obligatoria")
    @Min(value = 1, message = "La cantidad a devolver debe ser al menos 1")
    private Integer quantity;

    @NotEmpty(message = "El motivo de la devolución es obligatorio")
    @Size(max = 500, message = "El motivo de la devolución no puede superar los 500 caracteres")
    private String reason;

    public CreateReturnRequestDto() {
    }

    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
