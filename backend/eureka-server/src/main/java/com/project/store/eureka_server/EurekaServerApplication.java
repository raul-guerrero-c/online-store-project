// backend/eureka-server/src/main/java/com/project/store/eureka/EurekaServerApplication.java
package com.project.store.eureka_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

// Aplicación Spring Boot que actúa como servidor de registro Eureka.
// Otros microservicios se registrarán aquí y el Cloud Gateway los descubrirá.
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }

}
