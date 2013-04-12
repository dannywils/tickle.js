tickle.js
=========

A jQuery plugin for tickling your DOM elements. 

## Documentation

This plugin is used to bind a tickle event to an element. 
A tickle event is defined as movement of the mouse where 
the direction has changed by a specified max angle
a specified number of times 
within a specified amount of time.

### Demo

You can view a live demo at [tickle.dannywilson.ca](http://tickle.dannywilson.ca).


### How to use

```javascript
$('element').tickle(callback, options);
```

### Options

Tickle has two argument, the callback function, and an options object that allows you to customize:

* angle: The amount in which the mouse must change it's angle in order to count as a direction change.
* count: The number of times the direction must change before the event is fired.
* time: The amount of time in milliseconds before the count is reset.
* canLeave: Determines if the mouse can leave the element and continue the count.

```javascript
$('#container').tickle(
  function(){
    $(this).css('background-color','red');
  }, 
  { 
  time: 750,
  count: 5,
  time: 1000,
  canLeave: false
  }
);
```
           

## License / Credits

This plugin is released under the MIT license. It is simple and easy to understand and places almost no restrictions on what you can do with the code.
[More Information](http://en.wikipedia.org/wiki/MIT_License)
