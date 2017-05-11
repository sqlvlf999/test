
//获取最终编辑的内容
SinaEditor.plugins.add('submit',function(args){
	var editor = this;
	
	/**
	 * 获取最终编辑的内容
	 * @return {String} 最终的html字符串
	 */
	editor.operation.submit = function(){
		var str = '',
			filter = editor.operation.pasteFilter || function(){};
			swapData = editor.operation.swapData || function(){};
		swapData(true);
		str = editor.entyArea.value;
		swapData(false);
		return str;
	};
});