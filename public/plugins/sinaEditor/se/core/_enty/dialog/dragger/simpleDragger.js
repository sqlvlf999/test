
/**
 * 一般的拖拽器类,实现了IDragger接口
 * event
 * 		afterDrag 在托拽完成后触发
 * @class 简单的拖拽器
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-25
 */
SinaEditor._.SimpleDragger=function(){
	this.__drag=null;
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
}.$implements(SinaEditor._.IDragger).$define({
	
	/**
	 * 添加事件监听
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		if(type.toLowerCase()==="afterdrag"){
			this.__eventDispatcher.addEventListener(type,handle);
		}else{
			this.__drag.addEventListener(type,handle);
		}
		return this;
	},
	
	/**
	 * 移除事件监听
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {String} type
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		if(type.toLowerCase()==="afterdrag"){
			this.__eventDispatcher.removeEventListener(type,handle);
		}else{
			this.__drag.removeEventListener(type,handle);
		}
		return this;
	},
	
	/**
	 * 设置要拖拽的节点
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {Object} node 获取鼠标捕获事件的节点
	 * @param {Object} attachNode 跟随鼠标移动的节点
	 * @param {Boolean} isDragCapureNode 是否拖拽获取鼠标捕获事件的节点
	 */
	setDrag:function(node,attachNode,isDragCapureNode){
		var me=this;
		
		this.__drag=new SinaEditor._.Drag(node,attachNode,isDragCapureNode);
		this.__drag.addEventListener("afterDrag",function(){
			me.__eventDispatcher.dispatchEvent("afterDrag");
		});
		return this;
	},
	
	/**
	 * 设置是否锁定拖拽区域
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {Boolean} state
	 */
	setLock:function(state){
		this.__drag.isLock=!!state;
		return this;
	},
	
	/**
	 * 设置锁定的拖拽区域的范围
	 * @memberOf SinaEditor._.SimpleDragger#
	 * @param {Object} area{
	 * 					left:左边界坐标,
	 *					top:上边界坐标,
	 *					right:右边界坐标,
	 *					bottom:下边界坐标
	 * 				}
	 */
	setArea:function(area){
		this.__drag.lockArea=area;
		return this;
	},
	
	/**
	 * 销毁对象
	 * @memberOf SinaEditor._.SimpleDragger#
	 */
	destroy:function(){
		this.__drag.destroy();
	}
});
