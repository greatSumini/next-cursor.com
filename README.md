# NextCursor

## Google AdSense 사용법

이 프로젝트는 Google AdSense가 설정되어 있습니다. 클라이언트 ID: `ca-pub-9147324916971040`

### 기본 설정

- AdSense 스크립트는 `src/third-parties/AdSense.tsx`에 위치하며, `layout.tsx`에 자동으로 추가되었습니다.
- 이 설정으로 Google AdSense 크롤러가 사이트를 분석할 수 있습니다.
- **참고**: AdSense 스크립트와 광고는 프로덕션 환경(`NODE_ENV=production`)에서만 로드됩니다.

### 광고 삽입 방법

특정 위치에 광고를 삽입하려면 다음과 같이 사용하세요:

```tsx
import { AdSenseAd } from "@/third-parties/AdSense";

export default function MyPage() {
  return (
    <div>
      <h1>페이지 제목</h1>
      {/* 광고 슬롯 ID를 지정하여 광고 삽입 */}
      <AdSenseAd slot="1234567890" />
      <p>페이지 내용...</p>
    </div>
  );
}
```

자세한 내용은 [Google AdSense 공식 문서](https://support.google.com/adsense/answer/9274025)를 참조하세요.
