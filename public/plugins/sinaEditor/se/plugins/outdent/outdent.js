
//减少缩进
SinaEditor.plugins.add('outdent',function(args){
	var editor = this;
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'outdentBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.outdent = function(){
		editor.focus();
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("outdent",'','');
		
        editor.operation.save(editor);
		editor.focus();
    };
});