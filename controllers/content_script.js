//Variable used to turn on debug mode
var debug = false;
var bubbleDiv = null;
const bubbleWidth = 300;

// FUNCTION THAT SELECTS VOCABULARY TO SHOW BUBBLE WINDOW
function textSelection() {
  //Get the html element that is in focus.
  var focused = document.activeElement;
  var selectedText;

  //If there is something that is being focused at.
  if (focused) {
    // Try to check if it is a string that is being focused.
    try {
      selectedText = focused.value.substring(
        focused.selectionStart,
        focused.selectionEnd
      );
    } catch (err) {}
  }

  //Handle the exception if the selected text is undefined.
  if (selectedText == undefined) {
    selectedText = window.getSelection().toString();
  }

  //Only trigger text look up if there are words selected
  if (selectedText != "") {
    var info = getSelectionInfo();
    // bubbleDiv is small popup screen when selected
    bubbleDiv = createDiv(info, selectedText);
    wordLookup(selectedText);
  } else {
    //Code to dimiss the pop up bubble
    document.querySelectorAll(".dictionaryDiv").forEach(function (Node) {
      Node.remove();
    });
    bubbleDiv = null;
  }
}

// FUNCTION THAT LOOKS UP DEFINITION FROM API
function wordLookup(vocab) {
  // link to fetch definition from the dictionary
  // var link = `http://127.0.0.1:8000/lookup/${vocab}`;
  var link = "https://api.dictionaryapi.dev/api/v1/entries/en/" + vocab;

  //The request to handle the call to
  var xhttp = new XMLHttpRequest();
  // console.log(xhttp);

  //What to do after a the definition is loaded
  xhttp.onload = function () {
    console.log(this.responseText);
    appendToDiv(this.responseText);
  };

  xhttp.open("GET", link, true);
  xhttp.send();
}

// FUNCTION THAT PARSES SEARCH RESULT
function appendToDiv(content) {
  var wordDefObj = JSON.parse(content);
  var hostDiv = bubbleDiv.heading.getRootNode().host;
  var popupDiv = bubbleDiv.heading.getRootNode().querySelectorAll("div")[1];
  var heightBefore = popupDiv.clientHeight;

  //Check if the return is of the error message
  if (wordDefObj.hasOwnProperty("title")) {
    bubbleDiv.heading.textContent = "Sorry";
    bubbleDiv.meaning.textContent = "No definition found.";
  } else {
    //Start of attaching the returned data to bubbleDiv
    var word = wordDefObj[0].word;
    bubbleDiv.heading.textContent = word;
    bubbleDiv.phonetic.textContent = wordDefObj[0].phonetic;

    //The method to get the first meaning object when the name might be different in the JSON.
    let meaning = Object.entries(wordDefObj[0].meaning);
    bubbleDiv.pos.textContent = meaning[0][0];

    //loop to ensure that the exception of defininition doesn't always exist in the first instance.
    let i = 0;
    var definition;
    while (true) {
      if (meaning[0][1][i].definition != undefined) {
        bubbleDiv.meaning.textContent = meaning[0][1][i].definition;
        definition = meaning[0][1][i].definition;
        break;
      } else {
        i++;
      }
    }

    let search_count = 1;
    let data;
    //add text for user to click link to the source of the definition
    bubbleDiv.moreInfo.textContent = "More »";
    debug && console.log("word :" + word);

    chrome.runtime.sendMessage({
      action: "setVocab",
      vocab: word,
      definition: definition,
    });
  }

  var heightAfter = popupDiv.clientHeight;
  var difference = heightAfter - heightBefore;

  if (popupDiv.classList.contains("flipped_y")) {
    hostDiv.style.top = parseInt(hostDiv.style.top) - difference + 1 + "px";
  }
}

// FUNCTION THAT GETS COORDINATES OF THE SELECTED RECTANGLE TEXT BOX
// REFER TO FOLLOWING DOCUMENT: https://javascript.info/coordinates#element-coordinates-getboundingclientrect
function getSelectionCoords(selection) {
  var oRange = selection.getRangeAt(0); //get the selected text box's range
  var oRect = oRange.getBoundingClientRect();
  // console.log(oRect);
  return oRect;
}

