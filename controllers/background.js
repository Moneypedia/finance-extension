// background script running

console.log("background running");

chrome.runtime.onMessage.addListener(receiver);

window.word = "snoopy";

function receiver(request, sender, sendResponse) {
  // logging javascript object received from content.js
  console.log(request);
  word = request.text;
}
