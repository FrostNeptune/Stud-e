// Tab navigation
const buttons = document.querySelectorAll(".nav-btn");
const tabs = document.querySelectorAll(".tab");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    tabs.forEach(t => t.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Selection logic
const toggle = document.getElementById("selectToggle");
const canvas = document.getElementById("canvas");
const info = document.getElementById("info");
const clearBtn = document.getElementById("clearSelection");

let isSelecting = false;
let startX, startY, box;

canvas.addEventListener("mousedown", (e) => {
  if (!toggle.checked) return;

  isSelecting = true;
  startX = e.offsetX;
  startY = e.offsetY;

  box = document.createElement("div");
  box.className = "selection-box";
  box.style.left = `${startX}px`;
  box.style.top = `${startY}px`;

  canvas.appendChild(box);
});

canvas.addEventListener("mousemove", (e) => {
  if (!isSelecting || !box) return;

  const width = e.offsetX - startX;
  const height = e.offsetY - startY;

  box.style.width = `${Math.abs(width)}px`;
  box.style.height = `${Math.abs(height)}px`;
  box.style.left = `${Math.min(startX, e.offsetX)}px`;
  box.style.top = `${Math.min(startY, e.offsetY)}px`;

  info.textContent = `x:${Math.min(startX, e.offsetX)}, y:${Math.min(startY, e.offsetY)}, w:${Math.abs(width)}, h:${Math.abs(height)}`;
});

window.addEventListener("mouseup", () => {
  isSelecting = false;
});

clearBtn.addEventListener("click", () => {
  if (box) {
    box.remove();
    box = null;
    info.textContent = "";
  }
});