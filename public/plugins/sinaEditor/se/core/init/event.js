if(!window.SinaEditor) {
	SinaEditor = {};
}

/**
 * 事件的常用函数封装
 * @namespace
 */
SinaEditor.ev = {};

(function(ns){
	/**
	 * 自定义事件的列表
	 */
	var _customEventList = {};
	//window._customEventList = {};
	//自定义事件，公开,由editor初始化自己的事件机制，可以加载或者不加载
	ns.customEvent = {};
	
	/**
	 * 存储绑定事件的DOM节点和它的唯一ID，如果有的话。
	 * 形式：{唯一ID:DOM节点}
	 */
	var _domReferObj = {};
	
	/**
	 * 存储所有的事件的对象，结合_domReferObj来使用
	 * 形如：{唯一ID:{事件类型:[事件数组({id:唯一标识，func:执行函数})]}}
	 */
	var _eventsFunc = {};
	
	/**
	 * 存储所有的代理事件，使用addEvent，事件全部绑定在这里面
	 * 形如：{唯一ID:{代理的function}}
	 */
	var _proxyFuncs = {};
	
	/**
	 * 代理的事件函数,生成的函数处理所有的事件类型
	 * @param {String} uid 唯一的ID
	 * @param {Object} content 回调函数执行的上下文对象
	 * @param {Array} opt_args 可选参数，回调函数中的初始参数。
	 */
	var _getProxyFunc = function(uid,content,opt_args) {
		var funcs = _eventsFunc[uid];
		return function(e,args) {
			var funcArr = funcs[e.type] || [];
			var i=0;
			args = args || opt_args;
			args.unshift(ns.fixEvent(e));
			for(i=0; funcArr[i]; i++) {
				funcArr[i].func.apply(content, args);
			}
			args.pop();
		};
	};
	
	var _clearEvent = function(elm,type,fHandler,opt) {
		//原生事件
		if(_customEventList[type]) {
			return;
		}
		if(elm.removeEventListener) {
			elm.removeEventListener(type, fHandler ,false);
		} else if(elm.detachEvent) {
			elm.detachEvent('on'+type, fHandler ,false);
		} else {
			elm['on'+type] = null;
		}
	};
	
	/**
	 * 通过传递过来的DOM节点获取唯一ID
	 * @param {Object} elm 传递的DOM节点
	 * @return {String} 唯一ID，如果没有这个ID，将会返回null
	 */
	var _getUidByDom = function(elm) {
		var uid = null;
		for(uid in _domReferObj) {
			if(_domReferObj[uid] === elm) {
				return uid;
			}
		}
		return null;
	};
	
	/**
	 * 统一event事件，让众多浏览器返回的差异值基本保持一致。
	 * @function
	 * @name SinaEditor.ev.fixEvent
	 * @param {Object} e 事件的参数
	 * @return {Object} 修正后的事件
	 */
	ns.fixEvent = function(e) {
		if (!e.target) {
			try {
				//FIREFOX2.0不吃这一套啊，有木有！
				e.target = e.srcElement;
				//mouse事件的统一
				if(e.button) {
					switch(e.button) {
						case 1 :
							e.which = SinaEditor.MOUSEKEY.LEFT;
							break;
						case 4 :
							e.which = SinaEditor.MOUSEKEY.MID;
							break;
						case 2 :
							e.which = SinaEditor.MOUSEKEY.RIGHT;
							break;
					}
				}
			} catch(e){}
			e.pageX = e.x;
			e.pageY = e.y;
		}
		if (typeof e.layerX === 'undefined') {
			e.layerX = e.offsetX;
		}
		if (typeof e.layerY === 'undefined') {
			e.layerY = e.offsetY;
		}
		return e;
	};
	
	/**
	 * 停止事件冒泡和默认行为
	 * @function
	 * @name SinaEditor.ev.stopEvent
	 * @param {Object} ev 事件参数
	 */
	ns.stopEvent = function(ev){
		ev.preventDefault();
		ev.stopPropagation();
    };
	if (SinaEditor.env.$IE < 9) {
		ns.stopEvent = function(ev){
			ev.cancelBubble = true;
			ev.returnValue = false;
		};
	}
	
	/**
	 * 兼容的添加事件的方法。
	 * @function
	 * @name SinaEditor.ev.add
	 * @param {Object} elm 事件对象
	 * @param {Object} type 事件类型
	 * @param {Object} func 回调函数
	 * @param {Object} opt 可选参数 {once:true|false 是否只绑定一次(默认为false),content:执行环境,args:回调函数中的参数}
	 * @return {Integer} 当且仅当opt.once为true,且已经绑定依此后，返回-1。<br>
	 * 其它情况返回一个唯一正整数，可以通过此正整数删除匿名函数绑定的事件。
	 */
	ns.add = function(elm, type, func,opt) {
		//console.log('添加事件：'+type);
		opt = opt || {};
		opt.content = opt.content || elm;
		var uid =  _getUidByDom(elm);
		if(!uid) {
			uid = SinaEditor.util.uniqueKey();
			_domReferObj[uid] = elm;
			_eventsFunc[uid] = {};
		}
		
		var funcObj = _eventsFunc[uid];
			
		if(!funcObj[type]) {
			funcObj[type] = [];
			
			opt.args = opt.args || [];
			if(Object.prototype.toString.apply(opt.args) !== '[object Array]') {
				throw new Exception('opt.args 必须是数组');
			}
			_proxyFuncs[uid] = _getProxyFunc(uid,opt.content,opt.args);
			
			if(!_customEventList[type]) {
				//原生事件
				if(elm.addEventListener) {
					elm.addEventListener(type, _proxyFuncs[uid] ,false);
				} else if(elm.attachEvent) {
					elm.attachEvent('on'+type, _proxyFuncs[uid] ,false);
				} else {
					elm['on'+type] = _proxyFuncs[uid];
				}
			}
		}
		
		if(funcObj[type].length && opt.once) {
			return -1;
		}
		
		var eventId = SinaEditor.util.uniqueKey();
		funcObj[type].push({'func':func,'id':eventId});
		return eventId;
	};
	
	/**
	 * 移除事件
	 * @function
	 * @name SinaEditor.ev.remove
	 * @param {Object} elm 事件对象
	 * @param {Object} type 事件类型
	 * @param {Object|Integer} func 要移除回调函数。<br>
	 * 如果是使用{@link SinaEditor.ev.add}添加事件，可以传递此方法返回的ID进行删除。<br>
	 * 如果没有传递此参数或者传递为null，则清除通过{@link SinaEditor.ev.add}绑定在此节点的事件。
	 * @param {Object} opt 可选参数
	 */
	ns.remove = function(elm,type,fHandler,opt) {
		//console.log('清理事件：'+type);
		var uid =  _getUidByDom(elm);
		if(!uid) {
			//console.log('没有对应点：'+type);
			return;
		}
		
		var funcObj = _eventsFunc[uid];
		if(!fHandler) {
			//console.log('完全清理:'+type)
			delete funcObj[type];
			_clearEvent(elm,type,fHandler,opt);
			return;
		}
		var events = funcObj[type];
		
		if(events) {
			var val = typeof fHandler === 'function' ? 'func' : 'id';
			var i;
			for(i=0; events[i]; i++) {
				if(events[i][val] === fHandler) {
					funcObj[type].splice(i,1);
					break;
				}
			}
			
			//console.log('清理事件,剩下：'+funcObj[type].length);
			
			if(SinaEditor.util.isEmptyObject(funcObj[type])) {
				//console.log('完全清理:'+type)
				delete funcObj[type];
				_clearEvent(elm,type,fHandler,opt);
			}
		}

	};
	
	/**
	 * 执行事件
	 * @function
	 * @name SinaEditor.ev.fire
	 * @param {Object} elm 事件对象,自定义事件
	 * @param {Object} type 事件类型
	 * @param {Object} opt 可选参数，针对的是自定义事件。
	 */
	ns.fire = function(elm,type,opt) {
		//console.log('执行事件：'+type);
		if(_customEventList[type]) {
			//默认事件的触发
			opt = opt || {};
			var uid = _getUidByDom(elm);
			if(uid) {
				_proxyFuncs[uid]({'type':type},opt.args);
			}
		} else {
			//原生事件的触发
			if(elm.fireEvent) {
				elm.fireEvent('on' + type);  
			}
			else{
				var evt = elm.ownerDocument.createEvent('HTMLEvents');  
				evt.initEvent(type,true,true);  
				elm.dispatchEvent(evt);
			}
		}
	};
	/*
	[{
	    'enty' : document,
		'events' : {
			'keydown': function(e){}
		} 
	}]
	*/
	
	/**
	 * 注册自定义的事件
	 * @function
	 * @name SinaEditor.ev.fire
	 * @param {String} eventName 要注册的自定义事件名称。
	 * @param {Object} editor 要注册事件绑定的编辑器对象。
	 */
	ns.$regEvent = function(eventName,editor) {
		var whenTigger,eObj,events,i,ev;
		//console.log("装载:"+eventName);
		
		if(ns.customEvent[eventName]) {
			if(!_customEventList[eventName]) {
				_customEventList[eventName] = {};
			}
			if(!_customEventList[eventName][editor.option.id]) {
				_customEventList[eventName][editor.option.id] = [];
			}
			var uid = SinaEditor.util.uniqueKey();
		} else {
			//console.log('自定义事件:'+eventName+"没有找到");
			return;
		}
		whenTigger = ns.customEvent[eventName](editor);
		if(!whenTigger) {
			return;
		}
		for(i=0; whenTigger[i]; i++) {
			eObj = whenTigger[i];
			events = eObj.events;
			for(ev in events) {
				if(events.hasOwnProperty(ev)) {
					ns.add(eObj.enty , ev , events[ev]);
				}
			}
		}
	};
	
	
}(SinaEditor.ev));
