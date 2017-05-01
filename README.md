jq-anchor
===============

Jq-anchor is a JQuery plugin that allows :
- to be notified of 'anchor' changes.
- to parse URL anchor into Javascript object.

This plugin is a very simple example.
It uses the `jQuery.Callbacks()` function, introduced in version 1.7

### To get started
Jq-anchor requires JQuery plugin v1.7+. Load these 2 files in your HTML document.


```html
<script type="text/javascript" src="./jquery.min.js"> </script>
<script type="text/javascript" src="./jq-anchor.js"> </script>
```


### How to use ?

```javascript
// Define a function that will be called whenever the anchor change.
var myObserver = function(pageName, state){
    console.log('pageName:' + pageName + " - state: " + JSON.stringify(state));
};

// First, get plugin object.
var jqs = $.JQAnchor;

// Add observer to be notified of anchor changes.
jqs.addObserver(myObserver);

// Plugin start the job...
jqs.run();
```

### Fix the url programmatically.
Two functions are provided : 
- `setHash(hash)`
- `goto(pageName, state)`

Example :

```javascript
jqs.setHash("search?name=John&what=His keys!");
jqs.goto('search', {'name':'John', 'what':'His keys!'});
```

