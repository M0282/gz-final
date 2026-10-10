gz_final · 기록 조사실 · 원목 책상 / 5개 파일 / 로즈 조명 / 포스트잇 QR

실행
1. 압축을 새 폴더에 풀고 index.html을 엽니다.
2. 어두운 원목 책상 위에 파일 5개가 놓여 있습니다. PC는 PAGE1 시안처럼 크게 엇갈려 겹치며, 모바일은 두 열을 바탕으로 높이와 각도를 조정했습니다.
3. CASE 017을 클릭하면 조명이 밝아지고 증거사진 → 포스트잇 → 학생증 → 커피 → 펜 순서로 등장합니다.
4. 문서 / 학생증 / 메모를 누르면 확대됩니다. 확대된 학생증은 한 번 더 누르면 앞뒤가 바뀝니다.
5. '파일 선택으로' 또는 ESC를 누르면 커피컵과 내용이 사라지고 어두운 파일 선택 화면으로 돌아갑니다.
6. CASE 013 / 015 / 021은 非公開ファイル이며 PRIVATED 배경을 보여줍니다. 맨 오른쪽 프로젝트 기획서는 클릭 즉시 2번 페이지를 표시합니다. 페이지 클릭 또는 다음 버튼으로 2~7번을 순환 열람합니다. 이전 버튼과 키보드 방향키도 지원합니다. 닫은 뒤 다시 열면 2번부터 시작합니다.

이번 수정 (2026-10-10)
- 기획서 뒤집기 중 생기던 스크롤바 제거: 회전 이미지가 페이지 영역 바깥의 스크롤 크기에 영향을 주지 않도록 처리했습니다.
- 4번 파일을 맨 뒤로 이동. 3번 제목 WEEプロジェクト, 5번 제목 プロジェクト企画書 적용. 기획서와 학생증에 약 0.68초의 입체 뒤집기 모션 추가. 연속 클릭은 모션이 끝날 때까지 무시하며 닫으면 진행 중 모션을 취소합니다. 동작 줄이기 설정에서는 즉시 전환합니다.
- TARGET 001 / WEE Project / 非公開ファイル 제목 적용. 프로젝트 기획서 표지와 6장 뷰어 추가. 캐릭터 머리를 가리지 않도록 펜을 위로 이동했습니다.
- PAGE1 시안 반영: 첫 화면 파일 크기를 키우고 높이·각도·겹침 순서를 조정했습니다. 증거사진은 '목격사진 변경.png', 연락처 포스트잇은 '금주사인.png' 원본 이미지로 교체했습니다. 기존 필기체 텍스트는 제거했습니다.
- 최종 위치 보정: 포스트잇을 참고 이미지처럼 문서 오른쪽 가장자리에 가깝게 이동했습니다. 커피는 CASE 017에서만 표시하며, 펜은 증거사진보다 위에 놓입니다.
- 원형 조명에 multiply 혼합과 blur(22px)를 적용하고 열린 책상 밝기/채도를 낮춰 차분하게 조정했습니다. 블러는 조명 레이어에 적용하므로 문서 자체는 흐려지지 않습니다.
- 학생증/문서/메모 확대창과 QR 창의 흰 패널을 제거했습니다. 원래 책상은 배경으로 유지하며 확대창 뒤에만 어두운 필터와 12px 블러(작은 화면 9px)를 적용합니다.
- 확대창 제목, 앞뒤 전환 안내, 닫기 안내와 QR 창 안내를 흰색 영문·일문으로 변경했습니다. 원본 학생증/문서에 인쇄된 내용은 그대로입니다.
- 확대창의 빈 영역 또는 ESC로 닫으면 열람 중이던 책상으로 돌아갑니다.
- 맨 뒤 종이를 약 -15도로 기울이고, 주 문서 뒤에 보조 종이 두 장을 겹쳤습니다.
- 열린 파일철은 주 문서보다 조금 크게 확대하고 모든 문서/오브제 아래에 놓았습니다.
- 커피는 받침 없는 흰 머그컵 + 아메리카노로 교체했습니다. 손잡이는 동북쪽 약 40도이며 문서 오른쪽 위 가장자리에 살짝 겹칩니다.
- QR은 커피에서 분리해 문서 오른쪽의 포스트잇으로 옮겼습니다. 포스트잇을 누르면 큰 QR/주소 설정을 엽니다.
- 문서와 학생증 앞뒤는 제공된 그림자 포함 이미지로 교체하고 해당 오브젝트의 CSS 그림자를 제거했습니다. 학생증 모서리는 원본 이미지 그대로 표시합니다.
- 증거사진은 제공된 목격사진 이미지로 교체했습니다. 확대 제목은 EVIDENCE PHOTO · 証拠写真입니다.
- 문서 중심의 원형 스포트라이트만 밝고 바깥쪽 책상과 오브제는 어둡게 표현합니다.
- QR 포스트잇을 커피 오른쪽 아래로 옮겨 겹침을 없앴습니다. 문구는 スマートフォンで開く ↗ 입니다.
- 파란 조명과 조명 전환 스위치를 제거했습니다.
- 로즈 조명은 어두운 초기 화면 → 파일 선택 시 밝아짐 → 복귀 시 다시 어두워짐 흐름입니다.
- PC는 전체 구도를 창에 맞추고, 모바일은 세로 배치 및 필요한 경우 스크롤을 사용합니다.
- 기존 펜 모션, 상표 가림, 문서 확대, 학생증 앞뒤 전환은 유지합니다.
- 운영체제 동작 줄이기 설정에서는 모션 대신 최종 상태를 표시합니다.

