#!/bin/bash
# 빠른 배포 - API 키를 인자로 전달
# 사용법: ./deploy-quick.sh YOUR_ANTHROPIC_API_KEY

npm install && npm run build
npx netlify-cli deploy --prod --dir=dist --functions=netlify/functions
if [ -n "$1" ]; then
    npx netlify-cli env:set ANTHROPIC_API_KEY "$1"
    echo "✅ API 키 설정 완료. 사이트 재배포 필요."
    npx netlify-cli deploy --prod --dir=dist --functions=netlify/functions
fi
echo "✅ 완료!"
