
    const STORAGE_KEYS = {
      CONSENT: 'p333_consent_v2',
      THEME: 'p333_theme_v2',
      LAST_SEC: 'p333_last_section_v2',
      NIGHTS: 'p333_nights_v2',
      ENTRIES: 'p333_journal_entries_v2',
      PLAN: 'p333_personal_plan_v2'
    };

    let hasStorageConsent = false;
    let memoryEntries = [];

    function initApp() {
      // Verificar si el usuario ya había otorgado consentimiento previamente
      try {
        if (localStorage.getItem(STORAGE_KEYS.CONSENT) === 'true') {
          hasStorageConsent = true;
          document.getElementById('storage-consent-toggle').checked = true;
          updateConsentBadge(true);
          loadPersistedState();
        }
      } catch (e) {}

      setupAudioPlayers();
      setupScrollObserver();
      window.addEventListener('beforeprint', () => {
        document.querySelectorAll('details').forEach(d => { d.open = true; });
      });
    }

    function updateConsentBadge(active) {
      const badge = document.getElementById('consent-status-badge');
      if (active) {
        badge.textContent = 'Guardado local activo';
        badge.style.background = 'var(--olive-surface)';
        badge.style.color = 'var(--olive-primary)';
      } else {
        badge.textContent = 'Guardado desactivado';
      }
    }

    function toggleStorageConsent(checked) {
      hasStorageConsent = checked;
      updateConsentBadge(checked);
      const fb = document.getElementById('journal-feedback');
      try {
        if (checked) {
          localStorage.setItem(STORAGE_KEYS.CONSENT, 'true');
          localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(memoryEntries));
          saveNightProgress();
          savePersonalPlan();
          fb.textContent = '✓ Guardado local activado en este navegador.';
        } else {
          localStorage.removeItem(STORAGE_KEYS.CONSENT);
          fb.textContent = 'Guardado automático desactivado. Tus notas actuales solo permanecerán abiertas en esta pestaña.';
        }
      } catch (e) {}
    }

    function loadPersistedState() {
      try {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme === 'night') {
          document.documentElement.setAttribute('data-theme', 'night');
          const themeBtn = document.getElementById('theme-toggle-btn');
          themeBtn.setAttribute('aria-pressed', 'true');
          const lblMobile = document.getElementById('theme-label-mobile');
          const lblDesktop = document.getElementById('theme-label-desktop');
          if (lblMobile) lblMobile.textContent = '☀ Día';
          if (lblDesktop) lblDesktop.textContent = '☀ Modo Día';
        }

        const lastSec = localStorage.getItem(STORAGE_KEYS.LAST_SEC);
        if (lastSec && lastSec !== 'portada') {
          const btn = document.getElementById('resume-reading-btn');
          if (btn) {
            btn.style.display = 'inline-flex';
            btn.dataset.target = lastSec;
          }
          const mobBtn = document.getElementById('resume-reading-mobile-btn');
          if (mobBtn) {
            mobBtn.style.display = 'inline-flex';
            mobBtn.dataset.target = lastSec;
          }
        }

        const nightsRaw = localStorage.getItem(STORAGE_KEYS.NIGHTS);
        if (nightsRaw) {
          const nightsObj = JSON.parse(nightsRaw);
          document.querySelectorAll('.night-check').forEach(ch => {
            const n = ch.dataset.night;
            if (nightsObj[n]) {
              ch.checked = true;
              ch.closest('.night-item').classList.add('completed');
            }
          });
        }

        const entriesRaw = localStorage.getItem(STORAGE_KEYS.ENTRIES);
        if (entriesRaw) {
          memoryEntries = JSON.parse(entriesRaw) || [];
          renderJournalEntries();
        }

        const planRaw = localStorage.getItem(STORAGE_KEYS.PLAN);
        if (planRaw) {
          const plan = JSON.parse(planRaw);
          document.getElementById('plan-discharge-time').value = plan.dischargeTime || '';
          document.getElementById('plan-screen-cutoff').value = plan.screenCutoff || '';
          document.getElementById('plan-awakening-action').value = plan.awakeningAction || '';
        }
      } catch (e) {}
    }

    function toggleNightMode() {
      const html = document.documentElement;
      const isNight = html.getAttribute('data-theme') === 'night';
      const next = isNight ? 'day' : 'night';
      html.setAttribute('data-theme', next);
      const btn = document.getElementById('theme-toggle-btn');
      btn.setAttribute('aria-pressed', String(!isNight));
      const lblMobile = document.getElementById('theme-label-mobile');
      const lblDesktop = document.getElementById('theme-label-desktop');
      if (lblMobile) lblMobile.textContent = !isNight ? '☀ Día' : '◑ Noche';
      if (lblDesktop) lblDesktop.textContent = !isNight ? '☀ Modo Día' : '◑ Modo Noche';
      if (hasStorageConsent) {
        try { localStorage.setItem(STORAGE_KEYS.THEME, next); } catch (e) {}
      }
    }

    function toggleMobileToc() {
      document.getElementById('toc-sidebar').classList.toggle('mobile-open');
    }

    function closeMobileToc() {
      const toc = document.getElementById('toc-sidebar');
      if (toc) toc.classList.remove('mobile-open');
    }

    function resumeLastSection() {
      const btn = document.getElementById('resume-reading-btn');
      const mobBtn = document.getElementById('resume-reading-mobile-btn');
      const target = (btn && btn.dataset.target) || (mobBtn && mobBtn.dataset.target);
      if (target) {
        closeMobileToc();
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function saveNightProgress() {
      const state = {};
      document.querySelectorAll('.night-check').forEach(ch => {
        const item = ch.closest('.night-item');
        if (ch.checked) {
          state[ch.dataset.night] = true;
          item.classList.add('completed');
        } else {
          item.classList.remove('completed');
        }
      });
      if (hasStorageConsent) {
        try { localStorage.setItem(STORAGE_KEYS.NIGHTS, JSON.stringify(state)); } catch (e) {}
      }
    }

    function savePersonalPlan() {
      const plan = {
        dischargeTime: document.getElementById('plan-discharge-time').value,
        screenCutoff: document.getElementById('plan-screen-cutoff').value,
        awakeningAction: document.getElementById('plan-awakening-action').value
      };
      if (hasStorageConsent) {
        try { localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan)); } catch (e) {}
      }
    }

    function saveJournalEntry() {
      const concern = document.getElementById('entry-concern').value.trim();
      const limit = document.getElementById('entry-limit').value.trim();
      const nextStep = document.getElementById('entry-next-step').value.trim();
      const editId = document.getElementById('editing-entry-id').value;
      const fb = document.getElementById('journal-feedback');

      if (!concern) {
        fb.textContent = 'Escribe primero qué te preocupa. Con una frase basta.';
        return;
      }

      if (editId) {
        memoryEntries = memoryEntries.map(it => it.id === editId ? {
          ...it,
          concern,
          limit,
          nextStep,
          updatedAt: new Date().toLocaleString('es-CO')
        } : it);
        fb.textContent = '✓ Entrada actualizada correctamente.';
      } else {
        memoryEntries.unshift({
          id: 'entry_' + Date.now(),
          date: new Date().toLocaleString('es-CO'),
          concern,
          limit: limit || 'A esta hora no puedo resolverlo; elijo descansar.',
          nextStep: nextStep || 'Revisar mañana en horario diurno.'
        });
        fb.textContent = hasStorageConsent
          ? '✓ Entrada guardada en tu dispositivo.'
          : '✓ Entrada agregada (Activa el consentimiento arriba si deseas conservarla al cerrar la página).';
      }

      if (hasStorageConsent) {
        try { localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(memoryEntries)); } catch (e) {}
      }

      cancelEditEntry();
      renderJournalEntries();
    }

    function editJournalEntry(id) {
      const found = memoryEntries.find(it => it.id === id);
      if (!found) return;
      document.getElementById('editing-entry-id').value = found.id;
      document.getElementById('entry-concern').value = found.concern;
      document.getElementById('entry-limit').value = found.limit;
      document.getElementById('entry-next-step').value = found.nextStep;
      document.getElementById('save-entry-btn').textContent = 'Guardar cambios en la entrada';
      document.getElementById('cancel-edit-btn').style.display = 'inline-flex';
      document.getElementById('entry-concern').focus();
    }

    function cancelEditEntry() {
      document.getElementById('editing-entry-id').value = '';
      document.getElementById('entry-concern').value = '';
      document.getElementById('entry-limit').value = '';
      document.getElementById('entry-next-step').value = '';
      document.getElementById('save-entry-btn').textContent = 'Guardar mi nota';
      document.getElementById('cancel-edit-btn').style.display = 'none';
    }

    function deleteJournalEntry(id) {
      memoryEntries = memoryEntries.filter(it => it.id !== id);
      if (hasStorageConsent) {
        try { localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(memoryEntries)); } catch (e) {}
      }
      renderJournalEntries();
      document.getElementById('journal-feedback').textContent = 'Entrada eliminada.';
    }

    function renderJournalEntries() {
      const container = document.getElementById('journal-entries-container');
      if (!memoryEntries.length) {
        container.innerHTML = '<p style="color: var(--ink-muted); font-style: italic;">Aquí aparecerán tus notas. Puedes empezar con una sola frase.</p>';
        return;
      }
      container.innerHTML = memoryEntries.map(item => `
        <div class="journal-entry-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <span class="time-code" style="color: var(--terracotta-primary);">${escapeHtml(item.date)}</span>
            <div style="display: flex; gap: 6px;" class="no-print">
              <button type="button" class="btn-editorial" style="padding: 4px 10px; font-size: 0.82rem;" onclick="editJournalEntry('${item.id}')">Editar</button>
              <button type="button" class="btn-editorial terracotta" style="padding: 4px 10px; font-size: 0.82rem;" onclick="deleteJournalEntry('${item.id}')">Borrar</button>
            </div>
          </div>
          <p style="margin-bottom: 6px;"><strong>1. Asunto:</strong> ${escapeHtml(item.concern)}</p>
          <p style="margin-bottom: 6px;"><strong>2. Límite hoy:</strong> ${escapeHtml(item.limit)}</p>
          <p style="margin-bottom: 0;"><strong>3. Paso mañana:</strong> ${escapeHtml(item.nextStep)}</p>
        </div>
      `).join('');
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[m]));
    }

    function exportJournalTxt() {
      const plan = {
        dischargeTime: document.getElementById('plan-discharge-time').value || 'Por definir',
        screenCutoff: document.getElementById('plan-screen-cutoff').value || 'Por definir',
        awakeningAction: document.getElementById('plan-awakening-action').value || 'Por definir'
      };
      let lines = [
        'DIARIO PRIVADO DE DESCARGA NOCTURNA Y PLAN PERSONAL — PROTOCOLO 3-3-3',
        '=====================================================================',
        '',
        'MI PLAN PERSONAL:',
        '- Hora de descarga escrita: ' + plan.dischargeTime,
        '- Acuerdo de pantallas y reloj: ' + plan.screenCutoff,
        '- Acción ante despertares: ' + plan.awakeningAction,
        '',
        'ENTRADAS DE MI DIARIO NOCTURNO (3 COLUMNAS):',
        '---------------------------------------------------------------------'
      ];
      if (!memoryEntries.length) {
        lines.push('Sin entradas registradas.');
      } else {
        memoryEntries.forEach((e, idx) => {
          lines.push(`[${idx + 1}] Fecha: ${e.date}`);
          lines.push(`    1. Asunto: ${e.concern}`);
          lines.push(`    2. Límite hoy: ${e.limit}`);
          lines.push(`    3. Paso mañana: ${e.nextStep}`);
          lines.push('');
        });
      }
      downloadBlob(lines.join('\n'), 'mi-diario-nocturno-333.txt', 'text/plain;charset=utf-8');
    }

    function exportJournalJson() {
      const payload = {
        exportedAt: new Date().toISOString(),
        personalPlan: {
          dischargeTime: document.getElementById('plan-discharge-time').value,
          screenCutoff: document.getElementById('plan-screen-cutoff').value,
          awakeningAction: document.getElementById('plan-awakening-action').value
        },
        entries: memoryEntries
      };
      downloadBlob(JSON.stringify(payload, null, 2), 'mi-diario-nocturno-333.json', 'application/json');
    }

    function downloadBlob(content, filename, mime) {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    function clearOnlyUserJournalData() {
      memoryEntries = [];
      renderJournalEntries();
      document.getElementById('plan-discharge-time').value = '';
      document.getElementById('plan-screen-cutoff').value = '';
      document.getElementById('plan-awakening-action').value = '';
      document.querySelectorAll('.night-check').forEach(ch => {
        ch.checked = false;
        ch.closest('.night-item').classList.remove('completed');
      });
      try {
        Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
      } catch (e) {}
      hasStorageConsent = false;
      document.getElementById('storage-consent-toggle').checked = false;
      updateConsentBadge(false);
      document.getElementById('journal-feedback').textContent = '✓ Se han borrado únicamente tus datos personales del diario y del plan en este navegador.';
    }

    // Control de Reproductores de Audio Real
    function formatSec(sec) {
      if (!isFinite(sec) || sec < 0) return '00:00';
      const m = String(Math.floor(sec / 60)).padStart(2, '0');
      const s = String(Math.floor(sec % 60)).padStart(2, '0');
      return `${m}:${s}`;
    }

    function setupAudioPlayers() {
      [1, 2].forEach(num => {
        const audio = document.getElementById(`audio-track-${num}`);
        const seek = document.getElementById(`seek-${num}`);
        const timeEl = document.getElementById(`time-${num}`);
        const btn = document.getElementById(`btn-play-${num}`);
        const fallbackDur = num === 1 ? 180 : 720;

        audio.addEventListener('loadedmetadata', () => {
          const d = audio.duration || fallbackDur;
          timeEl.textContent = `${formatSec(audio.currentTime)} / ${formatSec(d)}`;
        });
        audio.addEventListener('timeupdate', () => {
          const d = audio.duration || fallbackDur;
          seek.value = d ? (audio.currentTime / d) * 100 : 0;
          timeEl.textContent = `${formatSec(audio.currentTime)} / ${formatSec(d)}`;
        });
        audio.addEventListener('ended', () => {
          btn.textContent = '▶ Reproducir';
        });
      });
    }

    function toggleAudio(num) {
      const other = num === 1 ? 2 : 1;
      const otherAudio = document.getElementById(`audio-track-${other}`);
      if (!otherAudio.paused) {
        otherAudio.pause();
        document.getElementById(`btn-play-${other}`).textContent = '▶ Reproducir';
      }

      const audio = document.getElementById(`audio-track-${num}`);
      const btn = document.getElementById(`btn-play-${num}`);
      if (audio.paused) {
        audio.play();
        btn.textContent = '⏸ Pausar';
      } else {
        audio.pause();
        btn.textContent = '▶ Reproducir';
      }
    }

    function skipAudio(num, delta) {
      const audio = document.getElementById(`audio-track-${num}`);
      audio.currentTime = Math.max(0, Math.min((audio.duration || 1000), audio.currentTime + delta));
    }

    function seekAudio(num, pct) {
      const audio = document.getElementById(`audio-track-${num}`);
      const d = audio.duration || (num === 1 ? 180 : 720);
      audio.currentTime = (pct / 100) * d;
    }

    function setVolume(num, val) {
      document.getElementById(`audio-track-${num}`).volume = parseFloat(val);
    }

    function setupScrollObserver() {
      window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
        document.getElementById('reading-progress').style.width = pct + '%';
      }, { passive: true });

      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.toc-link');
      navLinks.forEach(lk => {
        lk.addEventListener('click', () => closeMobileToc());
      });
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(lk => {
              lk.classList.toggle('active', lk.dataset.sec === id);
            });
            if (hasStorageConsent && id !== 'portada') {
              try { localStorage.setItem(STORAGE_KEYS.LAST_SEC, id); } catch (e) {}
            }
          }
        });
      }, { rootMargin: '-20% 0px -65% 0px' });

      sections.forEach(s => obs.observe(s));
    }

    document.addEventListener('DOMContentLoaded', initApp);
  