

//

if(!window.SinaEditor) {
	SinaEditor = {};
}

/**
 * 在SinaEditor下建立子对象
 * @function
 * @param {String} ns 要设置的namespace
 * @param {Function} callBack 设置完命名空间后的回调函数,此函数会把设置的namespace作为参数传递进来
 * @author stan | chaoliang@staff.sina.com.cn
 * @example
 		SinaEditor.pkg("Core.Array");
 		alert(typeof Core.Array);	//[Object Object]
 */
SinaEditor.pkg = function(ns,callBack) {
	if (!ns || !ns.length){
		return null;
	}
    var levels = ns.split(".");
    var nsobj = SinaEditor;
	var i;
    for (i= (levels[0] == 'SinaEditor') ? 1 : 0; i< levels.length; ++ i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }
	if(callBack) {
		callBack(nsobj);
	}
	return nsobj;
};


SinaEditor.pkg('SinaEditor.operation');