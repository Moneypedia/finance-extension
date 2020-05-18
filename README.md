# Financial Extension

## Chrome Extension Structure
* manifest.json
* controllers
  * background.js
  * content_script.js
* views
  * index.html

### Pop up page utilization
Decorate with Tailwind CSS or Bulma, BUT DON'T USE NPM!!!
* Bulma: https://bulma.io/documentation/overview/start/
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css">
<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
```

* Tailwind: https://tailwindcss.com/docs/installation/
```html
<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
```

## References

### Select to Look up Vocabulary
* [Flashcard dictionary](https://github.com/chuaweijie/Flashcard-Dictionary)
	* **Highlight to search** -> Let's use this
	* Vocabulary Listing
	* Quiz

* [Naver English Dictionary](https://github.com/skyisle/nendic-ext)
	* **이 익스텐션처럼 Text 위에 hover하는 대신에 별개로 보여주는 방식이 더 좋음: 글을 읽다가 흐르밍 끉기는 일은 없으니까**
	* 근데 너무 오래되서, manifest.json을 좀 손봐야 함. 

* [Translate on hover](https://github.com/artemave/translate_onhover)
	* 평범한 UI이다. 
	* 다만 hovering이 딱히 직관적이지는 않음. 

* [Coding Train Tutorial](https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_084_Word_Definition_Extension/JavaScript)



### Additional Features
* **[Highlighting specific letter](https://github.com/ds300/jetzt)**
* **[Detecting Specific word](https://github.com/panicsteve/cloud-to-butt)**
* **[Converting highlighted contents](https://github.com/adam-p/markdown-here)**

###  Other Chrome Extension Dictionaries
* Highlighted Dictionary: https://github.com/ninja33/ODH
	* [chrome app](https://chrome.google.com/webstore/detail/online-dictionary-helper/lppjdajkacanlmpbbcdkccjkdbpllajb?hl=en) 
* Popup dictionary: https://github.com/FooSoft/yomichan
	* [chrome app](https://chrome.google.com/webstore/detail/yomichan/ogmnaimimemjmbakcfefmnahgdfhfami)
* Google Dictionary: https://github.com/vilic/a-plus-dictionary
	* Depreciated
* Chinese Dictionary connected to API: https://github.com/neekey/iciba
	* Depreciated 
