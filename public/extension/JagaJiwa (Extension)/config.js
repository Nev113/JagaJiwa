/**
 * JagaJiwa Overlay Configuration
 * This file contains configurable options for the warning overlay
 */

const JagaJiwaConfig = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 999999,
    animationDuration: "0.3s",
    borderRadius: "15px",
    maxWidth: "500px",
    padding: "40px",
  },

  colors: {
    primary: "#d32f2f",
    primaryDark: "#b71c1c",
    secondary: "#666",
    secondaryDark: "#555",
    background: "white",
    text: "#333",
    textLight: "#666",
    tipsBackground: "#f5f5f5",
  },

  typography: {
    fontFamily: "'Montserrat', Tahoma, Geneva, Verdana, sans-serif",
    titleSize: "24px",
    messageSize: "16px",
    subtitleSize: "14px",
    tipsSize: "12px",
    buttonSize: "14px",
  },

  messages: {
    title: "PERINGATAN KEAMANAN!",
    searchWarning:
      'Pencarian "<strong style="color: #d32f2f;">{query}</strong>" terdeteksi sebagai pencarian yang berhubungan dengan judi online.',
    siteWarning:
      'Situs <strong style="color: #d32f2f;">{hostname}</strong> terdeteksi sebagai situs judi online.',
    subtitle:
      "Judi online dapat merugikan kesehatan mental dan finansial Anda.",
    tipsTitle: "💡 Tips Keamanan:",
    tips: [
      "Hindari situs judi online untuk melindungi keuangan Anda",
      "Jika Anda memiliki masalah judi, hubungi layanan konseling",
      "Laporkan situs berbahaya kepada otoritas yang berwenang",
    ],
    closeButton: "🚫 Tutup & Keluar",
    continueButton: "⚠️ Lanjutkan (Risiko Sendiri)",
  },

  behavior: {
    enablePulseAnimation: true,
    enableSlideInAnimation: true,
    enableHoverEffects: true,
    blockScrollOnShow: true,
    autoCloseTimeout: 0,
    showCloseButton: true,
    showContinueButton: true,
  },

  assets: {
    logoPath: "./assets/logo-jagajiwa.png",
    logoWidth: "60px",
    warningIcon: "⚠️",
    iconSize: "64px",
  },

  responsive: {
    mobileBreakpoint: "600px",
    mobilePadding: "30px 20px",
    mobileMargin: "20px",
  },

  darkMode: {
    enabled: true,
    backgroundColor: "#2d2d2d",
    textColor: "#ffffff",
    tipsBackground: "#404040",
    tipsTextColor: "#cccccc",
  },
};

if (typeof window !== "undefined") {
  window.JagaJiwaConfig = JagaJiwaConfig;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = JagaJiwaConfig;
}
