FROM bitnami/postgresql:latest

RUN mkdir -p /var/lib/postgres/data
WORKDIR /var/lib/postgres

COPY conf/init.sh .
RUN bash init.sh
