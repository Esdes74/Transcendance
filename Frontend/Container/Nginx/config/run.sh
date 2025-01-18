until nc -z api_web 8000; do
	sleep 1
done

nginx -g "daemon off;"
