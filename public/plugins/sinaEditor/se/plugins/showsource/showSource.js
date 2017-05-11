

SinaEditor.plugins.add('showSource', function(args){
    var editor = this;
    //创建textarea
    editor.entyArea = args.entyArea;
    if (!editor.entyArea) {
        var area = SinaEditor.util.dom.createDom('textarea', {
            'attributes': {
                'id': editor.option.id + '_area_' + (+(new Date()))
            }
        });
        area.style.cssText = "width:100%;height:100%;display:none;resize:none;";
        editor.entyArea = area;
        editor.enty.parentNode.appendChild(area);
    }
	
	if(SinaEditor.env.$IE) {
		editor.entyArea.style.height = editor.enty.offsetHeight + 'px';
	}
    
    if (!args.customerBtn) {
        editor.callPlugin({
            'name': 'showSourceBtn',
            'args': args
        });
    }
    
	/**
	 * 查看源代码。或者把源代码迁移到iframe中
	 * @param {Boolean} toArea true时为从iframe到textarea
	 */
    editor.operation.swapData = function(toArea){
        var type;
        var filter = editor.operation.pasteFilter ||
        function(){
        };
        if (toArea) {
            editor.setState(SinaEditor.STATE.SHOWSOURCE);
            filter();
            //if(args.formatter) {
			
			if (!SinaEditor.env.$IE >= 9) {
				//IE6它受不起啊。。。有木有
				editor.entyArea.value = SinaEditor.util.styleHTML(editor.entyBody.innerHTML, 1, '\t');
			} else {
				editor.entyArea.value = editor.entyBody.innerHTML;
			}
			
            //

            //} else {
            //	editor.entyArea.value = editor.entyBody.innerHTML;
            //}
            //防止flash自动播放
            editor.entyBody.innerHTML = '';
        }
        else {
            editor.entyBody.innerHTML = (editor.entyArea.value).replace(/\u200B|\t|\n|\r/g, '');
            filter();
            editor.setState(SinaEditor.STATE.EDITING);
        }
    };
    
    return {
        'initialize': function(){
            editor.entyArea.style.display = 'none';
            editor.enty.style.display = '';
            //editor.focus();
			if(editor.entyArea.value) {
				editor.operation.swapData(false);
			}
            SinaEditor.redoManager.addEditor(editor);
        }
    };
});
