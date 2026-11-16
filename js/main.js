(() => {
  const config = window.WEDDING_CONFIG || {};
  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { if ($(id) && value) $(id).textContent = value; };

  document.title = config.pageTitle || document.title;
  setText("partnerOne", config.partnerOne);
  setText("partnerTwo", config.partnerTwo);
  setText("heroEyebrow", config.eyebrow);
  setText("heroDate", config.displayDate);
  setText("heroPlace", config.city);
  setText("welcomeMessage", config.welcomeMessage);
  setText("venueName", config.venue?.name);
  setText("venueAddress", config.venue?.address);
  setText("venueTime", config.venue?.time);
  setText("rsvpDeadline", config.rsvp?.deadline);
  setText("footerNames", `${config.partnerOne || "Your Name"} & ${config.partnerTwo || "Your Partner"}`);
  setText("footerYear", new Date().getFullYear());
  if (config.venue?.mapsUrl) $("mapLink").href = config.venue.mapsUrl;
  if (config.rsvp?.url) $("rsvpLink").href = config.rsvp.url;

  const eventGrid = $("eventGrid");
  (config.events || []).forEach((event) => {
    const article = document.createElement("article");
    article.className = "event-card";
    const icon = document.createElement("div"); icon.className = "event-icon"; icon.setAttribute("aria-hidden", "true"); icon.textContent = event.icon || "✧";
    const title = document.createElement("h3"); title.textContent = event.title || "Wedding event";
    const date = document.createElement("p"); date.className = "event-date"; date.textContent = event.date || "Date to be announced";
    const time = document.createElement("p"); time.className = "event-time"; time.textContent = event.time || "Time to be announced";
    const description = document.createElement("p"); description.textContent = event.description || "We look forward to celebrating with you.";
    article.append(icon, title, date, time, description);
    eventGrid.append(article);
  });

  const target = config.weddingDate ? new Date(config.weddingDate) : null;
  const countdownNote = $("countdownNote");
  function updateCountdown() {
    if (!target || Number.isNaN(target.getTime())) { countdownNote.textContent = "Add the wedding date in js/config.js to activate the countdown."; return; }
    const diff = target.getTime() - Date.now();
    if (diff <= 0) { ["days", "hours", "minutes", "seconds"].forEach(id => setText(id, "0")); countdownNote.textContent = "Today is the day. Let the celebrations begin!"; return; }
    const values = { days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 };
    Object.entries(values).forEach(([id, value]) => setText(id, String(value).padStart(2, "0")));
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const audio = $("backgroundMusic");
  const musicButton = $("musicToggle");
  if (config.music?.src) { audio.src = config.music.src; audio.volume = Math.min(1, Math.max(0, config.music.volume ?? 0.25)); }
  else musicButton.disabled = true;
  musicButton.addEventListener("click", async () => {
    if (!audio.src) return;
    if (audio.paused) {
      try { await audio.play(); musicButton.setAttribute("aria-pressed", "true"); musicButton.innerHTML = "♫ <span>Music on</span>"; }
      catch { musicButton.innerHTML = "♫ <span>Tap to play</span>"; }
    } else {
      audio.pause(); musicButton.setAttribute("aria-pressed", "false"); musicButton.innerHTML = "♫ <span>Music off</span>";
    }
  });
})();