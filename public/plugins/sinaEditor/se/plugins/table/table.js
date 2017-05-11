
//插入表格
SinaEditor.plugins.add('tableUI',function(args){
	var editor = this;
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'tableUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name' : 'tableUIPanel',
			'args' : args
		});
	}
	
	/**
	 * 添加表格
	 * @param {Interget} x 行数
	 * @param {Object} y 列数
	 * @param {Object} option 可选参数，目前没有用到
	 */
	editor.operation.tableCreate = function(x,y,option){
		
		if(x<=0 || y<=0) {
			return;
		}
		
        editor.operation.save(editor);
		
		var tabHTMLs = ['<table cellspacing="1" cellpadding="3" style="width:80%;text-align:center;" border="1" >'];
		var i,j;
		for(i=0; i<y; i++) {
			tabHTMLs.push('<tr>');
			for (j = 0; j < x; j++) {
				tabHTMLs.push('<td>&nbsp;</td>');
			}
			tabHTMLs.push('</tr>');
		}
		tabHTMLs.push('</table>');
		var table = SinaEditor.util.dom.createDomFromHTML(tabHTMLs.join(''),editor.entyDoc);
		editor.operation.addNode(table);
        
        editor.operation.save(editor);
    };
});