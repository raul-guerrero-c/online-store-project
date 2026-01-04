# Configuración de base de datos MySQL (online_store)

Este proyecto utiliza una base de datos MySQL llamada `online_store`.  
Toda la definición (esquema, datos de ejemplo y procedimientos almacenados) se encuentra versionada en la carpeta:

- `db/mysql/`

## Orden de ejecución recomendado

Los scripts deben ejecutarse en el siguiente orden:

1. `db/mysql/00_create_database.sql`
2. `db/mysql/01_schema_productos.sql`
3. `db/mysql/02_schema_pedidos_devoluciones.sql`
4. `db/mysql/10_insert_productos.sql`
5. `db/mysql/20_procedures.sql`

## Ejecución desde MySQL Workbench

1. Abrir MySQL Workbench y conectarse al servidor MySQL local.
2. Abrir cada script en este orden y ejecutarlo:
   - `00_create_database.sql`
   - `01_schema_productos.sql`
   - `02_schema_pedidos_devoluciones.sql`
   - `10_insert_productos.sql`
   - `20_procedures.sql`
3. Verificar:

   ```sql
   USE online_store;
   SHOW TABLES;
   SELECT * FROM product;
   SHOW PROCEDURE STATUS WHERE Db = 'online_store';
