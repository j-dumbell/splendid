FROM golang:latest

WORKDIR /app

COPY api api/
COPY config config/
COPY pkg pkg/
COPY main.go go.mod go.sum ./

RUN go build -o build/main .

EXPOSE 8080

CMD ./build/main
