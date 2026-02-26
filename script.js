function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

async function loadStories() {
  const resp = await fetch("config.json");
  const config = await resp.json();
  document.getElementById("stories").innerHTML = config.stories
    .map(
      (s) => `
      <a href="${s.link}" class="card">
        <img src="${s.screenshot}" alt="${s.title}" loading="lazy">
        <div class="card-body">
          <div class="card-title">${s.title}</div>
          <div class="card-meta">
            ${s.date ? `<span>${formatDate(s.date)}</span>` : ""}
            ${s.folder ? `<span class="folder">/${s.folder}</span>` : ""}
          </div>
          <div class="card-desc">${s.description}</div>
        </div>
      </a>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", loadStories);
