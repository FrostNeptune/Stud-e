// TAB NAVIGATION
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// SELECTION TOOL
const selectTool = document.getElementById("selectTool");
const canvas = document.getElementById("canvas");
const info = document.getElementById("info");

let selectionEnabled = true;
let selecting = false;
let startX = 0;
let startY = 0;
let box = null;

selectTool.addEventListener("click", () => {
  selectionEnabled = !selectionEnabled;
  selectTool.classList.toggle("active", selectionEnabled);
  info.textContent = selectionEnabled ? "Selection active" : "Selection inactive";
});

canvas.addEventListener("mousedown", (e) => {
  if (!selectionEnabled) return;

  selecting = true;
  startX = e.offsetX;
  startY = e.offsetY;

  box = document.createElement("div");
  box.className = "selection-box";
  box.style.left = `${startX}px`;
  box.style.top = `${startY}px`;
  canvas.appendChild(box);
});

canvas.addEventListener("mousemove", (e) => {
  if (!selecting || !box) return;

  const w = e.offsetX - startX;
  const h = e.offsetY - startY;

  box.style.width = `${Math.abs(w)}px`;
  box.style.height = `${Math.abs(h)}px`;
  box.style.left = `${Math.min(startX, e.offsetX)}px`;
  box.style.top = `${Math.min(startY, e.offsetY)}px`;

  info.textContent =
    `x:${Math.min(startX, e.offsetX)}, y:${Math.min(startY, e.offsetY)}, w:${Math.abs(w)}, h:${Math.abs(h)}`;
});

window.addEventListener("mouseup", () => {
  selecting = false;
});