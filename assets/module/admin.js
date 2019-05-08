/** EasyWeb iframe v3.1.0 data:2019-01-17 */

layui.define(['layer'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var bodyDOM = '.layui-layout-admin>.layui-body';
    var tabDOM = bodyDOM + '>.layui-tab';
    var sideDOM = '.layui-layout-admin>.layui-side>.layui-side-scroll';
    var headerDOM = '.layui-layout-admin>.layui-header';
    var tabFilter = 'admin-pagetabs';
    var navFilter = 'admin-side-nav';

    var admin = {
        defaultTheme: 'admin',  // 榛樿涓婚
        tableName: 'easyweb',  // 瀛樺偍琛ㄥ悕
        // 璁剧疆渚ф爮鎶樺彔
        flexible: function (expand) {
            var isExapnd = $('.layui-layout-admin').hasClass('admin-nav-mini');
            if (isExapnd == !expand) {
                return;
            }
            if (expand) {
                $('.layui-layout-admin').removeClass('admin-nav-mini');
            } else {
                $('.layui-layout-admin').addClass('admin-nav-mini');
            }
            admin.removeNavHover();
        },
        // 璁剧疆瀵艰埅鏍忛€変腑
        activeNav: function (url) {
            if (!url) {
                url = window.location.pathname;
                var us = url.split('/');
                url = us[us.length - 1];
            }
            if (url && url != '') {
                $(sideDOM + '>.layui-nav .layui-nav-item .layui-nav-child dd').removeClass('layui-this');
                $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-this');
                var $a = $(sideDOM + '>.layui-nav a[lay-href="' + url + '"]');
                if ($a && $a.length > 0) {
                    if ($(sideDOM + '>.layui-nav').attr('lay-accordion') == 'true') {
                        $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-nav-itemed');
                    }
                    $a.parent().addClass('layui-this');  // 閫変腑褰撳墠
                    $a.parent('dd').parents('.layui-nav-child').parent().addClass('layui-nav-itemed');  // 灞曞紑鎵€鏈夌埗绾�
                    // 閫傞厤澶氱郴缁熸ā寮�
                    $('ul[lay-filter="' + navFilter + '"]').addClass('layui-hide');
                    var $aUl = $a.parents('.layui-nav');
                    $aUl.removeClass('layui-hide');
                    $(headerDOM + '>.layui-nav>.layui-nav-item').removeClass('layui-this');
                    $(headerDOM + '>.layui-nav>.layui-nav-item>a[nav-bind="' + $aUl.attr('nav-id') + '"]').parent().addClass('layui-this');
                } else {
                    // console.warn(url + ' is not in left side');
                }
            } else {
                console.warn('active url not be null');
            }
        },
        // 鍙充晶寮瑰嚭
        popupRight: function (param) {
            if (param.title == undefined) {
                param.title = false;
                param.closeBtn = false;
            }
            if (param.anim == undefined) {
                param.anim = 2;
            }
            if (param.fixed == undefined) {
                param.fixed = true;
            }
            param.isOutAnim = false;
            param.offset = 'r';
            param.shadeClose = true;
            param.area = '336px';
            param.skin = 'layui-layer-adminRight';
            param.move = false;
            return admin.open(param);
        },
        // 灏佽layer.open
        open: function (param) {
            if (!param.area) {
                param.area = (param.type == 2) ? ['360px', '300px'] : '360px';
            }
            if (!param.skin) {
                param.skin = 'layui-layer-admin';
            }
            if (!param.offset) {
                param.offset = '35px';
            }
            if (param.fixed == undefined) {
                param.fixed = false;
            }
            param.resize = param.resize != undefined ? param.resize : false;
            param.shade = param.shade != undefined ? param.shade : .1;
            var eCallBack = param.end;
            param.end = function () {
                layer.closeAll('tips');
                eCallBack && eCallBack();
            };
            return layer.open(param);
        },
        //自定义一个http请求，封装ajax
        http:function(url,post,data,success,async){
            //判断cookie是否失效
            admin.ajax({
               url:url,
               data:JSON.stringify(data),
               type:post,
               dataType:'json',
               contentType:'application/json',
               success:success,
                async:async==false?false:true
            });
        },
        // 灏佽ajax璇锋眰锛岃繑鍥炴暟鎹被鍨嬩负json
        req: function (url, data, success, method) {
            admin.ajax({
                url: url,
                data: data,
                type: method,
                dataType: 'json',
                success: success
            });
        },
        // 灏佽ajax璇锋眰
        ajax: function (param) {
            var successCallback = param.success;
            param.success = function (result, status, xhr) {
                // 鍒ゆ柇鐧诲綍杩囨湡鍜屾病鏈夋潈闄�
                var jsonRs;
                if ('json' == param.dataType.toLowerCase()) {
                    jsonRs = result;
                } else {
                    jsonRs = admin.parseJSON(result);
                }
                if (jsonRs && admin.ajaxSuccessBefore(jsonRs) == false) {
                    return;
                }
                successCallback(result, status, xhr);
            };
            param.error = function (xhr) {
                param.success({code: xhr.status, msg: xhr.statusText});
            };
            param.beforeSend = function (xhr) {
                var headers = admin.getAjaxHeaders();
                for (var i = 0; i < headers.length; i++) {
                    xhr.setRequestHeader(headers[i].name, headers[i].value);
                }
            };
            $.ajax(param);
        },
        // ajax棰勫鐞�
        ajaxSuccessBefore: function (res) {
            if (res.code == 401) {
                layer.msg(res.msg, {icon: 2, time: 1500}, function () {
                    // location.replace('./login');
                }, 1000);
                return false;
            }
        },
        // ajax缁熶竴浼犻€抙eader
        getAjaxHeaders: function () {
            var headers = new Array();
            // headers.push({name: 'token', value: 'xxx'});
            return headers;
        },
        // 鍒ゆ柇鏄惁涓簀son
        parseJSON: function (str) {
            if (typeof str == 'string') {
                try {
                    var obj = JSON.parse(str);
                    if (typeof obj == 'object' && obj) {
                        return obj;
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        },
        // 鏄剧ず鍔犺浇鍔ㄧ敾
        showLoading: function (elem) {
            if (!elem) {
                elem = 'body';
            }
            $(elem).addClass('page-no-scroll');
            $(elem).append('<div class="page-loading"><div class="rubik-loader"></div></div>');
        },
        // 绉婚櫎鍔犺浇鍔ㄧ敾
        removeLoading: function (elem) {
            if (!elem) {
                elem = 'body';
            }
            $(elem).children('.page-loading').remove();
            $(elem).removeClass('page-no-scroll');
        },
        // 缂撳瓨涓存椂鏁版嵁
        putTempData: function (key, value) {
            if (value != undefined && value != null) {
                layui.sessionData('tempData', {key: key, value: value});
            } else {
                layui.sessionData('tempData', {key: key, remove: true});
            }
        },
        // 鑾峰彇缂撳瓨涓存椂鏁版嵁
        getTempData: function (key) {
            return layui.sessionData('tempData')[key];
        },
        // 婊戝姩閫夐」鍗�
        rollPage: function (d) {
            var $tabTitle = $(tabDOM + '>.layui-tab-title');
            var left = $tabTitle.scrollLeft();
            if ('left' === d) {
                $tabTitle.animate({'scrollLeft': left - 120}, 100);
            } else if ('auto' === d) {
                var autoLeft = 0;
                $tabTitle.children("li").each(function () {
                    if ($(this).hasClass('layui-this')) {
                        return false;
                    } else {
                        autoLeft += $(this).outerWidth();
                    }
                });
                $tabTitle.animate({'scrollLeft': autoLeft - 120}, 100);
            } else {
                $tabTitle.animate({'scrollLeft': left + 120}, 100);
            }
        },
        // 鍒锋柊褰撳墠tab
        refresh: function (url) {
            var $iframe;
            if (!url) {
                $iframe = $(tabDOM + '>.layui-tab-content>.layui-tab-item.layui-show>.admin-iframe');
                if (!$iframe || $iframe.length <= 0) {
                    $iframe = $(bodyDOM + '>.admin-iframe');
                }
            } else {
                $iframe = $(tabDOM + '>.layui-tab-content>.layui-tab-item>.admin-iframe[lay-id="' + url + '"]');
                if (!$iframe || $iframe.length <= 0) {
                    $iframe = $(bodyDOM + '>.admin-iframe');
                }
            }
            if ($iframe && $iframe[0]) {
                $iframe[0].contentWindow.location.reload(true);
            } else {
                console.warn(url + ' is not found');
            }
        },
        // 鍏抽棴褰撳墠閫夐」鍗�
        closeThisTabs: function (url) {
            admin.closeTabOperNav();
            var $title = $(tabDOM + '>.layui-tab-title');
            if (!url) {
                if ($title.find('li').first().hasClass('layui-this')) {
                    layer.msg('涓婚〉涓嶈兘鍏抽棴', {icon: 2});
                    return;
                }
                $title.find('li.layui-this').find(".layui-tab-close").trigger("click");
            } else {
                if (url == $title.find('li').first().attr('lay-id')) {
                    layer.msg('涓婚〉涓嶈兘鍏抽棴', {icon: 2});
                    return;
                }
                $title.find('li[lay-id="' + url + '"]').find(".layui-tab-close").trigger("click");
            }
        },
        // 鍏抽棴鍏朵粬閫夐」鍗�
        closeOtherTabs: function (url) {
            if (!url) {
                $(tabDOM + '>.layui-tab-title li:gt(0):not(.layui-this)').find('.layui-tab-close').trigger('click');
            } else {
                $(tabDOM + '>.layui-tab-title li:gt(0)').each(function () {
                    if (url != $(this).attr('lay-id')) {
                        $(this).find('.layui-tab-close').trigger('click');
                    }
                });
            }
            admin.closeTabOperNav();
        },
        // 鍏抽棴鎵€鏈夐€夐」鍗�
        closeAllTabs: function () {
            $(tabDOM + '>.layui-tab-title li:gt(0)').find('.layui-tab-close').trigger('click');
            $(tabDOM + '>.layui-tab-title li:eq(0)').trigger('click');
            admin.closeTabOperNav();
        },
        // 鍏抽棴閫夐」鍗℃搷浣滆彍鍗�
        closeTabOperNav: function () {
            $('.layui-icon-down .layui-nav .layui-nav-child').removeClass('layui-show');
        },
        // 璁剧疆涓婚
        changeTheme: function (theme) {
            if (theme) {
                layui.data(admin.tableName, {key: 'theme', value: theme});
                if ('admin' == theme) {
                    theme = undefined;
                }
            } else {
                layui.data(admin.tableName, {key: 'theme', remove: true});
            }
            admin.removeTheme(top);
            !theme || top.layui.link(admin.getThemeDir() + theme + '.css', theme);
            var ifs = top.window.frames;
            for (var i = 0; i < ifs.length; i++) {
                var tif = ifs[i];
                try {
                    admin.removeTheme(tif);
                } catch (e) {
                }
                if (theme && tif.layui) {
                    tif.layui.link(admin.getThemeDir() + theme + '.css', theme);
                }
            }
        },
        // 绉婚櫎涓婚
        removeTheme: function (w) {
            if (!w) {
                w = window;
            }
            if (w.layui) {
                var themeId = 'layuicss-theme';
                w.layui.jquery('link[id^="' + themeId + '"]').remove();
            }
        },
        // 鑾峰彇涓婚鐩綍
        getThemeDir: function () {
            return layui.cache.base + 'theme/';
        },
        // 鍏抽棴iframe鎵€鍦ㄧ殑layer寮圭獥
        closeThisDialog: function () {
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        },
        // 鍏抽棴鎵€鍦ㄧ殑寮圭獥
        closeDialog: function (elem) {
            var id = $(elem).parents('.layui-layer').attr('id').substring(11);
            layer.close(id);
        },
        // 璁╁綋鍓嶇殑ifram寮瑰眰鑷€傚簲楂樺害
        iframeAuto: function () {
            parent.layer.iframeAuto(parent.layer.getFrameIndex(window.name));
        },
        // 鑾峰彇娴忚鍣ㄩ珮搴�
        getPageHeight: function () {
            return document.documentElement.clientHeight || document.body.clientHeight;
        },
        // 鑾峰彇娴忚鍣ㄥ搴�
        getPageWidth: function () {
            return document.documentElement.clientWidth || document.body.clientWidth;
        },
        // 鍏抽棴瀵艰埅鑿滃崟鎶樺彔鎮诞鏁堟灉
        removeNavHover: function () {
            $('.admin-nav-hover>.layui-nav-child').css({
                'top': 'auto',
                'max-height': 'none',
                'overflow': 'auto'
            });
            $('.admin-nav-hover').removeClass('admin-nav-hover');
        },
        // 鑷姩璁＄畻瀵艰埅鑿滃崟鎮诞鐨勬牱寮�
        setNavHoverCss: function ($that) {
            var $nav = $('.admin-nav-hover>.layui-nav-child');
            if ($that && $nav.length > 0) {
                var isOver = ($that.offset().top + $nav.outerHeight()) > window.innerHeight;  // 鏄惁婧㈠嚭灞忓箷
                if (isOver) {
                    var newTop = $that.offset().top - $nav.outerHeight() + $that.outerHeight();
                    if (newTop < 50) {
                        var pageHeight = admin.getPageHeight();
                        if ($that.offset().top < pageHeight / 2) {
                            $nav.css({
                                'top': '50px',
                                'max-height': pageHeight - 50 + 'px',
                                'overflow': 'auto'
                            });
                        } else {
                            $nav.css({
                                'top': $that.offset().top,
                                'max-height': pageHeight - $that.offset().top,
                                'overflow': 'auto'
                            });
                        }
                    } else {
                        $nav.css('top', newTop);
                    }
                } else {
                    $nav.css('top', $that.offset().top);
                }
                isHover = true;
            }
        }
    };

    // ewAdmin鎻愪緵鐨勪簨浠�
    admin.events = {
        // 鎶樺彔渚у鑸�
        flexible: function (e) {
            var expand = $('.layui-layout-admin').hasClass('admin-nav-mini');
            admin.flexible(expand);
        },
        // 鍒锋柊涓讳綋閮ㄥ垎
        refresh: function () {
            admin.refresh();
        },
        //鍚庨€€
        back: function () {
            history.back();
        },
        // 璁剧疆涓婚
        theme: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({
                type: 2,
                content: url ? url : 'page/tpl/tpl-theme.html'
            });
        },
        // 鎵撳紑渚跨
        note: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({
                id: 'layer-note',
                title: '渚跨',
                type: 2,
                closeBtn: false,
                content: url ? url : 'page/tpl/tpl-note.html'
            });
        },
        // 鎵撳紑娑堟伅
        message: function () {
            var url = $(this).attr('data-url');
            admin.popupRight({
                type: 2,
                content: url ? url : 'page/tpl/tpl-message.html'
            });
        },
        // 鎵撳紑淇敼瀵嗙爜寮圭獥
        psw: function () {
            var url = $(this).attr('data-url');
            admin.open({
                id: 'pswForm',
                type: 2,
                title: '淇敼瀵嗙爜',
                shade: 0,
                content: url ? url : 'page/tpl/tpl-password.html'
            });
        },
        // 閫€鍑虹櫥褰�
        logout: function () {
            var url = $(this).attr('data-url');
            layer.confirm('确定退出系统吗?', {
                title: '退出',
                skin: 'layui-layer-admin'
            }, function () {
                location.replace(url ? url : '/login.html');
            });
        },
        // 鍏ㄥ睆
        fullScreen: function (e) {
            var ac = 'layui-icon-screen-full', ic = 'layui-icon-screen-restore';
            var ti = $(this).find('i');

            var isFullscreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
            if (isFullscreen) {
                var efs = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
                if (efs) {
                    efs.call(document);
                } else if (window.ActiveXObject) {
                    var ws = new ActiveXObject('WScript.Shell');
                    ws && ws.SendKeys('{F11}');
                }
                ti.addClass(ac).removeClass(ic);
            } else {
                var el = document.documentElement;
                var rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
                if (rfs) {
                    rfs.call(el);
                } else if (window.ActiveXObject) {
                    var ws = new ActiveXObject('WScript.Shell');
                    ws && ws.SendKeys('{F11}');
                }
                ti.addClass(ic).removeClass(ac);
            }
        },
        // 宸︽粦鍔╰ab
        leftPage: function () {
            admin.rollPage("left");
        },
        // 鍙虫粦鍔╰ab
        rightPage: function () {
            admin.rollPage();
        },
        // 鍏抽棴褰撳墠閫夐」鍗�
        closeThisTabs: function () {
            admin.closeThisTabs();
        },
        // 鍏抽棴鍏朵粬閫夐」鍗�
        closeOtherTabs: function () {
            admin.closeOtherTabs();
        },
        // 鍏抽棴鎵€鏈夐€夐」鍗�
        closeAllTabs: function () {
            admin.closeAllTabs();
        },
        // 鍏抽棴褰撳墠iframe寮圭獥
        closeDialog: function () {
            admin.closeThisDialog();
        },
        // 鍏抽棴褰撳墠iframe寮圭獥
        closePageDialog: function () {
            admin.closeDialog(this);
        }
    };

    // 鎵€鏈塭w-event
    $('body').on('click', '*[ew-event]', function () {
        var event = $(this).attr('ew-event');
        var te = admin.events[event];
        te && te.call(this, $(this));
    });

    // 绉诲姩璁惧閬僵灞傜偣鍑讳簨浠�
    $('.site-mobile-shade').click(function () {
        admin.flexible(true);
    });

    // 渚у鑸姌鍙犵姸鎬佷笅榧犳爣缁忚繃鏄剧ず鎻愮ず
    var isHover = false;
    $('body').on('mouseenter', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        if (admin.getPageWidth() > 750) {
            var $that = $(this);
            $('.admin-nav-hover>.layui-nav-child').css('top', 'auto');
            $('.admin-nav-hover').removeClass('admin-nav-hover');
            $that.parent().addClass('admin-nav-hover');
            var $nav = $('.admin-nav-hover>.layui-nav-child');
            if ($nav.length > 0) {
                admin.setNavHoverCss($that);
            } else {
                var tipText = $that.find('cite').text();
                var bgColor = $('.layui-layout-admin .layui-side').css('background-color');
                bgColor = (bgColor == 'rgb(255, 255, 255)' ? '#009688' : bgColor);
                layer.tips(tipText, $that, {tips: [2, bgColor], time: -1});
            }
        }
    }).on('mouseleave', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        layer.closeAll('tips');
    });

    // 榧犳爣绂诲紑渚у鑸叧闂姌鍙犳诞绐�
    $('body').on('mouseleave', '.layui-layout-admin.admin-nav-mini .layui-side', function () {
        isHover = false;
        setTimeout(function () {
            if (!isHover) {
                admin.removeNavHover();
            }
        }, 500);
    });

    $('body').on('mouseenter', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item.admin-nav-hover .layui-nav-child', function () {
        isHover = true;
    });

    // 渚у鑸姌鍙犵姸鎬佷笅鐐瑰嚮灞曞紑
    /*$('body').on('click', '.layui-layout-admin.admin-nav-mini .layui-side .layui-nav .layui-nav-item>a', function () {
        if (admin.getPageWidth() > 750) {
            layer.closeAll('tips');
            $('li.layui-nav-itemed').removeClass('layui-nav-itemed');
            $(this).parent().addClass('layui-nav-itemed');
            admin.flexible(true);
        }
    });*/

    // 鎵€鏈塴ay-tips澶勭悊
    $('body').on('mouseenter', '*[lay-tips]', function () {
        var tipText = $(this).attr('lay-tips');
        var dt = $(this).attr('lay-direction');
        var bgColor = $(this).attr('lay-bg');
        layer.tips(tipText, this, {tips: [dt || 3, bgColor || '#333333'], time: -1});
    }).on('mouseleave', '*[lay-tips]', function () {
        layer.closeAll('tips');
    });

    // 鎵€鏈塭w-href澶勭悊
    $('body').on('click', '*[ew-href]', function () {
        var url = $(this).attr('ew-href');
        var title = $(this).text();
        top.layui.index.openTab({
            title: title,
            url: url
        });
    });

    // 甯姪榧犳爣鍙抽敭鑿滃崟瀹屾垚鐐瑰嚮绌虹櫧鍏抽棴鐨勫姛鑳�
    if (!layui.contextMenu) {
        $(document).off('click.ctxMenu').on('click.ctxMenu', function () {
            var ifs = top.window.frames;
            for (var i = 0; i < ifs.length; i++) {
                var tif = ifs[i];
                try {
                    tif.layui.jquery('.ctxMenu').remove();
                } catch (e) {
                }
            }
            top.layui.jquery('.ctxMenu').remove();
        });
    }

    // 鍔犺浇缂撳瓨鐨勪富棰�
    var theme = layui.data(admin.tableName).theme;
    if (theme) {
        (theme == 'admin') || layui.link(admin.getThemeDir() + theme + '.css', theme);
    } else if ('admin' != admin.defaultTheme) {
        layui.link(admin.getThemeDir() + admin.defaultTheme + '.css', admin.defaultTheme);
    }

    // 鍒ゆ柇鏄惁寮€鍚鏍囩
    if (top.layui && top.layui.index && top.layui.index.pageTabs) {
        $('body').addClass('tab-open');
    }

    exports('admin', admin);
});
