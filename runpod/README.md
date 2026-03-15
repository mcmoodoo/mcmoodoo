# RunPod GPU Pod – vLLM

This directory builds a Docker image that runs **vLLM** (OpenAI-compatible API) on a **regular RunPod GPU pod**. The model (default: `OpenHands/openhands-lm-7b-v0.1`) is stored on a volume mounted at `/workspace` and is downloaded from Hugging Face on first start if not already present.

---

## What the image does

- **Entrypoint**: `/app/start.sh`
- **start.sh**: If `/workspace/config.json` is missing, downloads `MODEL_ID` into `/workspace`; then starts the vLLM OpenAI server in the **foreground** on port 8000. The container stays up as long as vLLM is running.

No serverless handler: the pod exposes vLLM’s HTTP API directly (e.g. `/v1/chat/completions`, `/v1/models`).

---

## Volume and model

- **Mount path**: `/workspace` (set when you create the pod).
- **Model**: Stored at `/workspace` (Hugging Face snapshot: `config.json`, tokenizer, safetensors, etc.).
- **Default model**: `OpenHands/openhands-lm-7b-v0.1`. Override with env `MODEL_ID`; for gated models set `HF_TOKEN` (or `HUGGING_FACE_HUB_TOKEN`).

---

## Build and push

From this directory:

```bash
just docker-build
# or build and push to GHCR (requires RUNPOD_GHCR_TOKEN):
just docker-push
```

Image name: `ghcr.io/mcmoodoo/runpod-llama-chat:latest` (override with `IMAGE` and `TAG`).

---

## Run on a GPU pod

1. **Configure runpodctl** (once):

   ```bash
   runpodctl config --apiKey="$RUNPOD_API_KEY"
   ```

2. **Create a pod** (from this directory):

   ```bash
   just runpod-pod-create
   ```

   This runs `runpodctl create pod` with the vLLM image, GPU type from `GPU_TYPE` (default: RTX 4090), 50 GB volume at `/workspace`, and port 8000 exposed. Optional: set `HF_TOKEN` for gated models.

   For an existing **network volume** instead of a new one, use RunPod Console or `runpodctl create pod ... --networkVolumeId <id>` (see RunPod docs).

3. **List / inspect / stop / delete pods**:

   ```bash
   just runpod-pod-list
   POD_ID=<id> just runpod-pod-get
   POD_ID=<id> just runpod-pod-stop
   POD_ID=<id> just runpod-pod-delete
   ```

4. **Call vLLM** once the pod is running and you have its URL (e.g. from the RunPod dashboard, or the HTTP endpoint for port 8000):

   ```bash
   POD_URL=https://your-pod-id.runpod.net  just vllm-chat
   # or with a message:
   POD_URL=https://... MESSAGE="Your prompt" just vllm-chat
   ```

   `vllm-chat` sends a single user message to `/v1/chat/completions` and prints the JSON response. You can also use `curl` or any OpenAI-compatible client against `POD_URL` (port 8000).

---

## Environment variables (container)

| Variable | Default | Description |
|----------|---------|-------------|
| `MODEL_DIR` | `/workspace` | Where the model lives (and where it’s downloaded). |
| `MODEL_ID` | `OpenHands/openhands-lm-7b-v0.1` | Hugging Face repo to download if `MODEL_DIR/config.json` is missing. |
| `HF_TOKEN` / `HUGGING_FACE_HUB_TOKEN` | — | For gated models. |
| `VLLM_PORT` | `8000` | Port vLLM listens on. |
| `SERVED_MODEL_NAME` | `openhands-lm-7b-v0.1` | Model name in the API. |
| `GPU_MEMORY_UTILIZATION` | `0.90` | vLLM GPU memory fraction. |
| `MAX_MODEL_LEN` | `8192` | vLLM max sequence length. |

---

## Justfile summary

| Command | Description |
|---------|-------------|
| `just docker-build` | Build the image. |
| `just docker-push` | Log in to GHCR, build, push. |
| `just runpod-pod-create` | Create a GPU pod with this image and volume at `/workspace`. |
| `just runpod-pod-list` | List pods. |
| `just runpod-pod-get` | Get pod details (set `POD_ID`). |
| `just runpod-pod-stop` / `runpod-pod-delete` | Stop or delete pod (`POD_ID`). |
| `just vllm-chat` | POST one chat message to vLLM (set `POD_URL`; optional `MESSAGE`). |
| `just runpod-gpus` / `runpod-datacenters` | List GPU types and datacenters. |

---

## Log book

- Uploading to GHCR takes a long time (image ~20 GB). Consider building and pushing from an EC2 instance with Docker and Nix installed.
