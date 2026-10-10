/*
 * 이미지 교체는 이 파일에서만 합니다.
 * null을 "assets/파일이름.png" 형태의 경로로 바꾸면 해당 위치에 표시됩니다.
 * index.html, styles.css, app.js는 수정하지 않아도 됩니다.
 */
window.CASE_ASSETS = Object.freeze({
  scene: {
    background: null
  },
  case017: {
    folderCover: "assets/folder-cover-temp.png",
    document: "assets/record-shadow.png",
    privateDocument: "assets/record-private.png",
    idCard: "assets/id-front-shadow.png",
    idCardBack: "assets/id-back-shadow.png",
    portrait: null,
    notes: "assets/evidence-photo.png",
    pen: "assets/pen-transparent.png"
  }
});

// 선택 사항: 공개 배포 주소 또는 같은 Wi-Fi에서 접근할 PC 주소를 넣습니다.
// 비워 두면 접속 중인 HTTP/HTTPS 주소로 QR을 자동 생성합니다.
window.MOBILE_SHARE_URL = "";
