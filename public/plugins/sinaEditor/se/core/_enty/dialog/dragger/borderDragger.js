/**
 * 边框拖拽的拖拽器类,实现了IDragger接口
 * 边框形式的拖拽器
 * event:
 * 		fterDrag 在托拽完成后触发<br>
 * @class 边框形式的拖拽器
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-11-04
 */
SinaEditor._.BorderDragger=function(){
	this.__drag=null;
	this.__isBindEvent=false;
	this.__border=null;
	this.__dragNode=null;
	this.__isCreated=false;
	this.__tweenX=new SinaEditor._.TweenStrategy(0,0,0.5,SinaEditor._.Transition.strongEaseOut);
	this.__tweenY=new SinaEditor._.TweenStrategy(0,0,0.5,SinaEditor._.Transition.strongEaseOut);
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
	
}.$implements(SinaEditor._.IDragger).$define({
	
	/**
	 * 添加事件监听
	 * @memberof SinaEditor._.BorderDragger#
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
	 * @memberof SinaEditor._.BorderDragger#
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
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Object} node 获取鼠标捕获事件的节点
	 * @param {Object} attachNode 跟随鼠标移动的节点
	 * @param {Boolean} isDragCapureNode 是否拖拽获取鼠标捕获事件的节点
	 */
	setDrag:function(node,attachNode,isDragCapureNode){
		if(!this.__isCreated){
			this.__createBorder(attachNode);
			this.__initTweenEvent(attachNode);
		}
		
		this.__drag=new SinaEditor._.Drag(node,this.__border,isDragCapureNode);
		this.__dragNode=attachNode;
		this.__initDragEvent();
		return this;
	},
	
	/**
	 * 设置是否锁定拖拽区域
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Boolean} state
	 */
	setLock:function(state){
		this.__drag.isLock=!!state;
		return this;
	},
	
	/**
	 * 设置锁定的拖拽区域的范围
	 * @memberof SinaEditor._.BorderDragger#
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
	 * 清除节点。
	 * @memberof SinaEditor._.BorderDragger#
	 */
	destroy:function(){
		this.__drag.destroy();
	},
	
	/**
	 * @inner
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Object} node
	 */
	__createBorder:function(node){
		this.__border=SinaEditor.util.dom.createDom("div");
		var st=this.__border.style;
		st.border="2px dashed #BCC4D0";
		st.position="absolute";
		st.display="none";
		st.backgroundColor="transparent";
		st.MozUserSelect="none";
		document.body.appendChild(this.__border);
		this.__isCreated=true;
	},
	
	/**
	 * @inner
	 * @memberof SinaEditor._.BorderDragger#
	 */
	__initDragEvent:function(){
		if(this.__isBindEvent){
			return;
		}
		
		var me=this,
			bst=this.__border.style,
			nst=this.__dragNode.style,
			twX=this.__tweenX,
			twY=this.__tweenY;
			
		this.__drag.addEventListener("beforeDrag",function(){
			bst.zIndex=nst.zIndex+1;
			bst.position=nst.position;
			bst.width=me.__dragNode.offsetWidth-4+"px";
			bst.height=me.__dragNode.offsetHeight-4+"px";
			bst.left=parseInt(nst.left,10)+"px";
			bst.top=parseInt(nst.top,10)+"px";
			bst.display="";
		});
		
		this.__drag.addEventListener("afterDrag",function(){
			if (SinaEditor.env.$IE6) {
				nst.left = parseInt(bst.left,10) + "px";
				nst.top = parseInt(bst.top,10) + "px";
				bst.display="none";
				me.__eventDispatcher.dispatchEvent("afterDrag");
			}
			else {
				twX.startValue=parseInt(nst.left,10);
				twX.endValue=parseInt(bst.left,10);
				
				twY.startValue=parseInt(nst.top,10);
				twY.endValue=parseInt(bst.top,10);
				
				twX.start();
				twY.start();
			}
		
		});
		this.__isBindEvent=true;
	},
	
	/**
	 * @inner
	 * @memberof SinaEditor._.BorderDragger#
	 * @param {Object} node
	 */
	__initTweenEvent:function(node){
		var nst=node.style,
			bst=this.__border.style,
			me=this;
			
		this.__tweenX.addEventListener("tween",function(v){
			nst.left=v+"px";
		});
		
		this.__tweenY.addEventListener("tween",function(v){
			nst.top=v+"px";
		});
		
		this.__tweenX.addEventListener("end",function(){
			bst.display="none";
			me.__eventDispatcher.dispatchEvent("afterDrag");
		});
	}
});
