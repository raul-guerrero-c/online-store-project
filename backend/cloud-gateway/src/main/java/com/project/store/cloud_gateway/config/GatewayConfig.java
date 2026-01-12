package com.project.store.cloud_gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

/**
 * Configuración de rutas para Spring Cloud Gateway.
 *
 * Aquí definimos cómo el gateway enruta las peticiones hacia los microservicios
 * y hacia rutas de prueba externas.
 */
@Configuration
public class GatewayConfig {

    /**
     * Define las rutas del Gateway.
     *
     * - /api/orders/** -> operator-service (a través de Eureka, lb://operator-service)
     * - /test/**        -> httpbin.org (ruta de prueba para verificar que el Gateway enruta correctamente)
     */
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Ruta para operator-service: pedidos y devoluciones
                .route("operator-service", r -> r
                        .path("/api/orders", "/api/orders/**")
                        .filters(f -> f.stripPrefix(1)) // /api/orders -> /orders
                        .uri("lb://operator-service"))
                // Ruta para operator-service: pedidos y devoluciones
                .route("search-service", r -> r
                        .path("/api/products", "/api/products/**")
                        .filters(f -> f.stripPrefix(1)) // /api/orders -> /orders
                        .uri("lb://search-service"))
                // Ruta de prueba hacia httpbin.org
                .route("test-route", r -> r
                        .path("/test/**")
                        .filters(f -> f.stripPrefix(1)) // /test/get -> /get
                        .uri("https://httpbin.org"))
                .build();
    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // Permitir orígenes para desarrollo y pruebas remotas (ajusta según sea necesario)
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "http://localhost:8081",
                "https://74.208.73.139"
        ));
        // Permitir patrones de origen (útil para pruebas con puertos variables o IPs dinámicas)
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
}
