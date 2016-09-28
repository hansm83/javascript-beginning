/*! 02-tab.js */

(function(global, $){

'use strict';

// 문서에서 대상 객체 선택
var tab_container = $.query('.tab_container');
var tab_menus = $.queryAll('.tab_menu li a', tab_container);
var tab_conts = $.query('.tab_conts');
var tab_cont =  $.queryAll('.tab_cont', tab_conts)

var changeCont = function(index) {
	if ( index >=0 && index <= tab_menus.length) {
		$.radioClass(tab_cont[index], 'active');
	}
}; 

var clickMenu = function(link, index) {
	link.addEventListener('click',function(e){
		e.preventDefault();
		$.radioClass($.parentEl(this),'active');
		changeCont(index);
	});
};

// 이벤트 연결
for (var tab_menu, i=0, l=tab_menus.length;i<l;i++){
	tab_menu = tab_menus[i];
	clickMenu(tab_menu, i);				
}

})(this,this.aiie);