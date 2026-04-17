let bookmarks = [];
let selectedIndex = -1;
let activeWidget = 'bookmarks';
let newsItems = [];
let selectedNewsIndex = -1;
let allNewsItems = [];
let newsLoadedCount = 3;

let zikrCount = 0;
let islamicMode = false;

const bookmarksContainer = document.getElementById('bookmarks');
const modal = document.getElementById('modal');
const nameInput = document.getElementById('bookmark-name');
const urlInput = document.getElementById('bookmark-url');
const clockEl = document.getElementById('clock');
const calendarEl = document.getElementById('calendar');
const weatherEl = document.getElementById('weather');
const weatherStatus = document.getElementById('weather-status');
const newsEl = document.getElementById('news');
const newsStatus = document.getElementById('news-status');
const bgUpload = document.getElementById('bg-upload');
const asciiBg = document.getElementById('ascii-bg');
const focusModal = document.getElementById('focus-modal');
const focusTimerEl = document.getElementById('focus-timer');
const focusLabelEl = document.getElementById('focus-label');
const focusStatusEl = document.getElementById('focus-status');
const focusCustomInput = document.getElementById('focus-custom');
const focusPresets = document.querySelectorAll('.tui-focus-preset');
const focusPinModal = document.getElementById('focus-pin-modal');
const focusPinHeader = document.getElementById('focus-pin-header');
const focusPinDisplay = document.getElementById('focus-pin-display');
const focusPinHint = document.getElementById('focus-pin-hint');
const settingsModal = document.getElementById('settings-modal');
const themesModal = document.getElementById('themes-modal');
const helpModal = document.getElementById('help-modal');
const prayerEl = document.getElementById('prayer');
const prayerStatus = document.getElementById('prayer-status');
const islamicEl = document.getElementById('islamic');
const zikrCountEl = document.getElementById('zikr-count');
const zikrLabelEl = document.getElementById('zikr-label');
const zikrResetBtn = document.getElementById('zikr-reset');
const zikrListEl = document.getElementById('zikr-list');
const zikrWidget = document.getElementById('widget-zikr');

let focusPresetSelected = null;
let focusPinMode = null;
let focusPinDigits = '';
let focusStoredPin = null;

let calendarDate = new Date();

const quranVerses = [
  { text: "indeed, with hardship comes ease", ref: "surah ash-sharh 94:6", link: "https://quran.com/94/6" },
  { text: "and whoever puts their trust in allah, he will be enough for them", ref: "surah at-talaq 65:3", link: "https://quran.com/65/3" },
  { text: "allah does not burden a soul beyond that it can bear", ref: "surah al-baqarah 2:286", link: "https://quran.com/2/286" },
  { text: "so remember me and i will remember you", ref: "surah al-baqarah 2:152", link: "https://quran.com/2/152" },
  { text: "and he found you lost and guided you", ref: "surah ad-duha 93:7", link: "https://quran.com/93/7" },
  { text: "my mercy encompasses all things", ref: "surah al-a'raf 7:156", link: "https://quran.com/7/156" },
  { text: "and your lord is going to give you, and you will be satisfied", ref: "surah ad-duha 93:5", link: "https://quran.com/93/5" },
  { text: "verily, allah is with the patient", ref: "surah al-baqarah 2:153", link: "https://quran.com/2/153" },
  { text: "and when my servants ask you about me, indeed i am near", ref: "surah al-baqarah 2:186", link: "https://quran.com/2/186" },
  { text: "and whoever fears allah, he will make for him a way out", ref: "surah at-talaq 65:2", link: "https://quran.com/65/2" },
  { text: "and say: my lord, increase me in knowledge", ref: "surah taha 20:114", link: "https://quran.com/20/114" },
  { text: "and do good; indeed, allah loves the doers of good", ref: "surah al-baqarah 2:195", link: "https://quran.com/2/195" }
];

const hadiths = [
  { text: "the best among you are those who have the best manners and character", ref: "bukhari 6029", link: "https://sunnah.com/bukhari:6029" },
  { text: "none of you truly believes until he loves for his brother what he loves for himself", ref: "bukhari 13", link: "https://sunnah.com/bukhari:13" },
  { text: "whoever believes in allah and the last day, let him speak good or remain silent", ref: "bukhari 6018", link: "https://sunnah.com/bukhari:6018" },
  { text: "the strong person is not the one who can wrestle, but the one who controls himself in anger", ref: "bukhari 6114", link: "https://sunnah.com/bukhari:6114" },
  { text: "make things easy and do not make them difficult, cheer people up and do not repel them", ref: "bukhari 69", link: "https://sunnah.com/bukhari:69" },
  { text: "allah is gentle and loves gentleness in all matters", ref: "bukhari 6927", link: "https://sunnah.com/bukhari:6927" },
  { text: "the most beloved of deeds to allah are the most consistent of them, even if they are small", ref: "bukhari 6464", link: "https://sunnah.com/bukhari:6464" },
  { text: "a good word is charity", ref: "bukhari 2989", link: "https://sunnah.com/bukhari:2989" }
];

