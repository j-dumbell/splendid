FROM golang:latest

WORKDIR /app

COPY cmd cmd/
COPY api api/
COPY go.mod ./

RUN go build -o build/main cmd/main.go

EXPOSE 8080

CMD ./build/main
