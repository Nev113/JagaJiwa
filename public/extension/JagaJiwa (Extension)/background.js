let enabled = true;
let cache = {};
let protectedSitesCount = 0;

console.log(`JagaJiwa Extension Background Script Started!`);

function loadSettings() {
  console.log(`Loading settings from storage...`);
  chrome.storage.local.get(
    ["enabled", "cache", "protectedSitesCount"],
    (res) => {
      enabled = res.enabled !== false;
      cache =
        typeof res.cache === "object" && res.cache !== null ? res.cache : {};
      protectedSitesCount = res.protectedSitesCount || 0;

      console.log(
        `Settings loaded - Enabled: ${enabled}, Protected count: ${protectedSitesCount}, Cache entries: ${
          Object.keys(cache).length
        }`
      );
    }
  );
}
loadSettings();
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local") {
    if (changes.enabled) {
      enabled = changes.enabled.newValue;
    }
    if (changes.cache) {
      cache = changes.cache.newValue;
    }
    if (changes.protectedSitesCount) {
      protectedSitesCount = changes.protectedSitesCount.newValue;
    }
  }
});

function saveCache() {
  chrome.storage.local.set({ cache });
}

function incrementProtectedCount() {
  protectedSitesCount++;
  chrome.storage.local.set({ protectedSitesCount });
  console.log(`Protected sites count updated: ${protectedSitesCount}`);
}

const SAFE_DOMAINS = [
  "google.com",
  "google.co.id",
  "bing.com",
  "yahoo.com",
  "duckduckgo.com",
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "youtube.com",
  "tiktok.com",
  "wikipedia.org",
  "github.com",
  "stackoverflow.com",
  "reddit.com",
  "netflix.com",
  "spotify.com",
  "amazon.com",
  "tokopedia.com",
  "shopee.co.id",
  "bukalapak.com",
  "blibli.com",
  "lazada.co.id",
  "detik.com",
  "kompas.com",
  "tribunnews.com",
  "liputan6.com",
  "cnn.com",
  "bbc.com",
  "reuters.com",
  "jagajiwa.nv113.me",
];

function isSafeDomain(hostname) {
  return SAFE_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith("." + domain)
  );
}

function hasGamblingKeywords(url) {
  const gamblingKeywords = [
    "slot",
    "casino",
    "poker",
    "betting",
    "bet",
    "gambling",
    "gamble",
    "sportsbook",
    "taruhan",
    "judi",
    "maxwin",
    "jackpot",
    "togel",
    "roulette",
    "blackjack",
    "baccarat",
    "lottery",
    "lotere",
    "judol",
    "bet",
    "auto wd",
    "auto win",
    "bonus depo",
    "bonus new member",
    "99",
    "69",
    "mahjong",
  ];

  const urlLower = url.toLowerCase();
  return gamblingKeywords.some((keyword) => urlLower.includes(keyword));
}

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
    console.error("Error extracting search query:", err);
    return "";
  }
}

function isSearchEngineGamblingQuery(url) {
  const query = extractSearchQuery(url);
  if (!query) return false;

  const gamblingKeywords = [
    "slot",
    "casino",
    "poker",
    "betting",
    "bet",
    "gamble",
    "sportsbook",
    "taruhan",
    "judi",
    "maxwin",
    "jackpot",
    "togel",
    "roulette",
    "blackjack",
    "baccarat",
    "lottery",
    "lotere",
    "judol",
    "toto",
    "totowd",
    "gacor",
    "auto wd",
    "auto win",
    "bonus depo",
    "bonus new member",
    "alok77",
    "777",
    "99",
    "69",
    "casino",
    "gambling",
    "mahjong",
    "bet",
    "taruhan bola",
  ];

  const queryLower = query.toLowerCase();
  const hasGamblingKeyword = gamblingKeywords.some((keyword) =>
    queryLower.includes(keyword)
  );

  if (hasGamblingKeyword) {
    console.log(`Gambling search query detected: "${query}"`);
    return true;
  }

  return false;
}

