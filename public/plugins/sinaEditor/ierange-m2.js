//关闭了调试信息
console = {log:function(){}};
//var win = window.top;
//console = win.console;

/*
  Range reference:
    http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
    http://mxr.mozilla.org/mozilla-central/source/content/base/src/nsRange.cpp
    https://developer.mozilla.org/En/DOM:Range
  Selection reference:
    http://trac.webkit.org/browser/trunk/WebCore/page/DOMSelection.cpp
  TextRange reference:
    http://msdn.microsoft.com/en-us/library/ms535872.aspx
  Other links:
    http://jorgenhorstink.nl/test/javascript/range/range.js
    http://jorgenhorstink.nl/2006/07/05/dom-range-implementation-in-ecmascript-completed/
    http://dylanschiemann.com/articles/dom2Range/dom2RangeExamples.html
*/

//[TODO] 未实现或未测试的方法：
// cloneContents
// detach
// createContextualFragment

(function () {
/*
  DOM Range
 */
function DOMRange(_document,range) {
	// save document parameter
	this._document = _document;
	
	//拿到创建时的复制品
	this._range = range || this._document.selection.createRange();

	this._refreshAll(this._range);
}
DOMRange.START_TO_START = 0;
DOMRange.START_TO_END = 1;
DOMRange.END_TO_END = 2;
DOMRange.END_TO_START = 3;

DOMRange.prototype = {
	// public properties
	startContainer: null,
	startOffset: 0,
	endContainer: null,
	endOffset: 0,
	commonAncestorContainer: null,
	collapsed: false,
	// private properties
	_document: null,
	
	_comparArr : ['StartToStart','StartToEnd','EndToEnd','EndToStart'],
	
	
	_refreshProperties : function(){
		this.collapsed = this._range.boundingWidth === 0;
		try {
			this.commonAncestorContainer = this._range.parentElement();
		} catch(e){
			//选中的是图片或者表格
			this.commonAncestorContainer = this._range.item(0);
		}
	},
	
	_refreshAll : function(range){
		this._range = range || this._document.selection.createRange();
		this._refreshProperties();
		this._refreshContainer();
	},

	_refreshContainer: function () {
		console.log('_refreshContainer');
		var getConOffset = function(range,toHead){
			var dup = range.duplicate();
			var refRange = range.duplicate();
			var objs = {};
			var pointsWay = toHead ? 'StartToEnd' : 'EndToStart';
			var pointsMethod = toHead ? 'moveStart' : 'moveEnd';
			dup.collapse(toHead);
			if(dup.parentElement().document !== this._document) {
				//焦点到外面的情况
				return {
					container : null,
					offset : 0
				};
			}
			var parent = dup.parentElement(),
				suns = parent.childNodes,
				s = this.__getRefA('container'),
				e = this.__getRefA('container'),
				tmp = refRange.duplicate(),
				offset=0,i=0,sun,len;
			for(;suns[i];i++) {
				sun = suns[i];
				if(sun.nodeType === 3) {
					parent.insertBefore(s,sun);
					this.__insertAfter(e,sun,parent);
					
					refRange.moveToElementText(s);
					tmp.moveToElementText(s);
					refRange.setEndPoint('StartToStart',tmp);
					tmp.moveToElementText(e);
					refRange.setEndPoint('StartToEnd',tmp);
					
					s = parent.removeChild(s);
					e = parent.removeChild(e);
				} else {
					refRange.moveToElementText(sun);
				}
				if(refRange.inRange(dup)) {
					//有可能会选中这样的情况：<ul><li>abc|def</li>|</ul>
					//这样会导致在判断endContainer或者startContainer的时候，必须再加一个判断条件：
					//不能超过节点内容的长度
					objs.container = sun;
					len = (sun.data || sun.value || sun.innerHTML).length;
					if(!toHead) {
						refRange.collapse(true);
					}
					while(refRange.compareEndPoints(pointsWay,dup) && offset < len) {
						offset++;
						refRange[pointsMethod]('character',1);
					}
					objs.offset = offset;
					break;
				}
			}
			return objs;
		}
		
		
		var startTime = +new Date();
		
		if(!this._document.body.firstChild) {
			this._document.body.innerHTML = '&nbsp;';
		}
		this._document.parentWindow.focus();
		
		if(this._range.item) {
			var elm = this._range.item(0),
				parent = elm.parentNode,
				cs=parent.childNodes,i=0;
			this.startContainer = parent;
			this.endContainer = parent;
			for(;cs[i];i++) {
				if(cs[i] === elm) {
					this.startOffset = i;
					this.endOffset = i+1;
					return;
				}
			}
		}
		
		//var mark = this._range.getBookmark();

		var tmp = getConOffset.call(this,this._range,true);
		this.startContainer = tmp.container || this._document.body.firstChild;
		this.startOffset = tmp.offset;
		if(!this.collapsed) {
			tmp = getConOffset.call(this,this._range,false);
		}
		this.endContainer = tmp.container || this._document.body.firstChild;
		this.endOffset = tmp.offset;
		
		//this._range.moveToBookmark(mark);
		this._range.select();
		var endTime = +new Date();
		console.log('.......exec _refreshContainer time:'+(endTime-startTime));
	},
	
	__getRefA : function(text){
		var a = document.createElement('a');
		a.innerHTML = '&nbsp;';
		//追查是哪个方法创建的节点。
		//a.innerHTML = text || '&nbsp;';
		return a;
	},
	
	__insertAfter : function(newElem,reElem,parentEl) {
		parentEl = parentEl || reElem.parentNode;
        if(parentEl.lastChild === reElem) {
            parentEl.appendChild(newElem);
        } else {
            parentEl.insertBefore(newElem,reElem.nextSibling);
        }
	},
	
	//专为data节点作为选择节点的方法
	__moveToElementText : function(dataEle,range,parent){
		var cs = parent.childNodes,
			sa = this.__getRefA(),
			se = this.__getRefA(),
			sar = this._range.duplicate(),
			ser = this._range.duplicate(),
			range = range || this._range,
			parent = parent || dataEle.parentNode;
		parent.insertBefore(sa,dataEle);
		this.__insertAfter(se,dataEle,parent);
		sar.moveToElementText(sa);
		ser.moveToElementText(se);
		range.setEndPoint('StartToStart',sar);
		range.setEndPoint('EndToEnd',ser);
		parent.removeChild(sa);
		parent.removeChild(se);
	},
	
	__setterMethod : function(container, offset, isStart){
		var newPointer = this._range.duplicate(),
			setMethod,sContainer,sOffset;
		if(isStart) {
			setMethod = 'StartToStart';
			sContainer = 'startContainer';
			sOffset = 'startOffset';
		} else {
			setMethod = 'EndToEnd';
			sContainer = 'endContainer';
			sOffset = 'endOffset';
		}
		if(container.nodeType === 3) {
			//data
			console.log('DOM:data');
			var parent = container.parentNode;
			//并不一定是第一个节点，不能这样简单的处理
			this.__moveToElementText(container,newPointer,parent);
			if(offset === 0) {
				//解决选区到节点外的问题
				var a = this.__getRefA('__setterMethod');
				console.log(parent.innerHTML);
				parent.insertBefore(a,container);
				console.log(parent.innerHTML);
				newPointer.moveToElementText(a);
				newPointer.collapse(false);
				this._range.setEndPoint(setMethod,newPointer);
				parent.removeChild(a);
			} else {
				if(!isStart) {
					newPointer.collapse(true);
				}
				newPointer.moveStart('character',offset);
				this._range.setEndPoint(setMethod,newPointer);
			}
		} else {
			console.log('DOM:element');
			newPointer.moveToElementText(container);
			var inRnageNode = container.childNodes[offset];
			var a = this.__getRefA('__setterMethod');
			if(inRnageNode) {
				console.log('not last one');
				container.insertBefore(a,inRnageNode);
			} else {
				console.log('lastOne');
				container.appendChild(a);
			}
			newPointer.moveToElementText(a);
			newPointer.collapse(false);
			this._range.setEndPoint(setMethod,newPointer);
			container.removeChild(a);
		}
		
		this[sContainer] = container;
		this[sOffset] = offset;
		this._refreshProperties();
	},
	
	__setterWhereMethod : function(refNode, isStart,isBefore){
		var a = this.__getRefA('__setterWhereMethod'),
			parent = refNode.parentNode,
			refRange = this._range.duplicate(),
			i = 0,method,container,offset;
		if(isStart) {
			method = 'StartToStart';
			container = 'startContainer';
			offset = 'startOffset';
		} else {
			method = 'EndToEnd';
			container = 'endContainer';
			offset = 'endOffset';
		}
		if(isBefore) {
			parent.insertBefore(a,refNode);
		} else {
			this.__insertAfter(a,refNode);
		}
		for(;parent.childNodes[i]; i++) {
			if(a === parent.childNodes[i]) {
				this[container] = parent;
				this[offset] = i;
				refRange.moveToElementText(a);
				refRange.collapse(false);
				this._range.setEndPoint(method,refRange);
				parent.removeChild(a);
				break;
			}
		}
		this._refreshProperties();
	},
	
	// range methods
	//bug:1.超过长度，就会到别的节点去。
	//bug:2.container必须是第一个data节点。
	//bug:3*.startContainer可能会在endContainer前面。*.chrome亦然
	//bug:4*.data节点被斩断的话，container会变成前一节点。*.chrome亦然
	setStart: function(container, offset) {
		console.log('setStart');
		this.__setterMethod(container, offset, true);
	},
	//bug:1.超过长度，就会到别的节点去。
	//bug:2.container必须是第一个data节点。
	//bug:3*.startContainer可能会在endContainer前面。*.chrome亦然
	setEnd: function(container, offset) {
		console.log('setEnd');
		this.__setterMethod(container, offset, false);
	},
	setStartBefore: function (refNode) {
		console.log('setStartBefore');
		this.__setterWhereMethod(refNode,true,true);
	},
	setStartAfter: function (refNode) {
		console.log('setStartAfter');
		this.__setterWhereMethod(refNode,true,false);
	},
	setEndBefore: function (refNode) {
		console.log('setEndBefore');
		this.__setterWhereMethod(refNode,false,true);
	},
	setEndAfter: function (refNode) {
		console.log('setEndAfter');
		this.__setterWhereMethod(refNode,false,false);
	},
	//bug:块状节点，就选不到前面呀，需要强行选中前面
	//然后悲剧就来了，移除掉参照节点，它又缩回去了！
	selectNode: function (refNode) {
		console.log('selectNode');
		if(refNode.nodeType !== 3) {
			this._range.moveToElementText(refNode);
			var a = this.__getRefA('selectNode');
			refNode.parentNode.insertBefore(a,refNode);
			var dup = this._range.duplicate();
			dup.moveToElementText(a);
			dup.collapse(true);
			this._range.setEndPoint('StartToStart',dup);
			refNode.parentNode.removeChild(a);
		} else {
			//这里是一个潜在的风险
			this._range.moveToElementText(refNode.parentNode);
		}
		this.__setterWhereMethod(refNode,true,true);
		this.__setterWhereMethod(refNode,false,false);
		
		this._range.select();
	},
	selectNodeContents: function (refNode) {
		console.log('selectNodeContents');
		var start = this.__getRefA('selectNodeContents'),
			end = this.__getRefA('selectNodeContents'),
			sRange = this._range.duplicate(),
			eRange = this._range.duplicate(),
			i=0;
		this.startContainer = refNode;
		this.endContainer = refNode;
		this.startOffset = 0;

		if(refNode.nodeType !== 3) {
			this.endOffset = refNode.childNodes.length;
		
			this._range.moveToElementText(refNode);
			refNode.insertBefore(start,refNode.firstChild);
			refNode.appendChild(end);
		} else {
			var parent = refNode.parentNode,
				childs = parent.childNodes;
			for(;childs[i];i++) {
				if(childs[i] === refNode) {
					this.endOffset = refNode.data.length;
					
					parent.insertBefore(start,refNode);
					this.__insertAfter(end,refNode);
					//必须要重置range的选区，否则会受到先前的干扰
					this._range.moveToElementText(start);
					break;
				}
			}
		}
		sRange.moveToElementText(start);
		sRange.collapse(false);
		eRange.moveToElementText(end);
		this._range.setEndPoint('StartToEnd',eRange);
		this._range.setEndPoint('StartToStart',sRange);
		
		start.parentNode.removeChild(start);
		end.parentNode.removeChild(end);
		
		this._refreshProperties();
	},
	collapse: function (toStart) {
		console.log('collapse');
		this._range.collapse(toStart);
		this._refreshAll(this._range);
		//this._range.select();
	},
	//[TODO] 暂不用。
	cloneContents: function () {
		return '';
	},
	extractContents: function () {
		console.log('extractContents');
		var fragement = this._document.createDocumentFragment(),
			tmp = this._document.createElement('div'),
			i=0;
		tmp.innerHTML = this._range.htmlText;
		while(tmp.childNodes[i]) {
			fragement.appendChild(tmp.childNodes[i]);
		}
		this._range.pasteHTML('');
		this._refreshProperties();
		return fragement;
	},
	deleteContents: function () {
		console.log('deleteContents');
		this._range.pasteHTML('');
		this._range = this._document.selection.createRange();
		this._refreshAll();
		return;
	},
	insertNode: function (newNode,fuck) {
		console.log('insertNode');
		//当第一个节点不存在的时候，它不能完全选择节点，用一个占位节点去占首位
		var holderNode = this.__getRefA('insertNode');
		this._document.body.insertBefore(holderNode,this._document.body.firstChild);

		var dup = this._range.duplicate();
		dup.collapse(true);
		dup.pasteHTML('<a id="insertNode"></a>');
		var a = this._document.getElementById('insertNode');
		this.__insertAfter(newNode,a);
		//this._range.select();
		a.parentNode.removeChild(a);
		this._document.body.removeChild(holderNode);
		this._refreshAll();
	},
	//[TODO] 不能选择跨节点的range,没有报错。
	surroundContents: function (newNode) {
		console.log('surroundContents');
		var dup = this._range.duplicate();
		dup.collapse(true);
		dup.pasteHTML('<a id="insertNode"></a>');
		var a = this._document.getElementById('insertNode');
		this.__insertAfter(newNode,a);
		var frage = this.extractContents();
		newNode.appendChild(frage);
		a.parentNode.removeChild(a);
		this._refreshProperties();
	},

	// other methods
	compareBoundaryPoints: function (how, sourceRange) {
		console.log('compareBoundaryPoints');
		try {
			return this._document.selection.createRange().compareEndPoints(this._comparArr[how],sourceRange._range);
		} catch(e) {
			return -1;
		}
	},
	//极有可能的情况是克隆出来的range破坏了原有的节点
	//导致startContainer，endContainer都已经不能被正确的访问
	//致使其不能被被正确的使用。
	cloneRange: function () {
		console.log('cloneRange');
		var range;
		try {
			range = new DOMRange(this._document,this._range.duplicate());
		} catch(e) {
			//选中了图片或者表格
			range = new DOMRange(this._document);
		}
		range.startContainer = this.startContainer;
		range.endContainer = this.endContainer;
		range.startOffset = this.startOffset;
		range.endOffset = this.endOffset;
		range.collapsed = this.collapsed;
		range.commonAncestorContainer = this.commonAncestorContainer;
		return range;
	},
	detach: function () {
		//[TODO] Releases Range from use to improve performance. 
	},
	toString: function () {
		console.log('toString');
		return this._range.text;
	},
	//[TODO] 没有用到
	createContextualFragment: function (tagString) {
		console.log('createContextualFragment');
		// parse the tag string in a context node
		var content = (DOMUtils.isDataNode(this.startContainer) ? this.startContainer.parentNode : this.startContainer).cloneNode(false);
		content.innerHTML = tagString;
		// return a document fragment from the created node
		for (var fragment = this._document.createDocumentFragment(); content.firstChild; )
			fragment.appendChild(content.firstChild);
		return fragment;
	}
};

//单例的range，由于反复的创建，IE会吃不消。
//并且过多的range，会导致潜在的风险。
//如某个range删除了节点，而这个节点极有可能是某个range的container
var __refRange = null;

/*
  DOM Selection
 */
//[NOTE] This is a very shallow implementation of the Selection object, based on Webkit's
// implementation and without redundant features. Complete selection manipulation is still
// possible with just removeAllRanges/addRange/getRangeAt.

function DOMSelection(_document) {
	// save document parameter
	this._document = _document;
	
	// add DOM selection handler
	var selection = this;
	_document.attachEvent('onselectionchange', function () { selection._selectionChangeHandler(); });
	//弹出浮层导致节点丢失的问题。
	_document.attachEvent('onbeforedeactivate', function () { selection._beforedeactivateHandler(); });
	_document.attachEvent('onactivate', function () { selection._activateHandler(); });
}

DOMSelection.prototype = {
	rangeCount: 0,
	_document: null,
	
	// private methods
	_selectionChangeHandler: function () {
		// check if there exists a range
		this.rangeCount = this._selectionExists(this._document.selection.createRange()) ? 1 : 0;
	},
	
	_beforedeactivateHandler: function () {
		if(!__refRange) {
			return false;
		}
		try {
			this._ieSelectionBookmark = __refRange._range.getBookmark();
		} catch(e) {
			this._ieSelectionElement = __refRange._range.item(0);
		}
	},
	
	_activateHandler: function () {
		try {
			if(this._ieSelectionBookmark) {
				__refRange._range.moveToBookmark(this._ieSelectionBookmark);
				//不选一下不会生效
				__refRange._range.select();
				this._ieSelectionBookmark = null;
				return false;
			}
		} catch(e) {
			if(this._ieSelectionElement) {
				//经过如此转换以后，节点range会被转化成普通的range
				try {
					//节点被删除后
					this._ieSelectionElement.parent();
				} catch(e) {
					this._ieSelectionElement = null;
					__refRange._refreshAll();
					return false;
				}
				var refS = __refRange.__getRefA(),
					refE = __refRange.__getRefA(),
					parent = this._ieSelectionElement.parentNode,
					refR = this._document.selection.createRange(),
					refSR = refR.duplicate(),
					refER = refR.duplicate();
					
				parent.insertBefore(refS,this._ieSelectionElement);
				refSR.moveToElementText(refS);
				
				__refRange.__insertAfter(refE,this._ieSelectionElement,parent);
				refER.moveToElementText(refE);
				
				refR.moveToElementText(refS);
				refR.setEndPoint('StartToStart',refSR);
				refR.setEndPoint('EndToEnd',refER);
				
				__refRange._range = refR;
				__refRange._range.select();
				parent.removeChild(refS);
				parent.removeChild(refE);
				this._ieSelectionElement = null;
				return false;
			}
		}
	},
	
	_selectionExists: function (textRange) {
		//防范选择节点的情况
		try {
			return textRange.compareEndPoints('StartToEnd', textRange) != 0 ||
				textRange.parentElement().isContentEditable;
		} catch(e) {
			return true;
		}
	},
	
	// public methods
	addRange: function (range) {
		range._range.select();
		return;
	},
	removeAllRanges: function () {
		this._document.selection.empty();
	},
	getRangeAt: function (index) {
		if(!__refRange) {
			__refRange = new DOMRange(this._document);
			return __refRange;
		}
		__refRange._refreshAll();
		return __refRange;
	},
	toString: function () {
		// get selection text
		return this._document.selection.createRange().text;
	}
};

//IE9 并不需要扩展
var ie = /msie (\d+)\./.exec(navigator.userAgent.toLowerCase()) || [];
var version = ie[1];
if(!version || version < 6) {
	//仅支持到IE6;
	return;
}
if(version < 9) {
	console.log('-----------------------------------------使用过度range');
	/*绑定标准的调用方式*/
	document.createRange = function () {
		if(!__refRange) {
			__refRange = new DOMRange(document);
			return __refRange;
		}
		__refRange._refreshAll();
		return __refRange;
		//return new DOMRange(document);
	};

	var selection = new DOMSelection(document);
	window.getSelection = function () {
		return selection;
	};

	window.Range = DOMRange;
	if(window.parent) {
		window.parent.Range = DOMRange;
	}
} else {
	console.log('-----------------------------------------使用原生range');
	var selection = window.getSelection(),
		ie9Range;

	//IE9bug:弹出浮层导致节点丢失。
	document.attachEvent('onbeforedeactivate', function () {
		try {
			ie9Range = selection.getRangeAt(0);
		} catch(e){}
	});
	document.attachEvent('onactivate', function () {
		if(ie9Range) {
			selection.removeAllRanges();
			selection.addRange(ie9Range);
		}
		ie9Range = null;
	});
}
})();