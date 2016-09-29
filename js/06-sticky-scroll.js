/*! 04-slider.js */

(function(global, $){

'use strict';

var el = $.query('.sticky_scroll');
stickyScroll( el, 'fixed' );

function stickyScroll(el, fixedClass, snap) {

	// 유효성 검사
	if ( el === undefined || el.nodeType !== 1 ) {
		throw new Error('전달인자가 잘못되었습니다. 요소를 전달해주세요.');
	}

	// snap 초기 값 설정
	snap = (snap===false && snap!==undefined) ? false : true;

	
	// 제어할 대상 참조
	var stickyEl     = el,
		stickyTopPos   = snap ? (stickyEl.offsetTop - stickyEl.clientHeight) : stickyEl.offsetTop;

	// 이벤트 제어
	window.onresize = resetStickyScroll;
	window.onscroll = assignStickyScroll;


	function resetStickyScroll() {
		$.removeClass(stickyEl,fixedClass)
		stickyTopPos = snap ? (stickyEl.offsetTop - stickyEl.clientHeight) : stickyEl.offsetTop;
	};

	function assignStickyScroll() {
		if ( window.scrollY > stickyTopPos ) {
			$.addClass(stickyEl,fixedClass)
			//stickyEl.classList.add(fixedClass);
		} else {
			$.removeClass(stickyEl,fixedClass)
			//stickyEl.classList.remove(fixedClass);
		}
	};

}

})(this, this.aiie);

