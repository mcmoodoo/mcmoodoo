#!/usr/bin/env bash
set -euo pipefail

MODEL_DIR="${MODEL_DIR:-/runpod-volume/model}"
VLLM_PORT="${VLLM_PORT:-8000}"
SERVED_MODEL_NAME="${SERVED_MODEL_NAME:-llama-3.2-3b-instruct}"
GPU_MEMORY_UTILIZATION="${GPU_MEMORY_UTILIZATION:-0.90}"
MAX_MODEL_LEN="${MAX_MODEL_LEN:-8192}"

echo "Starting vLLM OpenAI server..."
python3 -m vllm.entrypoints.openai.api_server \
  --host 0.0.0.0 \
  --port "${VLLM_PORT}" \
  --model "${MODEL_DIR}" \
  --served-model-name "${SERVED_MODEL_NAME}" \
  --gpu-memory-utilization "${GPU_MEMORY_UTILIZATION}" \
  --max-model-len "${MAX_MODEL_LEN}" \
  >/tmp/vllm.log 2>&1 &

vllm_pid="$!"
cleanup() {
  kill "${vllm_pid}" >/dev/null 2>&1 || true
}
trap cleanup EXIT

echo "Waiting for vLLM to become ready..."
python3 - <<'PY'
import os, time
import requests

base = os.environ.get("VLLM_API_URL", "http://127.0.0.1:8000").rstrip("/")
deadline = time.time() + 600
last_err = None
while time.time() < deadline:
    try:
        r = requests.get(f"{base}/v1/models", timeout=2)
        if r.status_code == 200:
            print("vLLM is ready.")
            raise SystemExit(0)
        last_err = f"status={r.status_code} body={r.text[:200]}"
    except Exception as e:
        last_err = repr(e)
    time.sleep(1)
print("vLLM failed to become ready:", last_err)
raise SystemExit(1)
PY

echo "Starting RunPod handler..."
exec python3 -u /app/handler.py

