
/**
 * 是否出现了选区。
 * @name editorHasSelection
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.editorHasSelection = function(editor) {
	function doo() {
		editor.entyWin.clearTimeout(editor._.editorHasSelectionBufferTimmer);
        editor._.editorHasSelectionBufferTimmer = editor.entyWin.setTimeout(function(){
            console.log("空闲1秒检测");
            var ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
			var i;
			for(i=0; ranges[i]; i++) {
				if(!ranges[i].collapsed) {
					console.log('出现了选区');
					return;
				}
			}
			console.log('没有选区');
        }, 1000);
	}
	
	/*
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'mouseup' : doo,
			'keyup' : doo
		}
	}];
	*/
};