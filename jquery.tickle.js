(function ($) {
	$.fn.tickle = function (handler, options) {

		var settings = $.extend({
			angle: 90,
			count: 4,
			time: 1000,
			canLeave: false,
			requireClick: true

		}, options);

		function angleDiff(a,b){
			var d = Math.abs(a - b) % 360;
			var r = d > 180 ? 360 - d : d;
			var diff = r;
			return Math.abs(diff);
		}

		function reset(){
			oldx = 0;
			oldy = 0;
			count = 0;
			direction = 0
			timer = new Date().getTime();
		}

		var oldx, oldy, count, direction, timer;
		reset();

		var clicking = !settings.requireClick;

		if(settings.requireClick){
			this.on('dragstart', function(event) { event.preventDefault(); });
			this.mousedown(function(){
				clicking = true;
			})
			this.mouseup(function(){
				clicking = false;
			})
			this.mousemove(function(){

			});
		}

		return this.mousemove(function (e) {
			if(clicking == false) return;
			if (e.pageX > oldx && e.pageY > oldy) {
				//bottom-right
				new_direction = 135;
			}
			else if (e.pageX > oldx && e.pageY < oldy) {
				//"top-right";
				new_direction = 45;
			}
			else if (e.pageX < oldx && e.pageY < oldy) {
				//"top-left";
				new_direction = 315;
			}
			else if (e.pageX < oldx && e.pageY > oldy) {
				//"bottom-left";
				new_direction = 225;
			}
			else if (e.pageX > oldx && e.pageY == oldy) {
				//"right";
				new_direction = 90;
			}
			else if (e.pageX == oldx && e.pageY > oldy) {
				//"down";
				new_direction = 180;
			}
			else if (e.pageX == oldx && e.pageY < oldy) {
				//"up";
				new_direction = 0;
			}
			else if (e.pageX < oldx && e.pageY == oldy) {
				//"left";
				new_direction = 270;
			}

			var a = angleDiff(direction, new_direction);
			if (Math.abs(a) > settings.angle) {
				count++;
			}
			if(!settings.canLeave){
				$(this).on('mouseenter mouseleave', function(){
					reset();
				});
			}
			direction = new_direction;

			oldx=e.pageX;
			oldy=e.pageY;
			$("#count").text(count);
			if (count > settings.count) {
				handler.call(this, e);
				reset();
			}
			if (new Date().getTime() > timer + settings.time) {
				reset();
			}
		});
	};
})(jQuery);
