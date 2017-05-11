
//用于加粗
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('underline',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'underlineBtn',
			'args' : args
		});
	}
	
	var btn = editor.btns.underline;
	
	/**
	 * 加粗，isAdd可能是参照节点，也可能是一个boolean值
	 * @param {Object} isAdd
	 */
	editor.operation.underline = function(refNode){
		
		var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
		//TODO 和IE统一，暂时只支持第一个选区
		ranges = ranges[0];
		if(!ranges) {
			return;
		}
        editor.operation.save(editor);
		
		//var isUnderline = editor.operateState['underline'];
		var isUnderline = editor.operateState.underline;
		
		if(isUnderline) {
			console.log('执行去下划线操作');
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': 'span',
	            'style': 'textDecoration'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
		} else {
			console.log('执行加下划线操作');
			SinaEditor.range.applyStyle(editor, {
	            'useTagName': 'span',
	            'style': 'textDecoration',
	            'value': 'underline'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
		}
        
		//editor.operateState['underline'] = !isUnderline;
		editor.operateState.underline = !isUnderline;
        editor.operation.save(editor);
    };
	
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var isUnderline = SinaEditor.range.queryCommandState(this.entyDoc,'underline');
					
					if(isUnderline) {
						btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					}
					
					//this.operateState['underline'] = isUnderline;
					this.operateState.underline = isUnderline;
				}
				,'ctrlu' : function() {
					editor.operation.isUnderline(this);
				}
            }
        }]
    };
});