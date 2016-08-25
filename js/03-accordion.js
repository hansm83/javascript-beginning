/*! 03-accordion.js */

(function(global, $){

	// 문서에서 대상 객체 선택
	var qna_list = $.query('.qna_list');
	var qna_subject = $.queryAll('.qna_subject', qna_list);
	var qna_subject_links = $.queryAll('.qna_subject_link', qna_list);
	var qna_answer = $.queryAll('.qna_answer', qna_list);
	var activeIndex = 0;

	var activeCont = function(index) {
		if ( index >=0 && index <= qna_subject_links.length) {
			$.toggleClass(qna_answer[index], 'active');
			$.toggleClass(qna_answer[activeIndex], 'active');
			activeIndex = index;
		}
	}; 

	var clickLink = function(link, index) {
		link.addEventListener('click',function(e){
			e.preventDefault();
			$.radioClass($.parentEl(this),'active');
			activeCont(index);
		});
	};

	// 이벤트 연결
	for (var qna_subject_link, i=0, l=qna_subject_links.length;i<l;i++){
		qna_subject_link = qna_subject_links[i];
		clickLink(qna_subject_link, i);				
	}
	
})(this,this.aiie);