/**
 * SimpleRenderer,简单的呈现类,实现了IRenderer接口
 * 		事件：<br>
 * 			beforeShow 开始显示之前被触发
 * 			show 显示完成后被触发
 * 			beforeHidden 开始隐藏前被触发
 * 			hidden 隐藏完成后被触发
 * @class SimpleRenderer,简单的呈现类,实现了IRenderer接口	
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-15			
 */
SinaEditor._.SimpleRenderer=function(){
	/**
	 * 是否允许显示对象
	 */
	this.__canShow=true;
	
	/**
	 * 是否允许隐藏对象
	 */
	this.__canHidden=true;
	
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
}.$implements(SinaEditor._.IRenderer).$define({
	
	/**
	 * 是否允许显示对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 */
	setCanShow:function(state){
		this.__canShow=!!state;
	},
	
	/**
	 * 是否允许隐藏对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 */
	setCanHidden:function(state){
		this.__canHidden=!!state;
	},
	
	/**
	 * 显示对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {Object} node
	 */
	show:function(node){
		this.__eventDispatcher.dispatchEvent("beforeShow");
		if(this.__canShow){
			node.style.display="";
			this.__eventDispatcher.dispatchEvent("show");
		}
		return this;
	},
	
	/**
	 * 隐藏对象
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {Object} node
	 */
	hidden:function(node){
		this.__eventDispatcher.dispatchEvent("beforeHidden");
		if(this.__canHidden){
			node.style.display="none";
			this.__eventDispatcher.dispatchEvent("hidden");
		}
		return this;
	},
	
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.SimpleRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	}
});
