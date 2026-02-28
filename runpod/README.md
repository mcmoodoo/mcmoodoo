# LLaMA 3.2 3B Serverless Chat on RunPod (vLLM)

This directory contains the setup for a RunPod serverless endpoint that serves a **Llama‑3.2‑3B‑Instruct** chat assistant using **vLLM**, with a baked‑in JSON profile for context.

The assistant answers visitor questions about you based on that JSON.

---

## Step 1 – Model & Runtime

- **Model**: `Llama-3.2-3B-Instruct` (3B, instruct‑tuned).
- **Runtime**: **vLLM** (OpenAI‑compatible HTTP API).
- **Interaction pattern**:
  - Client sends a single field: `message` (visitor question).
  - Container injects your JSON profile as a **system** message.
  - vLLM returns a non‑streaming chat completion.

---

## Step 2 – Where the Weights Live

- **Storage**: RunPod **Network Volume**.
- **Volume** (already created):
  - ID: `4lqjmp64p7`
  - Name: `llama3-model`
  - Data center: `US-MO-2`
  - Size: `20` GB
- **Expected on‑disk layout (inside the volume)**:
  - Mount path in container: `/runpod-volume`
  - Model directory: `/runpod-volume/model`
    - Contains standard Hugging Face model files (config, tokenizer, safetensors, etc.).
- **Model download**: On first start, the container downloads the model from Hugging Face into `/runpod-volume/model` if `config.json` is not already present there. Subsequent starts skip the download. For gated models (e.g. `meta-llama/Llama-3.2-3B-Instruct`), set `HF_TOKEN` (or `HUGGING_FACE_HUB_TOKEN`) in the endpoint environment.

---

## Step 3 – Container Image Design

- **Base image**: `vllm/vllm-openai:latest`
- **App layout (in this repo, under `runpod/`)**:
  - `Dockerfile` – builds the serverless image.
  - `start.sh` – downloads the model into the volume if not present, starts vLLM, waits for it to be ready, then starts the RunPod handler.
  - `handler.py` – RunPod serverless handler:
    - Reads baked‑in `context.json`.
    - Builds system prompt from the JSON.
    - Sends `messages` to vLLM `/v1/chat/completions`.
    - Returns `{"response": "<answer>"}`.
  - `context.json` – your structured, dense JSON profile (currently a placeholder; you will fill this in).
  - `.dockerignore` – keeps image small.
  - `Justfile` – helper commands for building/pushing the image to GHCR.

### Key environment variables (with defaults)

Set in `Dockerfile` and/or at runtime:

- `CONTEXT_JSON_PATH` – default: `/app/context.json`
- `MODEL_DIR` – default: `/runpod-volume/model`
- `MODEL_ID` – default: `meta-llama/Llama-3.2-3B-Instruct` (Hugging Face repo ID; used to download the model into the volume if missing).
- `HF_TOKEN` or `HUGGING_FACE_HUB_TOKEN` – optional; required for gated models like Meta LLaMA.
- `VLLM_API_URL` – default: `http://127.0.0.1:8000`
- `VLLM_PORT` – default: `8000`
- `SERVED_MODEL_NAME` – default: `llama-3.2-3b-instruct`
- `TEMPERATURE` – default: `0.2`
- `MAX_TOKENS` – default: `512`

---

## Step 4 – Handler Contract

- **RunPod handler pattern**: `runpod.serverless.start({"handler": handler})` in `handler.py`.
- **Input shape** (to the RunPod endpoint):

```json
{
  "input": {
    "message": "What are your main skills?"
  }
}
```

- **Prompting inside the container**:
  - Load `context.json` once at startup and compact it to a dense JSON string.
  - **System message**: describes the assistant’s behavior and embeds the JSON.
  - **User message**: the `message` string from the request.
  - Call vLLM with:
    - `model = SERVED_MODEL_NAME`
    - `messages = [system, user]`
    - `temperature = TEMPERATURE`
    - `top_p = TOP_P` (default `0.95` in `handler.py`)
    - `max_tokens = MAX_TOKENS`

- **Response shape** (from the RunPod endpoint):

```json
{
  "response": "Short, dense, concise answer about you."
}
```

---

## Step 5 – Local Testing

You **skipped local testing** (no GPU available). All validation will be done on RunPod after deployment.

If needed later, you can:

- Mount a dummy model directory to `/runpod-volume/model`.
- Run the same container with CPU or a GPU machine to smoke‑test the HTTP contract.

---

## Step 6 – Build & Push Image to GHCR

### Prerequisites

- Docker installed and logged in locally.
- `just` installed (already present on your system).
- Environment variable `RUNPOD_GHCR_TOKEN` set to a valid GitHub Container Registry token.

### Image naming

- **Default image**: `ghcr.io/mcmoodoo/runpod-llama-chat:latest`
- Overridable via env:
  - `IMAGE` – default: `ghcr.io/mcmoodoo/runpod-llama-chat`
  - `TAG` – default: `latest`

### Justfile commands (from `runpod/`)

- **Log in to GHCR (included in push)**:
  - Uses `RUNPOD_GHCR_TOKEN`:
    - `just ghcr-login`

- **Build the image**:

```bash
cd runpod
just docker-build
```

