/**
 * @class 模态对话框
 * @namespace SinaEditor._
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-26
 */
SinaEditor._.ModuleDialog=function(tplConfig,iconSet,cfg){
	this.__bgShadow=null;
	this.__dialog=null;
	this.__isInitBgShadow=false;
	this.__tplConfig=tplConfig;
	this.__iconSet=iconSet;
	this.__dialogQueue=[];
	this.__zIndex=1024;
	this.__cfg=cfg || {};
}.$define({
	
	/**
	 * alert显示的对话框
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {String}  text 对话框显示的文本
	 * @param {Object}  cfg 对话框的配置参数
	 * 						funcOk {Function} "确定"按钮执行的方法
	 * 						textOk {String} "确定"按钮的文本
	 * 						funcClose {Function} "关闭"按钮执行的方法
	 * 						funcBeforeClose {Function} 点"关闭"按钮后,对话框在关闭前执行的方法
	 * 						title {String} 标题
	 * 						icon {String} 显示图标 ["01","01","03","04"]
	 * 						width {Number} 宽度
	 * 						height {Number} 高度
	 * 						subText {String} 次级文本
	 * 						bgShadowOpacity {Number} 背景阴影层的透明度 0-1,小于0为不显示
	 * 						renderer {IRenderer} 实现呈现方式接口的类
	 * 						dragger {IDragger} 实现拖拽方式接口的类
	 * 						isAdamant {Boolean} 是否显示背景iframe以挡住select/flash之类的讨厌的东东
	 */
	alert:function(text,cfg){
		cfg=cfg || {};
		var dlg=this.__createMessageDialog(this.__tplConfig.alert,cfg);
		if(dlg.nodes.text) {
			dlg.nodes.text.innerHTML=text || "";
		}
		
		dlg.show(cfg.renderer || this.__cfg.renderer)
			.addEventListener("hidden",function(){
				this.destroy();
			});
		if(dlg.nodes.linkOk && dlg.nodes.linkOk.style.display!=="none") {
			dlg.nodes.linkOk.focus();
		}
		return dlg;
	},
	
	/**
	 * 确认型对话框
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {String}  text 对话框显示的文本
	 * @param {Object}  cfg 对话框的配置参数
	 * 						funcOk {Function} 点击"确定"按钮执行的方法
	 * 						textOk {String} "确定"按钮的文本
	 * 						funcCancel {Function} 点击"取消"按钮执行的方法
	 * 						textCancel {String} "取消"按钮的文本
	 * 						funcClose {Function} "关闭"按钮执行的方法
	 * 						funcBeforeClose {Function} 点"关闭"按钮后,对话框在关闭前执行的方法 
	 * 						defaultButton {Number} 要聚焦的按钮，1 表示"确定"按钮默认聚焦，0 表示"取消"按钮默认聚焦，默认是"确定"按钮聚焦
	 * 						title {String} 标题
	 * 						icon {String} 显示图标 ["01","01","03","04"]
	 * 						width {Number} 宽度
	 * 						height {Number} 高度
	 * 						subText {String} 次级文本
	 * 						bgShadowOpacity {Number} 背景阴影层的透明度 0-1,小于0为不显示
	 * 						renderer {IRenderer} 实现呈现方式接口的类
	 * 						dragger {IDragger} 实现拖拽方式接口的类
	 * 						isAdamant {Boolean} 是否显示背景iframe以挡住select/flash之类的讨厌的东东
	 */
	confirm:function(text,cfg){
		cfg=cfg || {};
		
		var dlg=this.__createMessageDialog(this.__tplConfig.confirm,cfg),
			me=this;
			
		if(dlg.nodes.text) {
			dlg.nodes.text.innerHTML=text || "";
		}
		
		if(dlg.nodes.btnCancel){
			dlg.nodes.btnCancel.innerHTML=cfg.textCancel || "取消";
			SinaEditor.ev.add(dlg.nodes.btnCancel,'click',function(ev){
				if(cfg.funcCancel) {
					cfg.funcCancel.call(dlg);
				}
				dlg.hidden(cfg.renderer || me.__cfg.renderer);
				SinaEditor.ev.stopEvent(ev);
			});
			if(dlg.nodes.linkCancel) {
				SinaEditor.ev.add(dlg.nodes.linkCancel,'keydown',function(){
					var e = me.__getEvent();
					if (e.keyCode == "13") {
						if(cfg.funcCancel) {
							cfg.funcCancel.call(dlg);
						}
						dlg.hidden(cfg.renderer || me.__cfg.renderer);
					}
				});
			}
		}
		
		dlg.show(cfg.renderer || me.__cfg.renderer)
			.addEventListener("hidden",function(){
				this.destroy();
			});
			
		if(parseInt(cfg.defaultButton,10)===0) {
			if(dlg.nodes.linkCancel && dlg.nodes.linkCancel.style.display!=="none") {
				dlg.nodes.linkCancel.focus();
			}
		}else{
			if(dlg.nodes.linkOk && dlg.nodes.linkOk.style.display!=="none") {
				dlg.nodes.linkOk.focus();
			}
		}
		return dlg;
	},
	
	/**
	 * 创建自定义对话框
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {Object} cfg
	 * 					content 对话框的内容(支持模板方式)
	 * 					funcBeforeClose {Function} 点"关闭"按钮后,对话框在关闭前执行的方法
	 * 					funcClose {Function} "关闭"按钮执行的方法
	 * 					title 标题
	 * 					width 宽度
	 * 					height 高度
	 * 					bgShadowOpacity {Number} 背景阴影层的透明度 0-1,小于0为不显示
	 * 					tpl 对话框的模板
	 * 					isAdamant {Boolean} 是否显示背景iframe以挡住select/flash之类的讨厌的东东
	 * @param {String} name 对话框的名称
	 */
	create:function(cfg){
		var me=this;
		
		cfg=cfg || {};
		var dlg=new SinaEditor._.Dialog();
		dlg.setTemplate(cfg.tpl || this.__tplConfig.customs);
		if(cfg.content) {
			dlg.setContent(cfg.content);
		}
		if(cfg.width && !isNaN(cfg.width)) {
			dlg.setSize({width:cfg.width});
		}
		if(cfg.height && !isNaN(cfg.height)) {
			dlg.setSize({height:cfg.height});
		}
		return this.__initDialog(dlg,cfg);
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {Object} tpl
	 * @param {Object} cfg
	 */
	__createMessageDialog:function(tpl,cfg){
		var dlg=new SinaEditor._.Dialog(),
			me=this,
			i;

		dlg.setTemplate(tpl);
		
		if(cfg.width && !isNaN(cfg.width)) {
			dlg.setSize({width:cfg.width});
		}
		if(cfg.height && !isNaN(cfg.height)) {
			dlg.setSize({height:cfg.height});
		}
		if(dlg.nodes.subText) {
			dlg.nodes.subText.innerHTML=cfg.subText || "";
		} 
		if(dlg.nodes.icon){
			dlg.nodes.icon.className=this.__iconSet[cfg.icon || "01"]["class"];
			//dlg.nodes.icon.alt=this.__iconSet[cfg.icon || "01"]["alt"];
			dlg.nodes.icon.alt=this.__iconSet[cfg.icon || "01"].alt;
		}
		if(dlg.nodes.btnOk){
			dlg.nodes.btnOk.innerHTML=cfg.textOk || "确定";
			SinaEditor.ev.add(dlg.nodes.btnOk,'click',function(ev){
				dlg.hidden(cfg.renderer || me.__cfg.renderer);
				if(cfg.funcOk) {
					cfg.funcOk.call(dlg);
				}
				SinaEditor.ev.stopEvent(ev);
			});
		}
		
		if(dlg.nodes.linkOk) {
			SinaEditor.ev.add(dlg.nodes.linkOk,'keydown',function(){
				var e = me.__getEvent();
				if (e.keyCode == "13") {
					dlg.hidden(cfg.renderer || me.__cfg.renderer);
					if(cfg.funcOk) {
						cfg.funcOk.call(dlg);
					}
				}
			});
		}
		
		dlg.setDragger(cfg.dragger || me.__cfg.dragger)
			.setFixed(true)
			.setAreaLocked(true);
		
		return this.__initDialog(dlg,cfg);
	},
	
	/**
	 * 初始化对话框，初始化标题栏、关闭按钮、显示的位置和模式及拖拽的模式
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 */
	__initDialog:function(dlg,cfg){
		var me=this;
		
		if(dlg.nodes.titleName) {
			dlg.nodes.titleName.innerHTML=cfg.title || "提示";
		}
		
		if(dlg.nodes.btnClose){
			SinaEditor.ev.add(dlg.nodes.btnClose,'click',function(){
				var isCanHidden=true;
				if(cfg.funcBeforeClose) {
					isCanHidden=cfg.funcBeforeClose.call(dlg) !== false;
				}
				if(cfg.funcClose) {
					cfg.funcClose.call(dlg);
				}
				if(isCanHidden) {
					dlg.hidden();
				}
			});
			SinaEditor.ev.add(dlg.nodes.btnClose,'mousedown',function(ev){
				SinaEditor.ev.stopEvent(ev);
			});
		}
		
		dlg.setPosition({z:me.__zIndex})
			.setRenderer(cfg.renderer || this.__cfg.renderer)
			.setDragger(cfg.dragger || this.__cfg.dragger)
			.setMiddle()
			.addEventListener("beforeHidden",function(){
				me.__updateDialogQueue(this,"remove");
			})
			.addEventListener("beforeShow",function(){
				var that=this;
				if(!me.__isInitBgShadow){
					me.__initBGShadow(this,cfg.isAdamant || me.__cfg.isAdamant);
				}
				me.__setBGShadowOpacity(cfg.bgShadowOpacity!==0?cfg.bgShadowOpacity || 0.4:cfg.bgShadowOpacity);
				window.setTimeout(function(){
					me.__bgShadow.show();
					me.__updateDialogQueue(that,"add");
				},1);
			});
			
			
		//动态绑定一些方法，兼容之前的版本，以后可去掉
		dlg.setTitle=function(title){
			if(this.nodes.titleName) {
				this.nodes.titleName.innerHTML=title;
			}
		};
		dlg.setHelp=function(url){
			if(this.nodes.btnHelp) {
				this.nodes.btnHelp.href=url;
			}
		};
		dlg.close=function(){
			this.hidden();
		};
		dlg.getNodes=function(){
			return this.nodes;
		};
		dlg.getX=function(){
			return this.x;
		};
		dlg.getY=function(){
			return this.y;
		};
		dlg.getWidth=function(){
			return this.width;
		};
		dlg.getHeight=function(){
			return this.height;
		};
		
		return dlg;
	},
	
	/**
	 * 初始化背景阴影层
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 */
	__initBGShadow:function(dlg,isAdamant){
		var w=this.__getDocumentSize().width,
			h=this.__getDocumentSize().height,
			me=this;
			
		this.__bgShadow=new SinaEditor._.Panel();
		this.__bgShadow.setTemplate('<div id="#{panel}" style="background-color:black"></div>')
			.setSize({
				width:w,
				height:h
			})
			.setAdamant(isAdamant)
			.setFixed(true)
			.setPosition({x:0,y:0,z:me.__zIndex});
		SinaEditor.ev.add(window,'resize',function(){
			me.__bgShadow.setPosition({
				x:0,y:0
			})
			.setSize({
				width:me.__getDocumentSize().width,
				height:me.__getDocumentSize().height
			});
		});
		
		this.__bgShadow.nodes.panel.parentNode.insertBefore(this.__bgShadow.nodes.panel,dlg.nodes.panel);
		
		this.__isInitBgShadow=true;
	},
	
	/**
	 * 更新对话框的显示队列,并且会更新阴影层到当前的对话框后面
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 */
	__updateDialogQueue:function(dialog,op){
		var i,
			dlg;
		
		if(op==="add"){
			this.__dialogQueue.push(dialog);
		}else if(op==="remove"){
			i=this.__dialogQueue.length;
			while(i--){
				if(this.__dialogQueue[i]===dialog) {
					this.__dialogQueue.splice(i,1);
				} 
			}
		}
		
		if(this.__dialogQueue.length===0){
			this.__bgShadow.hidden();
		}else{
			dlg=this.__dialogQueue[this.__dialogQueue.length-1];
			dlg.nodes.panel.parentNode.appendChild(dlg.nodes.panel);			
			this.__bgShadow.nodes.panel.parentNode.insertBefore(this.__bgShadow.nodes.panel,dlg.nodes.panel);
			if(this.__bgShadow.__iframe) {
				this.__bgShadow.__iframe.parentNode.insertBefore(this.__bgShadow.__iframe,this.__bgShadow.nodes.panel);
			}
			if(dlg.nodes.linkOk && dlg.nodes.linkOk.style.display!=="none") {
				dlg.nodes.linkOk.focus();
			}
		}
	},
	
	/**
	 * 设置背景阴影层的透明度
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
	 * @param {Number} v
	 */
	__setBGShadowOpacity:function(v){
		v=isNaN(v)?0:Math.max(Math.min(v,1),0);
		SinaEditor.util.dom.setStyle(this.__bgShadow.nodes.panel,"opacity",v);
	},
	
	/**
	 * 获取可见区域的尺寸
	 */
	__getDocumentSize:function(){
		var w=document.documentElement.clientWidth || document.body.clientWidth,
			h=document.documentElement.clientHeight || document.body.clientHeight;
			
		return {width:w,height:h};
	},
	
	/**
	 * @inner
	 * @memberOf SinaEditor._.ModuleDialog#
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
	}
	
});