async function classifyUrlWithAI(url) {
  try {
    console.log(`AI Classification started for: ${url}`);
    const hostname = new URL(url).hostname;

    const searchQuery = extractSearchQuery(url);
    if (searchQuery && isSearchEngineGamblingQuery(url)) {
      console.log(`Gambling search detected on ${hostname}: "${searchQuery}"`);
      return true;
    }

    if (isSafeDomain(hostname) && !searchQuery) {
      console.log(`Domain ${hostname} ada di whitelist, skip AI check`);
      return false;
    }

    if (!hasGamblingKeywords(url) && !isSearchEngineGamblingQuery(url)) {
      console.log(`No gambling keywords found in ${url}, calling AI...`);
    }

    console.log(`Making API call to Gemini AI for: ${hostname}`);
    let promptText;
    if (searchQuery) {
      promptText = `Analisis query pencarian berikut untuk menentukan apakah user sedang mencari informasi tentang judi online.

QUERY PENCARIAN: "${searchQuery}"
SEARCH ENGINE: ${hostname}
FULL URL: ${url}

KRITERIA PENCARIAN JUDI ONLINE:
- Mencari situs judi seperti slot, casino, poker online
- Mencari cara bermain judi atau betting
- Mencari situs taruhan olahraga
- Kata kunci seperti: bet, slot, casino, poker, gambling, taruhan, judi, judol, maxwin
- Situs yang memiliki nomor kembar berurut : alok777, alok22, budi99.

BUKAN PENCARIAN JUDI:
- Pencarian informasi umum
- Pencarian berita, hiburan
- Pencarian produk atau layanan non-judi
- Pencarian edukatif tentang risiko judi (untuk edukasi)

Jawab HANYA dengan "True" jika ini pencarian tentang judi online, atau "False" jika bukan.`;
    } else {
      promptText = `Analisis URL berikut untuk menentukan apakah ini adalah situs judi online atau tidak.

URL: ${url}
HOSTNAME: ${hostname}

KRITERIA SITUS JUDI ONLINE:
- Situs yang menawarkan permainan judi seperti slot, casino, poker online
- Situs taruhan olahraga atau e-sports
- Situs yang mempromosikan betting atau gambling
- Domain yang mengandung kata-kata seperti: bet, slot, casino, poker, gambling, sportsbook
- Situs dengan nama yang mencurigakan seperti nomor berulang (777, 99, dll)

BUKAN SITUS JUDI:
- Situs berita, media, atau informasi umum
- E-commerce atau toko online
- Platform media sosial
- Situs pendidikan atau edukasi
- Search engine dan hasil pencarian
- Situs hiburan umum (musik, video, games non-gambling)
- Situs pemerintah atau organisasi resmi

Jawab HANYA dengan "True" jika ini adalah situs judi online, atau "False" jika bukan situs judi online.`;
    }
    console.log(`AI Prompt: ${promptText.substring(0, 200)}...`);

    const response = await fetch("https://jagajiwa.nv113.me/api/extension", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promptText: promptText,
      }),
    });

    if (!response.ok) {
      console.error(
        `Error saat panggil AI: ${response.status} ${response.statusText}`
      );
      return null;
    }
    const data = await response.json();
    console.log(`AI Response:`, data);

    if (!data || !data.success) {
      console.error("Error dalam response AI:", data.error || "Unknown error");
      return null;
    }

    const content = data.content;

    if (!content) {
      console.error("Tidak ada content dalam response");
      return null;
    }
    console.log(`AI Response content: "${content}"`);

    const lowerContent = content.toLowerCase();

    if (
      lowerContent.includes("true") ||
      lowerContent.includes("yes") ||
      lowerContent.includes("ya")
    ) {
      console.log(`AI DECISION: GAMBLING SITE DETECTED!`);
      return true;
    }
    if (
      lowerContent.includes("false") ||
      lowerContent.includes("no") ||
      lowerContent.includes("tidak")
    ) {
      console.log(`AI DECISION: Safe site`);
      return false;
    }

    console.log(`AI DECISION: Unclear response, defaulting to false`);
    return false;
  } catch (err) {
    console.error("Error saat panggil AI:", err);
    return null;
  }
}

