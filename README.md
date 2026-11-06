# Jay — Portfolio

HTML + CSS + JavaScript만 사용하는 정적 포트폴리오입니다. 설치나 빌드가 필요 없습니다.

## 로컬 확인
index.html을 더블클릭해 브라우저에서 엽니다. 수정 후 새로고침하면 반영됩니다. Google Fonts는 인터넷 연결이 필요하며 오프라인에서는 기본 폰트를 사용합니다.

## 수정 위치
- index.html: 소개, About, 링크, 프로젝트 카드의 제목과 설명
- projects.js: 상세 창 내용. 카드 data-project와 동일한 id를 사용합니다.
- style.css: 색상, 배치, 모바일 화면, 애니메이션
- script.js: 필터, 상세 창, 모션 토글

카드와 상세 창의 문구는 각각 index.html과 projects.js에서 수정합니다. 현재 프로젝트 4개는 실제 경력이 아닌 데모입니다.

## 배포
Jay 계정에서 Settings → Pages → Source를 GitHub Actions로 지정합니다. main에 push하면 빌드 없이 정적 파일을 배포합니다.
https://jayyy0809.github.io

이전 React 버전은 커밋 b7c779c에 보존되어 있습니다.
