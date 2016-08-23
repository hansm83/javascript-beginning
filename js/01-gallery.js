/*! 01-gallery.js */

(function(global, $){

	// 문서에서 대상 객체 선택
	var gallery = $.query('.gallery');
	var gallery_btns = $.queryAll('.gallery-control-btn', gallery);
	var gallery_view_img = $.query('.gallery-view img')

	// 클릭 이벤트 바인딩
	for (var btn, i=0, l=gallery_btns.length;i<l;i++){
		btn = gallery_btns[i];
		btn.onclick = function() {
			var img, g_img_alt, g_img_src;
			img = this.firstElementChild;
			g_img_src = img.getAttribute('src').replace(/-thumb/,'');
			g_img_alt = img.getAttribute('alt');
			gallery_view_img.setAttribute('src', g_img_src);
			gallery_view_img.setAttribute('alt', g_img_alt);

			$.radioClass(this,'active');
		}
	}

})(this,this.aiie);