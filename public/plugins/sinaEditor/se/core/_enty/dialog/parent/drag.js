/**
 * 托拽类
 * event<br>
 * 		beforeDrag 在准备托拽前触发,
 * 		afterDrag 在托拽完成后触发,
 * 		drag 托拽时触发
 * @class 托拽类
 * @created 2010-10-21
 * @author Random | YangHao@staff.sina.com.cn
 * @example
 * 	var a=new Ui.Drag($p.nodes.panel,[p2.nodes.panel,p3.nodes.panel]);
 *		a.addEventListener("beforeDrag",function(){
 *			trace("beforeDrag");
 *		}).addEventListener("afterDrag",function(){
 *			trace("afterDrag");
 *		}).addEventListener("drag",function(){
 *			trace("draging");
 *		});
 *		a.isLock=true;
 *		a.lockArea={
 *			left:0,
 *			top:0,
 *			right:500,
 *			bottom:500
 *		};
 * @param {Object} captureNode 捕获拖拽的节点
 * @param {Array} attachNodes 被拖拽的节点,可传入数组,也可传入单独的节点,不传些参数时,为捕获拖拽的节点
 * @param {Boolean} isDragCapureNode 是否拖拽捕获拖拽的节点(默认为true)
 */
SinaEditor._.Drag=function(captureNode,attachNodes,isDragCapureNode){
	var me=this;
	
	this.canDrag=true;
	this.isLock=false;
	this.lockArea={
		left:0,
		right:0,
		top:0,
		bottom:0
	};
	
	this.__captureNode=captureNode;
	this.__dragNodes=[];
	this.__deltaX=[];
	this.__deltaY=[];
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	this.__isDraging=false;
	this.__canDragX=true;
	this.__canDragY=true;
	
	this.__dragHandle=function(){
		me.__drag();
	};
	this.__mouseDownHandle=function(){
		me.__isDraging=true;
		me.__eventDispatcher.dispatchEvent("beforeDrag");
		me.__setCapture(true);
	};
	this.__mouseUpHandle=function(){
		if(me.__isDraging) {
			me.__eventDispatcher.dispatchEvent("afterDrag");
		}
		me.__isDraging=false;
		me.__setCapture(false);
	};
	
	this.__initNodes(captureNode,attachNodes,isDragCapureNode);
	this.__initCaputerNode();
	
}.$define({
	
	/**
	 * 添加事件监听
	 * @memberOf SinaEditor._.Drag#
	 * @param {String} type
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 */
	__getEvent : function() {
		if (window.event) {
			return window.event;
		}
		var o = arguments.callee.caller;
		var e;
		var n = 0;
		while(o !== null && n < 40){
			e = o.arguments[0];
			if (e && (e.constructor == Event || e.constructor == MouseEvent)) {
				return e;
			}
			n ++;
			o = o.caller;
		}
		return e;
	},
	
	/**
	 * 移除事件监听
	 * @memberOf SinaEditor._.Drag#
	 * @param {String} type
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * 清除节点
	 * @memberOf SinaEditor._.Drag#
	 */
	destroy:function(){
		SinaEditor.ev.remove(this.__captureNode, 'mousedown', this.__mouseDownHandle);
		SinaEditor.ev.remove(document, 'mouseup', this.__mouseUpHandle);
		this.__captureNode=null;
		this.__dragNodes=null;
	},
	
	/**
	 * 初始化托拽的节点
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 * @param {Object} captureNode
	 * @param {Object} attachNodes
	 * @param {Boolean} isDragCapureNode
	 */
	__initNodes:function(captureNode,attachNodes,isDragCapureNode){
		if(attachNodes){
			if(attachNodes instanceof Array) {
				this.__dragNodes=attachNodes;
			} else {
				this.__dragNodes.push(attachNodes);
			}
			if((typeof isDragCapureNode ==="undefined" || isDragCapureNode)) {
				this.__dragNodes.push(this.__captureNode);
			}
		}else{
			this.__dragNodes.push(this.__captureNode);
		}
		
		var dns=this.__dragNodes,
			i=dns.length;

		while(i--){
			if(!dns[i].style.position) {
				dns[i].style.position="absolute";
			}
			if(!dns[i].style.left) {
				dns[i].style.left=0;
			}
			if(!dns[i].style.top) {
				dns[i].style.top=0;
			}
		}
	},
	
	/**
	 * 初始化可捕获的节点
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 */
	__initCaputerNode:function(){
		var cn=this.__captureNode,
			me=this;
		
		SinaEditor.ev.add(cn, 'mousedown', this.__mouseDownHandle);
		SinaEditor.ev.add(document, 'mouseup', this.__mouseUpHandle);
	},
	
	/**
	 * 设置捕获状态
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 * @param {Boolean} isCapture
	 */
	__setCapture:function(isCapture){
		
		var cn=this.__captureNode,
			dns=this.__dragNodes,
			evt=this.__getEvent(),
			i=dns.length;
		
		while(i--){
			this.__deltaX[i]=evt.clientX-parseInt(dns[i].style.left,10);
			this.__deltaY[i]=evt.clientY-parseInt(dns[i].style.top,10);
		}
		
		if(isCapture){
			if(SinaEditor.env.$IE){
				cn.setCapture();
				SinaEditor.ev.add(cn, 'mousemove', this.__dragHandle);
			}else{
				SinaEditor.ev.add(document, 'mousemove', this.__dragHandle);
			}
		}else{
			if(SinaEditor.env.$IE){
				cn.releaseCapture();
				SinaEditor.ev.remove(cn, 'mousemove', this.__dragHandle);
			}else{
				SinaEditor.ev.remove(document, 'mousemove', this.__dragHandle);
			}
		}
	},
	
	/**
	 * 拖拽
	 * @inner
	 * @memberOf SinaEditor._.Drag#
	 */
	__drag:function(){
		if(!this.canDrag){
			return;
		}
		
		var dns=this.__dragNodes,
			evt=this.__getEvent(),
			i=dns.length,
			la=this.lockArea,
			dX=0,
			dY=0;
			
		this.__eventDispatcher.dispatchEvent("drag");
		
		while(i--){
			dX=evt.clientX - this.__deltaX[i];
			dY=evt.clientY - this.__deltaY[i];
			
			if (this.isLock) {
				dX = Math.min(Math.max(dX, la.left),la.right);
				dY = Math.min(Math.max(dY, la.top),la.bottom);
			}
			
			dns[i].style.left=dX+"px";
			dns[i].style.top=dY+"px";
		}
	}
});
