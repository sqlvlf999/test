
if (!window.console) {
    console = {};
    console.log = function(){};
}

if(!window.SinaEditor) {
	SinaEditor = {};
}

if(!SinaEditor.env) {
	/**
	 * 对浏览器的检测和系统的检测
	 * @namespace
	 */
	SinaEditor.env = {};
}

//当前浏览器检测
(function(ns){
	var _ua = navigator.userAgent.toLowerCase();
	/**
	 * IE系列浏览器，并返回版本号
	 * @name SinaEditor.env.$IE
	 */
	var ieArr = /msie (\d+)\./.exec(_ua) || [];
	ns.$IE = ieArr[1];
	/**
	 * opear系列浏览器
	 * @name SinaEditor.env.$OPERA
	 */
	ns.$OPERA = /opera/.test(_ua);
	/**
	 * 使用gecko引擎的浏览器 
	 * @name SinaEditor.env.$GENKO
	 */
	ns.$GENKO = /gecko\//.test(_ua);
	/**
	 * 使用webkit引擎的浏览器 
	 * @name SinaEditor.env.$WEBKIT
	 */
	ns.$WEBKIT = /applewebkit/.test(_ua);
	/**
	 * IE6浏览器
	 * @name SinaEditor.env.$IE6
	 */
	ns.$IE6 = /msie 6/.test(_ua);
	/**
	 * IE7浏览器
	 * @name SinaEditor.env.$IE6
	 */
	ns.$IE7 = /msie 7/.test(_ua);
	/**
	 * IE8浏览器
	 * @name SinaEditor.env.$IE8
	 */
	ns.$IE8 = /msie 8/.test(_ua);
	/**
	 * IE9浏览器
	 * @name SinaEditor.env.$IE8
	 */
	ns.$IE9 = /msie 9/.test(_ua);
	/**
	 * XP系统
	 * @name SinaEditor.env.$winXP
	 */
	ns.$winXP=/windows nt 5.1/.test(_ua);
	/**
	 * vista 操作系统
	 * @name SinaEditor.env.$winVista
	 */
	ns.$winVista=/windows nt 6.0/.test(_ua);
	/**
	 * firefox系列浏览器
	 * @name SinaEditor.env.$FF
	 */
	ns.$FF = /firefox/i.test(_ua);
	/**
	 * chrome浏览器
	 * @name SinaEditor.env.$CHROME
	 */
	ns.$CHROME = /chrome\//i.test(_ua);
	/**
	 * safari浏览器
	 * @name SinaEditor.env.$SAFARI
	 */
	ns.$SAFARI = /safari/.test(_ua) && !ns.$CHROME;
	/**
	 * 腾讯TT浏览器
	 * @name SinaEditor.env.$TT
	 */
	ns.$TT=/tencenttraveler/.test(_ua);
	/**
	 * 360浏览器
	 * @name SinaEditor.env.$360
	 */
	ns.$360=/360se/.test(_ua);
	/**
	 * 遨游浏览器
	 * @name SinaEditor.env.$Maxthon
	 */
	ns.$Maxthon=false;
	try{
		var t=window.external;
		ns.$Maxthon=t.max_version?true:false;
	}catch(e){}
	/**
	 * 当前的域和当前的host是否相同，依此来决定是否需要为iframe设置domain
	 * @name SinaEditor.env.isCustomDomain
	 */
	ns.isCustomDomain = (function(){
		var domain = document.domain,
			hostname = window.location.hostname;

		return this.$IE &&
			domain !== hostname &&
			domain !== ( '[' + hostname + ']' );
	}());
}(SinaEditor.env));
