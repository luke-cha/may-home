# Mayfleur Home

메이플레르(Mayfleur) 공식 홈페이지입니다. `mayfleur-standalone.html` 목업을 기준으로 React + Vite 기반의 다국어(한국어 / 영어) 사이트로 재구성했습니다.

## 빠른 시작

```bash
npm install
npm run dev      # http://localhost:5174
```

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (`0.0.0.0:5174`, strict port) |
| `npm run build` | 프로덕션 빌드 → `dist/` |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run content` | `contents/` 스캔 후 미디어 매니페스트 재생성 |

`dev`와 `build`는 `pre` 스크립트로 `npm run content`를 자동 실행하므로, 이미지를 추가한 뒤 별도 명령 없이 서버만 재시작하면 반영됩니다.

## 디렉터리 구조

```
.
├── contents/                        # 원본 미디어 (Vite publicDir)
│   ├── 01 Home/ … 08 Contact/       # 메뉴 단위 폴더 트리
├── scripts/
│   └── generate-content-manifest.mjs  # contents/ → JSON 매니페스트 생성
├── src/
│   ├── App.jsx                      # 전체 페이지·라우팅·다국어 로직
│   ├── main.jsx                     # 엔트리 (styles.css → precision.css 순서)
│   ├── styles.css                   # 기본 레이아웃 / 폰트 선언
│   ├── precision.css                # 목업 대조 후 최종 보정 레이어 (가장 마지막 적용)
│   ├── data/content-manifest.json   # 자동 생성물 (직접 수정 금지)
│   └── assets/                      # 로컬 웹폰트, 빈티지 페이퍼 텍스처
├── mayfleur-standalone.html         # 디자인 기준 목업 (수정 금지, 비교 참고용)
└── .github/workflows/deploy.yml     # GitHub Pages 배포
```

## 콘텐츠 관리 방법

이 사이트는 **폴더 트리가 곧 사이트 구조**입니다.

- `contents/02 Shop/<카테고리>/<상품명>/*.jpg` → 샵 상품 카드 및 상세
- `contents/04 Gallery/<그룹>/*` → 갤러리 (이미지 + 영상)
- `contents/05 Portfolio/<프로젝트명>/*` → 포트폴리오 카드 및 상세
- `contents/06 Services/<서비스명>/*` → 서비스 이미지
- `contents/07 Books/*` → 도서 표지

규칙:

- 지원 확장자: `.jpg` `.jpeg` `.png` `.webp` `.mp4` `.mov`
- `.DS_Store`, `Thumbs.db`, 이름에 `_ADMIN_`이 포함된 항목은 자동 제외
- 각 폴더의 **첫 번째 이미지**가 대표(썸네일) 이미지로 사용되므로 파일명 정렬 순서를 고려할 것
- 폴더/파일명은 그대로 URL이 되므로 한글 이름도 그대로 사용 가능 (내부에서 인코딩/디코딩 처리)

## 개발 시 알아둘 점

### 라우팅
외부 라우터 없이 해시 라우팅을 사용합니다. (`#home`, `#shop`, `#shop/<slug>`, `#portfolio/<slug>` 등)
한글 슬러그 대응을 위해 `useRoute()` 내부에서 `decodeURIComponent`를 적용합니다.

### 다국어
`lang` 상태(`'ko' | 'en'`) 하나로 전체 문구를 전환합니다. 새 문구 추가 시 `ko ? '한국어' : 'English'` 패턴을 유지하세요.

### 스타일 레이어
1. `styles.css` — 구조, 그리드, 폰트 페이스
2. `precision.css` — `mayfleur-standalone.html`의 계산된 스타일과 1:1 대조해 맞춘 최종 보정값

**타이포그래피/여백을 조정할 때는 `precision.css`를 수정**하세요. 목업과의 차이를 한곳에서 추적하기 위한 파일입니다.

### 폰트
Google Fonts를 사용하지 않고 `src/assets/fonts/`의 woff2를 로컬 로드합니다.

- 제목: `Cormorant Garamond` → `Source Serif 4` → `serif`
- 본문: `Source Serif 4` → `Georgia` → `serif`
- 한글: `Noto Serif KR`

### 반응형 기준
| 영역 | 데스크톱(≥1101px) | 태블릿(761–1100px) | 모바일(≤760px) |
| --- | --- | --- | --- |
| 갤러리 | 4열 | 3열 | 2열 |
| 홈 셀렉티드 웍스 / 프로젝트 갤러리 | 8열 | 4열 | 2열 |
| 샵 / 포트폴리오 카드 | auto-fill | auto-fill | 2열 |

### 영상
갤러리 영상은 `autoPlay muted loop playsInline`으로 렌더링됩니다. 브라우저 자동재생 정책상 `muted`는 필수입니다.

## 배포 (GitHub Pages)

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 Pages에 배포합니다.

최초 1회 설정:

1. GitHub 저장소 → **Settings → Pages**
2. **Source** 를 **GitHub Actions** 로 변경

배포 URL: `https://luke-cha.github.io/may-home/`

`vite.config.js`의 `base`는 GitHub Actions 환경에서만 `/may-home/`로 설정되고, 로컬에서는 `/`를 사용합니다. 저장소 이름을 바꾸면 이 값도 함께 수정해야 합니다.

> 참고: `contents/`가 약 335MB이므로 빌드 산출물이 큽니다. Pages 사이트 용량 제한(1GB)에는 여유가 있으나 배포에 수 분이 소요될 수 있습니다. 용량을 줄이려면 원본 이미지를 사전 리사이즈/WebP 변환하는 단계를 추가하는 것을 권장합니다.

## 후속 개선 아이디어

- [ ] 이미지 리사이즈 파이프라인 도입 (배포 용량·로딩 속도 개선)
- [ ] 상품/프로젝트 설명 텍스트를 별도 데이터 파일로 분리
- [ ] 문의 폼 실제 전송 연동 (현재는 프런트엔드 상태만 처리)
- [ ] 메타 태그/OG 이미지 및 페이지별 타이틀 설정