const zikrSuggestions = [
  { arabic: "سُبْحَانَ ٱللَّٰهِ", transliteration: "subhanallah", translation: "glory be to allah", source: "quran 39:75" },
  { arabic: "ٱلْحَمْدُ لِلَّٰهِ", transliteration: "alhamdulillah", translation: "all praise is due to allah", source: "quran 1:2" },
  { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "allahu akbar", translation: "allah is the greatest", source: "quran 22:30" },
  { arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ", transliteration: "la ilaha illallah", translation: "there is no god but allah", source: "quran 37:35" },
  { arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", transliteration: "astaghfirullah", translation: "i seek forgiveness from allah", source: "quran 110:3" },
  { arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ", transliteration: "la hawla wa la quwwata illa billah", translation: "there is no power nor strength except with allah", source: "quran 18:39" },
  { arabic: "مَاشَاءَ ٱللَّٰهُ", transliteration: "masha'allah", translation: "what allah has willed", source: "quran 18:39" },
  { arabic: "إِنَّا لِلَّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", transliteration: "inna lillahi wa inna ilayhi raji'un", translation: "indeed we belong to allah, and indeed to him we will return", source: "quran 2:156" },
  { arabic: "رَبَّنَا آتِنَا فِي ٱلدُّنْيَا حَسَنَةً وَفِي ٱلْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ", transliteration: "rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar", translation: "our lord, give us in this world good and in the hereafter good and protect us from the punishment of the fire", source: "quran 2:201" },
  { arabic: "حَسْبُنَا ٱللَّٰهُ وَنِعْمَ ٱلْوَكِيلُ", transliteration: "hasbunallahu wa ni'mal wakil", translation: "allah is sufficient for us, and he is the best disposer of affairs", source: "quran 3:173" }
];

async function getSettings() {
  const result = await chrome.storage.local.get(['tempUnit', 'clockFormat']);
  return {
    tempUnit: result.tempUnit || 'celsius',
    clockFormat: result.clockFormat || '24h'
  };
}

async function loadBookmarks() {
  const result = await chrome.storage.local.get('bookmarks');
  bookmarks = result.bookmarks || [];
  render();
  if (bookmarks.length > 0) {
    selectedIndex = 0;
    render();
  }
}

async function saveBookmarks() {
  await chrome.storage.local.set({ bookmarks });
}

function getFaviconUrl(url) {
  try {
    const domain = new URL(url).origin;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return '';
  }
}

function render() {
  if (bookmarks.length === 0) {
    bookmarksContainer.innerHTML = `
      <div class="tui-empty">
        <div>no bookmarks yet</div>
        <div class="tui-empty-hint">press <span>[a]</span> to add one</div>
      </div>
    `;
    selectedIndex = -1;
    document.getElementById('widget-bookmarks').classList.remove('widget-active');
    return;
  }

  bookmarksContainer.innerHTML = bookmarks.map((bm, i) => `
    <a class="tui-bookmark ${activeWidget === 'bookmarks' && i === selectedIndex ? 'selected' : ''}" 
       href="${escapeHtml(bm.url)}" 
       data-index="${i}">
      <span class="tui-bookmark-index">${String(i).padStart(2, '0')}</span>
      <img class="tui-bookmark-icon" src="${getFaviconUrl(bm.url)}" alt="" onerror="this.style.display='none'">
      <span class="tui-bookmark-name">${escapeHtml(bm.name)}</span>
      <span class="tui-bookmark-url">${escapeHtml(bm.url.replace(/^https?:\/\//, ''))}</span>
      <span class="tui-bookmark-delete" data-delete="${i}" title="delete">✕</span>
    </a>
  `).join('');

  document.getElementById('widget-bookmarks').classList.toggle('widget-active', activeWidget === 'bookmarks');

  document.querySelectorAll('.tui-bookmark').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('tui-bookmark-delete')) {
        e.preventDefault();
        deleteBookmark(parseInt(e.target.dataset.delete));
      }
    });
  });
}

