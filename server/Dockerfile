FROM golang:latest AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o goapp .

FROM alpine:latest
WORKDIR /app
COPY --from=builder app/goapp .

EXPOSE 8080

CMD ./goapp
