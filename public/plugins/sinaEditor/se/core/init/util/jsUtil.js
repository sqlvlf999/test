
if(!SinaEditor.util) {
	/**
	 * 一些常用的js函数。
	 * @namespace
	 */
	SinaEditor.util = {};
}

SinaEditor.pkg('SinaEditor.util', function(ns){
	/**
	 * 是否是一个空的对象。
	 * @name SinaEditor.util.isEmptyObject
	 * @function
	 * @param {Object} obj 要判断的对象。
	 * @return {Boolean} 当obj={}时返回true;
	 */
    ns.isEmptyObject = function(obj){
		var name;
        for (name in obj) {
            return false;
        }
        return true;
    };
    
	/**
	 * 返回一个唯一整数值
	 * @name SinaEditor.util.uniqueKey
	 * @function
	 * @return {Intger} 返回一个唯一整数值
	 */
    ns.uniqueKey = function(){
        var dt = (+new Date()) + '';
        var len = dt.length;
        return parseInt(Math.random() * 10000, 10) + '' + dt.substring(len / 2, len - 1);
    };
    
    /**
     * 去字符串空格
     * @name SinaEditor.util.trim
	 * @function
     * @param {String} str 要去除空格的字符串
     * @return {String} 返回去首尾空格的字符串
     */
    ns.trim = function(str){
        str = str.replace(/^\s\s*/, '');
        var ws = /\s/;
        var i = str.length;
        while (ws.test(str.charAt(--i))){}
        return str.slice(0, i + 1);
    };
	
	/**
	 * 对象转换成JSON字符串
	 * @name SinaEditor.util.o2s
	 * @function
	 * @param {Object} o 要转换的对象。
	 * @return {String} 转换的字符串类型。
	 */
	ns.o2s = function(o) {
		var strs = [];
		var me = arguments.callee;
		var type = Object.prototype.toString.call(o);
		
		switch(type) {
			case '[object Array]' :
				strs.push('[');
				/*
				//在IE下不会完整的循环完毕
				var i;
				for(i=0,len=o.length; i<len; i++) {
					strs.push(me(o[i]));
					strs.push(',');
				}
				*/
				var tmp = o.shift();
				while(tmp) {
					strs.push(me(tmp));
					strs.push(',');
					tmp = o.shift();
				}
				if(strs[1]) {
					strs.pop();
				}
				strs.push(']');
				return strs.join('');
			case '[object Object]' :
				var key;
				strs.push('{');
				for(key in o) {
					strs.push(me(key));
					strs.push(':');
					strs.push(me(o[key]));
					strs.push(',');
				}
				if(strs[1]) {
					strs.pop();
				}
				strs.push('}');
				return strs.join('');
				
			case '[object String]' :
				strs.push('"');
				strs.push(o.replace(/\\/g,'\\\\')
							.replace(/'/g,'\\\'')
							.replace(/"/g,'\\"'));
				strs.push('"');
				return strs.join('');
			case '[object Number]':
			case '[object Boolean]':
				return o;
			default :
				return o.toString ? o.toString() : '[unsupported]';
		}
	};
	
	/**
	 * 混合对象，不考虑property里的方法
	 * @name SinaEditor.util.mix
	 * @function
	 * @param {Object} target 要混合的对象源。
	 * @param {Object} ref 新增的对象源。
	 * @return {Object} 返回包含新增对象源的对象
	 */
	ns.mix = function(target,ref) {
		if(ref) {
			var key;
			for(key in ref) {
				target[key] = ref[key];
			}
		}
		return target;
	};
	
	/**
	 * JSON字符串转换成对象
	 * @name SinaEditor.util.s2o
	 * @function
	 * @param {String} str 要转换成对象的string
	 * @return 返回转换后的对象，转换失败，那么将会返回null。
	 */
	ns.s2o = function(str) {
		try {
			//转对象
			return eval('('+str+')');
		} catch(e) {
			return null;
		}
	};
});