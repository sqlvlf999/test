
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 以div作为节点的按钮。继承自{@link SinaEditor.$abstract.$BaseButton}。
 * @class 以div作为节点的按钮
 * @param {Object} option 按钮的配置参数，可以参考{@link SinaEditor.$abstract.$BaseButton}中的参数，这里还增加了：<br>
 * <table class="summaryTable">
 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>attributes</td>
 * 		<td>
 * 			div节点的属性，将会使用setAttribute的方法设置入div中。结构形如：{'key1':'value',..}
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>properties</td>
 * 		<td>
 * 			div节点的属性，将会使用'.'操作符设置入div中。结构形如：{'key1':'value',..}
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>title</td>
 * 		<td>
 * 			div节点的title。
 * 		</td>
 * 	</tr>
 * </table>
 * @param {Object} editor 应用于此按钮的编辑器对象。
 */
SinaEditor.$abstract.divButton = function(option,editor){
    option.attributes = option.attributes || {};
	option.properties = option.properties || {};
    if (!option.attributes.id) {
        option.attributes.id = 'b_' + new Date().getTime();
    }
	if (!option.properties.innerHTML) {
        option.properties.innerHTML = '&nbsp;';
    }
    this.$ = SinaEditor.util.dom.createDom('div', {
        attributes: option.attributes,
        properties: option.properties
    });
	if(option.title) {
		this.$.title = option.title;
	}
	if(!option.noEvent) {
		this.eventInit(option,editor);
	}
	this.noAppend = false;
}.$extends(SinaEditor.$abstract.$BaseButton).$define({});
