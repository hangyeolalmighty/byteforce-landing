import React, { useState, useEffect, useRef } from "react";
import { T, mob } from "../theme";
import { MetalBtn } from "../components/MetalBtn";
import { Steel } from "../components/Steel";
import { Type } from "../components/Type";
import { QB } from "./QuickButton";
import { QO, FO, SC, WH, getGreet, logWH } from "../data/chat-config";

export function AIChat({ admin = false, currentSection = "home" }) {
  const im = `${getGreet()} BYTEFORCE AI입니다.\n무엇이든 물어보세요.`;
  const [msgs, sM] = useState([{ r: "ai", t: im }]);
  const [input, sI] = useState("");
  const [ld, sL] = useState(false);
  const [logs, sLg] = useState([]);
  const [showL, sSL] = useState(false);
  const [qp, sQP] = useState("initial");
  const [st, sST] = useState(null);
  const [ps, sPS] = useState("home");
  const end = useRef(null);

  useEffect(() => {
    if (currentSection !== ps && currentSection !== "ai") {
      const ctx = SC[currentSection];
      if (ctx && msgs.length <= 2) sM((p) => [...p, { r: "ai", t: ctx }]);
      sPS(currentSection);
    }
  }, [currentSection]);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("bf-logs");
        if (r) sLg(JSON.parse(r.value));
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const save = async (c) => {
    try {
      const n = { id: Date.now(), d: new Date().toISOString(), m: c };
      const u = [n, ...logs].slice(0, 50);
      await window.storage.set("bf-logs", JSON.stringify(u));
      sLg(u);
    } catch (e) {}
  };

  const callAI = async (q, ctx = "") => {
    sL(true);
    try {
      const sp = `BYTEFORCE AI 에이전트. CEO 이한결(32년IT, 서울연구원AI자문, Ex-Nexon). 서비스: 생성형AI컨설팅(Claude/GPT/Gemini/Grok)/AI업무자동화(n8n,Zapier)/기업AI솔루션(챗봇,CRM,데이터)/웹앱MVP개발(바이브코딩)/다국어(KR,EN,JP,RU). 부산해운대오션타워608. ceo@byteforce.ai.kr / 010-9741-9217. 3문장이내 간결 전문적. 구체적 상담은 직접 연락 유도.${ctx ? "\n고객 관심 분야: " + ctx : ""}`;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: sp,
          messages: [{ role: "user", content: q }],
        }),
      });
      const d = await res.json();
      return d.content?.map((c) => c.text || "").join("") || "응답 오류";
    } catch (e) {
      return "연결 오류. ceo@byteforce.ai.kr로 문의 주세요.";
    } finally {
      sL(false);
    }
  };

  const hQS = async (o) => {
    const nm = [...msgs, { r: "user", t: o.label }];
    sM(nm);
    sST(o.label);
    if (o.followUp) {
      setTimeout(() => {
        sM((p) => [...p, { r: "ai", t: o.followUp }]);
        sQP("follow");
      }, 400);
    } else {
      sQP("done");
      setTimeout(() => {
        sM((p) => [
          ...p,
          { r: "ai", t: "어떤 내용이 궁금하신가요? 자유롭게 입력해주세요." },
        ]);
      }, 400);
    }
  };

  const hFS = async (o) => {
    const nm = [...msgs, { r: "user", t: o.label }];
    sM(nm);
    sQP("done");
    const ctx = `${st} > ${o.label}`;
    const rp = await callAI(
      `고객이 "${st}"에 관심이 있고 구체적으로 "${o.label}"을 원합니다. BYTEFORCE가 어떻게 도울 수 있는지 간결하게 안내하고, 직접 연락하도록 유도하세요.`,
      ctx,
    );
    const fm = [...nm, { r: "ai", t: rp }];
    sM(fm);
    await save(fm.slice(1));
    await logWH(ctx, rp);
  };

  const send = async () => {
    if (!input.trim() || ld) return;
    const q = input.trim();
    sI("");
    const nm = [...msgs, { r: "user", t: q }];
    sM(nm);
    sQP("done");
    const ctx = st ? `관심분야: ${st}` : "";
    const rp = await callAI(q, ctx);
    const fm = [...nm, { r: "ai", t: rp }];
    sM(fm);
    await save(fm.slice(1));
    await logWH(q, rp);
  };

  // === Admin logs view ===
  if (admin && showL)
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: "12px 16px",
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              color: T.sub,
              letterSpacing: 2,
            }}
          >
            LOGS\u00b7{logs.length}
          </span>
          <MetalBtn size="sm" onClick={() => sSL(false)}>
            BACK
          </MetalBtn>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: 12 }}>
          {logs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: T.mute,
                fontSize: 12,
              }}
            >
              상담 내역 없음
            </div>
          ) : (
            logs.map((l) => (
              <Steel key={l.id} style={{ marginBottom: 8, padding: "12px" }}>
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 8,
                    color: T.mute,
                    marginBottom: 6,
                  }}
                >
                  {new Date(l.d).toLocaleString("ko-KR")}
                </div>
                {l.m.map((m, j) => (
                  <div
                    key={j}
                    style={{
                      fontSize: 11,
                      color: m.r === "user" ? T.text : T.sub,
                      marginBottom: 3,
                      paddingLeft: m.r === "ai" ? 10 : 0,
                      borderLeft:
                        m.r === "ai" ? `2px solid ${T.border}` : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: T.mono,
                        fontSize: 8,
                        color: T.mute,
                        marginRight: 6,
                      }}
                    >
                      {m.r === "user" ? "Q" : "A"}
                    </span>
                    {m.t}
                  </div>
                ))}
              </Steel>
            ))
          )}
        </div>
      </div>
    );

  // === Main chat view ===
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {admin && (
        <div
          style={{
            padding: "8px 14px",
            borderBottom: `1px solid ${T.border}`,
            textAlign: "right",
          }}
        >
          <MetalBtn size="sm" color={T.pink} onClick={() => sSL(true)}>
            LOGS\u00b7{logs.length}
          </MetalBtn>
        </div>
      )}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.r === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius:
                m.r === "user"
                  ? "10px 10px 2px 10px"
                  : "10px 10px 10px 2px",
              background: m.r === "user" ? T.surfaceHi : T.surface,
              border: `1px solid ${m.r === "user" ? T.borderHi : T.border}`,
              fontSize: 12,
              color: m.r === "user" ? T.text : T.sub,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              animation:
                i === msgs.length - 1 ? "msgIn .3s ease" : "none",
            }}
          >
            {i === msgs.length - 1 && m.r === "ai" && i > 0 ? (
              <Type text={m.t} speed={15} />
            ) : (
              m.t
            )}
          </div>
        ))}
        {qp === "initial" && !ld && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginTop: 4,
            }}
          >
            {QO.map((o, i) => (
              <QB
                key={i}
                label={o.label}
                icon={o.icon}
                color={o.color}
                onClick={() => hQS(o)}
              />
            ))}
          </div>
        )}
        {qp === "follow" && st && FO[st] && !ld && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginTop: 4,
            }}
          >
            {FO[st].map((o, i) => (
              <QB
                key={i}
                label={o.label}
                color={o.color}
                onClick={() => hFS(o)}
              />
            ))}
          </div>
        )}
        {ld && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "12px 16px",
              borderRadius: 10,
              background: T.surface,
              border: `1px solid ${T.border}`,
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: T.metalGrad,
                    animation: `dotPulse 1.2s ease ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={end} />
      </div>
      <div
        style={{
          padding: "12px 14px",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          gap: 8,
          background: T.panel,
        }}
      >
        <input
          value={input}
          onChange={(e) => sI(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="무엇이든 물어보세요..."
          style={{
            flex: 1,
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 6,
            padding: "10px 14px",
            color: T.text,
            fontSize: 12,
            fontFamily: T.font,
            outline: "none",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,.1)",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "rgba(255,255,255,.15)")
          }
          onBlur={(e) => (e.target.style.borderColor = T.border)}
        />
        <MetalBtn onClick={send} disabled={ld} style={{ minWidth: 65 }}>
          SEND
        </MetalBtn>
      </div>
    </div>
  );
}
