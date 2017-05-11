

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

//一些按钮点击后弹出的浮层
/**
 * 一些按钮用到的弹出浮层，继承自{@link SinaEditor.$abstract.$BaseBubble}。<br>
 * 可以直接通过SinaEditor.btnBubble来进行配置调用，当需要显示浮层时，可以在showBubble的option里设置对应的option即可。
 * @class 部分按钮点击后弹出的浮层
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.BtnBubble = function(){
	this.isHidden = true;
}.$extends(SinaEditor.$abstract.$BaseBubble).$define({
	/**
	 * 显示浮层。
	 * @memberOf SinaEditor.$abstract.BtnBubble#
	 * @param {String|Element} content 要显示的HTML内容或者节点。
	 * @param {Object} option 具体的参数可以参见{@link SinaEditor.$abstract.$BaseBubble}
	 * 中对应的方法参数，并增加了：<br>
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>String</td><td>className</td><td>最外层浮层的样式名称</td></tr>
	 * </table>
	 * @return {Object} 返回这个浮层对象。
	 */
    showBubble: function(content, option){
		if(option.className) {
			this.enbad.className = option.className;
		}
        this.enbad.style.display = 'none';
        this.constructor.$super.showBubble.call(this,content, option);
        this.enbad.style.display = '';
		SinaEditor.ev.add(document,'mouseup',this._handleClick);
		this.isHidden = false;
		return this;
    },
	/**
	 * 隐藏浮层。
	 * @memberOf SinaEditor.$abstract.BtnBubble#
	 * @return {Object} 返回这个浮层对象。
	 */
    hiddenBubble: function(){
        this.constructor.$super.hiddenBubble.call(this);
		SinaEditor.ev.remove(document,'mouseup',this._handleClick);
		this.isHidden = true;
		return this;
    },
	_handleClick : function(e) {
		e = SinaEditor.ev.fixEvent(e);
		var src = e.target;
		if(SinaEditor.util.dom.containsNode(SinaEditor.btnBubble.enbad,src)) {
			return;
		}
		if (!SinaEditor.btnBubble.isHidden) {
			SinaEditor.btnBubble.hiddenBubble();
		}
	},
	/**
	 * 通过id查找对应节点。直接继承自{@link SinaEditor.$abstract.$BaseBubble}中对应的方法。
	 * @memberOf SinaEditor.$abstract.BtnBubble#
	 * @param {String} id 要查找的节点ID
	 * @return {Element} 当且仅当页面中存在次ID时，返回此对象。
	 */
	id : function(id) {
		return this.enbad.ownerDocument.getElementById(id);
	}
});
SinaEditor.btnBubble = new SinaEditor.$abstract.BtnBubble();