function renderNews() {
  if (newsItems.length === 0) return;
  newsEl.innerHTML = newsItems.map((item, i) => {
    const source = item.author || 'reddit';
    const title = item.title;
    return `
      <a class="tui-news-item ${activeWidget === 'news' && i === selectedNewsIndex ? 'selected' : ''}" href="${escapeHtml(item.link)}" target="_blank" rel="noopener" data-news-index="${i}">
        <span class="tui-news-index">${String(i + 1).padStart(2, '0')}</span>
        <span class="tui-news-title">${escapeHtml(title)}</span>
        <span class="tui-news-source">${escapeHtml(source.toLowerCase())}</span>
      </a>
    `;
  }).join('');

  if (selectedNewsIndex >= 0 && selectedNewsIndex < newsItems.length) {
    const selectedEl = newsEl.querySelector(`[data-news-index="${selectedNewsIndex}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }
}

function loadMoreNews() {
  if (newsLoadedCount >= allNewsItems.length) return;
  const nextBatch = allNewsItems.slice(newsLoadedCount, newsLoadedCount + 3);
  newsItems = newsItems.concat(nextBatch);
  newsLoadedCount += 3;
  renderNews();
  newsStatus.textContent = `${newsLoadedCount}/${allNewsItems.length}`;
  setTimeout(() => {
    if (newsStatus.textContent === `${newsLoadedCount}/${allNewsItems.length}`) {
      newsStatus.textContent = '';
    }
  }, 2000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function addBookmark(name, url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  bookmarks.push({ name, url });
  saveBookmarks();
  render();
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  if (selectedIndex >= bookmarks.length) {
    selectedIndex = bookmarks.length - 1;
  }
  saveBookmarks();
  render();
}

function showModal() {
  modal.classList.add('visible');
  nameInput.value = '';
  urlInput.value = '';
  nameInput.focus();
}

function hideModal() {
  modal.classList.remove('visible');
}

function showFocusModal() {
  focusModal.classList.add('visible');
  focusPresetSelected = null;
  focusCustomInput.value = '';
  focusPresets.forEach(p => p.classList.remove('selected'));
  focusCustomInput.focus();
}

function hideFocusModal() {
  focusModal.classList.remove('visible');
}

function showFocusPinModal(mode) {
  focusPinMode = mode;
  focusPinDigits = '';
  focusPinModal.classList.add('visible');
  if (mode === 'set') {
    focusPinHeader.textContent = 'set pin';
    focusPinHint.textContent = 'enter a 4-digit pin';
    focusPinHint.classList.remove('error');
  } else {
    focusPinHeader.textContent = 'enter pin';
    focusPinHint.textContent = 'enter your pin to stop focus';
    focusPinHint.classList.remove('error');
  }
  updatePinDisplay();
}

function hideFocusPinModal() {
  focusPinModal.classList.remove('visible');
  focusPinMode = null;
  focusPinDigits = '';
}

function updatePinDisplay() {
  const dots = focusPinDisplay.querySelectorAll('.tui-pin-dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('filled', 'error');
    if (i < focusPinDigits.length) {
      dot.classList.add('filled');
    }
  });
}

function handlePinInput(digit) {
  if (focusPinDigits.length >= 4) return;
  focusPinDigits += digit;
  updatePinDisplay();

  if (focusPinDigits.length === 4) {
    setTimeout(() => {
      if (focusPinMode === 'set') {
        focusStoredPin = focusPinDigits;
        focusPinMode = 'confirm';
        focusPinDigits = '';
        focusPinHeader.textContent = 'confirm pin';
        focusPinHint.textContent = 're-enter your pin';
        focusPinHint.classList.remove('error');
        updatePinDisplay();
      } else if (focusPinMode === 'confirm') {
        if (focusPinDigits === focusStoredPin) {
          hideFocusPinModal();
          hideFocusModal();
          startFocusTimer(focusPresetSelected || parseInt(focusCustomInput.value) || 25);
        } else {
          showPinError('pins do not match');
        }
      } else if (focusPinMode === 'stop') {
        chrome.storage.local.get('focusPin').then(res => {
          if (focusPinDigits === res.focusPin) {
            stopFocusTimer();
            hideFocusPinModal();
          } else {
            showPinError('incorrect pin');
          }
        });
      }
    }, 200);
  }
}

function showPinError(msg) {
  focusPinHint.textContent = msg;
  focusPinHint.classList.add('error');
  const dots = focusPinDisplay.querySelectorAll('.tui-pin-dot');
  dots.forEach(dot => {
    dot.classList.remove('filled');
    dot.classList.add('error');
  });
  setTimeout(() => {
    focusPinDigits = '';
    updatePinDisplay();
    if (focusPinMode === 'set') {
      focusPinHeader.textContent = 'set pin';
      focusPinHint.textContent = 'enter a 4-digit pin';
    } else if (focusPinMode === 'confirm') {
      focusPinHeader.textContent = 'confirm pin';
      focusPinHint.textContent = 're-enter your pin';
    } else if (focusPinMode === 'stop') {
      focusPinHint.textContent = 'enter your pin to stop focus';
    }
    focusPinHint.classList.remove('error');
  }, 800);
}

function startFocusTimer(minutes) {
  const endTime = Date.now() + minutes * 60000;
  chrome.storage.local.set({ focusTimer: { endTime, minutes }, focusPin: focusStoredPin });
  chrome.runtime.sendMessage({ action: 'enableBlock' });
  focusStoredPin = null;
  updateFocusDisplay();
}

function stopFocusTimer() {
  chrome.storage.local.remove(['focusTimer', 'focusPin']);
  chrome.runtime.sendMessage({ action: 'disableBlock' });
  updateFocusDisplay();
}

async function updateFocusDisplay() {
  const result = await chrome.storage.local.get('focusTimer');
  if (result.focusTimer && result.focusTimer.endTime) {
    const remaining = result.focusTimer.endTime - Date.now();
    if (remaining <= 0) {
      stopFocusTimer();
      return;
    }
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (focusTimerEl) {
      focusTimerEl.textContent = timerStr;
      focusTimerEl.classList.add('active');
    }
    if (focusLabelEl) {
      focusLabelEl.innerHTML = 'press <span>[f]</span> to stop';
    }
    if (focusStatusEl) {
      focusStatusEl.textContent = 'active';
    }
  } else {
    if (focusTimerEl) {
      focusTimerEl.textContent = '--:--';
      focusTimerEl.classList.remove('active');
    }
    if (focusLabelEl) {
      focusLabelEl.innerHTML = 'press <span>[f]</span> to start';
    }
    if (focusStatusEl) {
      focusStatusEl.textContent = '';
    }
  }
}

async function updateClock() {
  const now = new Date();
  const settings = await getSettings();
  const is24h = settings.clockFormat === '24h';
  const time = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: !is24h
  });
  const date = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  clockEl.innerHTML = `
    <div class="tui-clock-time">${time}</div>
    <div class="tui-clock-date">${date}</div>
  `;
}

function renderCalendar() {
  const today = new Date();
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const dayNames = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  let html = `
    <div class="tui-calendar-header">
      <span class="tui-calendar-month">${monthNames[month]} ${year}</span>
      <div class="tui-calendar-nav">
        <button class="tui-calendar-nav-btn" id="cal-prev">◀</button>
        <button class="tui-calendar-nav-btn" id="cal-next">▶</button>
      </div>
    </div>
    <div class="tui-calendar-grid">
  `;

  dayNames.forEach(d => {
    html += `<div class="tui-calendar-day-header">${d}</div>`;
  });

  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="tui-calendar-day other-month">${daysInPrevMonth - i}</div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    html += `<div class="tui-calendar-day${isToday ? ' today' : ''}">${d}</div>`;
  }

  const totalCells = firstDay + daysInMonth;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="tui-calendar-day other-month">${i}</div>`;
  }

  html += `</div>`;
  calendarEl.innerHTML = html;

  document.getElementById('cal-prev').addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById('cal-next').addEventListener('click', () => {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderCalendar();
  });
}

async function fetchWeather() {
  try {
    const response = await fetch('https://wttr.in/?format=j1');
    const data = await response.json();
    const current = data.current_condition[0];
    const settings = await getSettings();
    let temp, feelsLike, unit;
    if (settings.tempUnit === 'fahrenheit') {
      temp = current.temp_F;
      feelsLike = current.FeelsLikeF;
      unit = '°F';
    } else {
      temp = current.temp_C;
      feelsLike = current.FeelsLikeC;
      unit = '°C';
    }
    const desc = current.weatherDesc[0].value;
    const humidity = current.humidity;
    const wind = current.windspeedKmph;
    const area = data.nearest_area[0];
    const location = `${area.areaName[0].value}, ${area.country[0].value}`;

    weatherEl.innerHTML = `
      <div class="tui-weather-main">
        <div class="tui-weather-temp">${temp}${unit}</div>
        <div class="tui-weather-desc">${desc}</div>
      </div>
      <div class="tui-weather-details">
        <div>feels like ${feelsLike}${unit}</div>
        <div>humidity: ${humidity}%</div>
        <div>wind: ${wind} km/h</div>
        <div>${location}</div>
      </div>
    `;
    weatherStatus.textContent = '';
  } catch (err) {
    weatherEl.innerHTML = `<div class="tui-weather-empty">unable to fetch weather</div>`;
    weatherStatus.textContent = 'error';
  }
}

async function fetchNews() {
  try {
    const response = await fetch('https://www.reddit.com/r/news/.json?limit=30');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (!data.data || !data.data.children || data.data.children.length === 0) {
      throw new Error('no items');
    }

    allNewsItems = data.data.children.map(child => ({
      title: child.data.title,
      link: `https://reddit.com${child.data.permalink}`,
      author: child.data.author || 'reddit',
      pubDate: new Date(child.data.created_utc * 1000).toISOString()
    }));

    newsItems = allNewsItems.slice(0, 3);
    newsLoadedCount = 3;
    selectedNewsIndex = 0;
    renderNews();
    newsStatus.textContent = '';
  } catch (err) {
    newsEl.innerHTML = `<div class="tui-news-empty">unable to fetch news</div>`;
    newsStatus.textContent = 'error';
  }
}

function imageToAscii(image, maxCols = 200) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const aspectRatio = image.height / image.width;
    const charAspectRatio = 0.55;
    const cols = maxCols;
    const rows = Math.round(cols * aspectRatio * charAspectRatio);

    canvas.width = cols;
    canvas.height = Math.min(rows, 120);

    ctx.drawImage(image, 0, 0, cols, canvas.height);
    const imageData = ctx.getImageData(0, 0, cols, canvas.height);
    const pixels = imageData.data;

    const brightnesses = [];
    for (let i = 0; i < pixels.length; i += 4) {
      brightnesses.push(0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]);
    }

    const sorted = [...brightnesses].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * 0.02)];
    const hi = sorted[Math.floor(sorted.length * 0.98)];
    const range = hi - lo || 1;

    const chars = " .',:;clodxkO0KX@";
    let html = '';

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        const normalized = Math.max(0, Math.min(1, (brightness - lo) / range));
        const corrected = Math.pow(normalized, 0.8);
        const charIndex = Math.min(chars.length - 1, Math.floor(corrected * chars.length));
        const ch = chars[charIndex];
        if (ch === ' ') {
          html += ' ';
        } else {
          html += `<span style="color:rgb(${r},${g},${b})">${ch}</span>`;
        }
      }
      html += '\n';
    }

    resolve(html);
  });
}

