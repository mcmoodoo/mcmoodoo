FROM vllm/vllm-openai:latest

WORKDIR /app

RUN python3 -m pip install --no-cache-dir runpod requests huggingface_hub

COPY start.sh handler.py context.json /app/
RUN chmod +x /app/start.sh

ENV CONTEXT_JSON_PATH=/app/context.json \
    MODEL_DIR=/runpod-volume/model \
    MODEL_ID=meta-llama/Llama-3.2-3B-Instruct \
    VLLM_API_URL=http://127.0.0.1:8000 \
    VLLM_PORT=8000 \
    SERVED_MODEL_NAME=llama-3.2-3b-instruct \
    TEMPERATURE=0.2 \
    MAX_TOKENS=512

CMD ["/app/start.sh"]
