
/**
 * 键盘ctrl+z的监听，监听在keydown上,可通过SinaEditor.ev.add(editor, "ctrlz", callback)来绑定。
 * 自定义的事件即可使用这样的格式绑定。
 * @name ctrlz
 * @event
 * @param {Object} editor 当前监听的编辑器的对象引用。
 */
SinaEditor.ev.customEvent.ctrlz = function(editor) {
	return [{
	    'enty' : editor.entyDoc,
		'events' : {
			'keydown': function(e){
				if(e.ctrlKey && e.keyCode == 90) {
					SinaEditor.ev.stopEvent(e);
					SinaEditor.ev.fire(editor, 'ctrlz');
				}
		    }
		}
	}];
};