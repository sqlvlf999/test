


if(!SinaEditor.plugins) {
	/**
	 * 编辑器的插件存放位置
	 * @class
	 */
	SinaEditor.plugins = {};
	
	/**
	 * 添加一个编辑器的插件
	 * @param {String} pluginName 插件的名称
	 * @param {function} func 插件的执行函数。
	 */
	SinaEditor.plugins.add = function(pluginName,func) {
		if(!this._pluginObj) {
			this._pluginObj = {};
		}
		this._pluginObj[pluginName] = func;
	};
	/**
	 * 获得指定插件的执行函数。
	 * @param {String} pluginName 查找的插件名称
	 * @return {function} 当且仅当添加了指定的插件时，返回要查询的插件函数，否则为undefined。
	 */
	SinaEditor.plugins.get = function(pluginName) {
		return this._pluginObj[pluginName];
	};
}
