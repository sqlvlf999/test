
//插入链接
SinaEditor.plugins.add('link',function(args){
    var editor = this;
    var btn = null;
    
    if (!args.customerPanel) {
       editor.callPlugin({
			'name' : 'linkPanel',
			'args' : args
		});
    }
	
	if (!args.customerBtn) {
       editor.callPlugin({
			'name' : 'linkBtn',
			'args' : args
		});
    }
    
    /**
     * 添加链接，根据参数传递的情况决定如何操作
     * 1.有选中文字：首先会清理掉里面所有的A标签
     * 	a.不传递：检测选区中的a标签，全部清除。
     * 	b.传递link：选区包裹上以A标签作为链接。
     * 	c.传递link,str：忽略str,同操作1b。
     * 2.没有选中文字：
     * 	a.不传递：不做任何操作。
     * 	b.传递link:以link作为str来生成链接
     * 	c.传递link,str:添加链接。
     * @param {Object} opt_obj 包含多种可选参数：
     * 	link 链接
     * 	str 文字
     * 	range 当前的选区
     * 	elm 传递的节点，一定是A标签，如果包含有link，那么则替换elm的地址，没有，那么删除A标签的地址
     */
    editor.operation.link = function(optObj){
		editor.focus();
        var range = optObj.range || SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
		var link = optObj.link;
		var str = optObj.str || link;
		
        if (!link && !range) {
            //2a.不传递：不做任何操作。
			console.log("2a.不传递：不做任何操作。");
            return;
        }
        
        editor.operation.save(editor);
		
		if(optObj.elm) {
			var elm = optObj.elm;
			if(optObj.link) {
				elm.href = encodeURI(optObj.link);
				range.selectNodeContents(elm);
				SinaEditor.range.applyRanges(editor.entyWin, range);
			} else {
				SinaEditor.util.dom.removeTag(elm);
			}
		} else {
			var a = SinaEditor.util.dom.createDom('a', {
				ownerDocument: editor.entyDoc,
	            properties: {
	                'target': '_blank'
	            }
	        });

	        if (!range || range && range.collapsed) {
	            //2b,c.添加链接。 
				a.innerHTML = str;
				a.href = encodeURI(link);
	            //range ? range.insertNode(a) : editor.entyBody.appendChild(a);
				if(range) {
					range.insertNode(a);
				} else {
					editor.entyBody.appendChild(a);
				}
				range.selectNodeContents(a);
				SinaEditor.range.applyRanges(editor.entyWin, range);
	        } else {
				//1a：检测选区中的a标签，全部清除。
//				SinaEditor.range.removeStyle(editor, {
//	                'useTagName': 'a'
//	            });
				editor.entyDoc.execCommand('unlink',false,'');
				
		        if(link) {
					//1bc:选区包裹上以A标签作为链接。
					a.href = encodeURI(link);
					//#BLOGBUG-12256
					//之前的操作破坏了选区，需要重新获取(有些浏览器的currentRange不是同一个引用)
					range = SinaEditor.range.getCurrentRanges(editor.entyWin)[0];
					try {
						//在跨节点时会报错
						range.surroundContents(a);
					} catch(e) {
						var content = range.extractContents();
						a.appendChild(content);
						range.insertNode(a);
					}
					range.selectNodeContents(a);
					SinaEditor.range.applyRanges(editor.entyWin, range);
					//#BLOGBUG-12345 转中文不给力啊。
					//editor.entyDoc.execCommand('createLink',false,encodeURIComponent(link));
				}
	        }
		}
        
        editor.operation.save(editor);
    };
});
