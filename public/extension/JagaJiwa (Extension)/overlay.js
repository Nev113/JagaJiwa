// JagaJiwa Warning Overlay Module
// This file contains all the overlay functionality for showing gambling warnings

/**
 * Extract search query from URL for different search engines
 * @param {string} url - The URL to extract search query from
 * @returns {string} - The search query or empty string
 */
function extractSearchQuery(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes("google.com") || hostname.includes("google.co.id")) {
      return urlObj.searchParams.get("q") || "";
    } else if (hostname.includes("bing.com")) {
      return urlObj.searchParams.get("q") || "";
    } else if (hostname.includes("yahoo.com")) {
      return urlObj.searchParams.get("p") || "";
    } else if (hostname.includes("duckduckgo.com")) {
      return urlObj.searchParams.get("q") || "";
    }

    return "";
  } catch (err) {
    return "";
  }
}

/**
 * Generate warning message based on URL type
 * @param {string} hostname - The hostname of the site
 * @param {string} url - The full URL
 * @returns {string} - HTML formatted warning message
 */
function generateWarningMessage(hostname, url) {
  const searchQuery = extractSearchQuery(url);
  const isSearchQuery = !!searchQuery;
  const config = window.JagaJiwaConfig || {};
  const messages = config.messages || {};

  if (isSearchQuery) {
    const template =
      messages.searchWarning ||
      'Pencarian "<strong style="color: #d32f2f;">{query}</strong>" terdeteksi sebagai pencarian yang berhubungan dengan judi online.';
    return template.replace("{query}", searchQuery);
  } else {
    const template =
      messages.siteWarning ||
      'Situs <strong style="color: #d32f2f;">{hostname}</strong> terdeteksi sebagai situs judi online.';
    return template.replace("{hostname}", hostname);
  }
}

/**
 * Load CSS file for the overlay
 */
function loadOverlayCSS() {
  // Check if CSS is already loaded
  if (document.getElementById("jaga-jiwa-overlay-css")) {
    return;
  }

  const link = document.createElement("link");
  link.id = "jaga-jiwa-overlay-css";
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = chrome.runtime.getURL("overlay.css");
  document.head.appendChild(link);
}

/**
 * Create and return the overlay HTML content
 * @param {string} warningMessage - The warning message to display
 * @returns {string} - HTML content for the overlay
 */
function createOverlayHTML(warningMessage) {
  const config = window.JagaJiwaConfig || {};
  const messages = config.messages || {};
  const assets = config.assets || {};
  const behavior = config.behavior || {};

  const logoSrc = chrome.runtime.getURL(
    assets.logoPath || "./assets/logo-jagajiwa.png"
  );
  const logoWidth = assets.logoWidth || "60px";
  const warningIcon = assets.warningIcon || "⚠️";
  const title = messages.title || "PERINGATAN KEAMANAN!";
  const subtitle =
    messages.subtitle ||
    "Judi online dapat merugikan kesehatan mental dan finansial Anda.";
  const tipsTitle = messages.tipsTitle || "💡 Tips Keamanan:";
  const tips = messages.tips || [
    "Hindari situs judi online untuk melindungi keuangan Anda",
    "Jika Anda memiliki masalah judi, hubungi layanan konseling",
    "Laporkan situs berbahaya kepada otoritas yang berwenang",
  ];
  const closeButtonText = messages.closeButton || "🚫 Tutup & Keluar";
  const continueButtonText =
    messages.continueButton || "⚠️ Lanjutkan (Risiko Sendiri)";

  const showCloseButton = behavior.showCloseButton !== false;
  const showContinueButton = behavior.showContinueButton !== false;

  const tipsHtml = tips.map((tip) => `• ${tip}`).join("<br>");

  return `
    <div class="jaga-jiwa-overlay">
      <div class="jaga-jiwa-modal">
        <div class="jaga-jiwa-header">
          <img src="${logoSrc}" width="${logoWidth}" alt="JagaJiwa Logo" /> 
          <span class="jaga-jiwa-logo-text">
            <span class="brand-jaga">Jaga</span><span class="brand-jiwa">Jiwa</span>
          </span>
        </div>
        <div class="jaga-jiwa-icon">${warningIcon}</div>
        <h2 class="jaga-jiwa-title">${title}</h2>
        <p class="jaga-jiwa-message">
          ${warningMessage}
        </p>
        <p class="jaga-jiwa-subtitle">
          ${subtitle}
        </p>
        <div class="jaga-jiwa-tips">
          <strong>${tipsTitle}</strong>
          ${tipsHtml}
        </div>
        <div class="jaga-jiwa-buttons">
          ${
            showCloseButton
              ? `<button id="jaga-jiwa-close" class="jaga-jiwa-btn jaga-jiwa-btn-close">${closeButtonText}</button>`
              : ""
          }
          ${
            showContinueButton
              ? `<button id="jaga-jiwa-continue" class="jaga-jiwa-btn jaga-jiwa-btn-continue">${continueButtonText}</button>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

/**
 * Setup event handlers for overlay buttons
 */
function setupOverlayEventHandlers() {
  const closeButton = document.getElementById("jaga-jiwa-close");
  const continueButton = document.getElementById("jaga-jiwa-continue");

  if (closeButton) {
    closeButton.onclick = function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "about:blank";
      }
    };
  }

  if (continueButton) {
    continueButton.onclick = function () {
      const overlay = document.getElementById("jaga-jiwa-warning");
      if (overlay) {
        overlay.remove();
      }
    };
  }
}

/**
 * Setup body overflow and mutation observer for cleanup
 */
function setupOverlayCleanup() {
  document.body.style.overflow = "hidden";

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        if (!document.getElementById("jaga-jiwa-warning")) {
          document.body.style.overflow = "";
          observer.disconnect();
        }
      }
    });
  });
  observer.observe(document.body, { childList: true });
}

/**
 * Main function to show warning overlay
 * @param {string} hostname - The hostname of the detected gambling site
 * @param {string} url - The full URL of the detected gambling site
 */
function showWarningOverlay(hostname, url) {
  // Check if overlay already exists
  if (document.getElementById("jaga-jiwa-warning")) {
    return;
  }

  // Load CSS file
  loadOverlayCSS();

  // Generate warning message
  const warningMessage = generateWarningMessage(hostname, url);

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.id = "jaga-jiwa-warning";
  overlay.innerHTML = createOverlayHTML(warningMessage);

  // Add overlay to page
  document.body.appendChild(overlay);

  // Setup event handlers
  setupOverlayEventHandlers();

  // Setup cleanup functionality
  setupOverlayCleanup();
}

// Export functions for use in background script
if (typeof module !== "undefined" && module.exports) {
  // Node.js environment (for testing)
  module.exports = {
    showWarningOverlay,
    extractSearchQuery,
    generateWarningMessage,
    createOverlayHTML,
    loadOverlayCSS,
  };
}

// Make functions available globally for Chrome extension injection
if (typeof window !== "undefined") {
  window.JagaJiwaOverlay = {
    showWarningOverlay,
    extractSearchQuery,
    generateWarningMessage,
    createOverlayHTML,
    loadOverlayCSS,
  };
}
