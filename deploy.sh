#!/bin/bash
echo "🚀 BYTEFORCE V6.1 — Netlify 배포"
echo "================================="
echo ""

# 1. 의존성 설치
echo "📦 패키지 설치 중..."
npm install

# 2. 빌드
echo "🔨 빌드 중..."
npm run build

# 3. Netlify CLI 설치 (없으면)
if ! command -v netlify &> /dev/null; then
    echo "📡 Netlify CLI 설치 중..."
    npm install -g netlify-cli
fi

# 4. 로그인 확인
echo ""
echo "⚠️  Netlify 로그인이 필요합니다."
echo "   브라우저가 열리면 로그인해주세요."
echo ""
netlify login

# 5. 사이트 연결 (최초 1회)
echo ""
echo "🔗 사이트 연결..."
netlify init

# 6. 환경변수 설정
echo ""
echo "🔑 API 키 설정"
echo "   Anthropic API 키를 입력하세요:"
read -p "   ANTHROPIC_API_KEY: " API_KEY
netlify env:set ANTHROPIC_API_KEY "$API_KEY"

# 7. 배포!
echo ""
echo "🚀 배포 중..."
netlify deploy --prod --dir=dist --functions=netlify/functions

echo ""
echo "✅ 배포 완료!"
echo "   도메인 설정: netlify 대시보드 → Domain settings → byteforce.ai.kr"
