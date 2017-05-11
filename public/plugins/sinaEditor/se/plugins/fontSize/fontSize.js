
//字体的大小
SinaEditor.plugins.add('fontSize',function(args){
	var editor = this;

	//注册查询的状态
	SinaEditor.range.regQueryCommandState('fontsize',function(refNode){
		return SinaEditor.util.dom.getStyle(refNode, 'fontSize');
	});
    
    if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'fontSizeBtn',
			'args' : args
		});
    }
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'fontSizePanel',
			'args' : args
		});
    }
    var btn = editor.btns.fontSize;
	
	/**
	 * 设置字体大小
	 * @param {String} fontSize 要设置的字体大小
	 */
    editor.operation.setFontSize = function(fontSize){
		editor.focus();
		
        editor.operation.save(editor);
        
        //添加
        SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
            'style': 'fontSize',
            'value': fontSize
        });
        
        editor.operation.save(editor);
    };
});
