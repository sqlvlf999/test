
//减少缩进
SinaEditor.plugins.add('justifyright',function(args){
	var editor = this;
	var btn = null;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'justifyrightBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.justifyright = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("justifyright",'','');
		
        editor.operation.save(editor);
    };
});