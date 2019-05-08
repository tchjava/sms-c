/** EasyWeb iframe v3.1.0 data:2019-01-17 */

layui.define(['layer', 'admin', 'element', 'contextMenu'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var admin = layui.admin;
    var element = layui.element;
    var contextMenu = layui.contextMenu;
    var cacheTab = layui.data(admin.tableName).cacheTab;
    var tabEndCall = {};
    var bodyDOM = '.layui-layout-admin>.layui-body';
    var tabDOM = bodyDOM + '>.layui-tab';
    var sideDOM = '.layui-layout-admin>.layui-side>.layui-side-scroll';
    var headerDOM = '.layui-layout-admin>.layui-header';
    var tabFilter = 'admin-pagetabs';
    var navFilter = 'admin-side-nav';

    var index = {
        pageTabs: true,  // 鏄惁寮€鍚鏍囩
        maxTabNum: 20,  // 鏈€澶氭墦寮€澶氬皯涓猼ab
        openTabCtxMenu: true,  // 鏄惁寮€鍚疶ab鍙抽敭鑿滃崟
        cacheTab: cacheTab == undefined ? true : cacheTab,  // 鏄惁璁板繂鎵撳紑鐨勯€夐」鍗�
        mTabList: [], // 褰撳墠Tab
        mTabPosition: undefined, // 褰撳墠閫変腑Tab
        // 鍔犺浇涓讳綋閮ㄥ垎
        loadView: function (param) {
            var menuPath = param.menuPath;
            var menuName = param.menuName;
            if (!menuPath) {
                console.error('url涓嶈兘涓虹┖');
                layer.msg('url涓嶈兘涓虹┖', {icon: 2});
                return;
            }
            // 鏄惁寮€鍚鏍囩
            if (index.pageTabs) {
                // 鍒ゆ柇閫夐」鍗℃槸鍚﹀凡娣诲姞
                var flag = false;
                $(tabDOM + '>.layui-tab-title>li').each(function () {
                    if ($(this).attr('lay-id') === menuPath) {
                        flag = true;
                        return false;
                    }
                });
                // 娌℃湁鍒欐坊鍔�
                if (!flag) {
                    if (index.mTabList.length >= index.maxTabNum) {
                        layer.msg('鏈€澶氭墦寮€' + index.maxTabNum + '涓€夐」鍗�', {icon: 2});
                        admin.activeNav(index.mTabPosition);
                        return;
                    }
                    element.tabAdd(tabFilter, {
                        id: menuPath,
                        title: menuName ? menuName : '鏃犳爣棰�',
                        content: '<iframe lay-id="' + menuPath + '" src="' + menuPath + '" frameborder="0" class="admin-iframe"></iframe>'
                    });
                    index.mTabList.push(param);
                    if (index.cacheTab) {  // 璁板繂閫夐」鍗�
                        admin.putTempData('indexTabs', index.mTabList);
                    }
                }
                // 鍒囨崲鍒拌閫夐」鍗�
                element.tabChange(tabFilter, menuPath);
            } else {
                var $contentDom = $(bodyDOM + '>.admin-iframe');
                if (!$contentDom || $contentDom.length <= 0) {
                    $(bodyDOM).html('<iframe lay-id="' + menuPath + '" src="' + menuPath + '" frameborder="0" class="admin-iframe"></iframe>');
                } else {
                    $contentDom.attr('lay-id', menuPath);
                    $contentDom.attr('src', menuPath);
                }
                // 璁板繂閫夐」鍗�
                index.mTabList.splice(0, index.mTabList.length);
                index.mTabList.push(param);
                if (index.cacheTab) {
                    admin.putTempData('indexTabs', index.mTabList);
                }
                // 璁板綍褰撳墠Tab浣嶇疆
                index.mTabPosition = param.menuPath;
                if (index.cacheTab) {
                    admin.putTempData('tabPosition', index.mTabPosition);
                }
            }
            // 绉诲姩璁惧鍒囨崲椤甸潰闅愯棌渚у鑸�
            if (admin.getPageWidth() <= 750) {
                admin.flexible(true);
            }
        },
        // 加载主页
        loadHome: function (param) {
            index.loadView({
                menuPath: param.menuPath,
                menuName: param.menuName
            });
            if (!index.pageTabs) {
                admin.activeNav(param.menuPath);  // 璁剧疆瀵艰埅鏍忛€変腑
            }
        },
        // 鎵撳紑鏂伴〉闈�
        openTab: function (param) {
            var url = param.url;
            var title = param.title;
            if (param.end) {
                tabEndCall[url] = param.end;
            }
            index.loadView({
                menuPath: url,
                menuName: title
            });
        },
        // 鍏抽棴閫夐」鍗�
        closeTab: function (url) {
            element.tabDelete(tabFilter, url);
        },
        // 鍔犺浇璁剧疆
        loadSetting: function () {
            // 鎭㈠璁板繂鐨則ab閫夐」鍗�
            if (index.cacheTab) {
                var indexTabs = admin.getTempData('indexTabs');
                if (indexTabs) {
                    var tabPosition = admin.getTempData('tabPosition');
                    var mi = -1;
                    for (var i = 0; i < indexTabs.length; i++) {
                        if (index.pageTabs) {
                            index.loadView(indexTabs[i]);
                        }
                        if (indexTabs[i].menuPath == tabPosition) {
                            mi = i;
                        }
                    }
                    if (mi != -1) {
                        setTimeout(function () {
                            index.loadView(indexTabs[mi]);
                            if (!index.pageTabs) {
                                admin.activeNav(tabPosition);
                            }
                        }, 150);
                    }
                }
            }
            // 鏄惁寮€鍚痜ooter
            var openFooter = layui.data(admin.tableName).openFooter;
            if (openFooter != undefined && openFooter == false) {
                $('body.layui-layout-body').addClass('close-footer');
            }
            // 鏄惁寮€鍚痶ab鑷姩鍒锋柊
            var tabAutoRefresh = layui.data(admin.tableName).tabAutoRefresh;
            if (tabAutoRefresh) {
                $(tabDOM).attr('lay-autoRefresh', 'true');
            }
        },
        // 璁剧疆鏄惁璁板繂Tab
        setTabCache: function (isCache) {
            layui.data(admin.tableName, {key: 'cacheTab', value: isCache});
            index.cacheTab = isCache;
            if (isCache) {
                admin.putTempData('indexTabs', index.mTabList);
                admin.putTempData('tabPosition', index.mTabPosition);
            } else {
                admin.putTempData('indexTabs', []);
                admin.putTempData('tabPosition', undefined);
            }
        },
        // 娓呴櫎閫夐」鍗¤蹇�
        closeTabCache: function () {
            admin.putTempData('indexTabs', undefined);
        }
    };

    // 鐩戝惉渚у鑸爮鐐瑰嚮浜嬩欢
    element.on('nav(' + navFilter + ')', function (elem) {
        var $that = $(elem);
        var menuUrl = $that.attr('lay-href');
        var menuId = $that.attr('lay-id');
        if (!menuId) {
            menuId = menuUrl;
        }
        if (menuUrl && menuUrl != 'javascript:;') {
            var menuName = $that.text().replace(/(^\s*)|(\s*$)/g, '');
            index.loadView({
                menuId: menuId,
                menuPath: menuUrl,
                menuName: menuName
            });
        } else if ('true' === $(sideDOM + '>.layui-nav-tree').attr('lay-accordion') && $that.parent().hasClass('layui-nav-item')) {
            if ($that.parent().hasClass('layui-nav-itemed') || $that.parent().hasClass('layui-this')) {
                $(sideDOM + '>.layui-nav .layui-nav-item').removeClass('layui-nav-itemed');
                $that.parent().addClass('layui-nav-itemed');
            }
            $that.trigger('mouseenter');
        } else {
            admin.setNavHoverCss($that.parentsUntil('.layui-nav-item').parent().children().eq(0));
        }
    });

    // tab閫夐」鍗″垏鎹㈢洃鍚�
    element.on('tab(' + tabFilter + ')', function (data) {
        var layId = $(this).attr('lay-id');

        index.mTabPosition = layId;  // 璁板綍褰撳墠Tab浣嶇疆
        if (index.cacheTab) {
            admin.putTempData('tabPosition', index.mTabPosition);
        }
        admin.rollPage('auto');  // 鑷姩婊氬姩
        admin.activeNav(layId);  // 璁剧疆瀵艰埅鏍忛€変腑

        // 瑙ｅ喅鍒囨崲tab婊氬姩鏉℃椂鑰屾秷澶辩殑闂
        var $iframe = $(tabDOM + '>.layui-tab-content>.layui-tab-item.layui-show .admin-iframe')[0];
        if ($iframe) {
            $iframe.style.height = "99%";
            $iframe.scrollWidth;
            $iframe.style.height = "100%";
        }
        $iframe.focus();

        // 鍒囨崲tab鑷姩鍒锋柊
        var autoRefresh = $(tabDOM).attr('lay-autoRefresh');
        if (autoRefresh === 'true') {
            admin.refresh(layId);
        }
    });

    // tab閫夐」鍗″垹闄ょ洃鍚�
    element.on('tabDelete(' + tabFilter + ')', function (data) {
        var layId = index.mTabList[data.index].menuPath;
        index.mTabList.splice(data.index, 1);
        if (index.cacheTab) {
            admin.putTempData('indexTabs', index.mTabList);
        }
        if (tabEndCall[layId]) {
            tabEndCall[layId].call();
        }
        // 瑙ｅ喅鍋跺皵鍑虹幇鍏抽棴鍚庢病鏈夐€変腑浠讳綍Tab鐨刡ug
        if ($(tabDOM + '>.layui-tab-title>li.layui-this').length <= 0) {
            $(tabDOM + '>.layui-tab-title>li:last').trigger('click');
        }
    });

    // 鏄惁寮€鍚鏍囩
    var openTab = layui.data(admin.tableName).openTab;
    if (openTab != undefined) {
        index.pageTabs = openTab;
    }

    // 澶氱郴缁熷垏鎹簨浠�
    $('body').off('click.navMore').on('click.navMore', '[nav-bind]', function () {
        var navId = $(this).attr('nav-bind');
        $('ul[lay-filter="' + navFilter + '"]').addClass('layui-hide');
        $('ul[nav-id="' + navId + '"]').removeClass('layui-hide');
        if (admin.getPageWidth() <= 750) {
            admin.flexible(false);  // 灞曞紑渚ц竟鏍�
        }
        $(headerDOM + '>.layui-nav .layui-nav-item').removeClass('layui-this');
        $(this).parent('.layui-nav-item').addClass('layui-this');
    });

    // 寮€鍚疶ab鍙抽敭鑿滃崟
    if (index.openTabCtxMenu && index.pageTabs) {
        $(tabDOM + '>.layui-tab-title').off('contextmenu.tab').on('contextmenu.tab', 'li', function (e) {
            var layId = $(this).attr('lay-id');
            contextMenu.show([{
                icon: 'layui-icon layui-icon-refresh',
                name: '鍒锋柊褰撳墠',
                click: function () {
                    element.tabChange(tabFilter, layId);
                    var autoRefresh = $(tabDOM).attr('lay-autoRefresh');
                    if (!autoRefresh || autoRefresh !== 'true') {
                        admin.refresh(layId);
                    }
                }
            }, {
                icon: 'layui-icon layui-icon-close-fill ctx-ic-lg',
                name: '鍏抽棴褰撳墠',
                click: function () {
                    admin.closeThisTabs(layId);
                }
            }, {
                icon: 'layui-icon layui-icon-unlink',
                name: '鍏抽棴鍏朵粬',
                click: function () {
                    admin.closeOtherTabs(layId);
                }
            }, {
                icon: 'layui-icon layui-icon-close ctx-ic-lg',
                name: '鍏抽棴鍏ㄩ儴',
                click: function () {
                    admin.closeAllTabs();
                }
            }], e.clientX, e.clientY);
            return false;
        });
    }

    exports('index', index);
});
