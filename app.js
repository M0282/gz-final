(() => {
  const assetConfig = window.CASE_ASSETS || {};
  const room = document.getElementById('room');
  const workspace = document.getElementById('caseWorkspace');
  const dialog = document.getElementById('evidenceDialog');
  const modalVisual = document.getElementById('modalVisual');
  const modalTitle = document.getElementById('modalTitle');
  const closeDialog = document.getElementById('closeDialog');
  const resetButton = document.getElementById('resetButton');
  const modalHint = document.getElementById('modalHint');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coffeeButton = document.getElementById('qrNoteButton');
  const caseFile = document.getElementById('caseFile');
  const pendingRecord = document.getElementById('pendingRecord');
  let lastSelectedFolder = null;
  const proposalDialog = document.getElementById('proposalDialog');
  let proposalPage = 2;
  const flips = new Map();
  function cancelFlips() {
    for (const [image, state] of flips) { state.cancelled = true; state.animation?.cancel(); image.removeAttribute('aria-busy'); }
    flips.clear();
  }
  async function flipImage(image, source, commit, direction = 1, animate = true) {
    if (flips.has(image)) return;
    if (!animate || reduceMotion) { image.src = source; commit(); return; }
    const state = { cancelled: false, animation: null };
    flips.set(image, state);
    image.setAttribute('aria-busy', 'true');
    try {
      const next = new Image(); next.src = source; await next.decode();
      if (state.cancelled) return;
      state.animation = image.animate([
        { transform: 'perspective(1200px) rotateY(0deg) scale(1)', filter: 'brightness(1)' },
        { transform: `perspective(1200px) rotateY(${-90 * direction}deg) scale(1.035)`, filter: 'brightness(.65)' }
      ], { duration: 300, easing: 'ease-in', fill: 'forwards' });
      await state.animation.finished;
      if (state.cancelled) return;
      image.src = source; commit(); state.animation.cancel();
      state.animation = image.animate([
        { transform: `perspective(1200px) rotateY(${90 * direction}deg) scale(1.035)`, filter: 'brightness(.65)' },
        { transform: 'perspective(1200px) rotateY(0deg) scale(1)', filter: 'brightness(1)' }
      ], { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' });
      await state.animation.finished;
    } catch (error) {
      if (!state.cancelled) { image.src = source; commit(); }
    } finally {
      state.animation?.cancel();
      if (flips.get(image) === state) { flips.delete(image); image.removeAttribute('aria-busy'); }
    }
  }
  function showProposalPage(page, animate = true) {
    const nextPage = page < 2 ? 7 : page > 7 ? 2 : page;
    const image = document.getElementById('proposalImage');
    flipImage(image, `assets/proposal-0${nextPage}.png`, () => {
      proposalPage = nextPage;
      image.alt = `프로젝트 기획서 ${proposalPage}번 페이지`;
      document.getElementById('proposalCounter').textContent = `${proposalPage - 1} / 6`;
    }, page < proposalPage ? -1 : 1, animate);
  }
  proposalDialog.addEventListener('close', cancelFlips);
  document.getElementById('proposalPage').addEventListener('click', () => showProposalPage(proposalPage + 1));
  document.getElementById('proposalNext').addEventListener('click', () => showProposalPage(proposalPage + 1));
  document.getElementById('proposalPrev').addEventListener('click', () => showProposalPage(proposalPage - 1));
  document.getElementById('closeProposal').addEventListener('click', () => proposalDialog.close());
  proposalDialog.addEventListener('click', e => { if (e.target === proposalDialog) proposalDialog.close(); });
  proposalDialog.addEventListener('keydown', e => {
    e.stopPropagation();
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); showProposalPage(proposalPage + (e.key === 'ArrowRight' ? 1 : -1));
    }
  });

  const evidenceNames = {
    document: 'CASE RECORD · 事件記録',
    idCard: 'STUDENT ID · 学生証',
    portrait: 'PORTRAIT · 人物写真',
    notes: 'EVIDENCE PHOTO · 証拠写真'
  };
  const closeHint = 'ESC / Click outside to close\nESC / 背景をクリックして閉じる';

  function getAsset(path) {
    return path.split('.').reduce((value, key) => value?.[key], assetConfig) || null;
  }

  function applyAsset(img) {
    const source = getAsset(img.dataset.asset);
    const host = img.closest('[data-asset-host]');
    if (!source) {
      img.removeAttribute('src');
      img.hidden = true;
      host?.classList.remove('has-asset');
      return;
    }
    img.src = source;
    img.hidden = false;
    host?.classList.add('has-asset');
  }

  document.querySelectorAll('img[data-asset]').forEach(applyAsset);

  function selectCase(folder) {
    lastSelectedFolder = folder;
    const caseId = folder.dataset.case;
    if (caseId === '023') { cancelFlips(); showProposalPage(2, false); proposalDialog.showModal(); return; }
    const title = folder.querySelector('.folder-name').textContent;
    room.dataset.case = caseId;
    caseFile.hidden = caseId !== '017';
    pendingRecord.hidden = caseId === '017';
    document.getElementById('pendingCode').textContent = `ARCHIVE / ${caseId}`;
    document.getElementById('pendingTitle').textContent = title;
    document.querySelector('.case-board').setAttribute('aria-label', `CASE ${caseId} ${title}`);

    document.querySelectorAll('.case-folder').forEach((item) => {
      item.classList.toggle('is-selected', item === folder);
      item.setAttribute('aria-pressed', item === folder ? 'true' : 'false');
      item.inert = item !== folder;
    });

    room.classList.remove('case-open');
    void room.offsetWidth;
    room.classList.add('case-open');
    coffeeButton.inert = false;
    coffeeButton.setAttribute('aria-hidden', 'false');
    document.getElementById('coffeeObject').setAttribute('aria-hidden', String(caseId !== '017'));
    workspace.setAttribute('aria-hidden', 'false');
    workspace.inert = false;
    resetButton.hidden = false;
  }

  function resetDesk() {
    if (dialog.open) dialog.close();
    document.getElementById('shareDialog')?.close();
    room.classList.remove('case-open');
    delete room.dataset.case;
    coffeeButton.inert = true;
    coffeeButton.setAttribute('aria-hidden', 'true');
    document.getElementById('coffeeObject').setAttribute('aria-hidden', 'true');
    workspace.setAttribute('aria-hidden', 'true');
    workspace.inert = true;
    resetButton.hidden = true;
    document.querySelectorAll('.case-folder').forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-pressed', 'false');
      item.inert = false;
    });
    (lastSelectedFolder || document.querySelector('.case-folder[data-case="017"]'))?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  document.querySelectorAll('.case-folder').forEach((folder) => {
    folder.setAttribute('aria-label', `${folder.querySelector('.folder-name').textContent} 열기`);
    folder.addEventListener('click', () => selectCase(folder));
  });

  document.querySelectorAll('.evidence-card, .record-sheet').forEach((card) => {
    card.addEventListener('click', () => {
      const slot = card.dataset.slot;
      const clone = slot === 'document' ? document.createElement('span') : card.querySelector('.evidence-surface').cloneNode(true);
      if (slot === 'document') {
        clone.className = 'evidence-surface';
        const img = card.querySelector('.record-image').cloneNode(true);
        img.className = 'evidence-image';
        clone.append(img);
      }
      clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
      modalTitle.textContent = evidenceNames[slot] || 'EVIDENCE · 証拠資料';
      modalVisual.className = `modal-visual modal-${slot}`;
      modalVisual.replaceChildren(clone);
      modalVisual.dataset.idCardSide = slot === 'idCard' ? 'front' : '';
      modalHint.textContent = slot === 'idCard'
        ? `Click card to flip · クリックして裏面へ\n${closeHint}`
        : closeHint;
      dialog.showModal();
    });
  });

  modalVisual.addEventListener('click', () => {
    if (!modalVisual.classList.contains('modal-idCard')) return;

    const image = modalVisual.querySelector('.evidence-image');
    if (!image) return;

    const isFront = modalVisual.dataset.idCardSide !== 'back';
    const nextSide = isFront ? 'back' : 'front';
    const nextAsset = getAsset(nextSide === 'back' ? 'case017.idCardBack' : 'case017.idCard');
    if (!nextAsset) return;

    flipImage(image, nextAsset, () => {
    modalVisual.dataset.idCardSide = nextSide;
    modalTitle.textContent = `STUDENT ID · 学生証 — ${nextSide === 'front' ? 'FRONT / 表面' : 'BACK / 裏面'}`;
    modalHint.textContent = nextSide === 'front'
      ? `Click card to flip · クリックして裏面へ\n${closeHint}`
      : `Click card to flip · クリックして表面へ\n${closeHint}`;
    }, isFront ? 1 : -1);
  });

  resetButton.addEventListener('click', resetDesk);
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.classList.contains('modal-shell') || event.target === modalVisual) dialog.close();
  });
  dialog.addEventListener('close', () => {
    cancelFlips();
    modalVisual.replaceChildren();
    modalVisual.removeAttribute('data-id-card-side');
    modalHint.textContent = closeHint;
  });
  dialog.addEventListener('keydown', event => { if (event.key === 'Escape') event.stopPropagation(); });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dialog.open && !document.getElementById('shareDialog')?.open && room.classList.contains('case-open')) {
      resetDesk();
    }
  });

  const modelContext = document.modelContext;
  if (modelContext?.registerTool) {
    const lifecycle = new AbortController();
    const register = (tool) => {
      try {
        void Promise.resolve(modelContext.registerTool(tool, { signal: lifecycle.signal })).catch(() => {});
      } catch {}
    };

    register({
      name: 'open_case_017',
      title: 'CASE 017 열기',
      description: '왼쪽 서류 더미에서 CASE 017을 선택하고 기록을 책상 오른쪽으로 꺼냅니다.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute() {
        const folder = document.querySelector('.case-folder[data-case="017"]');
        selectCase(folder);
        if (!reduceMotion) await new Promise((resolve) => setTimeout(resolve, 950));
        return { caseId: '017', state: 'open' };
      }
    });

    register({
      name: 'view_case_evidence',
      title: '증거물 확대',
      description: 'CASE 017의 신분 기록, 인물 사진, 회수 메모 중 하나를 확대합니다.',
      inputSchema: {
        type: 'object',
        properties: { evidence: { type: 'string', enum: ['idCard', 'portrait', 'notes'] } },
        required: ['evidence'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input) {
        if (!input || !evidenceNames[input.evidence]) throw new Error('Unknown evidence slot');
        if (!room.classList.contains('case-open') || room.dataset.case !== '017') {
          selectCase(document.querySelector('.case-folder[data-case="017"]'));
          if (!reduceMotion) await new Promise((resolve) => setTimeout(resolve, 950));
        }
        document.querySelector(`[data-slot="${input.evidence}"]`)?.click();
        return { caseId: '017', evidence: input.evidence, state: 'detail' };
      }
    });
  }
})();
