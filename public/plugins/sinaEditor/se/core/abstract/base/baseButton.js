
//基础的按钮形态

if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

//1.不同时期展现不同的样式
/**
 * 编辑器按钮的基础类，并没有实现具体的节点展现，仅实现了状态转换的逻辑。建议按钮的实现可以基于此类。<br>
 * 按钮实现四种状态：<br>
 * 1.可用状态<br>
 * 2.不可用状态<br>
 * 3.鼠标移上去(这个分为不可以移上去还是可用移上去)<br>
 * 4.已使用状态<br>
 * @param {Object} option 一些配置参数信息。<br>
 * 包含以下可选参数:<br>
 * <table class="summaryTable">
 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
 * 	<tr>
 * 		<td>int</td>
 * 		<td>setState</td>
 * 		<td>
 * 			初始化后的按钮状态,目前有以下三种：<br>
 * 			<ul>
 * 				<li>SinaEditor.BUTTONSTATE.NORMAL，可用状态，值为1;</li>
 * 				<li>SinaEditor.BUTTONSTATE.DISABLED，不可用状态，值为2;</li>
 * 				<li>SinaEditor.BUTTONSTATE.CLICKED，按下状态，抑或是鼠标悬停在上面的状态，值为3;</li>
 * 			</ul>
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>editorChangeType</td>
 * 		<td>
 * 			按钮的改变状态定义。默认为'default'(可以参阅/core/iniy/default.js中的js配置)
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>function</td>
 * 		<td>init</td>
 * 		<td>
 * 			在初始化按钮时候执行的回调代码。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>Array</td>
 * 		<td>events</td>
 * 		<td>
 * 			还需要再绑定的扩展事件，形如:[{事件名称:对应回调函数},{事件名称:对应回调函数}]。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>Boolean</td>
 * 		<td>unselected</td>
 * 		<td>
 * 			是否可以选中图标。默认为true。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>Boolean</td>
 * 		<td>noEvent</td>
 * 		<td>
 * 			是否需要绑定事件。默认为false。
 * 			当noEvent为true时，调用setState时不触发按钮样式的改变和按钮状态改变的回调。
 * 			当noEvent为false时，调用setState时触发按钮样式的改变和按钮状态改变的回调。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>normalClass</td>
 * 		<td>
 * 			按钮通常状态下的样式名。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>disabledClass</td>
 * 		<td>
 * 			按钮不可点击状态下的样式名。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>clickedClass</td>
 * 		<td>
 * 			按钮按下的样式名。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>mouseoverClass</td>
 * 		<td>
 * 			鼠标悬停后的样式名，包含该方法会绑定<span style="color:red">mouseover、mouseout</span>事件。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>function</td>
 * 		<td>normal</td>
 * 		<td>
 * 			按钮切换到通常状态下的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>disabled</td>
 * 		<td>
 * 			按钮切换到不可点击状态下的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>clicked</td>
 * 		<td>
 * 			按钮切换到按下状态的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 *  <tr>
 * 		<td>String</td>
 * 		<td>mouseover</td>
 * 		<td>
 * 			按钮切换到鼠标移上去的状态的回调函数。传递当前按钮实体dom节点。
 * 		</td>
 * 	</tr>
 * </table>
 * @param {Object} editor 按钮作用的编辑器对象。 
 * @class 编辑器按钮的基础类
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.$BaseButton = function(option,editor){
	this.option = option;
	this._customSetStatus = option.setState;
}
.$define({
	/**
	 * 初始化事件的绑定，一般交由实现的类去调用，实体类不会去调用的方法。
	 * @memberOf SinaEditor.$abstract.$BaseButton#
	 * @param {Object} option 初始化传递过来的参数，即初始化类时的可选参数。
	 * @param {Object} editor 按钮作用的编辑器对象。
	 */
	eventInit : function(option,editor){
		var btn = this;
		var type = option.editorChangeType || 'default';
		var i=0;
		
		if(option.init) {
			option.init.call(this);
		}

		if(option.events) {
			for(i=0; option.events[i]; i++) {
				SinaEditor.ev.add(this.$, option.events[i].name, option.events[i].callback);
			}
		}
		//鼠标移上去的效果添加
        if (option.mouseoverClass) {
            var me = this;
            SinaEditor.ev.add(this.$, 'mouseover', function(){
                if (me._state == SinaEditor.BUTTONSTATE.CLICKED) {
                    return;
                }
				if (me._state == SinaEditor.BUTTONSTATE.DISABLED) {
                    return;
                }
                me.$.className = me.option.mouseoverClass;
				if(me.option.mouseover) {
					me.option.mouseover(me.$);
				}
            });
            SinaEditor.ev.add(this.$, 'mouseout', function(){
                me.setState(me._state);
            });
        }
		//是否可以选中
		if(!option.unselected) {
			if(SinaEditor.env.$GENKO) {
				this.$.style.MozUserSelect = 'none';
			} else if(SinaEditor.env.$WEBKIT) {
				this.$.style.WebkitUserSelect = 'none';
			} else {
				this.$.setAttribute('unselectable','on');
			}
		}
        this.setState(option.state || SinaEditor.BUTTONSTATE.NORMAL);
		SinaEditor.ev.add(editor, 'editorStateChange', function() {
			SinaEditor.BUTTON[type].call(this,btn);
		});
	},
	/**
	 * 设置按钮的状态，响应的，也会修改按钮的样式和执行对应样式状态的回调。
	 * @memberOf SinaEditor.$abstract.$BaseButton#
	 * @param {Integer} state 切换到的对应状态。具体值可以参见SinaEditor.BUTTONSTATE下的可选值。
	 */
    setState: function(state){
		this._state = state;
		if(this._customSetStatus) {
			this._customSetStatus.apply(this,arguments);
		}
        var option = this.option;
		if(option.noEvent) {
			return;
		}
        var key,s;
        for (s in SinaEditor.BUTTONSTATE) {
            if (SinaEditor.BUTTONSTATE[s] == state) {
                key = s.toLowerCase();
                this.$.className = option[key + 'Class'];
				if(option[key]) {
					option[key](this.$);
				}
                break;
            }
        }
    },
	/**
	 * 获得按钮的当前状态。
	 * @memberOf SinaEditor.$abstract.$BaseButton#
	 * @return {Integer} 放回的状态值可参见SinaEditor.BUTTONSTATE下的可选值。
	 */
	getState : function() {
		return this._state;
	}
});