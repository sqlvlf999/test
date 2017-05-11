
/**
 * 键盘ctrl+i的监听，监听在keydown上,可通过SinaEditor.ev.add(editor, "ctrli", callback)来绑定。
 * 自定义的事件即可使用这样的格式绑定。
 * @name ctrli
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.ctrli = function(editor) {
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'keydown': function(e){
				if(e.ctrlKey && e.keyCode == 73) {
					SinaEditor.ev.stopEvent(e);
					SinaEditor.ev.fire(editor, 'ctrli');
				}
		    }
		}
	}];
};