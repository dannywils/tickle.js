(function ($) {
	$.fn.tickle = function (handler, options) {

		var settings = $.extend({
			angle: 90,
			count: 4,
			time: 1000,
			canLeave: false

		}, options);

		function angleDiff(a,b){
			var diff = Math.atan2(Math.sin(a - b), Math.cos(a - b)) * (180/Math.PI);
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
		return this.mousemove(function (e) {
	// moving upward
	if (e.pageX > oldx && e.pageY > oldy) {
		//bottom-right
		new_direction = 135;
	}
	else if (e.pageX > oldx && e.pageY < oldy) {
		//new_direction="top-right";
		new_direction = 45;
	}
	else if (e.pageX < oldx && e.pageY < oldy) {
		//new_direction="top-left";
		new_direction = 315;
	}
	else if (e.pageX < oldx && e.pageY > oldy) {
		//new_direction="bottom-left";
		new_direction = 225;
	}
	else if (e.pageX > oldx && e.pageY == oldy) {
		//new_direction="right";
		new_direction = 90;
	}
	else if (e.pageX == oldx && e.pageY > oldy) {
		//new_direction="down";
		new_direction = 180;
	}
	else if (e.pageX == oldx && e.pageY < oldy) {
		//new_direction="up";
		new_direction = 0;
	}
	else if (e.pageX < oldx && e.pageY == oldy) {
		//new_direction="left";
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
	// set new mY after doing test above
	//console.log(settings);
	oldx=e.pageX;
	oldy=e.pageY;
	$('#count').text(count);
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
