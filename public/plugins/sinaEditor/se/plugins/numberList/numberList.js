
//数字符号
//添加ol标签
SinaEditor.plugins.add('numberList',function(args){
	var editor = this;
	var btn = null;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'numberListBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.numberList = function(){
        editor.operation.save(editor);
		
		editor.focus();
		editor.entyDoc.execCommand("insertorderedlist",'','');
		
        editor.operation.save(editor);
    };
});