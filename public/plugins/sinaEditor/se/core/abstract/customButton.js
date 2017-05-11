
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 自定义的按钮，继承自{@link SinaEditor.$abstract.$BaseButton}
 * @class 自定义的按钮
 * @param {Object} option 生成按钮所需要的参数。可以参考{@link SinaEditor.$abstract.$BaseButton}
 * @param {Object} editor 应用于此按钮的编辑器对象。
 * 
 */
SinaEditor.$abstract.customButton = function(option,editor){
	/**
	 * {Element} 按钮节点的实体。
	 */
    this.$ = this.option.entyBtn;
	this.noAppend = true;
	if(!option.noEvent) {
		this.eventInit(option,editor);
	}
}.$extends(SinaEditor.$abstract.$BaseButton).$define({});
