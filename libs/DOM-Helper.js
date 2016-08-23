/*! DOM-Helper.js © aiie.pe.kr, 2016 */
'use strict';

(function(global){

	// type
	function type(data) {
		return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
	}

	// validateData
	function validateData(data, type, err_msg) {
		err_msg = err_msg || '전달된 '+ data + '인자는 요구되는 '+ type +'데이터 유형이 아니라서 오류가 발생했습니다.';
		if ( !data || !type) {
			throw new Error('2개의 필수 전달인자 중 하나가 전달되지 않았습니다. 확인해주세요.');			
		}
		if ( typeof type !== 'string' ) {
			throw new Error('2번째 필수 인자는 체크 할 자바스크립트 데이터 유형을 문자열로 전달해야합니다.')
		}
		if ( typeof data !== type ) {
			throw new Error(err_msg);
		}
	}

	// isElNode
	function isElNode(node) {
		return node.nodeType === 1;
	}

	// each
	var each = (function(){
		if ( Array.prototype.forEach ) {
			return function(list, callback) {
				var is_obj = ( type(list) === 'object' );
				if ( (list.length && type(list) !== 'string' || is_obj )){
					makeArray(list).forEach(function(item, index){
						if(!is_obj){
							callback.call(item, item, index);
						} else {
							var obj_value = obj[item];
							callback.call(null, item, obj_value);
						}
					});
				}
			}
		}
		else {
			return function(list, callback) {
				for (var list_item, i=0, l=list.length;i<l;i++) {
					list_item = list[i];
					callback.call(list_item, list_item, i);
				}
			};
		}
	})();

	// makeArray
	var makeArray = (function(){
		if (Array.from) {
			return function(data) {
				if (type(data) === 'object') {
					return Object.keys(data);
				} else {
					return Array.from(data);
				}
			}
		}
		else {
			return function (obj) {
				var new_arr_set=[], i=0, l=obj.length;
				if ( obj.length && type(obj) !== 'string' && !obj.pop) {
					for (; i<l; i++) {
						new_arr_set.push(obj[i]);
					}
					return new_arr_set;
				} else if ( type(obj) === 'object') {
					for ( var prop in obj ) {
						if (obj.hasOwnProperty(prop)) {
							new_arr_set.push(prop);
						}
					}
					return new_arr_set;
				} else {
					return [];
				}

			}
		}
	})();

	// removeUnit
	function removeUnit(has_unit_value, tactics) {
		// 단위를 빼내는 구문
		// 흔하게 사용하는 css의 단위 리스트
		var unit_list = 'vmax vmin vh vw rem % em px'.split(' ');
		for (var unit, i=unit_list.length-1;unit_list[i];i--){
			unit = unit_list[i];
			if ( has_unit_value.indexOf(unit) > -1){
				if ( unit === 'em'){
					removeUnit.unit = 'em';
					continue;
				}
				removeUnit.unit = unit;
				break;
			}
		}
		// 전달된 인자에 따라 어떤 메소드(방법)를 사용할 지 결정
		var method = (tactics || 'int') === 'int'? 'parseInt' : 'parseFloat';
		// 단위를 제거한 값을 반환
		return window[method](has_unit_value, 10);
	}
	removeUnit.unit = null;

	// queryAll
	function queryAll(selector, context) {
		validateData(selector, 'string');
		if ( typeof context === 'string' ) {
			context = query(context);
		}
		return ( context || document).querySelectorAll(selector);
	}

	// query
	function query(selector, context) {
		return queryAll(selector, context)[0];
	}

	// parentEl
	function parentEl(el, depth) {
		depth && validateData(depth, 'number');
		depth = depth || 1;
		do {
			el = el.parentNode;
		} while ( el && isElnode(el) && --depth);
		return el;
	}

	// prevEl
	var prevEl = (function(){
		var _prevEl;
		if ( 'previousElementSibling' in HTMLElement.prototype ) {
			_prevEl = function(el) {
				return el.previousElementSibling;
			};
		} else {
			_prevEl = function(el) {
				do {
					el = el.previousSibling;
				} while (el && !isElNode(el) );
				return el;
			};
		}
		return _prevEl;
	})();

	// nextEl
	var nextEl = (function(){
		var _nextEl;
		if ( 'nextElementSibling' in HTMLElement.prototype ) {
			_nextEl = function(el) {
				return el.nextElementSibling;
			};
		} else {
			_nextEl = function(el) {
				do {
					el = el.nextSibling;
				} while( el && !isElNode(el) )
				return el;
			};
		}
		return _nextEl;
	})();

	// firtstEl
	var firstEl = (function(){
		var _firstEl;
		if ( 'firstElementChild' in HTMLElement.prototype ) {
			_firstEl = function(el) {
				return el.firstElementChild;
			};
		} else {
			_firstEl = function(el) {
				el = el.firstChild;
				return el && !isElNode(el) ? nextEl(el) : el;
			};
		}
		return _firstEl;
	})();

	// lastEl
	var lastEl = (function(){
		var _lastEl;
		if ( 'lastElementChild' in HTMLElement.prototype ) {
			_lastEl = function(el) {
				return el.lastElementChild;
			};
		} else {
			_lastEl =function(el) {
				el = el.lastChild;
				return el && !isElNode(el) ? prevEl(el) : el;
			};
		}
		return _lastEl;
	})();	

	// getAttr
	function getAttr(elNode, attribute) {
		if(!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.');}
		return elNode.getAttribute(attribute);
	}

	// setAttr
	function setAttr(elNode, attribute, value) {
		if(!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.');}
		elNode.setAttribute(attribute, value);
	}
	
	// attr
	function attr(elNode, attribute, value) {
		if(type(attribute) === 'object'){
			for (var attr in attribute) {
				if (attribute.hasOwnProperty(attr)) {
					setAttr(elNode, attr, attribute[attr]);
				}
			}
		}
		else if ( type(value) === 'undefined') {
			return getAttr(elNode, attribute);
		}
		else {
			setAttr(elNode, attribute, value);
		}
	}

	// css	
	var getStyle = (function(){
		//w3c standard method
		if ( window.getComputedStyle ) {
			return function(elNode, property, pseudo) {
				if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.');}
				validateData(property, 'string', '전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
				var cssMap = window.getComputedStyle(elNode, pseudo);
				if ( pseudo && cssMap.content === '') {
				return null;
				}
			return cssMap[property];
			}
		}
		else {
			return function(elNode, property) {
				if (!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야합니다.');}
				validateData(property,'string','전달된 2번째 "속성이름"은 반드시 문자열이어야 합니다.')
				return elNode.currentStyle[property];
			}
		}
	})();

	function setStyle(elNode, property, value) {
		if(!isElNode(elNode)) { console.error('전달된 첫번째 인자는 요소노드여야 합니다.');}
		validateData(property,'string','전달된 2번째 "속성 이름"은 반드시 문자열이어야 합니다.');
		elNode.style[property] = value;
	}

	function css(elNode, property, value) {
		if ( !value && type(property) === 'string') {
			return getStyle(elNode, property);
		} else if ( !value && type(property) === 'object') {
			each(propery, function(prop, value){
				css(elNode, prop, value);
			});
		} else {
			setStyle(elNode, property, value);
		}

	}

	// hasClass
	var hasClass = (function(){
		var _hasClass;
		if ( 'classList' in HTMLElement.prototype ) {
			_hasClass = function(el, class_name) {
				return el.classList.contains(class_name);
			};
		} else {
			_hasClass = function(el, class_name) {
				var _check_class_name = new RegExp( '(^| )'+class_name+'( |$)' );
				var el_class_name = el.getAttribute('class');
				return _check_class_name.test(el_class_name);
			};
		}
		return _hasClass;
	})();

	// addClass
	var addClass = (function(){
		var _addClass;
		if( 'classList' in HTMLElement.prototype ) {
			_addClass = function(el, class_name) {
				if ( !el.classList.contains(class_name)) {
						el.classList.add(class_name);
				}
			};
		} else {
			_addClass = function(el, class_name) {
				if ( !hasClass(el, class_name) ) {
					var pre_class_vlaue = el.getAttribute('class') || '';
					el.setAttribute('class', (pre_class_value + ' '+ class_name).trim());
				}
			};
		}
		return _addClass;
	})();

	// removeClass
	function _removeClassAll(el, class_name) {
		if (!class_name) { el.setAttribute('class',''); }
	}
	var removeClass = (function(){
		var _removeClass;
		if ( 'classList' in HTMLElement.prototype ) {
			_removeClass = function(el, class_name) {
				_removeClassAll(el, class_name);
				if (el.classList.contains(class_name)) {
					el.classList.remove(class_name);
				}
			};
		} else {
			_removeClass = function(el, class_name) {
				_roeveClassAll(el, class_name);
				if ( hasClass(el, class_name) ) {
					var el_classes = el.getAttribute('class');
					var check_class_name = new RegExp( '(^| )'+class_name+'($| )', 'i');
					el_classes = el_classes.replace(check_class_name, ' ');
					el.setAttribute( 'class', el_classes.trim() );
				}
			};
		}
		return _removeClass;
	})();

	// toggleClass
	var toggleClass = (function(){
		var _toggleClass;
		if ( 'classList' in HTMLElement.prototype ) {
			_toggleClass = function(el, class_name) {
				el.classList.toggle(class_name);
			};
		} else {
			_toggleClass = function(el, class_name){
				if ( hasClass(el, class_name) ) {
					removeClass(el, class_name);
				} else {
					addClass(el, class_name);
				}
			};
		}
		return _toggleClass;
	})();

	// radioClass
	function radioClass(el, class_name) {
		var siblings = el.parentNode.children;
		for ( var sibling, i=0, l = siblings.length; i<l; i++ ) {
			sibling = siblings[i];
			if ( hasClass(sibling, class_name) ) {
				removeClass(sibling, class_name);
				break;
			}
		}
		addClass(el, class_name);
	}


global.aiie = {

	// 문서객체모델 선텍
	'query': query,
	'queryAll': queryAll,

	// 문서객체 탐색
	'parentEl': parentEl,
	'prevEl': prevEl,
	'nextEl': nextEl,
	'firstEl': firstEl,
	'lastEl': lastEl,

	// 문서객체 속성 제어
	'attr': attr,
	//'hanAttr': hasAttr,
	//'removeAttr': removeAttr,

	// css 속성 제어
	'css': css,

	// 클래스 소겅 제어
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass,
	'radioClass': radioClass,

	// 유틸리티
    'type':         type,    
    'validateData': validateData,
    'isElNode':     isElNode,    
    'each':         each,
    'makeArray':    makeArray,
	'removeUnit': removeUnit,

};

})(this);