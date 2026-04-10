FROM ubuntu:latest

WORKDIR /app

COPY . .

RUN apt update 
RUN apt install -y openjdk-17-jdk maven 

RUN mvn clean package

CMD ["java", "-jar", "target/app.jar"]