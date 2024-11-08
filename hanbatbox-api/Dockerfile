FROM gradle:8.10.2-jdk21-alpine as builder
WORKDIR /app

COPY . .
RUN gradle clean build

FROM openjdk:21
WORKDIR /app
COPY --from=builder /app/build/libs/hanbatbox-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]