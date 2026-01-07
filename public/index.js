document.getElementById("qrForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("textInput").value;
  const size = document.getElementById("sizeInput").value;
  const color = document.getElementById("color").value;
  const backgroundColor = document.getElementById("backgroundColor").value;

  const submitBtn = document.querySelector('#qrForm button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Generando...</span>';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, size, color, backgroundColor }),
    });
    const data = await response.json();

    if (data.qrCode) {
      const qrCodeImage = document.getElementById("qrCode");
      qrCodeImage.src = data.qrCode;

      const downloadBtn = document.getElementById("downloadBtn");
      downloadBtn.href = data.qrCode;
      downloadBtn.style.display = "block";
      
      // Agregar efecto de éxito
      submitBtn.innerHTML = '<span>¡Listo!</span>';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.opacity = '1';
      }, 2000);
    } else {
      alert(data.error || "Error al generar el QR");
      submitBtn.innerHTML = originalText;
      submitBtn.style.opacity = '1';
    }
  } catch (err) {
    alert("Error al generar el QR");
    submitBtn.innerHTML = originalText;
    submitBtn.style.opacity = '1';
  } finally {
    submitBtn.disabled = false;
  }
});
const toggleButton = document.getElementById("toggleColorInputs");
const colorInputs = document.getElementById("colorInputs");

toggleButton.addEventListener("click", () => {
  const isHidden = window.getComputedStyle(colorInputs).display === "none";
  if (isHidden) {
    colorInputs.style.display = "flex";
    toggleButton.innerHTML = "⚙️ Ocultar opciones avanzadas";
  } else {
    colorInputs.style.display = "none";
    toggleButton.innerHTML = "⚙️ Opciones avanzadas";
  }
});

const openBannerLink = document.getElementById("openBanner");
const overlay = document.getElementById("overlay");
const banner = document.getElementById("banner");
const closeBannerBtn = document.getElementById("closeBanner");

function showBanner() {
  overlay.style.display = "block";
  banner.style.display = "block";
}

function hideBanner() {
  overlay.style.display = "none";
  banner.style.display = "none";
}

openBannerLink.addEventListener("click", function (event) {
  event.preventDefault();
  showBanner();
});

closeBannerBtn.addEventListener("click", hideBanner);

overlay.addEventListener("click", hideBanner);
