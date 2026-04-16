// netlify/functions/chat.js
// Claude API 프록시 — SSE 스트리밍 지원
// 환경변수 설정: Netlify Dashboard → Site Settings → Environment Variables → ANTHROPIC_API_KEY

export default async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
  }

  try {
    const body = await req.json();
    const wantStream = body.stream === true;

    const anthropicBody = {
      model: body.model || "claude-sonnet-4-20250514",
      max_tokens: body.max_tokens || 1000,
      system: body.system || "",
      messages: body.messages || [],
    };

    if (wantStream) {
      anthropicBody.stream = true;

      const upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(anthropicBody),
      });

      if (!upstream.ok) {
        const errText = await upstream.text();
        return new Response(JSON.stringify({ error: "Upstream error", detail: errText }), {
          status: upstream.status,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Pipe the SSE stream directly from Anthropic to the client
      return new Response(upstream.body, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Non-streaming fallback (kept for compatibility)
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(anthropicBody),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy error" }), { status: 500 });
  }
};

export const config = {
  path: "/api/chat",
};
