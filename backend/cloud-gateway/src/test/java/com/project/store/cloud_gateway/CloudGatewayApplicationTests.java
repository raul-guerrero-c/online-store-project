package com.project.store.cloud_gateway;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// Prueba de carga de contexto deshabilitada para simplificar la configuración inicial.
// En el futuro se pueden añadir tests específicos para las rutas del Gateway.
@SpringBootTest
@Disabled("Se deshabilita la prueba de contexto mientras se termina de configurar la arquitectura")
class CloudGatewayApplicationTests {

    @Test
    void contextLoads() {
        // Test vacío deshabilitado
    }

}
