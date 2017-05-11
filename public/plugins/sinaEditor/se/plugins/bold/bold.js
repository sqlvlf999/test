
//用于加粗
//通过添加strong标签和移除strong标签来达到
SinaEditor.plugins.add('bold',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'boldBtn',
			'args' : args
		});
	}
	
	var btn = editor.btns.bold;
	
	/**
	 * 加粗，isAdd可能是参照节点，也可能是一个boolean值
	 * @param {element} refNode 参照节点，决定是否加粗。
	 */
	editor.operation.bold = function(refNode){
		var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
		//TODO 和IE统一，暂时只支持第一个选区
		ranges = ranges[0];
		if(!ranges) {
			return;
		}
        editor.operation.save(editor);
		
		//var isBold = editor.operateState['bold'];
		var isBold = editor.operateState.bold;
		
		if(isBold) {
			console.log('执行去加粗操作');
			SinaEditor.range.removeStyle(editor, {
	            'useTagName': ['strong','b','span'],
				'style' : 'fontWeight'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
		} else {
			console.log('执行加粗操作');
			SinaEditor.range.applyStyle(editor, {
	            'useTagName': 'strong'
	        });
			btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
		}
        
		//editor.operateState['bold'] = !isBold;
		editor.operateState.bold = !isBold;
        editor.operation.save(editor);
    };
	
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(e,range,refNode) {
					var isBold = SinaEditor.range.queryCommandState(this.entyDoc,'bold');
					
					if(isBold) {
						btn.setState(SinaEditor.BUTTONSTATE.CLICKED);
					} else {
						btn.setState(SinaEditor.BUTTONSTATE.NORMAL);
					}
					
					//this.operateState['bold'] = isBold;
					this.operateState.bold = isBold;
				}
				,'ctrlb' : function() {
					editor.operation.bold(this);
				}
            }
        }]
    };
});