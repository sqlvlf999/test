/**
 * IRenderer,呈现器接口,实现对象的呈现方式
 * @class IRenderer,呈现器接口,实现对象的呈现方式
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-15
 */
SinaEditor._.IRenderer={
	
	/**
	 * 是否允许显示对象
	 */
	setCanShow:function(state){},
	
	/**
	 * 是否允许隐藏对象
	 */
	setCanHidden:function(state){},
	
	/**
	 * 对象的显示
	 * @param {Object} node
	 */
	show:function(node){},
	
	/**
	 * 对象的隐藏
	 * @param {Object} node
	 */
	hidden:function(node){},
	
	/**
	 * 添加事件
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){},
	
	/**
	 * 移除事件
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){}
};
