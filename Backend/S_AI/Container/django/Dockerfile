FROM python:3.12

WORKDIR /app

COPY AI /app/

RUN pip install --upgrade pip

COPY ./tools/requirements.txt /app/AI/requirements.txt
RUN pip install --no-cache-dir -r /app/AI/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "AI.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
