
//上传图片
SinaEditor.plugins.add('imgUIPanel',function(args){
    var editor = this;
    var MAX_HEIGHT = 442;
    var MAX_WIDTH = 630;
    
    var imgPanel = SinaEditor.winDialog.create({
        title: '添加图片',
        content: SinaEditor.TOOLCONF.imgTemplate,
        funcClose: function(){
			if(showMy) {
				_backMy();
			} else {
				_backWeb();
			}
        }
    });
    
    var useClient = imgPanel.nodes.useClient;
    var clientView = imgPanel.nodes.clientView;
    var clientFile = imgPanel.nodes.clientFile;
    var contentLoading = imgPanel.nodes.contentLoading;
    var cancleClient = imgPanel.nodes.cancleClient;
    var resultPic = imgPanel.nodes.resultPic;
    var addClientPic = imgPanel.nodes.addClientPic;
    var webContent = imgPanel.nodes.webContent;
    var webUrl = imgPanel.nodes.webUrl;
    var clientResult = imgPanel.nodes.clientResult;
	var errTips = imgPanel.nodes.errTips;
	var clientIframe = imgPanel.nodes.clientIframe;
	var resetClient = imgPanel.nodes.resetClient;
	var clientUploadDiv = imgPanel.nodes.clientUploadDiv;
	var clientMoreUp = imgPanel.nodes.clientMoreUp;
	var clientForm = imgPanel.nodes.clientForm;
	var tabMy = imgPanel.nodes.tabMy;
	var tabWeb = imgPanel.nodes.tabWeb;
	var webAdd = imgPanel.nodes.webAdd;
	var webPic = imgPanel.nodes.webPic;
	var webPicContainer = webPic.parentNode;
	var webPicLoading = imgPanel.nodes.webPicLoading;
	var clientFileDrag = imgPanel.nodes.clientFileDrag;
	var showMy = true;
	var _defaultUrlVal = 'http://';
	var _inputInterval = null;
	var _oldVal = _defaultUrlVal;
	imgPanel.fromBubble = false;
	imgPanel.tmpNode = null;
	
	var switchTab = function(isMy) {
		if(showMy === !!isMy) {
			return;
		}
		if(isMy) {
			_backMy(true);
			tabMy.className = 'cur';
			webContent.style.display = 'none';
			tabWeb.className = '';
			useClient.style.display = '';
		} else {
			_backWeb(true);
			tabMy.className = '';
			useClient.style.display = 'none';
			tabWeb.className = 'cur';
			webContent.style.display = '';
		}
		showMy = !showMy;
	};
	
    var _showClient = function(elm){
        contentLoading.style.display = 'none';
        clientView.style.display = 'none';
        clientResult.style.display = 'none';
        elm.style.display = '';
    };
	
	var _errLogic = {
		showErr : function(str,time) {
			errTips.innerHTML = str;
			errTips.style.display = '';
	        if(time) {
				var me = this;
				setTimeout(function(){
					me.hiddenErr();
				},time*1000);
			}
	    },
		hiddenErr : function() {
			errTips.style.display = 'none';
		}
	};
	
	var resizeIMG = function(img) {
		if (!img.src) {
            return;
        }
		img.removeAttribute('width');
        img.removeAttribute('height');
        var width = img.width;
        var height = img.height;
        if (width < MAX_WIDTH && height < MAX_HEIGHT) {
            return;
        }
		if(MAX_WIDTH / MAX_HEIGHT < width / height) {
			img.width = MAX_WIDTH;
		} else {
			img.height = MAX_HEIGHT;
		}
	};
	
	var _backMy = function(noRest){
		//resultPic.src = '';
		_showClient(clientView);
		_errLogic.hiddenErr();
		if(!noRest) {
			imgPanel.fromBubble = false;
			imgPanel.tmpNode = null;
		}
		resultPic.src = '';
	};
	
	var _backWeb = function(noRest){
		_oldVal = _defaultUrlVal;
		webUrl.value = _defaultUrlVal;
		webAdd.style.display = 'none';
		webPicContainer.style.display = 'none';
		webPicLoading.style.display = 'none';
		_errLogic.hiddenErr();
		if(!noRest) {
			imgPanel.fromBubble = false;
			imgPanel.tmpNode = null;
		}
		webAdd.src = '';
	};
	
	var _isImg = function(type) {
		type = type || '';
		if(!SinaEditor.TOOLCONF.imgType.test(type)) {
			_errLogic.showErr(SinaEditor.TOOLCONF.imgErrTypeMSG,3);
			return false;
		}
		return true;
	};

	//给支持拖拽的浏览器绑定事件
	SinaEditor.ev.add(clientUploadDiv, 'dragenter', function(e){
		clientMoreUp.style.display = '';
		clientUploadDiv.style.borderStyle = 'dashed';
	});
	
	SinaEditor.ev.add(clientUploadDiv, 'dragover', function(e){
		SinaEditor.ev.stopEvent(e);
	});
	
	SinaEditor.ev.add(clientUploadDiv, 'drop', function(e){
		SinaEditor.ev.stopEvent(e);
		clientUploadDiv.style.borderStyle = 'solid';
		clientMoreUp.style.display = 'none';
		var file = e.dataTransfer.files;
		if(file.length) {
			file = file[0];
		}
		if(!_isImg(file.name)) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function (e) {
			clientFileDrag.value = e.target.result;
			clientForm.submit();
			_showClient(contentLoading);
			clientFileDrag.value = '';
		};
		reader.readAsDataURL(file);
	});
	
	SinaEditor.ev.add(clientUploadDiv, 'dragleave', function(e){
		clientUploadDiv.style.borderStyle = 'solid';
		clientMoreUp.style.display = 'none';
	});

	
	editor.panels.imgUI = imgPanel;
	
	return {
		"events": [{
            "element": webUrl,
            "events": {
				'focus' : function() {
					_inputInterval = setInterval(function(){
						var newVal = webUrl.value;
						if(newVal != _oldVal) {
							_oldVal = newVal;
							webPicContainer.style.display = 'none';
							webPicLoading.style.display = '';
							var img = new Image();
							img.onload = function() {
								webPic.src = img.src;
								setTimeout(function(){
									resizeIMG(webPic);
									_errLogic.hiddenErr();
									webPicLoading.style.display = 'none';
									webPicContainer.style.display = '';
									webAdd.style.display = '';
								},1);
							};
							img.onerror = function() {
								webAdd.style.display = 'none';
								//TODO 放到配置里
								_errLogic.showErr('您输入的图片不是正确的地址，请重新输入。');
								webPicContainer.style.display = 'none';
								webPicLoading.style.display = 'none';
							};
							img.src = webUrl.value;
						}
					},1000);
				}
				,'blur' : function() {
					clearInterval(_inputInterval);
				}
            }
        },{
            "element": tabMy,
            "events": {
				'click' : function() {
					switchTab(true);
				}
            }
        },{
            "element": tabWeb,
            "events": {
				'click' : function() {
					switchTab(false);
				}
            }
        },{
            "element": addClientPic,
            "events": {
				'click' : function() {
					if(imgPanel.fromBubble) {
						imgPanel.tmpNode.src = resultPic.src;
						imgPanel.hidden();
						_backMy();
						return;
					}
					var img = SinaEditor.util.dom.createDom('img',{
						'ownerDocument' : editor.entyDoc,
						properties : {
							src : resultPic.src
						}
					});
					editor.operation.addNode(img,true);
					imgPanel.hidden();
					_backMy();
				}
            }
        },{
            "element": webAdd,
            "events": {
				'click' : function() {
					if(imgPanel.fromBubble) {
						imgPanel.tmpNode.src = webPic.src;
						imgPanel.hidden();
						_backWeb();
						return;
					}
					var img = SinaEditor.util.dom.createDom('img',{
						ownerDocument : editor.entyDoc,
						properties : {
							src : webPic.src
						}
					});
					editor.operation.addNode(img,true);
					imgPanel.hidden();
					_backWeb();
				}
            }
        },{
            "element": resetClient,
            "events": {
				'click' : function() {
					resultPic.src = '';
					_showClient(clientView);
				}
            }
        },{
            "element": clientUploadDiv,
            "events": {
				'mousemove' : function(e) {
					var pos = SinaEditor.util.dom.getXY(clientUploadDiv),
						scroll = SinaEditor.util.dom.getScrollPos(),
						//[LEFT,TOP]的偏差值
						ps = [10,15];
					if(SinaEditor.env.$IE) {
						ps[0] = 200;
					}
					clientFile.style.left = (e.clientX - pos[0] - ps[0] + scroll[1]) + 'px';
					clientFile.style.top = (e.clientY - pos[1] -ps[1] + scroll[0]) + 'px';
				}
            }
        },/*{
            "element": resultPic,
            "events": {
				'load' : function() {
					resizeIMG(resultPic);
				}
            }
        },{
            "element": webPic,
            "events": {
				'load' : function() {
					resizeIMG(webPic);
					_errLogic.hiddenErr();
					webPicContainer.style.display = '';
					webPicLoading.style.display = 'none';
					webAdd.style.display = '';
				},'error' : function() {
					webAdd.style.display = 'none';
					//TODO 放到配置里
					_errLogic.showErr('您输入的图片不是正确的地址，请重新输入。');
					webPicContainer.style.display = 'none';
					webPicLoading.style.display = 'none';
				}
            }
        },*/{
            "element": cancleClient,
            "events": {
				'click' : function() {
					clientIframe.src = '';
					_showClient(clientView);
				}
            }
        },{
            "element": clientIframe,
            "events": {
				'load' : function() {
					console.log('.......客户端的华丽家在！！！');
					try {
						var val = clientIframe.contentWindow.document.body.innerHTML;
						if(!val) {
							console.log('没有加载东西！虚报');
							return;
						}
						_showClient(clientResult);
						clientIframe.contentWindow.document.body.innerHTML = '';
						var img = new Image();
						img.onload = function() {
							resultPic.src = val;
							setTimeout(function(){
								resizeIMG(resultPic);
							},1);
						};
						img.src = val;
					} catch(e) {}
				}
            }
        },{
            "element": clientFile,
            "events": {
				'change' : function() {
					if(!_isImg(clientFile.value)) {
						return;
					}
					clientForm.submit();
					_showClient(contentLoading);
				}
            }
        }]
	};
});