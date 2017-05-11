/**
 * 缓动策略类
 * @class 缓动策略类
 * @param {Number} startValue 起始值
 * @param {Number} endValue 结束值
 * @param {Number} duration 缓动持续时间(s)
 * @param {Function} motion 缓动公式
 */
SinaEditor._.TweenStrategy=function(startValue,endValue,duration,motion){
	this.startValue=startValue || 0;
	this.endValue=endValue || 0;
	this.duration=duration || 0;
	this.motion=motion || SinaEditor._.Transition.simple;
	this.__eventDispatcher=new SinaEditor._.EventDispatcher(this);
}.$define({
	
	/**
	 * 缓动公式
	 */
	motion:null,
	
	/**
	 * 缓动持续时间
	 */
	duration:0,
	
	/**
	 * 起始值
	 */
	startValue:0,
	
	/**
	 * 结束值
	 */
	endValue:0,
	
	_itvID:0,
	
	_isTweenning:false,
	
	/**
	 * 添加事件
	 * @memberOf SinaEditor._.TweenStrategy#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	addEventListener:function(type,handle){
		this.__eventDispatcher.addEventListener(type,handle);
		return this;
	},
	
	/**
	 * 移除事件
	 * @memberOf SinaEditor._.TweenStrategy#
	 * @param {String} type 事件类型
	 * @param {Function} handle
	 */
	removeEventListener:function(type,handle){
		this.__eventDispatcher.removeEventListener(type,handle);
		return this;
	},
	
	/**
	 * 开始缓动效果
	 * @memberOf SinaEditor._.TweenStrategy#
	 */
	start:function(){
		if(this._isTweenning){
			return;
		}
		this._isTweenning=true;
		
		var me=this,
			t,
			sv=this.startValue,
			ev=this.endValue,
			d=this.duration,
			value,
			startTime=(new Date()).getTime();
			
		this._itvID=window.setInterval(function(){
			t=((new Date()).getTime()-startTime)/1000;
			if(t>me.duration) {
				t=me.duration;
			}
			value=me.motion(t,sv,ev-sv,d);
			if(me.onTween) {
				me.onTween(value);
			}
			me.__eventDispatcher.dispatchEvent("tween",value);
			if(t===me.duration) {
				me.stop();
			}
		},25);
		return this;
	},
	
	/**
	 * 停止缓动
	 * @memberOf SinaEditor._.TweenStrategy#
	 */
	stop:function(){
		window.clearInterval(this._itvID);
		this._isTweenning=false;
		if(this.onEnd) {
			this.onEnd();
		}
		this.__eventDispatcher.dispatchEvent("end");
		return this;
	},
	
	/**
	 * 在缓动期间触发
	 * @memberOf SinaEditor._.TweenStrategy#
	 * @param {Number} value 当前返回的缓动值
	 */
	onTween:function(value){},
	
	/**
	 * 缓动结束时触发
	 * @memberOf SinaEditor._.TweenStrategy#
	 */
	onEnd:function(){}
});