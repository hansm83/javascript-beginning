/*! 04-slider.js */

(function(global, $){

'use strict';

//numberCounter
function numberCounter(target_frame, target_number) {
	this.count = 0; this.diff = 0;
	this.target_count = parseInt(target_number);
	this.target_frame = document.querySelector(target_frame);
	this.timer = null;
	this.counter();
};
numberCounter.prototype.counter = function() {
	var self = this;
	this.diff = this.target_count - this.count;

	if(this.diff > 0) {
		self.count += Math.ceil(this.diff / 5);
	}

	this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	if(this.count < this.target_count) {
		this.timer = setTimeout(function() { self.counter(); }, 20);
	} else {
		clearTimeout(this.timer);
	}
};

new numberCounter('.text_number', 99999);

})(this, this.aiie);

