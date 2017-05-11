/**
 * @namespace
 */
if (!SinaEditor.$abstract) {
    SinaEditor.$abstract = {};
}

/**
 * 创建模板，模板通常是纯HTML的骨架，填充内容后生成最终的重复HTML代码。<br>
 * 所有要替换的内容用#{唯一ID}作为标记,在传入数据时进行替换。<br>
 * 通过以下实例可以理解它的使用方法：<br>
 * @class 创建模板
 * @param {String} tmpl 模板的骨架
 * @example
 * var tpl = 'this is a #{vo}.';
 * var temp = new SinaEditor.$abstract.Template(tpl);
 * alert(temp.evaluate({'vo':'cat'}));//this is a cat.
 */
SinaEditor.$abstract.Template = function(tmpl){
    this.tmpl = tmpl;
    this.pattern = /(#\{([^\}]+)(?=\})})/g;
};

SinaEditor.$abstract.Template.prototype = {
    /**
     * 通过指定的数据生成最终要渲染的内容。
     * @param {Object} data 渲染模板所需要的数据,对应与模板中需要的数据,形如:{'key':'value'}
     * @return {String} 最终需要的模板
     */
    evaluate: function(data){
        return this.tmpl.replace(this.pattern, function(a, b, c){
            return data[c] || "";
        });
    },
    /**
     * 渲染多条数据的方法
     * @param {Array} data 渲染模板所需要的数据(多条),形如:[{'key':'value1'},{'key':'value2'}]
     * @param {Boolean} opt_reverse	是否进行反向渲染，即第一条被置换到最后一条，依次置换。默认不反向输出。
     * @example
     * var tpl = 'this is a #{vo}.';
     * var temp = new SinaEditor.$abstract.Template(tpl);
     * alert(temp.evaluate([{'vo':'cat'},{'vo':'dog'}]));//this is a cat.this is a dog.
     * @return {String} 最终需要的多条数据模板
     */
    evaluateMulti: function(data, reverse){
        var _buffer = [];
        var __this = this;
        this.__foreach(data, function(v, i){
            i = reverse ? data.length - i : i;
            _buffer[i] = __this.evaluate(v);
        });
        return _buffer.join("");
    },
	/**
	 * @inner 遍历数组
	 * @param {Object} ar
	 * @param {Object} insp
	 */
    __foreach: function(ar, insp){
        if (ar === null && ar.constructor !== Array) {
            return [];
        }
        var i = 0, len = ar.length, r = [];
        while (i < len) {
            var x = insp(ar[i], i);
            if (x !== null) {
                r[r.length] = x;
            }
            i++;
        }
        return r;
    }
};