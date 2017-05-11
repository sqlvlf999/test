/**
 * IE6下的fixed控制器，实现在IE6下当滚动条滚动时，固定住对象的功能
 * @class IE6下的fixed控制器，实现在IE6下当滚动条滚动时，固定住对象的功能
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-20
 */
SinaEditor._.IE6FixedController=function(){
	var me=this;
	
	this.node=null;
	this.iframeNode=null;
	this.__orgX=0;
	this.__orgY=0;
	this.__isBindScroll=false;
	
	this.__fixedHandle=function(){
		if(me.node){
			me.node.style.left = document.documentElement.scrollLeft + me.__orgX + "px";
			me.node.style.top = document.documentElement.scrollTop + me.__orgY + "px";
		}
		
		if (me.iframeNode) {
			me.iframeNode.style.left = me.node.style.left;
			me.iframeNode.style.top = me.node.style.top;
		}
	};
	
}.$define({
	
	/**
	 * 设置对象是否为fixed状态
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Boolean} state
	 */
	setFixed:function(node,state){
		this.updateOrgPosition();
		if(state && !this.__isBindScroll){
			SinaEditor.ev.add(window, 'scroll', this.__fixedHandle);
			this.__isBindScroll=true;
		}
		if(!state && this.__isBindScroll){
			SinaEditor.ev.remove(window, 'scroll', this.__fixedHandle);
			this.__isBindScroll=false;
		}
	},
	
	/**
	 * 设置对话框位置。
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Object} fixedState
	 * @param {Object} p
	 */
	setPosition:function(node,fixedState,p){
		if(typeof p.x!=="undefined"){
			if(fixedState){
				node.style.left=p.x + document.documentElement.scrollLeft+"px";
				this.__orgX=parseInt(this.node.style.left,10)-document.documentElement.scrollLeft;
			}else{
				node.style.left=p.x+"px";
			}
		}
		
		if(typeof p.y!=="undefined"){
			if (fixedState) {
				node.style.top=p.y + document.documentElement.scrollTop+"px";
				this.__orgY=parseInt(this.node.style.top,10)-document.documentElement.scrollTop;
			}else{
				node.style.top=p.y+"px";
			}
		}

		if(typeof p.z!=="undefined") {
			node.style.zIndex=p.z;
		}
	},
	
	/**
	 * 获取X的位置。
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Object} fixedState
	 */
	getX:function(node,fixedState){
		if(fixedState){
			return parseInt(node.style.left,10)-document.documentElement.scrollLeft;
		}else{
			return parseInt(node.style.left,10);
		}
	},
	
	/**
	 * 获取Y的位置。
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} node
	 * @param {Object} fixedState
	 */
	getY:function(node,fixedState){
		if(fixedState){
			return parseInt(node.style.top,10)-document.documentElement.scrollTop;
		}else{
			return parseInt(node.style.top,10);
		}
	},
	
	/**
	 * 更新iframe
	 * @memberOf SinaEditor._.IE6FixedController#
	 * @param {Object} isFixed
	 */
	updateIframe:function(isFixed){
		this.setFixed(this.iframeNode,isFixed);
		if(isFixed) {
			this.__fixedHandle();
		}
	},
	
	/**
	 * 更新原始坐标
	 * @memberOf SinaEditor._.IE6FixedController#
	 */
	updateOrgPosition:function(){
		if(!this.node){
			return;
		}
		
		this.__orgX=parseInt(this.node.style.left,10)-document.documentElement.scrollLeft;
		this.__orgY=parseInt(this.node.style.top,10)-document.documentElement.scrollTop;
	},
	
	/**
	 * 清除节点。
	 * @memberOf SinaEditor._.IE6FixedController#
	 */
	destroy:function(){
		SinaEditor.ev.remove(window, 'scroll', this.__fixedHandle);
		this.__isBindScroll=false;
		this.node=null;
		this.iframeNode=null;
	}
});
