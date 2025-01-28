FROM python:3.12

ARG VOLUME

ENV VOLUME=$VOLUME

RUN pip install --upgrade pip

COPY ./tools/requirements.txt $VOLUME/
RUN pip install --no-cache-dir -r $VOLUME/requirements.txt

WORKDIR $VOLUME

CMD ["uvicorn", "AI.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
