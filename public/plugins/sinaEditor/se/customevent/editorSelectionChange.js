
/**
 * 选区改变事件的监听。
 * 当光标位置改变以后，如果400毫秒以后光标没有发生变化，则以此选区和当前选区进行比较，不一样，则触发editorSelectionChange事件。
 * @name editorSelectionChange
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.editorSelectionChange = function(editor){
	var _listener = function(e){
		SinaEditor.ev.stopEvent(e);
	    editor.entyWin.clearTimeout(editor._.editorHasSelectionBufferTimmer);
	    editor._.editorHasSelectionBufferTimmer = editor.entyWin.setTimeout(function(){
            //虽然可以多选，但是只检测第一个
            var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
            var current0 = ranges[0];
            var old0;
            
            if (!editor._.oldRange) {
				console.log('两个range不相等');
                _handleEvent.call(editor, e, current0);
            }
            else {
                old0 = editor._.oldRange[0];
                if (current0 || old0) {
                    if (SinaEditor.range.compareBoundaryPoints(current0, old0) !== 0) {
						console.log('两个range不相等');
                        _handleEvent.call(editor, e, current0);
                    }
                }
            }
            editor._.oldRange = ranges;
        }, 400);
		return false;
    };
    
    var _handleEvent = function(e, range){
        e = SinaEditor.ev.fixEvent(e);
        SinaEditor.ev.fire(editor, 'editorSelectionChange', {
            'args': [range, SinaEditor.range.getReferNode(this.entyWin, range)]
        });
    };

    return [{
        'enty': editor.entyDoc,
        'events': {
            'mouseup': _listener,
            'keyup': _listener
        }
    }];
};
