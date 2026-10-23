(function () {
  const id = (document.currentScript && document.currentScript.dataset && document.currentScript.dataset.pcid) || '';
  let sent = false;

  function send(token) {
    if (sent) return;
    sent = true;
    window.postMessage({ type: 'PC_TOKEN_RESULT', id: id, token: token || null }, '*');
  }

  function clean(value) {
    if (!value) return null;
    let t = String(value).trim().replace(/^"|"$/g, '');
    if (t.startsWith('"') && t.endsWith('"')) t = t.slice(1, -1);
    return t.length > 20 ? t : null;
  }

  function fromWebpack() {
    let found = null;
    const packs = [
      window.webpackChunkdiscord_app,
      window.webpackChunkdiscord_app_canary,
      window.webpackChunkcanary_app,
      window.webpackChunkptb_app,
    ];
    for (const pack of packs) {
      if (!pack || typeof pack.push !== 'function') continue;
      try {
        const probe = [[Symbol()], {}, req => {
          try {
            for (const key of Object.keys(req.c)) {
              try {
                const mod = req.c[key] && req.c[key].exports;
                const def = mod && mod.default;
                const getter = (def && def.getToken) || (mod && mod.getToken);
                if (typeof getter === 'function') {
                  const v = clean(getter());
                  if (v) found = v;
                }
              } catch (e) {}
            }
          } catch (e) {}
        }];
        pack.push(probe);
        try { pack.pop(); } catch (e) {}
      } catch (e) {}
      if (found) break;
    }
    return found;
  }

  function fromStorage() {
    const stores = [];
    try { stores.push(window.localStorage); } catch (e) {}
    try { stores.push(window.sessionStorage); } catch (e) {}
    for (const st of stores) {
      try {
        const v = clean(st.getItem('token'));
        if (v) return v;
      } catch (e) {}
    }
    return null;
  }

  let tries = 0;
  function attempt() {
    tries++;
    let found = null;
    try { found = fromWebpack() || fromStorage(); } catch (e) {}
    if (found) { send(found); return; }
    if (tries < 8) setTimeout(attempt, 200);
    else send(null);
  }

  try { attempt(); } catch (e) { send(null); }
})();
