
//插入表情
SinaEditor.plugins.add('faceUI',function(args){
	var editor = this;
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'faceUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name': 'faceUIPanel',
			'args': args
		});
	}
	
	/**
	 * 添加表情
	 * @param {String} src 要添加表情的src
	 */
	editor.operation.addFace = function(src){
		if(!src) {
			return;
		}
		
		editor.operation.save(editor);
		
		var img = SinaEditor.util.dom.createDom('img',{
			ownerDocument : editor.entyDoc,
			attributes : {
				'_se_type' : 'face'
			},
			properties : {
				'src' : src
			}
		});
		
		editor.operation.addNode(img);
		
		editor.operation.save(editor);
	};

});