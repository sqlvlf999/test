/**
 * @fileoverview 给对象定义getter的方法
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-14
 * @example
 * 
 * 		Ui.DisplayObject=function(){
			Core.Function.defineGetter(this,["x","y"],[this.__getX,this.__getY]);
			Core.Function.defineGetter(this,"z",this.__getZ);
		}.$define({
			__getX:function(){
				return 123;
			},
			__getY:function(){
				return "asdf";
			},
			
			__getZ:function(){
				return "lalal"
			}
			
		});
		
		var a = new Ui.DisplayObject();
		alert(a.x);
		alert(a.y);
		alert(a.z);
 */
(function(){
	/**
	 * 给对象定义getter的方法，只能返回Number和String类型的数据
	 * @class 给对象定义getter的方法，只能返回Number和String类型的数据
	 * @param {Object} obj 要定义getter的对象
	 * @param {Object} p 定义的属性
	 * @param {Object} fn 操作的function
	 */
	SinaEditor._.defineGetter = function(obj, p, fn){
		if (p instanceof Array && fn instanceof Array) {
			var i = Math.min(p.length, fn.length);
			while (i--) {
				if (typeof p[i] === "string" && __checkFunction(fn[i])) {
					obj[p[i]] = {
						valueOf: (function(j){
							return function(){
								return __getValue(obj, fn[j]);
							};
						})(i),
						toString: this.valueOf
					};
				}
			}
		}
		else if (typeof p === "string" && __checkFunction(fn)) {
			obj[p] = {
				valueOf: function(){
					return __getValue(obj, fn);
				},
				toString: this.valueOf
			};
		}
	};
	
	function __checkFunction(fn){
		return typeof fn !== "string" && String.prototype.slice.call(fn, 0, 8) == "function";
	}
	
	function __getValue(obj, fn){
		var ret = fn.call(obj);
		return typeof ret==="string" || typeof ret ==="number" ? ret : null;
	}
})();