async function handleImageUpload(file) {
  const img = new Image();
  img.onload = async () => {
    const ascii = await imageToAscii(img, 200);
    renderAsciiBg(ascii);
    const reader = new FileReader();
    reader.onload = async (e) => {
      await chrome.storage.local.set({ bgImage: e.target.result });
    };
    reader.readAsDataURL(file);
  };
  img.src = URL.createObjectURL(file);
}

async function loadAsciiBg() {
  const result = await chrome.storage.local.get('bgImage');
  if (result.bgImage) {
    const img = new Image();
    img.onload = async () => {
      const ascii = await imageToAscii(img, 200);
      renderAsciiBg(ascii);
    };
    img.src = result.bgImage;
  }
}

function renderAsciiBg(ascii) {
  asciiBg.innerHTML = `<pre>${ascii}</pre>`;
  document.body.classList.add('has-ascii-bg');
  const pre = asciiBg.querySelector('pre');

  const bgStatus = document.getElementById('bg-status');
  if (bgStatus) {
    bgStatus.innerHTML = 'press <span>[r]</span> to remove bg';
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const containerW = window.innerWidth;
      const containerH = window.innerHeight;
      const preW = pre.scrollWidth;
      const preH = pre.scrollHeight;

      if (preW > 0 && preH > 0) {
        const scaleX = containerW / preW;
        const scaleY = containerH / preH;
        const scale = Math.max(scaleX, scaleY);
        pre.style.transform = `scale(${scale})`;
      }
    });
  });
}

