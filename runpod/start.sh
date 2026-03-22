#!/usr/bin/env bash
set -euo pipefail

MODEL_DIR="${MODEL_DIR:-/workspace}"
MODEL_ID="${MODEL_ID:-OpenHands/openhands-lm-7b-v0.1}"
VLLM_PORT="${VLLM_PORT:-8000}"
SERVED_MODEL_NAME="${SERVED_MODEL_NAME:-openhands-lm-7b-v0.1}"
GPU_MEMORY_UTILIZATION="${GPU_MEMORY_UTILIZATION:-0.90}"
MAX_MODEL_LEN="${MAX_MODEL_LEN:-8192}"
TENSOR_PARALLEL_SIZE="${TENSOR_PARALLEL_SIZE:-1}"
PIPELINE_PARALLEL_SIZE="${PIPELINE_PARALLEL_SIZE:-1}"
TOOL_CALL_PARSER="${TOOL_CALL_PARSER:-hermes}"

# Download model into volume if not already present
if [ ! -f "${MODEL_DIR}/config.json" ]; then
    echo "Model not found at ${MODEL_DIR}; downloading ${MODEL_ID}..."
    mkdir -p "${MODEL_DIR}"
    python3 - <<'PY'
import os
from huggingface_hub import snapshot_download

model_id = os.environ["MODEL_ID"]
local_dir = os.environ["MODEL_DIR"]
token = os.environ.get("HF_TOKEN") or os.environ.get("HUGGING_FACE_HUB_TOKEN")
snapshot_download(
    repo_id=model_id,
    local_dir=local_dir,
    token=token or None,
)
print("Download complete.")
PY
else
    echo "Model already present at ${MODEL_DIR}; skipping download."
fi

echo "Starting vLLM OpenAI server (foreground)..."
exec python3 -m vllm.entrypoints.openai.api_server \
    --host 0.0.0.0 \
    --port "${VLLM_PORT}" \
    --tensor-parallel-size "${TENSOR_PARALLEL_SIZE}" \
    --pipeline-parallel-size "${PIPELINE_PARALLEL_SIZE}" \
    --model "${MODEL_DIR}" \
    --served-model-name "${SERVED_MODEL_NAME}" \
    --gpu-memory-utilization "${GPU_MEMORY_UTILIZATION}" \
    --max-model-len "${MAX_MODEL_LEN}" \
    --enable-auto-tool-choice \
    --tool-call-parser "${TOOL_CALL_PARSER}"
