
//用于斜体字
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('italic',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'italicBtn',
			'args' : args
		});
	}
	
	var btn = editor.btns.italic;
	
	/**
	 * 斜体，isAdd可能是参照节点，也可能是一个boolean值
	 * @param {Object} isAdd
	 */
	editor.operation.italic = function(){
		var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
		//TODO 和IE统一，暂时只支持第一个选区
		ranges = ranges[0];
		if(!ranges) {
			return;
		}
		var text = ranges.toString();
        editor.operation.save(editor);
		
		//var isItalic = editor.operateState['italic'];
		var isItalic = editor.operateState.italic;
		
		if(isItalic) {
			console.log('执行去斜体操作');
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': ['i','em']
	        });
			//#BLOGBUG-12284 safari 4.0竟然会在操作对齐时把它转化成样式的形式。
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': 'span',
				'style': 'fontStyle'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
		} else {
			console.log('执行斜体操作');
			SinaEditor.range.applyStyle(editor, {
	            'useTagName': 'em'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
		}
        
		//editor.operateState['italic'] = !isItalic;
		editor.operateState.italic = !isItalic;
        editor.operation.save(editor);
    };
	
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var isItalic = SinaEditor.range.queryCommandState(this.entyDoc,'italic');
					
					if(isItalic) {
						btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					}
					
					//this.operateState['italic'] = isItalic;
					this.operateState.italic = isItalic;
				}
				,'ctrli' : function() {
					editor.operation.italic(this);
				}
            }
        }]
    };
});