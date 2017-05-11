
//插入表情
SinaEditor.plugins.add('faceUIPanel',function(args){
	var editor = this;

	var facePanel = new SinaEditor._.Panel();
	facePanel.setTemplate(SinaEditor.TOOLCONF.faceTemplate);
	
	var panel = facePanel.nodes.panel;
	var faceArr = args.faceSrc || SinaEditor.TOOLCONF.faceSrc;
	
	var htmls = [];
	var i,key;
	for(i=0; faceArr[i]; i++) {
		htmls.push('<img ');
		for(key in faceArr[i]) {
			htmls.push(key);
			htmls.push('="');
			htmls.push(faceArr[i][key]);
			htmls.push('"');
		}
		htmls.push('" onmouseout="this.className=\'\'" onmouseover="this.className=\'face_focus\'" ');
		htmls.push('/>');
	}
	panel.innerHTML = htmls.join('');
	
	editor.panels.faceUI = facePanel;
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(){
					facePanel.hidden();
				}
            }
        },{
            "element": panel,
            "events": {
				'click' : function(e){
					var target = e.target;
					if(target.tagName.toUpperCase() == 'IMG') {
						editor.operation.addFace(target.src);
						facePanel.hidden();
					}
				}
            }
        },{
            "element": document,
            "events": {
				'click' : function(e){
					var target = e.target;
					if(SinaEditor.util.dom.containsNode(editor.btns.faceUI.$,target)) {
						return;
					}
					if(!SinaEditor.util.dom.containsNode(panel,target)) {
						facePanel.hidden();
					}
				}
            }
        }]
    };
});