
//居中
SinaEditor.plugins.add('justifycenter',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'justifycenterBtn',
			'args' : args
		});
	}
	
	/**
	 * #BLOGBUG-12277 在对多行文字进行对齐操作时，某行设置以后，再修改，这一行的span标签会被删去。
	 * 添加项目符号
	 */
	editor.operation.justifycenter = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("Justifycenter",'','');
		
        editor.operation.save(editor);
    };
});