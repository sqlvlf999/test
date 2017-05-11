
//插入flash
SinaEditor.plugins.add('flashUI', function(args){
    var editor = this;
    
    if (!args.customerBtn) {
        editor.callPlugin({
            'name': 'flashUIBtn',
            'args': args
        });
    }
    
    if (!args.customerPanel) {
        editor.callPlugin({
            'name': 'flashUIPanel',
            'args': args
        });
    }
    
    /**
     * 插入flash
     * @param {String | Element} node 当前的节点html字符串，或者是节点。
     * @param {Boolean} focus 是否选中添加的flash
     */
    editor.operation.insertFlash = function(node, focus){
        if (typeof node === 'string') {
            node = SinaEditor.util.dom.createDomFromHTML(node, editor.entyDoc);
        }
        var img = SinaEditor.util.dom.createDomFromHTML('<img src="' + SinaEditor.CONF.transparentIMG + '" _se_flash="' + encodeURIComponent(SinaEditor.util.dom.outerHTML(node)) + '" width="' + (node.width || 480) + '" height="' + (node.height || 370) + '" style="background:url(\'' + SinaEditor.CONF.fakeFLASH + '\') no-repeat scroll center center transparent;border:1px solid #A9A9A9;" >', editor.entyDoc);
        editor.operation.addNode(img, focus);
    };
});
