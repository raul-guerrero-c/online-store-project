-- db/mysql/10_seed_products.sql
-- Datos de ejemplo para la tabla product.

USE online_store;

INSERT INTO product
  (sku, name, brand, category, short_description, long_description, price, currency, image_url, stock_quantity, active)
VALUES
  ('SKU-001', 'Laptop Pro 14"', 'TechBrand', 'Laptops',
   'Laptop profesional 14" con 16 GB RAM.',
   'Laptop profesional de 14 pulgadas con procesador de última generación, 16 GB de RAM y 512 GB SSD. Ideal para desarrollo de software y tareas intensivas.',
   24999.00, 'MXN', 'https://www.gizmochina.com/wp-content/uploads/2024/10/Asus-Vivobook-S15-9-768x576.jpg', 10, 1),

  ('SKU-002', 'Mouse inalámbrico ergonómico', 'PeriTech', 'Accesorios',
   'Mouse ergonómico inalámbrico con batería recargable.',
   'Mouse inalámbrico con diseño ergonómico, batería recargable por USB-C y sensor óptico de alta precisión. Ideal para uso prolongado en oficina o home office.',
   599.00, 'MXN', 'https://cdn.pixabay.com/photo/2023/08/10/03/51/ai-generated-8180657_960_720.jpg', 50, 1),

  ('SKU-003', 'Monitor 27" 4K UHD', 'VisionDisplay', 'Monitores',
   'Monitor 27 pulgadas resolución 4K UHD.',
   'Monitor de 27 pulgadas con resolución 4K UHD, panel IPS y alta fidelidad de color. Perfecto para diseño, edición de vídeo y desarrollo.',
   7999.00, 'MXN', 'https://cdn.pixabay.com/photo/2016/05/05/11/22/computer-1373684_1280.jpg', 15, 1),

  ('SKU-004', 'Teclado mecánico RGB', 'KeyMaster', 'Accesorios',
   'Teclado mecánico con iluminación RGB.',
   'Teclado mecánico con switches de alta durabilidad, iluminación RGB configurable y distribución en español (tecla ñ). Excelente para programadores y gamers.',
   1599.00, 'MXN', 'https://cdn.pixabay.com/photo/2024/10/30/10/53/ai-generated-9161446_1280.jpg', 30, 1),

  ('SKU-005', 'Audífonos inalámbricos ANC', 'SoundWave', 'Audio',
   'Audífonos Bluetooth con cancelación de ruido.',
   'Audífonos inalámbricos Bluetooth con cancelación activa de ruido (ANC), carga rápida y hasta 30 horas de autonomía. Incluye estuche de carga.',
   2199.00, 'MXN', 'https://cdn.pixabay.com/photo/2024/10/30/10/53/ai-generated-9161446_1280.jpg', 25, 1);
