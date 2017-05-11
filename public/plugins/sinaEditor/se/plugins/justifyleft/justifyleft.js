
//居左
SinaEditor.plugins.add('justifyleft',function(args){
	var editor = this;
	
	if(!args.customerBtn) {
		editor.callPlugin({
			'name' : 'justifyleftBtn',
			'args' : args
		});
	}
	
	/**
	 * 添加项目符号
	 */
	editor.operation.justifyleft = function(){
        editor.operation.save(editor);
		
		editor.entyDoc.execCommand("Justifyleft",'','');
		
        editor.operation.save(editor);
    };
});