/**
 * 显示对象类
 * 		事件：
 * 			beforeShow 开始显示之前被触发
 * 			show 显示完成后被触发
 * 			beforeHidden 开始隐藏前被触发
 * 			hidden 隐藏完成后被触发
 * @class 显示的对象类，可作为绝对定位的对象的基类
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-14
 */
SinaEditor._.DisplayObject=function(parent,node){
	/**
	 * 定义getter的属性 x,y,z,width,height
	 */
	SinaEditor._.defineGetter(this,
		["x","y","z","width","height"],
		[this.__getX,this.__getY,this.__getZ,this.__getWidth,this.__getHeight]);
	
	this.__renderer=null;
	this.__entity=node;
	this.__isInited=false;
	this.__parent=parent || document.body;
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	
	//renderer的事件配置
	var ed=this.__eventDispatcher;
	this.__onBeforeShow=function(){
		ed.dispatchEvent("beforeShow");
	};
	this.__onShow=function(){
		ed.dispatchEvent("show");
	};
	this.__onBeforeHidden=function(){
		ed.dispatchEvent("beforeHidden");
	};
	this.__onHidden=function(){
		ed.dispatchEvent("hidden");
	};
	
	this.__updateRenderer(SinaEditor._.SimpleRenderer);
}.$define({
	
	/**
	 * 设置位置
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Object} p
	 * 					x:Number
	 * 					y:Number
	 * 					z:Number
	 */
	setPosition:function(p){
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		if(typeof p.x!=="undefined") {
			this.__entity.style.left=p.x+"px";
		}
		if(typeof p.y!=="undefined") {
			this.__entity.style.top=p.y+"px";
		}
		if(typeof p.z!=="undefined") {
			this.__entity.style.zIndex=p.z;
		}
		return this;
	},
	
	/**
	 * 设置大小
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Object} p
	 * 					width:Number
	 * 					height:Number
	 */
	setSize:function(p){
		if(!this.__isInited){
			this.__initEntity();
		}
		
		if(typeof p.width!=="undefined") {
			this.__entity.style.width=p.width+"px";
		}
		
		if(typeof p.height!=="undefined") {
			this.__entity.style.height=p.height+"px";
		}
		return this;
	},
	
	setRenderer:function(rendererConstructor){
		if(!this.__isInited) {
			this.__initEntity();
		}
		this.__updateRenderer(rendererConstructor);
		return this;
	},
	
	/**
	 * 显示对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {IRenderer} rendererConstructor
	 */
	show:function(rendererConstructor){
		if(!this.__isInited) {
			this.__initEntity();
		}
		this.__updateRenderer(rendererConstructor);
		this.__renderer.show(this.__entity);
		return this;
	},
	
	/**
	 * 隐藏对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {IRenderer} renderer
	 */
	hidden:function(rendererConstructor){
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		this.__updateRenderer(rendererConstructor);
		this.__renderer.hidden(this.__entity);
		return this;
	},
	
	/**
	 * 设置是否允许显示对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Boolean} state
	 */
	setCanShow:function(state){
		this.__renderer.setCanShow(state);
		return this;
	},
	
	/**
	 * 设置是否允许隐藏对象
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Boolean} state
	 */
	setCanHidden:function(state){
		this.__renderer.setCanHidden(state);
		return this;
	},
	
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * 清除节点
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	destroy:function(){
		if(!this.__entity){
			return;
		}
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		if(this.__entity.parentNode) {
			this.__entity.parentNode.removeChild(this.__entity);
		}
		this.__entity=null;
	},
	
	/**
	 * 初始化节点对象
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__initEntity:function(){
		var st;

		if(!this.__entity) {
			this.__entity=SinaEditor.util.dom.createDom("div");
		}
		st=this.__entity.style;
		
		st.position="absolute";
		st.left=0;
		st.top=0;
		st.zIndex=0;

		if(!this.__entity.parentNode) {
			this.__parent.appendChild(this.__entity);
		}

		this.__isInited=true;
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {Object} rendererConstructor
	 */
	__updateRenderer:function(rendererConstructor){
		if(!rendererConstructor){
			return;
		}
		
		var addEvent=function(){
			this.__renderer.addEventListener("beforeShow",this.__onBeforeShow)
				.addEventListener("show",this.__onShow)
				.addEventListener("beforeHidden",this.__onBeforeHidden)
				.addEventListener("hidden",this.__onHidden);
		};
		
		if(!this.__renderer){
			this.__renderer=new rendererConstructor();
			addEvent.call(this);
		}else if(this.__renderer.constructor!==rendererConstructor){
			this.__renderer.removeEventListener("beforeShow", this.__onBeforeShow)
				.removeEventListener("show", this.__onShow)
				.removeEventListener("beforeHidden", this.__onBeforeHidden)
				.removeEventListener("hidden", this.__onHidden);
				
			this.__renderer=new rendererConstructor();
			addEvent.call(this);
		}
	},
	
	/**
	 * 获取X坐标
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getX:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return parseInt(this.__entity.style.left,10);
	},
	
	/**
	 * 获取Y坐标
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getY:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return parseInt(this.__entity.style.top,10);
	},
	
	/**
	 * 获取对象深度(z坐标)
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getZ:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return parseInt(this.__entity.style.zIndex,10);
	},
	
	/**
	 * 获取宽度
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getWidth:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return this.__getSize(this.__entity,"offsetWidth");
	},
	
	/**
	 * 获取高度
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 */
	__getHeight:function(){
		if(!this.__isInited) {
			this.__initEntity();
		}
		return this.__getSize(this.__entity,"offsetHeight");
	},
	
	/**
	 * 获取尺寸，对象在不可见状态下也能获取到真实的尺寸
	 * @inner
	 * @memberOf SinaEditor._.DisplayObject#
	 * @param {String} p
	 */
	__getSize:function(node,p){
		var et=node,
			v,
			ov=et.style.visibility;
			
		if(et.style.display=="none"){
			et.style.visibility="hidden";
			et.style.display="";
			v=et[p];
			et.style.display="none";
			et.style.visibility=ov;
		}else{
			v=et[p];
		}
		
		return v;
	}
	
});
