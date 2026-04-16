import { T } from "../theme";

export const CATS = ["All", "AI", "Automation", "Platform", "Campaign", "Education"];

export const SVC = [
  {
    name: "Generative AI",
    kr: "생성형 AI 컨설팅",
    color: T.accent,
    icon: "\u25c6",
    desc: "Claude \u00b7 GPT \u00b7 Gemini \u00b7 Grok \u2014 업종별 최적 AI 선정부터 실무 적용까지",
  },
  {
    name: "AI Automation",
    kr: "AI 업무 자동화",
    color: T.gold,
    icon: "\u25a3",
    desc: "n8n \u00b7 Zapier \u00b7 Make \u00b7 커스텀 \u2014 반복 업무 제거, 비용 절감",
  },
  {
    name: "AI Solutions",
    kr: "기업 AI 솔루션",
    color: T.pink,
    icon: "\u25ce",
    desc: "AI 챗봇 \u00b7 CRM 연동 \u00b7 데이터 분석 대시보드 \u00b7 고객 응대 자동화",
  },
  {
    name: "Vibe Coding",
    kr: "웹\u00b7앱\u00b7MVP 개발",
    color: T.purple,
    icon: "\u25c8",
    desc: "대화로 설계하고 AI로 구현 \u2014 랜딩페이지부터 풀스택 앱까지",
  },
  {
    name: "Multilingual",
    kr: "다국어 서비스",
    color: T.cyan,
    icon: "\u25c9",
    desc: "KR \u00b7 EN \u00b7 JP \u00b7 RU \u2014 4개국어 현지화 대응",
  },
];

export const catColors = {
  All: T.chrome,
  AI: T.accent,
  Automation: T.gold,
  Platform: T.purple,
  Campaign: T.pink,
  Education: T.cyan,
};
