
//上传图片
SinaEditor.plugins.add('imgUI',function(args){
    var editor = this;
    
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'imgUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name' : 'imgUIPanel',
			'args' : args
		});
	}
	
	if(!SinaEditor.CONF.imgBubbleModify) {
		SinaEditor.CONF.imgBubbleModify = function(node){
			var panel = editor.panels.imgUI;
			panel.fromBubble = true;
			panel.tmpNode = node;
			editor.panels.imgUI.show();
		};
	}
	
	if(!SinaEditor.CONF.imgBubbleDelete) {
		SinaEditor.CONF.imgBubbleDelete = function(node){
			editor.operation.save(editor);
			node.parentNode.removeChild(node);
			editor.operation.save(editor);
			editor.focus();
		};
	}
});
