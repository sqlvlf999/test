
(function () {
    //当鼠标链接在A标签内时
    SinaEditor.plugins.add('linkBubble',SinaEditor.$abstract.BaseBubblePlugin({
        tagName: 'A',
        applyStyles: SinaEditor.CONF.aBubbleStyles,
        showBubble: function(node, editor){
			var href = node.href;
			if(!href) {
				return;
			}
            var t = new Date().getTime();
			var html,data;
            var mid = 'a_m_b_' + t;
            var did = 'a_d_b_' + t;
			data = {
                modifyid: mid,
                deleteid: did
            };
			var mailTo = href.match(/^mailto:(.*$)/i);
			if(mailTo) {
				html = new SinaEditor.$abstract.Template(SinaEditor.CONF.mailBubbleTemplete);
				data.srcstr = subStr(mailTo[1]);
			} else {
				html = new SinaEditor.$abstract.Template(SinaEditor.CONF.aBubbleTemplete);
				data.src = decodeURI(href);
				data.srcstr = subStr(decodeURI(href));
			}
            var pos = SinaEditor.util.dom.getXY(node,true);
			var iframePos = SinaEditor.util.dom.getXY(editor.enty,true);
			pos[1] -= node.offsetHeight;
			if(iframePos[1] > pos[1]) {
				pos[1] = iframePos[1];
			}
			//#BLOGBUG-12252 链接文字折行后，定位会不准确
            var bubble = SinaEditor.baseBubble.showBubble(html.evaluate(data), {
                x: pos[0],
                y: pos[1]
            });
			if(!SinaEditor.CONF.aBubbleModify) {
				bubble.id(mid).style.display = 'none';
			} else {
				bubble.id(mid).onclick = function(){
					if (!SinaEditor.CONF.aBubbleModify(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
			if(!SinaEditor.CONF.aBubbleDelete) {
				bubble.id(did).style.display = 'none';
			} else {
				bubble.id(did).onclick = function(){
					if(!SinaEditor.CONF.aBubbleDelete(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
			/*
			SinaEditor.CONF.aBubbleDelete = SinaEditor.CONF.aBubbleDelete || function(){
                
				editor.operation.save(editor);
			
				var children = node.childNodes;
				SinaEditor.range.setStartBefore(editor.entyWin,node);
				node.parentNode.removeChild(node);
				var len = children.length - 1;
				
				for(var i=len; i>=0; i--) {
					SinaEditor.range.insertNode(editor.entyWin,children[i]);
				}
				
                SinaEditor.baseBubble.hiddenBubble();
				editor.focus();
				
				editor.operation.save(editor);
            };
            */
            
        }
    }));
	
	function subStr(str){
        var newStr = [];
        var len = str.length;
        if (len > 30) {
            newStr.push(str.substring(0, 15));
            newStr.push(str.substring(len - 15, len));
            return newStr.join('...');
        }
        else {
            return str;
        }
    }
}());
