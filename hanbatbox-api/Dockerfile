#FROM gradle:8.10.2-jdk21-alpine as Builder
#WORKDIR /app
#
#COPY . .
#RUN gradle clean build
#COPY ./build/libs/hanbatbox-0.0.1-SNAPSHOT.jar /app.jar
#
#FROM openjdk:21
#WORKDIR /app
#COPY --from=Builder /app.jar .
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "app.jar"]
FROM openjdk:21
WORKDIR /app
COPY build/libs/hanbatbox-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
