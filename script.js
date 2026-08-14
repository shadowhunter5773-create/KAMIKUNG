/* ================================================================
   MAIN SCRIPT
   ทุก state และ DOM logic ของหน้าเว็บ — อ่านค่าทั้งหมดจาก SITE_CONFIG
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderProfile();
  renderStats();
  renderDiscord();
  renderSocials();
  renderFooter();
  setupBackground();
  spawnParticles();
  setupClock();
  setupMobileNav();
  setupMusicPlayer();

  if (window.lucide) lucide.createIcons();

  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hidden'), 450);
  });
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 3000);
});

/* -------------------- NAVBAR -------------------- */
function renderNavbar() {
  const brand = SITE_CONFIG.brand;
  document.getElementById('nav-logo').textContent = brand.name;

  const buildLinks = (container, extraClass) => {
    container.innerHTML = '';
    brand.navLinks.forEach((link, i) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      if (i === 0) a.classList.add('active');
      container.appendChild(a);
    });
  };
  buildLinks(document.getElementById('nav-links'));
  buildLinks(document.getElementById('nav-links-mobile'));

  document.getElementById('nav-status-text').textContent = SITE_CONFIG.profile.online ? 'ONLINE' : 'OFFLINE';
  document.getElementById('nav-status-dot').classList.toggle('offline', !SITE_CONFIG.profile.online);
}

function setupClock() {
  const el = document.getElementById('nav-clock');
  const update = () => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    el.textContent = `${h}:${m} ${suffix}`;
  };
  update();
  setInterval(update, 15000);
}

function setupMobileNav() {
  const burger = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('nav-links-mobile');
  burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') mobileNav.classList.remove('open');
  });
}

/* -------------------- PROFILE -------------------- */
function renderProfile() {
  const p = SITE_CONFIG.profile;
  document.getElementById('username-text').textContent = p.username;
  document.getElementById('status-line-text').textContent = p.statusLine;
  document.getElementById('join-date').textContent = p.joinDate;
  document.getElementById('verified-badge').style.display = p.verified ? 'inline-block' : 'none';
  document.getElementById('frame-decor-text').textContent = p.decorativeText || '';

  const rankPill = document.getElementById('rank-pill');
  if (p.rankBadge) { rankPill.textContent = p.rankBadge; } else { rankPill.style.display = 'none'; }

  const avatar = document.getElementById('avatar-img');
  avatar.src = p.avatar;
  avatar.onerror = () => { avatar.style.background = 'linear-gradient(135deg,#a855f7,#6d28d9)'; avatar.src = ''; };
}

function renderStats() {
  const s = SITE_CONFIG.profile.stats;
  const key = SITE_CONFIG.viewCounter.storageKey;
  let views = parseInt(localStorage.getItem(key), 10);
  if (!Number.isFinite(views)) views = s.views;
  else views += 1;
  localStorage.setItem(key, String(views));

  animateCount(document.getElementById('stat-views'), views);
  animateCount(document.getElementById('stat-followers'), s.followers);
  animateCount(document.getElementById('stat-following'), s.following);
}

