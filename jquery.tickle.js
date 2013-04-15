/*
 * tickle.js
 * jQuery Tickle Plugin
 * https://github.com/dannywils/tickle.js
 *
 * Copyright 2013 Danny Wilson
 * dannywilson.ca
 * Released under the MIT license
 */
 (function ($) {
	$.fn.tickle = function (handler, options) {

		//set some default options
		var defaultOptions = {
			angle: 90,
			count: 4,
			time: 1000,
			canLeave: true,
			requireClick: false,
			preventDrag: true
		};

		var settings = $.extend({}, defaultOptions, options);

		//get the minimum difference between angles a and b on a circle
		function angleDiff(a, b) {
			var c = Math.abs(a - b) % 360;
			return c > 180 ? 360 - c : c;
		}

		//global variables
		var oldx, oldy, count, oldDirection, timer, clicking;

		//reset tracking variables
		function reset() {
			oldx = 0;
			oldy = 0;
			count = 0;
			oldDirection = 0
			timer = new Date().getTime();
		}
		reset();


		//prevent dragging the element
		if (settings.preventDrag) {
			this.on('dragstart', function (event) {
				event.preventDefault();
			});
		}

		//reset if the mouse leaves the element
		if (!settings.canLeave) {
			$(this).on('mouseleave', function () {
				reset();
			});
		}

		//check for mouse down
		if (settings.requireClick) {
			this.mousedown(function () {
				clicking = true;
			})
			this.mouseup(function () {
				clicking = false;
			})
		}

		return this.mousemove(function (e) {
			if (settings.requireClick && !clicking) return;
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
			} else if (e.pageX > oldx && e.pageY == oldy) {
				//right
				direction = 90;
			} else if (e.pageX == oldx && e.pageY > oldy) {
				//down
				direction = 180;
			} else if (e.pageX == oldx && e.pageY < oldy) {
				//up
				direction = 0;
			} else if (e.pageX < oldx && e.pageY == oldy) {
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
})(jQuery);
