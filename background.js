chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: ['focus_block']
  });
});

let cachedPrayerTimes = null;

function dateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function cleanTime(rawTime) {
  if (!rawTime) return '--:--';
  return String(rawTime).split(' ')[0];
}

async function fetchPrayerTimesData() {
  const today = dateKey();
  if (cachedPrayerTimes && cachedPrayerTimes.date === today) {
    return cachedPrayerTimes.data;
  }

  const weatherResp = await fetch('https://wttr.in/?format=j1');
  if (!weatherResp.ok) {
    throw new Error(`location lookup failed (${weatherResp.status})`);
  }
  const weatherData = await weatherResp.json();
  const nearestArea = weatherData?.nearest_area?.[0];
  const latitude = nearestArea?.latitude;
  const longitude = nearestArea?.longitude;
  if (!latitude || !longitude) {
    throw new Error('location data unavailable');
  }

  const prayerResp = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&method=2`
  );
  if (!prayerResp.ok) {
    throw new Error(`prayer api failed (${prayerResp.status})`);
  }
  const prayerData = await prayerResp.json();
  const timings = prayerData?.data?.timings;
  if (!timings) {
    throw new Error('invalid prayer timing response');
  }

  const normalizedTimings = {
    Fajr: cleanTime(timings.Fajr),
    Sunrise: cleanTime(timings.Sunrise),
    Dhuhr: cleanTime(timings.Dhuhr),
    Asr: cleanTime(timings.Asr),
    Maghrib: cleanTime(timings.Maghrib),
    Isha: cleanTime(timings.Isha)
  };

  const payload = {
    timings: normalizedTimings,
    location: nearestArea?.areaName?.[0]?.value || ''
  };
  cachedPrayerTimes = { date: today, data: payload };
  return payload;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getPrayerTimes') {
    fetchPrayerTimesData()
      .then((data) => {
        sendResponse({ success: true, ...data });
      })
      .catch((err) => {
        sendResponse({ success: false, error: err?.message || 'failed to fetch prayer times' });
      });
    return true;
  }

  if (message.action === 'enableBlock') {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ['focus_block']
    });
    sendResponse({ success: true });
  } else if (message.action === 'disableBlock') {
    chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ['focus_block']
    });
    sendResponse({ success: true });
  }
  return true;
});
