  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.event === 'playbackRateApplied') {
      indicator.innerText = Number.parseFloat(request.value).toFixed(1);
    }
  });