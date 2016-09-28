/*! 04-slider.js */

(function(global, $){

// 문서에서 대상 객체 선택
var img_slider = $.query('.img_slider');
var img_slider_img = $.queryAll('.img_slider img', img_slider);
var ico_indicator = $.query('.ico_indicator'); 
var ico_indicator_link = $.queryAll('.ico_indicator .ico_circle', img_slider);
var slideIndex;

var changeImg = function(slideIndex) {
	if (slideIndex >=0 && slideIndex <= img_slider_img.length ){
		$.radioClass(img_slider_img[slideIndex], 'active');
	}
};

var clickIco = function(link, index) {
	link.addEventListener('click',function(e){
		e.preventDefault();
		$.radioClass(this,'active');
		changeImg(index);
	});
};	

for (var i=0, ico_circle; i < ico_indicator_link.length; i++) {
	ico_circle = ico_indicator_link[i]
	clickIco(ico_circle, i)
};


})(this, this.aiie);

