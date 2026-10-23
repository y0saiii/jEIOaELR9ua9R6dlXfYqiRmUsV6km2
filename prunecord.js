(function prunecord() {
  if (window.__prunecordLoaded) { window.__prunecordToggle?.(); return; }
  window.__prunecordLoaded = true;

  const LOGO = chrome.runtime.getURL('assets/logo.png');
  const VER  = '4.7.0';

  const IC = {
    trash:    `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>`,
    ghost:    `<path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>`,
    message:  `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
    scroll:   `<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/>`,
    settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
    refresh:  `<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>`,
    x:        `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
    eye:      `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
    eyeoff:   `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>`,
    square:   `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>`,
    pause:    `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`,
    play:     `<polygon points="5 3 19 12 5 21 5 3"/>`,
    alert:    `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
    filter:   `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    search:   `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>`,
    loader:   `<path d="M21 12a9 9 0 1 1-6.219-8.56"/>`,
    download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
    check:    `<path d="M20 6 9 17l-5-5"/>`,
    'check-sq': `<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`,
    minus:    `<line x1="5" y1="12" x2="19" y2="12"/>`,
    bot:      `<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>`,
    clock:    `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    bar:      `<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>`,
    key:      `<path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>`,
    info:     `<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
    eraser:   `<path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>`,
    regex:    `<path d="M9 2v8l-2 2 2 2v8"/><path d="m15 2 1 5 4-3-2 5h4"/><path d="m15 22-1-5-4 3 2-5h-4"/>`,
    grid:     `<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>`,
    shield:   `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>`,
    zap:      `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    copy:     `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,
    user:     `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>`,
    arrow:    `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
    server:   `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`,
    crown:    `<path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/>`,
    target:   `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
    flame:    `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>`,
    layers:   `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
    terminal:`<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>`,
    moon:     `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
    maximize:`<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>`,
    minimize:`<path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>`,
    send:     `<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>`,
  };
  const ic = (name, size = 15) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">${IC[name] ?? ''}</svg>`;

  const CHANGELOG = [
    { v: '4.7.0', date: 'October 2026', tag: 'Major', notes: [
      'New Download tab that archives messages from a channel, a DM, or a whole server',
      'Pick any time range, or grab the entire history, with quick presets for 7, 30, 90 days and 1 year',
      'Six export formats, JSON, NDJSON, plain text, Markdown, styled HTML and CSV',
      'Filters for author, keyword or regex, bots, attachments and embeds, plus a message limit',
      'Live counters, a download log, a preview of the newest entries and automatic saving',
      'Auto-detect token button, IsraelCord now finds your session itself, no copy and paste needed',
      'Feedback box rebuilt, one message every 4 hours, sent straight to the creator',
      'Bug report form removed completely',
      'Fixed the shadow is not defined crash that broke the panel after the last build',
      'Help tab now explains the Download tool as well'
    ]},
    { v: '4.6.0', date: 'October 2026', tag: 'Feature', notes: [
      'Download tab for saving messages with time range and format options',
      'Suggestions and the old report form merged into one Feedback box'
    ]},
    { v: '4.5.0', date: 'September 2026', tag: 'Minor', notes: [
      'The panel is now a floating window, drag it anywhere by its title bar',
      'Launch button inside Discord\'s top title bar, next to Inbox and Help',
      'The window remembers its position between sessions',
      'New maximize button next to the close button',
      'Window size is adjustable by dragging the corner and is remembered',
      'Operation logs can stream into the main window or a separate draggable terminal, pick one in Settings',
      'Progress notifications at 25%, 50%, 75% and when a purge finishes, toggleable in Settings',
      'The purple glow and green gradient lines from the last build are gone',
      'The window closes cleanly with no shadow left on the edge',
      'Purge confirmations now show the account being purged',
      'Feedback box on the Home page, send your ideas straight to the creator',
      'New Help tab explaining every tool and how to use it safely',
      'A guided tour walks new users through every tool with highlights around each button'
    ]},
    { v: '4.5.00001', date: 'September 2026', tag: 'Patch', notes: [
      'Extension got seized by the mossad'
    ]},
    { v: '4.0.0', date: 'September 2026', tag: 'Major', notes: [
      'New Home dashboard with your avatar and one-click actions',
      'Tab bar on the side with an icon for every tool',
      'Server Purge tab, delete your messages across an entire server at once',
      'Safe Mode for Prune and DMs, deletes in batches of 50 with scheduled pauses',
      'Dry Run previews what would be deleted without deleting anything',
      'Confirmation window before any purge starts',
      'Animated aurora background, glass panels and texture',
      'Lifetime statistics and a recent activity feed',
      'Pause / Resume and Stop controls while anything is running',
      'Deletes-per-minute rate and elapsed timer',
      'Notifications and saved-state feedback',
      'Session secret stored with encryption',
      'Export any log to .txt',
      'Esc closes the panel from anywhere',
      'Updates tab now shows a changelog timeline',
    ]},
    { v: '3.0.0', date: 'June 2025', tag: 'Major', notes: [
      'Complete visual redesign - aka just making it green and white LMFOAFOAOF',
      'Pause / Resume on every operation',
      'Dry Run mode , count what would be deleted without deleting anything',
      'Settings tab: delay slider, skip bots, auto-pause on rate limit',
      'Ghost v3: load & preview server list with per-server checkboxes',
      'DMs v3: per-DM checkboxes with select all / none',
      'Regex support in keyword filter',
      'Rate display (deletes/min) and elapsed timer during operations',
      'Message content preview in log entries',
      'Session statistics tracked across browser restarts',
      'Export log as .txt download',
      'Press Escape to close panel',
      'Confirmation step before Prune starts',
    ]},
    { v: '2.0.0', date: 'June 2025', tag: 'Feature', notes: ['Injected in-Discord right-side panel', 'DM Purge tab', 'Keyword filter', 'Standard icon set', 'Fixed right panel instead of a floating one'] },
    { v: '1.2.0', date: 'June 2025', tag: 'Feature', notes: ['Going Ghost across all non-owned servers', 'Three-step confirmation gate', 'Discord search API integration'] },
    { v: '1.1.0', date: 'June 2025', tag: 'Fix',     notes: ['Token persistence via chrome.storage.local', 'Background network interception', 'Fixed author filter'] },
    { v: '1.0.0', date: 'June 2025', tag: 'Initial', notes: ['Initial release , popup UI, channel pruning, date/author filters'] },
  ];

  const CSS = `
*{box-sizing:border-box;margin:0;padding:0}

:host{
  --acc:#ffffff; --acc2:#e4e4e4; --acc-weak:rgba(255,255,255,.14);
  --txt:#ececec; --mut:#a3a3a3; --faint:#6c6c6c;
  --line:rgba(255,255,255,.08); --line-2:rgba(255,255,255,.15);
  --glass:rgba(255,255,255,.05); --glass-2:rgba(255,255,255,.09);
  --card:rgba(255,255,255,.045); --ink:rgba(0,0,0,.34);
  --rad:16px; --rad-s:11px;
  position:fixed !important; top:0 !important; left:0 !important;
  height:0 !important; width:0 !important; z-index:99999 !important;
  font-family:'gg sans','Noto Sans','Segoe UI',Roboto,Helvetica,Arial,sans-serif !important;
  line-height:1.45; pointer-events:none !important; color-scheme:dark;
}

.panel{
  position:absolute; top:0; right:0; width:430px; height:100vh;
  display:flex; flex-direction:column;
  background:linear-gradient(180deg, rgba(15,15,15,.84), rgba(10,10,10,.9));
  backdrop-filter:blur(30px) saturate(160%);
  -webkit-backdrop-filter:blur(30px) saturate(160%);
  border-left:1px solid var(--line);
  box-shadow:-40px 0 100px rgba(0,0,0,.68), inset -1px 0 0 rgba(255,255,255,.04);
  transform:translateX(calc(100% + 2px));
  transition:transform .34s cubic-bezier(.16,1,.3,1), box-shadow .34s;
  pointer-events:all;
}
.panel.open{ transform:translateX(0); box-shadow:-30px 0 90px rgba(0,0,0,.6), -1px 0 0 rgba(255,255,255,.12); }

.hdr{
  display:flex; align-items:center; gap:11px;
  padding:14px 16px; flex-shrink:0;
  border-bottom:1px solid var(--line); position:relative;
}
.hdr::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);opacity:.5}
.hdr-logo{width:30px;height:30px;border-radius:9px;object-fit:cover;flex-shrink:0;filter:drop-shadow(0 0 12px rgba(255,255,255,.4))}
.hdr-brand{flex:1;min-width:0;display:flex;align-items:baseline;gap:8px}
.hdr-name{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.4px;white-space:nowrap}
.hdr-name em{color:var(--acc);font-style:normal;text-shadow:0 0 16px rgba(255,255,255,.55)}
.hdr-ver{font-size:9px;font-weight:800;background:linear-gradient(135deg,var(--acc),var(--acc2));color:#0f0f0f;border-radius:20px;padding:2.5px 8px;letter-spacing:.5px}
.hdr-status{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--faint);font-weight:600;min-width:0}
.hdr-status .dot{width:7px;height:7px;border-radius:50%;background:#404040;transition:all .3s;flex-shrink:0}
.hdr-status.on .dot{background:var(--acc);box-shadow:0 0 11px rgba(255,255,255,.75)}
.hdr-status.on{color:var(--txt)}
.hdr-status .uname{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:96px}
.hdr-running{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--acc);font-weight:800;background:var(--acc-weak);border:1px solid rgba(255,255,255,.3);border-radius:20px;padding:3px 10px}
.hdr-running .pulse{width:7px;height:7px;border-radius:50%;background:var(--acc);animation:pulse 1.1s ease-in-out infinite;box-shadow:0 0 10px rgba(255,255,255,.9)}
.hdr-close{width:30px;height:30px;border-radius:9px;border:1px solid var(--line);background:var(--glass);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--faint);flex-shrink:0;transition:all .16s}
.hdr-close:hover{background:var(--acc);color:#0f0f0f;border-color:transparent;transform:rotate(90deg);box-shadow:0 0 16px rgba(255,255,255,.45)}

.nav{display:flex;gap:4px;padding:10px 12px;flex-shrink:0;border-bottom:1px solid var(--line)}
.nav-pill{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:8px 2px;border-radius:11px;cursor:pointer;color:var(--faint);font-size:8.5px;font-weight:800;letter-spacing:.4px;text-transform:uppercase;transition:all .16s;position:relative;user-select:none;border:1px solid transparent;background:transparent}
.nav-pill svg{transition:transform .16s}
.nav-pill:hover{color:var(--txt);background:var(--glass)}
.nav-pill.active{color:#0f0f0f;background:linear-gradient(135deg,var(--acc),var(--acc2));box-shadow:0 4px 20px rgba(255,255,255,.38)}
.nav-pill.active svg{transform:translateY(-1px)}
.nav-pill .nb{position:absolute;top:5px;right:calc(50% - 16px);width:5px;height:5px;border-radius:50%;background:var(--acc);display:none}
.nav-pill.has-nb .nb{display:block}

.body{flex:1;overflow-y:auto;overflow-x:hidden;padding:14px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent}
.body::-webkit-scrollbar{width:5px}
.body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:3px}
.pane{display:none;flex-direction:column;gap:12px;animation:paneIn .32s cubic-bezier(.16,1,.3,1)}
.pane.active{display:flex}
@keyframes paneIn{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}

.section-lbl{font-size:9.5px;font-weight:800;letter-spacing:1.1px;text-transform:uppercase;color:var(--faint);padding:0 4px}

.card{background:var(--card);border:1px solid var(--line);border-radius:var(--rad);padding:14px;display:flex;flex-direction:column;gap:11px;box-shadow:inset 0 1px 0 rgba(255,255,255,.045);transition:border-color .16s, background .16s}
.card:hover{border-color:var(--line-2)}
.card:focus-within{border-color:rgba(255,255,255,.45);box-shadow:0 0 0 3px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.045)}
.card-hdr{display:flex;align-items:center;gap:8px;font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.9px;color:var(--mut)}
.card-hdr svg{color:var(--acc)}
.card-hdr-row{display:flex;align-items:center;justify-content:space-between}

.inp{width:100%;background:var(--ink);border:1px solid var(--line);border-radius:var(--rad-s);padding:10px 12px;color:#fff;font-size:13px;font-family:inherit;outline:none;transition:border-color .15s, box-shadow .15s;color-scheme:dark}
.inp:focus{border-color:rgba(255,255,255,.55);box-shadow:0 0 0 3px rgba(255,255,255,.09)}
.inp::placeholder{color:var(--faint)}
input[type="date"].inp{cursor:pointer}
input[type="date"].inp::-webkit-calendar-picker-indicator{filter:invert(.6)}
.inp-row{display:flex;gap:8px;align-items:center}
.inp-row .inp{flex:1;min-width:0}
.mono{font-family:'SF Mono',ui-monospace,'Cascadia Mono',Consolas,monospace !important;font-size:12px !important}
.field-hint{font-size:11px;color:var(--faint);line-height:1.55}
.sub-lbl{font-size:10.5px;color:var(--mut);font-weight:700;letter-spacing:.4px}
.date-row{display:flex;align-items:flex-end;gap:9px}
.date-field{flex:1;display:flex;flex-direction:column;gap:6px}
.date-sep{color:var(--faint);font-size:13px;padding-bottom:11px;flex-shrink:0}

.btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 18px;border-radius:12px;font-size:13px;font-weight:800;cursor:pointer;border:none;font-family:inherit;letter-spacing:.2px;transition:all .16s}
.btn:active:not(:disabled){transform:scale(.97)}
.btn:disabled{opacity:.32;cursor:not-allowed;filter:saturate(.3)}
.btn-primary{flex:1;background:linear-gradient(135deg,var(--acc),var(--acc2));color:#0f0f0f;box-shadow:0 6px 24px rgba(255,255,255,.3)}
.btn-primary:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 30px rgba(255,255,255,.42)}
.btn-glass{flex:1;background:var(--glass);border:1px solid var(--line);color:var(--txt)}
.btn-glass:hover:not(:disabled){background:var(--glass-2);border-color:var(--line-2)}
.btn-danger{flex:1;background:linear-gradient(135deg,#ff5c63,#ef4451);color:#fff;box-shadow:0 6px 24px rgba(255,80,90,.28)}
.btn-danger:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 30px rgba(255,80,90,.4)}
.btn-sm{padding:8px 14px;font-size:12px;border-radius:10px}
.act-row{display:flex;gap:9px}
.icon-btn{width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--ink);border:1px solid var(--line);border-radius:var(--rad-s);color:var(--mut);cursor:pointer;transition:all .15s}
.icon-btn:hover{background:var(--acc);color:#0f0f0f;border-color:transparent;box-shadow:0 0 16px rgba(255,255,255,.42)}

.toggles{display:flex;flex-direction:column}
.toggle{display:flex;align-items:center;gap:12px;padding:9px 8px;border-radius:12px;cursor:pointer;transition:background .13s}
.toggle:hover{background:var(--glass)}
.tog-sw{position:relative;width:38px;height:22px;flex-shrink:0}
.tog-sw input{opacity:0;width:0;height:0;position:absolute}
.slider{position:absolute;inset:0;background:rgba(255,255,255,.14);border-radius:22px;cursor:pointer;transition:all .2s;border:1px solid rgba(255,255,255,.06)}
.slider::before{content:'';position:absolute;width:16px;height:16px;background:#d4d4d4;border-radius:50%;top:2px;left:2px;transition:all .2s cubic-bezier(.34,1.56,.64,1)}
.tog-sw input:checked + .slider{background:linear-gradient(135deg,var(--acc),var(--acc2));border-color:transparent;box-shadow:0 0 12px rgba(255,255,255,.42)}
.tog-sw input:checked + .slider::before{transform:translateX(16px);background:#0f0f0f}
.tog-txt{display:flex;flex-direction:column;gap:1px;user-select:none}
.tog-title{font-size:13px;color:var(--txt);font-weight:600}
.tog-sub{font-size:10.5px;color:var(--faint)}

.range-row{display:flex;flex-direction:column;gap:9px}
.range-hdr{display:flex;align-items:center;justify-content:space-between}
.range-val{font-size:12px;font-weight:800;color:#0f0f0f;background:linear-gradient(135deg,var(--acc),var(--acc2));border-radius:7px;padding:2px 9px;font-variant-numeric:tabular-nums}
input[type="range"]{-webkit-appearance:none;width:100%;height:4px;background:rgba(255,255,255,.13);border-radius:3px;outline:none;cursor:pointer}
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:17px;height:17px;border-radius:50%;background:linear-gradient(135deg,var(--acc),var(--acc2));cursor:pointer;border:none;box-shadow:0 0 11px rgba(255,255,255,.55);transition:transform .1s}
input[type="range"]::-webkit-slider-thumb:hover{transform:scale(1.18)}
input[type="range"]::-webkit-slider-runnable-track{height:4px}

.check-list{display:flex;flex-direction:column;gap:5px;max-height:180px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent}
.check-list::-webkit-scrollbar{width:3px}
.check-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px}
.check-item{display:flex;align-items:center;gap:10px;padding:8px 11px;border-radius:11px;cursor:pointer;border:1px solid var(--line);background:rgba(0,0,0,.24);transition:all .14s;user-select:none}
.check-item:hover{border-color:var(--line-2)}
.check-item.selected{border-color:rgba(255,255,255,.38);background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.02))}
.check-item input[type="checkbox"]{width:15px;height:15px;accent-color:var(--acc);cursor:pointer;flex-shrink:0}
.ci-name{font-size:12px;color:var(--mut);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.check-item.selected .ci-name{color:var(--txt)}
.ci-badge{font-size:9px;color:var(--acc);flex-shrink:0;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.28);border-radius:20px;padding:1.5px 8px;font-weight:800;letter-spacing:.4px}

.warn-card{background:linear-gradient(135deg,rgba(255,90,100,.08),rgba(255,90,100,.02));border:1px solid rgba(255,90,100,.24);border-radius:var(--rad);padding:14px;display:flex;flex-direction:column;gap:10px}
.warn-hdr{display:flex;align-items:center;gap:8px;font-size:10.5px;font-weight:800;color:#ff8f95;text-transform:uppercase;letter-spacing:.7px}
.warn-list{list-style:none;display:flex;flex-direction:column;gap:6px}
.warn-list li{font-size:11.5px;color:var(--mut);padding-left:16px;position:relative;line-height:1.55}
.warn-list li::before{content:'›';position:absolute;left:2px;color:rgba(255,90,100,.75)}
.warn-list li strong{color:#ffb6b9}

.g-checks{display:flex;flex-direction:column;gap:6px}
.g-check{display:flex;align-items:flex-start;gap:10px;padding:9px 11px;border-radius:11px;border:1px solid var(--line);background:rgba(0,0,0,.24);cursor:pointer;transition:all .13s}
.g-check:hover{border-color:var(--line-2);background:rgba(0,0,0,.3)}
.g-check input{width:15px;height:15px;margin-top:1px;accent-color:var(--acc);cursor:pointer;flex-shrink:0}
.g-check span{font-size:11.5px;color:var(--mut);line-height:1.5;user-select:none}
.g-check span strong{color:var(--txt)}
.g-confirm{display:flex;flex-direction:column;gap:7px}
.g-confirm .inp{letter-spacing:7px;text-transform:uppercase;text-align:center;font-size:14px;font-weight:800;font-family:'SF Mono',Consolas,monospace;border-color:rgba(255,255,255,.3)}
.g-confirm .inp::placeholder{color:var(--faint);letter-spacing:7px}
.g-confirm .inp:focus{border-color:var(--acc)}
.g-confirm .sub-lbl strong{color:var(--acc)}

.preview-strip{display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,.28);border:1px solid var(--line);border-radius:11px;padding:11px 14px}
.ps-label{font-size:12px;color:var(--faint);font-weight:600}
.ps-val{font-size:20px;font-weight:800;color:var(--acc);font-variant-numeric:tabular-nums;text-shadow:0 0 18px rgba(255,255,255,.4)}
.ps-val.loading{font-size:13px;color:var(--faint);text-shadow:none}

.dryrun-badge{display:none;align-items:center;gap:9px;background:linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.3);border-radius:11px;padding:9px 12px;font-size:11.5px;color:#d9d9d9}
.dryrun-badge.show{display:flex}
.dryrun-badge svg{color:var(--acc)}
.dryrun-badge strong{color:#0f0f0f;background:var(--acc);border-radius:5px;padding:1px 6px}

.confirm-step{background:linear-gradient(135deg,rgba(255,255,255,.07),transparent);border:1px solid rgba(255,255,255,.28);border-radius:var(--rad);padding:14px;display:flex;flex-direction:column;gap:11px}
.confirm-step.hidden{display:none}
.confirm-step p{font-size:12.5px;color:var(--mut);line-height:1.6}
.confirm-step p strong{color:var(--txt)}
.who-line{font-size:12px;color:var(--txt);font-weight:700;margin-bottom:10px}

.chips{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.chip{display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 4px;border-radius:12px;border:1px solid var(--line);background:rgba(0,0,0,.26)}
.chip-v{font-size:21px;font-weight:800;line-height:1;color:#fff;font-variant-numeric:tabular-nums}
.chip-l{font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.7px;color:var(--faint)}

.run-meta{display:flex;align-items:center;justify-content:space-between;font-size:10.5px;color:var(--faint);font-weight:600;font-variant-numeric:tabular-nums}
.run-meta span{display:flex;align-items:center;gap:6px}

.prog-card{background:var(--card);border:1px solid var(--line);border-radius:var(--rad);padding:14px;display:flex;flex-direction:column;gap:12px}
.prog-card.hidden{display:none}
.prog-track{height:5px;background:rgba(255,255,255,.07);border-radius:4px;overflow:hidden}
.prog-fill{height:100%;width:0%;border-radius:4px;background:linear-gradient(90deg,var(--acc),var(--acc2));box-shadow:0 0 12px rgba(255,255,255,.6);transition:width .35s ease}
.prog-fill.run{width:100% !important;background:linear-gradient(90deg,var(--acc) 0%,#ebebeb 50%,var(--acc) 100%);background-size:200% 100%;animation:shimmer 1.6s linear infinite}
.prog-fill.paused{animation-play-state:paused;background:#747474}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

.cur-row{display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(0,0,0,.26);border:1px solid var(--line);border-radius:9px;padding:8px 12px}
.cur-name{font-size:12px;font-weight:600;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
.cur-ct{font-size:10.5px;color:var(--faint);flex-shrink:0;font-variant-numeric:tabular-nums}

.log-wrap{display:flex;flex-direction:column;gap:6px}
.log-actions{display:flex;align-items:center;justify-content:space-between}
.log-title{font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:var(--faint)}
.log-export{font-size:10px;font-weight:700;color:var(--faint);background:none;border:none;cursor:pointer;font-family:inherit;padding:3px 6px;border-radius:6px;display:flex;align-items:center;gap:4px;transition:all .12s}
.log-export:hover{color:var(--acc);background:rgba(255,255,255,.08)}
.log-box{background:rgba(0,0,0,.36);border:1px solid var(--line);border-radius:11px;padding:10px 12px;max-height:150px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent;font-family:'SF Mono',ui-monospace,Consolas,monospace}
.log-box::-webkit-scrollbar{width:3px}
.log-box::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px}
.ll{font-size:10px;line-height:1.7;display:flex;gap:8px;flex-shrink:0}
.ll-ts{color:var(--faint);opacity:.7;flex-shrink:0}
.ll-type{flex-shrink:0}
.ll-body{color:var(--faint);word-break:break-word}
.ll-preview{color:var(--faint);opacity:.6;font-style:italic}
.ll.ok .ll-type{color:var(--acc)}
.ll.ok .ll-body{color:#e1e1e1}
.ll.info .ll-type{color:#8c8c8c}
.ll.warn .ll-type{color:#f2c94c}
.ll.warn .ll-body{color:#e8cd86}
.ll.err .ll-type{color:#ff6b72}
.ll.err .ll-body{color:#ff9ca1}
.ll.rate .ll-type{color:#b0b0b0}
.ll.rate .ll-body{color:#a9a9a9}
.ll.dry .ll-type{color:#8c8c8c}
.ll.dry .ll-body{color:#949494}

.tok-ov{background:linear-gradient(135deg,rgba(255,255,255,.06),transparent),var(--card);border:1px solid rgba(255,255,255,.28);border-radius:var(--rad);padding:15px;display:flex;flex-direction:column;gap:12px}
.tok-ov.hidden{display:none !important}
.tok-hdr{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:800;color:var(--txt);text-transform:uppercase;letter-spacing:.6px}
.tok-hdr svg{color:var(--acc)}
.tok-hint{font-size:10.5px;color:var(--faint);line-height:1.7}
.tok-hint kbd{background:rgba(255,255,255,.06);color:var(--mut);border:1px solid var(--line);border-radius:4px;padding:1px 6px;font-size:9.5px}
.tok-hint code{display:block;margin-top:7px;background:rgba(0,0,0,.42);color:#d0d0d0;border:1px solid var(--line);border-radius:9px;padding:9px 11px;font-family:'SF Mono',ui-monospace,Consolas,monospace;font-size:9px;word-break:break-all;user-select:all;cursor:text;line-height:1.7;overflow-wrap:anywhere}

.sel-hdr{display:flex;align-items:center;justify-content:space-between}
.sel-actions{display:flex;gap:6px}
.sel-all-btn{font-size:10.5px;font-weight:700;color:var(--faint);background:none;border:none;cursor:pointer;font-family:inherit;padding:3px 7px;border-radius:7px;transition:all .12s}
.sel-all-btn:hover{color:var(--acc);background:rgba(255,255,255,.08)}

.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.stat{background:rgba(0,0,0,.26);border:1px solid var(--line);border-radius:12px;padding:13px;display:flex;flex-direction:column;gap:3px;transition:border-color .14s}
.stat:hover{border-color:rgba(255,255,255,.32)}
.stat-v{font-size:23px;font-weight:800;color:#fff;font-variant-numeric:tabular-nums}
.stat-l{font-size:8.5px;font-weight:800;color:var(--faint);text-transform:uppercase;letter-spacing:.8px}

.settings-actions{display:flex;flex-direction:column;gap:7px}
.settings-btn{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:12px;cursor:pointer;border:1px solid var(--line);background:var(--glass);color:var(--txt);font-family:inherit;font-size:12.5px;font-weight:600;transition:all .14s;text-align:left;width:100%}
.settings-btn:hover{background:var(--acc);color:#0f0f0f;border-color:transparent;transform:translateX(3px)}
.settings-btn:hover .sb-sub{color:rgba(15,15,15,.6)}
.settings-btn .sb-sub{font-size:10px;color:var(--faint);margin-left:auto;white-space:nowrap}

.about-card{background:var(--glass);border:1px solid var(--line);border-radius:var(--rad);padding:14px;display:flex;flex-direction:column;gap:7px}
.about-row{display:flex;align-items:center;justify-content:space-between;font-size:11.5px}
.about-key{color:var(--faint)}
.about-val{color:var(--mut);font-variant-numeric:tabular-nums}
.kbd-hint{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--faint)}
.kbd-hint kbd{background:rgba(255,255,255,.06);color:var(--mut);border:1px solid var(--line);border-radius:5px;padding:2px 7px;font-size:10.5px;font-family:'SF Mono',Consolas,monospace}

.cl-entry{background:var(--card);border:1px solid var(--line);border-radius:var(--rad);padding:14px;display:flex;flex-direction:column;gap:10px;transition:border-color .14s}
.cl-entry:hover{border-color:var(--line-2)}
.cl-hdr{display:flex;align-items:center;gap:10px}
.cl-ver{font-size:15px;font-weight:800;color:#fff}
.cl-tag{font-size:9px;font-weight:800;border-radius:20px;padding:2px 9px;text-transform:uppercase;letter-spacing:.5px;border:1px solid var(--line);color:var(--mut)}
.cl-tag.Major{background:linear-gradient(135deg,var(--acc),var(--acc2));color:#0f0f0f;border-color:transparent}
.cl-tag.Feature{background:rgba(255,255,255,.06);color:var(--txt);border-color:var(--line)}
.cl-date{font-size:11px;color:var(--faint);margin-left:auto}
.cl-notes{list-style:none;display:flex;flex-direction:column;gap:5px}
.cl-notes li{font-size:11.5px;color:var(--mut);padding-left:16px;position:relative;line-height:1.55}
.cl-notes li::before{content:'✦';position:absolute;left:1px;color:var(--acc);font-size:9px;top:1.5px}

.empty-state{display:flex;flex-direction:column;align-items:center;gap:8px;padding:22px 10px;text-align:center;color:var(--faint)}
.empty-state .es-icon{opacity:.55}
.empty-state .es-text{font-size:11.5px}

.hero{background:linear-gradient(135deg,rgba(255,255,255,.13),rgba(255,255,255,.02) 55%,transparent),rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.3);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:13px;position:relative;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.06), 0 12px 44px rgba(0,0,0,.25)}
.hero::before{content:'';position:absolute;top:-60%;right:-30%;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.2),transparent 70%);pointer-events:none}
.hero-top{display:flex;align-items:center;gap:12px;position:relative}
.hero-ava{width:46px;height:46px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,var(--acc),var(--acc2));color:#0f0f0f;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;overflow:hidden;box-shadow:0 0 0 2px rgba(255,255,255,.09), 0 4px 18px rgba(255,255,255,.45)}
.hero-ava img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.hero-id{flex:1;min-width:0}
.hero-name{font-size:15px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hero-sub{font-size:10.5px;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}
.hero-chip{font-size:9px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;border-radius:20px;padding:3px 10px;flex-shrink:0;border:1px solid rgba(255,255,255,.38);color:var(--acc);background:rgba(255,255,255,.09);white-space:nowrap}
.hero-chip.off{color:var(--faint);border-color:var(--line);background:rgba(255,255,255,.04)}
.hero-conn{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--mut);position:relative}
.hero-conn .dot{width:7px;height:7px;border-radius:50%;background:#404040;transition:all .3s}
.hero-conn .dot.on{background:var(--acc);box-shadow:0 0 11px rgba(255,255,255,.85)}
.hero-conn .dot.busy{background:#f2c94c;box-shadow:0 0 11px rgba(242,201,76,.75);animation:pulse 1.1s infinite}
.dash-actions{display:flex;gap:9px}
.dash-recent{display:flex;flex-direction:column;gap:1px;background:rgba(0,0,0,.3);border:1px solid var(--line);border-radius:11px;padding:7px 9px}
.dr-line{display:flex;gap:8px;font-size:10.5px;font-family:'SF Mono',ui-monospace,Consolas,monospace;padding:3px 4px;border-radius:6px;color:var(--faint);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;align-items:center}
.dr-line:hover{background:rgba(255,255,255,.05)}
.dr-line .dr-tag{flex-shrink:0;font-size:8.5px;font-weight:800;padding:1px 5px;border-radius:4px;background:rgba(255,255,255,.12);color:var(--acc)}

.save-ind{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--acc);font-weight:800;opacity:0;transition:opacity .3s}
.save-ind.show{opacity:1}

.ftr{display:flex;align-items:center;justify-content:space-between;padding:9px 15px;border-top:1px solid var(--line);flex-shrink:0;font-size:10px;color:var(--faint)}
.ftr-l{display:flex;align-items:center;gap:6px;font-weight:600}
.ftr-l .dot{width:6px;height:6px;border-radius:50%;background:#404040;transition:all .3s}
.ftr-l .dot.on{background:var(--acc);box-shadow:0 0 8px rgba(255,255,255,.85)}
.ftr-r{display:flex;gap:8px;align-items:center}
.ftr-r b{color:var(--acc)}

.toasts{position:fixed;top:16px;right:18px;display:flex;flex-direction:column;align-items:flex-end;gap:8px;z-index:100001;pointer-events:none;width:max-content;max-width:min(420px,calc(100vw - 36px))}
.toast{background:rgba(14,14,14,.93);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--line);border-left:3px solid var(--acc);color:var(--txt);font-size:12px;font-weight:600;padding:10px 15px;border-radius:11px;box-shadow:0 12px 34px rgba(0,0,0,.55);opacity:0;transform:translateY(-8px) scale(.97);transition:all .28s cubic-bezier(.16,1,.3,1)}
.toast.show{opacity:1;transform:none}
.toast.warn{border-left-color:#f2c94c}
.toast.err{border-left-color:#ff6b72}

.hidden{display:none !important}

:host{
  --acc:#ffffff; --acc2:#e4e4e4; --acc-weak:rgba(255,255,255,.13);
  --txt:#ececec; --mut:#a2a2a2; --faint:#626262;
  --dim:#757575; --soft:#959595;
  --line:rgba(255,255,255,.075); --line-2:rgba(255,255,255,.16);
  --glass:rgba(255,255,255,.035); --glass-2:rgba(255,255,255,.08);
  --card:rgba(255,255,255,.022); --ink:rgba(0,0,0,.42);
  --red:#e5483f; --amber:#e3a008;
  --rad:10px; --rad-s:7px;
  --f-disp:'Segoe UI Variable Display','Avenir Next','Inter','Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif;
  --f-mono:'SF Mono','Cascadia Mono','Cascadia Code',Consolas,monospace;
  font-family:'Segoe UI','Avenir Next',-apple-system,BlinkMacSystemFont,Roboto,sans-serif;
}

.panel{display:grid;grid-template-columns:56px 1fr;grid-template-rows:auto 1fr auto;grid-template-areas:"hdr hdr" "rail body" "ftr ftr";width:432px;background:linear-gradient(180deg,#0d0d0d,#090909)}
.panel::before{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.55;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.045 0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E")}
.panel.open{box-shadow:-34px 0 90px rgba(0,0,0,.72), -1px 0 0 rgba(255,255,255,.14)}
.hdr,.nav,.body,.ftr{position:relative;z-index:1}

.hdr{grid-area:hdr;gap:10px;padding:12px 13px;border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.028),transparent)}
.hdr::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(255,255,255,.05),rgba(255,255,255,.4) 30%,rgba(255,255,255,.4) 70%,rgba(255,255,255,.05));opacity:.6}
.hdr-logo{width:24px;height:24px;border-radius:6px;border:1px solid var(--line-2);filter:none;box-shadow:0 0 0 3px rgba(255,255,255,.06)}
.hdr-name{font-family:var(--f-disp);font-weight:650;font-size:14.5px;letter-spacing:.3px}
.hdr-ver{font-family:var(--f-mono);font-size:8.5px;font-weight:600;letter-spacing:.6px;background:transparent;color:var(--acc);border:1px solid rgba(255,255,255,.38);border-radius:4px;padding:2px 6px}
.hdr-status{font-family:var(--f-mono);font-size:9.5px;color:var(--faint)}
.hdr-status .dot{width:6px;height:6px;background:var(--faint)}
.hdr-status.on .dot{background:var(--acc);box-shadow:0 0 8px rgba(255,255,255,.7)}
.hdr-running{border-radius:4px;font-family:var(--f-mono);font-size:9px;padding:3px 8px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.3)}
.hdr-close{width:28px;height:28px;border-radius:6px;color:var(--dim);border:1px solid var(--line)}
.hdr-close:hover{background:var(--acc);box-shadow:none;transform:rotate(90deg)}
.hdr-brand{gap:9px}
.hdr-brand::before{content:'';width:1px;height:16px;background:var(--line-2);flex-shrink:0}

.nav{grid-area:rail;display:flex;flex-direction:column;gap:2px;padding:12px 0;border-bottom:none;border-right:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.02),transparent)}
.nav-pill{flex:none;height:48px;align-items:center;justify-content:center;gap:3px;padding:0;border:none;border-radius:0;background:transparent;font-family:var(--f-disp);font-size:6.5px;font-weight:700;letter-spacing:1.4px;color:var(--faint);position:relative;overflow:visible}
.nav-pill svg{transition:color .16s,transform .16s}
.nav-pill:hover{background:linear-gradient(90deg,transparent,rgba(255,255,255,.045),transparent);color:var(--soft)}
.nav-pill:hover svg{transform:scale(1.08)}
.nav-pill::after{content:'';position:absolute;left:-1px;top:50%;transform:translateY(-50%) scaleY(.4);width:2px;height:22px;border-radius:2px;background:var(--acc);opacity:0;transition:all .2s cubic-bezier(.16,1,.3,1)}
.nav-pill.active{color:var(--txt);background:linear-gradient(90deg,rgba(255,255,255,.06),transparent)}
.nav-pill.active svg{color:var(--acc)!important}
.nav-pill.active::after{opacity:1;transform:translateY(-50%) scaleY(1)}

.body{grid-area:body;padding:13px 13px 30px;background:linear-gradient(180deg,rgba(0,0,0,.16),transparent 260px)}
.body::-webkit-scrollbar{width:4px}
.body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px}
.pane{gap:12px}

.section-lbl{display:flex;align-items:center;gap:8px;font-family:var(--f-disp);font-size:8.5px;font-weight:700;letter-spacing:2.2px;color:var(--dim);margin-top:2px}
.section-lbl::before{content:'';width:12px;height:1px;background:var(--acc);opacity:.8}
.section-lbl::after{content:'';flex:1;height:1px;background:var(--line)}

.card{background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.012));border:1px solid var(--line);border-radius:10px;padding:13px;box-shadow:inset 0 1px 0 rgba(255,255,255,.025);position:relative;overflow:visible}
.card::before{content:'';position:absolute;top:-1px;left:12px;width:34px;height:1px;background:var(--acc);opacity:0;transition:opacity .18s}
.card:hover{border-color:var(--line-2)}
.card:hover::before,.card:focus-within::before{opacity:.85}
.card:focus-within{border-color:rgba(255,255,255,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}
.card-hdr{font-family:var(--f-disp);font-size:9px;font-weight:700;letter-spacing:1.7px;color:var(--soft);text-transform:uppercase}
.card-hdr svg{color:var(--acc);opacity:.95}

.inp{background:#0e0e0e;border:1px solid var(--line-2);border-radius:6px;padding:9px 11px;font-size:12.5px;box-shadow:inset 0 1px 3px rgba(0,0,0,.4)}
.inp:focus{border-color:var(--acc);box-shadow:0 0 0 1px var(--acc),inset 0 1px 3px rgba(0,0,0,.4)}
.inp::placeholder{color:var(--faint)}
.icon-btn{width:34px;height:34px;border-radius:6px;background:#0e0e0e;border:1px solid var(--line-2);color:var(--dim)}
.icon-btn:hover{background:var(--acc);box-shadow:none}
.sub-lbl{font-size:10px;color:var(--mut);letter-spacing:.5px;font-weight:700}
.field-hint{color:var(--faint)}

.btn{border-radius:7px;font-weight:650;font-size:12.5px;gap:7px;padding:10px 16px;letter-spacing:.2px}
.btn-primary{background:var(--acc);color:#0e0e0e;box-shadow:0 2px 0 rgba(0,0,0,.3)}
.btn-primary:hover:not(:disabled){background:#ffffff;transform:translateY(-1px);box-shadow:0 3px 0 rgba(0,0,0,.24)}
.btn-primary:active:not(:disabled){transform:translateY(1px);box-shadow:0 1px 0 rgba(0,0,0,.3)}
.btn-glass{background:#171717;border:1px solid var(--line-2);color:var(--txt)}
.btn-glass:hover:not(:disabled){background:#1f1f1f;border-color:rgba(255,255,255,.4);color:#fff}
.btn-danger{background:var(--red);color:#fff;box-shadow:0 2px 0 rgba(0,0,0,.3)}
.btn-danger:hover:not(:disabled){background:#f2544a;transform:translateY(-1px)}
.btn-sm{border-radius:6px;padding:7px 13px;font-size:11px}

.toggle{border-radius:8px;padding:8px}
.toggle:hover{background:rgba(255,255,255,.03)}
.tog-sw{width:34px;height:19px}
.slider{border-radius:19px;background:#222222;border:1px solid var(--line-2)}
.slider::before{width:13px;height:13px;top:2px;left:2px;background:#b3b3b3}
.tog-sw input:checked + .slider{background:var(--acc);box-shadow:none}
.tog-sw input:checked + .slider::before{transform:translateX(15px);background:#0e0e0e}
.tog-title{font-size:12.5px;font-weight:600}
.tog-sub{color:var(--faint)}

.range-row{gap:10px}
.range-val{font-family:var(--f-mono);font-size:10.5px;font-weight:600;color:var(--acc);background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.3);border-radius:4px;padding:2px 7px}
input[type="range"]{height:3px;background:#222222;border-radius:2px}
input[type="range"]::-webkit-slider-thumb{width:15px;height:15px;background:#0e0e0e;border:3px solid var(--acc);box-shadow:none;border-radius:50%}
input[type="range"]::-webkit-slider-thumb:hover{box-shadow:0 0 0 4px rgba(255,255,255,.15)}

.check-item{border-radius:6px;background:#0e0e0e;border:1px solid var(--line);padding:8px 10px}
.check-item:hover{border-color:var(--line-2)}
.check-item.selected{border-color:rgba(255,255,255,.45);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02))}
.ci-badge{font-family:var(--f-mono);font-size:8px;letter-spacing:.6px;border-radius:3px;background:rgba(255,255,255,.08);color:var(--acc);border:1px solid rgba(255,255,255,.3)}

.warn-card{background:linear-gradient(180deg,rgba(229,72,63,.07),rgba(229,72,63,.015));border:1px solid rgba(229,72,63,.22);border-radius:10px}
.warn-hdr{font-family:var(--f-disp);font-size:9.5px;letter-spacing:1.6px;color:#ff8f87}
.warn-list li::before{content:'!';position:absolute;left:0;top:0;font-family:var(--f-mono);color:var(--red);font-size:10px}
.warn-list li{padding-left:15px;color:var(--mut)}
.warn-list li strong{color:#ffc4bf}

.g-check{border-radius:7px;background:#0e0e0e;border:1px solid var(--line)}
.g-check:hover{background:#101010;border-color:var(--line-2)}
.g-confirm .inp{letter-spacing:6px;border-color:rgba(255,255,255,.35)}

.preview-strip{background:#0e0e0e;border:1px solid var(--line);border-radius:7px;padding:10px 12px}
.ps-label{font-family:var(--f-disp);font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--dim);font-weight:700}
.ps-val{font-family:var(--f-mono);font-size:21px;color:var(--acc);text-shadow:none}

.dryrun-badge{border-radius:7px;border:1px dashed rgba(255,255,255,.45);background:rgba(255,255,255,.05);font-family:var(--f-mono);font-size:10px;color:var(--acc);padding:8px 12px}
.dryrun-badge strong{color:#0e0e0e;background:var(--acc);border-radius:3px;padding:1px 6px;font-family:var(--f-disp)}

.confirm-step{border-radius:10px;border:1px solid rgba(255,255,255,.3);background:linear-gradient(180deg,rgba(255,255,255,.06),transparent)}

.chips{grid-template-columns:repeat(4,1fr);gap:7px}
.chip{position:relative;border-radius:7px;background:#0e0e0e;border:1px solid var(--line);padding:12px 4px 12px;flex-direction:column;overflow:hidden}
.chip::after{content:'';position:absolute;left:7px;right:7px;bottom:0;height:4px;background:repeating-linear-gradient(90deg,var(--line-2) 0 2px,transparent 2px 6px);opacity:.5}
.chip-v{font-family:var(--f-mono);font-size:19px;font-weight:600;color:#fff;font-feature-settings:'tnum'}
.chip-l{font-size:7px;letter-spacing:1.3px;color:var(--dim);text-transform:uppercase;font-family:var(--f-disp);font-weight:700}

.run-meta{font-family:var(--f-mono);font-size:9.5px;color:var(--dim)}
.prog-card{border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.012));border:1px solid var(--line);padding:13px}
.prog-track{height:4px;background:#202020;border-radius:2px;position:relative;overflow:hidden}
.prog-track::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 17px,rgba(255,255,255,.05) 17px 18px)}
.prog-fill{background:var(--acc);border-radius:2px;box-shadow:none}
.prog-fill.run{background:linear-gradient(90deg,var(--acc) 30%,#e9e9e9 50%,var(--acc) 70%);background-size:220% 100%;animation:sweep 1.5s linear infinite}
.prog-fill.paused{background:#5f5f5f}
@keyframes sweep{0%{background-position:220% 0}100%{background-position:-220% 0}}

.cur-row{border-radius:7px;background:#0e0e0e;border:1px solid var(--line);padding:8px 11px}
.cur-name{font-size:11px;color:var(--soft)}
.cur-ct{font-family:var(--f-mono);font-size:9.5px;color:var(--dim)}

.log-title{font-family:var(--f-disp);font-size:8.5px;letter-spacing:1.8px;color:var(--dim)}
.log-box{background:#080808;border:1px solid var(--line);border-radius:7px;padding:10px 12px;font-family:var(--f-mono)}
.ll{font-size:9.5px}
.ll-ts{color:var(--faint)}
.ll.ok .ll-type{color:var(--acc)}
.ll.warn .ll-type{color:var(--amber)}
.ll.err .ll-type{color:#ff7b72}
.ll.rate .ll-type{color:#acacac}
.ll.dry .ll-type{color:var(--acc)}
.ll.dry .ll-body{color:var(--dim)}

.tok-ov{border-radius:10px;border:1px solid rgba(255,255,255,.32);background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.012))}
.tok-hdr{font-family:var(--f-disp);font-size:10px;letter-spacing:1.5px}
.tok-hint code{background:#080808;border:1px solid var(--line);border-radius:6px;font-family:var(--f-mono);font-size:8.5px;color:#d0d0d0}

.sel-all-btn{font-family:var(--f-mono);font-size:9.5px;letter-spacing:.8px}
.stat-grid{gap:8px}
.stat{position:relative;border-radius:8px;background:#0e0e0e;border:1px solid var(--line);padding:12px;overflow:hidden}
.stat::after{content:'';position:absolute;left:10px;right:10px;bottom:0;height:4px;background:repeating-linear-gradient(90deg,var(--line-2) 0 2px,transparent 2px 6px);opacity:.5}
.stat:hover{border-color:rgba(255,255,255,.35)}
.stat-v{font-family:var(--f-mono);font-size:22px;font-weight:600;font-feature-settings:'tnum'}
.stat-l{font-size:7.5px;letter-spacing:1.3px;color:var(--dim);font-family:var(--f-disp);font-weight:700}

.settings-btn{border-radius:7px;background:#0e0e0e;border:1px solid var(--line);padding:11px 13px}
.settings-btn:hover{background:rgba(255,255,255,.07);color:var(--acc);transform:translateX(2px);border-color:rgba(255,255,255,.3)}
.settings-btn:hover .sb-sub{color:rgba(255,255,255,.6)}
.settings-btn .sb-sub{font-family:var(--f-mono);font-size:8.5px;color:var(--faint)}

.about-card{border-radius:10px;background:rgba(255,255,255,.03);border:1px solid var(--line);padding:13px}
.about-key{font-family:var(--f-disp);font-size:9px;letter-spacing:1.4px;text-transform:uppercase;color:var(--faint)}
.about-val{color:var(--mut)}
.kbd-hint{font-family:var(--f-mono)}
.kbd-hint kbd{background:#0e0e0e;color:var(--soft)}
.divider{position:relative;height:11px;display:flex;align-items:center;justify-content:center;margin:2px -2px}
.divider::before{content:'';position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--line-2) 35%,var(--line-2) 65%,transparent)}
.divider::after{content:'';width:5px;height:5px;background:#0e0e0e;border:1px solid var(--acc);transform:rotate(45deg);position:relative;box-shadow:0 0 0 3px #0d0d0d}

.cl-entry{border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.012));border:1px solid var(--line);padding:13px}
.cl-ver{font-family:var(--f-disp);font-size:14px;font-weight:650}
.cl-tag{border-radius:3px;padding:2px 8px;letter-spacing:1.2px;font-family:var(--f-mono);font-size:8px}
.cl-tag.Major{background:var(--acc);color:#0e0e0e;border-color:transparent}
.cl-tag.Feature{background:#171717;color:var(--txt)}
.cl-date{font-family:var(--f-mono);font-size:9.5px;color:var(--faint)}
.cl-notes li::before{content:'›';color:var(--acc);font-size:11px;top:-.5px}
.cl-notes li{color:var(--mut)}

.empty-state{position:relative;background:#0e0e0e;border:1px dashed var(--line-2);border-radius:10px;padding:26px 12px;margin:2px}
.empty-state .es-icon{color:var(--dim);opacity:1}

.hero{position:relative;border-radius:12px;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.014) 70%,rgba(255,255,255,0));border:1px solid rgba(255,255,255,.24);padding:15px;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(120% 100% at 88% -12%,rgba(255,255,255,.045),transparent 56%);border-radius:12px}
.hero::after{content:'';position:absolute;inset:5px;background:
 linear-gradient(var(--acc),var(--acc)) left top / 14px 1px,
 linear-gradient(var(--acc),var(--acc)) left top / 1px 14px,
 linear-gradient(var(--acc),var(--acc)) right top / 14px 1px,
 linear-gradient(var(--acc),var(--acc)) right top / 1px 14px,
 linear-gradient(var(--acc),var(--acc)) left bottom / 14px 1px,
 linear-gradient(var(--acc),var(--acc)) left bottom / 1px 14px,
 linear-gradient(var(--acc),var(--acc)) right bottom / 14px 1px,
 linear-gradient(var(--acc),var(--acc)) right bottom / 1px 14px;
 background-repeat:no-repeat;opacity:.45;border-radius:8px;pointer-events:none}
.hero>*{position:relative;z-index:1}
.hero-ava{width:44px;height:44px;box-shadow:0 0 0 1px rgba(255,255,255,.12),0 0 0 4px rgba(255,255,255,.06)}
.hero-name{font-family:var(--f-disp);font-weight:650;letter-spacing:.3px}
.hero-sub{font-family:var(--f-mono);font-size:9.5px;color:var(--dim)}
.hero-chip{border-radius:4px;font-family:var(--f-mono);font-size:9px;letter-spacing:.6px;padding:3px 9px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:var(--soft)}
.hero-chip.off{color:var(--faint);border-color:var(--line);background:rgba(255,255,255,.025)}
.hero-conn{font-family:var(--f-mono);font-size:10px;color:var(--soft)}
.dash-recent{border-radius:8px;background:#080808;border:1px solid var(--line);padding:7px 8px}
.dr-line{font-family:var(--f-mono);font-size:10px;color:var(--dim);border-radius:5px;padding:3px 5px}
.dr-line .dr-tag{border-radius:3px;background:rgba(255,255,255,.1);color:var(--acc);font-family:var(--f-mono);font-size:8px;letter-spacing:.6px}

.save-ind{font-family:var(--f-mono);font-size:9px;letter-spacing:.6px}

.ftr{grid-area:ftr;display:flex;align-items:center;gap:8px;padding:8px 13px;border-top:1px solid var(--line);font-family:var(--f-mono);font-size:9px;color:var(--dim);letter-spacing:.4px;background:#090909}
.ftr-l .dot{width:5px;height:5px;background:var(--faint)}
.ftr-l .dot.on{background:var(--acc);box-shadow:none}
.ftr-r{display:flex;align-items:center;gap:7px}
.ftr-r b{color:var(--acc);font-weight:600}

.toast{border-radius:6px;border-left:2px solid var(--acc);background:#0e0e0e;box-shadow:0 10px 30px rgba(0,0,0,.55);font-size:12px;padding:9px 14px}
.toast.warn{border-left-color:var(--amber)}
.toast.err{border-left-color:var(--red)}

.body ::selection{background:rgba(255,255,255,.3);color:#f8f8f8}

.tog-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px 8px}
.tog-grid .toggle{padding:7px 6px;gap:7px;border-radius:7px}
.warn-note{display:flex;align-items:center;gap:7px;font-size:10.5px;color:var(--dim);line-height:1.55}
  .warn-note svg{color:var(--red);flex-shrink:0}
  .warn-note strong{color:var(--soft)}
  .safe-row{display:flex;align-items:center;gap:8px}
  .safe-row .toggle{flex:1;min-width:0}
  .safe-row-dm{margin-bottom:2px}
  .sel-inp{flex-shrink:0;width:112px;padding:7px 8px;font-family:var(--f-mono);font-size:10.5px;color:var(--soft);background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.09);border-radius:7px;cursor:pointer}
  .sel-inp:hover:not(:disabled){border-color:rgba(255,255,255,.2)}
  .sel-inp:disabled{opacity:.35;cursor:not-allowed}
  .sel-inp option{background:#0e0e0e;color:var(--txt)}
  .warn-sub{color:#e8b96b}
  .safe-badge{display:flex;align-items:center;gap:8px;font-family:var(--f-mono);font-size:10px;color:var(--amber);background:rgba(227,160,8,.06);border:1px dashed rgba(227,160,8,.4);border-radius:7px;padding:7px 10px;margin:1px 0 2px}
  .safe-badge svg{color:var(--amber);flex-shrink:0}
  .safe-badge .t-live{color:var(--amber);font-weight:700}
.hero .divider{margin:0}
.hero .dash-actions{gap:9px}
.card .settings-actions{margin:-3px 0}

:host{
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
}
::selection{background:rgba(255,255,255,.32);color:#fff}

.panel{
  background-color:#080808;
  background-image:
    radial-gradient(620px 300px at 74% 118%, rgba(232,121,0,.09), transparent 62%),
    linear-gradient(180deg,#0d0d0d,#080808);
  background-size:1300px 760px,100% 100%;
  background-position:0 0,0 0;
  animation:auroraDrift 26s ease-in-out infinite alternate;
}
@keyframes auroraDrift{
  0%{background-position:-30px 20px,0 0}
  50%{background-position:200px 60px,0 0}
  100%{background-position:20px -30px,0 0}
}

.hdr-logo{width:26px;height:26px;border-radius:8px;box-shadow:0 0 0 3px rgba(255,255,255,.08),0 0 18px rgba(255,255,255,.22)}
.hdr-name{font-size:15px;font-weight:720;letter-spacing:.4px}
.hdr-name em{color:var(--acc);-webkit-text-fill-color:currentColor;text-shadow:0 0 14px rgba(255,255,255,.45)}
.hdr-ver{color:#f1f1f1}
.nav-pill{height:50px;transition:color .16s,background .16s,transform .16s}
.nav-pill:hover{transform:translateX(1px);background:linear-gradient(90deg,transparent,rgba(255,255,255,.055),transparent)}
.nav-pill.active{background:linear-gradient(90deg,rgba(255,255,255,.1),transparent)}
.nav-pill.active svg{filter:drop-shadow(0 0 5px rgba(255,255,255,.65))}

.body::-webkit-scrollbar{width:6px}
.body::-webkit-scrollbar-track{background:transparent}
.body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:3px;border:1px solid rgba(0,0,0,.4)}
.body::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,.5)}
.pane{transition:none}
.pane.in{animation:paneIn .32s cubic-bezier(.16,1,.3,1)}
@keyframes paneIn{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}

.card{box-shadow:inset 0 1px 0 rgba(255,255,255,.03),0 10px 24px -18px rgba(0,0,0,.8)}
.card:hover{transform:translateY(-1px);border-color:rgba(255,255,255,.13);box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 16px 32px -18px rgba(0,0,0,.9)}
.card-hdr svg{filter:drop-shadow(0 0 6px rgba(255,255,255,.5))}

.btn{position:relative;overflow:hidden}
.btn::after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 20%,rgba(255,255,255,.32) 50%,transparent 80%);transform:translateX(-130%);transition:transform .55s cubic-bezier(.16,1,.3,1)}
.btn:hover:not(:disabled)::after{transform:translateX(130%)}
.btn-primary{background:linear-gradient(135deg,#ffffff,var(--acc2));text-shadow:0 1px 6px rgba(0,0,0,.2)}

.tog-sw input:checked + .slider{box-shadow:0 0 10px rgba(255,255,255,.55)}
.tog-sw input:checked + .slider::before{box-shadow:0 0 6px rgba(0,0,0,.4)}

.chip{box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
.chip-v{background:linear-gradient(180deg,#fff,var(--acc));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
.chip::before{content:'';position:absolute;top:7px;left:8px;width:4px;height:4px;background:var(--acc);transform:rotate(45deg);box-shadow:0 0 6px rgba(255,255,255,.8)}
.chip-l{padding-top:2px}

.prog-fill.run{background:repeating-linear-gradient(90deg,var(--acc) 0 14px,var(--acc2) 14px 28px);background-size:28px 100%;background-position:0 0;animation:progStripe .7s linear infinite;border-radius:3px;box-shadow:0 0 14px rgba(255,255,255,.45)}
@keyframes progStripe{from{background-position:0 0}to{background-position:28px 0}}

input[type="range"]::-webkit-slider-thumb{transition:box-shadow .16s,transform .16s}
input[type="range"]::-webkit-slider-thumb:hover{transform:scale(1.12);box-shadow:0 0 0 5px rgba(255,255,255,.18)}

.ci-badge.owned{background:rgba(232,180,5,.1);color:#f2c14e;border:1px solid rgba(232,180,5,.35)}
.check-item span.ci-name{font-weight:600}

.log-box{scrollbar-width:thin;scrollbar-color:var(--line-2) transparent}
.log-box::-webkit-scrollbar{width:6px;height:6px}
.log-box::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:3px}
.check-list{scrollbar-width:thin;scrollbar-color:var(--line-2) transparent}
.check-list::-webkit-scrollbar{width:6px}
.check-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:3px}

.toast{background:rgba(18,18,18,.92);border:1px solid var(--line-2);border-left:3px solid var(--acc);box-shadow:0 14px 34px -12px rgba(0,0,0,.9);backdrop-filter:blur(14px)}
.toast.warn{border-left-color:var(--amber)}
.toast.err{border-left-color:var(--red)}

.dr-line .dr-tag{color:var(--acc)}

.empty-state .es-icon svg{filter:drop-shadow(0 0 8px rgba(255,255,255,.4))}

.panel{box-shadow:none;transform:translateX(calc(100% + 4px))}
.panel.open{box-shadow:-34px 0 90px rgba(0,0,0,.62);transform:translateX(0)}
.hdr::after,.nav-pill::after,.nav-pill.active::after,.card::before{content:none}
.divider::before,.divider::after{content:none}
.divider{height:8px}
.hero{border-color:var(--line)}
.hero::after{background:
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) left top / 14px 1px,
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) left top / 1px 14px,
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) right top / 14px 1px,
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) right top / 1px 14px,
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) left bottom / 14px 1px,
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) left bottom / 1px 14px,
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) right bottom / 14px 1px,
 linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)) right bottom / 1px 14px;
 background-repeat:no-repeat;opacity:.35}
.body{background:linear-gradient(180deg,rgba(255,255,255,.018),transparent 200px)}

.about-banner{display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:11px;background:linear-gradient(135deg,rgba(255,255,255,.1),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.32);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 10px 26px -18px rgba(0,0,0,.9);position:relative;overflow:hidden}
.about-banner::before{content:'';position:absolute;inset:0;background:radial-gradient(180px 90px at 88% -20%,rgba(255,255,255,.25),transparent 70%)}
.ab-badge{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,var(--acc),var(--acc2));color:#0e0e0e;box-shadow:0 0 0 3px rgba(255,255,255,.14),0 6px 16px -6px rgba(255,255,255,.6)}
.ab-badge svg{color:#0e0e0e}
.ab-txt{min-width:0}
.ab-title{font-size:13px;font-weight:750;color:var(--txt);letter-spacing:.2px}
.ab-title b{color:var(--acc)}
.ab-sub{font-family:var(--f-mono);font-size:9px;color:var(--dim);margin-top:2px}
.cl-intro{display:flex;align-items:center;gap:7px;font-family:var(--f-disp);font-size:8.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--dim);margin:2px 0 10px}
.cl-intro svg{color:var(--acc)}
.cl-intro::after{content:'';flex:1;height:1px;background:var(--line)}
.cl-entry{position:relative;border-radius:11px;background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01));border:1px solid var(--line);padding:13px 13px 11px;margin-bottom:11px;box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}
.cl-entry.latest{border-color:rgba(255,255,255,.4);background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.012))}
.cl-entry.latest::before{content:'';position:absolute;top:-1px;left:16px;width:44px;height:1px;background:var(--acc);box-shadow:0 0 12px rgba(255,255,255,.8)}
.cl-hdr{display:flex;align-items:center;gap:8px;margin-bottom:9px}
.cl-ver{font-family:var(--f-mono);font-size:12px;font-weight:700;color:var(--acc);letter-spacing:.3px}
.cl-ver::before{content:'';display:inline-block;width:7px;height:7px;background:var(--acc);transform:rotate(45deg);margin-right:7px;vertical-align:1px;box-shadow:0 0 8px rgba(255,255,255,.6)}
.cl-entry.latest .cl-ver{color:#fff}
.cl-tag{font-family:var(--f-disp);font-size:7.5px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;border-radius:4px;padding:2px 7px;background:rgba(255,255,255,.07);border:1px solid var(--line-2);color:var(--soft)}
.cl-tag.Major{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.4);color:var(--acc)}
.cl-tag.Feature{background:rgba(98,98,98,.12);border-color:rgba(98,98,98,.45);color:#ababab}
.cl-tag.Fix{background:rgba(232,121,0,.12);border-color:rgba(232,121,0,.4);color:#ffb26b}
.cl-tag.Initial{background:rgba(255,255,255,.06);border-color:var(--line-2);color:var(--mut)}
.cl-date{margin-left:auto;font-family:var(--f-mono);font-size:8.5px;color:var(--faint)}
.cl-notes{list-style:none;display:flex;flex-direction:column;gap:5px}
.cl-notes li{position:relative;padding-left:15px;font-size:11.5px;color:var(--mut);line-height:1.5}
.cl-notes li::before{content:'';position:absolute;left:2px;top:5.5px;width:5px;height:5px;border:1px solid var(--acc);transform:rotate(45deg);border-radius:1px}
.cl-entry.latest .cl-notes li::before{background:var(--acc);box-shadow:0 0 6px rgba(255,255,255,.7)}
.cl-notes li strong{color:var(--soft)}
.cl-notes .cl-hi{color:var(--acc)}
.cl-tag.Minor{background:linear-gradient(135deg,rgba(232,121,0,.22),rgba(255,255,255,.14));border-color:rgba(232,180,5,.55);color:#ffd08a;box-shadow:0 0 14px rgba(232,121,0,.2)}

.panel{
  position:absolute;top:76px;left:calc(100vw - 500px);right:auto;
  width:468px;height:auto;max-height:min(768px,96vh);
  border:1px solid var(--line-2);border-radius:16px;overflow:hidden;
  box-shadow:none;visibility:hidden;opacity:0;pointer-events:none;
  transform:translateY(10px) scale(.985);
  transition:transform .26s cubic-bezier(.16,1,.3,1),opacity .22s ease,box-shadow .26s ease,visibility 0s linear .26s;
}
.panel.open{
  visibility:visible;opacity:1;pointer-events:all;transform:none;
  box-shadow:0 40px 100px -30px rgba(0,0,0,.92),0 0 0 1px rgba(0,0,0,.4);
  transition:transform .26s cubic-bezier(.16,1,.3,1),opacity .22s ease,box-shadow .26s ease;
}
.hdr{cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none;padding:13px 14px 11px}
.hdr.dragging{cursor:grabbing}
.hdr.dragging *{pointer-events:none}
.wdots{display:none}
.hdr-mx{width:30px;height:30px;border-radius:9px;border:1px solid var(--line);background:var(--glass);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--faint);flex-shrink:0;transition:all .16s}
.hdr-mx:hover{color:var(--acc);border-color:rgba(255,255,255,.4);box-shadow:0 0 14px rgba(255,255,255,.25)}
.hdr-status .uname{max-width:64px}
.ftr-r{padding-right:18px}
.mode-lbl{font-size:9.5px;color:var(--faint);max-width:150px;line-height:1.35}
.panel{height:560px;max-height:96vh;min-width:400px;min-height:380px;resize:both}
.panel.maxed{width:min(96vw,920px) !important;height:min(96vh,900px) !important;max-height:none !important;min-width:0 !important;min-height:0 !important;resize:none !important;left:calc((100vw - min(96vw,920px))/2) !important;top:calc((100vh - min(96vh,900px))/2) !important}
.term-window{position:fixed;top:120px;left:calc(100vw - 620px);width:360px;height:300px;z-index:100000;display:flex;flex-direction:column;border:1px solid var(--line-2);border-radius:12px;background:rgba(11,11,11,.94);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 26px 70px -20px rgba(0,0,0,.9),0 0 0 1px rgba(0,0,0,.35);overflow:hidden;visibility:hidden;opacity:0;pointer-events:none;transform:translateY(8px);transition:transform .24s cubic-bezier(.16,1,.3,1),opacity .2s,visibility 0s linear .24s}
.term-window.open{visibility:visible;opacity:1;pointer-events:all;transform:none;transition:transform .24s cubic-bezier(.16,1,.3,1),opacity .2s}
.term-hdr{display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.03),transparent);cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none;font-size:10px;font-weight:750;letter-spacing:.7px;text-transform:uppercase;color:var(--mut)}
.term-hdr.dragging{cursor:grabbing}
.term-title{display:flex;align-items:center;gap:6px;flex:1;min-width:0}
.term-title svg{color:var(--acc)}
.term-name{color:var(--acc)}
.term-x{width:22px;height:22px;border:none;border-radius:6px;background:transparent;color:var(--faint);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.term-x:hover{background:var(--red);color:#fff}
.term-body{flex:1;overflow-y:auto;overflow-x:hidden;padding:7px;display:flex;flex-direction:column;gap:3px;font-size:10.5px;scrollbar-width:thin;scrollbar-color:var(--line-2) transparent}
.term-body::-webkit-scrollbar{width:6px}
.term-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:3px}
.term-body .ll{display:flex;gap:6px;align-items:baseline;line-height:1.45;word-break:break-word}
.term-body .ll .ll-ts{color:var(--faint);font-size:9px;flex-shrink:0}
.term-body .ll .ll-type{flex-shrink:0}
.term-body .ll .ll-body{color:var(--soft)}
.term-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;flex:1;color:var(--faint);font-size:10.5px;text-align:center;padding:18px}
.term-empty svg{opacity:.5}
.mode-row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px}
.seg{display:flex;background:var(--ink);border:1px solid var(--line);border-radius:9px;padding:2px;gap:2px}
.seg-btn{border:none;background:transparent;color:var(--faint);font-size:9px;font-weight:750;letter-spacing:.6px;text-transform:uppercase;padding:5px 10px;border-radius:7px;cursor:pointer;transition:all .16s}
.seg-btn:hover{color:var(--txt)}
.seg-btn.active{background:linear-gradient(135deg,var(--acc),var(--acc2));color:#0e0e0e;box-shadow:0 3px 12px rgba(255,255,255,.3)}
#pc-sv-all-note{margin-top:2px}
.help-p{font-size:12px;color:var(--mut);line-height:1.6}
.help-p strong{color:var(--txt)}
.help-item{display:flex;gap:10px;align-items:flex-start;padding:9px 4px;border-bottom:1px solid var(--line)}
.help-item:last-child{border-bottom:none}
.help-item svg{color:var(--acc);flex-shrink:0;margin-top:2px}
.help-item-t{font-size:12px;font-weight:750;color:var(--txt)}
.help-item-d{font-size:11px;color:var(--faint);line-height:1.5;margin-top:2px}
.help-q{padding:10px 4px;border-bottom:1px dashed var(--line)}
.help-q:last-child{border-bottom:none}
.help-q strong{display:block;font-size:11.5px;color:var(--acc);font-weight:750}
.help-q p{margin-top:3px;font-size:11.5px;color:var(--mut);line-height:1.55}
.onb-intro{position:fixed;inset:0;z-index:100020;background:rgba(6,6,6,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;pointer-events:auto}
.onb-intro.open{display:flex}
.onb-card{width:min(340px,calc(100vw - 40px));background:rgba(15,15,15,.96);border:1px solid var(--line-2);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:12px;box-shadow:0 30px 80px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.08);animation:onbCardIn .22s cubic-bezier(.16,1,.3,1)}
@keyframes onbCardIn{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
.onb-title{font-size:16px;font-weight:800;color:#fff}
.onb-text{font-size:12.5px;color:var(--mut);line-height:1.55}
.onb-actions{display:flex;gap:8px;justify-content:flex-end}
.onb-tut{position:fixed;inset:0;z-index:100010;pointer-events:none;display:none}
.onb-tut.open{display:block}
.onb-spot{position:absolute;background:transparent;z-index:1}
.onb-spot.circle{border-radius:50%;animation:onbPulse 1.8s ease-in-out infinite}
.onb-spot.box{border-radius:12px;box-shadow:0 0 0 100vmax rgba(6,6,6,.78),0 0 0 2px rgba(255,255,255,.9)}
@keyframes onbPulse{0%,100%{box-shadow:0 0 0 100vmax rgba(6,6,6,.78),0 0 0 3px rgba(255,255,255,.95),0 0 0 7px rgba(255,255,255,.25)}50%{box-shadow:0 0 0 100vmax rgba(6,6,6,.78),0 0 0 4px rgba(255,255,255,1),0 0 26px 9px rgba(255,255,255,.35)}}
.onb-skip{position:fixed;top:18px;right:22px;z-index:3;pointer-events:auto;border:1px solid var(--line-2);background:rgba(15,15,15,.85);color:var(--faint);font-size:11px;font-weight:700;padding:7px 14px;border-radius:9px;cursor:pointer;transition:all .15s}
.onb-skip:hover{color:#fff;border-color:rgba(255,255,255,.3)}
.onb-bub{position:absolute;z-index:3;width:min(320px,calc(100vw - 60px));background:rgba(15,15,15,.96);border:1px solid var(--line-2);border-radius:13px;padding:14px 15px;display:flex;flex-direction:column;gap:10px;box-shadow:0 24px 60px rgba(0,0,0,.65);pointer-events:auto}
.onb-bub-title{font-size:13.5px;font-weight:800;color:var(--acc)}
.onb-bub-text{font-size:12px;color:var(--soft);line-height:1.65}
.onb-dots{display:flex;gap:5px}
.onb-dots i{width:6px;height:6px;border-radius:50%;background:var(--line);transition:all .2s}
.onb-dots i.on{background:var(--acc);transform:scale(1.35)}
.onb-bub-actions{display:flex;gap:8px;justify-content:flex-end}
`;

  function buildHTML() {
    return `<div class="panel" id="pc-panel">

  <div class="hdr">
    <img class="hdr-logo" src="${LOGO}" alt="" />
    <div class="hdr-brand">
      <span class="hdr-name">Israel<em>Cord</em></span>
      <span class="hdr-ver">v${VER}</span>
    </div>
    <div class="hdr-status" id="pc-status"><span class="dot"></span><span class="uname" id="pc-uname">No token</span></div>
    <div class="hdr-running hidden" id="pc-running"><span class="pulse"></span><span id="pc-run-lbl">Running</span></div>
    <button class="hdr-mx" id="pc-mx" title="Maximize">${ic('maximize',13)}</button>
    <button class="hdr-close" id="pc-close" title="Close (Esc)">${ic('x',14)}</button>
  </div>

  <nav class="nav" id="pc-tabs">
    <div class="nav-pill active" data-tab="dash" title="Home">${ic('grid',13)}<span>Home</span></div>
    <div class="nav-pill" data-tab="prune" title="Prune a channel">${ic('trash',13)}<span>Prune</span></div>
    <div class="nav-pill" data-tab="server" title="Purge a whole server">${ic('server',13)}<span>Server</span></div>
    <div class="nav-pill" data-tab="ghost" title="Ghost your messages">${ic('ghost',13)}<span>Ghost</span></div>
    <div class="nav-pill" data-tab="dms" title="Purge DMs">${ic('message',13)}<span>DMs</span></div>
    <div class="nav-pill" data-tab="download" title="Download Messages">${ic('download',13)}<span>Download</span></div>
    <div class="nav-pill" data-tab="settings" title="Configuration">${ic('settings',13)}<span>Config</span></div>
    <div class="nav-pill" data-tab="help" title="Help & safety">${ic('info',13)}<span>Help</span></div>
    <div class="nav-pill" data-tab="about" title="Changelog">${ic('scroll',13)}<span>Updates</span></div>
  </nav>

  <div class="body">

    <div class="pane active" data-pane="dash">
      <div class="hero">
        <div class="hero-top">
          <div class="hero-ava" id="pc-hero-ava"></div>
          <div class="hero-id">
            <div class="hero-name" id="pc-hero-name">Not connected</div>
            <div class="hero-sub" id="pc-hero-id">Link your Discord session to begin</div>
          </div>
          <span class="hero-chip off" id="pc-hero-chip">Needs token</span>
        </div>
        <div class="hero-conn"><span class="dot" id="pc-hero-dot"></span><span id="pc-hero-txt">Session not linked</span></div>
        <div class="divider"></div>
        <div class="dash-actions">
          <button class="btn btn-primary" id="pc-dash-dryrun" disabled>${ic('zap',13)} Quick Dry Run</button>
          <button class="btn btn-glass" id="pc-dash-goprune">${ic('trash',13)} Prune</button>
        </div>
      </div>

      <div class="card">
        <div class="card-hdr-row">
          <div class="card-hdr">${ic('bar',11)} Lifetime Statistics</div>
          <button class="sel-all-btn" id="pc-dash-export">${ic('download',11)} Export</button>
        </div>
        <div class="stat-grid">
          <div class="stat"><span class="stat-v" id="st-total">∅</span><span class="stat-l">Total deleted</span></div>
          <div class="stat"><span class="stat-v" id="st-runs">∅</span><span class="stat-l">Runs completed</span></div>
          <div class="stat"><span class="stat-v" id="st-avg">∅</span><span class="stat-l">Avg per run</span></div>
          <div class="stat"><span class="stat-v" id="st-since">∅</span><span class="stat-l">Days active</span></div>
        </div>
      </div>

      <div class="card">
        <div class="card-hdr">${ic('clock',11)} Recent Activity</div>
        <div class="dash-recent" id="pc-dash-recent"></div>
      </div>

      <div class="card">
        <div class="card-hdr">${ic('sparkles',11)} Feedback</div>
        <span class="field-hint">Ideas, requests, anything. One message every 4 hours, your token is never included.</span>
        <textarea id="pc-feedback-msg" class="inp" rows="3" placeholder="Enter your feedback..." spellcheck="false"></textarea>
        <div class="act-row">
          <button id="pc-feedback-send" class="btn btn-primary">${ic('send',13)} Send Feedback</button>
        </div>
        <span class="field-hint" id="pc-feedback-status"></span>
      </div>
    </div>

    <div class="pane" data-pane="prune">

      <div class="tok-ov" id="pc-tok-ov">
        <div class="tok-hdr">${ic('key',13)} Session not linked</div>
        <div class="act-row">
          <button id="pc-tok-auto" class="btn btn-primary">${ic('refresh',13)} Auto-detect token</button>
        </div>
        <span class="field-hint" id="pc-tok-status">IsraelCord reads the authorization header Discord already sends, so you do not have to copy anything by hand.</span>
        <div class="divider"></div>
        <div class="inp-row">
          <input id="pc-tok" type="password" class="inp mono" placeholder="Or paste a token manually" spellcheck="false" autocomplete="off" />
          <button id="pc-tok-eye" class="icon-btn" title="Reveal / hide">${ic('eye',14)}</button>
          <button id="pc-tok-save" class="btn btn-glass btn-sm" style="flex:none;padding:0 14px;height:36px">Save</button>
        </div>
      </div>

      <div class="dryrun-badge" id="pc-dryrun-badge">${ic('search',13)}<span><strong>Dry Run</strong> enabled , no messages will be deleted</span></div>

      <div class="card">
        <div class="card-hdr">${ic('filter',11)} Setup</div>
        <div class="inp-row">
          <input id="pc-ch" type="text" class="inp mono" placeholder="Channel ID" spellcheck="false" />
          <button id="pc-detect" class="icon-btn" title="Auto-detect from current Discord channel">${ic('refresh',15)}</button>
        </div>
        <span class="field-hint">Navigate to any channel or DM in Discord, then click refresh to auto-fill.</span>

        <div class="divider"></div>

        <div class="date-row">
          <div class="date-field"><label class="sub-lbl" for="pc-after">After</label><input id="pc-after" type="date" class="inp" /></div>
          <span class="date-sep">→</span>
          <div class="date-field"><label class="sub-lbl" for="pc-before">Before</label><input id="pc-before" type="date" class="inp" /></div>
        </div>

        <label class="sub-lbl" for="pc-kw">Keyword / regex</label>
        <input id="pc-kw" type="text" class="inp" placeholder="text or /regex/flags" spellcheck="false" />

        <div class="divider"></div>

        <div class="toggles tog-grid">
          <label class="toggle"><div class="tog-sw"><input id="pc-mine" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Only mine</span><span class="tog-sub">Skip other users' messages</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-pinned" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Keep pinned</span><span class="tog-sub">Leave pinned untouched</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-skip-bots" type="checkbox" /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Skip bots</span><span class="tog-sub">Ignore bot messages</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-oldest" type="checkbox" /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Oldest first</span><span class="tog-sub">Delete oldest → newest</span></div></label>
        </div>

        <div class="divider"></div>

        <div class="toggles safe-row">
          <label class="toggle"><div class="tog-sw"><input id="pc-safe" type="checkbox" /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Safe Mode</span><span class="tog-sub warn-sub">Deletes in batches of 50 with long pauses , far slower, but you can keep using other chats.</span></div></label>
          <select id="pc-safe-wait" class="inp sel-inp" title="Pause length between batches" disabled>
            <option value="1">1 min pause</option>
            <option value="3" selected>3 min pause</option>
            <option value="5">5 min pause</option>
            <option value="10">10 min pause</option>
          </select>
        </div>
      </div>

      <div class="confirm-step hidden" id="pc-confirm">
        <div class="card-hdr">${ic('alert',11)} Confirm Prune</div>
        <p>You're about to delete <strong>@<span id="pc-confirm-user">you</span></strong>'s messages in channel <strong id="pc-confirm-ch">∅</strong>. This cannot be undone.</p>
        <div class="act-row">
          <button id="pc-confirm-go" class="btn btn-danger">${ic('trash',13)} Yes, Delete</button>
          <button id="pc-confirm-cancel" class="btn btn-glass">Cancel</button>
        </div>
      </div>

      <div class="act-row" id="pc-prune-actions">
        <button id="pc-start" class="btn btn-primary" disabled>${ic('trash',13)} Prune Channel</button>
      </div>

      <div id="pc-prog" class="prog-card hidden">
        <div class="chips">
          <div class="chip"><span class="chip-v" id="pc-v-del">0</span><span class="chip-l">Deleted</span></div>
          <div class="chip"><span class="chip-v" id="pc-v-ski">0</span><span class="chip-l">Skipped</span></div>
          <div class="chip"><span class="chip-v" id="pc-v-dry">0</span><span class="chip-l">Would del</span></div>
          <div class="chip"><span class="chip-v" id="pc-v-fai">0</span><span class="chip-l">Failed</span></div>
        </div>
        <div class="run-meta">
          <span>${ic('clock',10)}<span id="pc-elapsed">0:00</span></span>
          <span>${ic('bar',10)}<span id="pc-rate">0/min</span></span>
        </div>
        <div class="safe-badge hidden" id="pc-safe-cd">${ic('shield',12)}<span>Safe Mode , pausing between batches, resuming in <span class="t-live" data-cd>3:00</span></span></div>
        <div class="prog-track"><div id="pc-pbar" class="prog-fill"></div></div>
        <div class="act-row">
          <button id="pc-pause" class="btn btn-glass btn-sm">${ic('pause',12)} Pause</button>
          <button id="pc-stop" class="btn btn-glass btn-sm">${ic('square',12)} Stop</button>
        </div>
        <div class="log-wrap">
          <div class="log-actions"><span class="log-title">Activity log</span><button class="log-export" id="pc-export">${ic('download',11)} Export</button></div>
          <div class="log-box" id="pc-log"></div>
        </div>
      </div>
    </div>

    <div class="pane" data-pane="server">
      <div class="card">
        <div class="card-hdr-row">
          <div class="card-hdr">${ic('server',11)} Target Servers</div>
          <button id="pc-sv-load" class="btn btn-glass btn-sm">${ic('refresh',12)} Load Servers</button>
        </div>
        <div class="preview-strip" id="pc-sv-prev">
          <span class="ps-label">Servers queued for purge</span>
          <span class="ps-val loading" id="pc-sv-ct">∅</span>
        </div>
        <div style="display:none" id="pc-sv-list-wrap">
          <div class="mode-row">
            <span class="card-hdr">Purge scope</span>
            <div class="seg" id="pc-sv-mode">
              <button class="seg-btn active" data-mode="all">All servers</button>
              <button class="seg-btn" data-mode="pick">Pick servers</button>
            </div>
          </div>
          <span class="warn-note" id="pc-sv-all-note">${ic('server',11)} Every server in your account will be purged, channel by channel.</span>
          <div class="sel-hdr" id="pc-sv-pick-hdr" style="display:none">
            <span class="card-hdr">Pick where to purge</span>
            <div class="sel-actions">
              <button class="sel-all-btn" id="pc-sv-all">All</button>
              <button class="sel-all-btn" id="pc-sv-none">None</button>
            </div>
          </div>
          <div class="check-list" id="pc-sv-list" style="display:none"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-hdr">${ic('filter',11)} Purge Options</div>
        <div class="toggles tog-grid">
          <label class="toggle"><div class="tog-sw"><input id="pc-sv-mine" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Only my messages</span><span class="tog-sub">Skip other users' posts</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-sv-pinned" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Keep pinned</span><span class="tog-sub">Leave pinned alone</span></div></label>
        </div>
        <div class="divider"></div>
        <span class="warn-note">${ic('alert',11)} Purges <strong>your messages</strong> from every chat channel of each selected server. Anything you cannot delete is skipped, nothing else is touched. This <strong>cannot be undone</strong>.</span>
      </div>

      <div class="confirm-step hidden" id="pc-sv-confirm">
        <div class="card-hdr">${ic('alert',11)} Confirm Server Purge</div>
        <p>You're about to purge <strong>@<span id="pc-sv-confirm-user">you</span></strong>'s messages from <strong id="pc-sv-confirm-ct">0</strong> servers. Every message you sent in them will be removed channel by channel. This cannot be undone.</p>
        <div class="act-row">
          <button id="pc-sv-confirm-go" class="btn btn-danger">${ic('trash',13)} Yes, Purge</button>
          <button id="pc-sv-confirm-cancel" class="btn btn-glass">Cancel</button>
        </div>
      </div>

      <div class="act-row" id="pc-sv-actions">
        <button id="pc-sv-start" class="btn btn-primary" disabled>${ic('trash',13)} Purge Servers</button>
      </div>

      <div id="pc-sv-prog" class="prog-card hidden">
        <div class="cur-row"><span class="cur-name" id="pc-sv-cur">∅</span><span class="cur-ct" id="pc-sv-cur-ct"></span></div>
        <div class="chips">
          <div class="chip"><span class="chip-v" id="pc-sv-del">0</span><span class="chip-l">Deleted</span></div>
          <div class="chip"><span class="chip-v" id="pc-sv-ch">0</span><span class="chip-l">Channels</span></div>
          <div class="chip"><span class="chip-v" id="pc-sv-fai">0</span><span class="chip-l">Failed</span></div>
        </div>
        <div class="run-meta">
          <span>${ic('clock',10)}<span id="pc-sv-elapsed">0:00</span></span>
          <span>${ic('bar',10)}<span id="pc-sv-rate">0/min</span></span>
        </div>
        <div class="prog-track"><div id="pc-sv-pbar" class="prog-fill"></div></div>
        <div class="act-row">
          <button id="pc-sv-pause" class="btn btn-glass btn-sm">${ic('pause',12)} Pause</button>
          <button id="pc-sv-stop" class="btn btn-glass btn-sm">${ic('square',12)} Stop</button>
        </div>
        <div class="log-wrap">
          <div class="log-actions"><span class="log-title">Activity log</span><button class="log-export" id="pc-sv-export">${ic('download',11)} Export</button></div>
          <div class="log-box" id="pc-sv-log"></div>
        </div>
      </div>
    </div>

    <div class="pane" data-pane="ghost">
      <div class="card">
        <div class="card-hdr-row">
          <div class="card-hdr">${ic('loader',11)} Target Servers</div>
          <button id="pc-gs-load" class="btn btn-glass btn-sm">${ic('refresh',12)} Load Servers</button>
        </div>
        <div class="preview-strip" id="pc-g-prev">
          <span class="ps-label">Eligible servers selected</span>
          <span class="ps-val loading" id="pc-g-ct">∅</span>
        </div>
        <div style="display:none" id="pc-gs-list-wrap">
          <div class="sel-hdr">
            <span class="card-hdr">Select targets</span>
            <div class="sel-actions">
              <button class="sel-all-btn" id="pc-gs-all">All</button>
              <button class="sel-all-btn" id="pc-gs-none">None</button>
            </div>
          </div>
          <div class="check-list" id="pc-gs-list"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-hdr">${ic('shield',11)} Final Confirmation</div>
        <p class="who-line">You're about to purge <strong>@<span id="pc-gs-confirm-user">you</span></strong>'s messages from non-owned servers.</p>
        <div class="warn-card" style="padding:11px 13px">
          <div class="warn-hdr">${ic('alert',13)} Danger , Read First</div>
          <ul class="warn-list">
            <li>Permanently deletes <strong>every message</strong> you sent in non-owned servers.</li>
            <li>Deleted messages <strong>cannot be recovered</strong> by you or the server.</li>
            <li>Includes servers you are <strong>still a member of</strong>.</li>
            <li>May take a <strong>very long time</strong>. Keep Discord open.</li>
          </ul>
        </div>
        <div class="g-checks">
          <label class="g-check"><input id="gc1" type="checkbox" /><span>I understand this <strong>permanently and irreversibly</strong> deletes my messages from all selected servers.</span></label>
          <label class="g-check"><input id="gc2" type="checkbox" /><span>I understand there is <strong>absolutely no undo</strong> or way to recover deleted messages.</span></label>
          <label class="g-check"><input id="gc3" type="checkbox" /><span>I take <strong>full responsibility</strong> for this operation.</span></label>
        </div>
        <div class="g-confirm">
          <label class="sub-lbl" for="gc-inp">Type <strong>GHOST</strong> to unlock the button</label>
          <input id="gc-inp" type="text" class="inp" placeholder="GHOST" spellcheck="false" autocomplete="off" maxlength="5" />
        </div>
        <div class="act-row">
          <button id="pc-gs-start" class="btn btn-primary" disabled>${ic('ghost',13)} Go Ghost</button>
        </div>
      </div>

      <div id="pc-gs-prog" class="prog-card hidden">
        <div class="cur-row"><span class="cur-name" id="pc-gs-name">∅</span><span class="cur-ct" id="pc-gs-ct"></span></div>
        <div class="chips">
          <div class="chip"><span class="chip-v" id="pc-g-del">0</span><span class="chip-l">Deleted</span></div>
          <div class="chip"><span class="chip-v" id="pc-g-srv">0</span><span class="chip-l">Servers</span></div>
          <div class="chip"><span class="chip-v" id="pc-g-fai">0</span><span class="chip-l">Failed</span></div>
        </div>
        <div class="run-meta">
          <span>${ic('clock',10)}<span id="pc-g-elapsed">0:00</span></span>
          <span>${ic('bar',10)}<span id="pc-g-rate">0/min</span></span>
        </div>
        <div class="prog-track"><div id="pc-gs-pbar" class="prog-fill"></div></div>
        <div class="act-row">
          <button id="pc-gs-pause" class="btn btn-glass btn-sm">${ic('pause',12)} Pause</button>
          <button id="pc-gs-stop" class="btn btn-glass btn-sm">${ic('square',12)} Stop</button>
        </div>
        <div class="log-wrap">
          <div class="log-actions"><span class="log-title">Activity log</span><button class="log-export" id="pc-g-export">${ic('download',11)} Export</button></div>
          <div class="log-box" id="pc-g-log"></div>
        </div>
      </div>
    </div>

    <div class="pane" data-pane="dms">
      <div class="card">
        <div class="card-hdr-row">
          <div class="card-hdr">${ic('message',11)} Direct Messages</div>
          <button id="pc-dm-load" class="btn btn-glass btn-sm">${ic('refresh',12)} Load DMs</button>
        </div>
        <div class="preview-strip" id="pc-dm-prev">
          <span class="ps-label">DMs selected</span>
          <span class="ps-val loading" id="pc-dm-ct-prev">∅</span>
        </div>
        <div style="display:none" id="pc-dm-list-wrap">
          <div class="sel-hdr">
            <span class="card-hdr">Select DMs to purge</span>
            <div class="sel-actions">
              <button class="sel-all-btn" id="pc-dm-all">All</button>
              <button class="sel-all-btn" id="pc-dm-none">None</button>
            </div>
          </div>
          <div class="check-list" id="pc-dm-list"></div>
        </div>
      </div>

      <div class="card">
        <div class="toggles safe-row safe-row-dm">
          <label class="toggle"><div class="tog-sw"><input id="pc-dm-safe" type="checkbox" /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Safe Mode</span><span class="tog-sub warn-sub">Deletes in batches of 50 with long pauses , keeps DMs usable in the meantime.</span></div></label>
          <select id="pc-dm-safe-wait" class="inp sel-inp" title="Pause length between batches" disabled>
            <option value="1">1 min pause</option>
            <option value="3" selected>3 min pause</option>
            <option value="5">5 min pause</option>
            <option value="10">10 min pause</option>
          </select>
        </div>
        <div class="divider"></div>
        <div class="act-row">
          <button id="pc-dm-start" class="btn btn-primary" disabled>${ic('trash',13)} Purge Selected DMs</button>
        </div>
        <span class="warn-note">${ic('alert',11)} Deletes <strong>your messages</strong> from every selected DM and group chat. This <strong>cannot be undone</strong>.</span>
      </div>

      <div id="pc-dm-prog" class="prog-card hidden">
        <div class="cur-row"><span class="cur-name" id="pc-dm-cur">∅</span><span class="cur-ct" id="pc-dm-ct"></span></div>
        <div class="chips">
          <div class="chip"><span class="chip-v" id="pc-dm-del">0</span><span class="chip-l">Deleted</span></div>
          <div class="chip"><span class="chip-v" id="pc-dm-srv">0</span><span class="chip-l">Chats</span></div>
          <div class="chip"><span class="chip-v" id="pc-dm-fai">0</span><span class="chip-l">Failed</span></div>
        </div>
        <div class="run-meta">
          <span>${ic('clock',10)}<span id="pc-dm-elapsed">0:00</span></span>
          <span>${ic('bar',10)}<span id="pc-dm-rate">0/min</span></span>
        </div>
        <div class="safe-badge hidden" id="pc-dm-safe-cd">${ic('shield',12)}<span>Safe Mode , pausing between batches, resuming in <span class="t-live" data-cd>3:00</span></span></div>
        <div class="prog-track"><div id="pc-dm-pbar" class="prog-fill"></div></div>
        <div class="act-row">
          <button id="pc-dm-pause" class="btn btn-glass btn-sm">${ic('pause',12)} Pause</button>
          <button id="pc-dm-stop" class="btn btn-glass btn-sm">${ic('square',12)} Stop</button>
        </div>
        <div class="log-wrap">
          <div class="log-actions"><span class="log-title">Activity log</span><button class="log-export" id="pc-dm-export">${ic('download',11)} Export</button></div>
          <div class="log-box" id="pc-dm-log"></div>
        </div>
      </div>
    </div>

    <div class="pane" data-pane="download">
      <div class="card">
        <div class="card-hdr">${ic('download',11)} Message Archive</div>
        <span class="field-hint">Save messages from a channel, a DM, or an entire server into a file you keep.</span>
        <div class="mode-row">
          <span class="card-hdr">Source</span>
          <div class="seg" id="pc-dl-src">
            <button class="seg-btn active" data-src="channel">Channel</button>
            <button class="seg-btn" data-src="server">Server</button>
          </div>
        </div>
        <div class="inp-row">
          <input id="pc-dl-ch" type="text" class="inp mono" placeholder="Channel ID" spellcheck="false" />
          <button id="pc-dl-detect" class="icon-btn" title="Auto-detect from the current Discord page">${ic('refresh',15)}</button>
        </div>
        <span class="field-hint" id="pc-dl-src-hint">Open the channel or DM you want, then click refresh.</span>
        <div class="act-row" id="pc-dl-dm-row">
          <button id="pc-dl-load-dms" class="btn btn-glass btn-sm">${ic('message',12)} Load my DMs</button>
        </div>
        <select id="pc-dl-dm" class="inp hidden"></select>
      </div>

      <div class="card">
        <div class="card-hdr">${ic('clock',11)} Time Range</div>
        <label class="toggle"><div class="tog-sw"><input id="pc-dl-all" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Everything</span><span class="tog-sub">No date limits at all</span></div></label>
        <div id="pc-dl-time" class="hidden">
          <div class="date-row">
            <div class="date-field"><label class="sub-lbl" for="pc-dl-after">After</label><input id="pc-dl-after" type="date" class="inp" /></div>
            <span class="date-sep">-</span>
            <div class="date-field"><label class="sub-lbl" for="pc-dl-before">Before</label><input id="pc-dl-before" type="date" class="inp" /></div>
          </div>
          <div class="act-row" style="flex-wrap:wrap;margin-top:8px">
            <button class="btn btn-glass btn-sm" data-dl-preset="7">Last 7 days</button>
            <button class="btn btn-glass btn-sm" data-dl-preset="30">30 days</button>
            <button class="btn btn-glass btn-sm" data-dl-preset="90">90 days</button>
            <button class="btn btn-glass btn-sm" data-dl-preset="365">1 year</button>
          </div>
        </div>
        <div class="divider"></div>
        <label class="sub-lbl" for="pc-dl-max">Message limit, 0 means no limit</label>
        <input id="pc-dl-max" type="number" class="inp mono" min="0" step="100" value="0" />
      </div>

      <div class="card">
        <div class="card-hdr">${ic('filter',11)} Filters</div>
        <div class="toggles tog-grid">
          <label class="toggle"><div class="tog-sw"><input id="pc-dl-mine" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Only mine</span><span class="tog-sub">Messages you sent</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-dl-bots" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Skip bots</span><span class="tog-sub">Leave bot authors out</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-dl-att" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Attachments</span><span class="tog-sub">Keep file links</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-dl-embeds" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Embeds</span><span class="tog-sub">Keep link previews</span></div></label>
        </div>
        <div class="divider"></div>
        <label class="sub-lbl" for="pc-dl-kw">Keyword or regex</label>
        <input id="pc-dl-kw" type="text" class="inp" placeholder="text or /pattern/flags" spellcheck="false" />
        <label class="sub-lbl" for="pc-dl-author">Only this author ID, optional</label>
        <input id="pc-dl-author" type="text" class="inp mono" placeholder="User ID" spellcheck="false" />
      </div>

      <div class="card">
        <div class="card-hdr">${ic('layers',11)} Export Format</div>
        <select id="pc-dl-format" class="inp">
          <option value="json">JSON, complete data</option>
          <option value="ndjson">NDJSON, one message per line</option>
          <option value="txt">Plain text</option>
          <option value="md">Markdown</option>
          <option value="html">HTML, styled page</option>
          <option value="csv">CSV, spreadsheet ready</option>
        </select>
        <label class="toggle"><div class="tog-sw"><input id="pc-dl-pretty" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Readable output</span><span class="tog-sub">Pretty JSON, headers, spacing</span></div></label>
      </div>

      <div class="act-row">
        <button id="pc-dl-start" class="btn btn-primary">${ic('download',13)} Start Download</button>
        <button id="pc-dl-pause" class="btn btn-glass" disabled>${ic('pause',13)} Pause</button>
        <button id="pc-dl-stop" class="btn btn-danger" disabled>${ic('x',13)} Stop</button>
      </div>

      <div class="prog-card hidden" id="pc-dl-prog">
        <div class="chips">
          <div class="chip"><span class="chip-v" id="pc-dl-v-msg">0</span><span class="chip-l">Messages</span></div>
          <div class="chip"><span class="chip-v" id="pc-dl-v-page">0</span><span class="chip-l">Pages</span></div>
          <div class="chip"><span class="chip-v" id="pc-dl-v-ch">0</span><span class="chip-l">Channels</span></div>
          <div class="chip"><span class="chip-v" id="pc-dl-v-skip">0</span><span class="chip-l">Skipped</span></div>
        </div>
        <div class="run-meta">
          <span>${ic('clock',10)}<span id="pc-dl-elapsed">0:00</span></span>
          <span>${ic('bar',10)}<span id="pc-dl-rate">0/min</span></span>
        </div>
        <div class="prog-track"><div id="pc-dl-fill" class="prog-fill run"></div></div>
        <div class="cur-row"><span class="cur-name" id="pc-dl-cur">Waiting</span><span class="cur-ct" id="pc-dl-cur-ct"></span></div>
        <div class="log-wrap">
          <div class="log-actions"><span class="log-title">Download log</span><button class="log-export" id="pc-dl-export">${ic('download',11)} Export</button></div>
          <div class="log-box" id="pc-dl-log"></div>
        </div>
      </div>

      <div class="card hidden" id="pc-dl-result">
        <div class="card-hdr">${ic('check',11)} Archive ready</div>
        <div class="stat-grid">
          <div class="stat"><span class="stat-v" id="pc-dl-count">0</span><span class="stat-l">Messages</span></div>
          <div class="stat"><span class="stat-v" id="pc-dl-size">0 KB</span><span class="stat-l">File size</span></div>
        </div>
        <div class="act-row">
          <button id="pc-dl-save" class="btn btn-primary">${ic('download',13)} Save again</button>
          <button id="pc-dl-copy" class="btn btn-glass">${ic('copy',13)} Copy</button>
        </div>
        <span class="field-hint" id="pc-dl-result-hint"></span>
      </div>

      <div class="card hidden" id="pc-dl-preview-card">
        <div class="card-hdr">${ic('scroll',11)} Preview</div>
        <div class="dash-recent" id="pc-dl-preview"></div>
      </div>
    </div>


    <div class="pane" data-pane="settings">

      <span class="section-lbl">Behavior</span>
      <div class="card">
        <div class="range-row">
          <div class="range-hdr">
            <div class="card-hdr">${ic('clock',11)} Delete delay</div>
            <div style="display:flex;align-items:center;gap:8px"><span class="range-val" id="pc-delay-v">300ms</span><span class="save-ind" id="pc-save-ind">✓ Saved</span></div>
          </div>
          <input type="range" id="pc-delay" min="100" max="3000" step="50" value="300" />
          <div style="display:flex;justify-content:space-between;font-size:9.5px;color:var(--faint)"><span>100ms (fast)</span><span>3000ms (safe)</span></div>
        </div>
        <div class="toggles">
          <label class="toggle"><div class="tog-sw"><input id="pc-dry-run" type="checkbox" /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Dry Run mode</span><span class="tog-sub">Count messages without deleting anything</span></div></label>
          <label class="toggle"><div class="tog-sw"><input id="pc-auto-pause" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Auto-pause on rate limit</span><span class="tog-sub">Pause instead of failing when throttled</span></div></label>
        </div>
      </div>

      <span class="section-lbl">Output</span>
      <div class="card">
        <div class="card-hdr">${ic('layers',11)} Terminal window</div>
        <div class="mode-row" style="margin-bottom:10px">
          <span class="mode-lbl">Where should operation logs appear?</span>
          <div class="seg" id="pc-term-mode">
            <button class="seg-btn active" data-term="main">Main window</button>
            <button class="seg-btn" data-term="separate">Separate</button>
          </div>
        </div>
        <div class="divider"></div>
        <label class="toggle"><div class="tog-sw"><input id="pc-prog-toasts" type="checkbox" checked /><span class="slider"></span></div><div class="tog-txt"><span class="tog-title">Progress notifications</span><span class="tog-sub">Notify at 25% / 50% / 75% and when a purge finishes</span></div></label>
      </div>

      <span class="section-lbl">Session</span>
      <div class="card">
        <div class="card-hdr">${ic('key',11)} Session Secret</div>
        <div class="inp-row">
          <input id="pc-ss" type="password" class="inp mono" placeholder="No session secret saved" spellcheck="false" autocomplete="off" readonly />
          <button id="pc-ss-eye" class="icon-btn" title="Reveal / hide">${ic('eye',14)}</button>
        </div>
        <span class="field-hint">Your session secret, saved and encrypted on this device.</span>
      </div>

      <span class="section-lbl">Tools</span>
      <div class="card">
        <div class="settings-actions">
          <button class="settings-btn" id="sb-clear-token">${ic('eraser',14)} Clear session secret<span class="sb-sub">Removes stored auth</span></button>
          <button class="settings-btn" id="sb-reset-stats">${ic('eraser',14)} Reset statistics<span class="sb-sub">Clears counters</span></button>
          <button class="settings-btn" id="sb-export-log">${ic('download',14)} Export last log<span class="sb-sub">Download as .txt</span></button>
        </div>
      </div>

      <span class="section-lbl">About</span>
      <div class="about-card">
        <div class="about-row"><span class="about-key">Version</span><span class="about-val">v${VER}</span></div>
        <div class="about-row"><span class="about-key">Browsers</span><span class="about-val">Chrome · Edge · Brave</span></div>
        <div class="divider"></div>
        <div class="kbd-hint">${ic('x',11)}<kbd>Esc</kbd> closes the panel from anywhere</div>
      </div>
    </div>

    <div class="pane" data-pane="help">
      <div class="card">
        <div class="card-hdr">${ic('info',11)} What is IsraelCord?</div>
        <p class="help-p">IsraelCord mass-deletes <strong>your own</strong> Discord messages for you. It runs right inside Discord and talks to Discord's own API, the exact same way the app itself does.</p>
      </div>

      <div class="card">
        <div class="card-hdr">${ic('layers',11)} What each tool does</div>
        <div class="help-item">${ic('trash',13)}<div><div class="help-item-t">Prune</div><div class="help-item-d">Deletes your messages in one channel, or a DM. The place to start.</div></div></div>
        <div class="help-item">${ic('server',13)}<div><div class="help-item-t">Server</div><div class="help-item-d">Purges your messages across every channel of a whole server at once.</div></div></div>
        <div class="help-item">${ic('ghost',13)}<div><div class="help-item-t">Ghost</div><div class="help-item-d">Wipes your messages from servers you don't own. Goes through them one by one.</div></div></div>
        <div class="help-item">${ic('message',13)}<div><div class="help-item-t">DMs</div><div class="help-item-d">Cleans your past direct-message conversations, one chat at a time.</div></div></div>
        <div class="help-item">${ic('download',13)}<div><div class="help-item-t">Download</div><div class="help-item-d">Archives messages into a file instead of deleting them. Pick a channel, a DM or a whole server, set a date range, filter, then choose JSON, text, Markdown, HTML or CSV.</div></div></div>
      </div>

      <div class="card">
        <div class="warn-card" style="padding:12px 13px">
          <div class="warn-hdr">${ic('alert',13)} Read this before you delete</div>
          <ul class="warn-list">
            <li>Only <strong>your own</strong> messages are ever touched, nothing you didn't send.</li>
            <li>There is <strong>no undo</strong>. Once deleted, they're gone for good.</li>
            <li>Run a <strong>Dry Run</strong> first to preview exactly what would be deleted.</li>
            <li><strong>Start small</strong>. Try Prune on one channel before Server or Ghost.</li>
            <li>Keep <strong>Discord open</strong> while a purge runs, on the same account.</li>
            <li>Never share your <strong>session secret or token</strong> with anyone, not even "tech support".</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-hdr">${ic('target',11)} Common questions</div>
        <div class="help-q"><strong>Why is it going slow?</strong><p>Discord rate-limits deletions. Raise the delay in Config, and turn on Safe Mode for anything big.</p></div>
        <div class="help-q"><strong>Why were some messages skipped?</strong><p>Anything you can't delete, like other people's messages, pinned or bot messages when those are off, or messages Discord no longer returns in search.</p></div>
        <div class="help-q"><strong>Can I stop mid-way?</strong><p>Yes. Pause freezes it, Stop ends it. Anything already deleted before Stop is gone.</p></div>
        <div class="help-q"><strong>Is my session safe?</strong><p>It is encrypted on your device. It only leaves your browser if you choose to send a feedback message, and feedback never includes your token.</p></div>
        <div class="divider"></div>
        <div class="act-row">
          <button class="btn btn-glass" id="pc-help-tour">${ic('info',11)} Walk me through it again</button>
        </div>
      </div>
    </div>

    <div class="pane" data-pane="about">
      <div class="about-banner">
        <div class="ab-badge">${ic('sparkles',15)}</div>
        <div class="ab-txt">
          <div class="ab-title">You're on the <b>latest build</b></div>
          <div class="ab-sub">IsraelCord v${VER} · up and running</div>
        </div>
      </div>
      <div class="about-card">
        <div class="about-row"><span class="about-key">${ic('sparkles',11)} Product</span><span class="about-val">IsraelCord</span></div>
        <div class="about-row"><span class="about-key">Current build</span><span class="about-val">v${VER}</span></div>
        <div class="about-row"><span class="about-key">Core</span><span class="about-val">${ic('shield',11)} Encrypted session</span></div>
      </div>
      <div class="cl-intro">${ic('layers',11)} <span>Changelog, newest first</span></div>
      ${CHANGELOG.map((e, i) => `
      <div class="cl-entry ${i === 0 ? 'latest' : ''}">
        <div class="cl-hdr">
          <span class="cl-ver">v${e.v}</span>
          <span class="cl-tag ${e.tag}">${e.tag}</span>
          <span class="cl-date">${e.date}</span>
        </div>
        <ul class="cl-notes">${e.notes.map(n => `<li>${n}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>

  </div>

  <div class="ftr">
    <div class="ftr-l"><span class="dot" id="pc-ftr-dot"></span><span id="pc-ftr-txt">Not linked</span></div>
    <div class="ftr-r"><span>IsraelCord</span><b>v${VER}</b></div>
  </div>

</div>

<div class="toasts" id="pc-toasts"></div>

<div class="term-window" id="pc-term">
  <div class="term-hdr" id="pc-term-hdr">
    <span class="term-title">${ic('terminal',11)} <span class="term-name">Output</span> &middot; IsraelCord</span>
    <button class="term-x" id="pc-term-x" title="Close terminal">${ic('x',11)}</button>
  </div>
  <div class="term-body" id="pc-term-log"><div class="term-empty" id="pc-term-empty">${ic('terminal',18)}<span>Operation logs will stream in here.</span></div></div>
</div>

<div class="onb-intro" id="pc-intro">
  <div class="onb-card">
    <div class="onb-title">Welcome to IsraelCord</div>
    <p class="onb-text">New to IsraelCord? Want a quick tutorial before you start deleting?</p>
    <div class="onb-actions">
      <button id="pc-intro-no" class="btn btn-glass">No, skip it</button>
      <button id="pc-intro-yes" class="btn btn-primary">Yes, show me</button>
    </div>
  </div>
</div>

<div class="onb-tut" id="pc-tut">
  <div class="onb-spot" id="pc-tut-spot"></div>
  <button class="onb-skip" id="pc-tut-skip">${ic('x',11)} Skip tutorial</button>
  <div class="onb-bub" id="pc-tut-bub">
    <div class="onb-bub-title" id="pc-tut-title"></div>
    <p class="onb-bub-text" id="pc-tut-text"></p>
    <div class="onb-dots" id="pc-tut-dots"></div>
    <div class="onb-bub-actions">
      <button class="btn btn-glass btn-sm" id="pc-tut-prev">Back</button>
      <button class="btn btn-primary btn-sm" id="pc-tut-next">Next</button>
    </div>
  </div>
</div>`;
  }

  let token = null, userId = null, username = null, avatar = null;
  let shadow;
  let forceDry = false;
  let saveIndT;

  const OP = {
    prune:  { stop: false, pause: false, running: false },
    server: { stop: false, pause: false, running: false },
    ghost:  { stop: false, pause: false, running: false },
    dm:     { stop: false, pause: false, running: false },
    dl:     { stop: false, pause: false, running: false },
  };

  let S = { delay: 300, dryRun: false, autoPause: true, safeMode: false, safeWait: 3, termMode: 'main', progToasts: true, onboarded: false };

  let ghostServers = [];
  let dmChannels   = [];
  let serverList   = [];

  const LOG_BUF = { prune: [], server: [], ghost: [], dm: [], dl: [] };
  let recentBufKey = 'prune';

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const ts = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
  };

  function logTo(boxId, buf, msgType, typeLabel, body, preview = '') {
    let targetId = boxId;
    if (S.termMode === 'separate' && boxId !== 'pc-term-log' && [OP.prune, OP.server, OP.ghost, OP.dm].some(o => o.running)) {
      targetId = 'pc-term-log';
      kpTermOpen();
    }
    const box = shadow?.getElementById(targetId);
    if (!box) return;
    if (targetId === 'pc-term-log') {
      const empty = shadow.getElementById('pc-term-empty');
      if (empty) empty.style.display = 'none';
    }
    const entry = `[${ts()}] [${typeLabel}] ${body}${preview ? ' | ' + preview : ''}`;
    if (buf) buf.push(entry);
    if (buf) recentBufKey = boxId.replace(/^pc-?/,'').replace(/-log$/,'');
    const el = document.createElement('div');
    el.className = `ll ${msgType}`;
    el.innerHTML = `<span class="ll-ts">${ts()}</span><span class="ll-type">${esc(typeLabel)}</span><span class="ll-body">${esc(body)}</span>${preview ? `<span class="ll-preview">"${esc(preview)}"</span>` : ''}`;
    box.appendChild(el);
    box.scrollTop = box.scrollHeight;
  }

  const L = {
    info:  (box, buf, msg, preview) => logTo(box, buf, 'info', '·', msg, preview),
    ok:    (box, buf, msg, preview) => logTo(box, buf, 'ok',   '✓', msg, preview),
    warn:  (box, buf, msg, preview) => logTo(box, buf, 'warn', '!', msg, preview),
    err:   (box, buf, msg, preview) => logTo(box, buf, 'err',  '✗', msg, preview),
    rate:  (box, buf, msg)          => logTo(box, buf, 'rate', '⏱', msg),
    dry:   (box, buf, msg, preview) => logTo(box, buf, 'dry',  '○', msg, preview),
  };

  function setV(id, v) { const el = shadow?.getElementById(id); if (el) el.textContent = v; }
  const delay = ms => new Promise(r => setTimeout(r, ms));
  const getDelay = () => S.delay;

  function toast(msg, type = 'info') {
    const wrap = shadow?.getElementById('pc-toasts');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    wrap.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 350); }, 3000);
  }

  function fmtNum(n) { return Number(n).toLocaleString(); }

  const progFloor = {};
  function noteProg(opKey, label, done, total) {
    if (!S.progToasts || S.dryRun) return;
    if (!total || total <= 2) return;
    const f = Math.min(3, Math.floor((done / total) * 4));
    const prev = progFloor[opKey] ?? -1;
    if (f > prev) {
      progFloor[opKey] = f;
      if (f === 1) toast(`${label} , 25% done (${done}/${total})`, 'info');
      else if (f === 2) toast(`${label} , halfway there (${done}/${total})`, 'info');
      else if (f === 3) toast(`${label} , almost done (${done}/${total})`, 'info');
    }
  }
  function noteFinish(opKey, label, verb, count) {
    if (!S.progToasts || S.dryRun) return;
    toast(`IsraelCord is finished! ${label.toLowerCase()} ${verb} , ${count} ${count === 1 ? 'message' : 'messages'} deleted.`, 'ok');
  }
  function fmtElapsed(ms) {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2,'0')}`;
  }

  async function pauseCheck(op) {
    if (op.pause) {
      await delay(200);
      while (op.pause && !op.stop) await delay(200);
    }
  }

  const SAFE_BATCH = 50;

  async function safeCool(kind, op) {
    const secs = (S.safeWait || 3) * 60;
    const badge = shadow?.getElementById(kind === 'dm' ? 'pc-dm-safe-cd' : 'pc-safe-cd');
    const cd = badge?.querySelector('[data-cd]');
    const log = kind === 'dm' ? ['pc-dm-log', LOG_BUF.dm] : ['pc-log', LOG_BUF.prune];
    const m = S.safeWait || 3;
    L.info(log[0], log[1], `Safe Mode , batch of 50 reached. Pausing ${m} min…`);
    if (badge) badge.classList.remove('hidden');
    for (let i = secs; i > 0; i--) {
      if (op.stop) break;
      if (cd) cd.textContent = `${Math.floor(i / 60)}:${String(i % 60).padStart(2, '0')}`;
      await delay(1000);
    }
    if (badge) badge.classList.add('hidden');
    if (!op.stop) L.ok(log[0], log[1], 'Safe Mode , pausing done, resuming deletions.');
  }

  const store = {
    get: keys => new Promise(r => chrome.storage.local.get(keys, r)),
    set: obj  => new Promise(r => chrome.storage.local.set(obj, r)),
  };

  const SECRET_PASSPHRASE = 'Andrew2026';
  const FEEDBACK_WEBHOOK = 'https://discord.com/api/webhooks/1562958612152979499/RvHQoki0fxxm3nfra8GkubrRAF0gmrHV2pRHiZJYbsGJa8lHjgq6gXoP_D4dR5yyBxSL';
  const _te = new TextEncoder();
  const _td = new TextDecoder();
  async function sessionKey() {
    const km = await crypto.subtle.importKey('raw', _te.encode(SECRET_PASSPHRASE), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: _te.encode('prunecord'), iterations: 100000, hash: 'SHA-256' },
      km,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  function bufToHex(u8) {
    let s = '';
    for (let i = 0; i < u8.length; i++) s += u8[i].toString(16).padStart(2, '0');
    return s;
  }
  function hexToBuf(hex) {
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
  }
  function bufToObfuscated(u8) {
    const hex = bufToHex(u8);
    const blocks = [];
    for (let i = 0; i < hex.length; i += 32) {
      const h = hex.slice(i, i + 32);
      blocks.push(h.slice(0,8) + '-' + h.slice(8,12) + '-' + h.slice(12,16) + '-' + h.slice(16,20) + '-' + h.slice(20,32));
    }
    return blocks.join('-');
  }
  function obfuscatedToBuf(v) {
    return hexToBuf(v.replace(/[^0-9a-fA-F]/g, ''));
  }
  function b64ToBuf(b64) { return Uint8Array.from(atob(b64), c => c.charCodeAt(0)); }
  function b64From(u8) {
    if (u8 instanceof ArrayBuffer) u8 = new Uint8Array(u8);
    let s = '';
    for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode(...u8.subarray(i, i + 0x8000));
    return btoa(s);
  }
  async function encryptSecret(plain) {
    const key = await sessionKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, _te.encode(plain));
    const out = new Uint8Array(12 + ct.byteLength);
    out.set(iv, 0); out.set(new Uint8Array(ct), 12);
    return bufToObfuscated(out);
  }
  async function decryptSecret(v) {
    try {
      const raw = /^[0-9a-fA-F-]+$/.test(v) ? obfuscatedToBuf(v) : b64ToBuf(v);
      const key = await sessionKey();
      const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: raw.slice(0, 12) }, key, raw.slice(12));
      return _td.decode(pt);
    } catch { return null; }
  }

  async function loadSettings() {
    if (!shadow) return;
    const d = await store.get(['pc_delay','pc_dryrun','pc_autopause','pc_safemode','pc_safewait','pc_total','pc_runs','pc_since','pc_winpos','pc_term','pc_progtoasts','pc_winsize','pc_termpos','pc_onboarded']);
    S.delay    = d.pc_delay    ?? 300;
    S.dryRun   = d.pc_dryrun  ?? false;
    S.autoPause = d.pc_autopause ?? true;
    S.safeMode = d.pc_safemode ?? false;
    S.safeWait = d.pc_safewait ?? 3;
    S.termMode  = d.pc_term      ?? 'main';
    S.progToasts = d.pc_progtoasts ?? true;
    S.onboarded = !!d.pc_onboarded;
    applySettingsUI();
    applyTermUI();
    syncSafeUI();
    updateStatsUI(d);
    const pos = d.pc_winpos;
    if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) {
      const panel = shadow.getElementById('pc-panel');
      if (panel) {
        const pw = panel.offsetWidth || 468, ph = panel.offsetHeight || 560;
        panel.style.left = Math.min(Math.max(8, pos.x), Math.max(8, innerWidth - pw - 8)) + 'px';
        panel.style.top  = Math.min(Math.max(8, pos.y), Math.max(8, innerHeight - ph - 8)) + 'px';
      }
    }
    const sz = d.pc_winsize;
    if (sz && Number.isFinite(sz.w) && Number.isFinite(sz.h)) {
      const panel = shadow.getElementById('pc-panel');
      if (panel) {
        panel.style.width  = Math.max(400, Math.min(sz.w, innerWidth - 16)) + 'px';
        panel.style.height = Math.max(380, Math.min(sz.h, innerHeight - 16)) + 'px';
      }
    }
    const tp = d.pc_termpos;
    if (tp && Number.isFinite(tp.x) && Number.isFinite(tp.y)) {
      const term = shadow.getElementById('pc-term');
      if (term) {
        term.style.left = tp.x + 'px';
        term.style.top  = tp.y + 'px';
      }
    }
    if (!S.onboarded) showIntro();
  }

  async function saveSettings() {
    S.delay    = parseInt(shadow.getElementById('pc-delay').value);
    S.dryRun   = shadow.getElementById('pc-dry-run').checked;
    S.autoPause = shadow.getElementById('pc-auto-pause').checked;
    const sf = shadow.getElementById('pc-safe');
    const sw = shadow.getElementById('pc-safe-wait');
    if (sf) S.safeMode = sf.checked;
    if (sw) S.safeWait = parseInt(sw.value) || 3;
    S.progToasts = shadow.getElementById('pc-prog-toasts').checked;
    await store.set({ pc_delay: S.delay, pc_dryrun: S.dryRun, pc_autopause: S.autoPause, pc_safemode: S.safeMode, pc_safewait: S.safeWait, pc_term: S.termMode, pc_progtoasts: S.progToasts });
    syncSafeUI();
    updateDryRunBadge();
    const ind = shadow.getElementById('pc-save-ind');
    if (ind) { ind.classList.add('show'); clearTimeout(saveIndT); saveIndT = setTimeout(() => ind.classList.remove('show'), 1300); }
  }

  function applyTermUI() {
    if (!shadow) return;
    shadow.querySelectorAll('#pc-term-mode .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.term === S.termMode));
    shadow.getElementById('pc-prog-toasts').checked = S.progToasts;
  }

  function syncSafeUI() {
    if (!shadow) return;
    const st = shadow.getElementById('pc-safe');
    const dw = shadow.getElementById('pc-safe-wait');
    const dt = shadow.getElementById('pc-dm-safe');
    const dW = shadow.getElementById('pc-dm-safe-wait');
    if (st) st.checked = S.safeMode;
    if (dt) dt.checked = S.safeMode;
    if (dw) { dw.value = String(S.safeWait); dw.disabled = !S.safeMode; }
    if (dW) { dW.value = String(S.safeWait); dW.disabled = !S.safeMode; }
  }

  function safeChanged() {
    S.safeMode = shadow.getElementById('pc-safe').checked;
    syncSafeUI();
    store.set({ pc_safemode: S.safeMode });
    if (S.safeMode) toast('Safe Mode on , deletions pause in batches of 50.', 'warn');
    else toast('Safe Mode off.', 'info');
  }

  function safeWaitChanged() {
    S.safeWait = parseInt(shadow.getElementById('pc-safe-wait').value) || 3;
    syncSafeUI();
    store.set({ pc_safewait: S.safeWait });
  }

  function applySettingsUI() {
    if (!shadow) return;
    shadow.getElementById('pc-delay').value = S.delay;
    setV('pc-delay-v', `${S.delay}ms`);
    shadow.getElementById('pc-dry-run').checked   = S.dryRun;
    shadow.getElementById('pc-auto-pause').checked = S.autoPause;
    updateDryRunBadge();
  }

  function updateDryRunBadge() {
    shadow?.getElementById('pc-dryrun-badge')?.classList.toggle('show', S.dryRun);
  }

  async function addToStats(deleted) {
    const d = await store.get(['pc_total','pc_runs','pc_since']);
    const since = d.pc_since || Date.now();
    await store.set({
      pc_total: (d.pc_total ?? 0) + deleted,
      pc_runs:  (d.pc_runs  ?? 0) + 1,
      pc_since: since,
    });
    const d2 = await store.get(['pc_total','pc_runs','pc_since']);
    updateStatsUI(d2);
  }

  function updateStatsUI(d) {
    if (!shadow) return;
    const total = d.pc_total ?? 0;
    const runs  = d.pc_runs  ?? 0;
    const since = d.pc_since;
    setV('st-total', fmtNum(total));
    setV('st-runs',  fmtNum(runs));
    setV('st-avg',   runs > 0 ? fmtNum(Math.round(total / runs)) : '∅');
    setV('st-since', since ? Math.max(1, Math.round((Date.now() - since) / 86400000)) : '∅');
  }

  function exportLog(bufName, filename) {
    const buf = LOG_BUF[bufName];
    if (!buf?.length) return;
    const text = buf.join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = `prunecord-${filename}-${Date.now()}.txt`;
    a.click();
  }

  const dfetch = (path, opts = {}) => fetch(`https://discord.com/api/v9${path}`, {
    ...opts,
    headers: { Authorization: token, 'Content-Type': 'application/json', ...(opts.headers ?? {}) },
  });

  async function resolveUser() {
    if (userId) return userId;
    try {
      const r = await dfetch('/users/@me');
      if (r.ok) { const m = await r.json(); userId = m.id; username = m.username; avatar = m.avatar ?? null; return m.id; }
    } catch {}
    return null;
  }

  const snowflakeDate = id => new Date(Number(BigInt(id) >> 22n) + 1420070400000);

  async function fetchMsgs(chId, before) {
    const p = new URLSearchParams({ limit: '100' });
    if (before) p.set('before', before);
    const r = await dfetch(`/channels/${chId}/messages?${p}`);
    if (r.status === 429) {
      const d = await r.json().catch(() => ({}));
      await delay(Math.ceil((d.retry_after ?? 1) * 1000));
      return fetchMsgs(chId, before);
    }
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  async function delMsg(chId, msgId, box, buf) {
    if (S.dryRun) { await delay(30); return 204; }
    const r = await dfetch(`/channels/${chId}/messages/${msgId}`, { method: 'DELETE' });
    if (r.status === 429) {
      const d = await r.json().catch(() => ({}));
      const w = Math.ceil((d.retry_after ?? 1) * 1000);
      L.rate(box, buf, `Rate limited , waiting ${(w/1000).toFixed(1)}s`);
      await delay(w);
      return delMsg(chId, msgId, box, buf);
    }
    return r.status;
  }

  async function searchGuild(guildId, uid, offset = 0) {
    const p = new URLSearchParams({ author_id: uid, include_nsfw: 'true', offset: String(offset) });
    const r = await dfetch(`/guilds/${guildId}/messages/search?${p}`);
    if (r.status === 202) { await delay(2000); return searchGuild(guildId, uid, offset); }
    if (r.status === 429) { const d = await r.json().catch(() => ({})); await delay(Math.ceil((d.retry_after ?? 2) * 1000)); return searchGuild(guildId, uid, offset); }
    if (r.status === 403 || !r.ok) return null;
    return r.json();
  }

  function buildKeywordMatcher(raw) {
    const m = raw.match(/^\/(.+)\/([gimsuy]*)$/);
    if (m) {
      try { const re = new RegExp(m[1], m[2]); return str => re.test(str); } catch {}
    }
    const kw = raw.toLowerCase();
    return str => str.toLowerCase().includes(kw);
  }

  function trapPanelKeys() {
    shadow.querySelectorAll('input, textarea').forEach(el => {
      ['keydown', 'keyup', 'keypress', 'paste', 'cut', 'copy', 'input'].forEach(evt =>
        el.addEventListener(evt, e => {
          if (evt === 'keydown' && e.key === 'Escape') return;
          e.stopPropagation();
        })
      );
    });
  }

  function injectPanel() {
    const existing = document.getElementById('prunecord-root');
    if (existing && shadow) return;
    if (existing) existing.remove();
    const root = document.createElement('div');
    root.id = 'prunecord-root';
    root.style.cssText = 'position:fixed;top:0;left:0;height:0;width:0;z-index:99999;pointer-events:none';
    document.body.appendChild(root);
    shadow = root.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = CSS;
    shadow.appendChild(style);
    const wrap = document.createElement('div');
    wrap.innerHTML = buildHTML();
    shadow.appendChild(wrap);
    initControls(root);
    initTabs();
    initPruneTab();
    initServerTab();
    initGhostTab();
    initDMTab();
    initDownloadTab();
    initSettingsTab();
    initDashboard();
    initToken();
    loadSettings();
    trapPanelKeys();
    refreshDashboard();
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { if (onboarding.active) { endTutorial(); return; } closePanel(root); }
    });
  }

  function closePanel(root) {
    shadow?.getElementById('pc-panel')?.classList.remove('open');
    if (root) root.style.pointerEvents = 'none';
  }

  function toggle() {
    const root = document.getElementById('prunecord-root');
    if (!root) { injectPanel(); openPanel(); return; }
    const p = shadow.getElementById('pc-panel');
    const isOpen = p.classList.contains('open');
    p.classList.toggle('open', !isOpen);
    root.style.pointerEvents = isOpen ? 'none' : 'all';
    if (!isOpen && onboarding.active && onboarding.step === 0) nextTut();
  }

  function openPanel() {
    const root = document.getElementById('prunecord-root');
    if (!root) return;
    shadow.getElementById('pc-panel').classList.add('open');
    root.style.pointerEvents = 'all';
    if (onboarding.active && onboarding.step === 0) nextTut();
  }

  const onboarding = { active: false, step: -1, waited: false };
  const NTUT = [
    { tab: null, circle: true, title: 'Open IsraelCord', text: 'Click this button to open IsraelCord. You can also open it from the extension icon in your browser toolbar, but this is faster.' },
    { tab: 'dash', title: 'Welcome to IsraelCord', text: 'IsraelCord can delete your messages in many ways, by channel, by server, or every single message you have ever sent. Let me show you around.' },
    { tab: 'dash', title: 'Home', text: 'Your dashboard. Lifetime stats, recent activity, quick actions like Dry Run, and a box to send feedback to the creator.' },
    { tab: 'prune', title: 'Prune', text: 'Deletes your messages in one channel or DM. Use detect to grab the channel you are viewing, add optional filters, and hit Prune. Try Dry Run first to preview without deleting anything.' },
    { tab: 'server', title: 'Server', text: 'Purges your messages from every channel of a whole server at once. Pick your servers carefully, there is no undo.' },
    { tab: 'ghost', title: 'Ghost', text: 'Scans servers you do not own and wipes your messages from them. It asks you to confirm before touching anything.' },
    { tab: 'dms', title: 'DMs', text: 'Cleans up your past direct messages, one chat at a time. Tick the chats you want and let it run.' },
    { tab: 'download', title: 'Download', text: 'Archives messages instead of deleting them. Choose a channel, a DM or a whole server, set a date range, add filters, then export as JSON, text, Markdown, HTML or CSV.' },
    { tab: 'settings', title: 'Config', text: 'Your controls, delay between deletions, Safe Mode, Dry Run, where logs appear, and progress notifications.' },
    { tab: 'help', title: 'Help', text: 'Every feature is explained here with safety tips. If you are ever confused, this tab is your best friend.' },
  ];

  function showIntro() {
    shadow?.getElementById('pc-intro')?.classList.add('open');
  }
  function hideIntro() {
    shadow?.getElementById('pc-intro')?.classList.remove('open');
  }
  function markOnboarded() {
    store.set({ pc_onboarded: 1 });
  }
  function startTutorial(replay = false) {
    hideIntro();
    onboarding.active = true;
    renderTut(replay ? 1 : 0);
  }
  function renderTut(i) {
    if (!onboarding.active) return;
    const st = NTUT[i];
    onboarding.step = i;
    const tut = shadow.getElementById('pc-tut');
    tut.classList.add('open');
    setV('pc-tut-title', st.title);
    setV('pc-tut-text', st.text);
    if (st.tab) switchTab(st.tab);
    shadow.getElementById('pc-tut-dots').innerHTML = NTUT.map((_, d) => `<i class="${d === i ? 'on' : ''}"></i>`).join('');
    let el = null;
    if (i === 0) {
      el = document.getElementById('pc-topbar-btn');
      if (!el && !onboarding.waited) {
        onboarding.waited = true;
        let tries = 0;
        const tryMount = setInterval(() => {
          tries++;
          if (document.getElementById('pc-topbar-btn') || tries > 10) { clearInterval(tryMount); renderTut(i); }
        }, 500);
      }
    }
    else if (st.tab) el = shadow.querySelector(`.nav-pill[data-tab="${st.tab}"]`);
    const spot = shadow.getElementById('pc-tut-spot');
    const bub = shadow.getElementById('pc-tut-bub');
    if (el) {
      const r = el.getBoundingClientRect();
      const pad = st.circle ? 14 : 6;
      const w = r.width + pad * 2;
      const h = r.height + pad * 2;
      spot.className = `onb-spot ${st.circle ? 'circle' : 'box'}`;
      spot.style.left = (r.left - pad) + 'px';
      spot.style.top = (r.top - pad) + 'px';
      spot.style.width = w + 'px';
      spot.style.height = h + 'px';
      const H = 180;
      let bx = Math.min(Math.max(10, r.left + r.width / 2 - 160), innerWidth - 330);
      let by = r.bottom + 18;
      if (by + H > innerHeight - 10) by = Math.max(10, r.top - H - 18);
      bub.style.left = bx + 'px';
      bub.style.top = by + 'px';
    } else {
      spot.className = 'onb-spot';
      spot.style.width = '0px';
      spot.style.height = '0px';
      bub.style.left = Math.max(10, innerWidth / 2 - 160) + 'px';
      bub.style.top = Math.max(10, innerHeight / 2 - 90) + 'px';
    }
    shadow.getElementById('pc-tut-prev').disabled = i === 0;
    setV('pc-tut-next', i === NTUT.length - 1 ? 'Done' : 'Next');
  }
  function nextTut() {
    if (onboarding.step >= NTUT.length - 1) { endTutorial(); return; }
    renderTut(onboarding.step + 1);
  }
  function prevTut() {
    if (onboarding.step > 0) renderTut(onboarding.step - 1);
  }
  function endTutorial() {
    onboarding.active = false;
    shadow?.getElementById('pc-tut')?.classList.remove('open');
    markOnboarded();
    toast('You are all set! The Help tab has your back if you ever get stuck.', 'ok');
  }

  function setRunning(label) {
    const r = shadow.getElementById('pc-running');
    if (label) { r.classList.remove('hidden'); setV('pc-run-lbl', label); }
    else r.classList.add('hidden');
    const hd = shadow.getElementById('pc-hero-dot');
    const ht = shadow.getElementById('pc-hero-txt');
    if (hd) hd.className = label ? 'dot busy' : (token ? 'dot on' : 'dot');
    if (ht) ht.textContent = label ? `Active , ${label}` : (token ? 'Session linked , ready' : 'Session not linked');
  }

  function switchTab(t) {
    const tab = shadow?.querySelector(`.nav-pill[data-tab="${t}"]`);
    if (!tab) return;
    shadow.querySelectorAll('.nav-pill').forEach(el => el.classList.toggle('active', el.dataset.tab === t));
    shadow.querySelectorAll('.pane').forEach(el => {
      const on = el.dataset.pane === t;
      el.classList.toggle('active', on);
      if (on) { el.classList.remove('in'); void el.offsetWidth; el.classList.add('in'); }
    });
    if (t === 'dash') refreshDashboard();
  }

  function kpTermOpen() {
    const t = shadow.getElementById('pc-term');
    if (!t) return;
    t.classList.add('open');
    if (t.style.left && t.style.top) return;
    const panel = shadow.getElementById('pc-panel');
    const pr = panel.getBoundingClientRect();
    let left = pr.right + 10, top = pr.top;
    if (left + 360 > innerWidth - 10) left = Math.max(10, pr.left - 370);
    t.style.left = left + 'px';
    t.style.top = Math.max(10, top) + 'px';
  }

  function closeTerm() {
    const t = shadow.getElementById('pc-term');
    if (!t) return;
    t.classList.remove('open');
    store.set({ pc_termpos: { x: Math.round(parseFloat(t.style.left) || 0), y: Math.round(parseFloat(t.style.top) || 0) } });
  }

  function makeTermDraggable() {
    const term = shadow.getElementById('pc-term');
    const hdr = shadow.getElementById('pc-term-hdr');
    let drag = false, sx = 0, sy = 0, ox = 0, oy = 0;
    hdr.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      if (e.target.closest('button')) return;
      drag = true;
      sx = e.clientX; sy = e.clientY;
      ox = term.offsetLeft; oy = term.offsetTop;
      hdr.classList.add('dragging');
      try { hdr.setPointerCapture(e.pointerId); } catch {}
      e.preventDefault();
    });
    hdr.addEventListener('pointermove', e => {
      if (!drag) return;
      const tw = term.offsetWidth, th = term.offsetHeight;
      term.style.left = Math.min(Math.max(8, ox + e.clientX - sx), Math.max(8, innerWidth - tw - 8)) + 'px';
      term.style.top  = Math.min(Math.max(8, oy + e.clientY - sy), Math.max(8, innerHeight - th - 8)) + 'px';
    });
    const end = e => {
      if (!drag) return;
      drag = false;
      hdr.classList.remove('dragging');
      try { hdr.releasePointerCapture(e.pointerId); } catch {}
      store.set({ pc_termpos: { x: Math.round(parseFloat(term.style.left) || 0), y: Math.round(parseFloat(term.style.top) || 0) } });
    };
    hdr.addEventListener('pointerup', end);
    hdr.addEventListener('pointercancel', end);
  }

  const winPrev = {};
  function toggleMax() {
    const p = shadow.getElementById('pc-panel');
    const mx = shadow.getElementById('pc-mx');
    if (p.classList.contains('maxed')) {
      p.classList.remove('maxed');
      if (winPrev.w) p.style.width = winPrev.w;
      if (winPrev.h) p.style.height = winPrev.h;
      if (winPrev.x) p.style.left = winPrev.x;
      if (winPrev.y) p.style.top = winPrev.y;
      mx.innerHTML = ic('maximize', 13); mx.title = 'Maximize';
    } else {
      winPrev.w = p.style.width; winPrev.h = p.style.height;
      winPrev.x = p.style.left; winPrev.y = p.style.top;
      p.classList.add('maxed');
      mx.innerHTML = ic('minimize', 13); mx.title = 'Restore';
    }
  }

  function initControls(root) {
    shadow.getElementById('pc-close').addEventListener('click', () => closePanel(root));
    shadow.getElementById('pc-mx').addEventListener('click', toggleMax);
    shadow.getElementById('pc-term-x').addEventListener('click', closeTerm);
    shadow.getElementById('pc-intro-yes').addEventListener('click', () => startTutorial(false));
    shadow.getElementById('pc-intro-no').addEventListener('click', () => { hideIntro(); markOnboarded(); });
    shadow.getElementById('pc-tut-skip').addEventListener('click', endTutorial);
    shadow.getElementById('pc-tut-prev').addEventListener('click', prevTut);
    shadow.getElementById('pc-tut-next').addEventListener('click', nextTut);
    shadow.getElementById('pc-help-tour')?.addEventListener('click', () => startTutorial(true));
    window.addEventListener('resize', () => { if (onboarding.active) renderTut(onboarding.step); });
    makeDraggable();
    makeTermDraggable();
    const szT = {};
    const szObs = new MutationObserver(() => {
      clearTimeout(szT.t);
      szT.t = setTimeout(() => {
        const p = shadow.getElementById('pc-panel');
        if (p.classList.contains('maxed')) return;
        const w = parseFloat(p.style.width) || 0, h = parseFloat(p.style.height) || 0;
        if (w >= 400 && h >= 380) store.set({ pc_winsize: { w, h } });
      }, 400);
    });
    szObs.observe(shadow.getElementById('pc-panel'), { attributes: true, attributeFilter: ['style'] });
  }

  function makeDraggable() {
    const panel = shadow.getElementById('pc-panel');
    const hdr = shadow.querySelector('.hdr');
    let drag = false, sx = 0, sy = 0, ox = 0, oy = 0;
    hdr.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      if (e.target.closest('button, a, input, select, textarea')) return;
      drag = true;
      sx = e.clientX; sy = e.clientY;
      ox = panel.offsetLeft; oy = panel.offsetTop;
      hdr.classList.add('dragging');
      try { hdr.setPointerCapture(e.pointerId); } catch {}
      e.preventDefault();
    });
    hdr.addEventListener('pointermove', e => {
      if (!drag) return;
      const pw = panel.offsetWidth, ph = panel.offsetHeight;
      const maxX = Math.max(8, innerWidth - pw - 8);
      const maxY = Math.max(8, innerHeight - ph - 8);
      panel.style.left = Math.min(Math.max(8, ox + e.clientX - sx), maxX) + 'px';
      panel.style.top  = Math.min(Math.max(8, oy + e.clientY - sy), maxY) + 'px';
    });
    const end = e => {
      if (!drag) return;
      drag = false;
      hdr.classList.remove('dragging');
      try { hdr.releasePointerCapture(e.pointerId); } catch {}
      store.set({ pc_winpos: { x: Math.round(parseFloat(panel.style.left) || 0), y: Math.round(parseFloat(panel.style.top) || 0) } });
    };
    hdr.addEventListener('pointerup', end);
    hdr.addEventListener('pointercancel', end);
  }

  function initTabs() {
    shadow.getElementById('pc-tabs').addEventListener('click', e => {
      const tab = e.target.closest('.nav-pill');
      if (tab) switchTab(tab.dataset.tab);
    });
  }

  function updateHero() {
    const nm = shadow?.getElementById('pc-hero-name');
    if (!nm) return;
    const sub = shadow.getElementById('pc-hero-id');
    const chip = shadow.getElementById('pc-hero-chip');
    const dot = shadow.getElementById('pc-hero-dot');
    const txt = shadow.getElementById('pc-hero-txt');
    const ava = shadow.getElementById('pc-hero-ava');
    const dryBtn = shadow.getElementById('pc-dash-dryrun');
    if (token && userId) {
      nm.textContent = username || 'Connected';
      sub.textContent = userId;
      chip.textContent = 'Linked';
      chip.classList.remove('off');
      dot.className = 'dot on';
      txt.textContent = 'Session linked , ready';
      if (dryBtn) dryBtn.disabled = false;
      if (ava) {
        const u = avatar ? `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=128` : null;
        if (u) ava.innerHTML = `<img src="${u}" alt="" />`;
        else ava.textContent = (username || userId || '?').slice(0,1).toUpperCase();
      }
    } else if (token) {
      nm.textContent = 'Linking session…';
      sub.textContent = 'Fetching profile';
      chip.textContent = 'Linked';
      chip.classList.remove('off');
      dot.className = 'dot busy';
      txt.textContent = 'Resolving your Discord profile';
      if (dryBtn) dryBtn.disabled = true;
      ava.textContent = '';
    } else {
      nm.textContent = 'Not connected';
      sub.textContent = 'Link your Discord session to begin';
      chip.textContent = 'Needs token';
      chip.classList.add('off');
      dot.className = 'dot';
      txt.textContent = 'Session not linked';
      if (dryBtn) dryBtn.disabled = true;
      ava.textContent = '';
    }
  }

  function updateUserbar() {
    const bar = shadow.getElementById('pc-status');
    const name = shadow.getElementById('pc-uname');
    if (token) { bar.className = 'hdr-status on'; name.textContent = username || 'Connected'; }
    else { bar.className = 'hdr-status'; name.textContent = 'No token'; }
    const who = username || 'you';
    ['pc-confirm-user','pc-sv-confirm-user','pc-gs-confirm-user'].forEach(id => {
      const el = shadow.getElementById(id);
      if (el) el.textContent = who;
    });
    const fdot = shadow.getElementById('pc-ftr-dot');
    const ftxt = shadow.getElementById('pc-ftr-txt');
    fdot.className = token ? 'dot on' : 'dot';
    ftxt.textContent = token ? 'Linked' : 'Not linked';
    updateHero();
  }

  function updateSessionSecretUI() {
    const ss = shadow?.getElementById('pc-ss');
    if (!ss) return;
    ss.value = token ? b64From(_te.encode(token)) : '';
  }

  function updateTokenOverlay() {
    const ov = shadow?.getElementById('pc-tok-ov');
    if (!ov) return;
    ov.classList.toggle('hidden', !!token);
  }

  async function applyToken(raw, opts = {}) {
    if (!raw) return false;
    token = String(raw).replace(/^"|"$/g, '').trim();
    userId = null; username = null; avatar = null;
    try { await store.set({ token: await encryptSecret(token) }); } catch {}
    await resolveUser();
    updateUserbar();
    updateSessionSecretUI();
    updateTokenOverlay();
    checkPruneStart();
    updateServerStartBtn();
    updateGhostBtn();
    updateDMPreview();
    if (!opts.silent) toast('Session linked.', 'ok');
    return true;
  }

  function pageDetectToken() {
    return new Promise(resolve => {
      const id = 'pc' + Math.random().toString(36).slice(2);
      let done = false;
      const finish = v => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window.removeEventListener('message', onMsg);
        resolve(v || null);
      };
      const timer = setTimeout(() => finish(null), 3000);
      function onMsg(e) {
        if (e.source !== window || e.data?.type !== 'PC_TOKEN_RESULT' || e.data.id !== id) return;
        finish(e.data.token);
      }
      window.addEventListener('message', onMsg);
      try {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL('tokendetect.js');
        s.dataset.pcid = id;
        s.onload = () => s.remove();
        s.onerror = () => finish(null);
        (document.head || document.documentElement).appendChild(s);
      } catch { finish(null); }
    });
  }

  async function detectToken() {
    try {
      const res = await chrome.runtime.sendMessage({ type: 'PRUNECORD_GET_TOKEN' });
      if (res?.token) return res.token;
    } catch {}
    const fromPage = await pageDetectToken();
    if (fromPage) return fromPage;
    try {
      const d = await store.get('token');
      if (d.token) { const t = await decryptSecret(d.token); if (t) return t; }
    } catch {}
    return null;
  }

  async function autoDetectToken() {
    const btn = shadow.getElementById('pc-tok-auto');
    const st = shadow.getElementById('pc-tok-status');
    if (btn) { btn.disabled = true; btn.innerHTML = `${ic('loader',13)} Looking for your session`; }
    if (st) st.textContent = 'Reading the authorization Discord is already using.';
    let t = null;
    try { t = await detectToken(); } catch {}
    if (t) {
      await applyToken(t, { silent: true });
      if (st) st.textContent = 'Linked. Auto-detect found your session.';
      toast('Token detected, session linked.', 'ok');
    } else {
      if (st) st.textContent = 'Nothing found yet. Open any channel or DM in Discord, wait a second, then try again.';
      toast('Could not detect a token yet.', 'warn');
    }
    if (btn) { btn.disabled = false; btn.innerHTML = `${ic('refresh',13)} Auto-detect token`; }
  }

  async function initToken() {
    let found = null;
    try { found = await detectToken(); } catch {}
    if (!shadow) return;
    if (found) {
      await applyToken(found, { silent: true });
    } else {
      updateTokenOverlay();
    }
    const ch = detectChannelId();
    const inp = shadow.getElementById('pc-ch');
    if (ch && inp && !inp.value.trim()) {
      inp.value = ch;
      checkPruneStart();
    }
    updateSessionSecretUI();
  }

  function initTokenUI() {
    const inp = shadow.getElementById('pc-tok');
    const eye = shadow.getElementById('pc-tok-eye');
    const save = shadow.getElementById('pc-tok-save');
    const auto = shadow.getElementById('pc-tok-auto');
    let vis = false;
    eye.addEventListener('click', () => { vis = !vis; inp.type = vis ? 'text' : 'password'; eye.innerHTML = ic(vis ? 'eyeoff' : 'eye', 14); });
    auto?.addEventListener('click', autoDetectToken);
    save.addEventListener('click', async () => {
      const v = inp.value.trim(); if (!v) return;
      save.textContent = 'Saving'; save.disabled = true;
      await applyToken(v, { silent: true });
      inp.value = '';
      save.textContent = 'Save'; save.disabled = false;
      toast('Session linked successfully.', 'ok');
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') save.click(); });
  }

  function detectChannelId() {
    const m = window.location.pathname.match(/channels\/(?:@me|\d+)\/(\d+)/);
    return m ? m[1] : null;
  }

  function detectGuildId() {
    const m = window.location.pathname.match(/channels\/(\d+)/);
    return m ? m[1] : null;
  }

  function initPruneTab() {
    initTokenUI();
    shadow.getElementById('pc-detect').addEventListener('click', () => {
      const ch = detectChannelId();
      if (ch) { shadow.getElementById('pc-ch').value = ch; checkPruneStart(); toast('Channel ID detected.', 'info'); }
      else toast('Open a channel or DM first.', 'warn');
    });
    shadow.getElementById('pc-ch').addEventListener('input', checkPruneStart);

    shadow.getElementById('pc-start').addEventListener('click', async () => {
      const chId = shadow.getElementById('pc-ch').value.trim();
      if (!chId) return;
      if (!userId) await resolveUser();
      setV('pc-confirm-user', username || 'you');
      setV('pc-confirm-ch', `#${chId}`);
      shadow.getElementById('pc-confirm').classList.remove('hidden');
      shadow.getElementById('pc-prune-actions').classList.add('hidden');
    });
    shadow.getElementById('pc-confirm-go').addEventListener('click', () => {
      shadow.getElementById('pc-confirm').classList.add('hidden');
      shadow.getElementById('pc-prune-actions').classList.remove('hidden');
      startPrune();
    });
    shadow.getElementById('pc-confirm-cancel').addEventListener('click', () => {
      shadow.getElementById('pc-confirm').classList.add('hidden');
      shadow.getElementById('pc-prune-actions').classList.remove('hidden');
    });

    shadow.getElementById('pc-pause').addEventListener('click', () => togglePause('prune', 'pc-pbar', 'pc-run-lbl', 'pc-pause', 'pc-log', LOG_BUF.prune));
    shadow.getElementById('pc-stop').addEventListener('click', () => { OP.prune.stop = true; OP.prune.pause = false; L.warn('pc-log', LOG_BUF.prune, 'Stop requested…'); shadow.getElementById('pc-stop').disabled = true; });
    shadow.getElementById('pc-export').addEventListener('click', () => exportLog('prune', 'prune'));

    shadow.getElementById('pc-safe').addEventListener('change', safeChanged);
    shadow.getElementById('pc-safe-wait').addEventListener('change', safeWaitChanged);
  }

  function checkPruneStart() {
    const chId = shadow.getElementById('pc-ch').value.trim();
    shadow.getElementById('pc-start').disabled = !chId || !token;
  }

  function togglePause(opKey, pbId, labelId, btnId, logBox, buf) {
    const op = OP[opKey];
    op.pause = !op.pause;
    const btn = shadow.getElementById(btnId);
    const pb  = shadow.getElementById(pbId);
    if (op.pause) {
      btn.innerHTML = `${ic('play',12)} Resume`;
      pb?.classList.add('paused');
      L.warn(logBox, buf, 'Paused , click Resume to continue.');
    } else {
      btn.innerHTML = `${ic('pause',12)} Pause`;
      pb?.classList.remove('paused');
      L.info(logBox, buf, 'Resumed.');
    }
  }

  async function startPrune() {
    if (OP.prune.running) return;
    OP.prune.running = true; OP.prune.stop = false; OP.prune.pause = false;
    setRunning('Pruning…');
    shadow.getElementById('pc-prune-actions').classList.add('hidden');
    shadow.getElementById('pc-stop').disabled = false;
    shadow.getElementById('pc-pause').disabled = false;
    shadow.getElementById('pc-pause').innerHTML = `${ic('pause',12)} Pause`;
    LOG_BUF.prune.length = 0;
    await runPrune();
    OP.prune.running = false;
    setRunning(null);
    shadow.getElementById('pc-prune-actions').classList.remove('hidden');
    shadow.getElementById('pc-pbar').classList.remove('run', 'paused');
  }

  async function runPrune() {
    const chId    = shadow.getElementById('pc-ch').value.trim();
    const mine    = shadow.getElementById('pc-mine').checked;
    const skipPin = shadow.getElementById('pc-pinned').checked;
    const skipBot = shadow.getElementById('pc-skip-bots').checked;
    const kwRaw   = shadow.getElementById('pc-kw').value.trim();
    const afterD  = shadow.getElementById('pc-after').value  ? new Date(shadow.getElementById('pc-after').value  + 'T00:00:00Z') : null;
    const befD    = shadow.getElementById('pc-before').value ? new Date(shadow.getElementById('pc-before').value + 'T23:59:59Z') : null;
    const matchKw = kwRaw ? buildKeywordMatcher(kwRaw) : null;
    const oldest  = shadow.getElementById('pc-oldest').checked;
    const dry     = S.dryRun || forceDry;

    if (!chId || !token) return;
    if (mine && !userId) await resolveUser();

    let del = 0, ski = 0, wdel = 0, fai = 0, safeCt = 0;
    setV('pc-v-del',0); setV('pc-v-ski',0); setV('pc-v-dry',0); setV('pc-v-fai',0);
    shadow.getElementById('pc-log').innerHTML = '';
    shadow.getElementById('pc-prog').classList.remove('hidden');
    const pb = shadow.getElementById('pc-pbar'); pb.classList.add('run');
    const startMs = Date.now();
    const elapsed = setInterval(() => {
      setV('pc-elapsed', fmtElapsed(Date.now() - startMs));
      const mins = (Date.now() - startMs) / 60000;
      setV('pc-rate', mins > 0 ? `${Math.round(del / mins)}/min` : '0/min');
    }, 1000);

    L.info('pc-log', LOG_BUF.prune, `Starting prune on ${chId}${dry?' [DRY RUN]':''}${S.safeMode?' [SAFE MODE]':''}${oldest?' [oldest→newest]':''}${kwRaw?` kw=${kwRaw}`:''}`);

    let pinnedIds = new Set();
    if (skipPin) {
      try { const r = await dfetch(`/channels/${chId}/pins`); if (r.ok) { const pins = await r.json(); pinnedIds = new Set(pins.map(p => p.id)); } } catch {}
    }

    let lastId = null;
    const deleteOne = async (msg) => {
      const preview = msg.content?.slice(0, 55).replace(/\n/g,' ') || (msg.attachments?.length ? '[attachment]' : '[embed]');
      if (dry) {
        setV('pc-v-dry', ++wdel);
        L.dry('pc-log', LOG_BUF.prune, `Would delete ${msg.id}`, preview);
        await delay(30); return;
      }
      const s = await delMsg(chId, msg.id, 'pc-log', LOG_BUF.prune);
      if (S.safeMode) {
        safeCt++;
        if (safeCt >= SAFE_BATCH) {
          safeCt = 0;
          await safeCool('prune', OP.prune);
          if (OP.prune.stop) return;
        }
      }
      if (s === 204 || s === 200) { setV('pc-v-del', ++del); L.ok('pc-log', LOG_BUF.prune, `Deleted ${msg.id}`, preview); }
      else if (s === 403)          { setV('pc-v-ski', ++ski); L.warn('pc-log', LOG_BUF.prune, `No permission: ${msg.id}`); }
      else                         { setV('pc-v-fai', ++fai); L.err('pc-log', LOG_BUF.prune, `Failed (${s}): ${msg.id}`); }
      await delay(getDelay());
    };

    const candidates = oldest ? [] : null;
    outer: while (!OP.prune.stop) {
      await pauseCheck(OP.prune);
      if (OP.prune.stop) break;
      let msgs;
      try { msgs = await fetchMsgs(chId, lastId); }
      catch (e) { L.err('pc-log', LOG_BUF.prune, `Fetch failed: ${e.message}`); break; }
      if (!msgs?.length) { L.info('pc-log', LOG_BUF.prune, 'No more messages.'); break; }

      for (const msg of msgs) {
        if (OP.prune.stop) break outer;
        await pauseCheck(OP.prune);
        lastId = msg.id;
        const d = snowflakeDate(msg.id);
        if (befD   && d > befD)   { setV('pc-v-ski', ++ski); continue; }
        if (afterD && d < afterD) { L.info('pc-log', LOG_BUF.prune, 'Reached after-date boundary.'); break outer; }
        if (mine && userId && msg.author.id !== userId)     { setV('pc-v-ski', ++ski); continue; }
        if (skipBot && msg.author.bot)                      { setV('pc-v-ski', ++ski); continue; }
        if (pinnedIds.has(msg.id))                          { setV('pc-v-ski', ++ski); continue; }
        if (matchKw && !matchKw(msg.content ?? ''))         { setV('pc-v-ski', ++ski); continue; }

        if (candidates) { candidates.push(msg); continue; }
        await deleteOne(msg);
      }
      if (msgs.length < 100) { L.info('pc-log', LOG_BUF.prune, 'End of channel.'); break; }
    }

    if (candidates && candidates.length) {
      L.info('pc-log', LOG_BUF.prune, `Collected ${candidates.length} messages , purging oldest first…`);
      for (let i = candidates.length - 1; i >= 0; i--) {
        if (OP.prune.stop) break;
        await pauseCheck(OP.prune);
        await deleteOne(candidates[i]);
      }
    }

    clearInterval(elapsed);
    pb.classList.remove('run');
    if (dry) {
      L.ok('pc-log', LOG_BUF.prune, `Dry run complete , ${wdel} would be deleted · ${ski} skipped`);
    } else {
      const res = `${OP.prune.stop ? 'Stopped' : 'Done'} , ${del} deleted · ${ski} skipped · ${fai} failed`;
      L[OP.prune.stop ? 'warn' : 'ok']('pc-log', LOG_BUF.prune, res);
    }
    if (!dry) noteFinish('prune', 'Prune', OP.prune.stop ? 'stopped' : 'finished', del);
    if (!dry && del > 0) await addToStats(del);
  }

  function initGhostTab() {
    shadow.getElementById('pc-gs-load').addEventListener('click', loadGhostServers);
    shadow.getElementById('pc-gs-all').addEventListener('click', () => toggleGhostAll(true));
    shadow.getElementById('pc-gs-none').addEventListener('click', () => toggleGhostAll(false));
    ['gc1','gc2','gc3'].forEach(id => shadow.getElementById(id).addEventListener('change', updateGhostBtn));
    shadow.getElementById('gc-inp').addEventListener('input', updateGhostBtn);
    shadow.getElementById('pc-gs-pause').addEventListener('click', () => togglePause('ghost', 'pc-gs-pbar', 'pc-run-lbl', 'pc-gs-pause', 'pc-g-log', LOG_BUF.ghost));
    shadow.getElementById('pc-gs-stop').addEventListener('click', () => { OP.ghost.stop = true; OP.ghost.pause = false; L.warn('pc-g-log', LOG_BUF.ghost, 'Stop requested…'); shadow.getElementById('pc-gs-stop').disabled = true; });
    shadow.getElementById('pc-g-export').addEventListener('click', () => exportLog('ghost', 'ghost'));
    shadow.getElementById('pc-gs-start').addEventListener('click', async () => {
      if (OP.ghost.running) return;
      OP.ghost.running = true; OP.ghost.stop = false; OP.ghost.pause = false;
      setRunning('Going Ghost…');
      shadow.getElementById('pc-gs-prog').classList.remove('hidden');
      shadow.getElementById('pc-g-log').innerHTML = '';
      setV('pc-g-del',0); setV('pc-g-srv',0); setV('pc-g-fai',0);
      shadow.getElementById('pc-gs-stop').disabled = false;
      shadow.getElementById('pc-gs-pause').disabled = false;
      shadow.getElementById('pc-gs-pause').innerHTML = `${ic('pause',12)} Pause`;
      LOG_BUF.ghost.length = 0;
      ['gc1','gc2','gc3'].forEach(id => { shadow.getElementById(id).disabled = true; });
      shadow.getElementById('gc-inp').disabled = true;
      await runGhost();
      OP.ghost.running = false;
      setRunning(null);
      ['gc1','gc2','gc3'].forEach(id => { shadow.getElementById(id).disabled = false; });
      shadow.getElementById('gc-inp').disabled = false;
      shadow.getElementById('pc-gs-pbar').classList.remove('run', 'paused');
    });
  }

  async function loadGhostServers() {
    if (!token) return;
    const btn = shadow.getElementById('pc-gs-load');
    btn.innerHTML = `${ic('loader',12)} Loading…`; btn.disabled = true;
    try {
      const r = await dfetch('/users/@me/guilds');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const all = await r.json();
      ghostServers = all.filter(g => !g.owner);
      renderGhostList();
      shadow.getElementById('pc-gs-list-wrap').style.display = '';
      updateGhostBtn();
    } catch (e) { toast(`Failed to load servers (${e?.message || 'error'}).`, 'err'); }
    finally {
      btn.innerHTML = `${ic('refresh',12)} Reload`;
      btn.disabled = false;
    }
  }

  function renderGhostList() {
    const list = shadow.getElementById('pc-gs-list');
    list.innerHTML = ghostServers.map((g, i) => `
      <label class="check-item selected" id="gsi-${i}">
        <input type="checkbox" data-gi="${i}" checked class="gs-cb" />
        <span class="ci-name">${esc(g.name || g.id)}</span>
        <span class="ci-badge">member</span>
      </label>`).join('');
    list.querySelectorAll('.gs-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        const item = cb.closest('.check-item');
        item.classList.toggle('selected', cb.checked);
        updateGhostPreviewCount();
        updateGhostBtn();
      });
    });
    updateGhostPreviewCount();
  }

  function toggleGhostAll(on) {
    shadow.getElementById('pc-gs-list').querySelectorAll('.gs-cb').forEach(cb => {
      cb.checked = on;
      cb.closest('.check-item').classList.toggle('selected', on);
    });
    updateGhostPreviewCount();
    updateGhostBtn();
  }

  function getSelectedGhostServers() {
    const cbs = shadow.getElementById('pc-gs-list').querySelectorAll('.gs-cb');
    return Array.from(cbs).filter(cb => cb.checked).map(cb => ghostServers[parseInt(cb.dataset.gi)]).filter(Boolean);
  }

  function updateGhostPreviewCount() {
    const ct = getSelectedGhostServers().length;
    const el = shadow.getElementById('pc-g-ct');
    const wrap = shadow.getElementById('pc-g-prev');
    el.textContent = ct;
    el.className = 'ps-val';
    wrap.classList.remove('loading');
  }

  function updateGhostBtn() {
    const c1 = shadow.getElementById('gc1').checked;
    const c2 = shadow.getElementById('gc2').checked;
    const c3 = shadow.getElementById('gc3').checked;
    const txt = shadow.getElementById('gc-inp').value.trim().toUpperCase();
    const hasSel = getSelectedGhostServers().length > 0;
    shadow.getElementById('pc-gs-start').disabled = !(c1 && c2 && c3 && txt === 'GHOST' && token && hasSel);
  }

  async function runGhost() {
    if (!token) { L.err('pc-g-log', LOG_BUF.ghost, 'No token.'); return; }
    const uid = await resolveUser();
    if (!uid) { L.err('pc-g-log', LOG_BUF.ghost, 'Could not resolve user.'); return; }
    const targets = getSelectedGhostServers();
    if (!targets.length) { L.warn('pc-g-log', LOG_BUF.ghost, 'No servers selected.'); return; }
    L.info('pc-g-log', LOG_BUF.ghost, `${targets.length} servers selected${S.dryRun?' [DRY RUN]':''}.`);
    const pb = shadow.getElementById('pc-gs-pbar'); pb.classList.add('run');
    const startMs = Date.now();
    const elapsed = setInterval(() => {
      const d = parseInt(shadow.getElementById('pc-g-del').textContent ?? '0') || 0;
      setV('pc-g-elapsed', fmtElapsed(Date.now() - startMs));
      const mins = (Date.now() - startMs) / 60000;
      setV('pc-g-rate', mins > 0 ? `${Math.round(d/mins)}/min` : '0/min');
    }, 1000);
    let totDel = 0, totFai = 0, done = 0;
    for (let i = 0; i < targets.length; i++) {
      if (OP.ghost.stop) break;
      const g = targets[i];
      setV('pc-gs-name', g.name || g.id); setV('pc-gs-ct', `${i+1} / ${targets.length}`);
      L.info('pc-g-log', LOG_BUF.ghost, `▸ ${g.name || g.id}`);
      let gDel = 0, empty = 0;
      sl: while (!OP.ghost.stop) {
        await pauseCheck(OP.ghost);
        if (OP.ghost.stop) break;
        let res;
        try { res = await searchGuild(g.id, uid, 0); }
        catch (e) { L.err('pc-g-log', LOG_BUF.ghost, `  Error: ${e.message}`); break; }
        if (!res || (res.total_results ?? 0) === 0) break;
        const mine = (res.messages ?? []).map(arr => arr.find(m => m.author.id === uid)).filter(Boolean);
        if (!mine.length) { if (++empty >= 3) break; await delay(1500); continue; }
        empty = 0;
        for (const msg of mine) {
          if (OP.ghost.stop) break sl;
          await pauseCheck(OP.ghost);
          const preview = msg.content?.slice(0,55).replace(/\n/g,' ') || '[no text]';
          const s = await delMsg(msg.channel_id, msg.id, 'pc-g-log', LOG_BUF.ghost);
          if (s === 204 || s === 200) { totDel++; gDel++; setV('pc-g-del', totDel); L.ok('pc-g-log', LOG_BUF.ghost, `  Deleted ${msg.id}`, preview); }
          else if (s !== 403) { totFai++; setV('pc-g-fai', totFai); L.err('pc-g-log', LOG_BUF.ghost, `  Failed (${s}): ${msg.id}`); }
          await delay(getDelay());
        }
        await delay(900);
      }
      done++; setV('pc-g-srv', done);
      noteProg('ghost', 'Ghost purge', done, targets.length);
      L.ok('pc-g-log', LOG_BUF.ghost, `  Done , ${gDel} deleted.`);
      await delay(500);
    }
    clearInterval(elapsed);
    pb.classList.remove('run');
    setV('pc-gs-name','Complete'); setV('pc-gs-ct','');
    L[OP.ghost.stop?'warn':'ok']('pc-g-log', LOG_BUF.ghost, `${OP.ghost.stop?'Stopped':'Finished'} , ${totDel} deleted · ${done} servers · ${totFai} failed`);
    if (!S.dryRun && totDel > 0) await addToStats(totDel);
    noteFinish('ghost', 'Ghost purge', OP.ghost.stop ? 'stopped' : 'finished', totDel);
  }

  function initServerTab() {
    shadow.getElementById('pc-sv-load').addEventListener('click', loadServerList);
    shadow.getElementById('pc-sv-mode').addEventListener('click', e => {
      const b = e.target.closest('.seg-btn');
      if (b) setServerMode(b.dataset.mode);
    });
    shadow.getElementById('pc-sv-all').addEventListener('click',  () => toggleServerAll(true));
    shadow.getElementById('pc-sv-none').addEventListener('click', () => toggleServerAll(false));
    setServerMode('all');
    shadow.getElementById('pc-sv-pause').addEventListener('click', () => togglePause('server', 'pc-sv-pbar', 'pc-run-lbl', 'pc-sv-pause', 'pc-sv-log', LOG_BUF.server));
    shadow.getElementById('pc-sv-stop').addEventListener('click', () => { OP.server.stop = true; OP.server.pause = false; L.warn('pc-sv-log', LOG_BUF.server, 'Stop requested…'); shadow.getElementById('pc-sv-stop').disabled = true; });
    shadow.getElementById('pc-sv-export').addEventListener('click', () => exportLog('server', 'server'));

    shadow.getElementById('pc-sv-start').addEventListener('click', async () => {
      const ct = getPurgeTargets().length;
      if (!ct) return;
      if (!userId) await resolveUser();
      setV('pc-sv-confirm-user', username || 'you');
      setV('pc-sv-confirm-ct', ct);
      shadow.getElementById('pc-sv-confirm').classList.remove('hidden');
      shadow.getElementById('pc-sv-actions').classList.add('hidden');
    });
    shadow.getElementById('pc-sv-confirm-go').addEventListener('click', () => {
      shadow.getElementById('pc-sv-confirm').classList.add('hidden');
      shadow.getElementById('pc-sv-actions').classList.remove('hidden');
      startServerPurge();
    });
    shadow.getElementById('pc-sv-confirm-cancel').addEventListener('click', () => {
      shadow.getElementById('pc-sv-confirm').classList.add('hidden');
      shadow.getElementById('pc-sv-actions').classList.remove('hidden');
    });
  }

  async function loadServerList() {
    if (!token) return;
    const btn = shadow.getElementById('pc-sv-load');
    btn.innerHTML = `${ic('loader',12)} Loading…`; btn.disabled = true;
    try {
      const r = await dfetch('/users/@me/guilds');
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      serverList = await r.json();
      renderServerList();
      shadow.getElementById('pc-sv-list-wrap').style.display = '';
      updateServerStartBtn();
    } catch (e) { toast(`Failed to load servers (${e?.message || 'error'}).`, 'err'); }
    finally {
      btn.innerHTML = `${ic('refresh',12)} Reload`;
      btn.disabled = false;
    }
  }

  function renderServerList() {
    const list = shadow.getElementById('pc-sv-list');
    list.innerHTML = serverList.map((g, i) => `
      <label class="check-item" id="svi-${i}">
        <input type="checkbox" data-si="${i}" class="sv-cb" />
        <span class="ci-name">${esc(g.name || g.id)}</span>
        <span class="ci-badge ${g.owner ? 'owned' : ''}">${g.owner ? 'owner' : 'member'}</span>
      </label>`).join('');
    list.querySelectorAll('.sv-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        const item = cb.closest('.check-item');
        item.classList.toggle('selected', cb.checked);
        updateServerPreviewCount();
        updateServerStartBtn();
      });
    });
    updateServerPreviewCount();
    updateServerStartBtn();
  }

  let serverMode = 'all';

  function setServerMode(mode) {
    serverMode = mode;
    shadow.querySelectorAll('#pc-sv-mode .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    const pick = mode === 'pick';
    shadow.getElementById('pc-sv-pick-hdr').style.display = pick ? '' : 'none';
    shadow.getElementById('pc-sv-list').style.display = pick ? '' : 'none';
    shadow.getElementById('pc-sv-all-note').style.display = pick ? 'none' : '';
    updateServerPreviewCount();
    updateServerStartBtn();
  }

  function getPurgeTargets() {
    return serverMode === 'all' ? serverList.slice() : getSelectedServers();
  }

  function toggleServerAll(on) {
    shadow.getElementById('pc-sv-list').querySelectorAll('.sv-cb').forEach(cb => {
      cb.checked = on;
      cb.closest('.check-item').classList.toggle('selected', on);
    });
    updateServerPreviewCount();
    updateServerStartBtn();
  }

  function getSelectedServers() {
    const cbs = shadow.getElementById('pc-sv-list').querySelectorAll('.sv-cb');
    return Array.from(cbs).filter(cb => cb.checked).map(cb => serverList[parseInt(cb.dataset.si)]).filter(Boolean);
  }

  function updateServerPreviewCount() {
    const ct = getPurgeTargets().length;
    const el = shadow.getElementById('pc-sv-ct');
    const wrap = shadow.getElementById('pc-sv-prev');
    el.textContent = ct;
    el.className = 'ps-val';
    wrap.classList.remove('loading');
  }

  function updateServerStartBtn() {
    shadow.getElementById('pc-sv-start').disabled = !token || getPurgeTargets().length === 0;
  }

  function startServerPurge() {
    if (OP.server.running) return;
    OP.server.running = true; OP.server.stop = false; OP.server.pause = false;
    setRunning('Purging Servers…');
    shadow.getElementById('pc-sv-prog').classList.remove('hidden');
    shadow.getElementById('pc-sv-log').innerHTML = '';
    setV('pc-sv-del',0); setV('pc-sv-ch',0); setV('pc-sv-fai',0);
    shadow.getElementById('pc-sv-stop').disabled = false;
    shadow.getElementById('pc-sv-pause').disabled = false;
    shadow.getElementById('pc-sv-pause').innerHTML = `${ic('pause',12)} Pause`;
    LOG_BUF.server.length = 0;
    runServerPurge().then(() => {
      OP.server.running = false;
      setRunning(null);
      shadow.getElementById('pc-sv-pbar').classList.remove('run','paused');
    });
  }

  async function runServerPurge() {
    if (!token) { L.err('pc-sv-log', LOG_BUF.server, 'No token.'); return; }
    const uid = await resolveUser();
    if (!uid) { L.err('pc-sv-log', LOG_BUF.server, 'Could not resolve user.'); return; }
    const targets = getPurgeTargets();
    if (!targets.length) { L.warn('pc-sv-log', LOG_BUF.server, 'No servers selected.'); return; }
    const onlyMine  = shadow.getElementById('pc-sv-mine').checked;
    const keepPinned = shadow.getElementById('pc-sv-pinned').checked;
    L.info('pc-sv-log', LOG_BUF.server, `${targets.length} servers selected${S.dryRun?' [DRY RUN]':''}${onlyMine?' [MINE ONLY]':''}.`);
    const pb = shadow.getElementById('pc-sv-pbar'); pb.classList.add('run');
    const startMs = Date.now();
    const elapsed = setInterval(() => {
      const d = parseInt(shadow.getElementById('pc-sv-del').textContent ?? '0') || 0;
      setV('pc-sv-elapsed', fmtElapsed(Date.now() - startMs));
      const mins = (Date.now() - startMs) / 60000;
      setV('pc-sv-rate', mins > 0 ? `${Math.round(d/mins)}/min` : '0/min');
    }, 1000);
    let totDel = 0, totFai = 0, chDone = 0, done = 0;
    for (let i = 0; i < targets.length; i++) {
      if (OP.server.stop) break;
      const g = targets[i];
      setV('pc-sv-cur', g.name || g.id); setV('pc-sv-cur-ct', `${i+1} / ${targets.length}`);
      L.info('pc-sv-log', LOG_BUF.server, `▸ ${g.name || g.id}`);
      let chans = [];
      try {
        const r = await dfetch(`/guilds/${g.id}/channels`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        chans = (await r.json()).filter(c => c.type === 0 || c.type === 5);
      } catch (e) {
        L.err('pc-sv-log', LOG_BUF.server, `  Could not list channels (${e.message}).`);
        done++;
        continue;
      }
      let svDel = 0, emptyCnt = 0;
      for (const ch of chans) {
        if (OP.server.stop) break;
        await pauseCheck(OP.server);
        let pinned = new Set();
        if (keepPinned) { try { const pr = await dfetch(`/channels/${ch.id}/pins`); if (pr.ok) pinned = new Set((await pr.json()).map(p => p.id)); } catch {} }
        let lastId = null, hdDel = 0, hdEmpty = 0;
        cw: while (!OP.server.stop) {
          await pauseCheck(OP.server);
          if (OP.server.stop) break;
          let msgs;
          try { msgs = await fetchMsgs(ch.id, lastId); }
          catch (e) { L.err('pc-sv-log', LOG_BUF.server, `  ${ch.name}: ${e.message}`); break; }
          if (!msgs?.length) { hdEmpty++; if (hdEmpty >= 2) break; await delay(900); continue; }
          hdEmpty = 0;
          for (const msg of msgs) {
            if (OP.server.stop) break cw;
            await pauseCheck(OP.server);
            lastId = msg.id;
            if (onlyMine && msg.author.id !== uid) continue;
            if (pinned.has(msg.id)) continue;
            const preview = msg.content?.slice(0,55).replace(/\n/g,' ') || (msg.attachments?.length ? '[attachment]' : '[embed]');
            const s = await delMsg(ch.id, msg.id, 'pc-sv-log', LOG_BUF.server);
            if (s === 204 || s === 200) { totDel++; svDel++; hdDel++; setV('pc-sv-del', totDel); L.ok('pc-sv-log', LOG_BUF.server, `  ${ch.name}: Deleted ${msg.id}`, preview); }
            else if (s === 403) { }
            else { totFai++; setV('pc-sv-fai', totFai); L.err('pc-sv-log', LOG_BUF.server, `  ${ch.name}: Failed (${s}) ${msg.id}`); }
            await delay(getDelay());
          }
          if (msgs.length < 100) break;
        }
        chDone++; setV('pc-sv-ch', chDone);
        if (!OP.server.stop && hdDel > 0) L.ok('pc-sv-log', LOG_BUF.server, `  ${ch.name}: ${hdDel} deleted.`);
      }
      done++; setV('pc-sv-cur-ct', '');
      noteProg('server', 'Server purge', done, targets.length);
      L.ok('pc-sv-log', LOG_BUF.server, `  Server done, ${svDel} deleted.`);
      if (!OP.server.stop) await delay(600);
    }
    clearInterval(elapsed);
    pb.classList.remove('run');
    if (!OP.server.stop) setV('pc-sv-cur', 'Complete');
    L[OP.server.stop?'warn':'ok']('pc-sv-log', LOG_BUF.server, `${OP.server.stop?'Stopped':'Done'}, ${totDel} deleted, ${chDone} channels, ${done} servers, ${totFai} failed`);
    if (!S.dryRun && totDel > 0) await addToStats(totDel);
    noteFinish('server', 'Server purge', OP.server.stop ? 'stopped' : 'finished', totDel);
  }

  function initDMTab() {
    shadow.getElementById('pc-dm-load').addEventListener('click', loadDMs);
    shadow.getElementById('pc-dm-all').addEventListener('click',  () => toggleDMAll(true));
    shadow.getElementById('pc-dm-none').addEventListener('click', () => toggleDMAll(false));
    shadow.getElementById('pc-dm-pause').addEventListener('click', () => togglePause('dm', 'pc-dm-pbar', 'pc-run-lbl', 'pc-dm-pause', 'pc-dm-log', LOG_BUF.dm));
    shadow.getElementById('pc-dm-stop').addEventListener('click', () => { OP.dm.stop = true; OP.dm.pause = false; L.warn('pc-dm-log', LOG_BUF.dm, 'Stop requested…'); shadow.getElementById('pc-dm-stop').disabled = true; });
    shadow.getElementById('pc-dm-export').addEventListener('click', () => exportLog('dm', 'dms'));
    shadow.getElementById('pc-dm-safe').addEventListener('change', safeChanged);
    shadow.getElementById('pc-dm-safe-wait').addEventListener('change', safeWaitChanged);
    shadow.getElementById('pc-dm-start').addEventListener('click', async () => {
      if (OP.dm.running) return;
      OP.dm.running = true; OP.dm.stop = false; OP.dm.pause = false;
      setRunning('Purging DMs…');
      shadow.getElementById('pc-dm-prog').classList.remove('hidden');
      shadow.getElementById('pc-dm-log').innerHTML = '';
      setV('pc-dm-del',0); setV('pc-dm-srv',0); setV('pc-dm-fai',0);
      shadow.getElementById('pc-dm-stop').disabled = false;
      shadow.getElementById('pc-dm-pause').disabled = false;
      shadow.getElementById('pc-dm-pause').innerHTML = `${ic('pause',12)} Pause`;
      LOG_BUF.dm.length = 0;
      await runDMPurge();
      OP.dm.running = false;
      setRunning(null);
      shadow.getElementById('pc-dm-pbar').classList.remove('run','paused');
    });
  }

  async function loadDMs() {
    if (!token) return;
    const btn = shadow.getElementById('pc-dm-load');
    btn.innerHTML = `${ic('loader',12)} Loading…`; btn.disabled = true;
    try {
      const r = await dfetch('/users/@me/channels'); if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const all = await r.json(); dmChannels = all.filter(c => c.type === 1 || c.type === 3);
      renderDMList();
      shadow.getElementById('pc-dm-list-wrap').style.display = '';
      shadow.getElementById('pc-dm-start').disabled = false;
    } catch { toast('Failed to load DMs.', 'err'); }
    finally { btn.innerHTML = `${ic('refresh',12)} Reload DMs`; btn.disabled = false; }
  }

  function renderDMList() {
    const list = shadow.getElementById('pc-dm-list');
    list.innerHTML = dmChannels.map((c, i) => {
      const name = c.type === 1 ? (c.recipients?.[0]?.username ?? c.id) : (c.name || `Group (${c.recipients?.length ?? '?'})`);
      const badge = c.type === 1 ? 'DM' : 'Group';
      return `<label class="check-item selected" id="dmi-${i}"><input type="checkbox" data-di="${i}" checked class="dm-cb" /><span class="ci-name">${esc(name)}</span><span class="ci-badge">${badge}</span></label>`;
    }).join('') || `<div class="check-item"><span class="ci-name" style="color:var(--faint)">No DMs found.</span></div>`;
    list.querySelectorAll('.dm-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        cb.closest('.check-item').classList.toggle('selected', cb.checked);
        updateDMPreview();
      });
    });
    updateDMPreview();
  }

  function toggleDMAll(on) {
    shadow.getElementById('pc-dm-list').querySelectorAll('.dm-cb').forEach(cb => {
      cb.checked = on; cb.closest('.check-item').classList.toggle('selected', on);
    });
    updateDMPreview();
  }

  function getSelectedDMs() {
    const cbs = shadow.getElementById('pc-dm-list').querySelectorAll('.dm-cb');
    return Array.from(cbs).filter(cb => cb.checked).map(cb => dmChannels[parseInt(cb.dataset.di)]).filter(Boolean);
  }

  function updateDMPreview() {
    const ct = getSelectedDMs().length;
    shadow.getElementById('pc-dm-ct-prev').textContent = ct;
    shadow.getElementById('pc-dm-ct-prev').className = 'ps-val';
    shadow.getElementById('pc-dm-prev').classList.remove('loading');
    shadow.getElementById('pc-dm-start').disabled = ct === 0;
  }

  async function runDMPurge() {
    if (!token) { L.err('pc-dm-log', LOG_BUF.dm, 'No token.'); return; }
    const uid = await resolveUser(); if (!uid) { L.err('pc-dm-log', LOG_BUF.dm, 'Could not resolve user.'); return; }
    const selected = getSelectedDMs();
    if (!selected.length) { L.warn('pc-dm-log', LOG_BUF.dm, 'No DMs selected.'); return; }
    L.info('pc-dm-log', LOG_BUF.dm, `${selected.length} chats selected${S.dryRun?' [DRY RUN]':''}${S.safeMode?' [SAFE MODE]':''}.`);
    const pb = shadow.getElementById('pc-dm-pbar'); pb.classList.add('run');
    const startMs = Date.now();
    const elapsed = setInterval(() => {
      const d = parseInt(shadow.getElementById('pc-dm-del').textContent ?? '0') || 0;
      setV('pc-dm-elapsed', fmtElapsed(Date.now() - startMs));
      const mins = (Date.now() - startMs) / 60000;
      setV('pc-dm-rate', mins > 0 ? `${Math.round(d/mins)}/min` : '0/min');
    }, 1000);
    let totDel = 0, totFai = 0, done = 0, safeCt = 0;
    for (let i = 0; i < selected.length; i++) {
      if (OP.dm.stop) break;
      const ch = selected[i];
      const name = ch.type === 1 ? (ch.recipients?.[0]?.username ?? ch.id) : (ch.name || `Group (${ch.recipients?.length ?? '?'})`);
      setV('pc-dm-cur', name); setV('pc-dm-ct', `${i+1} / ${selected.length}`);
      L.info('pc-dm-log', LOG_BUF.dm, `▸ ${name}`);
      let chDel = 0, lastId = null;
      cl: while (!OP.dm.stop) {
        await pauseCheck(OP.dm);
        if (OP.dm.stop) break;
        let msgs; try { msgs = await fetchMsgs(ch.id, lastId); } catch (e) { L.err('pc-dm-log', LOG_BUF.dm, `  Error: ${e.message}`); break; }
        if (!msgs?.length) break;
        for (const msg of msgs) {
          if (OP.dm.stop) break cl;
          await pauseCheck(OP.dm);
          lastId = msg.id;
          if (msg.author.id !== uid) continue;
          const preview = msg.content?.slice(0,55).replace(/\n/g,' ') || '[attachment/embed]';
          if (S.dryRun) { L.dry('pc-dm-log', LOG_BUF.dm, `  Would delete ${msg.id}`, preview); await delay(30); continue; }
          const s = await delMsg(ch.id, msg.id, 'pc-dm-log', LOG_BUF.dm);
          if (S.safeMode) {
            safeCt++;
            if (safeCt >= SAFE_BATCH) {
              safeCt = 0;
              await safeCool('dm', OP.dm);
              if (OP.dm.stop) break cl;
            }
          }
          if (s === 204 || s === 200) { totDel++; chDel++; setV('pc-dm-del', totDel); L.ok('pc-dm-log', LOG_BUF.dm, `  Deleted ${msg.id}`, preview); }
          else if (s !== 403) { totFai++; setV('pc-dm-fai', totFai); L.err('pc-dm-log', LOG_BUF.dm, `  Failed (${s}): ${msg.id}`); }
          await delay(getDelay());
        }
        if (msgs.length < 100) break;
      }
      done++; setV('pc-dm-srv', done);
      noteProg('dm', 'DM purge', done, selected.length);
      L.ok('pc-dm-log', LOG_BUF.dm, `  Done , ${chDel} deleted.`);
      await delay(300);
    }
    clearInterval(elapsed);
    pb.classList.remove('run');
    setV('pc-dm-cur','Complete'); setV('pc-dm-ct','');
    L[OP.dm.stop?'warn':'ok']('pc-dm-log', LOG_BUF.dm, `${OP.dm.stop?'Stopped':'Done'} , ${totDel} deleted · ${done} chats · ${totFai} failed`);
    if (!S.dryRun && totDel > 0) await addToStats(totDel);
    noteFinish('dm', 'DM purge', OP.dm.stop ? 'stopped' : 'finished', totDel);
  }

  function initDashboard() {
    shadow.getElementById('pc-dash-goprune').addEventListener('click', () => switchTab('prune'));
    shadow.getElementById('pc-dash-export').addEventListener('click', () => {
      const key = LOG_BUF.prune.length ? 'prune' : LOG_BUF.server.length ? 'server' : LOG_BUF.ghost.length ? 'ghost' : 'dm';
      if (!LOG_BUF[key]?.length) { toast('No activity to export yet.', 'warn'); return; }
      exportLog(key, key === 'dm' ? 'dms' : key);
    });
    shadow.getElementById('pc-dash-dryrun').addEventListener('click', quickDryRun);

    const feedbackMsg = shadow.getElementById('pc-feedback-msg');
    const feedbackBtn = shadow.getElementById('pc-feedback-send');
    const feedbackStatus = shadow.getElementById('pc-feedback-status');
    const FEEDBACK_COOLDOWN = 4 * 60 * 60 * 1000;
    const blockedWords = ['baby', 'axelotl', 'axolotl'];
    const isBlocked = text => {
      const flat = text.toLowerCase().replace(/[^a-z0-9]/g, '');
      return blockedWords.some(w => flat.includes(w));
    };
    const showCooldown = async () => {
      if (!feedbackStatus) return;
      const d = await store.get('pc_feedback_last');
      const last = Number(d.pc_feedback_last || 0);
      const left = FEEDBACK_COOLDOWN - (Date.now() - last);
      if (last && left > 0) {
        const mins = Math.ceil(left / 60000);
        feedbackStatus.textContent = `Cooling down, you can send again in ${mins} minute${mins === 1 ? '' : 's'}.`;
        return true;
      }
      feedbackStatus.textContent = '';
      return false;
    };
    if (feedbackMsg) showCooldown();
    if (feedbackBtn) {
      feedbackBtn.addEventListener('click', async () => {
        const text = feedbackMsg.value.trim();
        if (!text) { feedbackStatus.textContent = 'Write something first.'; return; }
        if (isBlocked(text)) { alert('do do that pls'); return; }
        if (await showCooldown()) return;
        if (feedbackBtn.disabled) return;
        feedbackBtn.disabled = true;
        feedbackStatus.textContent = 'Sending…';
        try {
          const payload = {
            content: `Feedback, ${username || 'Unknown'} (${userId || 'ID unknown'}), v${VER}, ${new Date().toISOString()}`,
            embeds: [{
              title: `Feedback, IsraelCord v${VER}`,
              color: 0xffffff,
              fields: [
                { name: 'Feedback', value: text.slice(0, 1024) },
                { name: 'User', value: (username || 'Unknown').slice(0, 256), inline: true },
                { name: 'User ID', value: (userId || '?').slice(0, 256), inline: true },
                { name: 'Device', value: (navigator.userAgent || 'unknown').slice(0, 1024) },
              ],
              timestamp: new Date().toISOString(),
            }],
          };
          const res = await chrome.runtime.sendMessage({ type: 'PRUNECORD_WEBHOOK', url: FEEDBACK_WEBHOOK, payload });
          if (!res?.ok) throw new Error(res?.error ? res.error : `HTTP ${res?.status ?? 'unknown'}`);
          await store.set({ pc_feedback_last: Date.now() });
          feedbackStatus.textContent = 'Sent, thanks for the feedback.';
          feedbackMsg.value = '';
          toast('Feedback sent.', 'ok');
        } catch (e) {
          feedbackStatus.textContent = `Failed to send (${e?.message || 'unknown error'}). Check your connection and try again.`;
          toast('Failed to send feedback.', 'err');
        } finally {
          feedbackBtn.disabled = false;
        }
      });
    }
  }

  function refreshDashboard() {
    const rec = shadow?.getElementById('pc-dash-recent');
    if (!rec) return;
    const src = LOG_BUF.prune.length ? LOG_BUF.prune : LOG_BUF.server.length ? LOG_BUF.server : LOG_BUF.ghost.length ? LOG_BUF.ghost : LOG_BUF.dm;
    if (src?.length) {
      rec.innerHTML = src.slice(-7).map(line => {
        const m = line.match(/^\[([\d:]+)\] \[(.)\] (.*)$/s);
        const tag = m ? m[2] : '·';
        const body = m ? m[3] : line;
        return `<div class="dr-line"><span class="dr-tag">${esc(tag)}</span><span>${esc(body)}</span></div>`;
      }).join('');
    } else {
      rec.innerHTML = `<div class="empty-state"><span class="es-icon">${ic('clock',22)}</span><span class="es-text">No activity yet. Run a prune and your latest actions will appear here.</span></div>`;
    }
  }

  function initSettingsTab() {
    shadow.getElementById('pc-delay').addEventListener('input', () => {
      setV('pc-delay-v', `${shadow.getElementById('pc-delay').value}ms`);
      saveSettings();
    });
    shadow.getElementById('pc-dry-run').addEventListener('change', saveSettings);
    shadow.getElementById('pc-auto-pause').addEventListener('change', saveSettings);
    shadow.getElementById('pc-term-mode').addEventListener('click', e => {
      const b = e.target.closest('.seg-btn');
      if (!b) return;
      S.termMode = b.dataset.term;
      applyTermUI();
      saveSettings();
    });
    shadow.getElementById('pc-prog-toasts').addEventListener('change', saveSettings);

    const ssInp = shadow.getElementById('pc-ss');
    const ssEye = shadow.getElementById('pc-ss-eye');
    let ssVis = false;
    ssEye.addEventListener('click', () => {
      ssVis = !ssVis;
      ssInp.type = ssVis ? 'text' : 'password';
      ssEye.innerHTML = ic(ssVis ? 'eyeoff' : 'eye', 14);
    });

    shadow.getElementById('sb-clear-token').addEventListener('click', async () => {
      token = null; userId = null; username = null; avatar = null;
      await store.set({ token: null });
      updateUserbar();
      updateSessionSecretUI();
      shadow.getElementById('pc-tok-ov')?.classList.remove('hidden');
      shadow.getElementById('pc-start').disabled = true;
      toast('Session secret cleared.', 'info');
    });

    shadow.getElementById('sb-reset-stats').addEventListener('click', async () => {
      await store.set({ pc_total: 0, pc_runs: 0, pc_since: null });
      updateStatsUI({ pc_total: 0, pc_runs: 0, pc_since: null });
      toast('Statistics reset.', 'info');
    });

    shadow.getElementById('sb-export-log').addEventListener('click', () => {
      const target = LOG_BUF.prune.length ? 'prune' : LOG_BUF.server.length ? 'server' : LOG_BUF.ghost.length ? 'ghost' : 'dm';
      exportLog(target, target);
    });

  }

  chrome.runtime.onMessage.addListener(msg => { if (msg.type === 'PRUNECORD_TOGGLE') toggle(); });
  window.__prunecordToggle = toggle;

  const TOPBAR_BTN_CSS = '#pc-topbar-btn{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:36px;height:36px;margin:0 4px;border:none;border-radius:8px;background:transparent;color:var(--interactive-normal,#b9b9b9);cursor:pointer;transition:background .15s,color .15s;outline:none}#pc-topbar-btn svg{display:block;pointer-events:none}#pc-topbar-btn:hover{background:var(--background-modifier-hover,rgba(255,255,255,.08));color:#ffffff}#pc-topbar-btn:active{transform:translateY(1px)}';
  const BRAND_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2.5 20.23 16.75 3.77 16.75"/><polygon points="12 21.5 3.77 7.25 20.23 7.25"/></svg>';

  function mountTopBarButton() {
    try {
      if (document.getElementById('pc-topbar-btn')) return true;
      const chrome = document.querySelector('[data-window-chrome="true"]');
      if (!chrome) return false;
      const help = chrome.querySelector('a[href*="support.discord.com"]');
      let host = null;
      let ref = null;
      if (help) {
        ref = help;
        host = help.closest('div');
        if (host && !host.querySelector('[aria-label="Inbox"]') && host.parentElement && host.parentElement.querySelector('[aria-label="Inbox"]')) {
          host = host.parentElement;
        }
      }
      if (!host && !help) {
        const divs = Array.from(chrome.querySelectorAll('div'));
        host = divs.find(d => d.querySelector('[aria-label="Inbox"]') && d.querySelector('a[href*="support.discord.com"]')) || chrome;
      }
      if (!host) return false;
      const btn = document.createElement('button');
      btn.type = 'button'; btn.id = 'pc-topbar-btn';
      btn.title = 'IsraelCord'; btn.setAttribute('aria-label', 'IsraelCord');
      btn.innerHTML = BRAND_SVG;
      btn.addEventListener('mousedown', e => e.stopPropagation());
      btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); toggle(); });
      if (ref) {
        while (ref.parentElement && ref.parentElement !== host) ref = ref.parentElement;
        if (ref.parentElement === host) host.insertBefore(btn, ref);
        else host.appendChild(btn);
      } else {
        host.appendChild(btn);
      }
      if (!document.getElementById('pc-topbar-style')) {
        const st = document.createElement('style');
        st.id = 'pc-topbar-style';
        st.textContent = TOPBAR_BTN_CSS;
        (document.head || document.documentElement).appendChild(st);
      }
      return true;
    } catch { return false; }
  }

  const DL = {
    src: 'channel',
    collected: [],
    text: '',
    ext: 'json',
    fileName: '',
    blobUrl: '',
    pages: 0,
    skipped: 0,
    channels: 0,
  };

  const dlEl = id => shadow.getElementById(id);

  function dlUpdateCounters() {
    dlEl('pc-dl-v-msg').textContent = fmtNum(DL.collected.length);
    dlEl('pc-dl-v-page').textContent = fmtNum(DL.pages);
    dlEl('pc-dl-v-ch').textContent = fmtNum(DL.channels);
    dlEl('pc-dl-v-skip').textContent = fmtNum(DL.skipped);
  }

  function dlRenderPreview() {
    const card = dlEl('pc-dl-preview-card');
    const box = dlEl('pc-dl-preview');
    if (!card || !box) return;
    if (!DL.collected.length) { card.classList.add('hidden'); return; }
    card.classList.remove('hidden');
    box.innerHTML = DL.collected.slice(-6).reverse().map(m => `
      <div class="dr-line"><span class="dr-tag">${esc((m.author?.username || '?').slice(0, 9))}</span><span>${esc((m.content || '[attachment or embed]').slice(0, 80))}</span></div>`).join('');
  }

  function dlKeeps(msg, o) {
    const when = new Date(msg.timestamp || snowflakeDate(msg.id));
    if (o.after && when < o.after) return false;
    if (o.before && when > o.before) return false;
    if (o.mine && userId && msg.author?.id !== userId) return false;
    if (o.skipBots && msg.author?.bot) return false;
    if (o.author && msg.author?.id !== o.author) return false;
    if (o.matcher) {
      const hay = (msg.content || '') + ' ' +
        (msg.attachments || []).map(a => a.filename || '').join(' ') + ' ' +
        (msg.embeds || []).map(e => `${e.title || ''} ${e.description || ''}`).join(' ');
      if (!o.matcher(hay)) return false;
    }
    return true;
  }

  function dlEntry(msg, withAtt, withEmb) {
    return {
      id: msg.id,
      channel_id: msg.channel_id,
      timestamp: msg.timestamp,
      edited_timestamp: msg.edited_timestamp || null,
      author: {
        id: msg.author?.id ?? null,
        username: msg.author?.username ?? null,
        global_name: msg.author?.global_name ?? null,
        bot: !!msg.author?.bot,
      },
      content: msg.content || '',
      attachments: withAtt ? (msg.attachments || []).map(a => ({ id: a.id, filename: a.filename, url: a.url, size: a.size, content_type: a.content_type || null })) : [],
      embeds: withEmb ? (msg.embeds || []).map(e => ({ type: e.type || null, url: e.url || null, title: e.title || null, description: e.description || null })) : [],
      mentions: (msg.mentions || []).map(u => ({ id: u.id, username: u.username })),
      reactions: (msg.reactions || []).map(r => ({ emoji: r.emoji?.name || null, count: r.count || 0 })),
      pinned: !!msg.pinned,
      type: msg.type,
    };
  }

  async function dlCollectChannel(chId, o, label) {
    let lastId = null;
    while (!OP.dl.stop) {
      while (OP.dl.pause && !OP.dl.stop) await delay(200);
      if (OP.dl.stop) return;
      let msgs;
      try { msgs = await fetchMsgs(chId, lastId); }
      catch (e) { L.err('pc-dl-log', LOG_BUF.dl, `${label}: fetch failed, ${e.message}`); return; }
      DL.pages++; dlUpdateCounters();
      if (!msgs?.length) { L.info('pc-dl-log', LOG_BUF.dl, `${label}: no more messages.`); return; }
      for (const msg of msgs) {
        if (OP.dl.stop) return;
        while (OP.dl.pause && !OP.dl.stop) await delay(200);
        lastId = msg.id;
        const when = new Date(msg.timestamp || snowflakeDate(msg.id));
        if (o.after && when < o.after) { L.info('pc-dl-log', LOG_BUF.dl, `${label}: reached the after date, moving on.`); return; }
        if (!dlKeeps(msg, o)) { DL.skipped++; dlUpdateCounters(); continue; }
        DL.collected.push(dlEntry(msg, o.att, o.emb));
        dlUpdateCounters();
        if (o.max && DL.collected.length >= o.max) { L.info('pc-dl-log', LOG_BUF.dl, `Message limit of ${o.max} reached.`); return; }
      }
      if (msgs.length < 100) return;
      await delay(180);
    }
  }

  function dlCell(v) {
    return '"' + String(v ?? '').replace(/"/g, '""') + '"';
  }

  function dlSerialize(fmt, pretty) {
    const list = DL.collected;
    if (fmt === 'json') return JSON.stringify(list, null, pretty ? 2 : 0);
    if (fmt === 'ndjson') return list.map(m => JSON.stringify(m)).join('\n');
    if (fmt === 'csv') {
      const head = ['timestamp', 'id', 'channel_id', 'author_id', 'author', 'content', 'attachments', 'embeds'];
      const rows = list.map(m => [
        m.timestamp,
        m.id,
        m.channel_id,
        m.author?.id,
        m.author?.username,
        m.content,
        (m.attachments || []).map(a => a.url).join(' '),
        (m.embeds || []).map(e => e.url || e.title || '').join(' '),
      ].map(dlCell).join(','));
      return [head.map(dlCell).join(','), ...rows].join('\n');
    }
    if (fmt === 'html') {
      const body = list.map(m => `
    <article>
      <header><strong>${esc(m.author?.username || 'unknown')}</strong><time>${esc(m.timestamp || '')}</time></header>
      <div class="body">${esc(m.content || '').replace(/\n/g, '<br>')}</div>
      ${(m.attachments || []).map(a => `<a class="att" href="${esc(a.url || '')}" target="_blank" rel="noreferrer">${esc(a.filename || 'attachment')}</a>`).join('')}
      ${(m.embeds || []).map(e => `<div class="emb">${e.title ? `<b>${esc(e.title)}</b>` : ''}${e.description ? `<p>${esc(e.description)}</p>` : ''}${e.url ? `<a href="${esc(e.url)}" target="_blank" rel="noreferrer">${esc(e.url)}</a>` : ''}</div>`).join('')}
    </article>`).join('');
      return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>IsraelCord archive</title>
<style>
:root{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:#0b0b0b;color:#e6e6e6;font:14px/1.6 'Segoe UI',system-ui,sans-serif}
main{max-width:860px;margin:0 auto;padding:32px 20px 80px}
h1{font-size:20px;letter-spacing:.4px;margin:0 0 6px}
.meta{color:#8b8b8b;font-size:12px;margin-bottom:24px}
article{border:1px solid #232323;background:#111;border-radius:10px;padding:14px 16px;margin-bottom:10px}
article header{display:flex;justify-content:space-between;gap:12px;margin-bottom:6px;font-size:12px;color:#a9a9a9}
article header strong{color:#fff}
.body{white-space:pre-wrap;word-break:break-word}
.att{display:inline-block;margin:8px 8px 0 0;padding:5px 10px;border:1px solid #333;border-radius:6px;color:#eaeaea;text-decoration:none;font-size:12px}
.emb{margin-top:8px;border-left:2px solid #444;padding:4px 10px;color:#bdbdbd;font-size:12.5px}
.emb p{margin:4px 0}
a{color:#9ecbff}
</style></head>
<body><main>
<h1>IsraelCord message archive</h1>
<div class="meta">${list.length} messages, exported ${esc(new Date().toLocaleString())}</div>
${body}
</main></body></html>`;
    }
    if (fmt === 'md') {
      const head = pretty ? `# IsraelCord archive\n\n${list.length} messages, exported ${new Date().toLocaleString()}\n\n` : '';
      return head + list.map(m => {
        const atts = (m.attachments || []).map(a => `[${a.filename || 'attachment'}](${a.url || ''})`).join(' ');
        return `**${m.author?.username || 'unknown'}**, ${m.timestamp || ''}\n\n${m.content || ''}${atts ? `\n\n${atts}` : ''}`;
      }).join('\n\n---\n\n');
    }
    const head = pretty ? `IsraelCord archive, ${list.length} messages, exported ${new Date().toLocaleString()}\n\n` : '';
    return head + list.map(m => {
      const atts = (m.attachments || []).map(a => `[attachment] ${a.url || ''}`).join(' ');
      const emb = (m.embeds || []).map(e => `[embed] ${e.url || e.title || ''}`).join(' ');
      return `[${m.timestamp || ''}] ${m.author?.username || 'unknown'}: ${m.content || '[no text]'}${atts ? ' ' + atts : ''}${emb ? ' ' + emb : ''}`;
    }).join('\n\n');
  }

  function dlSaveFile() {
    if (!DL.blobUrl || !DL.fileName) return;
    const a = document.createElement('a');
    a.href = DL.blobUrl;
    a.download = DL.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function dlStartRun() {
    if (OP.dl.running) return;
    if (!token) { toast('Link your Discord session first.', 'err'); switchTab('prune'); return; }
    const src = DL.src;
    const rawId = dlEl('pc-dl-ch').value.trim() || (src === 'server' ? detectGuildId() : detectChannelId()) || '';
    if (!rawId) { toast(src === 'server' ? 'Enter or detect a server ID.' : 'Enter or detect a channel ID.', 'warn'); return; }
    if (!dlEl('pc-dl-all').checked && !dlEl('pc-dl-after').value && !dlEl('pc-dl-before').value) {
      toast('Pick a date range or switch on Everything.', 'warn');
      return;
    }
    if (!userId) await resolveUser();
    const kw = dlEl('pc-dl-kw').value.trim();
    const o = {
      after: dlEl('pc-dl-all').checked || !dlEl('pc-dl-after').value ? null : new Date(dlEl('pc-dl-after').value + 'T00:00:00'),
      before: dlEl('pc-dl-all').checked || !dlEl('pc-dl-before').value ? null : new Date(dlEl('pc-dl-before').value + 'T23:59:59.999'),
      mine: dlEl('pc-dl-mine').checked,
      skipBots: dlEl('pc-dl-bots').checked,
      att: dlEl('pc-dl-att').checked,
      emb: dlEl('pc-dl-embeds').checked,
      author: dlEl('pc-dl-author').value.trim() || null,
      matcher: kw ? buildKeywordMatcher(kw) : null,
      max: Math.max(0, parseInt(dlEl('pc-dl-max').value, 10) || 0),
    };
    OP.dl.running = true; OP.dl.stop = false; OP.dl.pause = false;
    DL.collected = []; DL.pages = 0; DL.skipped = 0; DL.channels = 0; DL.text = '';
    if (DL.blobUrl) { URL.revokeObjectURL(DL.blobUrl); DL.blobUrl = ''; }
    dlEl('pc-dl-result').classList.add('hidden');
    dlEl('pc-dl-preview-card').classList.add('hidden');
    dlEl('pc-dl-prog').classList.remove('hidden');
    dlEl('pc-dl-fill').classList.add('run');
    dlEl('pc-dl-log').innerHTML = '';
    LOG_BUF.dl.length = 0;
    dlEl('pc-dl-pause').disabled = false;
    dlEl('pc-dl-pause').innerHTML = `${ic('pause',13)} Pause`;
    dlEl('pc-dl-stop').disabled = false;
    dlEl('pc-dl-start').disabled = true;
    dlEl('pc-dl-cur').textContent = src === 'server' ? 'Listing channels' : 'Collecting messages';
    dlEl('pc-dl-cur-ct').textContent = '';
    dlUpdateCounters();
    const startMs = Date.now();
    const timer = setInterval(() => {
      dlEl('pc-dl-elapsed').textContent = fmtElapsed(Date.now() - startMs);
      const mins = (Date.now() - startMs) / 60000;
      dlEl('pc-dl-rate').textContent = mins > 0 ? `${Math.round(DL.collected.length / mins)}/min` : '0/min';
    }, 500);
    L.info('pc-dl-log', LOG_BUF.dl, `Starting archive from ${src} ${rawId}${o.after ? ', after ' + o.after.toLocaleDateString() : ''}${o.before ? ', before ' + o.before.toLocaleDateString() : ''}${o.max ? ', limit ' + o.max : ''}`);
    try {
      if (src === 'server') {
        const r = await dfetch(`/guilds/${rawId}/channels`);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const chans = (await r.json()).filter(c => c.type === 0 || c.type === 5).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
        if (!chans.length) L.warn('pc-dl-log', LOG_BUF.dl, 'No text channels in that server.');
        for (let i = 0; i < chans.length; i++) {
          if (OP.dl.stop) break;
          const ch = chans[i];
          dlEl('pc-dl-cur').textContent = `#${ch.name || ch.id}`;
          dlEl('pc-dl-cur-ct').textContent = `${i + 1} / ${chans.length}`;
          L.info('pc-dl-log', LOG_BUF.dl, `Channel #${ch.name || ch.id}`);
          await dlCollectChannel(ch.id, o, `#${ch.name || ch.id}`);
          DL.channels = i + 1; dlUpdateCounters();
          dlRenderPreview();
          if (o.max && DL.collected.length >= o.max) break;
        }
      } else {
        await dlCollectChannel(rawId, o, rawId);
        DL.channels = 1; dlUpdateCounters();
        dlRenderPreview();
      }
    } catch (e) {
      L.err('pc-dl-log', LOG_BUF.dl, `Stopped with an error, ${e.message}`);
    }
    clearInterval(timer);
    OP.dl.running = false;
    OP.dl.pause = false;
    dlEl('pc-dl-pause').disabled = true;
    dlEl('pc-dl-stop').disabled = true;
    dlEl('pc-dl-start').disabled = false;
    dlEl('pc-dl-fill').classList.remove('run', 'paused');
    dlEl('pc-dl-cur').textContent = OP.dl.stop ? 'Stopped' : 'Finished';
    dlEl('pc-dl-cur-ct').textContent = '';
    dlRenderPreview();
    if (!DL.collected.length) {
      dlEl('pc-dl-prog').classList.add('hidden');
      toast('Nothing matched those filters.', 'warn');
      return;
    }
    const fmt = dlEl('pc-dl-format').value;
    const pretty = dlEl('pc-dl-pretty').checked;
    const out = dlSerialize(fmt, pretty);
    const mimes = { json: 'application/json', ndjson: 'application/x-ndjson', txt: 'text/plain', md: 'text/markdown', html: 'text/html', csv: 'text/csv' };
    DL.text = out;
    DL.ext = fmt;
    if (DL.blobUrl) URL.revokeObjectURL(DL.blobUrl);
    const blob = new Blob([out], { type: (mimes[fmt] || 'text/plain') + ';charset=utf-8' });
    DL.blobUrl = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    DL.fileName = `israelcord-${src}-${rawId}-${stamp}.${fmt}`;
    dlEl('pc-dl-count').textContent = fmtNum(DL.collected.length);
    dlEl('pc-dl-size').textContent = blob.size >= 1048576 ? `${(blob.size / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(blob.size / 1024))} KB`;
    dlEl('pc-dl-result-hint').textContent = `${DL.fileName}, ${DL.pages} pages scanned, ${DL.skipped} skipped`;
    dlEl('pc-dl-result').classList.remove('hidden');
    dlEl('pc-dl-prog').classList.add('hidden');
    dlSaveFile();
    L.ok('pc-dl-log', LOG_BUF.dl, `Archive complete, ${DL.collected.length} messages saved as ${fmt}.`);
    toast('Archive saved to your Downloads folder.', 'ok');
  }

  function initDownloadTab() {
    if (!dlEl('pc-dl-start')) return;

    const setSrc = mode => {
      DL.src = mode;
      shadow.querySelectorAll('#pc-dl-src .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.src === mode));
      const inp = dlEl('pc-dl-ch');
      const hint = dlEl('pc-dl-src-hint');
      const dmRow = dlEl('pc-dl-dm-row');
      const dmSel = dlEl('pc-dl-dm');
      if (inp) inp.placeholder = mode === 'server' ? 'Server ID' : 'Channel ID';
      if (hint) hint.textContent = mode === 'server'
        ? 'Open any channel inside the server you want, then click refresh. Every text channel gets archived.'
        : 'Open the channel or DM you want, then click refresh.';
      if (dmRow) dmRow.classList.toggle('hidden', mode !== 'channel');
      if (dmSel && mode !== 'channel') dmSel.classList.add('hidden');
    };

    shadow.getElementById('pc-dl-src').addEventListener('click', e => {
      const b = e.target.closest('.seg-btn');
      if (b) setSrc(b.dataset.src);
    });
    setSrc('channel');

    dlEl('pc-dl-detect').addEventListener('click', () => {
      const id = DL.src === 'server' ? detectGuildId() : detectChannelId();
      if (id) { dlEl('pc-dl-ch').value = id; toast(DL.src === 'server' ? 'Server ID detected.' : 'Channel ID detected.', 'ok'); }
      else toast(DL.src === 'server' ? 'Open a server channel first.' : 'Open a channel or DM first.', 'warn');
    });

    dlEl('pc-dl-load-dms').addEventListener('click', async () => {
      if (!token) { toast('Link your Discord session first.', 'err'); return; }
      const btn = dlEl('pc-dl-load-dms');
      btn.disabled = true; btn.textContent = 'Loading…';
      try {
        const r = await dfetch('/users/@me/channels');
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const all = (await r.json()).filter(c => c.type === 1 || c.type === 3);
        const sel = dlEl('pc-dl-dm');
        sel.innerHTML = '<option value="">Pick a DM</option>' + all.map(c => {
          const name = c.type === 1 ? (c.recipients?.[0]?.global_name || c.recipients?.[0]?.username || c.id) : (c.name || `Group ${c.recipients?.length ?? '?'}`);
          return `<option value="${esc(c.id)}">${esc(name)}</option>`;
        }).join('');
        sel.classList.remove('hidden');
        sel.onchange = () => { if (sel.value) dlEl('pc-dl-ch').value = sel.value; };
        toast(`${all.length} DMs loaded.`, 'ok');
      } catch (e) { toast(`Could not load DMs (${e.message}).`, 'err'); }
      finally { btn.disabled = false; btn.innerHTML = `${ic('message',12)} Load my DMs`; }
    });

    dlEl('pc-dl-all').addEventListener('change', () => {
      dlEl('pc-dl-time').classList.toggle('hidden', dlEl('pc-dl-all').checked);
    });
    shadow.querySelectorAll('[data-dl-preset]').forEach(b => b.addEventListener('click', () => {
      const days = parseInt(b.dataset.dlPreset, 10);
      const now = new Date();
      const from = new Date(now.getTime() - days * 86400000);
      dlEl('pc-dl-all').checked = false;
      dlEl('pc-dl-time').classList.remove('hidden');
      dlEl('pc-dl-after').value = from.toISOString().slice(0, 10);
      dlEl('pc-dl-before').value = now.toISOString().slice(0, 10);
      toast(`Range set to the last ${days} days.`, 'info');
    }));

    dlEl('pc-dl-start').addEventListener('click', dlStartRun);
    dlEl('pc-dl-pause').addEventListener('click', () => {
      OP.dl.pause = !OP.dl.pause;
      dlEl('pc-dl-pause').innerHTML = OP.dl.pause ? `${ic('play',13)} Resume` : `${ic('pause',13)} Pause`;
      dlEl('pc-dl-fill').classList.toggle('paused', OP.dl.pause);
      L[OP.dl.pause ? 'warn' : 'info']('pc-dl-log', LOG_BUF.dl, OP.dl.pause ? 'Paused.' : 'Resumed.');
    });
    dlEl('pc-dl-stop').addEventListener('click', () => {
      OP.dl.stop = true;
      OP.dl.pause = false;
      dlEl('pc-dl-stop').disabled = true;
      L.warn('pc-dl-log', LOG_BUF.dl, 'Stop requested.');
    });
    dlEl('pc-dl-save').addEventListener('click', dlSaveFile);
    dlEl('pc-dl-copy').addEventListener('click', async () => {
      if (!DL.text) return;
      if (DL.text.length > 5 * 1024 * 1024) { toast('Archive is too large to copy, use Save again.', 'warn'); return; }
      try { await navigator.clipboard.writeText(DL.text); toast('Archive copied.', 'ok'); }
      catch { toast('Clipboard blocked by the browser.', 'err'); }
    });
    dlEl('pc-dl-export').addEventListener('click', () => exportLog('dl', 'download'));
    dlEl('pc-dl-ch').addEventListener('keydown', e => { if (e.key === 'Enter') dlStartRun(); });
  }

  injectPanel();
  mountTopBarButton();
  const __tbWatch = setInterval(() => { if (mountTopBarButton()) clearInterval(__tbWatch); }, 1500);
  setTimeout(() => clearInterval(__tbWatch), 45000);
})()