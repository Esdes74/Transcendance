FROM debian:12

# Installation de dnsmasq
RUN apt-get update && apt-get install -y dnsmasq netcat-traditional && apt-get clean

# Configuration de dnsmasq
COPY config/dnsmasq.conf /etc/dnsmasq.conf
COPY config/launch.sh .

# Assure que launch.sh est exécutable
RUN chmod +x /launch.sh

EXPOSE 53

ENTRYPOINT ["bash", "/launch.sh"]