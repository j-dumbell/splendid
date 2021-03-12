# Splendid

A bootleg version of the board game Splendor

### Client
```bash
cd ts
yarn install
yarn start
```

### Server
```bash
docker-compose up server
go run .
```

### Client and Server together
With both the client and server running (either with `docker-compose up` or the individual commands as listed above)
- go to `localhost:3000`
- open the inspector
- type and send
```js
ws.send(JSON.stringify({ message: "new game" }))
```
