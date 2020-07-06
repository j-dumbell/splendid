FROM golang:latest

WORKDIR /app

COPY routes routes/
COPY go.mod main.go ./

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]