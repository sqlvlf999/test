
//插入表格
SinaEditor.plugins.add('tableUIPanel',function(args){
	var editor = this;
	var btn = null;
	
	var colors = args.colors || SinaEditor.TOOLCONF.COLOR;
	var tablePanel = new SinaEditor._.Panel();
	tablePanel.setTemplate(SinaEditor.TOOLCONF.tableTemplate);
	
	var panel = tablePanel.nodes.panel;
	var eventContent = tablePanel.nodes.eventContent;
	var baseContent = tablePanel.nodes.baseContent;
	var chooseContent = tablePanel.nodes.chooseContent;
	var tabNums = tablePanel.nodes.tabNums;
	
	editor.panels.tableUI = tablePanel;
	
	return {
        "events": [{
            "element": eventContent,
            "events": {
                'mousemove' : function(e) {
					var btn = editor.btns.tableUI;
					var scroll = SinaEditor.util.dom.getScrollPos();
					var xLoc = parseInt((e.clientX-btn.PANELX+scroll[1])/16,10) || 1;
					var yLoc = parseInt((e.clientY-btn.PANELY+scroll[0])/16,10) || 1;
					
					xLoc = xLoc > 20 ? 20 : xLoc;
					yLoc = yLoc > 20 ? 20 : yLoc;
					
					chooseContent.style.width = xLoc + 'em';
					chooseContent.style.height = yLoc + 'em';
					
					var tmpWidth = (xLoc < 5 ? 5 : xLoc) + 'em';
					baseContent.style.width = tmpWidth;
					baseContent.style.height = (yLoc < 5 ? 5 : yLoc) + 'em';
					eventContent.style.width = tmpWidth;
					tabNums.innerHTML = [xLoc,' * '+yLoc].join('');
				}
            }
        },{
            "element": document,
            "events": {
                'click' : function(e) {
					var target = e.target;
					if(SinaEditor.util.dom.containsNode(editor.btns.tableUI.$,target)) {
						return;
					}
					if(!SinaEditor.util.dom.containsNode(panel,target)) {
						tablePanel.hidden();
					}
				}
            }
        },{
            "element": chooseContent,
            "events": {
                'click' : function(e) {
					var matrix = tabNums.innerHTML;
					var arr = matrix.split('*');
					editor.operation.tableCreate(parseInt(arr[0],10),parseInt(arr[1],10));
					tablePanel.hidden();
				}
            }
        },{
            "element": editor,
            "events": {
                'editorSelectionChange' : function(){
					tablePanel.hidden();
				}
            }
        }]
    };
});