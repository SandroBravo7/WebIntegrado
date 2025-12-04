# 1. Usamos una imagen que ya tiene Maven y Java 17 listos para construir
FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# 2. Una vez construido, pasamos solo lo necesario a una imagen ligera para correrlo
FROM openjdk:17-jdk-slim
COPY --from=build /target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]