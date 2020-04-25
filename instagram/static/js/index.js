window.onload=function(){
    var pages = document.getElementById('pages');
    var pag = pages.children;

    //删除节点
    function removeNode(node){
        node.parentNode.removeChild(node);
    }

    //赞分享
    function praiseMod(mod, el) {
        var txt = el.innerHTML;
        var praisesTotal = mod.getElementsByClassName('praises-total')[0];
        var oldTotal = parseInt(praisesTotal.getAttribute('total'));
        var newTotal;
        if (txt == '赞') {
            newTotal = oldTotal + 1;
            praisesTotal.setAttribute('total', newTotal);
            praisesTotal.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
            el.innerHTML = '取消赞';
        }
        else {
            newTotal = oldTotal - 1;
            praisesTotal.setAttribute('total', newTotal);
            praisesTotal.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';
            el.innerHTML = '赞';
        }
        praisesTotal.style.display = (newTotal == 0) ? 'none' : 'block';
    }

    for(var i = 0; i<pag.length;i++){
        pag[i].onclick = function(e){
            e = e || window.event;
            var el = e.srcElement;
            switch(el.className){
                case'close':
                    removeNode(el.parentNode);
                    break;
                //赞分享
                case 'praise':
                    praiseMod(el.parentNode.parentNode.parentNode, el);
                    break;
            }
        }
    }
}