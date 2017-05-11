
if(!SinaEditor.$abstract) {
	SinaEditor.$abstract = {};
}

//处理重做和撤销
/**
 * 处理重做和撤销,依赖的全局参数<span style="color:red">SinaEditor.CONF.redoConf</span>，表示最大可重做，撤销的次数。可以在default.js文件修改其默认参数。<br>
 * 如果没有把'<span style="color:red">redoAndUndoChanged</span>'事件列入黑名单的情况下，重做，撤销操作都会触发此事件。<br>
 * SinaEditor.redoManager是它的一个实例。
 * @class 处理重做和撤销的类
 */
SinaEditor.$abstract.redoManager = function(){
    this.maxLan = SinaEditor.CONF.redoConf || 100;
    //{对应编辑器:指针位置,和数组下标一致}
    this.points = {};
    //{对应编辑器:[缓存数据{html:当时的html,ranges:当时的selection}]}
    this.cache = {};
}
.$define({
    /**
     * 给要添加撤销和重做操作的编辑器添加此管理操作。一般是在编辑器出事完成后进行。即SinaEditor.STATE.CREATED之后。
     * @memberOf SinaEditor.$abstract.redoManager#
     * @param {Object} editor 要添加管理的编辑器。
     */
    addEditor: function(editor){
		SinaEditor.ev.remove(editor,'redoAndUndoChanged');
		SinaEditor.ev.$regEvent('redoAndUndoChanged',editor);
        this.points[editor.option.id] = 0;
        this.cache[editor.option.id] = [{
            "html": editor.entyBody.innerHTML
        }];
        this.save(editor);
    }
	/**
     * 保存当前编辑器的内容。
     * @memberOf SinaEditor.$abstract.redoManager#
     * @param {Object} editor 要保存内容的编辑器。
     */
    ,save: function(editor){
		//return
        console.log("保存:" + editor.option.id);
        var len = this.cache[editor.option.id].length;
        //当前游标
        var i = this.points[editor.option.id];
        
        var oldHTML = this.cache[editor.option.id][i].html;
        var newHTML = editor.entyBody.innerHTML;
		
		var ranges,bookmarks;
		
		if (!SinaEditor.env.$IE) {
			ranges = SinaEditor.range.getCurrentRanges(editor.entyWin);
			bookmarks = this._converToBookMark(ranges);
		}
		
        if (oldHTML !== newHTML) {
            console.log("数据不一样，保存");
            
            if ((i + 1) != len) {
                console.log("清除历史分支");
                this.cache[editor.option.id].splice(i + 1, len);
                len = this.cache[editor.option.id].length;
            }
            
            if (len == this.maxLan) {
                console.log("到达最后记录点");
                this.cache[editor.option.id].shift();
                len--;
            }
			
            this.cache[editor.option.id].push({
                "html": newHTML,
				"ranges": bookmarks
            });
            this.points[editor.option.id] = len;
        } else {
			//更新range
			console.log('更新当前range');
			this.cache[editor.option.id][i].ranges = bookmarks;
		}
		this._fireEvent(editor);
    },
	/**
	 * 重做当前编辑器的内容。
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} editor 要重做的编辑器。
	 */
    redo: function(editor){
		//return;
        console.log("重做:" + editor.option.id);
        var i = this.points[editor.option.id];
        var len = this.cache[editor.option.id].length;
        if ((i + 1) == len) {
            console.log("已经重做到尽头");
            return;
        }
        this.points[editor.option.id] = ++i;
        var cache = this.cache[editor.option.id][i];
		var me = this;
		//阻止滚动条滚动
        setTimeout(function(){
            editor.entyBody.innerHTML = cache.html;
			if(!SinaEditor.env.$IE) {
				SinaEditor.range.applyRanges(editor.entyWin,me._converToRange(editor.entyDoc,cache.ranges));
			}
            editor.focus();
			me._fireEvent(editor);
        }, 0);
    },
	/**
	 * 撤销当前编辑器的内容。
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} editor 要撤销的编辑器。
	 */
    undo: function(editor){
		//return;
        //当前游标回退
        console.log("回退:" + editor.option.id);
        var i = this.points[editor.option.id];
        if (i <= 0) {
            console.log("已经回退到尽头");
            return;
        }
		
        this.points[editor.option.id] = --i;
		
        var cache = this.cache[editor.option.id][i];
		var me = this;
		
        setTimeout(function(){
            editor.entyBody.innerHTML = cache.html;
			if(!SinaEditor.env.$IE) {
				SinaEditor.range.applyRanges(editor.entyWin,me._converToRange(editor.entyDoc,cache.ranges));
			}
            editor.focus();
			me._fireEvent(editor);
        }, 0);
    },
	/**
	 * 存储编辑器范围，必须得同步保存编辑器的范围，所以会以json的形式进行保存。
	 * 记录格式形如：{start:起始节点,startOffset:起始位置,end:结束节点,endOffset:结束位置}
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} ranges 当前选区的范围。
	 */
	_converToBookMark : function(ranges) {
		//{start:起始节点,startOffset:起始位置,end:结束节点,endOffset:结束位置}
		var arr = [];
		var i;
		for(i=0; ranges[i]; i++) {
			var obj = {};
			obj.startOffset = ranges[i].startOffset;
			obj.endOffset = ranges[i].endOffset;
			obj.start = this._setPath(ranges[i].startContainer);
			obj.end = this._setPath(ranges[i].endContainer);
			arr.push(obj);
		}
		return arr;
	},
	/**
	 * 把存储的编辑器范围，转换成range显示出来。
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} doc 对应的document对象。
	 * @param {Object} bookmarks 存储的记录格式。参见_converToBookMark提及的存储格式。
	 */
	_converToRange : function(doc,bookmarks) {
		var i=0;
		var rangse = [];
		while(bookmarks[i]) {
			var bookmark = bookmarks[i];
			var r = doc.createRange();
			console.log(this._getPath(doc.body,bookmark.start));
			console.log(bookmark.startOffset);
			r.setStart(this._getPath(doc.body,bookmark.start), bookmark.startOffset);
			r.setEnd(this._getPath(doc.body,bookmark.end), bookmark.endOffset);
			rangse.push(r);
			i++;
		}
		return rangse;
	},
	/**
	 * 存储range时，获取startContainer或者endContainer的节点路径，以便在读取时能找回对应的节点。
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} element startContainer或者endContainer，即选区的开始节点和结束节点。
	 */
	_setPath : function(element) {
		var locArr = [];
		
		var curr = element;
		var parent = element.parentNode;
		while(parent && parent.tagName.toUpperCase() !== "HTML") {
			
			var ch = parent.childNodes;
			var i;
			for(i=0; ch[i]; i++) {
				if(ch[i] == curr) {
					locArr.push(i);
					break;
				}
			}
			
			curr = parent;
			parent = parent.parentNode;
		}
		
		return locArr;
	},
	/**
	 * 把记录的startContainer或者endContainer的节点路径，转换成对应的节点。
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} body 编辑器的body对象。
	 * @param {Object} locArr 寻找startContainer或者endContainer的节点路径。
	 */
	_getPath : function(body,locArr) {
		var element = body;
		var i= locArr.length - 1;
		while(i >= 0) {
			element = element.childNodes[locArr[i]];
			i--;
		}
		return element;
	},
	/**
	 * 触发'redoAndUndoChanged'事件
	 * @inner
	 * @memberOf SinaEditor.$abstract.redoManager#
	 * @param {Object} editor
	 */
	_fireEvent : function(editor) {
		var index = this.points[editor.option.id];
		//重做
		editor._.hasRedo = index == (this.cache[editor.option.id].length - 1) ? false : true;
		//回退
		//editor._.hasUndo = index == 0 ? false : true; 
		editor._.hasUndo = index === 0 ? false : true;
		SinaEditor.ev.fire(editor,'redoAndUndoChanged');
	}
});
SinaEditor.redoManager = new SinaEditor.$abstract.redoManager();
