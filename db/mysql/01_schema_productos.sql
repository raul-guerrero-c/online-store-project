-- db/mysql/01_schema_products.sql
-- Esquema de la tabla de productos.

USE online_store;

DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  sku                VARCHAR(50) NOT NULL,
  name               VARCHAR(200) NOT NULL,
  brand              VARCHAR(150) NOT NULL,
  category           VARCHAR(100) NOT NULL,
  short_description  VARCHAR(500) NOT NULL,
  long_description   TEXT NOT NULL,
  price              DECIMAL(10, 2) NOT NULL,
  currency           VARCHAR(3) NOT NULL DEFAULT 'MXN',
  image_url          VARCHAR(500) NULL,
  stock_quantity     INT NOT NULL DEFAULT 0,
  active             TINYINT(1) NOT NULL DEFAULT 1,
  created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uk_product_sku (sku),

  KEY idx_product_name (name),
  KEY idx_product_brand (brand),
  KEY idx_product_category (category)
) ENGINE=InnoDB;
