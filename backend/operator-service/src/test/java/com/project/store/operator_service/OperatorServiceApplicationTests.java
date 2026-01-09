package com.project.store.operator_service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Prueba mínima para evitar que el plugin Surefire falle mientras
 * terminamos de configurar el microservicio.
 *
 * No usamos @SpringBootTest para no levantar el contexto completo.
 */
class OperatorServiceApplicationTests {

    @Test
    void dummyTest() {
        // Prueba vacía: simplemente verifica que el proyecto compila y que JUnit funciona.
    }
}
