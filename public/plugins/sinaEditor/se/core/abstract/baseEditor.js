
if(!SinaEditor.$abstract) {
	SinaEditor.$abstract = {};
}

//编辑器的基类
/**
 * 基础的编辑器，负责插件的装载。您也可以直接使用SinaEditor.createEditor来创建一个编辑器。它需要以下参数：<br>
 * <table class="summaryTable">
 * 	<tr><td>type</td><td>key</td><td>value</td></tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>id<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			当前创建编辑器的ID
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String|Element</td>
 * 		<td>toolBase<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			编辑器的按钮放置的父节点的base dom id 或者dom
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>initType<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			用哪个插件初始化编辑器，可以参阅{@link initFromStatic}这个插件。接受的格式形如：<br>
 * 			{'name':插件名称,'args':插件需要的参数}。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Object</td>
 * 		<td>filter<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			当编辑器粘贴入外来内容时，进行的过滤<span style="color:red">(在常见浏览器中，不包含opera的粘贴过滤)</span>。<br>
 * 			或者当编辑器状态从编辑状态切换到显示源代码状态(反之亦然)时，一些特殊节点的过滤。<br>
 * 			可以参阅{@link pasteFilter}这个插件。接受的格式形如：<br>
 * 			{'name':插件名称,'args':插件需要的参数}。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>editorName<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			用哪个编辑器来初始化。使用类名即可。如：SinaEditor.$abstract.baseEditor，或者SinaEditor._.entyimpl.normalEditor
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>String</td>
 * 		<td>styles<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器内的样式，动态写入的形式。<br>
 * 			<span style="color:red">注意，像IE这样的浏览器，动态样式不能够包含'@'这样的特殊字符，会导致浏览器的崩溃。</span>
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>styleLinks<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器内的外链样式数组，可以引入多个样式表。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>plugns<span style="color:red">(必要参数)</span></td>
 * 		<td>
 * 			编辑器的插件。形如：<br>
 * 			[{'name':插件名称,'args':插件需要的参数},...]
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>function</td>
 * 		<td>onStart<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			当编辑器开始执行加入插件操作前的回调函数。
 * 		</td>
 * 	</tr>
 * 	<tr>
 * 		<td>Array</td>
 * 		<td>eventBlackList<span style="color:red">(可选参数)</span></td>
 * 		<td>
 * 			编辑器不监听的全局自定义事件的列表。
 * 		</td>
 * 	</tr>
 * </table>
 * @namespace SinaEditor.$abstract
 * @class 编辑器的基础类
 * @param {Object} oOption 配置参数，可以参考上表的配置。
 */
