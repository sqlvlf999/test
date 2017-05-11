/**
 * 面板类,继承于DisplayObject类
 * @class 面板类,继承于DisplayObject类
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-18
 */
SinaEditor._.Panel = function(parent, node){

    /**
     * 通过模板配置的节点
     */
    this.nodes = {};
    
    this.uniqueID = this.__getUniqueID();
    
    this.entity = null;
    
    this.__iframe = null;
    this.__isSetAdamant = false;
    this.__templateNodesIDs = [];
    this.__isFixed = false;
    if(SinaEditor.env.$IE6) {
		this.__ie6FixedController = new SinaEditor._.IE6FixedController();
	}
}
.$extends(SinaEditor._.DisplayObject).$define({

    /**
     * 设置模板
     * @memberOf SinaEditor._.Panel#
     * @param {String} tpl
     */
    setTemplate: function(tpl){
        var nd = SinaEditor.util.dom.createDom('div',{
			properties : {
				'innerHTML' : new SinaEditor.$abstract.Template(tpl).evaluate(this.__getNodes(tpl, "i"))
			}
		});
        nd.style.display = "none";
        this.__parent.appendChild(nd);
        this.__updateTemplate(nd);
        this.nodes = this.__getNodes(tpl);
        
        //兼容之前的版本，以后可去掉
        this.entity = this.__entity;
        this.nodes.panel = this.entity;
        
        return this;
    },
    
    /**
     * 设置当滚动条滚动时，是否固定住对象的功能
     * @memberOf SinaEditor._.Panel#
     * @param {Boolean} state
     */
    setFixed: function(state){
        if(!this.__isInited) {
			this.__initEntity();
		}
        
        var x = parseInt(this.__entity.style.left,10), y = parseInt(this.__entity.style.top,10);
        
        if (SinaEditor.env.$IE6) {
            this.__ie6FixedController.setFixed(this.__entity, state);
			if(this.__isSetAdamant) {
				this.__ie6FixedController.setFixed(this.__iframe, state);
			}
        }
        else {
        
            //设置为fixed状态
            if (state && !this.__isFixed) {
                this.setPosition({
                    x: x - Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                    y: y - Math.max(document.documentElement.scrollTop, document.body.scrollTop)
                });
                this.__entity.style.position = "fixed";
            }
            
            //取消fixed状态
            if (!state && this.__isFixed) {
                this.setPosition({
                    x: x + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
                    y: y + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
                });
                this.__entity.style.position = "absolute";
            }
            
        }
        this.__isFixed = !!state;
        this.__updateIframe();
        
        return this;
    },
    
    /**
     * 设置是否避免被select和flash之类的东东给遮挡
     * @memberOf SinaEditor._.Panel#
     * @param {Boolean} state
     */
    setAdamant: function(state){
        this.__isSetAdamant = !!state;
		if(this.__isSetAdamant && !this.__iframe) {
			this.__createIframe();
		}
        this.__updateIframe();
        return this;
    },
    
	/**
	 * @memberOf SinaEditor._.Panel#
	 */
    destroy: function(){
        if (!this.__entity) {
            return;
        }
        SinaEditor._.Panel.$super.destroy.call(this);
		if(this.__ie6FixedController) {
			this.__ie6FixedController.destroy();
		}
		if(this.__iframe) {
			this.__iframe.parentNode.removeChild(this.__iframe);
		}
    },
    
    /**
     * 设置位置,重写了父类的setPosition方法
     * @memberOf SinaEditor._.Panel#
     * @param {Object} p
     * 					x:Number
     * 					y:Number
     * 					z:Number
     */
    setPosition: function(p){
		if(!this.__isInited) {
			this.__initEntity();
		}
        if (SinaEditor.env.$IE6) {
            this.__ie6FixedController.setPosition(this.__entity, this.__isFixed, p);
        }
        else {
            SinaEditor._.Panel.$super.setPosition.call(this, p);
        }
        this.__updateIframe();
        return this;
    },
    
    /**
     * 设置大小,重写了父类的setSize方法
     * @memberOf SinaEditor._.Panel#
     * @param {Object} p
     * 					width:Number
     * 					height:Number
     */
    setSize: function(p){
        SinaEditor._.Panel.$super.setSize.call(this, p).__updateIframe();
        return this;
    },
    
    /**
     * 显示对象,重写了父类的show方法
     * @memberOf SinaEditor._.Panel#
     * @param {IRenderer} renderer
     */
    show: function(renderer){
        SinaEditor._.Panel.$super.show.call(this, renderer).__updateIframe();
        return this;
    },
    
    /**
     * 隐藏对象,重写了父类的hidden方法
     * @memberOf SinaEditor._.Panel#
     * @param {IRenderer} renderer
     */
    hidden: function(renderer){
        SinaEditor._.Panel.$super.hidden.call(this, renderer).__updateIframe();
        return this;
    },
    
    /**
     * 重写父类的获取x坐标方法，如果是fixed状态，返回的是相对可见区域的x坐标
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __getX: function(){
        if(!this.__isInited) {
			this.__initEntity();
		}
        if (SinaEditor.env.$IE6) {
            return this.__ie6FixedController.getX(this.__entity, this.__isFixed);
        }
        else {
            return parseInt(this.__entity.style.left,10);
        }
    },
    
    /**
     * 重写父类的获取y坐标方法，如果是fixed状态，返回的是相对可见区域的y坐标
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __getY: function(){
        if(!this.__isInited) {
			this.__initEntity();
		}
        if (SinaEditor.env.$IE6) {
            return this.__ie6FixedController.getY(this.__entity, this.__isFixed);
        }
        else {
            return parseInt(this.__entity.style.top,10);
        }
    },
    
	/**
	 * @inner
	 * @memberOf SinaEditor._.Panel#
	 */
    __createIframe: function(){
        this.__iframe = SinaEditor.util.dom.createDom("iframe", {
            attributes: {
                'frameBorder': 'none'
            }
        });
        this.__parent.insertBefore(this.__iframe, this.__entity);
        SinaEditor.util.dom.setStyle(this.__iframe, "opacity", 0);
        if(this.__ie6FixedController) {
			this.__ie6FixedController.iframeNode = this.__iframe;
		}
        this.__updateIframe();
    },
    
	/**
	 * @inner
	 * @memberOf SinaEditor._.Panel#
	 */
    __updateIframe: function(){
        if (this.__iframe) {
            var st = this.__iframe.style;
            st.backgroundColor = "#ffffff";
            st.left = this.x + "px";
            st.top = this.y + "px";
            st.width = this.width + "px";
            st.height = this.height + "px";
            st.position = this.__entity.style.position;
            st.display = this.__entity.style.display;
            st.zIndex = this.__entity.style.zIndex;
			if(SinaEditor.env.$IE6) {
				this.__ie6FixedController.updateIframe(this.__isFixed);
			}
        }
    },
    
    /**
     * 更新IE6Fixed控制器设置的原始坐标
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __updateIE6FCOrgPosition: function(){
        if(this.__ie6FixedController) {
			this.__ie6FixedController.updateOrgPosition();
		}
    },
    
    /**
     * 更新设置的模板数据
     * @inner
     * @memberOf SinaEditor._.Panel#
     * @param {Object} nd
     */
    __updateTemplate: function(nd){
        var l, t, z, p, d, et = this.__entity;
        
        if (et) {
            if(et.parentNode) {
				et.parentNode.removeChild(et);
			}
            l = et.style.left;
            t = et.style.top;
            z = et.style.zIndex;
            p = et.style.position;
            d = et.style.display;
        }
        else {
            d = "none";
        }
        
        et = this.__entity = SinaEditor.util.dom.$E("_" + this.uniqueID + "_panel");
        
        //加上entity的节点，以兼容老版本的模板，以后不用entity的模板后可以去掉
        if (!et) {
            et = this.__entity = SinaEditor.util.dom.$E("_" + this.uniqueID + "_entity");
        }
        if (!et) {
            //如果模板内没有指定#{panel}则抛出异常
            throw new Error("[Panel Error]there missing identifier #{panel} in panel template");
        }
        
        et.style.left = l || 0;
        et.style.top = t || 0;
        et.style.zIndex = z || 0;
        et.style.position = p || "absolute";
        et.style.display = d;
        
        this.__parent.replaceChild(et, nd);
		if(this.__ie6FixedController) {
			this.__ie6FixedController.node = this.__entity;
		}
    },
    
    /**
     * 根据模板获取所有可用节点(模板中以{nodeID}这种形式的节点将会被获取到)
     * @inner
     * @memberOf SinaEditor._.Panel#
     * @param {String} tempalte 模板HTML
     * @param {String} mode "o":返回对象的属性为dom对象(默认)
     *                      "i":返回对象的属性为dom对象的ID
     */
    __getNodes: function(template, mode){
        var m = mode || "o", p = /\{[^\}]+(?=\})/g, i, nodes = {}, rets, r;
        
        //if(m==="i" || !this.__templateNodesIDs.length){
        this.__templateNodesIDs = template.match(p);
        //}
        rets = this.__templateNodesIDs;
        
        if (rets) {
            i = rets.length;
            while (i--) {
                r = rets[i].replace("{", "");
                switch (m) {
                    case "o":
                        nodes[r] = SinaEditor.util.dom.$E("_" + this.uniqueID + "_" + r);
                        break;
                    case "i":
                        nodes[r] = "_" + this.uniqueID + "_" + r;
                        break;
                }
            }
        }
        return nodes;
    },
    
    /**
     * 获取唯一ID
     * @inner
     * @memberOf SinaEditor._.Panel#
     */
    __getUniqueID: function(){
        return parseInt(Math.random() * 1000,10).toString() + (new Date()).getTime().toString();
    },
    
    /**
     * 兼容老版本layer的方法
     * @memberOf SinaEditor._.Panel#
     */
    setContent: function(str){
		if(this.nodes.content) {
			this.nodes.content.innerHTML = str;
		}
    }
});
