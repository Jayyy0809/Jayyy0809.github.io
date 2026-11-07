# 프로젝트 콘텐츠 관리 기준

설치·빌드 없이 편집하고 HTML을 열어 확인합니다. 프로젝트 정보의 원본은 각 폴더의 `project.js`입니다.

## 폴더 구조

```text
index.html                  언어 선택 진입점
ko/index.html               한국어 화면·정적 카드 기본 마크업
en/index.html               영어 화면·정적 카드 기본 마크업
site-config.js              기본 언어 설정
theme.css                   강조색·아웃라인·도트 색상
style.css                   레이아웃·기본 스타일
projects.js                 프로젝트 목록 초기화
projects/
  orbit/
    project.js              이 프로젝트의 정보·번역·이미지 목록
    images/
      cover.webp            카드 및 상세 상단 대표 이미지
      detail-01.webp        상세 이미지 1
      detail-02.webp        상세 이미지 2
  form/                     같은 구조
  field/
  parallel/
docs/CONTENT_GUIDE.md        이 문서
```

현재 이미지 폴더는 비어 있고 `cover: null`, `gallery: []`입니다. 실제 이미지가 준비되기 전에는 기존 CSS 콘셉트 아트워크가 표시됩니다. 아래 예시 파일명만 입력하면 이미지가 자동 생성되는 것은 아닙니다.

## 이름·이미지 규칙

- 폴더 ID는 영문 소문자·숫자·하이픈: `my-project`. 공백·한글은 사용하지 않습니다.
- ID는 폴더명, `project.js`의 `id`, 두 HTML의 `data-project`가 일치해야 합니다.
- 대표 이미지는 `images/cover.webp`, 상세는 `images/detail-01.webp`부터 두 자리 번호를 씁니다. 배열 순서가 표시 순서입니다.
- WebP 권장, 사진은 JPG, 투명 이미지·정교한 UI는 PNG도 가능합니다. 확장자를 바꾸면 데이터 경로도 수정합니다.
- 대표 이미지는 가로형 1600×1000px 권장. 카드는 `object-fit: cover`로 일부가 잘릴 수 있으므로 중요한 내용은 중앙에 배치합니다. 상세에서는 원본 비율로 표시합니다.
- 상세 이미지는 가로 1600~2000px 권장. 이미지당 500KB 전후를 목표로 압축하고, 글자가 읽히는지 확인합니다. 업로드 전 불필요하게 큰 원본은 줄입니다.
- 각 이미지에 한국어·영어 대체 텍스트를 작성합니다. 이미지 내용이나 전달하는 정보를 설명합니다.
- 기존 파일을 교체할 때는 같은 이름을 써도 됩니다. 방문자 캐시가 남는 경우 새 파일명을 쓰고 `src`도 함께 바꿉니다.

## 기존 프로젝트 수정

1. `projects/orbit/project.js`를 엽니다.
2. `title`, `subtitle`, `description`, `category`는 영어, `ko` 안의 항목은 한국어입니다. 한국어 제목을 별도로 쓰려면 `ko.title`을 추가합니다.
3. 해당 프로젝트의 `images/` 폴더에 이미지를 넣습니다.
4. `cover`와 `gallery`를 아래 형식으로 작성합니다. 경로는 해당 프로젝트 폴더 기준입니다.

```js
"cover": {
  "src": "images/cover.webp",
  "alt": { "ko": "Orbit 앱의 메인 화면", "en": "Orbit app home screen" }
},
"gallery": [
  {
    "src": "images/detail-01.webp",
    "alt": { "ko": "앱 탐색 구조를 정리한 다이어그램", "en": "App navigation structure diagram" },
    "caption": { "ko": "주요 탐색 흐름", "en": "Core navigation flow" }
  }
]
```

카드와 상세 창 모두 이 파일의 문구로 갱신됩니다. JS가 꺼진 상태에서도 최신 문구를 보여주려면 `ko/index.html`과 `en/index.html`의 카드 문구도 함께 맞춥니다. 없는 이미지 경로를 입력하면 대표 이미지는 CSS 아트워크를 유지하고, 상세 이미지는 표시하지 않습니다. 잘못된 경로가 없는지 반드시 확인합니다.

## 프로젝트 추가·삭제

1. 기존 프로젝트 폴더 하나를 복사해 새 ID로 바꿉니다. `project.js`의 `id`도 변경합니다. `theme`은 현재 지원하는 `orbit`, `form`, `field`, `parallel` 중 하나를 유지하거나 새 CSS를 만듭니다.
2. 두 언어 HTML에서 `projects.js` 뒤, `script.js` 앞에 `<script src="../projects/my-project/project.js"></script>`를 추가합니다. 삭제할 때는 해당 태그를 제거합니다.
3. 두 HTML의 `.grid` 안에 기존 프로젝트 버튼을 복사하고 `data-project="my-project"`로 맞춥니다. 삭제할 때는 해당 버튼을 제거합니다. HTML 카드 순서가 화면 순서입니다.
4. 두 HTML의 총 개수·상단 번호·전체 필터 숫자를 새 프로젝트 수에 맞춥니다. 카테고리를 추가하면 필터의 `data-category`도 영어 `category`와 일치하도록 추가합니다. 한국어 표시명은 자유롭게 번역합니다.

새 프로젝트마다 스크립트 1개와 카드 1개씩 두 HTML에 등록하는 명시적 구조입니다. 자동 파일 검색·빌드·서버에 의존하지 않습니다.

## 테마·인터랙션

`theme.css`의 `:root`에서 수정합니다.

| 변수 | 용도 |
| --- | --- |
| `--accent` | 선택된 필터·장식·기본 카드 강조색 |
| `--card-outline` | 카드 호버·키보드 포커스·누르는 중의 외곽선 |
| `--card-glow` | 카드 주변의 은은한 빛 |
| `--focus-color` | 일반 링크·버튼의 키보드 포커스 |
| `--dot-rgb` | 도트 RGB 값. `169, 190, 178`처럼 쉼표로 구분 |

카드는 터치로 누를 때도 강조됩니다. 클릭·터치 파동은 도트를 방사형으로 밀어내고 밝게 하며 약 1.2초 후 사라집니다. 연속 파동은 최대 6개입니다. 터치 스크롤을 막지 않으며, Motion 꺼짐·OS 동작 줄이기에서는 도트 효과를 모두 중지합니다. 마우스 근접 반응은 정밀 포인터 기기에서만 실행합니다.

## 수정 후 확인

- 두 언어 HTML을 직접 열어 카드·상세 설명·이미지·캡션을 확인합니다.
- 필터, 키보드 Tab·Enter·Escape, 모바일 폭과 터치, Motion 끄기를 확인합니다.
- 코드와 이미지를 함께 커밋·push합니다. Actions의 배포 성공 후 공개 페이지를 확인합니다.
- 현재 데모 프로젝트와 예시 경력 문구는 실제 작업으로 교체한 뒤 최종 포트폴리오로 사용합니다.
