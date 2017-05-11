/**
 * 对话框，继承自{@link SinaEditor._.Panel}
 * event:
 * 		beforeDrag,
 * 		drag,
 * 		afterDrag,
 * 		beforeShow,
 * 		show,
 * 		beforeHidden,
 * 		hidden,
 * @class 对话框类
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-25
 */
SinaEditor._.Dialog=function(parent,node){
	var me=this;
	
	this.__dragger=null;
	this.__isBindUpadateAreaEvent=false;
	this.__isBindUpdateIE6AreaEvent=false;
	
	//拖拽时的事件句柄
	this.__beforeDragHandle=function(){
		me.__updateDraggerArea();
		me.__eventDispatcher.dispatchEvent("beforedrag");
	};
	this.__dragHandle=function(){
		if(me.__isSetAdamant) {
			me.__updateIframe();
		}
		me.__eventDispatcher.dispatchEvent("drag");
	};
	this.__afterDragHandle=function(){
		if(me.__isFixed && SinaEditor.env.$IE6) {
			me.__updateIE6FCOrgPosition();
		}
		me.__eventDispatcher.dispatchEvent("afterdrag");
	};
	
	this.__updateDraggerAreaHandle=function(){
		setTimeout(function(){
			me.__updateDraggerArea();
		},1);
	};
	
	this.__setMiddleHandle=function(){
		me.setMiddle();
	};
	
	
}.$extends(SinaEditor._.Panel).$define({
	
	/**
	 * 设置模板
	 * @param {Object} tpl 要设置模板的key:value对应object
	 * @memberOf SinaEditor._.Dialog#
	 */
	setTemplate:function(tpl){
		SinaEditor._.Dialog.$super.setTemplate.call(this,tpl);
		this.__initTitleBar();
		this.setDragger(SinaEditor._.SimpleDragger);
		return this;
	},
	
	/**
	 * 设置内容
	 * @param {String} content
	 * @memberOf SinaEditor._.Dialog#
	 */
	setContent:function(content){
		if(!this.nodes.content){
			return this;
		}
		
		this.nodes.content.innerHTML=new SinaEditor.$abstract.Template(content).evaluate(this.__getNodes(content,"i"));
		this.__addContentNodes(this.__getNodes(content));
		
		return this;
	},
	/**
	 * 对窗口的缩放，遮罩层的修正。
	 * @param {boolean} state 是否对resize事件的监听
	 * @memberOf SinaEditor._.Dialog#
	 */
	setFixed:function(state){
		SinaEditor._.Dialog.$super.setFixed.call(this,state);
		if(state){
			SinaEditor.ev.add(window, 'resize', this.__setMiddleHandle);
		}else{
			SinaEditor.ev.remove(window,'resize',this.__setMiddleHandle);
		}
		this.__updateDraggerArea();
		return this;
	},
	
	/**
	 * 设置居中，对话框会以y轴的黄金分割率来居中显示
	 * @memberOf SinaEditor._.Dialog#
	 */
	setMiddle:function(){
		var areaHeight=this.__getDocumentSize().height - this.height,
			goldenSection=(Math.sqrt(5)-1)/2,
			totalSection=1,
			goldenSectionY=areaHeight * goldenSection / (goldenSection + totalSection),
			middleX=this.__getDocumentSize().width/2-this.width/2;
			
			if(!this.__isFixed){
				goldenSectionY+=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
				middleX+=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
			}

		this.setPosition({
			x:Math.max(middleX,0),
			y:Math.max(goldenSectionY,0)
		});
		
		return this;
	},
	
	/**
	 * 锁定在窗口内拖动。
	 * @param {boolean} state 是否锁定。
	 * @memberOf SinaEditor._.Dialog#
	 */
	setAreaLocked:function(state){
		if(!this.__dragger){
			return this;
		}
		
		this.__dragger.setLock(state);
		return this;
	},
	
	/**
	 * 设置对话框大小
	 * @memberOf SinaEditor._.Dialog#
	 * @param {Object} p
	 * 					width:Number
	 * 					height:Number
	 */
	setSize:function(p){
		if(!this.__isInited) {
			this.__initEntity();
		}
		
		if(this.nodes.content){
			if(typeof p.width!=="undefined") {
				this.nodes.content.style.width=p.width+"px";
			}
			if(typeof p.height!=="undefined") {
				this.nodes.content.style.height=p.height+"px";
			}
		}else{
			if(typeof p.width!=="undefined") {
				this.__entity.style.width=p.width+"px";
			}
			if(typeof p.height!=="undefined") {
				this.__entity.style.height=p.height+"px";
			}
		}
		
		return this;
	},
	
	/**
	 * 设置拖拽器,以通过标题栏拖拽对话框
	 * @memberOf SinaEditor._.Dialog#
	 * @param {IDragger} draggerConstructor
	 */
	setDragger:function(draggerConstructor){
		if(!this.nodes.titleBar || !draggerConstructor){
			return this;
		}
		
		if(!this.__dragger){
			this.__dragger=new draggerConstructor();
		}else if(this.__dragger.constructor===draggerConstructor){
			return this;
		}

		this.__updateDragger(draggerConstructor);
		return this;
	},
	/**
	 * 清除对话框
	 * @memberOf SinaEditor._.Dialog#
	 */
	destroy:function(){
		if(!this.__entity){
			return;
		}
		SinaEditor._.Dialog.$super.destroy.call(this);
		SinaEditor.ev.remove(window,'resize',this.__updateDraggerAreaHandle);
		SinaEditor.ev.remove(window,'resize',this.__setMiddleHandle);
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 * @param {Object} nodes
	 */
	__addContentNodes:function(nodes){
		var nds=this.nodes,
			k;
		
		for(k in nodes){
			nds[k]=nodes[k];
		}
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 * @param {Object} draggerConstructor
	 */
	__updateDragger:function(draggerConstructor){
		
		if (this.__dragger.constructor !== draggerConstructor) {
			this.__dragger.removeEventListener("beforedrag", this.__beforeDragHandle)
				.removeEventListener("drag", this.__dragHandle)
				.removeEventListener("afterdrag", this.__afterDragHandle);
			
			this.__dragger.destroy();
			this.__dragger=new draggerConstructor();
		}
		
		this.__dragger.setDrag(this.nodes.titleBar,this.__entity,false);
		this.__dragger.addEventListener("beforedrag", this.__beforeDragHandle)
				.addEventListener("drag", this.__dragHandle)
				.addEventListener("afterdrag", this.__afterDragHandle);
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 */
	__updateDraggerArea:function(){
		var l,t,r,b;
		if(this.__isFixed){
			l=SinaEditor.env.$IE6?document.documentElement.scrollLeft:0;
			t=SinaEditor.env.$IE6?document.documentElement.scrollTop:0;
			r=SinaEditor.env.$IE6?document.documentElement.scrollLeft + this.__getDocumentSize().width-this.width
				:this.__getDocumentSize().width-this.width;
				
			b=SinaEditor.env.$IE6?document.documentElement.scrollTop + this.__getDocumentSize().height-this.height
				:this.__getDocumentSize().height-this.height;
		}else{
			l=0;
			t=0;
			r=document.documentElement.scrollWidth-this.width;
			b=document.documentElement.scrollHeight-this.height;
		}
		this.__dragger.setArea({
			left:l,
			top:t,
			right:r,
			bottom:b
		});
	},
	
	/**
	 * 初始化标题栏
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 */
	__initTitleBar:function(){
		if(!this.nodes.titleBar){
			return;
		}
		var tb=this.nodes.titleBar;
			tb.style.cursor = "move";
			if(SinaEditor.env.$IE){
				SinaEditor.ev.add(tb, 'selectstart', function(){
					return false;
				});
			}else{
				tb.style.MozUserSelect="none";
			}
	},
	
	/**
	 * 获取当前可见区域的尺寸
	 * @inner
	 * @memberOf SinaEditor._.Dialog#
	 */
	__getDocumentSize:function(){
		var w=document.documentElement.clientWidth || document.body.clientWidth,
			h=document.documentElement.clientHeight || document.body.clientHeight;
			
		return {width:w,height:h};
	}
});
