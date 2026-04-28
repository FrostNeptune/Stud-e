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
const detailsPane = document.getElementById("detailsPane");
const previewCanvas = document.getElementById("previewCanvas");
const previewCtx = previewCanvas.getContext("2d");

const coordTL = document.getElementById("coordTL");
const coordTR = document.getElementById("coordTR");
const coordBL = document.getElementById("coordBL");
const coordBR = document.getElementById("coordBR");
const rectWidthField = document.getElementById("rectWidth");
const rectHeightField = document.getElementById("rectHeight");


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

  // ✅ Remove old selection if it exists
  if (box) {
    box.remove();
    box = null;
  }

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
  if (!selecting || !box) return;

  selecting = false;

  const rect = box.getBoundingClientRect();
  const canvasRect = canvas.getBoundingClientRect();

  const x1 = rect.left - canvasRect.left;
  const y1 = rect.top - canvasRect.top;
  const x2 = x1 + rect.width;
  const y2 = y1 + rect.height;

  // Coordinates
  coordTL.value = `(${Math.round(x1)}, ${Math.round(y1)})`;
  coordTR.value = `(${Math.round(x2)}, ${Math.round(y1)})`;
  coordBL.value = `(${Math.round(x1)}, ${Math.round(y2)})`;
  coordBR.value = `(${Math.round(x2)}, ${Math.round(y2)})`;

  rectWidthField.value = Math.round(rect.width);
  rectHeightField.value = Math.round(rect.height);

  // Show details pane
  detailsPane.classList.add("active");

  // Preview (draw portion to canvas)
  previewCanvas.width = rect.width;
  previewCanvas.height = rect.height;

  const fullCanvasImage = canvas.cloneNode(true);
  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

	html2canvas(canvas).then(fullCanvas => {
	  const scale = 1;

	  previewCanvas.width = rect.width;
	  previewCanvas.height = rect.height;

	  previewCtx.drawImage(
		fullCanvas,
		x1 * scale,
		y1 * scale,
		rect.width * scale,
		rect.height * scale,
		0,
		0,
		rect.width,
		rect.height
	  );
	});

});