SinaEditor.$abstract.baseEditor = function(oOption){
    this._state = SinaEditor.STATE.CREATING;
	/**
	 * 传递进来的参数。
	 */
    this.option = oOption || {};
	this.option.eventBlackList = this.option.eventBlackList || '';
	//编辑器的插件。
    this._jobTable = [];
	//已有插件列表
	this._jobTableIndex = {};
	/**
	 * 实体对象，即编辑器的iframe节点。
	 */
	this.enty = null;
	/**
	 * iframe的window对象引用。
	 */
	this.entyWin = null;
	/**
	 * iframe的document对象引用。
	 */
	this.entyDoc = null;
	/**
	 * iframe的body节点引用。
	 */
	this.entyBody = null;
	/**
	 * 编辑器的textarea节点引用。
	 */
	this.entyArea = null;
	this.hasAddEvent = false;
	/**
	 * 编辑器的所有按钮。
	 */
	this.btns = {};
	/**
	 * 编辑器的所有的浮层。
	 */
	this.panels = {};
	this._ = {};
	this.errorMsg = [];
	/**
	 * 编辑器的所有的操作。
	 */
	this.operation = {};
	//记录可选编辑的操作
	this.operateState = {};
}.$define({
	/**
	 * @inner
	 * @param {Object} sMsg
	 */
    error: function(sMsg){ // 记录错误信息
        console.error(sMsg);
        this.errorMsg.push(sMsg);
    },
    /**
     * 添加插件，但并不会立即执行，当触发start函数时，添加的插件才会执行。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param {Object} pluginConf 插件参数。参见：<br>
     * <table class="summaryTable">
     * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>name<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的名称。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>args<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的参数，这个参数具体视插件参数而定。
	 * 		</td>
	 * 	</tr>
     * </table>
     */
    add: function(pluginConf){
        this._jobTable.push(pluginConf);
    },
	/**
     * 执行注册好的插件。如果需要后注册，可以使用callPlugin，可以在编辑器初始化后继续添加插件。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
    start: function(){
        if (this.option.onStart) {
            this.option.onStart();
        }
        this.queue(this._jobTable);
    },
    /**
     * 依次执行插件。
     * @inner
     * @param {Object} jobs 插件实体
     * @param {function} callback 执行完毕的回调函数。
     */
    queue: function(jobs, callback){
        var _this = this;
        var joblen = jobs.length;
        var i = 0;
		_this.callPlugin(jobs[i]);
        var interNum = window.setInterval(function(){
			i++;
            if (i >= joblen) {
                clearInterval(interNum);
                interNum = null;
                SinaEditor.ev.fire(_this, 'editorOnladed');
                return;
            }
			if(_this.entyWin) {
				
				if(!_this.hasAddEvent) {
					_this.hasAddEvent = true;
					var ev = null;
					//这里来初始化事件
					for(ev in SinaEditor.ev.customEvent) {
						if(_this.option.eventBlackList.indexOf(ev) < 0) {
							SinaEditor.ev.$regEvent(ev,_this);
						} else {
							console.log(_this.option.id+'在黑名单中：'+ev);
						}
					}
				}
				
				_this.callPlugin(jobs[i]);
				
				_this.setState(SinaEditor.STATE.CREATED);
				_this.setState(SinaEditor.STATE.EDITING);
			} else {
				console.log("等一下");
				i--;
			}
        }, 10);
    },
    /**
     * 单独后执行某个插件。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param {Object} pluginConf 插件参数。参见：<br>
     * <table class="summaryTable">
     * 	<tr><td>type</td><td>key</td><td>value</td></tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>name<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的名称。
	 * 		</td>
	 * 	</tr>
	 * 	<tr>
	 * 		<td>String</td>
	 * 		<td>args<span style="color:red">(必要参数)</span></td>
	 * 		<td>
	 * 			插件的参数，这个参数具体视插件参数而定。
	 * 		</td>
	 * 	</tr>
     * </table>
     */
    callPlugin: function(pluginConf){
		var getTime = function(){
            return new Date().valueOf();
        };
		//var jobObj = SinaEditor.plugins[pluginConf.name].call(this,pluginConf.args || {}) || {};
		var plugnFuc = SinaEditor.plugins.get(pluginConf.name);
		if(!plugnFuc) {
			//console.clear();
			console.log(pluginConf);
			console.log("---------------------------plugin not found:");
			return;
		}
		var jobObj = plugnFuc.call(this,pluginConf.args || {}) || {};
		//var jobObj = SinaEditor.plugins[pluginConf.name](this,pluginConf.args);
		console.log(this.option.id+'添加job:'+pluginConf.name);
        //var job = jobObj['initialize'];
		var job = jobObj.initialize;
		//var jEvents = jobObj['events'];
		var jEvents = jobObj.events;
        if (typeof jobObj == 'undefined') {
            this.error("<b>Job[" + pluginConf.name + "] is undefiend!!!</b>");
            return;
        }
        var _try = true;
        var _start = getTime();
        try {
			if(jEvents) {
				var num = 0;
				for(num=0; jEvents[num]; num++) {
					var eObj = jEvents[num];
					var target = eObj.element;
					//var events = eObj['events'];
					var events = eObj.events;
					var ev = null;
					
					if(!target) {
						console.error('!!!!!+'+ev+'+绑定失败...');
					}
					for(ev in events) {
						console.log(target + '绑定' + ev);
						SinaEditor.ev.add(target , ev , events[ev],{'srcEditor':this});
					}
				}
			}
			if(job) {
				job.call(this);
			}
        } 
        catch (e) {
            this.error("<b>Job[" + pluginConf.name + "] failed!!!</b>" + e.message + "");
//            if (callback != null) {
//                callback();
//            } // 如果任何一个 Job 失败，立即回调 onEnd
            _try = false;
            throw e;
        }
        finally {
            if (_try) {
                var _end = getTime();
                //console.log("<b>Job[" + pluginConf.name + "] done in " + (_end - _start) + "ms.</b>");
            }
        }
    }
	/**
     * 焦点集中到编辑器中。
     * @memberOf SinaEditor.$abstract.baseEditor#
     */
	,focus : function() {
		this.entyWin.focus();
	}
	/**
     * 设置编辑器的状态。设置后，会触发自定义事件editorStateChange。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @param state {int} 要设置的编辑器的状态可以设置：<br>
     * 编辑器在创建中：SinaEditor.STATE.CREATING或者1;<br>
     * 编辑器在创完毕：SinaEditor.STATE.CREATED或者2;<br>
     * 编辑器处于编辑状态：SinaEditor.STATE.EDITING或者3;<br>
     * 编辑器处于显示源码状态：SinaEditor.STATE.SHOWSOURCE或者4;<br>
     */
	,setState : function(state) {
		this._state = state;
		SinaEditor.ev.fire(this, 'editorStateChange');
	}
	/**
     * 获得编辑器的当前状态。
     * @memberOf SinaEditor.$abstract.baseEditor#
     * @return {int} 返回编辑器的状态，可以参见SinaEditor.STATE下的属性。
     */
	,getState : function() {
		return this._state;
	}
});

/*
 * 创建编辑器。此方法提供编辑器的创建。
 * @param {Object} conf 创建编辑器的配置文件：
 */
SinaEditor.createEditor = function(conf){
    //var job = new (eval('(' + conf['editorName'] + ')'))(conf);
    //var pName = conf['plugns'],i;
    //job.add(conf['initType']);
    //if (conf['filter']) {
    //    job.add(conf['filter']);
    //}
	var job = new (eval('(' + conf.editorName + ')'))(conf);
	var pName = conf.plugns,i;
	job.add(conf.initType);
	if (conf.filter) {
        job.add(conf.filter);
    }
    for (i = 0; pName[i]; i++) {
        job.add(pName[i]);
    }
    job.start();
    return job;
};
