
if(!SinaEditor.range) {
	/**
	 * 对浏览器实现range的扩充，对各浏览器进行了一定的兼容。
	 * @namespace
	 */
	SinaEditor.range = {};
}

SinaEditor.pkg('SinaEditor.range', function(ns){
	
    var domUtil = SinaEditor.util.dom;
	
	var _queryStateArr = {};

    var _createRange = function(editor){
        return editor.entyDoc.createRange();
    };
    
    /**
     * 获取当前选中的范围，返回range数组。<br>
     * 注意:此防范返回的range都做了一定的修正，可能会选中一个DOM对象。<br>
     * 例如:&lt;a&gt;<span style="background-color:blue;">|test|</span>&lt;/a&gt;这样正好完全按选中一个Dom对象的内容时，会向上选中此Dom对象。<br>
     * &nbsp;&nbsp;&nbsp;&nbsp;即被修正为<span style="background-color:blue;">|&lt;a&gt;test&lt;/a&gt;|</span>
     * @function
     * @name SinaEditor.range.getCurrentRanges
     * @param {Object} win 选中window对象
     * @return {Aarray} 包含所有已选区域的数组。
     */
    ns.getCurrentRanges = function(win){
        var selection = win.getSelection();
        if (!selection) {
            //在没有选中的情况下
            return [];
        }
        var rangeArr = [];
        var count = selection.rangeCount;
		if(!count) {
			var range = win.document.createRange();
			if(!win.document.body.firstChild) {
				win.document.body.innerHTML = '&#x200b;';
			}
			range.selectNode(win.document.body.firstChild);
			range.collapse(true);
			//selection.addRange();
			return [range];
		}
		var i,tmpRange;
        for (i = 0; i < count; i++) {
			tmpRange = _resetRange(selection.getRangeAt(i));
            rangeArr.push(tmpRange);
        }
        return rangeArr;
    };
	
	/**
	 * 修正range，有这种情况<span>abc</span>
	 * 在webkit内核下，选中abc，返回的range在span里面:
	 *   <span>[#text]|abc|[/#text]</span>
	 * 但是我们可能需要获得的range是:
	 *   |<span>[#text]abc[/#text]</span>|
	 * 所以需要对这些选区进行再修正。
	 * @param {Object} range 要修正的range
	 * @return {Object} range 修正后的range
	 */
	var _resetRange = function(range) {
		if(range.collapsed) {
			return range;
		}
		if(range._range && range._range.item) {
			//选中了图片或者表格
			return range;
		}
		
		if(range._range && range.startContainer && range.startContainer.nodeType === SinaEditor.NODETYPE.ELEMENT 
			&& (range.startContainer.tagName.toUpperCase() === 'IMG' || range.startContainer.tagName.toUpperCase() === 'table')) {
			return range;	
		}
		
		if(range._range && range.endContainer && range.endContainer.nodeType === SinaEditor.NODETYPE.ELEMENT 
			&& (range.endContainer.tagName.toUpperCase() === 'IMG' || range.endContainer.tagName.toUpperCase() === 'table')) {
			return range;	
		}
		
		var tmpRange = range.cloneRange();
		var oldStart = range.startContainer;
		var newStart = _whichOne(oldStart);
		while(newStart) {
			range.setStartBefore(newStart);
			if(range.toString() !== tmpRange.toString()) {
				break;
			}
			oldStart = newStart;
			newStart = _whichOne(oldStart);
		}
		if(oldStart === tmpRange.startContainer) {
			range.setStart(oldStart,tmpRange.startOffset);
		} else {
			range.setStartBefore(oldStart);
		}
		var oldEnd = range.endContainer;
		var newEnd = _whichOne(oldEnd);
		while(newEnd) {
			range.setEndAfter(newEnd);
			if(range.toString() !== tmpRange.toString()) {
				break;
			}
			oldEnd = newEnd;
			newEnd = _whichOne(oldEnd);
		}
		if(oldEnd === tmpRange.endContainer) {
			range.setEnd(oldEnd,tmpRange.endOffset);
		} else {
			range.setEndAfter(oldEnd);
		}
		tmpRange.detach();
		return range;
	};
	
	/**
	 * 在多标签包含的情况下(情况分为完全包含和部分包含)，到底要不要向上一级选中。
	 * 例如，完全包含的情况：
	 * <div>123<span><a>|test|</a></span>456</div>，选中了a标签内的所有内容.
	 * 但是a标签完全包含在span标签内，所以选区会被修正为:
	 * <div>123|<span><a>test</a></span>|456</div>
	 * @param {Object} elm 判断是否为完全包含的子节点。
	 * @return {Object} 当且仅当参数节点为父节点的全包含时，返回最上层的父节点。
	 */
	var _whichOne = function(elm) {
		var p,pp;
		p = elm.parentNode;
		//最上面到body就截止#webkit，问题出现。
		//遇到了HTML这个节点,#opera，出现问题。
		if(!p || p.nodeType === SinaEditor.NODETYPE.HTMLELEMENT || p.tagName.toUpperCase() === 'HTML' || p.tagName.toUpperCase() === 'BODY') {
			return null;
		}
		pp = p.parentNode;
		if(pp && p) {
			var cs = pp.childNodes;
			for(var i=0; cs[i]; i++) {
				if(cs[i] === p) {
					return p;
				}
			}
		}
		return null;
	};
    
    /**
     * 应用给定的range(s)对象。
     * @function
     * @name SinaEditor.range.applyRanges
     * @param {Object} win 选中window对象
     * @param {Object | Array} ranges range对象或者对象数组
     */
    ns.applyRanges = function(win, ranges){
        if (!ranges) {
            return;
        }
        var selection = win.getSelection();
        selection.removeAllRanges();
        if (ranges.push) {
			var i;
            for (i = 0; ranges[i]; i++) {
                selection.addRange(ranges[i]);
            }
        }
        else {
            selection.addRange(ranges);
        }
    };
    
    /**
     * 获取当前选区焦点的节点对象，在多选区的情况下，只对第一个选区进行处理。
     * @function
     * @name SinaEditor.range.focusNode
     * @param {Object} win 要查找的window对象
     * @param {boolean} opt_onlyEle 当且仅当opt_onlyEle=true时，保证返回的是DOM节点
     * @return {Object} 返回当前选区焦点的节点对象
     */
    ns.focusNode = function(win,opt_onlyEle){
		var node = null;
        if (SinaEditor.env.$IE) {
            var range = win.document.selection.createRange();
			node = range.item ? range.item(0) : range.parentElement();
			if(opt_onlyEle && node.nodeType != 1 ) {
				return node.parentNode;
			}
            return node;
        }
        var selection = win.getSelection();
        var rangeArr = [];
        var count = selection.rangeCount;
		var i;
        for (i = 0; i < count; i++) {
			node = selection.getRangeAt(i).commonAncestorContainer;
			if(opt_onlyEle && node.nodeType != 1 ) {
				return node.parentNode;
			}
            return node;
        }
        return null;
    };
	
	/**
	 * 获得当前range的状态参照节点，通常情况下，range会跨越多个节点。<br>
	 * 为了获取当前range的状态(如是否为加粗等状态)，需要有一个参照节点来确定状态。<br>
     * @function
     * @name SinaEditor.range.getReferNode
	 * @param {Object} win 要探测range的window对象。
	 * @param {Object} range 要获取参照节点的range对象。
	 * @return {Object} 返回选中range中的第一个节点，如果第一个节点为文本节点，会返回他的父节点。
	 */
	ns.getReferNode = function(win,range) {
		range = range || ns.getCurrentRanges(win)[0];
		if(!range) {
			return null;
		}
		if(range.item) {
			return range.item(0);
		}
		
		var referNode = range.startContainer;
		
		switch(referNode.nodeType) {
			case SinaEditor.NODETYPE.ELEMENT : 
				//到这里来有三种情况：
				//1.ctrl+a:选中了body
				//2.应用了一些点击，生成的range选中了节点。
				//3.选中了图片
				switch(referNode.tagName.toUpperCase()) {
					case 'BODY' : 
						return SinaEditor.util.dom.getFirst(referNode);
					default : return referNode.parentNode;
				}
			case SinaEditor.NODETYPE.TEXT : 
				console.log('SinaEditor.NODETYPE.TEXT');
				var parent = referNode.parentNode;
				try {
					//有可能被拆卸了
					parent.normalize();
				}  catch(e){}
				if(parent.childNodes.length == 1) {
					return parent;
				}
				return referNode;
		}
	};
    
    /**
     * 选中指定的节点。
     * @function
     * @name SinaEditor.range.focus
     * @param {Object} dom 要选中的节点
     * @param {Boolean} isContent 选中节点里的内容还是选中节点
     * @return {Object} 返回selection对象
     */
    ns.focus = function(dom, isContent){
        var win = dom.ownerDocument.parentWindow | dom.ownerDocument.defaultView;
        var selection = win.getSelection();
        var range = win.document.createRange();
        if (isContent) {
            range.selectNodeContents(dom);
        }
        else {
            range.selectNode(dom);
        }
        selection.removeAllRanges();
        selection.addRange(range);
        return selection;
    };
    
    /**
     * 设置选择区域在节点之前
     * @function
     * @name SinaEditor.range.setStartBefore
     * @param {Object} win 考虑到dom有可能是一个textnode，所以需要传递window对象
     * @param {Object} dom 要比较的节点
     * @return {Object} 返回selection对象
     */
    ns.setStartBefore = function(win, dom){
        var selection = win.getSelection();
        var range = win.document.createRange();
        
        range.setStartBefore(dom);
        
        selection.removeAllRanges();
        selection.addRange(range);
        return selection;
    };
    
    /**
     * 插入一个节点
     * @function
     * @name SinaEditor.range.insertNode
     * @param {Object} win 考虑到dom有可能是一个textnode，所以需要传递window对象
     * @param {Object} dom 要插入的节点
     * @return {Object} 返回selection对象
     */
    ns.insertNode = function(win, dom){
        var selection = win.getSelection();
        var range;
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
        } else {
            range = win.document.createRange();
        }
        
        range.insertNode(dom);
        
        return selection;
    };
    
    /**
     * 比较两个边界的位置
     * @function
     * @name SinaEditor.range.compareBoundaryPoints
     * @param {Object} firstRange 第一个要比较的range,作为当前节点
     * @param {Object} secondRange 第二个要比较的range,作为比较节点
     * @param {Integer} how 如何比较,分为4种,默认为c情况：<br>
     * 							a.Range.START_TO_START - 比较两个 Range 节点的开始点<br>
     * 							b.Range.END_TO_END - 比较两个 Range 节点的结束点<br>
     * 							c.Range.START_TO_END - 用 secondRange 的开始点与firstRange的结束点比较<br>
     * 							d.Range.END_TO_START - 用 secondRange 的结束点与firstRange的开始点比较<br>
     * @return {Integer} -1,0,1分别表示第一个range在第二个range之前返回-1，相等，返回0，在之后，返回1
     */
    ns.compareBoundaryPoints = function(firstRange, secondRange, how){
        if (!firstRange) {
            return -1;
        }
        if (!secondRange) {
            return 1;
        }
        how = how || Range.START_TO_END;
        return firstRange.compareBoundaryPoints(how, secondRange);
    };
    
    /**
     * 使样式生效,用于添加节点或者添加样式:<br>
     * <ol>
     * 	<li>
     * 		当range闭合时，光标正好也是要添加的节点时，只会直接应用样式。
     * 		否则会创建要添加的节点，而后插入一个0宽度的空格字符(&amp;#x200b;)，这样可以后输入内容时，样式生效。
     *  </li>
     *  <li>
     *  	当range选取了内容后，会在选区的头部和尾部做标记，把range内的块标签拆散*。并使用深度优先算法遍历range内的节点，逐一的遍历，并添加上样式或者节点。
     *  </li>
     * </ol>
     * *块标签拆散：<br>
     * 自己是非块级元素，父元素也是非块级元素,那么就得把它拆开。这是防止出现非块级元素包裹非块级元素的情况(如:&lt;span&gt;&lt;div&gt;test&lt;/div&gt;&lt;/span&gt;)。<br>
     * @function
     * @name SinaEditor.range.applyStyle
     * @param {Object} editor 要应用样式的编辑器
     * @param {Object} styleConf 样式的配置，以下为需要的参数：<br>
     * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>String</td><td>useTagName</td><td>用来包裹的节点，默认为<span style="color:red">span</span></td></tr>
	 *  <tr><td>String</td><td>style</td><td>要添加的样式名称</td></tr>
	 *  <tr><td>String</td><td>value</td><td>对应的样式值</td></tr>
	 * </table>
     */
    ns.applyStyle = function(editor, styleConf){
        styleConf.useTagName = styleConf.useTagName || 'span';
        var range = ns.getCurrentRanges(editor.entyWin)[0];

		try {
			editor.entyDoc.normalize();
		} catch(e){}

		if (range.collapsed) {
			var elm = null;
			var startContainer = range.startContainer;
			//注意，最后那个不是空字符串。是一个0宽度的空格
			if (startContainer.nodeType === SinaEditor.NODETYPE.ELEMENT //&& startContainer.tagName.toUpperCase() === styleConf['useTagName'].toUpperCase() 
			&&
			startContainer.tagName.toUpperCase() === styleConf.useTagName.toUpperCase() &&
			startContainer.innerHTML === '​') {
				//重复的选取
				elm = startContainer;
			}
			else {
				//elm = domUtil.createDom(styleConf['useTagName'], {
				elm = domUtil.createDom(styleConf.useTagName, {
					'ownerDocument': editor.entyDoc
				});
				elm.innerHTML = '&#x200b;';
				range.insertNode(elm);
			}
			
			//if (styleConf['style']) {
			if (styleConf.style) {
				//elm.style[styleConf['style']] = styleConf['value'];
				elm.style[styleConf.style] = styleConf.value;
			}
			range.selectNodeContents(elm);
			range.collapse(false);
			ns.applyRanges(editor.entyWin, range);
			editor.focus();
			return;
		}

		var marks = _createBookmark(editor, {
            'range': range
        });
		
		//拆分块状元素，判断放在了函数里
        if(marks.end){
			marks.end = _breakParent.call(editor, marks.end);
		}
        marks.start = _breakParent.call(editor, marks.start);
		
        //if (range.toString()) {
            //在多行情况下，firefox有可能会选上结尾的br节点
            _getNextNode(marks.start, marks.end, function(currEle){
                if (currEle.nodeType == 3 && currEle.data) {
                    currEle = _handleTextSelected(editor, currEle, {
						'useTagName': styleConf.useTagName.toUpperCase(),
                        'style': styleConf.style,
                        'value': styleConf.value
//                        'useTagName': styleConf['useTagName'].toUpperCase(),
//                        'style': styleConf['style'],
//                        'value': styleConf['value']
                    });
                }
                else 
                    if (currEle.nodeType == 1 && (currEle.textContent || currEle.innerText)) {
                        if (!SinaEditor.RANGE.SKIPTAGS[currEle.tagName.toUpperCase()]) {
                            currEle = _handleElementSelected(editor, currEle, {
								'useTagName': styleConf.useTagName.toUpperCase(),
                                'style': styleConf.style,
                                'value': styleConf.value
//                                'useTagName': styleConf['useTagName'].toUpperCase(),
//                                'style': styleConf['style'],
//                                'value': styleConf['value']
                            });
                        }
                    }
            });
        //}
		
		if (marks.end) {
            range.setEndBefore(marks.end);
            marks.end.parentNode.removeChild(marks.end);
        }
        
        range.setStartAfter(marks.start);
        marks.start.parentNode.removeChild(marks.start);
        
        ns.applyRanges(editor.entyWin, range);
		editor.focus();
    };
	
	/**
	 * 查询当前的选取内容编辑状态，可通过{@link SinaEditor.range.regQueryCommandState}来注册自定义的状态查询。
	 * @function
     * @name SinaEditor.range.queryCommandState
	 * @param {Object} doc 要查询状态的 document对象
	 * @param {String} queryStr 要查询的状态，可以参见<a href="http://msdn.microsoft.com/en-us/library/ms533049(v=vs.85).aspx" target="_blank">这里</a>
	 * @return {Boolean} 是否应用于此状态
	 */
	ns.queryCommandState = function(doc,queryStr) {
		if(!queryStr) {
			return false;
		}
		
		queryStr = queryStr.toLowerCase();
		
		if(_queryStateArr[queryStr]) {
			return _queryStateArr[queryStr](ns.getReferNode(doc.defaultView || doc.parentWindow));
		}
		
		return doc.queryCommandState(queryStr);
	};
	
	/**
	 * 注册自定义的查询编辑状态，通过此方法注册后，可以通过{@link SinaEditor.range.regQueryCommandState}来判断当前range的编辑状态。
	 * @function
     * @name SinaEditor.range.regQueryCommandState
	 * @param {String} queryStr 自定义的编辑状态
	 * @param {Function} callback 当执行{@link SinaEditor.range.regQueryCommandState}时的查询回调，会传递参照node进入函数，需要返回boolean类型的值来确定状态是否被应用。
	 */
	ns.regQueryCommandState = function(queryStr,callback) {
		
		queryStr = queryStr.toLowerCase();
		
		if(_queryStateArr[queryStr]) {
			return;
		}
		
		_queryStateArr[queryStr] = callback;
	};
    
    /**
     * 使样式失效,用于移除标签或者删除式:
     * <ol>
     * 	<li>
     * 		当range闭合时，不做任何操作。
     *  </li>
     *  <li>
     *  	当range选取了内容后，会在选区的头部和尾部做标记。使用深度优先算法遍历range内的节点，逐一的遍历，删除样式或者节点。
     *  </li>
     * </ol>
     * @function
     * @name SinaEditor.range.removeStyle
     * @param {Object} editor 要执行的编辑器对象
     * @param {Object} styleConf 样式的配置，以下为需要的参数：<br>
     * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>String</td><td>useTagName</td><td>要删除的节点或者此节点的样式，默认为<span style="color:red">span</span></td></tr>
	 *  <tr><td>String|Array</td><td>style</td><td>要删除的样式名称或者名称列表。若无此值传递，则会删除该节点。</td></tr>
	 * </table>
     * @param {Boolean} noBreak 是否拆分块状元素，默认为不拆分。
     */
    ns.removeStyle = function(editor, styleConf,noBreak){
        styleConf.useTagName = styleConf.useTagName || 'span';
		var refTags = {};
		if(typeof styleConf.useTagName === 'string') {
			refTags[styleConf.useTagName.toUpperCase()] = '1';
		} else {
			var i;
			for(i=0; styleConf.useTagName[i]; i++) {
				refTags[styleConf.useTagName[i].toUpperCase()] = '1';
			}
		}
        var range = ns.getCurrentRanges(editor.entyWin)[0];
        
        //此方法仅针对于有选区的情况，没有选区就不做任何处理了
        if (range.collapsed) {
			editor.focus();
            return;
        }
        var marks = _createBookmark(editor, {
            'range': range
        });
        
        //if (range.toString()) {
			try {
				editor.entyDoc.normalize();
			} catch(e){}
			
			if(!noBreak) {
				//拆分块状元素，判断放在了函数里
                marks.end = _breakParent.call(editor, marks.end);
                marks.start = _breakParent.call(editor, marks.start);
			}
            
            _getNextNode(marks.start, marks.end, function(currEle){
                //如果是对应的节点
                if (currEle.nodeType === SinaEditor.NODETYPE.ELEMENT 
						&& refTags[currEle.tagName.toUpperCase()]) {
                    if(styleConf.style) {
						var len = SinaEditor.util.dom.removeStyle(currEle,styleConf.style);
						//没有样式，这个节点也可以去掉了
						if(len === 0) {
							domUtil.removeTag(currEle);
						}
					} else {
						domUtil.removeTag(currEle);
					}
                }
            });
			
            if (marks.end) {
                range.setEndBefore(marks.end);
                marks.end.parentNode.removeChild(marks.end);
            }
            
            range.setStartAfter(marks.start);
            marks.start.parentNode.removeChild(marks.start);
            
            ns.applyRanges(editor.entyWin, range);
			
			editor.focus();
        //}
    };
    
    /**
     * 深度优先遍历节点
     * @param {Object} begin 起始节点，肯定是BOOKMARK的起始点
     * @param {Object} end 结束节点，BOOKMARK的结束点
     * @param {Function} func 回调函数
     */
    var _getNextNode = function(begin, end, callBack){
        var current = __getNextElement(begin, true);
		//debugger;
        while (current && current != end) {
            //保留第一个元素，当它被摧毁时(如删除这个标签)，可以依然找到下一个节点
            var handleEle = current;
            current = __getNextElement(current);
			if(handleEle.nodeType === SinaEditor.NODETYPE.TEXT || (handleEle.nodeType === SinaEditor.NODETYPE.ELEMENT && !SinaEditor.util.dom.containsNode(handleEle,end))) {
				callBack(handleEle);
			}
        }
    };
    
    /**
     * 获得下一个可用的节点
     * 1.有子节点。返回第一个子节点。
     * 2.无子节点：
     * 	a.有下一个兄弟节点。返回下一个兄弟节点。
     * 	b.无下一个兄弟节点。向上到父节点，再进行判断。
     * @param {Object} elm 当前节点
     * @return {Element} 下一个可用的节点，出现问题直接抛出异常
     */
    var __getNextElement = function(elm, skipChildren){
        //首先检测是不是有子节点
        if (elm.hasChildNodes() && !skipChildren) {
            var firstEl = elm.firstChild;
            if (firstEl) {
                return firstEl;
            }
        }
        //查找兄弟节点
        var nextEl = elm.nextSibling;
        while (!nextEl) {
            nextEl = elm.parentNode;
            //父节点肯定有tagName
			if (nextEl.tagName.toUpperCase() == 'HTML') {
                //到达了最高级
                throw '确定在遍历节点时有结束标记的节点?';
            }
            //鸡肋
            elm = nextEl;
            nextEl = elm.nextSibling;
        }
        return nextEl;
    };
    
    /**
     * 创建一个包裹(自身不在内的)range的标记
     * @param {Object} opts
     * @return {Object} start : 开始位置 end : 结束位置
     */
    var _createBookmark = function(editor, opts){
        opts = opts || {};
        var spanHead,
			spanEnd,
			clone;
        spanHead = domUtil.createDom('span', {
            'ownerDocument': editor.entyDoc,
            properties: {
				'id':'start',
                'innerHTML': '&nbsp;'
				//调试的时候开启
				//'innerHTML': '开始'
            },
            attributies: {
                '_se_mark': 1
            }
        });
        //spanHead.style.display = 'none';
		spanHead.style.color = '#FF0000';
        
        opts.range = opts.range || _createRange(editor);
    
        //有选中
        spanEnd = domUtil.createDom('span', {
            'ownerDocument': editor.entyDoc,
            properties: {
				'id':'end',
                'innerHTML': '&nbsp;'
				//调试的时候开启
				//'innerHTML': '结束'
            },
            attributies: {
                '_se_mark': 2
            }
        });
        //spanEnd.style.display = 'none';
		spanEnd.style.color = '#FF0000';
		
		if(!opts.range._document) {
			clone = opts.range.cloneRange();
            clone.collapse(false);
			clone.insertNode(spanEnd);
			clone = opts.range.cloneRange();
	        clone.collapse(true);
	        clone.insertNode(spanHead);
		} else {
			//去掉节点后会选不对
			var start = opts.range.startContainer,
				startN = opts.range.startOffset,
				end = opts.range.endContainer,
				endN = opts.range.endOffset,
				refA = opts.range.__getRefA(),
				refEnd = end.nodeType === SinaEditor.NODETYPE.ELEMENT ? end.childNodes[endN] : null,
				refStart = start.nodeType === SinaEditor.NODETYPE.ELEMENT ? start.childNodes[startN] : null,prev;

			clone = opts.range.cloneRange();
            clone.collapse(false);
            clone.insertNode(spanEnd);
			
			//end要做一次修正，有可能出现：
			//<ul><li></li><span id="end"></span></ul>的情况。
			prev = spanEnd.previousSibling;
			
			if(prev && prev.tagName && 'LI OL'.indexOf(prev.tagName.toUpperCase() != -1)) {
				prev.appendChild(spanEnd);
			}
				
			if(refStart) {
				//DOM节点
				start.insertBefore(spanHead,refStart);
			} else {
				//文本节点
				clone = opts.range.cloneRange();
		        clone.collapse(true);
		        clone.insertNode(spanHead);
			}
		}
    
        opts.range.setStartAfter(spanHead);
        opts.range.setEndBefore(spanEnd);
        
        ns.applyRanges(editor.entyWin, opts.range);
        
        return {
            start: spanHead,
            end: spanEnd
        };
    };
    
    /**
     * 自己是非块级元素，父元素也是非块级元素,那么就得把它拆开,修改自：
     * CKEDITOR.dom.element.breakParent方法.
     * @param {Object} child 子节点,以它作为标杆，一般是标签节点
     * @return {Boolean} 是否进行了移除操作.
     */
    var _breakParent = function(child){
    
        var parent = domUtil.getBlockParent(child);
        if (!parent) {
            //父元素就是块状元素，没有必要拆分
            return child;
        }
        
        var range = _createRange(this);
		if(range._range) {
			//extractContents会严重导致startContainer或者endContainer丢失，但又不能及时更新通知
			//非常讨厌的textRange,当没有节点包裹时，标签节点也不会被包围住。所以得再套上一层。
			//bug:<strong>ab|cde|fg</strong> -> 去加粗操作，失败。
			//debugger;
			var doc = parent.document,
				rRange = range._range,
				pPar = parent.parentNode,
				cPar = child.parentNode,
				sRef = range.__getRefA(),
				sRef2 = range.__getRefA(),
				eRef = range.__getRefA(),
				eRef2 = range.__getRefA(),
				refNode = range.__getRefA(),
				dupMove = rRange.duplicate(),
				dupRef = rRange.duplicate(),
				frage = parent.document.createDocumentFragment(),
				tmp = doc.createElement('div'),refID;
				
			sRef.id = 'refStart';
			eRef.id = 'refEnd';
			refNode.id = 'refNode';

			if(child.id === 'start') {
				//开始部分
				pPar.insertBefore(sRef,parent);
				cPar.insertBefore(eRef,child);
				refID = 'start';
				
				sRef.parentNode.insertBefore(sRef2,sRef);
				range.__insertAfter(eRef2,eRef);
				
				sRef2.parentNode.insertBefore(refNode,sRef2);
			} else {
				//结束部分
				range.__insertAfter(sRef,child,cPar);
				range.__insertAfter(eRef,parent,pPar);
				refID = 'end';
				
				sRef.parentNode.insertBefore(sRef2,sRef);
				range.__insertAfter(eRef2,eRef);
				
				range.__insertAfter(refNode,eRef2);
			}
			
			dupRef.moveToElementText(sRef2);
			dupMove.moveToElementText(sRef2);
			dupRef.setEndPoint('StartToEnd',dupMove);
			dupMove.moveToElementText(eRef2);
			dupRef.setEndPoint('EndToStart',dupMove);
			
			sRef.parentNode.removeChild(sRef2);
			eRef.parentNode.removeChild(eRef2);
			
			tmp.innerHTML = dupRef.htmlText;
			frage.appendChild(tmp);
			while(tmp.childNodes[0]) {
				frage.appendChild(tmp.childNodes[0]);
			}
			frage.removeChild(tmp);
			dupRef.pasteHTML('');
			refNode.parentNode.insertBefore(frage,refNode);
			refNode.parentNode.removeChild(refNode);
			
			sRef = doc.getElementById('refStart');
			sRef.parentNode.removeChild(sRef);
			eRef = doc.getElementById('refEnd');
			eRef.parentNode.removeChild(eRef);
			
			if (refID === 'start') {
				//开始部分
				pPar.insertBefore(child,child.parentNode);
			} else {
				//结束部分
				range.__insertAfter(child,child.parentNode);
			}
			
			//修复Container和Offset
			range._refreshAll();
			
			return doc.getElementById(refID);
		}
        // We'll be extracting part of this element, so let's use our
        // range to get the correct piece.
        range.setStartAfter(child);
        range.setEndAfter(parent);
        // Extract it.
        var docFrag = range.extractContents();
        // Move the element outside the broken element.
        range.insertNode(domUtil.delElement(child));
        // Re-insert the extracted piece after the element.
        domUtil.insertAfter(docFrag, child);
		
		return child;
    };
    
    /**
     * 应用样式时调用，当遍历到textnode时执行的回调。
     * @param {Object} editor 对应的编辑器
     * @param {Object} element 遍历到的节点对象。是textnode
     * @param {Object} conf 配置信息可以参阅{@link SinaEditor.range.applyStyle}的styleConf参数
     */
    function _handleTextSelected(editor, element, conf){
        //var range = _createRange(editor);
        //var span = domUtil.createDom(conf['useTagName'], {
		var span = domUtil.createDom(conf.useTagName, {
            'ownerDocument': editor.entyDoc
        });
        //if (conf['style']) {
		if (conf.style) {
            //span.style[conf['style']] = conf['value'];
			span.style[conf.style] = conf.value;
        }
        var parent = element.parentNode;
        
        //if (parent.tagName.toUpperCase() == conf['useTagName']) {
		if (parent.tagName.toUpperCase() === conf.useTagName) {
            console.log("它的父节点是span!");
            if (SinaEditor.util.trim(parent.textContent || parent.innerText) != SinaEditor.util.trim(element.data)) {
                //range.selectNode(element);
                //range.surroundContents(span);
				element.parentNode.insertBefore(span,element);
				span.appendChild(element);
                return span;
            }
            //if (conf['style']) {
			if (conf.style) {
                //parent.style[conf['style']] = conf['value'];
				parent.style[conf.style] = conf.value;
            }
            return parent;
        }
        if (parent.tagName.toUpperCase() == 'BODY') {
            console.log("它的父节点是Body!");
            //range.selectNode(element);
            //range.surroundContents(span);
			element.parentNode.insertBefore(span,element);
			span.appendChild(element);
            return span;
        }
        else {
            //如果不是span，需要确认是什么标签,块级标签和非块级的就得分开进行
            if (SinaEditor.RANGE.BLOCKTAGS[element.parentNode.tagName.toUpperCase()]) {
                console.log("是块状标签");
                //块状，把span套在里面
                //range.selectNode(element);
	            //range.surroundContents(span);
				element.parentNode.insertBefore(span,element);
				span.appendChild(element);
                return span;
            }
            else {
                console.log("非块状标签");
                var pParent = parent.parentNode;
                //父节点是否是span
                //if (pParent && pParent.nodeType == 1 && pParent.tagName.toUpperCase() == conf['useTagName']) {
				if (pParent && pParent.nodeType === SinaEditor.NODETYPE.ELEMENT 
					&& pParent.tagName.toUpperCase() == conf.useTagName) {
                    console.log("它的父节点的父节点是span");
                    if (SinaEditor.util.trim(parent.textContent || parent.innerText) == SinaEditor.util.trim(element.data)) {
                        //if (conf['style']) {
						if (conf.style) {
                            //pParent.style[conf['style']] = conf['value'];
							pParent.style[conf.style] = conf.value;
                        }
                        return pParent;
                    }
                    else {
                        //range.selectNode(element);
			            //range.surroundContents(span);
						element.parentNode.insertBefore(span,element);
						span.appendChild(element);
                        return span;
                    }
                }
                else {
                    console.log("它的父节点的父节点不是span，是:");
                    console.log(pParent);
					element.parentNode.insertBefore(span,element);
                    if (SinaEditor.util.trim(parent.textContent || parent.innerText) == SinaEditor.util.trim(element.data)) {
                        //全部选中
                        //range.selectNode(parent);
						parent.parentNode.insertBefore(span,parent);
						span.appendChild(parent);
                    }
                    else {
                        //部分选中
                        //range.selectNode(element);
						element.parentNode.insertBefore(span,element);
						span.appendChild(element);
                    }
                    //range.surroundContents(span);
                    return span;
                }
            }
        }
    }
    
    /**
     * 应用样式时调用，当遍历到DOM时执行的回调。
     * @param {Object} editor 对应的编辑器
     * @param {Object} element 遍历到的节点对象。是DOM
     * @param {Object} conf 配置信息可以参阅{@link SinaEditor.range.applyStyle}的styleConf参数
     */
    function _handleElementSelected(editor, element, conf){
        //是一个DOM节点,可能还有DOM节点在里面!小心
        console.log('是一个DOM节点');
        console.log(element);
        if (SinaEditor.RANGE.SKIPTAGS[element.tagName.toUpperCase()]) {
            return element;
        }
        var retEle = element;
        var range = _createRange(editor);
        //var span = domUtil.createDom(conf['useTagName'], {
		var span = domUtil.createDom(conf.useTagName, {
            'ownerDocument': editor.entyDoc
        });
        //if (conf['style']) {
		if (conf.style) {
            //span.style[conf['style']] = conf['value'];
			span.style[conf.style] = conf.value;
        }
        var eles = domUtil.getChildren(element, {
            'all': true,
            'onlyElement': true
        });
        //暂时先关闭
        //            for (var i = 0; eles[i]; i++) {
        //                this.clearStyle(eles[i], 'font-size');
        //            }

        //if (element.tagName.toUpperCase() == 'SPAN') {
		if (element.tagName.toUpperCase() === conf.useTagName) {
            console.log("是span");
            var arr = domUtil.getChildren(element, {
                'all': true,
                'onlyElement': true
            });
            var num = 0;
            while (arr[num]) {
                //if (arr[num].tagName.toUpperCase() == conf['useTagName'] && !arr[num].style.cssText) {
				if (arr[num].tagName.toUpperCase() === conf.useTagName 
						&& !arr[num].style.cssText) {
                    var tmpRange = _createRange(editor);
                    tmpRange.selectNode(arr[num]);
                    var txtNode = editor.entyDoc.createTextNode(tmpRange.extractContents().textContent);
                    tmpRange.insertNode(txtNode);
                    tmpRange.detach();
                }
                num++;
            }
            //if (conf['style']) {
			if (conf.style) {
                //element.style[conf['style']] = conf['value'];
				element.style[conf.style] = conf.value;
            }
        }
        else {
            //是块状标签?
            if (SinaEditor.RANGE.BLOCKTAGS[element.tagName.toUpperCase()]) {
                console.log("是块状标签");
                //只有一个子节点?
                var children = element.childNodes;
                //if (children.length == 1 && children[0].nodeType == 1 && children[0].tagName.toUpperCase() == conf['useTagName']) {
				if (children.length === 1 && children[0].nodeType == SinaEditor.NODETYPE.ELEMENT 
					&& children[0].tagName.toUpperCase() == conf.useTagName) {
                    console.log("只有一个子节点,且为span");
                    //if (conf['style']) {
					if (conf.style) {
                        //children[0].style[conf['style']] = conf['value'];
						children[0].style[conf.style] = conf.value;
                    }
                }
                else {
                    console.log("无子节点或子节点不是span标签");
					element.insertBefore(span,children[0]);
					while(children[1]) {
						span.appendChild(children[1]);
					}
					retEle = span;
                }
            }
            else {
                console.log("非块状标签");
                //有无父节点
                var parent = element.parentNode;
                //if (parent && parent.tagName.toUpperCase() == conf['useTagName']) {
				if (parent && parent.tagName.toUpperCase() == conf.useTagName) {
                    console.log("有父节点且是span");
                    //if (conf['style']) {
					if (conf.style) {
                        //parent.style[conf['style']] = conf['value'];
						parent.style[conf.style] = conf.value;
                    }
                    retEle = parent;
                }
                else {
                    console.log("无父节点或不是span标签");
					parent.insertBefore(span,element);
					span.appendChild(element);
                    retEle = span;
                }
            }
        }
        return retEle;
    }
});
