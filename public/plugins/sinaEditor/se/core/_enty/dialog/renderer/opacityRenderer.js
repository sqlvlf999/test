/**
 * 透明度渐变的呈现类,实现了IRenderer接口
 * 		事件：<br>
 * 			beforeShow 开始显示之前被触发,
 * 			show 显示完成后被触发,
 * 			beforeHidden 开始隐藏前被触发,
 * 			hidden 隐藏完成后被触发
 * @class 透明度渐变的呈现类,实现了IRenderer接口
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-29
 */
SinaEditor._.OpacityRenderer=function(){
	/**
	 * 是否允许显示对象
	 */
	this.__canShow=true;
	
	/**
	 * 是否允许隐藏对象
	 */
	this.__canHidden=true;
	
	this.__node=null;
	this.__tween=new SinaEditor._.TweenStrategy(0,0,0.6,SinaEditor._.Transition.strongEaseOut);
	this.__state="";
	this.__lastState="";
	this.__value=0;
	this.__node=null;
	
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	
	this.__initTweenEvent();
}.$implements(SinaEditor._.IRenderer).$define({
	
	/**
	 * 是否允许显示对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 */
	setCanShow:function(state){
		this.__canShow=!!state;
	},
	
	/**
	 * 是否允许隐藏对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 */
	setCanHidden:function(state){
		this.__canHidden=!!state;
	},
	
	/**
	 * 显示对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {Object} node
	 */
	show:function(node){
		var tn=this.__tween;
		tn.stop();
		SinaEditor.util.dom.setStyle(node,"opacity",this.__value);
		node.style.display="";
		this.__node=node;
		this.__state="show";
		this.__eventDispatcher.dispatchEvent("beforeShow");
		if(this.__canShow){
			tn.startValue=this.__value;
			tn.endValue=1;
			tn.start();
		}
		return this;
	},
	
	/**
	 * 隐藏对象
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {Object} node
	 */
	hidden:function(node){
		var tn=this.__tween;
		
		tn.stop();
		this.__node=node;
		this.__state="hidden";
		this.__eventDispatcher.dispatchEvent("beforeHidden");
		if(this.__canHidden){
			tn.startValue=this.__value;
			tn.endValue=0;
			tn.start();
		}
		return this;
	},
	
	/**
	 * 添加事件
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memverOf SinaEditor._.OpacityRenderer#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * @inner
	 * @memverOf SinaEditor._.OpacityRenderer#
	 */
	__initTweenEvent:function(){
		var me=this;
		this.__tween.addEventListener("tween",function(v){
			me.__value=v;
			SinaEditor.util.dom.setStyle(me.__node,"opacity",v);
		});
		this.__tween.addEventListener("end",function(){
			if (me.__node && me.__node.style.filter) {
				me.__node.style.filter="";
			}
			if(me.__state!=="" && me.__state!==me.__lastState){
				me.__lastState=me.__state;
				me.__eventDispatcher.dispatchEvent(me.__state);
			}
			if(me.__state==="hidden") {
				me.__node.style.display="none";
			}
		});
	}
});