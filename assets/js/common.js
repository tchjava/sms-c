// 娴犮儰绗呮禒锝囩垳閺勵垶鍘ょ純鐢絘yui閹碘晛鐫嶅Ο鈥虫健閻ㄥ嫮娲拌ぐ鏇礉濮ｅ繋閲滄い鐢告桨闁粙娓剁憰浣哥穿閸忥拷
layui.config({
    base: getProjectUrl() + 'assets/module/'
}).extend({
    formSelects: 'formSelects/formSelects-v4',
    treetable: 'treetable-lay/treetable',
    dropdown: 'dropdown/dropdown',
    notice: 'notice/notice',
    step: 'step-lay/step',
    dtree: 'dtree/dtree',
    citypicker: 'city-picker/city-picker',
    tableSelect: 'tableSelect/tableSelect'
}).use(['layer', 'admin', 'element'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    var admin = layui.admin;
    var element = layui.element;

    // 閸楁洘鐖ｇ粵鐐佸蹇涙付鐟曚焦鐗撮幑顔肩摍妞ょ敻娼伴惃鍕勾閸р偓閼辨柨濮╂笟褑绔熼弽蹇曟畱闁鑵戦敍宀€鏁ゆ禍搴ㄢ偓鍌炲帳濞村繗顫嶉崳銊ュ鏉╂稑鎮楅柅鈧幐澶愭尦
    if (window != top && top.layui && top.layui.index && !top.layui.index.pageTabs) {
        top.layui.admin.activeNav(location.href.substring(getProjectUrl().length));
    }

    // 缁夊娅巐oading閸斻劎鏁�
    setTimeout(function () {
        admin.removeLoading();
    }, window == top ? 300 : 150);

});

// 閼惧嘲褰囪ぐ鎾冲妞ゅ湱娲伴惃鍕壌鐠侯垰绶為敍宀勨偓姘崇箖閼惧嘲褰噇ayui.js閸忋劏鐭惧鍕焻閸欐溂ssets娑斿澧犻惃鍕勾閸р偓
function getProjectUrl() {
    var layuiDir = layui.cache.dir;
    if (!layuiDir) {
        var js = document.scripts, last = js.length - 1, src;
        for (var i = last; i > 0; i--) {
            if (js[i].readyState === 'interactive') {
                src = js[i].src;
                break;
            }
        }
        var jsPath = src || js[last].src;
        layuiDir = jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }
    return layuiDir.substring(0, layuiDir.indexOf('assets'));
}