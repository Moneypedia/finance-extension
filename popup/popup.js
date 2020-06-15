const popupContainer = document.querySelector(".js-popup"),
  popupTitle = popupContainer.querySelector("h1");

document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.querySelector("button").addEventListener("click", onclick, false);

    function onclick() {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "hi", getDefinition);
      });
    }

    function setCount(res) {
      let backgroundPage = chrome.extension.getBackgroundPage();
      let word = backgroundPage.word;
      console.log(word);
      const div = document.createElement("div");
      div.textContent = `${word}`;
      document.body.appendChild(div);
    }

    function getDefinition(res) {
      let backgroundPage = chrome.extension.getBackgroundPage();
      let word = backgroundPage.word;
      //   request url for definition
      var url = `https://finance-extension.an.r.appspot.com/lookup/${word}`;
      console.log(url);
      loadJSON(url, gotData);
      function gotData(data) {
        console.log(data);
        const div = document.createElement("div");
        div.textContent = `${data}`;
        document.body.appendChild(div);
      }
    }
  },
  false
);
