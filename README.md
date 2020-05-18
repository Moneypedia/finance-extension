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
* Tailwind: https://tailwindcss.com/docs/installation/
* Bulma: https://bulma.io/documentation/overview/start/


## References

### Useful Extensions with OK UI
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