// FUNCTION THAT GETS POSITION OF THE HIGHLIGHTED WORD
function getSelectionInfo() {
  var boundingRect;

  // refer to the following document: https://javascript.info/coordinates
  if (window.getSelection().toString().length > 1) {
    boundingRect = getSelectionCoords(window.getSelection());
  } else {
    return null;
  }

  // positioning bubble page based on text box coordinates information
  console.log(boundingRect);
  // var top = boundingRect.top + window.scrollY;
  var top = window.pageYOffset;
  var bottom = window.pageYOffset;
  var left = window.pageXOffset + window.innerWidth - bubbleWidth;

  console.log(top, bottom, left);

  if (boundingRect.height == 0) {
    top = event.pageY;
    bottom = event.pageY + boundingRect.height;
    left = event.pageX;
  }

  var toReturn = {
    top,
    bottom,
    left,
    clientY: event.clientY,
    height: boundingRect.height,
  };

  console.log(toReturn);
  return toReturn;
}

// FUNCTION THAT CREATES THE BUBBLE WINDOW BASED ON COORINATES INFORMATION AND SELECTED TEXT
function createDiv(info, selectedText) {
  // Insert the div in html for "bubble pop up."
  var hostDiv = document.createElement("div");
  hostDiv.className = "dictionaryDiv";
  hostDiv.style.left = info.left + "px";
  hostDiv.style.position = "absolute";
  hostDiv.attachShadow({ mode: "open" });

  //Code to create the shadow under the "bubble pop up"
  var shadow = hostDiv.shadowRoot;
  var style = document.createElement("style");

  //styling bubble window
  style.textContent = `.mwe-popups{background:#fff;position:absolute;z-index:110;-webkit-box-shadow:0 30px 90px -20px rgba(0,0,0,0.3),0 0 1px #a2a9b1;box-shadow:0 30px 90px -20px rgba(0,0,0,0.3),0 0 1px #a2a9b1;padding:0;font-size:14px;min-width:${bubbleWidth}px;border-radius:2px}`;
  style.textContent =
    style.textContent + ".mwe-popups .mwe-popups-is-not-tall{width:320px}";
  style.textContent =
    style.textContent +
    ".mwe-popups .mwe-popups-container{color:#222;margin-top:-9px;padding-top:9px;text-decoration:none}";
  style.textContent =
    style.textContent +
    ".mwe-popups .mwe-popups-is-not-tall .mwe-popups-extract{min-height:40px;max-height:140px;overflow:hidden;margin-bottom:47px;padding-bottom:0}";
  style.textContent =
    style.textContent +
    ".mwe-popups .mwe-popups-extract{margin:16px;display:block;color:#222;text-decoration:none;position:relative}";
  style.textContent =
    style.textContent +
    ".mwe-popups .flipped_y:before{content:'';position:absolute;border:8px solid transparent;border-bottom:0;border-top: 8px solid #a2a9b1;bottom:-8px;left:10px}";
  style.textContent =
    style.textContent +
    ".mwe-popups .flipped_y:after{content:'';position:absolute;border:11px solid transparent;border-bottom:0;border-top:11px solid #fff;bottom:-7px;left:7px}";
  style.textContent =
    style.textContent +
    ".mwe-popups .mwe-popups-no-image-tri:before{content:'';position:absolute;border:8px solid transparent;border-top:0;border-bottom: 8px solid #a2a9b1;top:-8px;left:10px}";
  style.textContent =
    style.textContent +
    ".mwe-popups .mwe-popups-no-image-tri:after{content:'';position:absolute;border:11px solid transparent;border-top:0;border-bottom:11px solid #fff;top:-7px;left:7px}";
  style.textContent =
    style.textContent +
    ".audio{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcUlEQVQ4y2P4//8/AyUYQhAH3gNxA7IAIQPmo/H3g/QA8XkgFiBkwHyoYnRQABVfj88AmGZcTuuHyjlgMwBZM7IE3NlQGhQe65EN+I8Dw8MLGgYoFpFqADK/YUAMwOsFigORatFIlYRElaRMWmaiBAMAp0n+3U0kqkAAAAAASUVORK5CYII=);background-position: center;background-repeat: no-repeat;cursor:pointer;margin-left: 8px;opacity: 0.5; width: 16px; display: inline-block;}";
  style.textContent = style.textContent + ".audio:hover {opacity: 1;}";
  shadow.appendChild(style);

  //Create another div inside the shadowRoot.
  var encapsulateDiv = document.createElement("div");
  encapsulateDiv.style =
    "all: initial; text-shadow: transparent 0px 0px 0px, rgba(0,0,0,1) 0px 0px 0px !important;";
  shadow.appendChild(encapsulateDiv);

  //Create the div to hold the definition of the container of content
  var popupDiv = document.createElement("div");
  popupDiv.style =
    "font-family: arial,sans-serif; border-radius: 12px; border: 1px solid #a2a9b1; box-shadow: 0 0 17px rgba(0,0,0,0.5)";
  encapsulateDiv.appendChild(popupDiv);

  //Create the convent container
  var contentContainer = document.createElement("div");
  contentContainer.className = "mwe-popups-container";
  popupDiv.appendChild(contentContainer);

  //Create the content
  var content = document.createElement("div");
  content.className = "mwe-popups-extract";
  content.style =
    "line-height: 1.4; margin-top: 0px; margin-bottom: 11px; max-height: none";
  contentContainer.appendChild(content);

  //The H3 element for the heading and the temoprary text when it is still searching. It also creates the sytle.
  var heading = document.createElement("h3");
  heading.style = "margin-block-end: 0px; display:inline-block;";
  heading.textContent = "Searching";

  var pos = document.createElement("h5");
  pos.style = "margin-top: 3px; margin-bottom: 1px;";

  //This is the H5 element for the phonetics
  var phonetic = document.createElement("h6");
  phonetic.style = "margin-top: 3px; margin-bottom: 1px;";

  //The style for meaning and temporary text when it is still searching
  var meaning = document.createElement("p");
  meaning.style = "margin-top: 10px";
  meaning.textContent = "Please Wait...";

  //Link for users to go for more information
  var moreInfo = document.createElement("a");
  moreInfo.href = `https://www.google.com/search?hl=en&q=define+${selectedText}`;
  moreInfo.style = "float: right; text-decoration: none;";
  moreInfo.target = "_blank";

  //Append all the above into the content tag
  content.appendChild(heading);
  content.appendChild(pos);
  content.appendChild(phonetic);
  //content.appendChild(audio);
  content.appendChild(meaning);
  content.appendChild(moreInfo);

  //Attach all the above to the page
  document.body.appendChild(hostDiv);

  //Decide where to put the div depending on where is the div
  popupDiv.className =
    "mwe-popups mwe-popups-no-image-tri mwe-popups-is-not-tall";
  hostDiv.style.top = info.bottom + 10 + "px";
  if (info.height == 0) {
    hostDiv.style.top = parseInt(hostDiv.style.top) + 8 + "px";
  }

  //Return everything above in JSON format
  return {
    heading: heading,
    phonetic: phonetic,
    pos: pos,
    meaning: meaning,
    moreInfo: moreInfo,
  };
}

// REPLACE TEXT WITH REGEX RULE
function replaceText(textNode) {
  var v = textNode.nodeValue;

  v = v.replace(/\bEBITDA\b/g, "profit");
  v = v.replace(/\bebitda\b/g, "profit");
  v = v.replace(/\bEBIT\b/g, "profit");
  v = v.replace(/\bebit\b/g, "profit");

  textNode.nodeValue = v;
}

// DETECTS SPECIFIC WORD IN THE BODY TEXT
// Source: http://is.gd/mwZp7E
function wordDetector(node) {
  var child, next;

  var tagName = node.tagName ? node.tagName.toLowerCase() : "";

  // state exceptions for unwanted body elements
  if (tagName == "input" || tagName == "textarea") {
    return;
  }
  if (node.classList && node.classList.contains("ace_editor")) {
    return;
  }

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        wordDetector(child);
        child = next;
      }
      break;

    case 3: // Text node
      replaceText(node);
      break;
  }
}

// RUN VOCABULARY LOOKUP FOR SELECTED WORD
document.onclick = function () {
  textSelection();
};

// RUN WORD DETECTOR && RUN REPLACER
wordDetector(document.body);
