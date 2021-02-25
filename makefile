buildserver:
	aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 507783707923.dkr.ecr.eu-west-2.amazonaws.com
	cd server && docker build -t splendid .
	docker tag splendid:latest 507783707923.dkr.ecr.eu-west-2.amazonaws.com/splendid:latest
	docker push 507783707923.dkr.ecr.eu-west-2.amazonaws.com/splendid:latest

tfapply:
	cd infra/terraform && terraform apply

tfdestroy:
	cd infra/terraform && terraform destroy

servertest:
	cd server && go test ./...

startall:
	cd server && go run . &
	cd client && yarn && yarn start