This runs:

```bash
docker build -t ghcr.io/mcmoodoo/runpod-llama-chat:latest .
```

- **Build and push to GHCR** (recommended command):

```bash
cd runpod
just docker-push
```

This will:

- Log in to `ghcr.io` with `RUNPOD_GHCR_TOKEN`.
- Build the image.
- Push `ghcr.io/mcmoodoo/runpod-llama-chat:latest`.

You can override the tag, e.g.:

```bash
TAG=v0.1.0 just docker-push
```

Or override both:

```bash
IMAGE=ghcr.io/mcmoodoo/custom-llama-chat TAG=v0.1.0 just docker-push
```

---

## Step 7 – RunPod Serverless Endpoint (runpodctl only)

Once the image is pushed to GHCR, use **runpodctl** only to create the endpoint. The model will be downloaded into the volume on first worker start if not already present.

### 7.1 Configure API key

```bash
runpodctl config --apiKey="$RUNPOD_API_KEY"
```

### 7.2 (If image is private) Add GHCR registry auth

So RunPod can pull `ghcr.io/mcmoodoo/runpod-llama-chat:latest`:

```bash
runpodctl registry create \
  --name ghcr-mcmoodoo \
  --username YOUR_GITHUB_USERNAME \
  --password "$RUNPOD_GHCR_TOKEN"
```

Use the same GitHub username that can pull the image. RunPod will use this when the template specifies a `ghcr.io` image.

### 7.3 Look up IDs

- **Data center** (for volume `llama3-model` and endpoint):  
  `runpodctl datacenter list --output=table`  
  Find the ID for `US-MO-2` (e.g. use it in `--data-center-ids`).

- **GPU type**:  
  `runpodctl gpu list --output=table`  
  Find the GPU id for the SKU you want (e.g. RTX 5090).

### 7.4 Create a serverless template

Template = image + entrypoint + env + volume mount. Use your HF token for gated LLaMA:

```bash
runpodctl template create \
  --name runpod-llama-chat \
  --image ghcr.io/mcmoodoo/runpod-llama-chat:latest \
  --serverless \
  --docker-start-cmd "/app/start.sh" \
  --container-disk-in-gb 20 \
  --volume-mount-path /runpod-volume \
  --env '{"HF_TOKEN":"YOUR_HF_TOKEN","MODEL_DIR":"/runpod-volume/model","MODEL_ID":"meta-llama/Llama-3.2-3B-Instruct"}'
```

Note the returned **template id** (e.g. from `runpodctl template list` if not printed).

- **Existing network volume**: The template defines the mount path. To attach your **existing** volume (ID `4lqjmp64p7`) instead of a new one, you may need to set that when creating the endpoint (if runpodctl supports it) or in the RunPod UI once. Check `runpodctl serverless create --help` and RunPod docs for “attach network volume to endpoint”.

### 7.5 Create the serverless endpoint

Use the template id from 7.4 and the IDs from 7.3:

```bash
runpodctl serverless create \
  --name llama-chat-endpoint \
  --template-id TEMPLATE_ID \
  --gpu-id GPU_TYPE_ID \
  --data-center-ids US_MO_2_DATACENTER_ID \
  --workers-min 0 \
  --workers-max 3 \
  --gpu-count 1
```

Replace `TEMPLATE_ID`, `GPU_TYPE_ID`, and `US_MO_2_DATACENTER_ID` with the actual values.

### 7.6 Inspect and get the endpoint URL

```bash
runpodctl serverless list --output=table
runpodctl serverless get ENDPOINT_ID
```

Use the endpoint’s HTTP URL to send requests (see Step 8).

### Reference (same config as before)

| Item | Value |
|------|--------|
| Image | `ghcr.io/mcmoodoo/runpod-llama-chat:latest` |
| Entrypoint / Command | `/app/start.sh` |
| Data center | `US-MO-2` (volume `llama3-model`) |
| Network volume | ID `4lqjmp64p7`, mount `/runpod-volume` |
| Env (optional) | `CONTEXT_JSON_PATH`, `MODEL_DIR`, `MODEL_ID`, `HF_TOKEN`, `VLLM_API_URL`, `SERVED_MODEL_NAME`, `TEMPERATURE`, `MAX_TOKENS` |

---

## Step 8 – Using the Endpoint

Once the endpoint is running:

1. **Update `context.json` in the image** to contain your real, dense, structured profile (then rebuild & push if you change it).
2. **Set `HF_TOKEN`** in the endpoint if using the default gated model (`meta-llama/Llama-3.2-3B-Instruct`). The model is downloaded into the volume on first worker start.
3. **Call the endpoint** with:

```json
{
  "input": {
    "message": "What is your background and main area of expertise?"
  }
}
```

4. **Expect a response**:

```json
{
  "response": "Short, dense description of your background and expertise."
}
```

You can iterate on:

- The JSON structure in `context.json`.
- Prompt wording in `handler.py` (system message).
- vLLM parameters (`TEMPERATURE`, `MAX_TOKENS`, etc.).

## My log book

- uploading to ghcr takes forever. The image is at 20Gb. Better uploaded from an EC2 instance. Will need to spin up one with terraform.
  - docker and nix installed
