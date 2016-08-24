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
			img = $.firstEl(this);
			g_img_src = $.attr(img, 'src').replace(/-thumb/,'');
			g_img_alt = $.attr(img, 'alt');
			$.attr(gallery_view_img, {
				'src': g_img_src,
				'alt': g_img_alt
			});
			$.radioClass(this,'active');
		}
	}

	

	for (var btn, i=0, l=gallery_btns.length;i<l;i++){
		btn = gallery_btns[i];
		$.on(btn, 'click', clickBtn);
	}
	

})(this,this.aiie);