휴대폰 연결 (배포 없이, 같은 Wi-Fi)
1. 압축을 푼 폴더에서 PowerShell을 엽니다.
2. 다음 명령을 실행합니다.
   py -m http.server 8000 --bind 0.0.0.0
   Serving HTTP ... 표시 후 계속 대기하는 것이 정상입니다. 서버 창을 켜 둡니다.
3. 별도 PowerShell에서 ipconfig를 실행하여 현재 사용 중인 Wi-Fi/이더넷 IPv4 주소를 확인합니다.
4. PC 브라우저에서도 http://PC의IPv4주소:8000/ 으로 접속합니다.
   예: http://192.168.0.10:8000/
5. QR 포스트잇을 누르고 휴대폰 카메라로 큰 QR을 스캔합니다.
6. 휴대폰을 PC와 같은 네트워크에 연결해야 합니다. 접속이 안 되면 Windows 방화벽의 Python 개인 네트워크 허용을 확인합니다.

QR 주소
- 일반 HTTP/HTTPS 주소로 열면 그 주소를 QR로 생성합니다.
- file://, localhost, 127.0.0.1, 0.0.0.0은 휴대폰 연결 주소가 아니므로 QR 대신 설정 안내를 표시합니다.
- 그 경우 QR 포스트잇 > 연결 주소 설정에 PC의 IPv4 주소 또는 배포 주소를 입력하세요.
- 입력한 주소는 이 브라우저에 저장됩니다. '현재 주소 사용'으로 초기화합니다.
- 배포 뒤에는 배포 주소에서 열면 자동 생성됩니다.
- 모든 방문자에게 동일한 주소를 강제하려면 assets/case-assets.js 맨 아래의 window.MOBILE_SHARE_URL을 수정하세요.
- 로컬 QR 생성기를 포함하므로 외부 QR 서비스나 CDN 연결 없이 작동합니다.
- 한글 경로는 URL 표준의 퍼센트 인코딩으로 QR에 반영됩니다.
- 페이지가 실제로 배포되어 있거나 로컬 서버가 켜져 있어야 연결됩니다. QR 자체가 서버를 만들지는 않습니다.

파일
- atmosphere.css: 원목 책상, 처음의 다섯 파일 배치, 조명과 커피 등장, 메모 부착 위치
- assets/wood-desk.png: 새로 생성한 원목 상판 이미지
- responsive.css / responsive.js: 화면 크기 및 방향별 배치, 전체 구도 크기 계산
- share.js: 접속 주소 검사, QR 생성, 주소 설정
- assets/coffee-americano.png: 받침 없는 흰 아메리카노 머그 이미지
- art-direction.css: 종이 겹침, 파일철 크기, 머그/포스트잇 위치, 이미지 표시, 로즈 조명, 최종 등장 순서
- assets/record-shadow.png / id-front-shadow.png / id-back-shadow.png: 제공된 그림자 포함 이미지
- assets/record-private.png / evidence-photo.png: 다른 파일용 배경과 증거사진
- assets/qrcode.js: qrcode-generator 1.4.4 (MIT, Kazuhiko Arase)
- assets/case-assets.js: 기존 이미지 경로 / 선택적인 고정 QR 주소
- styles.css / sketch.css: 기존 시각 스타일과 등장 애니메이션

머그컵 이미지 제작 기록
내장 이미지 생성 도구 사용. assets/coffee-americano.png
프롬프트: "Use case: product-mockup. Asset type: transparent photographic object for an interactive desk website. Generate ONE white ceramic mug filled with dark black Americano coffee, viewed exactly overhead (flat lay, circular rim, no visible side wall). NO SAUCER, NO COASTER, NO BASE underneath. Plain clean white ceramic, realistic thick rim, dark brown almost black liquid with subtle natural reflection, NO milk, NO foam, NO latte art, NO QR, NO text, NO steam, no other objects. Handle points northeast, about 40 degrees above the rightward horizontal (around 1:40 on clock). Handle hole must be genuinely transparent. Isolated on transparent background, tightly framed but with clear margin around complete handle and cup. Soft neutral upper-left lighting with delicate ceramic highlights. The website will add its own cast shadow so do not bake in a broad ground shadow. Photorealistic, premium natural materials, usable as a clean cutout sprite."
QR은 포스트잇 위에 실제 주소를 인코딩한 SVG로 표시합니다.

원목 이미지 제작 기록
내장 이미지 생성 도구 사용. 프롬프트 요약: "Direct overhead flat walnut tabletop, muted tobacco brown and warm umber, fine horizontal wood grain, sparse age scratches, empty edge-to-edge material texture, uniform illumination, no objects, no text, no baked-in spotlight."
조명은 원목 이미지에 덧그리지 않고 CSS의 밝기와 광원 레이어로 제어합니다.
