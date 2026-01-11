# Etapa 1: compilar el proyecto con Maven y JDK 17
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Copiamos el pom y el código fuente
COPY pom.xml .
COPY src ./src

# Construimos el JAR sin ejecutar tests
RUN mvn -q -DskipTests package

# Etapa 2: imagen ligera solo con JRE 17
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiamos el JAR generado desde la etapa builder
# OJO: el JAR está en /app/target dentro del stage "builder"
COPY --from=builder /app/target/*.jar app.jar

# Exponemos el puerto donde escucha Eureka
EXPOSE 8761

# Perfil por defecto (no necesitamos 'docker' aquí)
ENV SPRING_PROFILES_ACTIVE=default

# Comando de arranque
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
