const sendMessage = (eventName, value) => {
  chrome.runtime.sendMessage({event: eventName, value: value});
};
const changeIcon = () => {
  chrome.browserAction.setIcon({path: 'icons/icon_grayout_19px.png'});
}

const init = () => {
  const videos = Array.from(document.querySelectorAll('video'));
  if (videos.length === 0) {
    return;
  }

  changeIcon();
  const defaultPlaybackRate = videos[0].playbackRate;
  sendMessage('playbackRateApplied', defaultPlaybackRate);
  chrome.runtime.onMessage.addEventListener((request, sender, sendResponse) => {
    if (request.event === 'changePlaybackRate') {
      const newPlaybackRate = request.event.value || 1.0;
      videos.forEach(video => {
        video.playbackRate = newPlaybackRate;
        sendMessage('playbackRateApplied', newPlaybackRate);
      });
    }
  });
};

init();