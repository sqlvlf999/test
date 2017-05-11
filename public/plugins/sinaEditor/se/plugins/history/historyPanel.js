
//历史版本
SinaEditor.plugins.add('historyUIPanel',function(args){
	var editor = this;
	var btn = null;
	
	var sid = args.id || 0;
	var storage = SinaEditor.$abstract.Storage;
	
	var historyPanel = new SinaEditor._.Panel();
	historyPanel.setTemplate(SinaEditor.TOOLCONF.historyTemplate);
	
	var panel = historyPanel.nodes.panel;
	
	var _addZero = function(data) {
		return data < 10 ? '0'+data : data;
	};
	
	editor.panels.historyUI = historyPanel;
	editor.panels.historyUI.updataData = function() {
		var datas = editor.operation.loadData() || [];
		if(!datas.length) {
			return;
		}
		var htmls = [];
		var d,i;
		for(i=0; datas[i]; i++) {
			d = new Date(datas[i]);
			htmls.push('<div time="');
			htmls.push(datas[i]);
			htmls.push('" >');
			htmls.push(d.getFullYear());
			htmls.push('-');
			htmls.push(_addZero(d.getMonth()+1));
			htmls.push('-');
			htmls.push(_addZero(d.getDate()));
			htmls.push('&nbsp;');
			htmls.push(_addZero(d.getHours()));
			htmls.push(':');
			htmls.push(_addZero(d.getMinutes()));
			htmls.push(':');
			htmls.push(_addZero(d.getSeconds()));
			htmls.push('</div>');
		}
		panel.innerHTML = htmls.join('');
	};
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorSelectionChange' : function(){
					historyPanel.hidden();
				}
            }
        },{
            "element": panel,
            "events": {
				'click' : function(e){
					var target = e.target;
					var time = target.getAttribute('time');
					if(target.tagName.toUpperCase() == 'DIV' && time) {
						editor.operation.putData(time);
						historyPanel.hidden();
					}
				}
            }
        },{
            "element": document,
            "events": {
				'click' : function(e){
					var btn = editor.btns.historyUI;
					var target = e.target;
					if(target === btn.$) {
						return;
					}
					if(!SinaEditor.util.dom.containsNode(panel,target)) {
						historyPanel.hidden();
					}
				}
            }
        }]
    };
});