
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 按钮的生成由它负责，这里不用关心具体的创建过程，仅需要给他们分组即可。<br>
 * <span style="color:red">注意：每个分组是一个div节点，使用se_ico_group样式。</span><br>
 * <span style="color:red">您可以通过SinaEditor.ButtonFactory来直接访问它的实例。</span><br>
 * @class 直接提供按钮的类
 */
SinaEditor.$abstract.ButtonFactory = function(){
    this.buttonObjs = {};
}
.$define({
	/**
	 * 创建按钮。格式：{rditorID:[{groupid:[btns]}]}
	 * @memberOf SinaEditor.$abstract.ButtonFactory#
	 * @param {Object} option 生成按钮所需要的参数。<br>
	 * 目前实现的按钮有用div实现的按钮{@link SinaEditor.$abstract.divButton}(默认的)和自定义的按钮{@link SinaEditor.$abstract.customButton}，如果需要继续扩展，可以对此放方法进行简单的扩展。<br>
	 * 参数中包含{@link SinaEditor.$abstract.$BaseButton}的参数，还增加了以下参数：
	 * <table class="summaryTable">
	 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>btnType</td>
	 * 		<td>
	 * 			创建按钮的类型，可选：'div'(默认)或者'custom'。<br>
	 * 			那么更近一步的参数可以参考{@link SinaEditor.$abstract.divButton}或者{@link SinaEditor.$abstract.customButton}
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>group</td>
	 * 		<td>
	 * 			按钮的所选分组。这将会作为ID的一部分，请满足能做ID的格式进行书写。<br>
	 * 			当没有提供group时，会取系统时间，也就是说，它会自己成为一个分组。
	 * 		</td>
	 * 	</tr>
	 * </table>
	 * 注意，如果要修改分组的样式，请修改se_ico_group样式。
	 * @param {Object} editor 应用于此按钮的编辑器对象。
	 * @return {Object} 此按钮的实例
	 */
	createButton : function(option,editor) {
		if(!this.buttonObjs[editor.option.id]) {
			this.buttonObjs[editor.option.id] = [];
		}
		var btn = null;
		switch(option.btnType || 'div') {
			case 'div' :
				btn = new SinaEditor.$abstract.divButton(option,editor);
				break;
			case 'custom' :
				btn = new SinaEditor.$abstract.customButton(option,editor);
				break;
		}
		if(!btn.noAppend) {
			this._addBtn(btn,option,editor);
		}
		return btn;
	},
	_addBtn : function(btn,option,editor) {
		var groupid = editor.option.id + '_' + (option.group || 'g'+(new Date().getTime()));
		
		var added = false;
		var groupArr = this.buttonObjs[editor.option.id],i;
		for(i=0; groupArr[i]; i++) {
			if(groupArr[i][groupid]) {
				added = true;
				groupArr[i][groupid].push(btn);
			}
		}
		if(!added) {
			var obj = {};
			obj[groupid] = [btn];
			this.buttonObjs[editor.option.id].push(obj);
		}
		var me = this;
		if(editor.getState() <= SinaEditor.STATE.CREATED) {
			SinaEditor.ev.add(editor, 'editorOnladed', function() {
				var groups = me.buttonObjs[this.option.id];
				var group,gid,i,j;
				for(i=0; groups[i]; i++) {
					group = groups[i];
					var gSpan = SinaEditor.util.dom.createDom('div',{'properties':{'className':'se_ico_group','id':groupid}});
					for(id in group) {
						for(j=0; group[id][j]; j++) {
							gSpan.appendChild(group[id][j].$);
						}
					}
					document.getElementById(this.option.toolBase).appendChild(gSpan);
				}
			},{once:true});
		} else {
			var group = document.getElementById(groupid) || SinaEditor.util.dom.createDom('div',{'properties':{'className':'se_ico_group','id':groupid}});
			group.appendChild(btn.$);
			document.getElementById(editor.option.toolBase).appendChild(group);
		}
	}
});
SinaEditor.ButtonFactory = new SinaEditor.$abstract.ButtonFactory();
