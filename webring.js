(async function () {
  const currentUrl = window.location.origin.replace(/\/$/, "");
  const response = await fetch("members.json");
  const sites = await response.json();

  const index = sites.findIndex(site => site.url.replace(/\/$/, "") === currentUrl);

  if (index === -1) {
    console.warn("Site not found in webring.");
    return;
  }

  const prev = sites[(index - 1 + sites.length) % sites.length];
  const next = sites[(index + 1) % sites.length];
  const random = sites[Math.floor(Math.random() * sites.length)];

  const container = document.createElement("div");
  container.className = "webring-widget";
  container.innerHTML = `
    <p>
      <strong>Webring:</strong>
      <a href="${prev.url}">⟵ Prev</a> |
      <a href="${random.url}">🎲 Random</a> |
      <a href="${next.url}">Next ⟶</a>
    </p>
  `;

  document.body.appendChild(container);
})();
