
if (!window.SinaEditor) {
    SinaEditor = {};
}

/**
 * @fileoverview 类和接口的定义
 * @author Random | YangHao@staff.sina.com.cn
 * @created 2010-10-14
 * @example
 *
 * 类定义
 * var SuperClass=function(name){
 this.name=name;
 this.list=["a","b"];
 }.$define({
 show:function(){
 alert(this.name);
 }
 });
 
 var SubClass=function(name,age){
 this.age=age;
 }.$extends(SuperClass).$define({
 display:function(){
 alert(this.age);
 }
 });
 
 var Sub=function(name,age){
 
 }.$extends(SubClass).$define({
 show:function(){
 this.constructor.$super.show.call(this);
 alert("haahh");
 }
 });
 *
 * 接口实现
 * var IExampleInterface={
 show:function(){},
 hidden:function(){}
 };
 
 var Class1=function(){
 
 }.$implements(IExampleInterface).$define({
 show:function(){
 alert("show");
 },
 hidden:function(){
 alert("hidden");
 }
 });
 
 var Class1=function(){
 }.$extends(SuperClass).$implements(IExampleInterface).$define({
 show:function(){
 alert("show");
 },
 hidden:function(){
 alert("hidden");
 }
 });
 */
(function(){
    function object(o){
        function F(){
        }
        F.prototype = o;
        return new F();
    }
    
    /**
     * 类的定义
     */
    Function.prototype.$define = function(def){
        var k;
        for (k in def) {
			if(def.hasOwnProperty(k)) {
				this.prototype[k] = def[k];
			}
        }
        
        if (this.__interface__) {
            for (k in this.prototype) {
                if (this.prototype[k] === "NI") {
                    throw new Error("类定义错误，接口方法[" + k + "]未实现");
                }
            }
        }
        
        this.prototype.constructor = this;
        this.$extends = this.$define = this.$implements = function(){
            throw new Error("$define语句定义后面不能再作其它定义");
        };
        return this;
    };
    
    
    
    /**
     * 类继承的定义
     */
    Function.prototype.$extends = function(){
        var me = this, i = arguments.length, sup, fn;
        
        if (i === 0) {
            throw new Error("$extends语句错误：未指定父类");
        }
        
        sup = arguments[0];
        fn = function(){
            sup.apply(this, arguments);
            me.apply(this, arguments);
        };
        fn.prototype = object(sup.prototype);
        fn.prototype.constructor = fn;
        fn.$super = sup.prototype;
        
        return fn;
    };
    
    
    
    /**
     * 接口实现方法的定义，接口是以Object对象的空方法实现的
     */
    Function.prototype.$implements = function(){
        var arg = Array.prototype.slice.call(arguments, 0), fn, i = arg.length, k;
        
        while (i--) {
            if (typeof arg[i] !== "object") {
                throw new Error("$implements语句错误：参数必须为object类型");
            }
            
            for (k in arg[i]) {
                if(typeof this.prototype[k] === "undefined") {
					this.prototype[k] = "NI";
				}
            }
        }
        
        this.__interface__ = true;
        
        this.$extends = function(){
            throw new Error("$extends语句错误:$extends语句不能出现在$implements定义之后");
        };
        
        return this;
    };
})();

