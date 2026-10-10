(() => {
  const root = document.documentElement;
  const room = document.getElementById('room');
  const portrait = matchMedia('(max-width: 980px) and (orientation: portrait)');
  function fitDesk() {
    const width = document.documentElement.clientWidth;
    const height = window.visualViewport?.height || window.innerHeight;
    const header = document.querySelector('.room-header').getBoundingClientRect();
    const top = Math.max(68, header.bottom + 18);
    const footer = 78;
    const mobile = portrait.matches;
    const stageWidth = mobile ? 420 : 1400;
    const stageHeight = mobile ? 790 : 900;
    // Portrait remains readable and scrolls naturally on short phones.
    // Landscape and desktop fit the entire composition in both dimensions.
    const scale = mobile
      ? Math.min((width - 24) / stageWidth, 1.25)
      : Math.min((width - 32) / stageWidth, Math.max(200, height - top - footer) / stageHeight, 1.3);
    const roomHeight = Math.max(height, top + stageHeight * scale + footer);
    root.style.setProperty('--desk-scale', scale.toFixed(5));
    root.style.setProperty('--stage-top', `${top}px`);
    root.style.setProperty('--room-height', `${Math.ceil(roomHeight)}px`);
    room.dataset.layout = mobile ? 'portrait' : 'landscape';
  }
  let frame;
  function scheduleFit() { cancelAnimationFrame(frame); frame = requestAnimationFrame(fitDesk); }
  window.addEventListener('resize', scheduleFit);
  window.visualViewport?.addEventListener('resize', scheduleFit);
  portrait.addEventListener('change', scheduleFit);
  fitDesk();
})();
