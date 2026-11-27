(function () {
  if (typeof window === "undefined" || window.__afrithAgentInitialized) return;
  window.__afrithAgentInitialized = true;

  var scriptEl =
    document.currentScript ||
    document.querySelector('script[src*="afrith-agent.js"]');
  var ENDPOINT = (scriptEl && scriptEl.getAttribute("data-endpoint")) || "/api/chat";
  var FORMSPREE = (scriptEl && scriptEl.getAttribute("data-formspree")) || "";
  var EMAIL = "afrithafrith1507@gmail.com";
  var BUBBLE_STORAGE_KEY = "afrith_agent_bubble_dismissed";
  var FALLBACK_SUGGESTIONS = [
    "What has he built?",
    "What's his tech stack?",
    "How do I contact him?",
  ];
  var SUGGESTIONS = [
    "Which projects can I try?",
    "What did Afrith build with Flutter?",
    "Tell me about his internships",
    "Where can I find his résumé?",
  ];

  var state = {
    isOpen: false,
    isStreaming: false,
    history: [], // { role: 'user' | 'assistant', content: string }
    lastQuestion: "",
    formOpen: false,
    abortController: null,
    conversationId: 0,
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function sanitizeUrl(url) {
    var trimmed = url.trim();
    if (/^(https?:\/\/|mailto:)/i.test(trimmed)) return trimmed;
    return "#";
  }

  function renderMarkdown(raw, streaming) {
    var lines = raw.split(/\r?\n/);
    var out = [];
    var inList = false;

    function formatInline(text) {
      var tokens = /\[([^\]]+)\]\(([^)]+)\)|\x60([^\x60]+)\x60|\*\*([^*]+)\*\*/g;
      var html = "";
      var end = 0;

      for (var match of text.matchAll(tokens)) {
        html += escapeHtml(text.slice(end, match.index));
        if (match[1] !== undefined) {
          var url = sanitizeUrl(match[2]);
          var label = escapeHtml(match[1]);
          html += url === "#" ? label : (
            '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' + label + "</a>"
          );
        } else if (match[3] !== undefined) {
          html += "<code>" + escapeHtml(match[3]) + "</code>";
        } else {
          html += "<strong>" + escapeHtml(match[4]) + "</strong>";
        }
        end = match.index + match[0].length;
      }
      return html + escapeHtml(text.slice(end));
    }

    function splitTableRow(line) {
      var row = line.trim().replace(/^\\?\|/, "").replace(/\\?\|$/, "");
      return row.split(/(?<!\\)\|/).map(function (cell) {
        return cell.trim().replace(/\\\|/g, "|");
      });
    }

    function nextContentLine(index) {
      while (index < lines.length && !lines[index].trim()) index++;
      return index;
    }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.includes("|")) {
        var heading = splitTableRow(line);
        var dividerIndex = nextContentLine(i + 1);
        var divider = splitTableRow(lines[dividerIndex] || "");
        if (
          heading.length > 1 &&
          divider.length === heading.length &&
          divider.every(function (cell) { return /^:?-{3,}:?$/.test(cell); })
        ) {
          if (inList) {
            out.push("</ul>");
            inList = false;
          }
          var cards = [];
          i = dividerIndex;
          for (var rowIndex = nextContentLine(i + 1); rowIndex < lines.length; rowIndex = nextContentLine(i + 1)) {
            if (!lines[rowIndex].includes("|")) break;
            var cells = splitTableRow(lines[rowIndex]);
            if (cells.length !== heading.length) break;
            var fields = cells.slice(1).map(function (cell, index) {
              if (!cell) return "";
              return '<div class="aa-answer-field"><dt>' + formatInline(heading[index + 1]) +
                "</dt><dd>" + formatInline(cell) + "</dd></div>";
            }).join("");
            cards.push('<div class="aa-answer-card"><p class="aa-answer-title">' +
              formatInline(cells[0]) + "</p><dl>" + fields + "</dl></div>");
            i = rowIndex;
          }
          if (cards.length) out.push('<div class="aa-answer-cards">' + cards.join("") + "</div>");
          // Hide an unfinished table row until its remaining cells arrive.
          var nextRow = nextContentLine(i + 1);
          if (streaming && nextRow === lines.length - 1 && /^\\?\|/.test(lines[nextRow].trim())) i = nextRow;
          continue;
        }
        if (streaming && /^\s*\\?\|/.test(line)) continue;
      }
      var bulletMatch = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.+)$/);
      if (bulletMatch) {
        if (!inList) {
          out.push("<ul>");
          inList = true;
        }
        out.push("<li>" + formatInline(bulletMatch[1]) + "</li>");
      } else {
        if (inList) {
          out.push("</ul>");
          inList = false;
        }
        if (line.trim() === "") {
          if (out.length > 0 && out[out.length - 1] !== "<br>") {
            out.push("<br>");
          }
        } else {
          out.push("<p>" + formatInline(line) + "</p>");
        }
      }
    }
    if (inList) out.push("</ul>");
    return out.join("");
  }

  function injectStyles() {
    var style = document.createElement("style");
    style.id = "afrith-agent-styles";
    style.textContent = [
      "#afrith-agent-root, #afrith-agent-root * { box-sizing: border-box; font-family: var(--font-inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif); }",
      "#afrith-agent-root { --gold-1: #F7E6B0; --gold-2: #D9B25A; --gold-3: #A97C2A; position: fixed; right: 20px; bottom: 20px; z-index: 2147483000; }",
      ".aa-launcher { position: relative; width: 58px; height: 58px; border-radius: 9999px; border: 1.5px solid var(--gold-2); background: #FFFFFF; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(217, 178, 90, 0.25), 0 4px 12px rgba(0,0,0,0.45); transition: transform 0.2s ease, box-shadow 0.2s ease; outline: none; }",
      ".aa-launcher:hover { transform: translateY(-2px); box-shadow: 0 16px 38px rgba(217, 178, 90, 0.35), 0 6px 16px rgba(0,0,0,0.5); }",
      ".aa-launcher:focus-visible { box-shadow: 0 0 0 3px #0b0d12, 0 0 0 5px var(--gold-2); }",
      ".aa-launcher::before { content: ''; position: absolute; inset: -4px; border-radius: 9999px; border: 2px solid rgba(217, 178, 90, 0.45); animation: aa-pulse 2.6s ease-out infinite; pointer-events: none; }",
      ".aa-launcher-ma { background: linear-gradient(135deg, var(--gold-1), var(--gold-2) 45%, var(--gold-3)); -webkit-background-clip: text; background-clip: text; color: transparent; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; line-height: 1; }",
      ".aa-online-dot { position: absolute; top: 3px; right: 3px; width: 11px; height: 11px; border-radius: 9999px; background: #D9B25A; border: 2px solid #FFFFFF; }",
      "@keyframes aa-pulse { 0% { transform: scale(1); opacity: 0.7; } 70% { transform: scale(1.22); opacity: 0; } 100% { transform: scale(1.22); opacity: 0; } }",
      ".aa-bubble { position: absolute; right: 70px; bottom: 11px; background: #141824; color: #f4f4f5; border: 1px solid rgba(255,255,255,0.12); padding: 8px 13px; border-radius: 12px; font-size: 13px; white-space: nowrap; box-shadow: 0 10px 26px rgba(0,0,0,0.45); cursor: pointer; opacity: 0; transform: translateY(4px); transition: opacity 0.25s ease, transform 0.25s ease; pointer-events: none; }",
      ".aa-bubble.aa-visible { opacity: 1; transform: translateY(0); pointer-events: auto; }",
      ".aa-panel { position: absolute; right: 0; bottom: 72px; z-index: 2; width: 390px; max-width: calc(100vw - 24px); height: 620px; max-height: min(620px, calc(100dvh - 120px)); background: #0B0D12; color: #e4e4e7; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; box-shadow: 0 24px 64px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.03); display: flex; flex-direction: column; overflow: hidden; transform-origin: bottom right; opacity: 0; transform: scale(0.94) translateY(10px); pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease; }",
      ".aa-panel.aa-open { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }",
      ".aa-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); flex-shrink: 0; }",
      ".aa-header-left { display: flex; align-items: center; gap: 10px; min-width: 0; }",
      ".aa-avatar { width: 36px; height: 36px; border-radius: 11px; background: linear-gradient(135deg, var(--gold-1), var(--gold-2) 45%, var(--gold-3)); color: #FFFFFF; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), 0 0 0 1px rgba(217,178,90,0.35); }",
      ".aa-title-wrap { min-width: 0; }",
      ".aa-title { font-size: 14px; font-weight: 600; color: #fafafa; line-height: 1.25; }",
      ".aa-subtitle { font-size: 11.5px; color: #a1a1aa; display: flex; align-items: center; gap: 5px; margin-top: 2px; }",
      ".aa-live-dot { width: 7px; height: 7px; border-radius: 9999px; background: #22c55e; display: inline-block; }",
      ".aa-header-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }",
      ".aa-contact-link { background: transparent; border: 1px solid rgba(255,255,255,0.14); color: #cbd5e1; font-size: 11px; padding: 5px 8px; border-radius: 8px; cursor: pointer; transition: background 0.15s, color 0.15s; margin-right: 2px; }",
      ".aa-contact-link:hover { background: rgba(255,255,255,0.08); color: #fff; }",
      ".aa-icon-btn { width: 30px; height: 30px; border-radius: 8px; border: none; background: transparent; color: #a1a1aa; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s; }",
      ".aa-icon-btn:hover { background: rgba(255,255,255,0.08); color: #fafafa; }",
      ".aa-icon-btn:focus-visible, .aa-contact-link:focus-visible, .aa-chip:focus-visible, .aa-send-btn:focus-visible, .aa-form-btn:focus-visible, .aa-oos-btn:focus-visible { outline: 2px solid var(--gold-2); outline-offset: 1px; }",
      ".aa-messages { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; padding: 14px 14px 8px; display: flex; flex-direction: column; gap: 10px; }",
      ".aa-messages > * { flex-shrink: 0; }",
      ".aa-messages:focus-visible { outline: 2px solid var(--gold-2); outline-offset: -2px; }",
      ".aa-messages::-webkit-scrollbar { width: 5px; }",
      ".aa-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.14); border-radius: 9999px; }",
      ".aa-empty-note { font-size: 13px; color: #a1a1aa; line-height: 1.5; padding: 4px 2px 6px; }",
      ".aa-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 2px; }",
      ".aa-chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #e4e4e7; font-size: 12.5px; padding: 7px 11px; border-radius: 9999px; cursor: pointer; text-align: left; transition: background 0.15s, border-color 0.15s; }",
      ".aa-chip:hover { background: rgba(255,255,255,0.12); border-color: rgba(56,189,248,0.45); }",
      ".aa-msg-row { display: flex; width: 100%; }",
      ".aa-msg-row.aa-user { justify-content: flex-end; }",
      ".aa-msg-row.aa-assistant { justify-content: flex-start; }",
      ".aa-msg { max-width: 84%; padding: 10px 13px; font-size: 13.5px; line-height: 1.5; word-break: break-word; }",
      ".aa-msg-row.aa-user .aa-msg { background: #f4f4f5; color: #0B0D12; border-radius: 16px 16px 4px 16px; }",
      ".aa-msg-row.aa-assistant .aa-msg { background: rgba(255,255,255,0.07); color: #e4e4e7; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px 16px 16px 4px; }",
      ".aa-msg p { margin: 0 0 6px; }",
      ".aa-msg p:last-child { margin-bottom: 0; }",
      ".aa-answer-cards { display: grid; gap: 8px; margin: 8px 0; }",
      ".aa-answer-card { padding: 10px 12px; border: 1px solid var(--assistant-line, rgba(255,255,255,0.14)); border-radius: 12px; background: var(--assistant-fill, rgba(0,0,0,0.12)); }",
      ".aa-msg .aa-answer-title { font-weight: 650; margin: 0 0 6px; }",
      ".aa-answer-card dl, .aa-answer-card dd { margin: 0; }",
      ".aa-answer-field + .aa-answer-field { margin-top: 6px; }",
      ".aa-answer-field dt { font-size: 11px; font-weight: 600; opacity: 0.8; }",
      ".aa-msg ul { margin: 4px 0 6px 16px; padding: 0; }",
      ".aa-msg ul:last-child { margin-bottom: 0; }",
      ".aa-msg li { margin-bottom: 3px; }",
      ".aa-msg code { background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 5px; font-size: 12.5px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }",
      ".aa-msg-row.aa-user .aa-msg code { background: rgba(0,0,0,0.08); }",
      ".aa-msg a { color: #38bdf8; text-decoration: underline; }",
      ".aa-dots { display: inline-flex; align-items: center; gap: 4px; padding: 4px 2px; }",
      ".aa-dots span { width: 6px; height: 6px; border-radius: 9999px; background: #a1a1aa; animation: aa-bounce 1.2s infinite ease-in-out; }",
      ".aa-dots span:nth-child(2) { animation-delay: 0.16s; }",
      ".aa-dots span:nth-child(3) { animation-delay: 0.32s; }",
      "@keyframes aa-bounce { 0%, 80%, 100% { transform: translateY(0); opacity: 0.45; } 40% { transform: translateY(-4px); opacity: 1; } }",
      ".aa-caret::after { content: '▍'; display: inline-block; margin-left: 2px; color: #38bdf8; animation: aa-blink 0.9s steps(1) infinite; }",
      "@keyframes aa-blink { 50% { opacity: 0; } }",
      ".aa-composer-wrap { flex: 0 0 auto; padding: 10px 12px 12px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); }",
      ".aa-composer { display: flex; align-items: flex-end; gap: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 7px 8px 7px 12px; }",
      ".aa-composer:focus-within { border-color: rgba(217,178,90,0.55); }",
      ".aa-input { flex: 1; background: transparent; border: none; color: #fafafa; font-size: 13.5px; line-height: 1.4; resize: none; outline: none; max-height: 110px; min-height: 22px; padding: 2px 0; }",
      ".aa-input::placeholder { color: #71717a; }",
      ".aa-send-btn { width: 32px; height: 32px; border-radius: 10px; border: none; background: linear-gradient(135deg, var(--gold-1), var(--gold-2) 45%, var(--gold-3)); color: #0B0D12; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: opacity 0.15s; }",
      ".aa-send-btn:disabled { opacity: 0.38; cursor: not-allowed; }",
      ".aa-oos-btn { margin-top: 10px; height: 40px; width: 100%; padding: 0 16px; border-radius: 999px; border: 1px solid var(--gold-2); background: transparent; color: #F7E6B0; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; }",
      ".aa-oos-btn:hover { background: rgba(217,178,90,0.14); }",
      ".aa-back-link { background: none; border: none; padding: 0; margin: 0 0 10px; color: var(--gold-2); font-size: 12.5px; cursor: pointer; text-decoration: underline; display: inline-block; }",
      ".aa-form-wrap { flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 12px 14px 14px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); }",
      ".aa-form-lead { font-size: 12.5px; color: #d4d4d8; margin: 0 0 10px; line-height: 1.45; }",
      ".aa-field { margin-bottom: 9px; }",
      ".aa-label { display: block; font-size: 11.5px; color: #a1a1aa; margin-bottom: 3px; }",
      ".aa-field-input, .aa-field-textarea { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; color: #fafafa; font-size: 13px; padding: 7px 10px; outline: none; }",
      ".aa-field-input:focus, .aa-field-textarea:focus { border-color: #38bdf8; }",
      ".aa-field-textarea { min-height: 68px; resize: vertical; }",
      ".aa-field-err { font-size: 11.5px; color: #f87171; margin-top: 3px; }",
      ".aa-form-actions { display: flex; align-items: center; gap: 8px; margin-top: 10px; }",
      ".aa-form-btn { flex: 1; padding: 9px 12px; border-radius: 10px; border: none; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; }",
      ".aa-form-btn:disabled { opacity: 0.6; cursor: not-allowed; }",
      ".aa-form-cancel { padding: 9px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: transparent; color: #d4d4d8; font-size: 12.5px; cursor: pointer; }",
      ".aa-form-success { font-size: 13px; color: #4ade80; margin: 0 0 10px; line-height: 1.45; }",
      ".aa-form-neterr { font-size: 12.5px; color: #fca5a5; margin: 8px 0 0; line-height: 1.45; }",
      ".aa-form-neterr a { color: #38bdf8; }",
      ".aa-hp { position: absolute; left: -9999px; opacity: 0; pointer-events: none; height: 0; width: 0; }",
      "@media (max-width: 520px) {",
      "  #afrith-agent-root { right: 16px; bottom: 16px; }",
      "  .aa-panel { position: fixed; inset: 8px; z-index: 10; width: auto; max-width: none; height: calc(100dvh - 16px); max-height: calc(100dvh - 16px); border-radius: 18px; padding-bottom: env(safe-area-inset-bottom); }",
      "  .aa-panel.aa-open ~ .aa-launcher { display: none; }",
      "  .aa-input, .aa-field-input, .aa-field-textarea { font-size: 16px; }",
      "  .aa-bubble { display: none; }",
      "}",
      "@media (prefers-reduced-motion: reduce) {",
      "  .aa-launcher::before, .aa-dots span, .aa-caret::after { animation: none !important; }",
      "  .aa-launcher, .aa-panel, .aa-bubble { transition: none !important; }",
      "}",
    ].join("\n");
    document.head.appendChild(style);
  }

  function createSvg(pathD, size) {
    return (
      '<svg width="' +
      size +
      '" height="' +
      size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      pathD +
      "</svg>"
    );
  }

  injectStyles();

  var root = document.createElement("div");
  root.id = "afrith-agent-root";
  root.innerHTML = [
    '<div class="aa-bubble" id="aa-bubble" role="status">Explore Afrith’s portfolio</div>',
    '<div class="aa-panel" id="aa-panel" role="dialog" aria-modal="false" aria-label="Portfolio assistant" aria-hidden="true" data-lenis-prevent inert>',
    '  <div class="aa-header">',
    '    <div class="aa-header-left">',
    '      <div class="aa-avatar" aria-hidden="true">MA</div>',
    '      <div class="aa-title-wrap">',
    '        <div class="aa-title">Portfolio assistant</div>',
    '        <div class="aa-subtitle"><span class="aa-live-dot" aria-hidden="true"></span>About Muhammad Afrith</div>',
    "      </div>",
    "    </div>",
    '    <div class="aa-header-actions">',
    '      <button type="button" class="aa-contact-link" id="aa-header-contact">Contact Afrith</button>',
    '      <button type="button" class="aa-icon-btn" id="aa-new-chat" title="New chat" aria-label="New chat">' +
      createSvg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>', 15) +
      "</button>",
    '      <button type="button" class="aa-icon-btn" id="aa-close" title="Close" aria-label="Close chat">' +
      createSvg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', 16) +
      "</button>",
    "    </div>",
    "  </div>",
    '  <div class="aa-messages" id="aa-messages" role="log" aria-label="Chat messages" tabindex="0" aria-live="polite" aria-relevant="additions"></div>',
    '  <div class="aa-composer-wrap" id="aa-composer-wrap">',
    '    <div class="aa-composer">',
    '      <textarea class="aa-input" id="aa-input" rows="1" maxlength="900" placeholder="Ask about projects, skills, or experience..." aria-label="Message Afrith\'s AI Agent"></textarea>',
    '      <button type="button" class="aa-send-btn" id="aa-send" aria-label="Send message" disabled>' +
      createSvg('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>', 15) +
      "</button>",
    "    </div>",
    "  </div>",
    '  <div class="aa-form-wrap" id="aa-form-wrap" hidden></div>',
    "</div>",
    '<button type="button" class="aa-launcher" id="aa-launcher" aria-label="Afrith\'s AI Agent" title="Afrith\'s AI Agent" aria-expanded="false" aria-controls="aa-panel">',
    '  <span class="aa-launcher-ma" aria-hidden="true">MA</span>',
    '  <span class="aa-online-dot" aria-hidden="true"></span>',
    "</button>",
  ].join("");

  document.body.appendChild(root);

  var launcher = document.getElementById("aa-launcher");
  var bubble = document.getElementById("aa-bubble");
  var panel = document.getElementById("aa-panel");
  var messagesEl = document.getElementById("aa-messages");
  var composerWrap = document.getElementById("aa-composer-wrap");
  var formWrap = document.getElementById("aa-form-wrap");
  var inputEl = document.getElementById("aa-input");
  var sendBtn = document.getElementById("aa-send");
  var closeBtn = document.getElementById("aa-close");
  var newChatBtn = document.getElementById("aa-new-chat");
  var headerContactBtn = document.getElementById("aa-header-contact");

  function renderEmptyState() {
    messagesEl.innerHTML = "";
    var note = document.createElement("div");
    note.className = "aa-empty-note";
    var title = document.createElement("strong");
    title.textContent = "What would you like to know?";
    note.appendChild(title);
    var description = document.createElement("p");
    description.textContent = "Explore Afrith’s projects, skills, internships, or ways to get in touch.";
    note.appendChild(description);
    messagesEl.appendChild(note);

    var chips = document.createElement("div");
    chips.className = "aa-chips";
    chips.id = "aa-chips";
    SUGGESTIONS.forEach(function (q) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "aa-chip";
      btn.textContent = q;
      btn.addEventListener("click", function () {
        ask(q);
      });
      chips.appendChild(btn);
    });
    messagesEl.appendChild(chips);
  }

  function removeEmptyState() {
    var chips = document.getElementById("aa-chips");
    if (chips) chips.remove();
    var note = messagesEl.querySelector(".aa-empty-note");
    if (note) note.remove();
  }

  function isNearBottom() {
    return messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight <= 48;
  }

  function scrollToLatest() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function renderReply(bubble, text, streaming) {
    var followReply = isNearBottom();
    bubble.innerHTML = renderMarkdown(text, streaming);
    if (followReply) scrollToLatest();
  }

  function appendMessage(role, content, isLoading) {
    var followReply = role === "user" || isNearBottom();
    removeEmptyState();
    var row = document.createElement("div");
    row.className = "aa-msg-row " + (role === "user" ? "aa-user" : "aa-assistant");
    var msg = document.createElement("div");
    msg.className = "aa-msg";
    if (isLoading) {
      msg.innerHTML =
        '<div class="aa-dots" aria-label="Thinking"><span></span><span></span><span></span></div>';
    } else if (role === "user") {
      msg.textContent = content;
    } else {
      msg.innerHTML = renderMarkdown(content);
    }
    row.appendChild(msg);
    messagesEl.appendChild(row);
    if (followReply) scrollToLatest();
    return msg;
  }

  function autoResizeInput() {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 110) + "px";
  }

  function updateSendButton() {
    sendBtn.disabled = state.isStreaming || inputEl.value.trim().length === 0;
  }

  function showComposer() {
    state.formOpen = false;
    formWrap.hidden = true;
    formWrap.innerHTML = "";
    composerWrap.hidden = false;
    updateSendButton();
  }

  function showContactForm(options) {
    var opts = options || {};
    var isFallback = Boolean(opts.isFallback);
    var prefillQuestion = opts.question || state.lastQuestion || "";
    var prefillMessage = prefillQuestion
      ? isFallback
        ? "Question the assistant could not answer:\n" + prefillQuestion
        : prefillQuestion
      : "";

    state.formOpen = true;
    composerWrap.hidden = true;
    formWrap.hidden = false;

    var leadText = isFallback
      ? ""
      : "Send Afrith a message directly and he will reply by email.";

    formWrap.innerHTML = [
      '<button type="button" class="aa-back-link" id="aa-form-back">Back to chat</button>',
      leadText ? '<p class="aa-form-lead">' + escapeHtml(leadText) + "</p>" : "",
      '<form id="aa-contact-form" novalidate>',
      '  <input type="text" name="_gotcha" class="aa-hp" tabindex="-1" autocomplete="off" value="" />',
      '  <div class="aa-field">',
      '    <label class="aa-label" for="aa-f-name">Name</label>',
      '    <input class="aa-field-input" id="aa-f-name" name="name" type="text" required placeholder="Your name" />',
      '    <div class="aa-field-err" id="aa-err-name"></div>',
      "  </div>",
      '  <div class="aa-field">',
      '    <label class="aa-label" for="aa-f-email">Email</label>',
      '    <input class="aa-field-input" id="aa-f-email" name="email" type="email" required placeholder="you@example.com" />',
      '    <div class="aa-field-err" id="aa-err-email"></div>',
      "  </div>",
      '  <div class="aa-field">',
      '    <label class="aa-label" for="aa-f-message">Message</label>',
      '    <textarea class="aa-field-textarea" id="aa-f-message" name="message" required placeholder="Write your message..."></textarea>',
      '    <div class="aa-field-err" id="aa-err-message"></div>',
      "  </div>",
      '  <div class="aa-form-neterr" id="aa-form-neterr" hidden></div>',
      '  <div class="aa-form-actions">',
      '    <button type="submit" class="aa-form-btn" id="aa-form-submit">Send message</button>',
      '    <button type="button" class="aa-form-cancel" id="aa-form-cancel">Back</button>',
      "  </div>",
      "</form>",
    ].join("");

    var msgField = document.getElementById("aa-f-message");
    if (msgField) msgField.value = prefillMessage;

    var nameField = document.getElementById("aa-f-name");
    var emailField = document.getElementById("aa-f-email");
    var submitBtn = document.getElementById("aa-form-submit");
    var cancelBtn = document.getElementById("aa-form-cancel");
    var backLink = document.getElementById("aa-form-back");
    var netErrEl = document.getElementById("aa-form-neterr");
    var formEl = document.getElementById("aa-contact-form");

    function restoreChat() {
      showComposer();
      inputEl.focus();
    }
    cancelBtn.addEventListener("click", restoreChat);
    if (backLink) backLink.addEventListener("click", restoreChat);

    formEl.addEventListener("submit", async function (e) {
      e.preventDefault();
      document.getElementById("aa-err-name").textContent = "";
      document.getElementById("aa-err-email").textContent = "";
      document.getElementById("aa-err-message").textContent = "";
      netErrEl.hidden = true;
      netErrEl.innerHTML = "";

      var name = nameField.value.trim();
      var email = emailField.value.trim();
      var message = msgField.value.trim();
      var gotcha = formEl.querySelector('input[name="_gotcha"]').value;

      var hasError = false;
      if (!name) {
        document.getElementById("aa-err-name").textContent = "Please enter your name.";
        hasError = true;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("aa-err-email").textContent =
          "Please enter a valid email address.";
        hasError = true;
      }
      if (!message) {
        document.getElementById("aa-err-message").textContent =
          "Please enter a message.";
        hasError = true;
      }
      if (hasError) return;

      if (!FORMSPREE) {
        netErrEl.hidden = false;
        netErrEl.innerHTML =
          'Contact form endpoint is missing. Email Afrith directly at <a href="mailto:' +
          EMAIL +
          '">' +
          EMAIL +
          "</a>.";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      try {
        var res = await fetch(FORMSPREE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: "Portfolio enquiry via AI agent",
            source: "afrith-agent",
            _gotcha: gotcha,
          }),
        });

        var data = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (res.ok && data && data.ok) {
          formWrap.innerHTML = [
            '<p class="aa-form-success">Sent. Afrith will reply by email.</p>',
            '<div class="aa-form-actions">',
            '  <button type="button" class="aa-form-btn" id="aa-ask-another">Ask something else</button>',
            "</div>",
          ].join("");
          var anotherBtn = document.getElementById("aa-ask-another");
          if (anotherBtn) {
            anotherBtn.addEventListener("click", function () {
              showComposer();
              inputEl.focus();
            });
          }
          return;
        }

        if (res.status >= 400 && res.status < 500 && data && Array.isArray(data.errors)) {
          data.errors.forEach(function (err) {
            var field = err.field || "";
            var target = document.getElementById("aa-err-" + field);
            if (target) {
              target.textContent = err.message || "Invalid value.";
            } else {
              netErrEl.hidden = false;
              netErrEl.textContent = err.message || "Could not submit form.";
            }
          });
        } else {
          netErrEl.hidden = false;
          netErrEl.innerHTML =
            'Could not send right now. You can email Afrith at <a href="mailto:' +
            EMAIL +
            '">' +
            EMAIL +
            "</a>.";
        }
      } catch {
        netErrEl.hidden = false;
        netErrEl.innerHTML =
          'Network error. Please email Afrith directly at <a href="mailto:' +
          EMAIL +
          '">' +
          EMAIL +
          "</a>.";
      } finally {
        if (document.getElementById("aa-form-submit")) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send message";
        }
      }
    });

    if (nameField) nameField.focus();
  }

  async function fetchReplyOnce(assistantBubble) {
    var controller = new AbortController();
    state.abortController = controller;
    var timeoutId = setTimeout(function () {
      controller.abort();
    }, 25000);

    var accumulated = "";
    var errored = false;
    var suggestions = null;
    var offTopic = false;

    function markError() {
      if (errored) return true;
      errored = true;
      return false;
    }

    try {
      var res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: state.history, stream: true }),
        signal: controller.signal,
      });

      if (!res.ok) {
        markError();
      } else {
        var contentType = res.headers.get("content-type") || "";
        if (contentType.indexOf("application/json") !== -1) {
          var json = await res.json();
          if (json && json.reply && !json.error) {
            accumulated = json.reply;
            if (Array.isArray(json.suggestions)) suggestions = json.suggestions;
            offTopic = json.offTopic === true;
            renderReply(assistantBubble, accumulated);
          } else {
            markError();
          }
        } else if (res.body && res.body.getReader) {
          var reader = res.body.getReader();
          var decoder = new TextDecoder();
          var buffer = "";

          while (!errored) {
            var chunk = await reader.read();
            if (chunk.done) break;

            buffer += decoder.decode(chunk.value, { stream: true });
            var lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (var i = 0; i < lines.length; i++) {
              var line = lines[i].trim();
              if (!line || line.indexOf("data:") !== 0) continue;
              var payload = line.slice(5).trim();
              try {
                var evt = JSON.parse(payload);
                if (evt.error) {
                  markError();
                  break;
                }
                if (typeof evt.delta === "string" && evt.delta.length > 0) {
                  accumulated += evt.delta;
                  renderReply(assistantBubble, accumulated, true);
                  assistantBubble.classList.add("aa-caret");
                }
                if (evt.done) {
                  offTopic = evt.offTopic === true;
                  if (typeof evt.reply === "string" && evt.reply.trim()) {
                    accumulated = evt.reply;
                  }
                  if (Array.isArray(evt.suggestions)) {
                    suggestions = evt.suggestions;
                  }
                }
              } catch {}
            }
          }
        } else {
          markError();
        }
      }
    } catch {
      markError();
    } finally {
      clearTimeout(timeoutId);
      if (state.abortController === controller) state.abortController = null;
      assistantBubble.classList.remove("aa-caret");
    }

    return { hardError: errored, reply: accumulated.trim(), suggestions: suggestions, offTopic: offTopic };
  }

  function renderFollowUps(items) {
    var followReply = isNearBottom();
    var existing = messagesEl.querySelector(".aa-followups");
    if (existing) existing.remove();
    var rawList = Array.isArray(items) ? items : [];
    var cleanList = [];
    rawList.forEach(function (item) {
      String(item || "")
        .split("|")
        .forEach(function (part) {
          var t = part.trim();
          if (t && cleanList.length < 3) cleanList.push(t);
        });
    });
    var list = cleanList.length >= 2 ? cleanList : FALLBACK_SUGGESTIONS;
    var wrap = document.createElement("div");
    wrap.className = "aa-chips aa-followups";
    wrap.style.display = "flex";
    wrap.style.flexWrap = "wrap";
    wrap.style.gap = "6px";
    list.forEach(function (q) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "aa-chip";
      btn.textContent = q;
      btn.addEventListener("click", function () {
        ask(q);
      });
      wrap.appendChild(btn);
    });
    messagesEl.appendChild(wrap);
    if (followReply) scrollToLatest();
  }

  var PLEASANT_WORDS = [
    "ok", "okay", "k", "cool", "nice", "great", "good", "sure", "got", "it",
    "alright", "yep", "yeah", "yes", "thanks", "thank", "u", "you", "thx",
    "tysm", "cheers", "hi", "hello", "hey", "yo", "bye", "goodbye", "see",
    "gn", "night", "morning", "please",
  ];

  function matchPleasantry(text) {
    var normalized = String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!normalized) {
      return "Anytime. Anything else about Afrith — his projects, stack or experience?";
    }
    var words = normalized.split(" ");
    if (
      words.length <= 5 &&
      words.every(function (w) {
        return PLEASANT_WORDS.indexOf(w) !== -1;
      })
    ) {
      if (
        words.indexOf("bye") !== -1 ||
        words.indexOf("goodbye") !== -1 ||
        words.indexOf("gn") !== -1
      ) {
        return "Thanks for stopping by — you can reach Afrith at afrithafrith1507@gmail.com.";
      }
      if (
        words.indexOf("hi") !== -1 ||
        words.indexOf("hello") !== -1 ||
        words.indexOf("hey") !== -1 ||
        words.indexOf("yo") !== -1
      ) {
        return "Hi! I'm Afrith's assistant. Ask me about his projects, stack, internships or how to reach him.";
      }
      return "Anytime. Anything else about Afrith — his projects, stack or experience?";
    }
    return null;
  }

  function appendContactButton(bubbleEl, isFallback, question) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "aa-oos-btn";
    btn.textContent = "Contact Afrith";
    btn.addEventListener("click", function () {
      showContactForm({ isFallback: isFallback, question: question });
    });
    var followReply = isNearBottom();
    bubbleEl.appendChild(btn);
    if (followReply) scrollToLatest();
  }

  async function ask(question) {
    var text = String(question || "").trim();
    if (!text || state.isStreaming) return;

    if (!state.isOpen) open();
    if (state.formOpen) showComposer();

    var oldFollow = messagesEl.querySelector(".aa-followups");
    if (oldFollow) oldFollow.remove();

    var conversationId = state.conversationId;
    state.lastQuestion = text;
    inputEl.value = "";
    autoResizeInput();
    updateSendButton();

    appendMessage("user", text, false);
    state.history.push({ role: "user", content: text });
    state.history = state.history.slice(-9);

    var canned = matchPleasantry(text);
    if (canned) {
      appendMessage("assistant", canned, false);
      state.history.push({ role: "assistant", content: canned });
      renderFollowUps(FALLBACK_SUGGESTIONS);
      return;
    }

    state.isStreaming = true;
    updateSendButton();
    var assistantBubble = appendMessage("assistant", "", true);

    var result = await fetchReplyOnce(assistantBubble);
    if (conversationId !== state.conversationId) return;
    if (!result.hardError && !result.reply) {
      result = await fetchReplyOnce(assistantBubble);
      if (conversationId !== state.conversationId) return;
    }

    state.isStreaming = false;
    updateSendButton();

    if (result.hardError || !result.reply) {
      renderReply(assistantBubble, "The assistant is temporarily unavailable. Try sending your question again.");
      renderFollowUps(FALLBACK_SUGGESTIONS);
      return;
    }

    renderReply(assistantBubble, result.reply);
    if (result.offTopic) appendContactButton(assistantBubble, false, text);
    state.history.push({ role: "assistant", content: result.reply });
    renderFollowUps(result.suggestions);
  }

  function dismissBubble() {
    bubble.classList.remove("aa-visible");
    try {
      localStorage.setItem(BUBBLE_STORAGE_KEY, "1");
    } catch {}
  }

  function open() {
    if (state.isOpen) return;
    state.isOpen = true;
    panel.inert = false;
    panel.classList.add("aa-open");
    panel.setAttribute("aria-hidden", "false");
    launcher.setAttribute("aria-expanded", "true");
    dismissBubble();
    setTimeout(function () {
      if (!state.isOpen) return;
      if (state.formOpen) {
        var nameInput = document.getElementById("aa-f-name");
        if (nameInput) nameInput.focus();
      } else {
        inputEl.focus();
      }
    }, 40);
  }

  function close() {
    if (!state.isOpen) return;
    state.isOpen = false;
    panel.classList.remove("aa-open");
    panel.inert = true;
    panel.setAttribute("aria-hidden", "true");
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  function toggle() {
    if (state.isOpen) close();
    else open();
  }

  function resetChat() {
    state.conversationId += 1;
    if (state.abortController) {
      state.abortController.abort();
      state.abortController = null;
    }
    state.history = [];
    state.lastQuestion = "";
    state.isStreaming = false;
    showComposer();
    renderEmptyState();
    inputEl.focus();
  }

  launcher.addEventListener("click", toggle);
  closeBtn.addEventListener("click", close);
  newChatBtn.addEventListener("click", resetChat);
  headerContactBtn.addEventListener("click", function () {
    showContactForm({ isFallback: false, question: state.lastQuestion });
  });
  bubble.addEventListener("click", function () {
    dismissBubble();
    open();
  });

  inputEl.addEventListener("input", function () {
    autoResizeInput();
    updateSendButton();
  });

  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) ask(inputEl.value);
    }
  });

  sendBtn.addEventListener("click", function () {
    ask(inputEl.value);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && state.isOpen) {
      close();
    }
  });

  renderEmptyState();

  try {
    if (!localStorage.getItem(BUBBLE_STORAGE_KEY)) {
      setTimeout(function () {
        if (!state.isOpen) {
          bubble.classList.add("aa-visible");
          setTimeout(dismissBubble, 8000);
        }
      }, 1200);
    }
  } catch {}

  window.AfrithAgent = {
    open: open,
    close: close,
    toggle: toggle,
    ask: ask,
  };
})();

