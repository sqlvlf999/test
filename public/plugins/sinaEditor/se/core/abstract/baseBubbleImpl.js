

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 基本的弹出浮层实体类，继承自{@link SinaEditor.$abstract.$BaseBubble}。<br>
 * 全局配置：<br>
 * SinaEditor.CONF.bubbleStyles {String} 可选的。基础浮层的样式，如果使用动态插入方式的话。<br>
 * SinaEditor.CONF.bubbleClassName {String} 基础浮层的样式名。<br>
 * SinaEditor.baseBubble就是SinaEditor.$abstract.BaseBubbleImpl的一个实例。
 * @namespace SinaEditor.$abstract
 * @class 基础的弹出浮层实现
 * @param styles {String} 可选的，传入的动态样式。
 */
SinaEditor.$abstract.BaseBubbleImpl = function(styles){
    if (styles) {
        SinaEditor.util.dom.addStyles(styles);
    }
    this.enbad.className = SinaEditor.CONF.bubbleClassName;
}.$extends(SinaEditor.$abstract.$BaseBubble).$define({
	/**
	 * 显示浮层，相对于抽象类的对应方法，仅增加了对实体的隐藏后重定位再显示。
	 * @memberOf SinaEditor.$abstract.BaseBubbleImpl#
	 * @param {Object} content
	 * @param {Object} option
	 * @return {Object} 本实体类.
	 */
    showBubble: function(content, option){
		this.enbad.style.display = 'none';
		this.constructor.$super.showBubble.call(this,content, option);
        this.enbad.style.display = '';
		return this;
    },
	/**
	 * 仅实现父类方法。
	 * @memberOf SinaEditor.$abstract.BaseBubbleImpl#
	 */
    hiddenBubble: function(){
        this.constructor.$super.hiddenBubble.call(this);
		return this;
    },
	/**
	 * 仅实现父类方法。
	 * @memberOf SinaEditor.$abstract.BaseBubbleImpl#
	 * @param {Object} id
	 */
	id : function(id) {
		return this.constructor.$super.id.call(this,id);
	}
});
SinaEditor.baseBubble = new SinaEditor.$abstract.BaseBubbleImpl(SinaEditor.CONF.bubbleStyles);
