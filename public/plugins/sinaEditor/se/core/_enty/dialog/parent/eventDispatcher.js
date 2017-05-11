/**
 * 事件分发类,以实现自定义事件
 * @class 事件分发类
 * @created 2010-10-14
 * @author Random | YangHao@staff.sina.com.cn
 * @param {Object} target 使用该类的对象
 */
SinaEditor._.EventDispatcher = function(target){
	this.__target=target;
	this.__events={};
}.$define({
		
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {String} type 事件名称
	 * @param {Function} handle 事件触发后执行的function
	 */
	addEventListener:function(type,handle){
		if (!this.__checkFunction(handle)) {
			return;
		}
		
		var evts=this.__events;
		type=type.toLowerCase();
		
		if(!evts[type]) {
			evts[type]=[];
		}
		evts[type].push(handle);
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {String} type 事件名称
	 * @param {Function} handle 事件触发后执行的function的引用
	 */
	removeEventListener:function(type,handle){
		var evts=this.__events[type];
		type=type.toLowerCase();
		
		if (!this.__checkFunction(handle) || !evts || !evts.length) {
			return;
		}
		var i=0;
		for(i=evts.length-1;i>=0;i--){
			if (evts[i] === handle) {
				evts.splice(i, 1);
			}
		}
	},
	
	/**
	 * 触发事件,一个事件如果对应多个执行的function,则按添加的顺序都被触发
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {String} type 事件名称
	 */
	dispatchEvent: function(type){
		type = type.toLowerCase();
		var evts = this.__events[type];
		if (!evts || !evts.length) {
			return;
		}
		
		var args = Array.prototype.slice.call(arguments, 0);
		var i=0;
		args.shift();
		for (i = 0, l = evts.length; i < l; i++) {
			evts[i].apply(this.__target, args);
		}
	},
	
	/**
	 * 检测对象是否为function类型的方法,
	 * 		其实,从美学的角度讲，这个方法不应该出现在这里,
	 * 		但现在没有想好对单独的方法的归并处理方式,就先放这里吧,
	 * 		原谅我吧........
	 * @inner
	 * @memberOf SinaEditor._.EventDispatcher#
	 * @param {Object} func
	 */
	__checkFunction:function(func){
		return typeof func !=="string" && String.prototype.slice.call(func, 0, 8) == "function";
	}
});