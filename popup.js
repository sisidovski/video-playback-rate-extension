document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-control-button]');
  const indicator = document.querySelector('[data-indicator]')
  Array.from(buttons).forEach(button => {
    button.addEventListener('click', e => {
      const value = button.getAttribute('value');
      const current = Integer.parseFloat(indicator.innerText.trim());
      const updated = value === 'minus' ? currentPlaybackRatio - 0.1 : currentPlaybackRatio + 0.1;
      indicator.innerText = updated;
    });
  })
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.event === 'playbackRateApplied') {
      indicator.innerText = Number.parseFloat(request.value).toFixed(1);
    }
  });
});