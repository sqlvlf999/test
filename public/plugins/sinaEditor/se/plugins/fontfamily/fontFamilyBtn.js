
//字体选择
SinaEditor.plugins.add('fontFamilyBtn',function(args){
	var editor = this;
	
	var _fontConf = args.conf || SinaEditor.TOOLCONF.FONTFAMILYCONF;

	var btnConf = {
		title:'字体',
        normalClass: 'ico_family_1',
        properties: {
            'innerHTML': '<span>' + SinaEditor.TOOLCONF.FONTFAMILYDEF + '</span>'
        },
        disabledClass: 'ico_family_4',
        clickedClass: 'ico_family_3',
        mouseoverClass: 'ico_family_2',
        state: SinaEditor.BUTTONSTATE.NORMAL,
        group: 'common'
    };
	
	btnConf = SinaEditor.util.mix(btnConf,args.btnConf);
	
	var btn = SinaEditor.ButtonFactory.createButton(btnConf,editor);
	
	editor.btns.fontFamily = btn;
	
	
	var _createDomHTML = function(eid){
        var str = ['<div class="fontItemTitle">字体</div>'];
        var family, style,i;
        for (i = 0; _fontConf[i]; i++) {
            family = _fontConf[i].html;
            style = _fontConf[i].style || family;
            str.push('<div class="fontItem" style="font-family:');
            str.push(style);
            str.push('">');
            str.push(family);
            str.push('</div>');
        }
        return str.join('');
    };
	
	var _bindEvent = function(children){
		var i;
        for (i = 0; children[i]; i++) {
            var cn = children[i].className;
            if (cn && cn == 'fontItem') {
                children[i].onclick = function(e){
					editor.focus();
                    e = e || window.event;
                    var target = SinaEditor.ev.fixEvent(e).target;
                    var family = target.style.fontFamily;
                    btn.$.innerHTML = '<span style="font-family:' + family + '">' + target.innerHTML + '</span>';
                    editor.operation.setFontFamily(family);
                    SinaEditor.btnBubble.hiddenBubble();
                    return false;
                };
            }
        }
    };
	
	return {
		'events' : [{
            'element': btn.$,
            'events': {
                'click': function(){
                    if (editor.getState() != SinaEditor.STATE.EDITING) {
                        return;
                    }
                    var loc = SinaEditor.util.dom.getXY(btn.$);
                    var div = SinaEditor.util.dom.createDom('div');
                    div.innerHTML = _createDomHTML(editor.option.id);
                    _bindEvent(div.childNodes);
                    SinaEditor.btnBubble.showBubble(div, {
                        x: loc[0],
                        y: loc[1] + btn.$.offsetHeight + SinaEditor.util.dom.styleInteger(btn.$, 'paddingTop') + SinaEditor.util.dom.styleInteger(btn.$, 'marginTop'),
                        'className': 'se_fontfamily_bubble'
                    });
                    return false;
                }
            }
        }, {
            'element': editor,
            'events': {
                'editorSelectionChange': function(e,range,refNode){
                    var style = SinaEditor.util.dom.getStyle(refNode, 'fontFamily');
                    var family = _fontConf;
                    var html = '<span>' + SinaEditor.TOOLCONF.FONTFAMILYDEF + '</span>';
                    var tmp,i;
                    for (i = 0; family[i]; i++) {
                        //tmp = family[i]['style'] || family[i]['html'];
						tmp = family[i].style || family[i].html;
                        if (style.indexOf(tmp) != -1) {
                            //html = '<span style="font-family:' + tmp + '">' + family[i]['html'] + '</span>';
							html = '<span style="font-family:' + tmp + '">' + family[i].html + '</span>';
                            break;
                        }
                        
                    }
                    btn.$.innerHTML = html;
                }
            }
        }]
	};
});