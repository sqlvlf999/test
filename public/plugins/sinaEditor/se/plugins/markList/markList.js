
//项目符号
//添加ul标签
SinaEditor.plugins.add('markList',function(args){
	var editor = this;
	var btn = null;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'markListBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.markList = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("insertunorderedlist",'','');
		editor.focus();
		
        editor.operation.save(editor);
    };
});