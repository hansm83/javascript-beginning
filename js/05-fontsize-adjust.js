/*! 04-slider.js */

(function(global, $){

'use strict';

// 문서에서 대상 객체 선택
var txt = $.query('.h_txt');
var txt_font_size = $.css(txt, 'font-size');
var step_font_size = 4;
var min_font_size = 18;
var max_font_size = 30;
var button_group = $.query('.btn_group');

// 이벤트 위임
button_group.addEventListener('click', function(event){
	// 이벤트 대상 (이벤트 전파에 따라 대상이 변경된다)
	var target = event.target;
	var target_class = $.attr(target, 'class');
	var current_font_size, change_font_size;
	current_font_size = $.css(txt, 'font-size');
	current_font_size = $.removeUnit(current_font_size);
	switch(target_class) {
		case 'btn_size_up':
			if( (change_font_size || current_font_size) <= max_font_size) {
				change_font_size = current_font_size + step_font_size;
				$.css(txt, 'font-size', change_font_size + $.removeUnit.unit );				
			}
		break;
		case 'btn_size_down':
			if ( (change_font_size) || current_font_size >= min_font_size) {
				change_font_size = current_font_size + (-1 * step_font_size);
				$.css(txt, 'font-size', change_font_size + $.removeUnit.unit);
			}
		break;
		default:
			$.css(txt, 'font-size', txt_font_size);
	}
});

})(this, this.aiie);

