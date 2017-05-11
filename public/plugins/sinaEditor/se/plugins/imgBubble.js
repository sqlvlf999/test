//当鼠标链接在IMG标签内时
SinaEditor.plugins.add('imgBubble',function(){
	return SinaEditor.$abstract.BaseBubblePlugin({
        tagName: 'IMG',
        applyStyles: SinaEditor.CONF.aBubbleStyles,
        showBubble: function(node, editor) {
			
			if(node.getAttribute('_se_type')) {
				return;
			}
			
            var t = new Date().getTime();
			var html,data;
            var mid = 'i_m_b_' + t;
            var did = 'i_d_b_' + t;
			data = {
                modifyid: mid,
                deleteid: did
            };
			var href = node.href;
			html = new SinaEditor.$abstract.Template(SinaEditor.CONF.imgBubbleTemplete);
            var pos = SinaEditor.util.dom.getXY(node,true);
			var iframePos = SinaEditor.util.dom.getXY(editor.enty,true);
			if(iframePos[1] > pos[1]) {
				pos[1] = iframePos[1];
			}
            var bubble = SinaEditor.baseBubble.showBubble(html.evaluate(data), {
                x: pos[0],
                y: pos[1]
            });
			
			if(!SinaEditor.CONF.imgBubbleModify) {
				bubble.id(mid).style.display = 'none';
			} else {
				bubble.id(mid).onclick = function(){
					if (!SinaEditor.CONF.imgBubbleModify(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
			if(!SinaEditor.CONF.imgBubbleDelete) {
				bubble.id(did).style.display = 'none';
			} else {
				bubble.id(did).onclick = function(){
					if(!SinaEditor.CONF.imgBubbleDelete(node)) {
						SinaEditor.baseBubble.hiddenBubble();
					}
					return false;
				};
			}
        }
    });
}());