function removeAsciiBg() {
  asciiBg.innerHTML = '';
  document.body.classList.remove('has-ascii-bg');
  chrome.storage.local.remove('bgImage');
  const bgStatus = document.getElementById('bg-status');
  if (bgStatus) {
    bgStatus.innerHTML = '';
  }
}

async function fetchPrayerTimes() {
  try {
    const response = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('timeout')), 10000);
      chrome.runtime.sendMessage({ action: 'getPrayerTimes' }, (res) => {
        clearTimeout(timeout);
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(res);
        }
      });
    });

    if (!response || !response.success) {
      throw new Error(response?.error || 'no response');
    }

    const timings = response.timings;
    const prayers = [
      { name: 'fajr', time: timings.Fajr },
      { name: 'sunrise', time: timings.Sunrise },
      { name: 'dhuhr', time: timings.Dhuhr },
      { name: 'asr', time: timings.Asr },
      { name: 'maghrib', time: timings.Maghrib },
      { name: 'isha', time: timings.Isha }
    ];

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let currentPrayer = -1;
    for (let i = prayers.length - 1; i >= 0; i--) {
      const [h, m] = prayers[i].time.split(':').map(Number);
      if (currentMinutes >= h * 60 + m) {
        currentPrayer = i;
        break;
      }
    }

    prayerEl.innerHTML = prayers.map((p, i) => `
      <div class="tui-prayer-item ${i === currentPrayer ? 'current' : ''}">
        <span class="tui-prayer-name">${p.name}</span>
        <span class="tui-prayer-time">${p.time}</span>
      </div>
    `).join('');
    prayerStatus.textContent = '';
  } catch (err) {
    prayerEl.innerHTML = `<div class="tui-weather-empty">unable to fetch prayer times</div>`;
    prayerStatus.textContent = 'error';
  }
}

