timestamp = $(shell date +%s)
chaostoken:
	kubectl create token account-cluster-manager-ugbmq
prune:
	minikube ssh -- docker system prune
build: $(timestamp)
	docker build -t seniorsoftwarevlogger/reliability-frontend:$(timestamp) ./frontend
	minikube image load seniorsoftwarevlogger/reliability-frontend:$(timestamp)
