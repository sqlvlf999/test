
//增加缩进
SinaEditor.plugins.add('indent',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'indentBtn',
			'args' : args
		});
	}
	
	/**
	 * #BLOGBUG-12323 在表格内使用此方法，使用并取消，在webkit下会在table的顶上生成一个br标签。
	 * #BLOGBUG-12324 在webkit下输入一行文字，全选(非全选不存在此缺陷)，设置背景色，再使用此方法，颜色丢失，span标签丢失。
	 * 增加缩进
	 */
	editor.operation.indent = function(){
		editor.focus();
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("indent",false,'');
		
        editor.operation.save(editor);
		editor.focus();
    };
});