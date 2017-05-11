
//文字颜色的获取
//在span里加color来实现这一目的
SinaEditor.plugins.add('forecolor',function(args){
	var editor = this;
	
	if (!args.customerPanel) {
       editor.callPlugin({
			'name' : 'forecolorPanel',
			'args' : args
		});
    }
	
	if (!args.customerBtn) {
       editor.callPlugin({
			'name' : 'forecolorBtn',
			'args' : args
		});
    }
	
	var btn = editor.btns.forecolor;
	var panel = editor.panels.forecolor;
	
	//注册查询的状态
	SinaEditor.range.regQueryCommandState('forecolor',function(refNode){
		console.log(SinaEditor.util.dom.getStyle(refNode, 'color') || '#CCC');
		return SinaEditor.util.dom.getStyle(refNode, 'color');
	});
	
	/**
	 * 文字颜色修改
	 * @param {String} color 要修改的文字颜色。
	 */
	editor.operation.forecolor = function(color){
		editor.focus();

        editor.operation.save(editor);
		
		console.log('文字颜色修改');
		SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
			'style': 'color',
	        'value': color
        });
		btn.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
        
        editor.operation.save(editor);
    };
});