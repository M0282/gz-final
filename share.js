(() => {
  const dialog = document.getElementById('shareDialog');
  const cup = document.getElementById('latteCode');
  const expanded = document.getElementById('shareQr');
  const status = document.getElementById('shareStatus');
  const link = document.getElementById('shareLink');
  const input = document.getElementById('shareUrl');
  const settings = document.getElementById('shareSettings');
  const storageKey = `archive-mobile-url:${location.pathname}`;
  let saved = '';
  try { saved = localStorage.getItem(storageKey) || ''; } catch {}
  function reachableAddress(value) {
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return '';
      if (host === 'localhost' || host.endsWith('.localhost') || host === '[::1]' || host === '[::]' || host === '0.0.0.0' || /^127\./.test(host)) return '';
      return url.href;
    } catch { return ''; }
  }
  function svgCode(url, foreground, background) {
    const qr = qrcode(0, 'M');
    qr.addData(url, 'Byte');
    qr.make();
    const count = qr.getModuleCount();
    const size = count + 8; // Required four-module quiet zone on all sides.
    const paths = [];
    for (let row = 0; row < count; row++) for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) paths.push(`M${col + 4},${row + 4}h1v1h-1z`);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="모바일 접속 QR 코드" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="${background}"/><path d="${paths.join('')}" fill="${foreground}"/></svg>`;
  }
  function render(value) {
    const url = reachableAddress(value);
    cup.replaceChildren(); expanded.replaceChildren();
    link.hidden = true; link.removeAttribute('href'); link.textContent = '';
    cup.classList.add('is-unconfigured');
    if (!url) {
      status.textContent = 'Set a mobile-accessible URL. File URLs and localhost cannot be opened on another device. / スマートフォンで開けるURLを設定してください。ファイルURLとlocalhostは別の端末では開けません。';
      settings.open = true;
      return false;
    }
    try {
      cup.innerHTML = svgCode(url, '#211d18', '#fffaf0');
      expanded.innerHTML = svgCode(url, '#201810', '#fffaf0');
      cup.classList.remove('is-unconfigured');
      link.href = url; link.textContent = url; link.hidden = false;
      status.textContent = 'Scan with your phone. For a local PC address, use the same Wi-Fi and keep the server running. / スマートフォンで読み取ってください。PCのローカルアドレスを使う場合は、同じWi-Fiに接続し、サーバーを起動したままにしてください。';
      return true;
    } catch {
      cup.replaceChildren(); expanded.replaceChildren();
      status.textContent = 'Could not create QR. Try a shorter URL. / QRを作成できません。短いURLをお試しください。';
      settings.open = true;
      return false;
    }
  }
  const initial = saved || window.MOBILE_SHARE_URL || location.href;
  input.value = reachableAddress(initial);
  render(initial);
  document.getElementById('qrNoteButton').addEventListener('click', () => dialog.showModal());
  document.getElementById('closeShare').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('shareForm').addEventListener('submit', event => {
    event.preventDefault();
    if (!render(input.value.trim())) return;
    const url = reachableAddress(input.value.trim());
    input.value = url;
    try { localStorage.setItem(storageKey, url); } catch {}
    settings.open = false;
  });
  document.getElementById('resetShareUrl').addEventListener('click', () => {
    try { localStorage.removeItem(storageKey); } catch {}
    input.value = reachableAddress(window.MOBILE_SHARE_URL || location.href);
    render(input.value);
  });
  // Capture ESC so dismissing this dialog does not also reset the desk.
  dialog.addEventListener('keydown', event => { if (event.key === 'Escape') event.stopPropagation(); });
})();
