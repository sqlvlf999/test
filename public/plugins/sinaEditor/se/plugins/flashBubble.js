//当鼠标链接在IMG标签内时
SinaEditor.plugins.add('flashBubble', function(){
    return SinaEditor.$abstract.BaseBubblePlugin({
        tagName: 'FLASH',
        applyStyles: SinaEditor.CONF.aBubbleStyles,
        showBubble: function(node, editor){
        
            var t = new Date().getTime();
            var html, data;
            var seid = 'f_se_b_' + t;
            var did = 'f_d_b_' + t;
            var sid = 'f_s_b_' + t;
            var cid = 'f_c_b_' + t;
            data = {
                seeid: seid,
                deleteid: did,
                showflash: sid,
                closeid: cid
            };
            var href = node.href;
            html = new SinaEditor.$abstract.Template(SinaEditor.CONF.flashBubbleTemplete);
            
            var pos = SinaEditor.util.dom.getXY(node,true);
            var iframePos = SinaEditor.util.dom.getXY(editor.enty);
            if (iframePos[1] > pos[1]) {
                pos[1] = iframePos[1];
            }
            var bubble = SinaEditor.baseBubble.showBubble(html.evaluate(data), {
                x: pos[0],
                y: pos[1]
            });
            bubble.id(seid).onclick = function(){
                var snode = bubble.id(sid);
                bubble.id(seid).style.display = 'none';
                snode.innerHTML = decodeURIComponent(node.getAttribute('_se_flash'));
                //chrome下看不到部分flash
                if (SinaEditor.env.$CHROME) {
                    var embed = snode.getElementsByTagName('embed')[0];
                    embed.setAttribute('wmode', 'transparent');
                    snode.innerHTML = SinaEditor.util.dom.outerHTML(embed);
                    
                }
                snode.style.display = '';
            };
            bubble.id(cid).onclick = function(){
                SinaEditor.baseBubble.hiddenBubble();
                editor.focus();
            };
            bubble.id(did).onclick = function(){
                editor.operation.save(editor);
				
                var children = node;
				editor.focus();
				SinaEditor.range.setStartBefore(editor.entyWin, node);
                node.parentNode.removeChild(node);
                SinaEditor.baseBubble.hiddenBubble();
                
                editor.operation.save(editor);
            };
        }
    });
}());
