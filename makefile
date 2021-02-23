buildserver:
	aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 507783707923.dkr.ecr.eu-west-2.amazonaws.com
	cd server && docker build -t server .
	docker tag server:latest 507783707923.dkr.ecr.eu-west-2.amazonaws.com/server:latest
	docker push 507783707923.dkr.ecr.eu-west-2.amazonaws.com/server:latest

tfapply:
	cd infra/terraform && terraform apply

servertest:
	cd server && go test ./...

startall:
	cd server && go run . &
	cd client && yarn build && yarn start
