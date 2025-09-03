const $ = (s) => document.querySelector(s);
const state = {
  all: [],
  q: "",
  genre: "All",
  sort: "title",
  saved: loadSaved()
};

let keyboardNavTriggered = false;

init();

async function init() {
  //Load state from URL query params
  const params = new URLSearchParams(window.location.search);
  state.q = params.get("q") || "";
  state.genre = params.get("genre") || "All";
  state.sort = params.get("sort") || "title";

  //Set initial form values
  $("#q").value = state.q;
  $("#genre").value = state.genre;
  $("#sort").value = state.sort;

  const res = await fetch("books.json");
  state.all = await res.json();
  bind();
  render();
}

function bind() {
  const deb = debounce(() => {
    state.q = $("#q").value.trim();
    render();
  }, 300);

  $("#q").addEventListener("input", deb);
  $("#genre").addEventListener("change", (e) => {
    state.genre = e.target.value;
    render();
  });
  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });

  $("#results").addEventListener("keydown", onResultsKey);
  $("#list").addEventListener("keydown", onReadingListKey);

  document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
      e.preventDefault();
      $("#q").focus();
    }
  });
}

function render() {
  //Update URL with current state
  const params = new URLSearchParams();
  params.set("q", state.q);
  params.set("genre", state.genre);
  params.set("sort", state.sort);
  history.replaceState(null, "", "?" + params.toString());

  // Filter and sort books
  let rows = state.all.filter(b =>
    matchGenre(b, state.genre) && matchQuery(b, state.q)
  );
  rows = sortRows(rows, state.sort);

  $("#count").textContent = `${rows.length} result${rows.length === 1 ? "" : "s"}`;

  // Render search results
  $("#results").innerHTML = rows.map(liTemplate).join("");
  $("#results").querySelectorAll("button.add").forEach(btn =>
    btn.onclick = () => toggleSaved(btn.dataset.id)
  );

  // Render reading list
  $("#list").innerHTML = state.saved.map(id => {
    const b = state.all.find(x => String(x.id) === String(id));
    return b ? `<li tabindex="0">${escapeHtml(b.title)} <button data-id="${b.id}" class="remove">Remove</button></li>` : "";
  }).join("");

  $("#list").querySelectorAll("button.remove").forEach(btn =>
    btn.onclick = () => toggleSaved(btn.dataset.id)
  );

  //Focus first result only if navigating with keyboard
  if (keyboardNavTriggered && rows.length > 0) {
    $("#results").querySelector("li")?.focus();
    keyboardNavTriggered = false;
  }
}

function liTemplate(b) {
  const saved = state.saved.includes(String(b.id));
  return `<li tabindex="0" class="book-item">
    <div class="book-grid">
      <div class="meta">${escapeHtml(b.genre)} • ${b.year}</div>
      <div class="title">${highlight(b.title, state.q)}</div>
      <div class="author">${highlight(b.author, state.q)}</div>
      <div class="action">
        <button class="add" data-id="${b.id}" aria-pressed="${saved}">
          ${saved ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  </li>`;
}

function matchGenre(b, g) {
  return g === "All" || b.genre === g;
}

function matchQuery(b, q) {
  if (!q) return true;
  const s = q.toLowerCase();
  return b.title.toLowerCase().includes(s) || b.author.toLowerCase().includes(s);
}

function sortRows(rows, by) {
  return rows.slice().sort((a, b) =>
    by === "title" ? a.title.localeCompare(b.title) : b.year - a.year
  );
}

function highlight(text, q) {
  if (!q) return escapeHtml(text);
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return escapeHtml(text);
  const a = escapeHtml(text.slice(0, i));
  const m = escapeHtml(text.slice(i, i + q.length));
  const z = escapeHtml(text.slice(i + q.length));
  return `${a}<mark>${m}</mark>${z}`;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem("readingList") || "[]");
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem("readingList", JSON.stringify(state.saved));
}

function toggleSaved(id) {
  id = String(id);
  const i = state.saved.indexOf(id);
  i >= 0 ? state.saved.splice(i, 1) : state.saved.push(id);
  save();
  render();
}

function onResultsKey(e) {
  const items = [...$("#results").querySelectorAll("li")];
  const i = items.indexOf(document.activeElement);

  if (e.key === "ArrowDown") {
    keyboardNavTriggered = true;
    (items[i + 1] || items[0])?.focus();
    e.preventDefault();
  }

  if (e.key === "ArrowUp") {
    keyboardNavTriggered = true;
    (items[i - 1] || items.at(-1))?.focus();
    e.preventDefault();
  }

  if (e.key === "Enter") {
    const el = document.activeElement;
    if (el.classList.contains("add")) {
      el.click();
    } else {
      el.querySelector("button.add")?.click();
    }
    e.preventDefault();
  }
}

function onReadingListKey(e) {
  const items = [...$("#list").querySelectorAll("li")];
  const i = items.indexOf(document.activeElement);

  if (e.key === "ArrowDown") {
    (items[i + 1] || items[0])?.focus();
    e.preventDefault();
  }

  if (e.key === "ArrowUp") {
    (items[i - 1] || items.at(-1))?.focus();
    e.preventDefault();
  }

  if (e.key === "Enter") {
    const el = document.activeElement;
    el.querySelector("button.remove")?.click();
    e.preventDefault();
  }
}

//Unit test for highlight function
console.assert(
  highlight("Clean Code", "Code").includes("<mark>Code</mark>"),
  "Highlight test failed"
);