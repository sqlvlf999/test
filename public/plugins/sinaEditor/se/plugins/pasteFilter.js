
//粘贴过滤

SinaEditor.plugins.add('pasteFilter', function(args){
    var editor = this;
    editor.operation.pasteFilter = function(){
        var argus = editor.option.filter.args;
		var i=0;
        //var tags = argus['tagName'];
		var tags = argus.tagName;
        if (tags) {
            tags = tags.split('|');
            var tag, eles;
            while (tags[i]) {
                eles = editor.entyDoc.getElementsByTagName(tags[i]);
                while (eles[0]) {
                    SinaEditor.util.dom.delElement(eles[0]);
                }
                i++;
            }
        }
        //var atts = argus['attribute'];
		var atts = argus.attribute;
        if (atts) {
            atts = atts.split('|');
            walkElment(editor.entyDoc.body, atts);
        }
		i=0;
		var imgs = editor.entyDoc.getElementsByTagName('img');
		for(;imgs[i]; i++ ) {
			if(imgs[i].src.indexOf('file:///') === 0) {
				SinaEditor.util.dom.delElement(imgs[i]);
				i--;
			}
		}
    };
    
    var walkElment = function(elmens, atts){
        if (elmens.nodeType !== SinaEditor.NODETYPE.ELEMENT) {
            return;
        }
        var i = 0;
        while (atts[i]) {
            elmens.removeAttribute(atts[i]);
            i++;
        }
        i = 0;
        if (elmens.hasChildNodes()) {
            var childNodes = elmens.childNodes;
            while (childNodes[i]) {
                walkElment(childNodes[i], atts);
                i++;
            }
        }
    };
    
    //自定义事件之后才执行到
    
    var exChangeObject = function(objects){
        var img, i = 0;
        while (objects[i]) {
            img = SinaEditor.util.dom.createDomFromHTML('<img src="'+SinaEditor.CONF.transparentIMG+'" _se_flash="' + encodeURIComponent(SinaEditor.util.dom.outerHTML(objects[i])) + '" width="' + objects[i].width + '" height="' + objects[i].height + '" style="background:url(\''+SinaEditor.CONF.fakeFLASH+'\') no-repeat scroll center center transparent;border:1px solid #A9A9A9;" >', editor.entyDoc);
            objects[i].parentNode.replaceChild(img, objects[i]);
        }
    };
    
    var exChangeObjectBack = function(){
        var imgs = editor.entyDoc.getElementsByTagName('img');
        var attStr, flash, i = 0;
        while (imgs[i]) {
            attStr = imgs[i].getAttribute('_se_flash');
            if (attStr) {
                flash = SinaEditor.util.dom.createDomFromHTML(decodeURIComponent(attStr), editor.entyDoc);
                imgs[i].parentNode.replaceChild(flash, imgs[i]);
            }
            else {
                i++;
            }
        }
    };
    
    return {
        "events": [{
            "element": editor.entyBody,
            "events": {
                'paste': function(e){
					//#BLOGBUG-12321 safari下，焦点在table内，从word粘贴会跳出，原因是粘贴出了和<tr>标签并列的<p>标签。延迟。
                    setTimeout(function(){
						var i=0,tds;
						editor.operation.pasteFilter();
						exChangeObject(editor.entyDoc.getElementsByTagName('object'));
                        exChangeObject(editor.entyDoc.getElementsByTagName('embed'));
						//#BLOGBUG-12333 从word粘贴无内容的table，缩成一团。
						tds = editor.entyDoc.getElementsByTagName('td');
						for(i=0; tds[i]; i++) {
							var val = tds[i].textContent || tds[i].textContent;
							if(!val) {
								tds[i].innerHTML = '&nbsp;';
							}
						}
                    }, 10);
                }
            }
        }, {
            "element": editor,
            "events": {
                'editorStateChange': function(){
                    var state = this.getState();
                    if (state == SinaEditor.STATE.EDITING) {
                        exChangeObject(this.entyDoc.getElementsByTagName('object'));
                        exChangeObject(this.entyDoc.getElementsByTagName('embed'));
                    } else if (state == SinaEditor.STATE.SHOWSOURCE) {
                        exChangeObjectBack();
                    }
                }
            }
        }]
    };
});
