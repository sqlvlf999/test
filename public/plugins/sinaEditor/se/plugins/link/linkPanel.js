
//插入链接的弹出浮层
SinaEditor.plugins.add('linkPanel',function(args){
    var editor = this;
	
    var linkPanel = SinaEditor.winDialog.create({
        title: '添加链接',
        content: SinaEditor.TOOLCONF.linkTemplate,
		funcClose:function(){
			_back();
		}
    });
	
    linkPanel.setMiddle();
    linkPanel.setFixed(true);
    
    var okNode = linkPanel.nodes.ok;
    var cancelNode = linkPanel.nodes.cancel;
    var textNode = linkPanel.nodes.text;
	var hiddNode = linkPanel.nodes.hidden;
    var linkNode = linkPanel.nodes.link;
	var _tmpNode;
    
	var _back = function() {
		hiddNode.style.display = 'none';
		_tmpNode = null;
        textNode.value = '';
		linkNode.value = 'http://';
	};
	
	editor.panels.link = linkPanel;
	
	//link浮层的代码
    SinaEditor.CONF.aBubbleModify = function(node) {
		linkNode.value = decodeURI(node.href);
		_tmpNode = node;
		linkPanel.show();
	};
	
	SinaEditor.CONF.aBubbleDelete = function(node) {
		editor.operation.link({'elm':node});
	};
	
    return {
        "events": [{
            "element": okNode,
            "events": {
                'click': function(){
					editor.operation.link({
						'link' : linkNode.value,
						'str' : textNode.value,
						'elm' : _tmpNode
					});
					_back();
					linkPanel.hidden();
                }
            }
        },{
            "element": cancelNode,
            "events": {
                'click': function(){
                    _back();
        			linkPanel.hidden();
                }
            }
        }]
    };
});
