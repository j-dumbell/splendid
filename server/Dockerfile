FROM golang:latest AS build-env

WORKDIR /app
COPY . .
RUN go build -o goapp .

FROM alpine
WORKDIR /app
COPY --from=build-env /app/goapp goapp

EXPOSE 8080

CMD .goapp