async function testAI(testUrl) {
  console.log(`Testing AI with URL: ${testUrl}`);
  const result = await classifyUrlWithAI(testUrl);
  console.log(`Test result: ${result}`);
  return result;
}

globalThis.testAI = testAI;
console.log(`Test function available: testAI("https://example.com")`);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(
    `🔄 Tab updated - ID: ${tabId}, Status: ${changeInfo.status}, URL: ${tab.url}, Extension enabled: ${enabled}`
  );

  if (!enabled) {
    console.log(`⏸️ Extension is disabled, skipping check`);
    return;
  }

  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.startsWith("http")
  ) {
    console.log(`✅ Valid tab to check: ${tab.url}`);
    tryCheckUrl(tabId, tab.url);
  } else {
    console.log(
      `❌ Invalid tab - Status: ${changeInfo.status}, URL: ${tab.url}`
    );
  }
});

async function tryCheckUrl(tabId, url) {
  console.log(`STARTING URL CHECK: ${url}`);

  const hostname = new URL(url).hostname;
  console.log(`Processing URL: ${url}`);
  console.log(`Hostname: ${hostname}`);

  const searchQuery = extractSearchQuery(url);
  if (searchQuery) {
    console.log(`🔎 Search query found: "${searchQuery}"`);
    if (isSearchEngineGamblingQuery(url)) {
      console.log(`🎰 Gambling search query detected! Showing warning...`);
      notifyUser(tabId, hostname, url);
      return;
    } else {
      console.log(
        `Search query "${searchQuery}" is safe, no gambling keywords detected`
      );
      return;
    }
  }

  if (isSafeDomain(hostname)) {
    console.log(`Skipping safe domain: ${hostname}`);
    return;
  }

  const now = Date.now();
  const cacheEntry = cache[hostname];
  const CACHE_TTL = 24 * 60 * 60 * 1000;
  if (cacheEntry && now - cacheEntry.timestamp < CACHE_TTL) {
    console.log(`Using cached result for ${hostname}: ${cacheEntry.result}`);
    if (cacheEntry.result) {
      notifyUser(tabId, hostname, url);
    }
    return;
  }

  console.log(`No cache found, calling AI for: ${hostname}`);

  const result = await classifyUrlWithAI(url);
  console.log(`AI Classification result: ${result}`);

  if (result === null) {
    console.log(`AI returned null, skipping`);
    return;
  }

  cache[hostname] = { result, timestamp: now };
  saveCache();
  console.log(`Cached result for ${hostname}: ${result}`);

  if (result === true) {
    console.log(`GAMBLING SITE DETECTED: ${hostname}`);
    notifyUser(tabId, hostname, url);
  } else {
    console.log(`SAFE SITE: ${hostname}`);
  }
}

function notifyUser(tabId, hostname, url) {
  incrementProtectedCount();

  console.log(
    `JagaJiwa blocked: ${hostname} | Total protected: ${protectedSitesCount}`
  );
  chrome.scripting
    .executeScript({
      target: { tabId: tabId },
      files: ["config.js", "overlay.js"],
    })
    .then(() => {
      return chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (hostname, url) => {
          if (window.JagaJiwaOverlay) {
            window.JagaJiwaOverlay.showWarningOverlay(hostname, url);
          }
        },
        args: [hostname, url],
      });
    })
    .catch((err) => {
      console.error("Error injecting warning overlay:", err);

      chrome.tabs
        .update(tabId, {
          url:
            chrome.runtime.getURL("warning.html") +
            `?hostname=${encodeURIComponent(hostname)}&url=${encodeURIComponent(
              url
            )}`,
        })
        .catch((redirectErr) => {
          console.error("Error redirecting tab:", redirectErr);

          chrome.tabs.update(tabId, { url: "about:blank" });
        });
    });
}