function animateCount(el, target) {
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* -------------------- SOCIAL LINKS -------------------- */
function renderSocials() {
  const row = document.getElementById('socials-row');
  row.innerHTML = '';
  SITE_CONFIG.socials.forEach(s => {
    const item = document.createElement('a');
    item.className = 'social-item';
    item.href = s.url;
    item.target = '_blank';
    item.rel = 'noopener noreferrer';
    item.title = s.platform;

    const iconBox = document.createElement('span');
    iconBox.className = 'social-icon-box hud-corners';

    const img = document.createElement('img');
    img.src = s.image;
    img.alt = s.platform;
    img.loading = 'lazy';
    // กันบัค: ถ้ารูปโหลดไม่ขึ้น (ลิงก์เสีย/ออฟไลน์) ให้ fallback เป็นตัวอักษรแทน แทนที่จะโชว์ไอคอนรูปแตก
    img.addEventListener('error', () => {
      img.remove();
      const fallback = document.createElement('span');
      fallback.className = 'social-fallback-text';
      fallback.textContent = s.platform.charAt(0).toUpperCase();
      iconBox.appendChild(fallback);
    }, { once: true });
    iconBox.appendChild(img);

    const label = document.createElement('span');
    label.className = 'social-label';
    label.textContent = s.platform.toUpperCase();

    item.appendChild(iconBox);
    item.appendChild(label);
    row.appendChild(item);
  });
}

/* -------------------- DISCORD -------------------- */
function renderDiscord() {
  const d = SITE_CONFIG.discord;

  document.getElementById('discord-avatar').src = d.profile.avatar;
  document.getElementById('discord-username').textContent = d.profile.username;
  document.getElementById('discord-badge-pill').textContent = d.profile.badgeLabel;
  document.getElementById('discord-custom-status').textContent = d.profile.customStatus || '';

  const statusColors = { online: '#3fe07f', idle: '#f5c451', dnd: '#f5455c', offline: '#6f6a8a' };
  const statusLabels = { online: 'Online', idle: 'Idle', dnd: 'Do Not Disturb', offline: 'Offline' };
  const dot = document.getElementById('discord-status-dot');
  dot.style.background = statusColors[d.profile.status] || statusColors.offline;
  dot.style.boxShadow = `0 0 6px ${statusColors[d.profile.status] || 'transparent'}`;
  document.getElementById('discord-status-text').textContent = statusLabels[d.profile.status] || 'Offline';
  document.getElementById('discord-open-btn').href = d.server.inviteUrl;

  document.getElementById('discord-server-icon').src = d.server.icon;
  document.getElementById('discord-server-name').textContent = d.server.name;
  document.getElementById('server-badge-pill').textContent = d.server.badgeLabel;
  document.getElementById('discord-online-count').textContent = d.server.onlineCount.toLocaleString();
  document.getElementById('discord-member-count').textContent = d.server.memberCount.toLocaleString();
  document.getElementById('discord-join-btn').href = d.server.inviteUrl;
}

/* -------------------- FOOTER -------------------- */
function renderFooter() {
  document.getElementById('footer-copy').textContent = SITE_CONFIG.footer.copyright;
  document.getElementById('footer-tagline').textContent = SITE_CONFIG.footer.tagline;
}

/* -------------------- BACKGROUND VIDEO -------------------- */
function setupBackground() {
  const bg = SITE_CONFIG.background;
  const layer = document.getElementById('bg-layer');
  const video = document.getElementById('bg-video');
  const fallback = document.getElementById('bg-fallback');

  if (!bg.videoSrc) {
    layer.classList.add('no-video');
    fallback.style.backgroundImage = bg.fallbackImage ? `url('${bg.fallbackImage}')` : '';
    return;
  }

  const source = document.createElement('source');
  source.src = bg.videoSrc;
  source.type = 'video/mp4';
  video.appendChild(source);

  video.addEventListener('error', () => {
    layer.classList.add('no-video');
    fallback.style.backgroundImage = bg.fallbackImage ? `url('${bg.fallbackImage}')` : '';
  });

  video.play().catch(() => {
    const resume = () => { video.play().catch(() => {}); document.removeEventListener('click', resume); };
    document.addEventListener('click', resume, { once: true });
  });
}

/* -------------------- PARTICLES -------------------- */
function spawnParticles() {
  const container = document.getElementById('particles');
  const count = window.innerWidth < 600 ? 16 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `-${Math.random() * 20}px`;
    const duration = Math.random() * 14 + 10;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `-${Math.random() * duration}s`;
    container.appendChild(p);
  }
}

