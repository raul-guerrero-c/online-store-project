package com.project.store.operator_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * DTO de entrada para la creación de un pedido.
 * Incluye los datos básicos del cliente y la lista de productos.
 */
public class CreateOrderRequestDto {

    @NotEmpty(message = "El nombre del cliente no puede estar vacío")
    @Size(max = 200, message = "El nombre del cliente no puede superar los 200 caracteres")
    private String customerName;

    @Email(message = "El correo electrónico no tiene un formato válido")
    @Size(max = 200, message = "El correo electrónico no puede superar los 200 caracteres")
    private String customerEmail;

    @Size(max = 20, message = "El teléfono no puede superar los 20 caracteres")
    private String customerPhone;

    @NotEmpty(message = "La moneda es obligatoria")
    @Size(max = 3, message = "La moneda debe tener como máximo 3 caracteres (por ejemplo, MXN)")
    private String currency;

    @NotNull(message = "La lista de productos no puede ser nula")
    @NotEmpty(message = "Debe incluir al menos un producto en el pedido")
    private List<OrderItemRequestDto> items;

    public CreateOrderRequestDto() {
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public List<OrderItemRequestDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDto> items) {
        this.items = items;
    }
}
