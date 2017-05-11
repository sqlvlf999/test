
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 提供兼容的存储方法的类。兼容老版本的本地存储及IE的本地存储。
 * 该对象首先查找window中是否有localStorage或者globalStorage，对其进行合并兼容。<a href="https://developer.mozilla.org/en/storage" target="_blank">这里</a>可以查看更多内容
 * 如果都不存在这两个对象，则会判断为IE内核浏览器。创建userData(其中创建了名为'SinaEditor'的文件作为基本存储文件)，并创建标准的接口。<a href="http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx" target="_blank">这里</a>可以查看更多内容
 * @type Object
 * @class Storage
 * @namespace SinaEditor.$abstract
 */
SinaEditor.$abstract.Storage = (function(){
	var proxyObj = {};
	
	//包含的方法：
	/**
	 * 保存对象，map的数据格式保存
	 * @requires SinaEditor.util.o2s 可以直接存入对象，内部会转换成字符串存入。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {String} key 要保存数据的key
	 * @param {String | Object} value 要保存的数据
	 * @return {Boolean} 当且仅当存储成功时返回true。
	 */
	var setItem = function(){};
	/**
	 * 返回包含保存内容的长度。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @return {Integer} 返回包含保存内容的长度。
	 */
	var length = function(){};
	/**
	 * 通过索引返回唯一的key。
	 * @requires SinaEditor.util.s2o 由于读取出来的是字符串，需要转换成对象。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {Integer} index 以0开始的正整数。
	 * @return {Object} 当要找的索引长度小于内容总长度时返回key，否则返回null
	 */
	var key = function(){};
	/**
	 * 通过指定的key来查找要返回的内容。
	 * @requires SinaEditor.util.s2o 由于读取出来的是字符串，需要转换成对象。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {String} key 要查找数据的唯一key
	 * @return {Object} 当且仅当存在次key时返回内容。否则返回null
	 */
	var getItem = function(){};
	/**
	 * 通过指定的key来查找要删除对应的内容。
	 * @memberOf SinaEditor.$abstract.Storage
	 * @param {String} key 要删除内容的唯一key
	 */
	var removeItem = function(){};
	/**
	 * 清除所有的保存的内容。注意，在IE中，仅仅清掉了"SinaEditor"为key的内容。
	 * @requires SinaEditor.util.s2o 由于读取出来的是字符串，需要转换成对象。
	 * @memberOf SinaEditor.$abstract.Storage
	 */
	var clear = function(){};
	
	var saveObj = window.localStorage || (window.globalStorage && globalStorage[location.host]);
	if(saveObj) {
		proxyObj.setItem = function(key,value) {
			try {
				saveObj.setItem(key,SinaEditor.util.o2s(value));
				return true;
			} catch(e) {
				return false;
			}
		};
		proxyObj.length = function() {
			return saveObj.length;
		};
		proxyObj.key = function(index) {
			var str = saveObj.key(index);
			return str ? SinaEditor.util.s2o(str) : str;
		};
		proxyObj.getItem = function(key) {
			var str = saveObj.getItem(key);
			return str ? SinaEditor.util.s2o(str) : str;
		};
		proxyObj.removeItem = function(key) {
			saveObj.removeItem(key);
		};
		proxyObj.clear = function() {
			if(saveObj.clear) {
				saveObj.clear();
			} else {
				while(saveObj.length) {
					proxyObj.removeItem(proxyObj.key(0));
				}
			}
		};
	} else {
		saveObj = document.createElement('div');
		saveObj.addBehavior("#default#userData");
		if(document.body) {
			document.body.appendChild(saveObj);
		} else {
			//在head中引用，body有可能还没有被初始化
			document.getElementsByTagName('head')[0].appendChild(saveObj);
		}
		saveObj.load('SinaEditor');
		
		proxyObj.setItem = function(key,value) {
			try {
				var added = false;
				var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
				var i;
				for(i=0; tmp[i]; i++) {
					if(tmp[i][key]) {
						tmp[i][key] = value;
						added = true;
					}
				}
				
				if(!added) {
					var obj = {};
					obj[key] = value;
					tmp.push(obj);
				}
				
				saveObj.setAttribute('saveObj',SinaEditor.util.o2s(tmp));
				saveObj.save('SinaEditor');
				return true;
			} catch(e) {
				return false;
			}
		};
		proxyObj.length = function() {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			return tmp.length;
		};
		proxyObj.key = function(index) {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			if(tmp[index]) {
				var ret;
				for(ret in tmp[index]) {
					return ret;
				}
			}
			return null;
		};
		proxyObj.getItem = function(key) {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			var i;
			for(i=0; tmp[i]; i++) {
				if(tmp[i][key]) {
					return tmp[i][key];
				}
			}
			return null;
		};
		proxyObj.removeItem = function(key) {
			var tmp = SinaEditor.util.s2o(saveObj.getAttribute('saveObj')) || [];
			var i;
			for(i=0; tmp[i]; i++) {
				if(tmp[i][key]) {
					tmp.splice(i,1);
					saveObj.setAttribute('saveObj',SinaEditor.util.o2s(tmp));
					saveObj.save('SinaEditor');
					return;
				}
			}
		};
		proxyObj.clear = function() {
			saveObj.setAttribute('saveObj',SinaEditor.util.o2s([]));
			saveObj.save('SinaEditor');
		};
	}
	return proxyObj;
})();

