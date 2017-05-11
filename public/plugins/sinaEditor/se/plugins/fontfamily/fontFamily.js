
//字体选择
SinaEditor.plugins.add('fontFamily',function(args){
	var editor = this;
    var btn = null;
    if (!SinaEditor._fontConf) {
        SinaEditor._fontConf = {};
    }
    
    if (!args.customerBtn) {
        editor.callPlugin({
			'name' : 'fontFamilyBtn',
			'args' : args
		});
    }
	
	if (!args.customerPanel) {
        editor.callPlugin({
			'name' : 'fontFamilyPanel',
			'args' : args
		});
    }
    
	/**
	 * 设置字体
	 * @param {String} fontFamily 要设置的字体值
	 */
    editor.operation.setFontFamily = function(fontFamily){
        editor.operation.save(editor);
        
        //添加
        SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
            'style': 'fontFamily',
            'value': fontFamily
        });
        
        editor.operation.save(editor);
    };
});
