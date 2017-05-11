
//背景颜色的获取逻辑
//在span里加color来实现这一目的
SinaEditor.plugins.add('backcolor',function(args){
	var editor = this;
	editor.btns.backcolor = null;
	editor.panels.backcolor = null;
	if(!args.customerPanel) {
		editor.callPlugin({
			'name' : 'backcolorPanel',
			'args' : args
		});
	}
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'backcolorBtn',
			'args' : args
		});
	}
	
	//注册查询的状态
	SinaEditor.range.regQueryCommandState('backcolor',function(refNode){
		return SinaEditor.util.dom.getStyle(refNode, 'backgroundColor');
	});
	
	/**
	 * 文字颜色修改
	 * #BLOGBUG-12268 在safari4下,设置背景色，回车，背景色的span标签丢失
	 * @param {String} color 要修改的文字颜色。
	 */
	editor.operation.backcolor = function(color){
        editor.operation.save(editor);
		console.log('背景颜色修改');
		SinaEditor.range.applyStyle(editor, {
            'useTagName': 'span',
			'style': 'backgroundColor',
	        'value': color
        });
		editor.btns.backcolor.setState(SinaEditor.BUTTONSTATE.NORMAL,color);
        editor.operation.save(editor);
    };
});