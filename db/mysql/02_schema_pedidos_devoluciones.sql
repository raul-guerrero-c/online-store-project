-- db/mysql/02_schema_orders_returns.sql
-- Esquema de pedidos (order_header, order_item) y devoluciones (return_request).

USE online_store;

-- OJO: eliminamos primero las tablas que dependen de otras,
-- para evitar errores de claves foráneas.
DROP TABLE IF EXISTS return_request;
DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS order_header;

-- =========================================================================
-- Cabecera de pedidos
-- =========================================================================
CREATE TABLE order_header (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_code     VARCHAR(50) NOT NULL,
  order_date     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  customer_name  VARCHAR(200) NULL,
  customer_email VARCHAR(200) NULL,
  customer_phone VARCHAR(20)  NULL,
  total_amount   DECIMAL(10, 2) NOT NULL,
  currency       VARCHAR(3) NOT NULL DEFAULT 'MXN',
  status         ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'RETURNED') NOT NULL DEFAULT 'CONFIRMED',
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uk_order_code (order_code),
  KEY idx_order_date (order_date),
  KEY idx_order_status (status)
) ENGINE=InnoDB;

-- =========================================================================
-- Detalle de pedidos (líneas)
-- =========================================================================
CREATE TABLE order_item (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id     BIGINT UNSIGNED NOT NULL,
  product_id   BIGINT UNSIGNED NOT NULL,
  quantity     INT NOT NULL,
  unit_price   DECIMAL(10, 2) NOT NULL,
  subtotal     DECIMAL(10, 2) NOT NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  KEY idx_order_item_order (order_id),
  KEY idx_order_item_product (product_id),

  CONSTRAINT fk_order_item_order
    FOREIGN KEY (order_id) REFERENCES order_header (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_order_item_product
    FOREIGN KEY (product_id) REFERENCES product (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================================================================
-- Devoluciones
-- =========================================================================
CREATE TABLE return_request (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id        BIGINT UNSIGNED NOT NULL,
  order_item_id   BIGINT UNSIGNED NOT NULL,
  product_id      BIGINT UNSIGNED NOT NULL,
  quantity        INT NOT NULL,
  reason          VARCHAR(500) NOT NULL,
  status          ENUM('REQUESTED', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'REQUESTED',
  refund_amount   DECIMAL(10, 2) NULL,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),

  KEY idx_return_order (order_id),
  KEY idx_return_product (product_id),
  KEY idx_return_status (status),

  CONSTRAINT fk_return_order
    FOREIGN KEY (order_id) REFERENCES order_header (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_return_order_item
    FOREIGN KEY (order_item_id) REFERENCES order_item (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_return_product
    FOREIGN KEY (product_id) REFERENCES product (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;
