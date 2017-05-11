
/**
 * 初始化编辑器的方法
 */
SinaEditor.plugins.add('initFromStatic',function(args){
	var editor = this;
    function init(){
        editor.entyWin = editor.enty.contentWindow;
        editor.entyDoc = editor.entyWin.document;
        editor.entyBody = editor.entyDoc.body;
        
        editor.entyBody.spellcheck = !!editor.option.disableNativeSpellChecker;
        if (SinaEditor.env.$IE) {
            editor.entyBody.hideFocus = true;
            editor.entyBody.disabled = true;
            editor.entyBody.contentEditable = true;
            editor.entyBody.removeAttribute('disabled');
        }
        else {
            setTimeout(function(){
                if (SinaEditor.env.$GENKO) {
					//editor.entyDoc.designMode = 'on';
                    editor.entyBody.contentEditable = true;
                    var fFocus = false;
                    //修正在FF下，iframe样式修改造成的不能再编辑问题。
                    SinaEditor.ev.add(editor.enty, 'DOMAttrModified', function(e){
                        var an = e.attrName.toUpperCase();
                        if (an == 'CLASS' || an == 'STYLE') {
                            editor.entyBody.contentEditable = false;
                            editor.entyBody.contentEditable = true;
                            editor.entyWin.blur();
                            editor.entyWin.focus();
                        }
                    });
                }
                else 
                    if (SinaEditor.env.$WEBKIT) {
                        editor.entyBody.parentNode.contentEditable = true;
                    }
                    else {
                        editor.entyDoc.designMode = 'on';
                    }
            }, 0);
        }
        
        setTimeout(function(){
            try {
                editor.entyDoc.execCommand('enableObjectResizing', false, !editor.option.disableObjectResizing);
            } 
            catch (e) {
            }
            try {
                editor.entyDoc.execCommand('enableInlineTableEditing', false, !editor.option.disableNativeTableHandles);
            } 
            catch (e) {
            }
			
            if (SinaEditor.env.$IE <= 6) {
				try{
					//图标被重复的请求
					document.execCommand("BackgroundImageCache", false, true);
				}catch(e){}
                setTimeout(function(){
                    var doc = editor.entyDoc;
                    if (doc) {
                        var $body = doc.body;
                        $body.runtimeStyle.marginBottom = '0px';
                        $body.runtimeStyle.marginBottom = '';
                    }
                }, 1000);
            }
        }, 0);
		
		if(SinaEditor.env.$IE) {
			var sc = SinaEditor.util.dom.createDom('script', {
	            'ownerDocument': editor.entyDoc,
	            'attributes': {
					'type':'text/javascript',
	                'src':window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+'ierange-m2.js?'+SinaEditor.version
	            }
	        });
			
			editor.entyDoc.getElementsByTagName('head')[0].appendChild(sc);
		}
        
        if (editor.option.styleLinks) {
            var links = editor.option.styleLinks;
			var i;
            for (i = 0; links[i]; i++) {
                SinaEditor.util.dom.addLink(links[i], editor.entyDoc);
            }
        }
		
        if (editor.option.styles) {
            SinaEditor.util.dom.addStyles(editor.option.styles, editor.entyDoc);
        }
    }
    
	var customDomain = document.domain;

    var func = 'document.open();' +
			    (SinaEditor.env.isCustomDomain ? 'document.domain="' + customDomain + '";' : '') +
			    'document.close();';
    
    var iframe = SinaEditor.util.dom.createDomFromHTML('<iframe' +
			    ' style="width:100%;height:100%;z-index:999;"' +
			    ' frameBorder="0"' +
			    ' src="' +
			    (SinaEditor.env.$IE ? 'javascript:void(function(){' + encodeURIComponent(func) + '}())' : '') +
			    '"' +
			    ' allowTransparency="true"' +
			    '></iframe>');
    editor.enty = iframe;
    SinaEditor.ev.add(iframe, 'load', init);
	setTimeout(function(){
		args.parent.appendChild(iframe);
	},0);
});