/* -------------------- MUSIC WIDGET -------------------- */
function setupMusicPlayer() {
  const playlist = SITE_CONFIG.playlist;
  if (!playlist || !playlist.length) return;

  const audio = document.getElementById('audio-el');
  const widget = document.getElementById('music-widget');
  const orb = document.getElementById('music-orb');
  const orbCover = document.getElementById('orb-cover');
  const popoverCover = document.getElementById('popover-cover');
  const titleEl = document.getElementById('popover-title');
  const artistEl = document.getElementById('popover-artist');
  const playBtn = document.getElementById('mp-play');
  const playIcon = document.getElementById('mp-play-icon');
  const prevBtn = document.getElementById('mp-prev');
  const nextBtn = document.getElementById('mp-next');
  const progress = document.getElementById('mp-progress');
  const currentTimeEl = document.getElementById('mp-current-time');
  const durationEl = document.getElementById('mp-duration');

  const STORAGE_KEY = 'bovizz_music_state';
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  let index = Number.isInteger(saved.index) && saved.index < playlist.length ? saved.index : 0;
  const volume = 0.7; // ระดับเสียงคงที่ ไม่มีปุ่มปรับเพิ่ม/ลดเสียงแล้ว

  audio.volume = volume;

  function loadTrack(i, autoplay) {
    const track = playlist[i];
    orbCover.src = track.cover;
    popoverCover.src = track.cover;
    titleEl.textContent = track.title;
    artistEl.textContent = track.artist;
    audio.src = track.src;
    saveState();
    if (autoplay) audio.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
  }

  function setPlayingUI(isPlaying) {
    playIcon.setAttribute('data-lucide', isPlaying ? 'pause' : 'play');
    if (window.lucide) lucide.createIcons();
    widget.classList.toggle('playing', isPlaying);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ index }));
  }

  function formatTime(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // คลิกวงกลม = เปิด/ปิด popover ควบคุมเพลง
  orb.addEventListener('click', () => widget.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!widget.contains(e.target)) widget.classList.remove('open');
  });

  playBtn.addEventListener('click', () => {
    if (audio.paused) audio.play().then(() => setPlayingUI(true)).catch(() => {});
    else { audio.pause(); setPlayingUI(false); }
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + playlist.length) % playlist.length;
    loadTrack(index, true);
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % playlist.length;
    loadTrack(index, true);
  });

  // เพลงจบ -> เล่นเพลงถัดไปเสมอ วนลูปทั้งเพลย์ลิสต์ไปเรื่อย ๆ ไม่มีวันหยุด
  audio.addEventListener('ended', () => {
    index = (index + 1) % playlist.length;
    loadTrack(index, true);
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progress.value = pct;
    progress.style.setProperty('--fill', `${pct}%`);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  progress.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
  });

  loadTrack(index, false);

  // ลองเล่นแบบ "มีเสียงเลย" ก่อนเป็นอันดับแรก (ไม่ mute)
  // ถ้าเบราว์เซอร์บล็อก autoplay แบบมีเสียง (นโยบายของเบราว์เซอร์ ไม่ใช่บัค) จะ fallback
  // ไปเล่นแบบ muted ก่อนแล้วปลดเสียงอัตโนมัติทันทีที่ผู้ใช้คลิก/กดคีย์/แตะหน้าจอครั้งแรก
  // เพลงเล่นวนไม่หยุดหลังจากนั้นทั้งสองกรณี
  function unlockUnmute() {
    audio.muted = false;
    document.removeEventListener('click', unlockUnmute);
    document.removeEventListener('keydown', unlockUnmute);
    document.removeEventListener('touchstart', unlockUnmute);
    hideSoundHint();
  }

  const soundHint = document.getElementById('sound-hint');
  function showSoundHint() { if (soundHint) soundHint.classList.add('show'); }
  function hideSoundHint() { if (soundHint) soundHint.classList.remove('show'); }

  audio.muted = false;
  audio.play().then(() => {
    setPlayingUI(true);
  }).catch(() => {
    audio.muted = true;
    audio.play().then(() => {
      setPlayingUI(true);
      showSoundHint();
      document.addEventListener('click', unlockUnmute, { once: true });
      document.addEventListener('keydown', unlockUnmute, { once: true });
      document.addEventListener('touchstart', unlockUnmute, { once: true });
    }).catch(() => setPlayingUI(false));
  });
}
