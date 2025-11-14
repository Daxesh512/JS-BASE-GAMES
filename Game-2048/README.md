# Game-2048
The well known 2048 game programmed in javascript with JQuery

## Quick start guide

Set a div in your HTML with an id : 

```html
<div id="game"></div>
```

Include the javascript file and use the play2048 JQuery plugin on your div :

```javascript
<script type="text/javascript" src="2048.js"></script>

<script type="text/javascript" >
  $("#game").play2048(sizeOf2048Grid, sizeOfDiv);
</script>
```
