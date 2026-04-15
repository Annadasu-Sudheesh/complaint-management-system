# Build stage: Compile the application using Maven
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build
COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn
COPY mvnw mvnw.cmd ./

RUN mvn clean package -DskipTests

# Runtime stage: Run the compiled JAR with minimal Java image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /build/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the Spring Boot port
EXPOSE 8080

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/h2-console || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]