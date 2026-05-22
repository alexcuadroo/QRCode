const form = document.getElementById("qrForm");
const textInput = document.getElementById("textInput");
const sizeInput = document.getElementById("sizeInput");
const colorInput = document.getElementById("color");
const bgColorInput = document.getElementById("bgColor");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
  btn.disabled = true;

  result.innerHTML = '<div class="loader"><svg class="spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg></div>';

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: textInput.value,
        size: sizeInput.value,
        color: colorInput.value,
        backgroundColor: bgColorInput.value,
      }),
    });

    const data = await res.json();

    if (data.qrCode) {
      result.innerHTML = `
        <img id="qrCode" src="${data.qrCode}" alt="QR" />
        <a class="download-btn" href="${data.qrCode}" download="qr.png">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Descargar
        </a>
      `;
      result.querySelector(".download-btn").scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      result.innerHTML = '';
      alert(data.error || "Error");
    }
  } catch {
    result.innerHTML = '';
    alert("Error al generar");
  } finally {
    btn.innerHTML = original;
    btn.disabled = false;
  }
});