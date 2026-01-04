-- db/mysql/20_procedures.sql
-- Procedimientos almacenados básicos para stock y devoluciones.

USE online_store;

DROP PROCEDURE IF EXISTS sp_decrease_stock;
DROP PROCEDURE IF EXISTS sp_increase_stock;
DROP PROCEDURE IF EXISTS sp_register_return;

DELIMITER $$

-- Disminuye el stock de un producto.
CREATE PROCEDURE sp_decrease_stock(
  IN p_product_id BIGINT UNSIGNED,
  IN p_quantity   INT
)
BEGIN
  UPDATE product
  SET stock_quantity = stock_quantity - p_quantity
  WHERE id = p_product_id
    AND stock_quantity >= p_quantity;
END$$

-- Aumenta el stock de un producto (por ejemplo, tras una devolución).
CREATE PROCEDURE sp_increase_stock(
  IN p_product_id BIGINT UNSIGNED,
  IN p_quantity   INT
)
BEGIN
  UPDATE product
  SET stock_quantity = stock_quantity + p_quantity
  WHERE id = p_product_id;
END$$

-- Registra una devolución y ajusta stock.
CREATE PROCEDURE sp_register_return(
  IN p_order_item_id BIGINT UNSIGNED,
  IN p_quantity      INT,
  IN p_reason        VARCHAR(500)
)
BEGIN
  DECLARE v_order_id   BIGINT UNSIGNED;
  DECLARE v_product_id BIGINT UNSIGNED;
  DECLARE v_unit_price DECIMAL(10, 2);

  -- Obtener datos del order_item.
  SELECT oi.order_id, oi.product_id, oi.unit_price
  INTO v_order_id, v_product_id, v_unit_price
  FROM order_item oi
  WHERE oi.id = p_order_item_id;

  -- Insertar la devolución.
  INSERT INTO return_request (order_id, order_item_id, product_id, quantity, reason, status, refund_amount)
  VALUES (v_order_id, p_order_item_id, v_product_id, p_quantity, p_reason, 'REQUESTED', v_unit_price * p_quantity);

  -- Aumentar stock del producto.
  CALL sp_increase_stock(v_product_id, p_quantity);
END$$

DELIMITER ;
