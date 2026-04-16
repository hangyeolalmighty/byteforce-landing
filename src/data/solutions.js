import { T } from "../theme";

export const SOLUTIONS = [
  {
    name: "VibeSec",
    tagline: "바이브코딩 보안 점검",
    desc: "AI 코딩 도구로 만든 서비스의 보안을 사람 엔지니어가 1:1로 점검합니다. 312개 점검 항목, McKinsey급 보고서.",
    url: "https://byteforceai.github.io/vibesec/",
    color: "#0A84FF",
    icon: "\u25c8",
    tags: ["Security", "1:1 Consulting", "312 Checkpoints"],
    status: "LIVE",
    feat: true,
  },
  {
    name: "Heavy Match",
    tagline: "중장비 배차 매칭",
    desc: "건설사와 중장비 업체를 60초 안에 실시간 연결하는 B2B 배차 플랫폼. 6개 역할, 자동 정산.",
    url: "https://heavy-match.vercel.app",
    color: T.green,
    icon: "\u25c6",
    tags: ["B2B", "Realtime", "Next.js"],
    status: "LIVE",
  },
  {
    name: "Vibe Coding Arena",
    tagline: "바이브코딩 아레나",
    desc: "AI와 대화하며 앱을 만드는 바이브코딩 교육 플랫폼. 실전 프로젝트 기반.",
    url: "https://dreamteam.ai.kr",
    color: T.purple,
    icon: "\u25c9",
    tags: ["Education", "AI", "Vibe Coding"],
    status: "COMING SOON",
  },
];
