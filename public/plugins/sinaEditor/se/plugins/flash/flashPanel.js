
//插入flash
SinaEditor.plugins.add('flashUIPanel',function(args){
    var editor = this;
    
    var flashPanel = SinaEditor.winDialog.create({
        title: '添加flash',
        content: SinaEditor.TOOLCONF.flashTemplate,
        funcClose: function(){
			_back();
        }
    });
	
	var flashSrc = flashPanel.nodes.flashSrc;
	var ok = flashPanel.nodes.ok;
	var cancel = flashPanel.nodes.cancel;
	var flashErrTip = flashPanel.nodes.flashErrTip;
	
	var _back = function(){
		flashSrc.value = '';
		flashErrTip.style.display = 'none';
	};
	
	editor.panels.flashUI = flashPanel;
    
    return {
        "events": [{
            "element": cancel,
            "events": {
				'click' : function() {
					_back();
					flashPanel.hidden();
				}
            }
        },{
            "element": ok,
            "events": {
				'click' : function() {
					flashErrTip.style.display = 'none';
					var src = SinaEditor.util.trim(flashSrc.value);
					if(!src) {
						//_back();
						flashErrTip.style.display = '';
						//flashPanel.hidden();
						return;
					}
					editor.operation.insertFlash(src);
					_back();
					flashPanel.hidden();
				}
            }
        }]
    };
});
