import { T } from "../theme";

export const WH =
  "https://script.google.com/macros/s/AKfycbyaKrotbkM50H5t82FdA6_nOHkWsDJAyOXs1k3RbmSgSoHa72hKxhMeZuS4CR0Qjaij/exec";

export const QO = [
  {
    label: "생성형 AI 활용이 궁금해요",
    icon: "\u25c6",
    color: T.accent,
    followUp: "어떤 업무에 AI를 적용하고 싶으세요?",
  },
  {
    label: "반복 업무를 자동화하고 싶어요",
    icon: "\u25a3",
    color: T.gold,
    followUp: "현재 가장 시간이 많이 드는 반복 업무가 뭐가요?",
  },
  {
    label: "우리 회사에 AI 솔루션이 필요해요",
    icon: "\u25ce",
    color: T.pink,
    followUp: "어떤 분야의 솔루션을 찾고 계세요?",
  },
  {
    label: "홈페이지\u00b7앱을 만들고 싶어요",
    icon: "\u25c8",
    color: T.purple,
    followUp: "어떤 종류를 생각하고 계세요?",
  },
];

export const FO = {
  "생성형 AI 활용이 궁금해요": [
    { label: "고객 상담\u00b7응대", color: T.accent },
    { label: "콘텐츠\u00b7마케팅 제작", color: T.pink },
    { label: "데이터 분석\u00b7리포트", color: T.gold },
    { label: "잘 모르겠어요", color: T.chrome },
  ],
  "반복 업무를 자동화하고 싶어요": [
    { label: "문서\u00b7보고서 자동화", color: T.gold },
    { label: "알림\u00b7모니터링 시스템", color: T.cyan },
    { label: "워크플로우 연결 (n8n/Zapier)", color: T.green },
    { label: "잘 모르겠어요", color: T.chrome },
  ],
  "우리 회사에 AI 솔루션이 필요해요": [
    { label: "AI 챗봇 도입", color: T.pink },
    { label: "CRM\u00b7고객관리 연동", color: T.accent },
    { label: "데이터 대시보드", color: T.purple },
    { label: "잘 모르겠어요", color: T.chrome },
  ],
  "홈페이지\u00b7앱을 만들고 싶어요": [
    { label: "회사 소개 사이트", color: T.accent },
    { label: "쇼핑몰\u00b7예약 시스템", color: T.green },
    { label: "MVP\u00b7프로토타입", color: T.purple },
    { label: "잘 모르겠어요", color: T.chrome },
  ],
};

export const SC = {
  home: "",
  services: "서비스를 살펴보고 계셨군요. 어떤 서비스가 관심 가세요?",
  work: "포트폴리오를 보고 계셨군요. 어떤 프로젝트가 궁금하세요?",
  process: "작업 프로세스를 살펴보셨네요. 궁금한 점이 있으세요?",
  contact: "연락처 페이지를 보셨네요. 바로 상담 시작해볼까요?",
};

export function getGreet() {
  const h = new Date().getHours();
  if (h >= 5 && h < 9) return "좋은 아침이에요.";
  if (h >= 12 && h < 14) return "점심시간이네요.";
  if (h >= 18 && h < 22) return "좋은 저녁이에요.";
  if (h >= 22 || h < 5) return "늦은 시간인데 감사해요.";
  return "안녕하세요.";
}

export async function logWH(q, a) {
  try {
    const n = new Date();
    await fetch(WH, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        date: n.toLocaleDateString("ko-KR"),
        time: n.toLocaleTimeString("ko-KR"),
        question: q,
        answer: a,
      }),
    });
  } catch (e) {}
}
