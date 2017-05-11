
//当绑定多个显示时出现混乱
(function(){
    var tagArr = {};
    var inited = {};
    /**
	 * 具体弹出浮层的调用，依赖于{@link SinaEditor.$abstract.BaseBubbleImpl}。以静态方法的形式作为调用。只需要通过option参数来配置。<br>
	 * 具体的使用，可以参见：<br>
	 * flashBubble、imgBubble、linkBubble。
	 * @namespace SinaEditor.$abstract
	 * @static
	 * @param option {Object} 配置参数，具体配置参数如下：<br>
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>tagName<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			鼠标选中到哪个节点，弹出此浮层。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>applyStyles<span style="color:red">(可选的)</span></td>
	 * 		<td>
	 * 			弹出浮层依赖的样式，动态写入，可以参考SinaEditor.CONF.aBubbleStyles。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>function</td>
	 * 		<td>showBubble<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			弹出浮层的回调函数，调用时传递两个参数给此回调：<br>
	 * 			node {Object} 当前选中或者焦点位置，要弹出浮层的节点。
	 * 			editor {Object} 焦点所在的编辑器对象。
	 * 		</td>
	 * 	</tr>
	 * </table>
	 */
    SinaEditor.$abstract.BaseBubblePlugin = function(option){
    
        tagArr[option.tagName.toUpperCase()] = option.showBubble;
        
        return function(args){
			var editor = this;
            
            if (inited[editor.option.id]) {
                return {
                    'initialize': function(){
                    },
                    "events": []
                };
            }
            else {
                inited[editor.option.id] = 1;
                return {
                    'initialize': function(){
                        //if (!args.customCss) {
						if (option.applyStyles) {
                            SinaEditor.util.dom.addStyles(option.applyStyles);
                        }
                    },
                    "events": [{
                        "element": editor.entyDoc,
                        "events": {
                            'mouseup': function(e){
                                e = SinaEditor.ev.fixEvent(e);
                                var node = e.target;
                                if (node.nodeType == 3) {
                                    node = node.parentNode;
                                }
                                while (node && node.tagName) {
                                    if (tagArr[node.tagName.toUpperCase()]) {
										if(node.getAttribute('_se_flash')) {
											//tagArr["FLASH"](node, editor);
											(tagArr.FLASH)(node, editor);
										} else {
											tagArr[node.tagName.toUpperCase()](node, editor);
										}
                                        return;
                                    }
                                    node = node.parentNode;
                                }
                                SinaEditor.baseBubble.hiddenBubble();
                            },'keydown': function(){
                                SinaEditor.baseBubble.hiddenBubble();
                            }
                        }
                    }, {
                        "element": editor.entyWin,
                        "events": {
                            'scroll': function(e){
                                SinaEditor.baseBubble.hiddenBubble();
                            }
                        }
                    }, {
                        "element": editor,
                        "events": {
                            'editorStateChange': function(){
                                if (this.getState() != SinaEditor.STATE.EDITING) {
                                    SinaEditor.baseBubble.hiddenBubble();
                                }
                            }
                        }
                    }]
                };
            }
        };
    };
    
})();
