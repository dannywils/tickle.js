/*
 * tickle.js
 * jQuery Tickle Plugin
 * https://github.com/dannywils/tickle.js
 *
 * Copyright 2013 Danny Wilson
 * dannywilson.ca
 * Released under the MIT license
 */
 /*global jQuery*/
 /*jslint browser: true, plusplus: true, white: true */
 (function ($) {
 	"use strict";
	$.fn.tickle = function (handler, options) {
		//set some default options and 	global variables
		var defaultOptions = {
			//the minimum angle that the user must drag in order to
			//continue to count towards the streak
			angle: 90,
			//the number of angle changes required to fire the event
			count: 5,
			//the amount of time that can pass before the count resets
			time: 1000,
			//if the cursor leaves the DOM element, reset the count
			canLeave: false,
			//require the user to hold the mouse button down while tickling
			requireClick: true,
			//prevent dragging of elements
			preventDrag: true
		}, settings = $.extend({}, defaultOptions, options),
		oldx, oldy, count, direction, oldDirection, timer, clicking;


		//get the minimum difference between angles a and b on a circle
		function angleDiff(a, b) {
			var c = Math.abs(a - b) % 360;
			return c > 180 ? 360 - c : c;
		}

	

		//reset tracking variables
		function reset() {
			oldx = oldy = count = oldDirection = 0;
			timer = new Date().getTime();
		}
		
		//call reset immediately to set variables 
		reset();

		//prevent dragging the element
		if (settings.preventDrag) {
			this.on('dragstart', function (event) {
				event.preventDefault();
			});
		}

		//reset if the mouse leaves the element
		if (!settings.canLeave) {
			this.mouseleave(reset);
		}

		//check for mouse down
		if (settings.requireClick) {
			this.mousedown(function () {
				clicking = true;
			});
			this.mouseup(function () {
				clicking = false;
			});
		}

		return this.mousemove(function (e) {
			if (settings.requireClick && !clicking) {
				return;
			}
			if (e.pageX > oldx && e.pageY > oldy) {
				//bottom-right
				direction = 135;
			} else if (e.pageX > oldx && e.pageY < oldy) {
				//top-right
				direction = 45;
			} else if (e.pageX < oldx && e.pageY < oldy) {
				//top-left
				direction = 315;
			} else if (e.pageX < oldx && e.pageY > oldy) {
				//bottom-left
				direction = 225;
			} else if (e.pageX > oldx && e.pageY === oldy) {
				//right
				direction = 90;
			} else if (e.pageX === oldx && e.pageY > oldy) {
				//down
				direction = 180;
			} else if (e.pageX === oldx && e.pageY < oldy) {
				//up
				direction = 0;
			} else if (e.pageX < oldx && e.pageY === oldy) {
				//left
				direction = 270;
			}

			//reset if the timer is up
			if (new Date().getTime() > timer + settings.time) {
				reset();
			}

			//call the handler when the count is enough
			if (count > settings.count) {
				handler.call(this, e);
				reset();
			}

			//increment the count if direction has changed
			if (angleDiff(oldDirection, direction) > settings.angle) {
				count++;
			}

			oldDirection = direction;
			oldx = e.pageX;
			oldy = e.pageY;
		});
	};
}(jQuery));