function renderIslamic() {
  const items = [];
  const verseIdx = Math.floor(Math.random() * quranVerses.length);
  const hadithIdx = Math.floor(Math.random() * hadiths.length);

  items.push({ type: 'quran', ...quranVerses[verseIdx] });
  items.push({ type: 'hadith', ...hadiths[hadithIdx] });

  let nextHadith = (hadithIdx + 1) % hadiths.length;
  items.push({ type: 'hadith', ...hadiths[nextHadith] });

  islamicEl.innerHTML = items.map(item => `
    <a class="tui-islamic-item" href="${escapeHtml(item.link)}" target="_blank" rel="noopener">
      <div class="tui-islamic-type">${item.type}</div>
      <div class="tui-islamic-text">"${item.text}"</div>
      <div class="tui-islamic-ref">${item.ref}</div>
    </a>
  `).join('');
}

function incrementZikr() {
  zikrCount++;
  zikrCountEl.textContent = zikrCount;
  chrome.storage.local.set({ zikrCount });
}

function resetZikr() {
  zikrCount = 0;
  zikrCountEl.textContent = '0';
  chrome.storage.local.set({ zikrCount });
}

function renderZikrList() {
  zikrListEl.innerHTML = zikrSuggestions.map(zikr => `
    <div class="tui-zikr-item">
      <div class="tui-zikr-arabic">${zikr.arabic}</div>
      <div class="tui-zikr-transliteration">${zikr.transliteration}</div>
      <div class="tui-zikr-translation">${zikr.translation}</div>
      <div class="tui-zikr-source">${zikr.source}</div>
    </div>
  `).join('');
}

function toggleIslamicMode() {
  islamicMode = !islamicMode;
  chrome.storage.local.set({ islamicMode });

  const prayerWidget = document.getElementById('widget-prayer');
  const newsWidget = document.getElementById('widget-news');
  const islamicWidget = document.getElementById('widget-islamic');

  if (islamicMode) {
    document.body.classList.add('islamic-mode');
    prayerWidget.style.display = 'flex';
    newsWidget.style.display = 'none';
    islamicWidget.style.display = 'flex';
    zikrWidget.style.display = 'flex';
    fetchPrayerTimes();
    renderIslamic();
    renderZikrList();
  } else {
    document.body.classList.remove('islamic-mode');
    prayerWidget.style.display = 'none';
    newsWidget.style.display = 'flex';
    islamicWidget.style.display = 'none';
    zikrWidget.style.display = 'none';
  }
}

function isFocusModalVisible() {
  return focusModal.classList.contains('visible');
}

function isFocusPinModalVisible() {
  return focusPinModal.classList.contains('visible');
}

function isSettingsModalVisible() {
  return settingsModal.classList.contains('visible');
}

function isThemesModalVisible() {
  return themesModal.classList.contains('visible');
}

function isHelpModalVisible() {
  return helpModal.classList.contains('visible');
}

function showHelpModal() {
  helpModal.classList.add('visible');
}

function hideHelpModal() {
  helpModal.classList.remove('visible');
}

function showThemesModal() {
  themesModal.classList.add('visible');
  loadThemeSelection();
}

function hideThemesModal() {
  themesModal.classList.remove('visible');
}

async function loadThemeSelection() {
  const result = await chrome.storage.local.get('theme');
  const currentTheme = result.theme || 'tui-dark';
  document.querySelectorAll('.tui-theme-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.theme === currentTheme);
  });
}

async function applyTheme(themeName) {
  document.body.classList.remove(
    'theme-monokai', 'theme-one-dark', 'theme-catppuccin', 'theme-dracula',
    'theme-nord', 'theme-gruvbox', 'theme-solarized', 'theme-rose-pine'
  );
  if (themeName !== 'tui-dark') {
    document.body.classList.add(`theme-${themeName}`);
  }
  await chrome.storage.local.set({ theme: themeName });
  loadThemeSelection();
}

function navigateTheme(direction) {
  const cards = Array.from(document.querySelectorAll('.tui-theme-card'));
  const currentIndex = cards.findIndex(c => c.classList.contains('selected'));
  const cols = 4;
  let newIndex;
  if (currentIndex === -1) {
    newIndex = 0;
  } else if (direction === 1) {
    newIndex = currentIndex + 1;
    if (newIndex >= cards.length) newIndex = 0;
  } else if (direction === -1) {
    newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = cards.length - 1;
  } else if (direction === 'down') {
    newIndex = currentIndex + cols;
    if (newIndex >= cards.length) newIndex = currentIndex;
  } else if (direction === 'up') {
    newIndex = currentIndex - cols;
    if (newIndex < 0) newIndex = currentIndex;
  }
  cards.forEach(c => c.classList.remove('selected'));
  cards[newIndex].classList.add('selected');
}

