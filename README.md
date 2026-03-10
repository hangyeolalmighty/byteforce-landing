# BYTEFORCE V6.1

## 빠른 배포 (3단계)

```bash
# 1. 의존성 설치 + 빌드
npm install && npm run build

# 2. Netlify CLI로 배포 (Functions 포함)
npx netlify-cli login
npx netlify-cli deploy --prod --dir=dist --functions=netlify/functions

# 3. API 키 설정 (Netlify 대시보드 또는 CLI)
npx netlify-cli env:set ANTHROPIC_API_KEY "sk-ant-xxxxx"
```

## 또는 자동 스크립트
```bash
./deploy.sh
```

## 도메인 연결 (가비아)
가비아 DNS에 A 레코드 추가:
- 타입: A | 호스트: @ | 값: 75.2.60.5
- 타입: CNAME | 호스트: www | 값: [사이트명].netlify.app.

⚠️ 기존 MX/TXT 레코드(구글 이메일)는 절대 삭제하지 마세요!
