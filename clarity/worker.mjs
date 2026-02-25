import context from "./personal-context.json";

const contextString = JSON.stringify(context);

function jsonResponse(body, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");

  return new Response(JSON.stringify(body), {
    ...init,
    headers,
  });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
        },
      });
    }

    const url = new URL(request.url);

    if (url.pathname !== "/ask") {
      return jsonResponse({ error: "Not found" }, { status: 404 });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, { status: 405 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse(
        { error: "Invalid JSON body; expected { \"question\": string }" },
        { status: 400 },
      );
    }

    const question = payload && typeof payload.question === "string" ? payload.question : null;
    if (!question) {
      return jsonResponse(
        { error: "Missing or invalid 'question' field in request body" },
        { status: 400 },
      );
    }

    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      return jsonResponse(
        { error: "OPENAI_API_KEY environment variable is not set" },
        { status: 500 },
      );
    }

    const prompt = `Answer based ONLY on this data:\n${contextString}\nUser: ${question}`;

    let openaiResp;
    try {
      openaiResp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4-0613",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
        }),
      });
    } catch (e) {
      return jsonResponse(
        { error: `Request to OpenAI failed: ${String(e)}` },
        { status: 502 },
      );
    }

    let data;
    try {
      data = await openaiResp.json();
    } catch (e) {
      return jsonResponse(
        { error: `Failed to parse OpenAI response: ${String(e)}` },
        { status: 502 },
      );
    }

    if (!openaiResp.ok) {
      const msg =
        (data &&
          data.error &&
          (data.error.message || data.error.code || data.error.type)) ||
        "Unknown API error";

      return jsonResponse(
        { error: `OpenAI API error: ${msg}` },
        { status: 502 },
      );
    }

    const answer =
      data &&
      Array.isArray(data.choices) &&
      data.choices[0] &&
      data.choices[0].message &&
      typeof data.choices[0].message.content === "string"
        ? data.choices[0].message.content
        : "";

    return jsonResponse({ answer });
  },
};

