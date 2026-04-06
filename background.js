chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    disableRulesetIds: ['focus_block']
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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
