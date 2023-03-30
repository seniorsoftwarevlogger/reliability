chaosmesh:
	kubectl create token account-cluster-manager-ugbmq
prune:
	minikube ssh -- docker system prune
grafana:
	kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
