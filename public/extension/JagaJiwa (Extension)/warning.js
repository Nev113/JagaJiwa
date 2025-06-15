// warning.js - Script untuk halaman peringatan

document.addEventListener("DOMContentLoaded", function () {
  // Ambil parameter dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const hostname = urlParams.get("hostname") || "Situs tidak dikenal";
  const url = urlParams.get("url") || "";

  // Update hostname di halaman
  const hostnameElement = document.getElementById("hostname");
  if (hostnameElement) {
    hostnameElement.textContent = hostname;
  }

  console.log("Warning page loaded for:", hostname);
});

function closeTab() {
  // Coba tutup tab/window
  if (window.opener) {
    // Jika dibuka sebagai popup
    window.close();
  } else {
    // Jika dibuka di tab baru, redirect ke halaman aman
    window.location.href = "https://www.google.com";
  }

  // Backup: tutup window setelah delay
  setTimeout(() => {
    window.close();
  }, 100);
}

function continueAnyway() {
  // Ambil URL asli dari parameter
  const urlParams = new URLSearchParams(window.location.search);
  const originalUrl = urlParams.get("url");

  if (originalUrl && originalUrl.startsWith("http")) {
    // Redirect ke URL asli
    window.location.href = originalUrl;
  } else {
    // Jika tidak ada URL, tutup popup
    window.close();
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeTab();
  }
});

// Prevent context menu
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

// Add some security measures
document.addEventListener("keydown", function (event) {
  // Disable F12, Ctrl+Shift+I, Ctrl+U
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && event.key === "I") ||
    (event.ctrlKey && event.key === "u")
  ) {
    event.preventDefault();
    return false;
  }
});

// Focus management
window.addEventListener("blur", function () {
  // Bring window back to focus if it loses focus
  setTimeout(() => {
    window.focus();
  }, 100);
});

// Prevent back/forward navigation
window.addEventListener("popstate", function (event) {
  history.pushState(null, null, window.location.pathname);
});

// Initial history push
history.pushState(null, null, window.location.pathname);
