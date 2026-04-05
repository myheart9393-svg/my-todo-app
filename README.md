# 나의 할 일 목록 (Todo App)

바닐라 HTML/CSS/JS로 만든 간단한 할 일 관리 앱입니다.

## 실행 방법

별도의 설치나 빌드 과정 없이 `index.html`을 브라우저에서 바로 열면 됩니다.

## 주요 기능

- **할 일 추가** — 입력창에 텍스트 입력 후 추가 버튼 클릭 또는 Enter 키
- **완료 토글** — 체크박스 클릭으로 완료/미완료 전환
- **항목 삭제** — 각 항목의 × 버튼으로 개별 삭제
- **필터** — 전체 / 진행중 / 완료 항목 필터링
- **일괄 삭제** — 완료된 항목 전체 삭제
- **중복 방지** — 동일한 텍스트(대소문자 무시) 재등록 차단
- **데이터 유지** — LocalStorage에 저장되어 새로고침 후에도 유지

## 파일 구조

```
to-do/
├── index.html   # 페이지 구조
├── style.css    # 스타일 (CSS 커스텀 프로퍼티 기반)
└── main.js      # 앱 로직 (LocalStorage 연동)
```

## 기술 스택

- HTML5
- CSS3 (CSS Custom Properties)
- JavaScript (Vanilla ES6+)
- LocalStorage API
