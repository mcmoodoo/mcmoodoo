FROM vllm/vllm-openai:latest

WORKDIR /app

RUN python3 -m pip install --no-cache-dir requests huggingface_hub

COPY start.sh /app/
RUN chmod +x /app/start.sh

ENV MODEL_DIR=/workspace \
    MODEL_ID=OpenHands/openhands-lm-7b-v0.1 \
    VLLM_PORT=8000 \
    SERVED_MODEL_NAME=openhands-lm-7b-v0.1 \
    GPU_MEMORY_UTILIZATION=0.90 \
    MAX_MODEL_LEN=8192 \
    TENSOR_PARALLEL_SIZE=1 \
    PIPELINE_PARALLEL_SIZE=1 \
    TOOL_CALL_PARSER=hermes

ENTRYPOINT ["/app/start.sh"]
