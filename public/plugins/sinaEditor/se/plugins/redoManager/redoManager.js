

SinaEditor.plugins.add('redoManager', function(args){
    var editor = this;
    
    SinaEditor.redoManager.addEditor(editor);
    
    editor._.doManagerBuffer = 500;
    
	/**
	 * 重做刚才撤销的操作。
	 * @param {Object} e
	 */
    editor.operation.redo = function(e){
        SinaEditor.redoManager.redo(editor);
    };
	/**
	 * 撤销刚才的操作
	 * @param {Object} e
	 */
    editor.operation.undo = function(e){
        SinaEditor.redoManager.undo(editor);
    };
	/**
	 * 记录刚才的操作
	 * @param {Object} e
	 */
    editor.operation.save = function(e){
        SinaEditor.redoManager.save(editor);
    };
	/**
	 * 清理所有的历史记录信息。
	 * @param {Object} e
	 */
    editor.operation.clearRU = function(e){
        SinaEditor.redoManager.addEditor(editor);
    };
	
	if(!args.customerBtnU) {
		editor.callPlugin({
			'name' : 'undoBtn',
			'args' : args
		});
	}
	
	if(!args.customerBtnR) {
		editor.callPlugin({
			'name' : 'redoBtn',
			'args' : args
		});
	}
    
    return {
        "events": [{
            "element": editor,
            "events": {
                'ctrly': function(e){
                    SinaEditor.redoManager.redo(editor);
                },
                'ctrlz': function(e){
                    SinaEditor.redoManager.undo(editor);
                }
            }
        }, {
            "element": editor.entyDoc,
            "events": {
                'keydown': function(e){
                    setTimeout(function(){
                        editor.entyWin.clearTimeout(editor._.doManagerBufferTimmer);
                        editor._.doManagerBufferTimmer = editor.entyWin.setTimeout(function(){
                            console.log("空闲" + editor._.doManagerBuffer + "毫秒就保存");
                            SinaEditor.redoManager.save(editor);
                        }, editor._.doManagerBuffer);
                    }, 0);
                }
            }
        }]
    };
});
