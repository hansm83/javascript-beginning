/*! 01-gallery.js */

(function(global, $){

	// 문서에서 대상 객체 선택
	var gallery = $.query('.gallery');
	var gallery_btns = $.queryAll('.gallery-control-btn', gallery);
	var gallery_view_img = $.query('.gallery-view img')

	var clickBtn = function(event){
		var type = event.type;
		if (!event.preventDefault) {
	      event.preventDefault = function() {
	        event.returnValue = false;
	      }
	     }
		if ( type === 'click') {
			var img, g_img_alt, g_img_src;
			img = this.firstElementChild;
			g_img_src = img.getAttribute('src').replace(/-thumb/,'');
			g_img_alt = img.getAttribute('alt');
			gallery_view_img.setAttribute('src', g_img_src);
			gallery_view_img.setAttribute('alt', g_img_alt);

			$.radioClass(this,'active');
		}
	}

	

	for (var btn, i=0, l=gallery_btns.length;i<l;i++){
		btn = gallery_btns[i];
		$.on(btn, 'click', clickBtn);
	}

	// 클릭 이벤트 바인딩
	/*
	for (var btn, i=0, l=gallery_btns.length;i<l;i++){
		btn = gallery_btns[i];
		btn.onclick = function(ev) {
			ev = ev || global.event;
     		ev.target = ev.target || ev.srcElement;
     		if (!ev.preventDefault) {
		      ev.preventDefault = function() {
		        ev.returnValue = false;
		      }
		     }
			var img, g_img_alt, g_img_src;
			img = this.firstElementChild;
			g_img_src = img.getAttribute('src').replace(/-thumb/,'');
			g_img_alt = img.getAttribute('alt');
			gallery_view_img.setAttribute('src', g_img_src);
			gallery_view_img.setAttribute('alt', g_img_alt);

			$.radioClass(this,'active');
		}
	}*/

})(this,this.aiie);