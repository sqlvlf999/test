
//基础的弹出浮层
/**
 * @namespace
 */
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

//弹出提示
/**
 * 基础的弹出浮层。仅作为扩展用，不建议直接用于创建浮层实例。<br>
 * 如果需要扩展弹出的浮层，您可以考虑继承自它。<br>
 * 在创建时，它会生成一个隐藏的div节点作为浮层宿主，并添加到body上。<br>
 * 已知的子类实现：<br>
 * {@link SinaEditor.$abstract.BaseBubbleImpl}<br>
 * @class 基础的弹出浮层
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.$BaseBubble = function(){
    this.enbad = SinaEditor.util.dom.createDom('div');
    this.enbad.style.display = 'none';
    var me = this;
	if(document.body) {
		//属于后加载。
		document.body.appendChild(me.enbad);
	} else {
		SinaEditor.ev.add(window, 'load', function(e){
	        document.body.appendChild(me.enbad);
	    });
	}
}
.$define({
	/**
	 * 定位浮层位置，<b>注意，这个方法并不包含显示或者隐藏的逻辑，仅仅是定位</b>。
	 * 它会忽略掉元素的padding，margin，border的值，以避免定位不准确。
	 * @memberOf SinaEditor.$abstract.$BaseBubble#
	 * @param {Element | String} content 节点或者HTML文本 
	 * @param {Object} option 可选参数，有以下参数：<br>
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 *  <tr><td>int</td><td>x<span style="color:red">(必要参数)</span></td><td>显示的X坐标位置</td></tr>
	 *  <tr><td>int</td><td>y<span style="color:red">(必要参数)</span></td><td>显示的Y坐标位置</td></tr>
	 * </table>
	 * @return {Element} 返回宿主节点。
	 */
    showBubble: function(content, option){
        if (typeof content == 'string') {
            this.enbad.innerHTML = content;
        }
        else {
            this.enbad.appendChild(content);
        }
        this.enbad.style.left = option.x + 'px';
        var dy = SinaEditor.util.dom.styleInteger(this.enbad, 'paddingTop') 
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'paddingBottom') 
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'marginTop') 
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'marginBottom')
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'borderTopWidth')
				+ SinaEditor.util.dom.styleInteger(this.enbad, 'borderBottomWidth');
        this.enbad.style.top = (option.y - dy) +'px';
		return this;
    },
	/**
	 * 隐藏浮层，<b>注意，这个方法会清掉宿主节点内的所有HTML代码，并影藏宿主</b>。
	 * @memberOf SinaEditor.$abstract.$BaseBubble#
	 * @return {Element} 返回宿主节点。
	 */
    hiddenBubble: function(){
        this.enbad.style.display = 'none';
        this.enbad.innerHTML = '';
		return this;
    },
	/**
	 * 即document.getElementById
	 * @memberOf SinaEditor.$abstract.$BaseBubble#
	 * @param {String} id 要查找的对象ID。
	 * @return {Element} 要查找的对象。
	 */
	id : function(id) {
		return this.enbad.ownerDocument.getElementById(id);
	}
});