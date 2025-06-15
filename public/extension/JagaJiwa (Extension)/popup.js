document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleEnabled");
  const clearCacheBtn = document.getElementById("clearCacheBtn");
  const protectedCountEl = document.getElementById("protectedCount");
  const closeBtn = document.querySelector(".close-btn");
  chrome.storage.local.get(["enabled", "protectedSitesCount"], (res) => {
    const enabled = res.enabled !== false;
    toggle.checked = enabled;
    console.log(
      `Popup loaded - Extension enabled: ${enabled}, Toggle checked: ${toggle.checked}`
    );

    const protectedCount = res.protectedSitesCount || 0;
    protectedCountEl.textContent = protectedCount;
    console.log(`🛡️ JagaJiwa: ${protectedCount} situs judi telah diblokir`);
  });

  toggle.addEventListener("change", () => {
    const isEnabled = toggle.checked;
    console.log(`Toggle changed - New state: ${isEnabled ? "ON" : "OFF"}`);

    chrome.storage.local.set({ enabled: isEnabled }, () => {
      console.log(
        `Extension ${
          isEnabled ? "diaktifkan" : "dinonaktifkan"
        } dan disimpan ke storage`
      );
    });
  });
  clearCacheBtn.addEventListener("click", () => {
    chrome.storage.local.set({ cache: {}, protectedSitesCount: 0 }, () => {
      protectedCountEl.textContent = "0";
      clearCacheBtn.textContent = "Cache Dibersihkan";
      console.log("🗑️ Cache dibersihkan dan counter direset ke 0");
      setTimeout(() => {
        clearCacheBtn.textContent = "Bersihkan Cache";
      }, 2000);
    });
  });

  closeBtn.addEventListener("click", () => {
    window.close();
  });

  setInterval(() => {
    chrome.storage.local.get(["protectedSitesCount"], (res) => {
      const protectedCount = res.protectedSitesCount || 0;
      protectedCountEl.textContent = protectedCount;
    });
  }, 3000);
});
