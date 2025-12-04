# 1. ETAPA DE CONSTRUCCIÓN
# Usamos una imagen oficial de Maven que ya tiene Java 21 instalado
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# 2. ETAPA DE EJECUCIÓN
# Usamos una imagen ligera de Java 21 solo para correr la app
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]