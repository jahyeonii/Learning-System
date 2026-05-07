/*  DATA  */
  let students = [
    { name:'Sosuke Aizen',       av:'🐱', level:6, xp:4820, progress:85, status:'Active'   },
    { name:'Johan Liebert',      av:'🐶', level:5, xp:4210, progress:78, status:'Active'  },
    { name:'Shikamaru Nara',     av:'🦊', level:5, xp:3400, progress:72, status:'Active'  },
    { name:'Koro Sensei',        av:'🐸', level:4, xp:3050, progress:65, status:'Idle'   },
    { name:'Senku Ishigami',     av:'🦋', level:4, xp:2780, progress:60, status:'Idle'    },
    { name:'Lelouch Lamperouge', av:'🐻', level:3, xp:1940, progress:45, status:'Offline'  },
    { name:'L Lawliet',          av:'🐼', level:2, xp:980,  progress:30, status:'Offline' },
    { name:'Monkey D. Luffy',    av:'🐯', level:3, xp:1600, progress:40, status:'Active'  },
    { name:'Edward Elric',       av:'🦁', level:4, xp:2300, progress:55, status:'Idle'    },
    { name:'Gon Freecss',        av:'🐨', level:2, xp:750,  progress:22, status:'Offline'  },
    { name:'Killua Zoldyck',     av:'🐱', level:3, xp:1200, progress:35, status:'Idle'    },
    { name:'Itachi Uchiha',      av:'🐶', level:5, xp:3900, progress:75, status:'Active'  },
    { name:'Rem Rezero',         av:'🦋', level:2, xp:890,  progress:28, status:'Offline'  },
    { name:'Emilia Rezero',      av:'🐸', level:3, xp:1450, progress:38, status:'Active'  },
    { name:'Roronoa Zoro',       av:'🐯', level:4, xp:2600, progress:62, status:'Idle'    },
    { name:'Nami Orange',        av:'🦊', level:3, xp:1700, progress:42, status:'Active'   },
    { name:'Nico Robin',         av:'🐻', level:5, xp:3550, progress:70, status:'Active'   },
    { name:'Tony Chopper',       av:'🐼', level:1, xp:320,  progress:15, status:'Offline'  },
    { name:'Sanji Vinsmoke',     av:'🐱', level:4, xp:2200, progress:52, status:'Idle'    },
    { name:'Brook Musician',     av:'🦁', level:2, xp:640,  progress:20, status:'Offline'  },
    { name:'Franky Shipwright',  av:'🐨', level:3, xp:1300, progress:36, status:'Idle'    },
    { name:'Usopp Sniper',       av:'🐶', level:2, xp:980,  progress:29, status:'Offline'  },
    { name:'Portgas Ace',        av:'🦊', level:4, xp:2450, progress:58, status:'Active'   },
    { name:'Sabo Dragon',        av:'🐸', level:3, xp:1850, progress:46, status:'Active'   },
    { name:'Boa Hancock',        av:'🐯', level:5, xp:3200, progress:68, status:'Idle'    },
    { name:'Trafalgar Law',      av:'🦋', level:4, xp:2750, progress:63, status:'Active'  },
    { name:'Eustass Kidd',       av:'🐻', level:3, xp:1550, progress:40, status:'Idle'  },
    { name:'Nefertari Vivi',     av:'🐼', level:2, xp:820,  progress:25, status:'Offline' },
    { name:'Riki Nendou',        av:'🦁', level:1, xp:150,  progress:8,  status:'Offline'  },
    { name:'Okuyasu Nijimura',   av:'🐨', level:1, xp:210,  progress:10, status:'Offline'  },
    { name:'Josuke Higashikata', av:'🐱', level:2, xp:760,  progress:23, status:'Idle'     },
    { name:'Giorno Giovanna',    av:'🐶', level:3, xp:1950, progress:48, status:'Active' },
  ];
 
  let panelFilter = 'all';
 
  /*  RENDER TABLE (top 7)  */
  function renderTable() {
    const dotClass = { Active:'dot-active', Idle:'dot-idle', Offline:'dot-offline' };
    document.getElementById('student-tbody').innerHTML = students.slice(0, 7).map(s => `
      <tr>
        <td><div class="student-name"><span>${s.av}</span>${s.name}</div></td>
        <td><span class="level-tag">Lvl ${s.level}</span></td>
        <td><span class="xp-badge">${s.xp.toLocaleString()} XP</span></td>
        <td><div class="progress-mini"><div class="progress-mini-fill" style="width:${s.progress}%"></div></div></td>
        <td><span class="status-dot ${dotClass[s.status]}"></span>${s.status}</td>
      </tr>
    `).join('');
    const n = students.length;
    document.getElementById('table-count').textContent = `${n} total`;
    document.getElementById('stat-students').textContent = n;
    document.getElementById('ov-total').textContent = n;
  }
 
  /*  MODAL HELPERS  */
  function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  }
  function overlayClose(e, id) {
    if (e.target === document.getElementById(id)) closeModal(id);
  }
 
  /*  TOAST  */
  function showToast(msg, type) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast show' + (type ? ' toast-' + type : '');
    setTimeout(() => { t.className = 'toast'; }, 3200);
  }
 
  /*  ADD STUDENT  */
  document.getElementById('avatar-picker').addEventListener('click', e => {
    const opt = e.target.closest('.avatar-opt');
    if (!opt) return;
    document.querySelectorAll('.avatar-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
  });
 
  function addStudent() {
    const name  = document.getElementById('new-name').value.trim();
    const grade = document.getElementById('new-grade').value;
    const av    = document.querySelector('.avatar-opt.selected')?.dataset.av || '🐱';
    if (!name)  { showToast('⚠️ Please enter a name', 'orange'); return; }
    if (!grade) { showToast('⚠️ Please select a grade', 'orange'); return; }
 
    students.unshift({ name, av, level:1, xp:0, progress:0, status:'Offline', grade });
    renderTable();
    renderPanel();
    closeModal('modal-add-student');
    showToast(`✅ ${name} added successfully!`, 'green');
 
    // reset form
    document.getElementById('new-name').value = '';
    document.getElementById('new-username').value = '';
    document.getElementById('new-grade').value = '';
    document.querySelectorAll('.avatar-opt').forEach((o, i) => o.classList.toggle('selected', i === 0));
  }
 
  /*  CREATE LESSON  */
  document.getElementById('lesson-cat-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.lesson-tab');
    if (!tab) return;
    document.querySelectorAll('.lesson-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
 
  function createLesson() {
    const title = document.getElementById('lesson-title').value.trim();
    const xp    = document.getElementById('lesson-xp').value || '50';
    const cat   = document.querySelector('.lesson-tab.active')?.dataset.cat || 'reading';
    const diff  = document.getElementById('lesson-difficulty').value;
    if (!title) { showToast('⚠️ Please enter a lesson title', 'orange'); return; }
    closeModal('modal-create-lesson');
    showToast(`🚀 "${title}" created! (${diff}, +${xp} XP)`, 'green');
    document.getElementById('lesson-title').value = '';
    document.getElementById('lesson-desc').value  = '';
    document.getElementById('lesson-xp').value    = '';
  }
 
  /*  ANNOUNCE  */
  function updatePreview() {
    const title = document.getElementById('ann-title').value.trim();
    const msg   = document.getElementById('ann-msg').value.trim();
    const prev  = document.getElementById('ann-preview');
    if (!title && !msg) {
      prev.innerHTML = '<div class="preview-label">Preview</div><em style="color:#bbb">Start typing to see a preview…</em>';
    } else {
      prev.innerHTML = `<div class="preview-label">Preview</div>${title ? `<strong>${title}</strong><br>` : ''}${msg ? `<span>${msg}</span>` : ''}`;
    }
  }
 
  function sendAnnouncement() {
    const title  = document.getElementById('ann-title').value.trim();
    const msg    = document.getElementById('ann-msg').value.trim();
    const sel    = document.getElementById('ann-target');
    const label  = sel.options[sel.selectedIndex].text;
    if (!title) { showToast('⚠️ Please enter a title', 'orange'); return; }
    if (!msg)   { showToast('⚠️ Please enter a message', 'orange'); return; }
    closeModal('modal-announce');
    showToast(`📢 Announcement sent to ${label}!`, 'blue');
    document.getElementById('ann-title').value = '';
    document.getElementById('ann-msg').value   = '';
    updatePreview();
  }
 
  /*  SIDE PANEL  */
  function openPanel() {
    document.getElementById('panel-overlay').classList.add('open');
    document.getElementById('side-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderPanel();
  }
  function closePanel() {
    document.getElementById('panel-overlay').classList.remove('open');
    document.getElementById('side-panel').classList.remove('open');
    document.body.style.overflow = '';
  }
  function setFilter(el) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    panelFilter = el.dataset.filter;
    renderPanel();
  }
  function renderPanel() {
    const q = document.getElementById('panel-search-input').value.toLowerCase();
    const dotColor = { Active:'#4caf50', Idle:'#ff9800', Offline:'#ccc' };
 
    const filtered = students.filter(s =>
      (s.name.toLowerCase().includes(q) || s.grade.toLowerCase().includes(q)) &&
      (panelFilter === 'all' || s.status === panelFilter)
    );
 
    document.getElementById('panel-body').innerHTML = filtered.length
      ? filtered.map(s => `
          <div class="panel-student-row">
            <div class="panel-av">${s.av}</div>
            <div class="panel-info">
              <div class="panel-name">${s.name}</div>
              <div class="panel-meta">${s.grade} · Lvl ${s.level} · ${s.xp.toLocaleString()} XP</div>
            </div>
            <div class="panel-right">
              <span class="level-tag">Lvl ${s.level}</span>
              <span style="width:10px;height:10px;border-radius:50%;background:${dotColor[s.status]};display:inline-block;flex-shrink:0"></span>
            </div>
          </div>
        `).join('')
      : '<div style="text-align:center;padding:40px;color:#aaa;font-size:14px">No students found 😢</div>';
 
    document.getElementById('panel-footer').textContent = `Showing ${filtered.length} of ${students.length} students`;
  }
 
  /*  ESCAPE KEY  */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    ['modal-add-student','modal-create-lesson','modal-announce'].forEach(closeModal);
    closePanel();
  });
 
  /*  INIT  */
  renderTable();