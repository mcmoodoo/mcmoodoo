use axum::{
    http::StatusCode,
    routing::post,
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[derive(Deserialize)]
struct AskRequest {
    question: String,
}

#[derive(Serialize)]
struct AskResponse {
    answer: String,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: String,
}

#[tokio::main]
async fn main() {
    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "3000".into())
        .parse()
        .expect("invalid PORT");
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    let app = Router::new().route("/ask", post(handle_ask));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    println!("Server running on {}", addr);
    axum::serve(listener, app).await.unwrap();
}

async fn handle_ask(Json(payload): Json<AskRequest>) -> Result<Json<AskResponse>, (StatusCode, Json<ErrorResponse>)> {
    let api_key = std::env::var("OPENAI_API_KEY").map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse {
                error: "OPENAI_API_KEY environment variable is not set".into(),
            }),
        )
    })?;

    let context = include_str!("../personal-context.json");
    let prompt = format!("Answer based ONLY on this data:\n{}\nUser: {}", context, payload.question);

    let client = reqwest::Client::new();
    let http_resp = client
        .post("https://api.openai.com/v1/chat/completions")
        .bearer_auth(api_key)
        .json(&serde_json::json!({
            "model": "gpt-4-0613",
            "messages": [{ "role": "user", "content": prompt }],
            "max_tokens": 500
        }))
        .send()
        .await
        .map_err(|e| {
            (
                StatusCode::BAD_GATEWAY,
                Json(ErrorResponse {
                    error: format!("Request to OpenAI failed: {}", e),
                }),
            )
        })?;

    let status = http_resp.status();
    let resp: serde_json::Value = http_resp.json().await.map_err(|e| {
        (
            StatusCode::BAD_GATEWAY,
            Json(ErrorResponse {
                error: format!("Failed to parse OpenAI response: {}", e),
            }),
        )
    })?;

    if !status.is_success() {
        let msg = resp["error"]["message"]
            .as_str()
            .unwrap_or("Unknown API error");
        return Err((
            StatusCode::BAD_GATEWAY,
            Json(ErrorResponse {
                error: format!("OpenAI API error: {}", msg),
            }),
        ));
    }

    let answer = resp["choices"][0]["message"]["content"]
        .as_str()
        .unwrap_or("")
        .to_string();
    Ok(Json(AskResponse { answer }))
}
