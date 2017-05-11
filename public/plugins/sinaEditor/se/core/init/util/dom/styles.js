SinaEditor.pkg('SinaEditor.util.dom', function(ns){
	
	/**
	 * 添加样式表，注意，添加的内容中不能包含<span style="color:red">@</span>等这样的特殊字符。<br>
	 * 否则会导致IE系列浏览器的崩溃。
	 * @name SinaEditor.util.dom.addStyles
	 * @function 
	 * @param {String} str 要添加的样式内容
	 * @param {Object} ownerDocument 添加到的指定document对象，不传递表示默认添加到当前document对象。
	 */
    ns.addStyles = function(str, ownerDocument){
        var style;
        var head;
        head = (ownerDocument || document).getElementsByTagName('head')[0];
        style = ns.createDom('style', {
            'ownerDocument': ownerDocument,
            'attributes': {
                'type': 'text/css'
            }
        });
        try {
            style.appendChild((ownerDocument || document).createTextNode(str));
        } 
        catch (ex) {
            style.styleSheet.cssText = str;
        }
        head.appendChild(style);
    };
    
	/**
	 * 添加外链样式
	 * @name SinaEditor.util.dom.addLink
	 * @function 
	 * @param {String} href 要添加的外链样式，建议使用绝对路径
	 * @param {Object} ownerDocument 添加到的指定document对象，不传递表示默认添加到当前document对象。
	 */
    ns.addLink = function(href, ownerDocument){
        var link;
        var head;
        head = (ownerDocument || document).getElementsByTagName('head')[0];
        link = ns.createDom('link', {
            'ownerDocument': ownerDocument,
            'attributes': {
                'rel': 'stylesheet',
                'type': 'text/css',
                'href': href
            }
        });
        head.appendChild(link);
    };
    
	/**
	 * 获取整数形式的样式值。例如：样式值中包含px,pt。但当我们只需要获取它的整数值时，可以使用此函数。
	 * @name SinaEditor.util.dom.styleInteger
	 * @function 
	 * @param {Element} el 要获取样式值得节点。
	 * @param {String} style 要获取的样式。<span style="color:red">使用js的样式取值形式(及不带'-'符号)</span>
	 * @return {Intger} 在不出现异常的情况下返回过滤后的样式整数值。
	 */
    ns.styleInteger = function(el, style){
        var val = ns.getStyle(el, style);
        try {
            return parseInt(val.replace(/[^\d]/g, ''),10) || 0;
        } 
        catch (e) {
            return 0;
        }
    };
	
    /**
	 * Gets the current computed value of one of the element CSS style
	 * properties.
	 * @param {String} propertyName The style property name.
	 * @returns {String} The property value.
	 * @example
	 * var element = new CKEDITOR.dom.element( 'span' );
	 * alert( <b>element.getComputedStyle( 'display' )</b> );  // "inline"
	 */
	/*
	getComputedStyle :
		CKEDITOR.env.ie ?
			function( propertyName )
			{
				return this.$.currentStyle[ CKEDITOR.tools.cssStyleToDomStyle( propertyName ) ];
			}
		:
			function( propertyName )
			{
				return this.getWindow().$.getComputedStyle( this.$, '' ).getPropertyValue( propertyName );
			}
	*/
	
	/**
	 * 获取样式值
	 * @name SinaEditor.util.dom.getStyle
	 * @function 
	 * @param {Element} el 要获取样式的节点
	 * @param {String} property 要获取的样式属性。<span style="color:red">使用js的样式取值形式(及不带'-'符号)</span>
	 * @return 当传递的节点为空，或者节点为body元素时，返回空字符串。
	 */
    ns.getStyle = function(el, property){
		if(!el) {
			return '';
		}
		switch(el.nodeType) {
			case SinaEditor.NODETYPE.HTMLELEMENT : 
				return '';
			case  SinaEditor.NODETYPE.TEXT : 
				el = el.parentNode;
		}
		if(!el || el.tagName.toUpperCase() === 'BODY') {
			return '';
		}
        switch (property) {
            // 透明度
            case "opacity":
                var val = 100;
                try {
					var key = 'DXImageTransform.Microsoft.Alpha';
                    val = el.filters[key].opacity;
                } 
                catch (e) {
                    try {
                        val = el.filters('alpha').opacity;
                    } 
                    catch (e) {
                    }
                }
                return val / 100;
            default:
				if(property === 'float') {
					property = "styleFloat";
				}
                var value = el.currentStyle ? el.currentStyle[property] : null;
                return (el.style[property] || value);
        }
    };
    if (!SinaEditor.env.$IE) {
        ns.getStyle = function(el, property){
			if(!el) {
				return '';
			}
			switch(el.nodeType) {
				case SinaEditor.NODETYPE.HTMLELEMENT : 
					return '';
				case  SinaEditor.NODETYPE.TEXT : 
					el = el.parentNode;
			}
			if(!el || el.tagName.toUpperCase() === 'BODY') {
				return '';
			}
            // 浮动
            if (property == "float") {
                property = "cssFloat";
            }
            var computed = el.ownerDocument.defaultView.getComputedStyle(el, "");
            return el.style[property] || computed ? computed[property] : null;
        };
    }
    
    var toStyleAttribute = function(styleName){
        var arr = styleName.split('-');
        var cc = arr[0];
		var i;
        for (i = 1; i < arr.length; i++) {
            cc += arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
        }
        return cc;
    };
	
	/**
	 * 移除指定样式，并返回节点的当前的自定义样式数
	 * @name SinaEditor.util.dom.removeStyle
	 * @function 
	 * @param {Object} elm 要删除样式的节点
	 * @param {String} styleName 样式的名称
	 * @return {Integer} currentLen 返回当前还有多少定义的样式
	 */
	ns.removeStyle = function(elm,styleName) {
		styleName = styleName.replace(/([A-Z])/,'-$1').toLowerCase();
		var cssTexts = elm.style.cssText.toLowerCase().split(';');
		var i;
		for(i=0; cssTexts[i]; i++) {
			if(cssTexts[i].indexOf(styleName) != -1) {
				cssTexts.splice(i,1);
				break;
			}
		}
		elm.style.cssText = cssTexts.join(';');
		return cssTexts.length-1;
	};
    
	/**
	 * 设置样式。
	 * @name SinaEditor.util.dom.setStyle
	 * @function
	 * @param {Element} el 要设置样式的节点。
	 * @param {String | Object} style 要设置的样式。当参数到此为止(2个)时，此参数可以设置多个:{style1:value1,style2:value2...}
	 * @param {String} opt_value 要设置的样式值。可选。 
	 */
    ns.setStyle = function(){
        var el = arguments[0];
        if (arguments.length == 2) {
            var styleAttr,name;
            var style = arguments[1];
            for (name in style) {
                styleAttr = toStyleAttribute(name);
                ns.setStyle(el, styleAttr, style[name]);
            }
        }
        else 
            if (arguments.length == 3) {
                var property = arguments[1];
                var val = arguments[2];
                if (!SinaEditor.env.$IE) {
                    if (property == "float") {
                        property = "cssFloat";
                    }
                    el.style[property] = val;
                }
                else {
                    switch (property) {
                        case "opacity":
                            el.style.filter = "alpha(opacity=" + (val * 100) + ")";
                            if (!el.currentStyle || !el.currentStyle.hasLayout) {
                                el.style.zoom = 1;
                            }
                            break;
                        case "float":
                            property = "styleFloat";
							break;
                        default:
                            el.style[property] = val;
                    }
                }
            }
    };
});