function showSettingsModal() {
  settingsModal.classList.add('visible');
  loadSettingsOptions();
}

function hideSettingsModal() {
  settingsModal.classList.remove('visible');
}

async function loadSettingsOptions() {
  const settings = await getSettings();
  document.querySelectorAll('#temp-options .tui-settings-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.value === settings.tempUnit);
  });
  document.querySelectorAll('#clock-options .tui-settings-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.value === settings.clockFormat);
  });
}

async function saveSetting(key, value) {
  await chrome.storage.local.set({ [key]: value });
  if (key === 'tempUnit') {
    fetchWeather();
  }
  if (key === 'clockFormat') {
    updateClock();
  }
}

document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('visible')) {
    if (e.key === 'Escape') {
      hideModal();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const name = nameInput.value.trim();
      const url = urlInput.value.trim();
      if (name && url) {
        addBookmark(name, url);
        hideModal();
      }
      e.preventDefault();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (document.activeElement === nameInput) {
        urlInput.focus();
      } else {
        nameInput.focus();
      }
    }
    return;
  }

  if (isHelpModalVisible()) {
    if (e.key === 'Escape') {
      hideHelpModal();
      e.preventDefault();
    }
    return;
  }

  if (isThemesModalVisible()) {
    if (e.key === 'Escape') {
      hideThemesModal();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const selected = document.querySelector('.tui-theme-card.selected');
      if (selected) {
        applyTheme(selected.dataset.theme);
      }
      hideThemesModal();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateTheme(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateTheme(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateTheme('down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateTheme('up');
    }
    return;
  }

  if (isSettingsModalVisible()) {
    if (e.key === 'Escape') {
      hideSettingsModal();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      hideSettingsModal();
      e.preventDefault();
    }
    return;
  }

  if (isFocusPinModalVisible()) {
    if (e.key === 'Escape') {
      hideFocusPinModal();
      e.preventDefault();
    } else if (/^[0-9]$/.test(e.key)) {
      handlePinInput(e.key);
      e.preventDefault();
    }
    return;
  }

  if (isFocusModalVisible()) {
    if (e.key === 'Escape') {
      hideFocusModal();
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const custom = focusCustomInput.value.trim();
      const minutes = focusPresetSelected || (custom ? parseInt(custom) : null);
      if (minutes && minutes > 0) {
        showFocusPinModal('set');
      }
      e.preventDefault();
    }
    return;
  }

  if (e.key === 'h' || e.key === 'H') {
    showHelpModal();
    e.preventDefault();
    return;
  }

  if (e.key === 't' || e.key === 'T') {
    showThemesModal();
    e.preventDefault();
    return;
  }

  if (e.key === 's' || e.key === 'S') {
    showSettingsModal();
    e.preventDefault();
    return;
  }

  if (e.key === 'f' || e.key === 'F') {
    chrome.storage.local.get('focusTimer').then(res => {
      if (res.focusTimer && res.focusTimer.endTime) {
        showFocusPinModal('stop');
      } else {
        showFocusModal();
      }
    });
    e.preventDefault();
    return;
  }

  if (e.key === 'z' || e.key === 'Z') {
    if (islamicMode && !modal.classList.contains('visible') && !isFocusModalVisible() && !isFocusPinModalVisible() && !isSettingsModalVisible() && !isThemesModalVisible() && !isHelpModalVisible()) {
      incrementZikr();
      e.preventDefault();
    }
    return;
  }

  if (e.key === 'e' || e.key === 'E') {
    toggleIslamicMode();
    e.preventDefault();
    return;
  }

  if (e.key === 'r' || e.key === 'R') {
    if (!e.metaKey && !e.ctrlKey) {
      removeAsciiBg();
      e.preventDefault();
    }
    return;
  }

  if (e.key === 'i' || e.key === 'I') {
    bgUpload.click();
    e.preventDefault();
  } else if (e.key === 'a' || e.key === 'A') {
    showModal();
    e.preventDefault();
  } else if (e.key === 'd' || e.key === 'D') {
    if (activeWidget === 'bookmarks' && selectedIndex >= 0) {
      deleteBookmark(selectedIndex);
      e.preventDefault();
    }
  } else if (e.key === 'ArrowUp') {
    if (activeWidget === 'bookmarks' && bookmarks.length > 0) {
      selectedIndex = Math.max(0, selectedIndex - 1);
      render();
      e.preventDefault();
    } else if (activeWidget === 'news') {
      if (selectedNewsIndex > 0) {
        selectedNewsIndex--;
        renderNews();
      } else {
        selectedNewsIndex = -1;
        renderNews();
        activeWidget = 'bookmarks';
        selectedIndex = bookmarks.length > 0 ? bookmarks.length - 1 : 0;
        render();
      }
      e.preventDefault();
    }
  } else if (e.key === 'ArrowDown') {
    if (activeWidget === 'bookmarks') {
      if (selectedIndex < bookmarks.length - 1 && bookmarks.length > 0) {
        selectedIndex++;
        render();
      } else if (bookmarks.length > 0) {
        selectedIndex = -1;
        activeWidget = 'news';
        selectedNewsIndex = 0;
        render();
        renderNews();
      }
      e.preventDefault();
    } else if (activeWidget === 'news') {
      if (selectedNewsIndex < newsItems.length - 1) {
        selectedNewsIndex++;
        if (selectedNewsIndex >= newsLoadedCount - 2) {
          loadMoreNews();
        }
        renderNews();
      }
      e.preventDefault();
    }
  } else if (e.key === 'Enter') {
    if (activeWidget === 'bookmarks' && selectedIndex >= 0) {
      window.location.href = bookmarks[selectedIndex].url;
      e.preventDefault();
    } else if (activeWidget === 'news' && newsItems.length > 0 && selectedNewsIndex >= 0) {
      window.open(newsItems[selectedNewsIndex].link, '_blank');
      e.preventDefault();
    }
  } else if (/^[0-9]$/.test(e.key)) {
    if (activeWidget === 'bookmarks') {
      const num = parseInt(e.key);
      if (num < bookmarks.length) {
        selectedIndex = num;
        render();
        e.preventDefault();
      }
    } else if (activeWidget === 'news') {
      const num = parseInt(e.key);
      if (num <= newsItems.length) {
        window.open(newsItems[num - 1].link, '_blank');
        e.preventDefault();
      }
    }
  }
});

newsEl.addEventListener('scroll', () => {
  if (newsEl.scrollTop + newsEl.clientHeight >= newsEl.scrollHeight - 10) {
    loadMoreNews();
  }
});

bgUpload.addEventListener('change', (e) => {
  if (e.target.files[0]) {
    handleImageUpload(e.target.files[0]);
  }
});

focusPresets.forEach(preset => {
  preset.addEventListener('click', () => {
    focusPresets.forEach(p => p.classList.remove('selected'));
    preset.classList.add('selected');
    focusPresetSelected = parseInt(preset.dataset.minutes);
    focusCustomInput.value = '';
  });
});

document.querySelectorAll('#temp-options .tui-settings-option').forEach(opt => {
  opt.addEventListener('click', () => {
    saveSetting('tempUnit', opt.dataset.value);
    loadSettingsOptions();
  });
});

document.querySelectorAll('#clock-options .tui-settings-option').forEach(opt => {
  opt.addEventListener('click', () => {
    saveSetting('clockFormat', opt.dataset.value);
    loadSettingsOptions();
  });
});

document.querySelectorAll('.tui-theme-card').forEach(card => {
  card.addEventListener('click', () => {
    applyTheme(card.dataset.theme);
  });
});

updateClock();
setInterval(updateClock, 1000);
updateFocusDisplay();
setInterval(updateFocusDisplay, 1000);
renderCalendar();
loadBookmarks();
loadAsciiBg();
fetchWeather();
fetchNews();

(async function loadSavedTheme() {
  const result = await chrome.storage.local.get('theme');
  let theme = result.theme || 'tui-dark';
  if (theme === 'solarized-dark') theme = 'solarized';
  if (theme !== 'tui-dark') {
    document.body.classList.add(`theme-${theme}`);
  }
})();

(async function loadIslamicMode() {
  const result = await chrome.storage.local.get(['islamicMode', 'zikrCount']);
  if (result.islamicMode) {
    islamicMode = true;
    document.body.classList.add('islamic-mode');
    document.getElementById('widget-prayer').style.display = 'flex';
    document.getElementById('widget-news').style.display = 'none';
    document.getElementById('widget-islamic').style.display = 'flex';
    document.getElementById('widget-zikr').style.display = 'flex';
    fetchPrayerTimes();
    renderIslamic();
    renderZikrList();
  }
  if (result.zikrCount) {
    zikrCount = result.zikrCount;
    zikrCountEl.textContent = zikrCount;
  }
})();

zikrResetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetZikr();
});

window.addEventListener('load', () => {
  document.body.setAttribute('tabindex', '-1');
  document.body.focus();
  const escEvent = new KeyboardEvent('keydown', {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    which: 27,
    bubbles: true
  });
  document.dispatchEvent(escEvent);
  document.body.dispatchEvent(escEvent);
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
});
