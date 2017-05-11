if(!SinaEditor.util) {
	SinaEditor.util = {};
	/**
	 * 各种对节点，样式的操作工具的集合。
	 * @namespace
	 */
	SinaEditor.util.dom = {};
}

SinaEditor.pkg('SinaEditor.util.dom',function(ns) {
	/**
	 * 创建一个dom节点
	 * @name SinaEditor.util.dom.createDom
	 * @function 
	 * @param {String} nodeName 节点名称
	 * @param {Object} option {ownerDocument:创建节点所属的document(默认为当前的document)，attributes:对应的属性，properties:设置属性}
	 * @return {Element} 创建的节点对象。
	 */
	ns.createDom = function(nodeName, option) {
		option = option || {};
		var ele = (option.ownerDocument||document).createElement(nodeName);
		var k;
		if(option.attributes) {
			for(k in option.attributes) {
				ele.setAttribute(k,option.attributes[k]);
			}
		}
		if(option.properties) {
			for(k in option.properties) {
				ele[k] = option.properties[k];
			}
		}
		return ele;
	};
	
	/**
	 * 判断两个节点的关系是否是包含或者相等的关系。
	 * @name SinaEditor.util.dom.containsNode
	 * @function 
	 * @param {Element} parent 判断的父节点。
	 * @param {Element} child 判断的子节点。
	 * @return {Boolean} 当且仅当两个节点相等，或者包含时返回true。
	 */
	ns.containsNode = function(parent,child) {
		if(parent == child) {
			return true;
		}
		if(parent.contains) {
			return parent.contains(child);
		} else {
			return !!(parent.compareDocumentPosition(child) & 16);
		}
	};
	
	/**
	 * 获取节点的第一个子节点。
	 * @name SinaEditor.util.dom.getFirst
	 * @function 
	 * @param {Element} elem 要获取子节点的父元素。
	 * @return {Element} 节点的第一个子节点
	 */
	ns.getFirst = function(elem) {
		elem = elem.firstChild;
		return elem && elem.nodeType != SinaEditor.NODETYPE.ELEMENT ? ns.getNext( elem ) : elem;
	};
	
	/**
	 * 获取节点的下一个兄弟节点。
	 * @name SinaEditor.util.dom.getNext
	 * @function 
	 * @param {Element} elem 要获取兄弟节点的上一兄弟元素。
	 * @return {Element} 节点的下一个兄弟节点
	 */
	ns.getNext = function(elem) {
		do {  
	        elem = elem.nextSibling;  
	    } while ( elem && elem.nodeType != 1 );  
	    return elem;
	};
	
	/**
	 * 查找节点的所有父节点，到HTML节点为止。
	 * @name SinaEditor.util.dom.parents
	 * @function 
	 * @param {Element} elem 节点元素
	 * @return {Array} 查找节点的父元素到	HTML节点之间所有的父元素
	 */
	ns.parents = function(elem) {
		var parents = [];
		var p = elem.parentNode;

		while(p.tagName.toUpperCase() != 'HTML') {
			parents[parents.length] = p;
			p = p.parentNode;
		}
		
		return parents;
	};
	
	/**
	 * 通过HTML String去创建一个dom节点
	 * @name SinaEditor.util.dom.createDomFromHTML
	 * @function 
	 * @param {String} html html内容
	 * @param {Object} ownerDocument 所属document
	 * @return {Element} 创建好的DOM节点。
	 */
	ns.createDomFromHTML = function(html, ownerDocument) {
		var div = ns.createDom('DIV',{'ownerDocument':ownerDocument});
		div.innerHTML = html;
		if(div.firstChild) {
			return div.removeChild(div.firstChild);
		} else {
			//IE下插入<object>或者<embed>么有效果，套一层
			div.innerHTML = '<div>' + html + '</div>';
			var refC = div.firstChild;
			return refC.removeChild(refC.firstChild);
		}
	};
	
	/**
	 * 获取节点的outHTML
	 * @name SinaEditor.util.dom.outerHTML
	 * @function 
	 * @param {Element} element 要获取的HTML string
	 * @return {String} 节点的outHTML
	 */
	ns.outerHTML = function(element){
		if (element.outerHTML) {
			console.log('原生outerHTML');
			return element.outerHTML;
		}
		//new XMLSerializer().serializeToString(oElement);??
		var div = element.ownerDocument.createElement('div');
		div.appendChild(element.cloneNode(true));
		return div.innerHTML;
	};
	
	if (SinaEditor.env.$IE) {
		/**
		 * 替换节点,把原有的节点替换成新的节点。并返回被替换的节点。
		 * @name SinaEditor.util.dom.replaceNode
		 * @function 
		 * @param {Element} newChild 新的节点 
		 * @param {Element} oldChild 要被替换的节点
		 * @return {Element} 被替换的节点
		 */
		ns.replaceNode = function(newChild,oldChild) {
			return oldChild.replaceNode(newChild); 
		};
	} else {
		ns.replaceNode = function(newChild,oldChild) {
			return oldChild.parentNode.replaceChild(newChild, oldChild);
		};
	}
	
	/**
	 * 删除指定节点
	 * @name SinaEditor.util.dom.delElement
	 * @function 
	 * @param {Element} element 要删除的节点元素
	 * @return {Element} 成功，是删除节点，失败则是null
	 */
	ns.delElement = function(element) {
		var parentNode = element.parentNode;
		if(parentNode) {
			return parentNode.removeChild(element);
		} else {
			return null;
		}
	};
	
	/**
	 * 移除当前节点,并保留节点内的文字。如果不是节点，将不会做任何操作。
	 * @name SinaEditor.util.dom.delElement
	 * @function 
	 * @param {Element} elm 要移除的节点
	 */
	ns.removeTag = function(elm){
		if(elm.nodeType != 1) {
			return;
		}
		var parent = elm.parentNode;
		var children = elm.childNodes;
		while(children[0]) {
			parent.insertBefore(children[0],elm);
		}
		parent.removeChild(elm);
		//有可能前面的节点是textNode,移出的第一个节点也是textNode,所以需要合并
		//有问题的，造成节点位置错乱
		//parent.normalize();
	};
	
	/**
	 * 获取离最近块状父元素最近的非块状父元素。
	 * @name SinaEditor.util.dom.getBlockParent
	 * @function 
	 * @param {Elment} dom 待传入的节点 
	 * @return {Elment} 举例如:
	 * @return {Elment} 举例如:
	 * &nbsp;&nbsp;&nbsp;&nbsp; (a)&lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;span&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;strong&gt;&lt;a&gt;test&lt;/a&gt;&lt;/strong&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;span&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;,传入的节点是a标签,那么将会返回span节点;
	 * &nbsp;&nbsp;&nbsp;&nbsp;(b) &lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;a&gt;test&lt;/a&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;
	 * &nbsp;&nbsp;&nbsp;&nbsp; &lt;/div&gt;,传入的节点是a标签,由于父节点就是块状元素,将会返回null;
	 */
	ns.getBlockParent = function(dom) {
		var ps = ns.parents(dom);
		var blockElm = null;
		var i;
		for(i=0; ps[i]; i++) {
			if(SinaEditor.RANGE.BLOCKTAGS[ps[i].tagName.toUpperCase()]) {
				break;
			}
			blockElm = ps[i];
		}
		return blockElm;
	};
	
	/**
	 * 把节点插入到指定节点之前
	 * @name SinaEditor.util.dom.insertBefore
	 * @function 
	 * @param {Object} newElem 新的节点
	 * @param {Object} reElem 参照节点
	 */
	ns.insertBefore = function(newElem,reElem) {
		reElem.parentNode.insertBefore(newElem,reElem);
	};
	
	/**
	 * 把节点插入到指定节点之后
	 * @name SinaEditor.util.dom.insertAfter
	 * @function 
	 * @param {Object} newElem 新的节点
	 * @param {Object} reElem 参照节点
	 */
	ns.insertAfter = function(newElem,reElem) {
		var parentEl = reElem.parentNode;
        if(parentEl.lastChild == reElem) {
            parentEl.appendChild(newElem);
        } else {
            parentEl.insertBefore(newElem,reElem.nextSibling);
        }
	};

	/**
	 * 获取滚动高度
	 * @name SinaEditor.util.dom.getScrollPos
	 * @function 
	 * @param {Object} oDocument 要获取的document对象。
	 * @return {Aarray} [scrollTop,scrollLeft,scrollWidth,scrollHeight]
	 */
	ns.getScrollPos = function(oDocument) {
		oDocument = oDocument || document;
		var _model = oDocument.compatMode;
		var ref = _model === 'BackCompat' ? oDocument.body : oDocument.documentElement;

		return [ref.scrollTop || oDocument.body.scrollTop,
				ref.scrollLeft || oDocument.body.scrollLeft,
				ref.scrollWidth,
				ref.scrollHeight];
	};
	
	/**
	 * getElementById的方法，duocument传递进去
	 * @name SinaEditor.util.dom.$E
	 * @function 
	 * @param {String | Element} id 传递的ID值或者指定的节点对象。
	 * @param {Object} doc 节点所在的document对象。默认为当前document。
	 * @return {Element} 当且仅当对应的document中存在时，返回此id的节点对象。
	 */
	ns.$E = function(id,doc) {
		var node = typeof id == "string"? (doc || document).getElementById(id): id;
		if(node) {
			return node;
		}
		return null;
	};
	
	/**
	 * 获取节点的X坐标的位置
	 * @param {Object} el
	 * @param {Object} noscoll
	 */
	function _pageX(el,noscoll) {
		var dx = el.scrollLeft;
		if(noscoll) {
			return el.offsetParent ? el.offsetLeft + _pageX(el.offsetParent,noscoll) - dx : el.offsetLeft - dx;
		}
		return el.offsetParent ? el.offsetLeft + _pageX(el.offsetParent,noscoll) : el.offsetLeft;
	}
	
	/**
	 * 获取节点Y坐标的位置
	 * @param {Object} el
	 * @param {Object} noscoll
	 */
	function _pageY(el,noscoll) {
		var dy = el.scrollTop;
		if(noscoll) {
			return el.offsetParent ? el.offsetTop + _pageY(el.offsetParent,noscoll) - dy: el.offsetTop -dy;
		}
		return el.offsetParent ? el.offsetTop + _pageY(el.offsetParent,noscoll) : el.offsetTop;
	}
	
	/**
	 * 获取节点的坐标位置
	 * @name SinaEditor.util.dom.getXY
	 * @function 
	 * @param {Element} el 要获取节点位置的节点
	 * @param {Boolen} inIframe  是否是在iframe内的节点对象。
	 * @return {Array} {坐标X,坐标Y}
	 */
	ns.getXY = function(el,inIframe) {
		if(!inIframe) {
			return [_pageX(el),_pageY(el)];
		}
		
		var doc;
		var frame;
		var pframe;
		var pos = [0,0];
		
		var ie = true;
		
		doc = el.ownerDocument;
		
		if(doc.parentWindow) {
			frame = doc.parentWindow.frameElement;
			pframe = frame && frame.ownerDocument.parentWindow.frameElement;
		} else {
			frame = doc.defaultView.frameElement;
			pframe = frame && frame.ownerDocument.defaultView.frameElement;
			ie = false;
		}
		
		while(frame) {
			pos[0] += ns.styleInteger(frame, "borderLeftWidth");
			pos[1] += ns.styleInteger(frame, "borderTopWidth");
			
			if(pframe) {
				pos[0] += _pageX(frame,true);
				pos[1] += _pageY(frame,true);
				frame = pframe;
				if(ie) {
					pframe = frame.ownerDocument.parentWindow.frameElement;
				} else {
					pframe = frame.ownerDocument.defaultView.frameElement;
				}
			} else {
				pos[0] += _pageX(frame);
				pos[1] += _pageY(frame);
				frame = pframe;
			}
		}

		return [pos[0]+_pageX(el,true),pos[1]+_pageY(el,true)];
	};
	
	/**
     * 返回所有的子节点,是正宗的array哦！
	 * @name SinaEditor.util.dom.getChildren
	 * @function 
     * @param {Object} elements 要返回子节点的元素
     * @param {Object} opts 可选参数:<br>
     * 					eleArr(Array) : 元素数组<br>
     * 					all(Boolean) : 包括子节点的子节点<br>
     * 					onlyElement(Boolen) : true为之返回nodeType为1的节点<br>
     * @return {Aarray} 所有的子节点
     */
    ns.getChildren = function(elements, opts){
        opts = opts || {};
        opts.eleArr = opts.eleArr || [];
        if (elements.nodeType == 3 && !opts.onlyElement) {
            opts.eleArr.push(elements);
        }
        else {
            var children = elements.childNodes;
            var i = 0;
            while (children[i]) {
                var ch = children[i];
                if (ch.nodeType == 1) {
                    if (opts.all && (ch.childNodes.length != 1 || (ch.childNodes.length == 1 && ch.childNodes[0].nodeType != 3))) {
                        opts.eleArr = ns.getChildren(ch, opts);
                    }
                    opts.eleArr.push(ch);
                }
                else {
                    if (!opts.onlyElement) {
                        opts.eleArr.push(ch);
                    }
                }
                i++;
            }
        }
        return opts.eleArr;
    };
});

