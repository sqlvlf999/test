
//添加内容
SinaEditor.plugins.add('addContent',function(args){
	var editor = this;
	
	/**
	 * 添加节点
	 * @param {Element} node 要添加的节点。
	 * @param {Booelan} focus 是否把焦点集中到新添的节点中
	 */
	editor.operation.addNode = function(node,focus){
		editor.focus();
		
		editor.operation.save(editor);
		var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
		if(!range.collapsed) {
			range.deleteContents();
		}
		var focNode = node;
		if(node.nodeType === 11) {
			focNode = node.lastChild;
		}
		range.insertNode(node);
		if(!focus) {
			_focusAfter(focNode,range);
		}
		editor.operation.save(editor);
	};
	
	/**
	 * 添加文本
	 * @param {String} str 要添加的字符串
	 * @param {Booelan} focus 是否把焦点集中到新添的字符串中
	 */
	editor.operation.addContent = function(str,focus){
		editor.focus();
		
		editor.operation.save(editor);
		var range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
		if(!range.collapsed) {
			range.deleteContents();
		}
		var textNode = editor.entyDoc.createTextNode(str);
		range.insertNode(textNode);
		if(!focus) {
			_focusAfter(textNode,range);
		}
		editor.operation.save(editor);
	};
	
	var _focusAfter = function(node,range) {
		range.selectNode(node);
		range.collapse(false);
		SinaEditor.range.applyRanges(editor.entyWin,range);
		editor.focus();
	};
});