
//历史版本
SinaEditor.plugins.add('historyUI',function(args){
	var editor = this;
	
	var oldData = '';
	
	if (!args.customerBtn) {
		editor.callPlugin({
			'name' : 'historyUIBtn',
			'args' : args
		});
	}
	
	if (!args.customerPanel) {
		editor.callPlugin({
			'name': 'historyUIPanel',
			'args': args
		});
	}
	
	var sid = args.id || 0;
	var storage = SinaEditor.$abstract.Storage;
	
	/**
	 * 保存当前的文本内容到本地存储,没10分钟自动保存一次。
	 * @return  {Boolean} 存储成功或者失败
	 */
	editor.operation.saveData = function(){
		var newData = editor.entyBody.innerHTML;
		if(oldData === newData) {
			return false;
		}
		var datas = storage.getItem('SinaEditorData'+sid) || [];
		var keyTime = +new Date();
		datas.unshift(keyTime);
		if(datas.length > SinaEditor.TOOLCONF.historyMax) {
			var tmpArr = datas.splice(0,SinaEditor.TOOLCONF.historyMax);
			var i;
			for(i=0; datas[i]; i++) {
				storage.removeItem('data_'+sid+'_'+datas[i]);
			}
			datas = tmpArr;
		}
		if(storage.setItem('data_'+sid+'_'+keyTime,encodeURIComponent(newData)) && storage.setItem('SinaEditorData'+sid,datas)) {
			oldData = newData;
			editor.panels.historyUI.updataData();
			return true;
		} else {
			storage.removeItem('data_'+sid+'_'+datas[0]);
			datas.shift();
			storage.setItem('SinaEditorData'+sid,datas);
			return false;
		}
	};
	
	/**
	 * 获取数据文本数据。
	 * @param {Integer} time 获取的对应时间。
	 * @return {String} 如果没有次参数，返回最新的内容。
	 */
	editor.operation.loadData = function(time) {
		if(!time) {
			return storage.getItem('SinaEditorData'+sid);
		}
		return decodeURIComponent(storage.getItem('data_'+sid+'_'+time));
	};
	
	/**
	 * 把存储的内容放到编辑器内。
	 * @param {integer} time 要放入的时间，如果没有传递，则放入最新的时间。
	 */
	editor.operation.putData = function(time) {
		var data = this.loadData(time);
		if(!data) {
			return;
		}
		if(data.join) {
			data = this.loadData(data[0]);
		}
		editor.entyBody.innerHTML = data;
		editor.operation.clearRU();
	};
	
	var save = function(){};
	var clear = function(){};
	if(!args.closeAutoSave) {
		var histroyKey;
		save = function(){
			histroyKey = setInterval(function(){
				editor.operation.saveData();
			},600000);
		};
		clear = function(){
			clearInterval(histroyKey);
		};
	}
	
    return {
        "events": [{
            "element": editor,
            "events": {
				'editorStateChange' : function() {
					switch(this.getState()) {
						case SinaEditor.STATE.CREATED :
							editor.panels.historyUI.updataData();
							editor.operation.putData(0);
							save();
							break;
						case SinaEditor.STATE.EDITING :
							clearInterval(histroyKey);
							save();
							break;
						case SinaEditor.STATE.SHOWSOURCE :
							clear();
							break;
					}
				},'ctrls' : function(){
					editor.operation.saveData();
				}
            }
        }]
    };
});