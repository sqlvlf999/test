
/**
 * 缓动公式
 * @class 缓动公式
 * @param {Number} t 当前运行的时间点(ms)
 * @param {Number} b 起始值
 * @param {Number} c 空间距离
 * @param {Number} d 时间距离
 */
SinaEditor._.Transition={
	/**
	 * 简单的变化
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	simple:function(t,b,c,d){
		return c*t/d+b;
	},
	/**
	 * 缓和进入
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	backEaseIn: function(t, b, c, d){
		var s = 1.70158;
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
		
	},
	/**
	 * 缓和出去
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	backEaseOut: function(t, b, c, d){
		var s = 1.70158;
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	/**
	 * 缓和进入和缓和移除
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	backEaseInOut: function(t, b, c, d){
		var s = 1.70158;
		if ((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	/**
	 * 反弹移除
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	bounceEaseOut: function(t, b, c, d){
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		}
		else 
			if (t < (2 / 2.75)) {
				return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
			}
			else 
				if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
				}
				else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
				}
	},
	/**
	 * 反弹移近
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	bounceEaseIn: function(t, b, c, d){
		return c - Transition.bounceEaseOut(d - t, 0, c, d) + b;
	},
	/**
	 * 反弹移近和移除
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	bounceEaseInOut: function(t, b, c, d){
		if (t < d / 2) {
			return Transition.bounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
		}
		else {
			return Transition.bounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
		}
		
	},
	/**
	 * 定期的移近
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	regularEaseIn: function(t, b, c, d){
		return c * (t /= d) * t + b;
	},
	/**
	 * 定期的移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	regularEaseOut: function(t, b, c, d){
		return -c * (t /= d) * (t - 2) + b;
	},
	/**
	 * 定期的移进和移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	regularEaseInOut: function(t, b, c, d){
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	/**
	 * 强力移进
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	strongEaseIn: function(t, b, c, d){
		return c * (t /= d) * t * t * t * t + b;
	},
	/**
	 * 强力移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	strongEaseOut: function(t, b, c, d){
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	/**
	 * 强力移进和移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	strongEaseInOut: function(t, b, c, d){
		if ((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t * t + b;
		}
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	},
	/**
	 * 弹性移进
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	elasticEaseIn: function(t, b, c, d){
		var a,p,s;
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
	
		p = d * 0.3;
		
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	/**
	 * 弹性移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	elasticEaseOut: function(t, b, c, d){
		var a,p,s;
		if (t === 0) {
			return b;
		}
		if ((t /= d) == 1) {
			return b + c;
		}
		if (!p) {
			p = d * 0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		
	},
	/**
	 * 弹性移进和移出
	 * @param {Object} t
	 * @param {Object} b
	 * @param {Object} c
	 * @param {Object} d
	 */
	elasticEaseInOut: function(t, b, c, d){
		var a,p,s;
		if (t === 0) {
			return b;
		}
		if ((t /= d / 2) == 2) {
			return b + c;
		}
		if (!p) {
			p = d * (0.3 * 1.5);
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	}
};