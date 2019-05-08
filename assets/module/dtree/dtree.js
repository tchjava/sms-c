
/**

 @Name锛歞tree 鏍戝舰缁勪欢
 @Author锛氭櫤鎱х殑灏忚タ鐡�
 @Site锛歨ttp://www.wisdomelon.com/DTreeHelper/
 @License锛歀AYUI
    
 */
layui.define(['jquery','layer','form'], function(exports) {
	var $ = layui.$,
		layer = layui.layer,
		form = layui.form;

	// 鏍戠殑鍏叡瀹氫箟鏍峰紡姹囨€�
	var LI_NAV_CHILD = "dtree-nav-ul-sid", LI_NAV_ITEM = "dtree-nav-item",
		LI_DIV_ITEM = "dtree-nav-div", DTREEFONT = "dtreefont", DTREEFONTSPECIAL="dtreefont-special",
		LI_DIV_MENUBAR = "dtree-menubar",LI_DIV_MENUBAR_DOWN = "dtree-icon-move-down", LI_DIV_MENUBAR_UP = "dtree-icon-move-up", LI_DIV_MENUBAR_REFRESH = "dtree-icon-refresh", LI_DIV_MENUBAR_DELETE = "dtree-icon-delete1", LI_DIV_MENUBAR_SEARCH = "dtree-icon-search_list_light",
		LI_DIV_TOOLBAR = "dtree-toolbar", TOOLBAR_TOOL = "dtree-toolbar-tool", LI_DIV_TOOLBAR_ADD = "dtree-icon-roundadd", LI_DIV_TOOLBAR_EDIT = "dtree-icon-bianji", LI_DIV_TOOLBAR_DEL = "dtree-icon-roundclose",
		LI_DIV_SPREAD_LAST = "dtree-icon-dian",
		LI_DIV_CHECKBAR = "dtree-nav-checkbox-div", LI_DIV_CHECKBAR_ON = "dtree-icon-fuxuankuangxuanzhong", LI_DIV_CHECKBAR_OUT = "dtree-icon-fuxuankuang", LI_DIV_CHECKBAR_NOALL = "dtree-icon-fuxuankuang-banxuan",
		LI_CLICK_CHECKBAR = "d-click-checkbar",		//缁戝畾鐐瑰嚮澶嶉€夋鏃堕渶瑕佺敤鍒�
		LI_DIV_TEXT_CLASS = "t-click", UL_ROOT="dtree";

	// 鏍戠殑鑷畾涔夋牱寮�
	var DTREE = "dtree-",			//鑷畾涔夋牱寮忓墠缂€
		ITEMTHIS = "-item-this",	//鑷畾涔夋牱寮忓綋鍓嶈閫変腑鍚庣紑
		ITEM = "-item",				//鑷畾涔夋牱寮忓綋鍓嶈鍚庣紑
		DFONT = "-dtreefont",		//鑷畾涔夋牱寮忓浘鏍囨牱寮忓悗缂€
		FICON = "-ficon",			//鑷畾涔夋牱寮忎竴绾у浘鏍囨牱寮忓悗缂€
		ICON = "-icon",				//鑷畾涔夋牱寮忎簩绾у浘鏍囨牱寮忓悗缂€
		CBOX = "-checkbox",			//鑷畾涔夋牱寮忓閫夋鏍峰紡鍚庣紑
		CHS = "-choose";			//鑷畾涔夋牱寮忓閫夋閫変腑鏍峰紡鍚庣紑

	// 鏍戠殑鍏叡鎸囧畾
	var NAV_THIS = "dtree-nav-this",	//褰撳墠鑺傜偣
		NAV_SHOW = "dtree-nav-show",	//鏄剧ず瀛愯妭鐐�
		ICON_HIDE = "dtree-icon-hide", //闅愯棌dot鍥炬爣
		$BODY = $("body"),		//body閫夋嫨鍣�
		MOD_NAME = "dtree",		//妯″潡鍚嶇О
		VERSION = "v2.4.5_finally_beta",		//鐗堟湰	
		DTrees = {};			//褰撳墠琚疄渚嬪寲鐨勬爲鐨勯泦鍚�

	// 鏍戠殑涓€绾ц妭鐐瑰浘鏍囬泦鍚�
	var firstIconArray = {
		"-1": {"open": "dtree-icon-null-open", "close": "dtree-icon-null-close"},			//鏈寚瀹�
		"0" : {"open": "dtree-icon-jian", "close": "dtree-icon-jia"},
		"1" : {"open": "dtree-icon-xiangxia1", "close": "dtree-icon-xiangyou"}
	};

	// 鏍戠殑浜岀骇鑺傜偣鍥炬爣闆嗗悎
	var nodeIconArray = {
		"-1": {"open": "dtree-icon-null-open", "close": "dtree-icon-null-close"},			//鏈寚瀹�
		"0" : {"open": "dtree-icon-wenjianjiazhankai", "close": "dtree-icon-weibiaoti5"}
	};

	var leafIconArray = {
		"-1": "dtree-icon-null",			//鏈寚瀹�
		"0" : "dtree-icon-weibiaoti5", 		//鏂囦欢澶�
		"1" : "dtree-icon-yonghu",			//浜哄憳
		"2" : "dtree-icon-fenzhijigou",		//鏈烘瀯
		"3" : "dtree-icon-fenguangbaobiao",	//鎶ヨ〃
		"4" : "dtree-icon-xinxipilu",			//淇℃伅
		"5" : "dtree-icon-shuye1",				//鍙跺瓙
		"6" : "dtree-icon-caidan_xunzhang",	//鍕嬬珷
		"7" : "dtree-icon-normal-file"		//鏂囦欢
	};

	// 鏍戣嚜瀹氫箟鎿嶄綔浜嬩欢鍚嶇О闆嗗悎	缁戝畾dtree-click鐨勪簨浠�
	var eventName = {
		checkNodeClick: "checkNodeClick",				//鐐瑰嚮澶嶉€夋
		itemNodeClick: "itemNodeClick"					//鐐瑰嚮瀛愯妭鐐筪iv
	};


	// 鏍戦粯璁oolbar鎻愪緵鐨勫姛鑳介泦鍚�	缁戝畾dtree-tool鐨勪簨浠�
	var defaultTool = {
		addToolbar: "addToolbar",						//鐐瑰嚮toolbar鏂板
		editToolbar: "editToolbar",						//鐐瑰嚮toolbar缂栬緫
		delToolbar: "delToolbar"						//鐐瑰嚮toolbar鍒犻櫎
	};

	// 鏍戦粯璁enubar鎻愪緵鐨勫姛鑳介泦鍚�	缁戝畾dtree-menu鐨勪簨浠�
	var defaultMenu = {
		moveDown: "moveDown",							//menubar灞曞紑鑺傜偣
		moveUp: "moveUp",								//menubar鏀剁缉鑺傜偣
		refresh: "refresh",								//menubar鍒锋柊鏍�
		remove: "remove",								//menubar鍒犻櫎閫変腑鑺傜偣
		searchNode: "searchNode"						//menubar鏌ヨ鑺傜偣	
	};

	// 鏍戠殑鍏叡浜嬩欢
	var event = {
		getElemId: function(options){	// 鏍规嵁浼犲叆鐨勫弬鏁拌幏鍙朓D
			var elem = options.elem || "";
			var obj = options.obj || $(elem);

			if (obj.length == 0) {	//椤甸潰涓湭鎵惧埌缁戝畾id
				return "";
			} else {
				return $(obj)[0].id;
			}
		},
		escape: function(html){
			if(typeof html !== 'string') return '';
			return html.replace(entityReg.escape, function(match){return entityMap.escape[match];});
		},
		unescape: function(str){
			if(typeof str !== 'string') return '';
			return str.replace(entityReg.unescape, function(match){return entityMap.unescape[match];});
		},
		cloneObj: function (obj, filter) {  //娣卞鍒跺璞℃柟娉�    
		    var newObj = {};  
		    if (obj instanceof Array) {  
		        newObj = [];  
		    }  
		    var str = "";
		    if(typeof filter !== 'undefined') {str = filter.join(",");} 
		    for (var key in obj) {  
		    	if(str.indexOf(key) == -1){
	    			var val = obj[key]; 
			        newObj[key] = typeof val === 'object' ? event.cloneObj(val, typeof filter !== undefined ? filter : []): val;  
	    		}

		    }  
		    return newObj;  
		}
	};

	// 鐗规畩绗﹀彿杞箟
	var keys = Object.keys || function(obj) {
			obj = Object(obj);
			var arr = [];
			for(var a in obj) arr.push(a);
			return arr;
		};
	var invert = function(obj){
		obj = Object(obj);
		var result = {};
		for(var a in obj) result[obj[a]] = a;
		return result;
	};
	var entityMap = {
		escape: {
			"&" : "&amp;",
			"<" : "&lt;",
			">" : "&gt;",
			"'" : "&quo;"
		}
	};
	entityMap.unescape = invert(entityMap.escape);
	var entityReg = {
		escape: RegExp('[' + keys(entityMap.escape).join('') + ']', 'g'),
		unescape: RegExp('(' + keys(entityMap.unescape).join('|') + ')', 'g')
	};

	//寮傛鍔犺浇鎺ュ彛
	var AjaxHelper = {
		request : function(config) {
			var data = config.data ? config.data : {};
			var async = (typeof (config.async) === "boolean") ? config.async : true;
			$.ajax({
				type : config.type ? config.type : "POST",
				headers : config.headers,
				url : config.url,
				dataType : config.dataType ? config.dataType : "json",
				data : data,
				async : async,
				success : config.success,
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					if (typeof (config.error) === "function") {
						config.error();
					} else {
						layer.msg('绯荤粺寮傚父瀵艰嚧鎿嶄綔澶辫触, 璇疯仈绯荤鐞嗗憳銆�',{icon:5, shift:6});
					}
				},
				statusCode : {
					404 : function() {
						layer.msg('鏈壘鍒版寚瀹氳姹傦紝璇锋鏌ヨ闂矾寰勶紒',{icon:5, shift:6});
					},
					500 : function() {
						layer.msg('绯荤粺閿欒锛岃鑱旂郴绠＄悊鍛樸€�',{icon:5, shift:6});
					}
				},
				complete : function(XMLHttpRequest, textStatus) {
					if (typeof (config.complete) === "function") {
						config.complete(XMLHttpRequest, textStatus);
					}
				}
			});
		},
		serialize: function(param){	//json搴忓垪鍖�   key=value&key1=value1
			var p = "?";
			for (var key in param) {
				p += key + "=" + param[key] + "&";
			}
			p = p.substring(0, p.length-1);
			return p;
		}
	};

	// 鏍戠被
	var DTree = function(options){

		/** 榛樿璧嬪€�**/
		this.response = {  // 鏍戣繑鍥炵殑json鏍煎紡
			statusName: "code",		//杩斿洖鏍囪瘑
			statusCode: 200,		//杩斿洖鐮�
			message: "message",		//杩斿洖淇℃伅
			rootName: "data",		//鏍硅妭鐐瑰悕绉�
			treeId: "id",			//鑺傜偣ID
			parentId: "parentId",	//鐖惰妭鐐笽D
			title: "title",			//鑺傜偣鍚嶇О
			iconClass: "iconClass",		//鑷畾涔夊浘鏍�
			childName: "children",	//瀛愯妭鐐瑰悕绉�
			isLast: "isLast",		//鏄惁鏈€鍚庝竴绾ц妭鐐�
//			level: "level",			//灞傜骇
			spread: "spread",		//灞曞紑
			disabled: "disabled",	//绂佺敤
			checkArr: "checkArr",	//澶嶉€夋鍒楄〃
			isChecked: "isChecked", //鏄惁閫変腑
			type: "type",			//澶嶉€夋鏍囪
			basicData: "basicData"	//琛ㄧず鐢ㄦ埛鑷畾涔夐渶瑕佸瓨鍌ㄥ湪鏍戣妭鐐逛腑鐨勬暟鎹�
		};
		this.defaultRequest = {  // 鏍戠殑榛樿鍙戣捣璇锋眰鍙傛暟鏍煎紡锛屾渶鍚庝細灏唙alue浣滀负鍙傛暟鍚嶇О浼犻€�
			nodeId: "nodeId",		//鑺傜偣ID
			parentId: "parentId",	//鐖惰妭鐐笽D
			context: "context",	//鑺傜偣鍐呭
			isLeaf: "isLeaf",		//鏄惁鍙跺瓙鑺傜偣
			level: "level",		//灞傜骇
			spread: "spread",		//鑺傜偣灞曞紑鐘舵€�
			dataType: "dataType",	//鑺傜偣鏍囪
			ischecked: "ischecked",	//鑺傜偣澶嶉€夋閫変腑鐘舵€�
			initchecked: "initchecked",	//鑺傜偣澶嶉€夋鍒濆鐘舵€�
			basicData: "basicData",		//鐢ㄦ埛鑷畾涔夌殑璁板綍鑺傜偣鏁版嵁
			recordData: "recordData",		//褰撳墠data鏁版嵁锛堟帓闄asicData鍜宑hildren瀛楁锛�
		};
		this.toolbarFun = {
			addTreeNode: function(param, $div) {	//娣诲姞鏍戣妭鐐瑰悗璋冪敤鐨勫嚱鏁帮紝鐢ㄤ簬鐢ㄦ埛鑷畾涔夛紝濡傛湭鎸囧畾鍒欐爲涓嶄細鍙戠敓鍙樺寲
				return ;
			},
			editTreeNode: function(param, $div) {	//缂栬緫鏍戣妭鐐瑰悗璋冪敤鐨勫嚱鏁帮紝鐢ㄤ簬鐢ㄦ埛鑷畾涔夛紝濡傛湭鎸囧畾鍒欐爲涓嶄細鍙戠敓鍙樺寲
				return ;
			},
			editTreeLoad: function(param){	// 缂栬緫鏍戠殑鏁版嵁鍥炴樉锛岀敤浜庢墦寮€缂栬緫鏃讹紝鍥炲～鏁版嵁
				return ;
			},
			delTreeNode: function(param, $div){	//鍒犻櫎鏍戝悗璋冪敤鐨勫嚱鏁帮紝鐢ㄤ簬鐢ㄦ埛鑷畾涔夛紝濡傛湭鎸囧畾鍒欐爲涓嶄細鍙戠敓鍙樺寲
				return ;
			},
			loadToolbarBefore: function(buttons, param, $div){  // 鍙抽敭鑿滃崟鍔犺浇鍓嶇殑鍑芥暟
				return buttons;
			}
		};
		this.toolbarStyle = {
			title: "鑺傜偣",
			area: ["60%","80%"]
		};
		this.menubarFun = {
			remove: function(checkbarNodes){			//鍒犻櫎澶嶉€夋閫変腑鑺傜偣锛岄渶瑕佺敤鎴疯嚜瀹氫箟锛屽鏈寚瀹氬垯鏍戝彧鏄〉闈笂鍋氫簡淇敼
				return true;
			}
		};
		this.menubarTips = {
			toolbar: [],
			group: [defaultMenu.moveDown, defaultMenu.moveUp, defaultMenu.refresh, defaultMenu.remove, defaultMenu.searchNode],
			freedom: []
		};
		this.checkbarFun = {
			chooseBefore: function($i, node){	// 澶嶉€夋鐐瑰嚮鍓嶅洖璋�
				return true;
			},
			chooseDone: function(checkbarNodesParam) {	//澶嶉€夋鐐瑰嚮浜嬩欢瀹屾瘯鍚庯紝杩斿洖璇ユ爲鍏充簬澶嶉€夋鎿嶄綔鐨勫叏閮ㄤ俊鎭紝鐢ㄤ簬鐢ㄦ埛鑷畾涔夛紝濡傛湭鎸囧畾鍒欐爲鍙槸椤甸潰涓婂仛浜嗕慨鏀�
				return ;
			}
		};
		this.iframe = {  // 鏍戠偣鍑昏妭鐐规椂锛屾墦寮€iframe椤甸潰鍙傛暟閰嶇疆
			iframeElem: "",		//iframe鐨処D
			iframeUrl: "",		//鏍戝叧鑱旂殑frame鍦板潃
			iframeLoad: "leaf",	//鐐瑰嚮鍝竴灞傚姞杞絝rame锛� node锛氭墍鏈夎妭鐐癸紝 leaf锛氶粯璁わ紝鏈€鍚庝竴绾�
			iframeDefaultRequest: {  //iframe鐨勯粯璁ゅ弬鏁�,鐩殑鏄笌鍔犺浇鏍戠殑鍙傛暟涓嶄竴鏍�
				nodeId: "nodeId",		//鑺傜偣ID
				parentId: "parentId",	//鐖惰妭鐐笽D
				context: "context",	//鑺傜偣鍐呭
				isLeaf: "isLeaf",		//鏄惁鍙跺瓙鑺傜偣
				level: "level",		//灞傜骇
				spread: "spread",		//鑺傜偣灞曞紑鐘舵€�
				dataType: "dataType",	//鑺傜偣鏍囪
				ischecked: "ischecked",	//鑺傜偣澶嶉€夋閫変腑鐘舵€�
				initchecked: "initchecked",	//鑺傜偣澶嶉€夋鍒濆鐘舵€�
				basicData: "basicData",		//鐢ㄦ埛鑷畾涔夌殑璁板綍鑺傜偣鏁版嵁
				recordData: "recordData",		//褰撳墠data鏁版嵁锛堟帓闄asicData鍜宑hildren瀛楁锛�
			},  
			iframeRequest: {}	//iframe鐨勮嚜瀹氫箟鍙傛暟
		};
		this.iframeFun = {
			iframeDone: function(iframeParam){	//iframe鍔犺浇瀹屾瘯鍚庯紝鐢ㄤ簬鐢ㄦ埛鑷畾涔変簨浠�
				return ;
			}
		};
		this.style = {
			item: "",
			itemThis: "",
			dfont: "",
			icon: "",
			cbox: "",
			chs: ""
		};

		/** 鏁版嵁缁戝畾**/
		this.node = {		// 鏍戣妭鐐归€変腑鏃讹紝鍖呭惈褰撳墠鑺傜偣鐨勫叏閮ㄤ俊鎭�
			nodeId: "",		//鑺傜偣ID
			parentId: "",	//鐖惰妭鐐笽D
			context: "",	//鑺傜偣鍐呭
			isLeaf: "",		//鏄惁鍙跺瓙鑺傜偣
			level: "",		//灞傜骇
			spread: "",		//鑺傜偣灞曞紑鐘舵€�
			dataType: "",	//鑺傜偣鏍囪
			ischecked: "",	//鑺傜偣澶嶉€夋閫変腑鐘舵€�
			initchecked: "",	//鑺傜偣澶嶉€夋鍒濆鐘舵€�
			basicData: "",		//鐢ㄦ埛鑷畾涔夌殑璁板綍鑺傜偣鏁版嵁
			recordData: "",		//褰撳墠data鏁版嵁锛堟帓闄asicData鍜宑hildren瀛楁锛�
		};
		this.toolbarMenu = {};	// 宸ュ叿鏍忓彸閿彍鍗曠粦瀹氱殑鎵€鏈夊厓绱�
		this.checkbarNode = [];	// 澶嶉€夋鏍囪鐨勫叏閮ㄨ妭鐐规暟鎹�
		this.checkArrLen = 0;	//娣诲姞鑺傜偣鐨勬椂鍒ゆ柇澶嶉€夋涓暟
		this.temp = [];	// 涓存椂鍙橀噺

		this.setting(options);
	};

	/******************** 鍒濆鍙傛暟鍔犺浇 ********************/
		// 璁剧疆鍊�
	DTree.prototype.setting = function(options) {
		this.options = options || {};

		/** 缁戝畾鍏冪礌鍙傛暟锛堝繀濉紝2涓弬鏁伴」蹇呭～涓€涓級**/
		this.elem = this.options.elem || "";			//鏍戠粦瀹氱殑鍏冪礌ID锛�#elem
		this.obj = this.options.obj || $(this.elem);	//鏍戠粦瀹氱殑jquery鍏冪礌锛岀敤浜庡綋鍏冪礌鏄欢杩熷姞杞藉嚭鏉ョ殑璇濓紝鍙互鐢ㄨ繖涓壘鍒�

		/** 鍩烘湰鍙傛暟**/
		this.initLevel = this.options.initLevel || 2;	//榛樿灞曞紑鑺傜偣  2鑺�    
		this.type = this.options.type || "load";	// 鏍戠殑鍔犺浇鏂瑰紡  all锛屽叏閲忔爲锛�  load锛屽閲忔爲锛岄粯璁oad
		this.cache = (typeof (this.options.cache) === "boolean") ? this.options.cache : true;		//寮€鍚暟鎹紦瀛�
		this.record = (typeof (this.options.record) === "boolean") ? this.options.record : false;		//寮€鍚暟鎹褰曟ā寮�
		this.load = (typeof (this.options.load) === "boolean") ? this.options.load : true;		//寮€鍚姞杞藉姩鐢�

		/** 鏍峰紡鐩稿叧鍙傛暟**/
		this.firstIconArray = $.extend(firstIconArray, this.options.firstIconArray) || firstIconArray;	//鐢ㄦ埛鑷畾涔変竴绾у浘鏍囬泦鍚堬紝node
		this.nodeIconArray = $.extend(nodeIconArray, this.options.nodeIconArray) || nodeIconArray;	//鐢ㄦ埛鑷畾涔変簩绾у浘鏍囬泦鍚堬紝node
		this.leafIconArray = $.extend(leafIconArray, this.options.leafIconArray) || leafIconArray;	//鐢ㄦ埛鑷畾涔変簩绾у浘鏍囬泦鍚堬紝leaf
		this.skin = this.options.skin || "theme";	// 鑷畾涔夋牱寮� 
		if(this.skin == "layui"){ // layui涓婚
			this.ficon = this.options.ficon || "1";		// 涓€绾у浘鏍囨牱寮忥紝0锛�+锛�-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : false;		//鏄惁鏄剧ず涓€绾у浘鏍囩殑灏忓渾鐐癸紝榛樿涓嶆樉绀�
			this.icon = this.options.icon || "7";	//浜岀骇鍥炬爣鏍峰紡锛�0锛氭枃浠跺す锛�1锛氫汉鍛橈紝2锛氭満鏋勶紝3锛氭姤琛紝4锛氫俊鎭紝5锛氬彾瀛愶紝6锛氬媼绔�, -1锛氫笉鏄剧ず浜岀骇鍥炬爣銆傞粯璁�'1'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "-1") : this.icon[0];		// 浜岀骇鍥炬爣涓殑node鑺傜偣鍥炬爣
		} else { // 榛樿涓婚  鎴栬€呰嚜瀹氫箟涓婚
			this.ficon = this.options.ficon || "0";		// 涓€绾у浘鏍囨牱寮忥紝0锛�+锛�-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : true;		//鏄惁鏄剧ず涓€绾у浘鏍囩殑灏忓渾鐐癸紝榛樿鏄剧ず
			this.icon = this.options.icon || "5";	//浜岀骇鍥炬爣鏍峰紡锛�0锛氭枃浠跺す锛�1锛氫汉鍛橈紝2锛氭満鏋勶紝3锛氭姤琛紝4锛氫俊鎭紝5锛氬彾瀛愶紝6锛氬媼绔�, -1锛氫笉鏄剧ず浜岀骇鍥炬爣銆傞粯璁�'5'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "0") : this.icon[0];		// 浜岀骇鍥炬爣涓殑node鑺傜偣鍥炬爣
		}

		/** 鍐呯疆鏍峰紡灞炴€�*/
		this.ficonOpen =  this.firstIconArray[this.ficon]["open"]; // 涓€绾у浘鏍囦腑鐨刵ode鑺傜偣open鍥炬爣
		this.ficonClose = this.firstIconArray[this.ficon]["close"]; // 涓€绾у浘鏍囦腑鐨刵ode鑺傜偣close鍥炬爣
		this.nodeIconOpen =  this.nodeIconArray[this.nodeIcon]["open"];  // 浜岀骇鍥炬爣涓殑node鑺傜偣open鍥炬爣
		this.nodeIconClose =  this.nodeIconArray[this.nodeIcon]["close"]; // 浜岀骇鍥炬爣涓殑node鑺傜偣close鍥炬爣
		this.leafIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? this.icon : this.icon[1];	// 浜岀骇鍥炬爣涓殑leaf鑺傜偣鍥炬爣
		this.leafIconShow =  this.leafIconArray[this.leafIcon]; // 浜岀骇鍥炬爣涓殑leaf鑺傜偣鍥炬爣

		this.style.item = DTREE + this.skin + ITEM;
		this.style.itemThis = DTREE + this.skin + ITEMTHIS;
		this.style.dfont = DTREE + this.skin + DFONT;
		this.style.ficon = DTREE + this.skin + FICON;
		this.style.icon = DTREE + this.skin + ICON;
		this.style.cbox = DTREE + this.skin + CBOX;
		this.style.chs = DTREE + this.skin + CHS;

		/** 鏁版嵁鍔犺浇鍙傛暟**/
		this.url = this.options.url || "";		//璇锋眰鍦板潃
		this.async = (typeof (this.options.async) === "boolean") ? this.options.async : true;	//寮傛鍚屾鍔犺浇,榛樿寮傛鍔犺浇
		this.headers = this.options.headers || {};		// ajax header灞炴€�
		this.method = this.options.method || "post";	//璇锋眰绫诲瀷
		this.dataType = this.options.dataType || "json";	//鍙傛暟绫诲瀷
		this.defaultRequest = $.extend(this.defaultRequest, this.options.defaultRequest) || this.defaultRequest;	//榛樿璇锋眰鍙傛暟
		this.filterRequest = this.options.filterRequest || [];	//杩囨护璇锋眰鍙傛暟
		this.request = this.options.request || {};		//鐢ㄦ埛鑷畾涔夎姹傚弬鏁�
		this.response = $.extend(this.response, this.options.response) || this.response;	//杩斿洖json鏍煎紡
		this.data = this.options.data || null;		//鍒濆鍖栨寚瀹氳鍙傛暟锛屽垯涓嶄細璁块棶寮傛鎺ュ彛
		this.dataFormat = this.options.dataFormat || "levelRelationship";  //鐢ㄤ簬鐢ㄦ埛閰嶇疆鐨刣ata鏁版嵁鏍煎紡锛宭ist锛氬垪琛紝  levelRelationship锛氬眰绾у叧绯伙紝榛樿
		this.dataStyle = this.options.dataStyle || "defaultStyle";  //鐢ㄤ簬鐢ㄦ埛閰嶇疆layui閫氱敤鐨刯son鏁版嵁椋庢牸,layuiStyle:layui椋庢牸锛宒efaultStyle锛氶粯璁ら鏍�
		this.success = this.options.success || function(data, obj){};		//鏍戝姞杞藉畬姣曞悗鎵ц瑙ｆ瀽鏍戜箣鍓嶇殑鍥炶皟锛堜粎闄愬紓姝ュ姞杞斤級
		this.done = this.options.done || function(data, obj){};		//鏍戝姞杞藉畬姣曞悗鐨勫洖璋冿紙浠呴檺寮傛鍔犺浇锛�

		/** 宸ュ叿鏍忓弬鏁�**/
		this.toolbar = this.options.toolbar || false;	//鏄惁寮€鍚彲缂栬緫妯″紡
		this.toolbarStyle = $.extend(this.toolbarStyle, this.options.toolbarStyle) || this.toolbarStyle;	//toolbar鐨勮嚜瀹氫箟椋庢牸锛屾爣棰橈紝寮规澶у皬
		this.toolbarScroll = this.options.toolbarScroll || this.elem;	//鏍戠殑涓婄骇div瀹瑰櫒锛岃鏍戝彲浠ユ樉绀烘粴鍔ㄦ潯鐨刣iv瀹瑰櫒
		this.toolbarLoad = this.options.toolbarLoad || "node";	//toolbar浣滅敤鑼冨洿锛歯ode:鎵€鏈夎妭鐐癸紝noleaf:闈炴渶鍚庝竴绾ц妭鐐癸紝leaf:鏈€鍚庝竴绾�
		this.toolbarShow = this.options.toolbarShow || ["add","edit","delete"];		// toolbar涓変釜鎸夐挳鑷畾涔夊姞杞�
		this.toolbarBtn = this.options.toolbarBtn || null;		// toolbar澧炲垹鏀逛腑鍐呭鐨勮嚜瀹氫箟鍔犺浇
		this.toolbarExt = this.options.toolbarExt || [];		// toolbar鎸夐挳鎵╁睍
		this.toolbarFun = $.extend(this.toolbarFun, this.options.toolbarFun) || this.toolbarFun;		// toolbar浜嬩欢鍔犺浇

		/** 鑿滃崟鏍忓弬鏁�**/
		this.menubar = this.options.menubar || false;	//鏄惁鎵撳紑鑿滃崟鏍�
		this.menubarTips = $.extend(this.menubarTips, this.options.menubarTips) || this.menubarTips; // 鑿滃崟鏍忓惛闄勶紝 toolbar锛氫緷闄勫湪宸ュ叿鏍忥紝group锛氫緷闄勫湪鎸夐挳缁勶紝freedom锛岃嚜鐢�
		this.menubarFun = $.extend(this.menubarFun, this.options.menubarFun) || this.menubarFun;	//menubar浜嬩欢鍔犺浇

		/** 澶嶉€夋鍙傛暟**/
		this.checkbar = this.options.checkbar || false;	//鏄惁寮€鍚閫夋妯″紡
		this.checkbarLoad = this.options.checkbarLoad || "node";  // 澶嶉€夋浣滅敤鑼冨洿锛宯ode锛氭墍鏈夎妭鐐癸紝 leaf锛氭渶鍚庝竴绾э紱榛樿鎵€鏈夎妭鐐�
		this.checkbarType = this.options.checkbarType || "all" ;	//澶嶉€夋閫変腑褰㈠紡	all锛氬瓙闆嗛€変腑鐖剁骇涔熼€変腑锛�  no-all锛氬瓙闆嗛€変腑鐖剁骇鍗婇€変腑锛屽瓙闆嗗叏閫夌埗绾ч€変腑锛宲-casc锛氱埗绾ч€変腑瀛愰泦鍏ㄩ€夛紝瀛愰泦鏃犳硶鏀瑰彉鐖剁骇閫変腑鐘舵€侊紝 self锛氭病鏈変换浣曠骇鑱斿叧绯伙紝only锛氬彧鑳介€変腑涓€涓閫夋銆�   榛樿all
		this.checkbarData = this.options.checkbarData || "choose" ;	//澶嶉€夋璁板綍鏁版嵁绫诲瀷褰㈠紡锛�  change琛ㄧず璁板綍鍙樻洿鏁版嵁锛宑hoose琛ㄧず璁板綍閫変腑鏁版嵁锛宎ll锛岃褰曞叏閮ㄦ暟鎹紝榛樿choose
		this.checkbarFun =  $.extend(this.checkbarFun, this.options.checkbarFun) || this.checkbarFun;	// checkbar浜嬩欢鍔犺浇

		/** iframe妯″紡鍙傛暟**/
		this.useIframe = this.options.useIframe || false;	// 鏄惁鍔犺浇iframe 榛樿false锛�
		this.iframe = $.extend(this.iframe, this.options.iframe) || this.iframe;	//iframe閰嶇疆
		this.iframeFun = $.extend(this.iframeFun, this.options.iframeFun) || this.iframeFun;	//iframe浜嬩欢鍔犺浇

	};

	// 璁剧疆鍊�
	DTree.prototype.reloadSetting = function(options) {
		this.options = $.extend(this.options, options) || this.options;

		/** 缁戝畾鍏冪礌鍙傛暟**/
		this.elem = this.options.elem || this.elem;			//鏍戠粦瀹氱殑鍏冪礌ID锛�#elem
		if(typeof this.options.obj === 'undefined'){
			if(this.elem) {
				if($(this.elem).length > 0) {
					this.obj = $(this.elem);
				}
			}
		} else {
			this.obj = this.options.obj || this.obj; //鏍戠粦瀹氱殑jquery鍏冪礌锛岀敤浜庡綋鍏冪礌鏄欢杩熷姞杞藉嚭鏉ョ殑璇濓紝鍙互鐢ㄨ繖涓壘鍒�
		}

		/** 鍩烘湰鍙傛暟**/
		this.initLevel = this.options.initLevel || this.initLevel;	//榛樿灞曞紑鑺傜偣  2鑺�    
		this.type = this.options.type || this.type;		// 鏍戠殑鍔犺浇鏂瑰紡  all锛屽叏閲忔爲锛�  load锛屽閲忔爲锛岄粯璁oad
		this.cache = (typeof (this.options.cache) === "boolean") ? this.options.cache : this.cache;		//寮€鍚暟鎹紦瀛�
		this.record = (typeof (this.options.record) === "boolean") ? this.options.record : this.record;		//寮€鍚暟鎹褰曟ā寮�
		this.load = (typeof (this.options.load) === "boolean") ? this.options.load : this.load;		//寮€鍚姞杞藉姩鐢�
		
		/** 鏍峰紡鐩稿叧鍙傛暟**/
		this.firstIconArray = $.extend(firstIconArray, this.options.firstIconArray) || this.firstIconArray;	//鐢ㄦ埛鑷畾涔変竴绾у浘鏍囬泦鍚堬紝node
		this.nodeIconArray = $.extend(nodeIconArray, this.options.nodeIconArray) || this.nodeIconArray;	//鐢ㄦ埛鑷畾涔変簩绾у浘鏍囬泦鍚堬紝node
		this.leafIconArray = $.extend(leafIconArray, this.options.leafIconArray) || this.leafIconArray;	//鐢ㄦ埛鑷畾涔変簩绾у浘鏍囬泦鍚堬紝leaf
		this.skin = this.options.skin || this.skin;	// 鑷畾涔夋牱寮� 
		if(this.skin == "layui"){ // layui涓婚
			this.ficon = this.options.ficon || this.ficon;		// 涓€绾у浘鏍囨牱寮忥紝0锛�+锛�-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : false;		//鏄惁鏄剧ず涓€绾у浘鏍囩殑灏忓渾鐐癸紝榛樿涓嶆樉绀�
			this.icon = this.options.icon || this.icon;	//浜岀骇鍥炬爣鏍峰紡锛�0锛氭枃浠跺す锛�1锛氫汉鍛橈紝2锛氭満鏋勶紝3锛氭姤琛紝4锛氫俊鎭紝5锛氬彾瀛愶紝6锛氬媼绔�, -1锛氫笉鏄剧ず浜岀骇鍥炬爣銆傞粯璁�'1'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "-1") : this.icon[0];		// 浜岀骇鍥炬爣涓殑node鑺傜偣鍥炬爣
		} else { // 榛樿涓婚  鎴栬€呰嚜瀹氫箟涓婚
			this.ficon = this.options.ficon || this.ficon;		// 涓€绾у浘鏍囨牱寮忥紝0锛�+锛�-
			this.dot = (typeof (this.options.dot) === "boolean") ? this.options.dot : 	true;		//鏄惁鏄剧ず涓€绾у浘鏍囩殑灏忓渾鐐癸紝榛樿鏄剧ず
			this.icon = this.options.icon || this.icon;	//浜岀骇鍥炬爣鏍峰紡锛�0锛氭枃浠跺す锛�1锛氫汉鍛橈紝2锛氭満鏋勶紝3锛氭姤琛紝4锛氫俊鎭紝5锛氬彾瀛愶紝6锛氬媼绔�, -1锛氫笉鏄剧ず浜岀骇鍥炬爣銆傞粯璁�'5'
			this.nodeIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? (this.icon == "-1" ? "-1" : "0") : this.icon[0];		// 浜岀骇鍥炬爣涓殑node鑺傜偣鍥炬爣
		}

		/** 鍐呯疆鏍峰紡灞炴€�*/
		this.ficonOpen =  this.firstIconArray[this.ficon]["open"]; // 涓€绾у浘鏍囦腑鐨刵ode鑺傜偣open鍥炬爣
		this.ficonClose = this.firstIconArray[this.ficon]["close"]; // 涓€绾у浘鏍囦腑鐨刵ode鑺傜偣close鍥炬爣
		this.nodeIconOpen =  this.nodeIconArray[this.nodeIcon]["open"];  // 浜岀骇鍥炬爣涓殑node鑺傜偣open鍥炬爣
		this.nodeIconClose =  this.nodeIconArray[this.nodeIcon]["close"]; // 浜岀骇鍥炬爣涓殑node鑺傜偣close鍥炬爣
		this.leafIcon = (typeof this.icon === 'string' || typeof this.icon === 'number') ? this.icon : this.icon[1];	// 浜岀骇鍥炬爣涓殑leaf鑺傜偣鍥炬爣
		this.leafIconShow =  this.leafIconArray[this.leafIcon]; // 浜岀骇鍥炬爣涓殑leaf鑺傜偣鍥炬爣

		this.style.item = DTREE + this.skin + ITEM;
		this.style.itemThis = DTREE + this.skin + ITEMTHIS;
		this.style.dfont = DTREE + this.skin + DFONT;
		this.style.ficon = DTREE + this.skin + FICON;
		this.style.icon = DTREE + this.skin + ICON;
		this.style.cbox = DTREE + this.skin + CBOX;
		this.style.chs = DTREE + this.skin + CHS;

		/** 鏁版嵁鍔犺浇鍙傛暟**/
		this.url = this.options.url || this.url;		//璇锋眰鍦板潃
		this.async = (typeof (this.options.async) === "boolean") ? this.options.async : this.async;	//寮傛鍚屾鍔犺浇,榛樿寮傛鍔犺浇
		this.headers = this.options.headers || this.headers;		// ajax header灞炴€�
		this.method = this.options.method || this.method;	//璇锋眰绫诲瀷
		this.dataType = this.options.dataType || this.dataType;	//鍙傛暟绫诲瀷
		this.defaultRequest = $.extend(this.defaultRequest, this.options.defaultRequest) || this.defaultRequest;	//榛樿璇锋眰鍙傛暟
		this.filterRequest = this.options.filterRequest || this.filterRequest;	//杩囨护璇锋眰鍙傛暟
		this.request = this.options.request || this.request;		//鐢ㄦ埛鑷畾涔夎姹傚弬鏁�
		this.response = $.extend(this.response, this.options.response) || this.response;	//杩斿洖json鏍煎紡
		this.data = this.options.data || this.data;		//鍒濆鍖栨寚瀹氳鍙傛暟锛屽垯涓嶄細璁块棶寮傛鎺ュ彛
		this.dataFormat = this.options.dataFormat || this.dataFormat;  //鐢ㄤ簬鐢ㄦ埛閰嶇疆鐨刣ata鏁版嵁鏍煎紡锛宭ist锛氬垪琛紝  levelRelationship锛氬眰绾у叧绯伙紝榛樿
		this.dataStyle = this.options.dataStyle || this.dataStyle;  //鐢ㄤ簬鐢ㄦ埛閰嶇疆layui閫氱敤鐨刯son鏁版嵁椋庢牸,layuiStyle:layui椋庢牸锛宒efaultStyle锛氶粯璁ら鏍�
		this.success = this.options.success || this.success;		//鏍戝姞杞藉畬姣曞悗鎵ц瑙ｆ瀽鏍戜箣鍓嶇殑鍥炶皟锛堜粎闄愬紓姝ュ姞杞斤級
		this.done = this.options.done || this.done;		//鏍戝姞杞藉畬姣曞悗鐨勫洖璋冿紙浠呴檺寮傛鍔犺浇锛�

		/** 鍙紪杈戞ā寮忓弬鏁�**/
		this.toolbar = this.options.toolbar || this.toolbar;	//鏄惁寮€鍚彲缂栬緫妯″紡
		this.toolbarStyle = $.extend(this.toolbarStyle, this.options.toolbarStyle) || this.toolbarStyle;	//toolbar鐨勮嚜瀹氫箟椋庢牸锛屾爣棰橈紝寮规澶у皬
		this.toolbarScroll = this.options.toolbarScroll || this.toolbarScroll;	//鏍戠殑涓婄骇div瀹瑰櫒锛岃鏍戝彲浠ユ樉绀烘粴鍔ㄦ潯鐨刣iv瀹瑰櫒
		this.toolbarLoad = this.options.toolbarLoad || this.toolbarLoad;	//toolbar浣滅敤鑼冨洿锛歯ode:鎵€鏈夎妭鐐癸紝noleaf:闈炴渶鍚庝竴绾ц妭鐐癸紝leaf:鏈€鍚庝竴绾�
		this.toolbarShow = this.options.toolbarShow || this.toolbarShow;		// toolbar涓変釜鎸夐挳
		this.toolbarBtn = this.options.toolbarBtn || this.toolbarBtn;		// toolbar澧炲垹鏀逛腑鍐呭鐨勮嚜瀹氫箟鍔犺浇
		this.toolbarExt = this.options.toolbarExt || this.toolbarExt;		// toolbar鎸夐挳鎵╁睍
		this.toolbarFun = $.extend(this.toolbarFun, this.options.toolbarFun) || this.toolbarFun;		// toolbar浜嬩欢鍔犺浇

		/** 鑿滃崟鏍忓弬鏁�**/
		this.menubar = this.options.menubar || this.menubar;	//鏄惁鎵撳紑鑿滃崟鏍�
		this.menubarTips = $.extend(this.menubarTips, this.options.menubarTips) || this.menubarTips; // 鑿滃崟鏍忓惛闄勶紝 toolbar锛氫緷闄勫湪宸ュ叿鏍忥紝group锛氫緷闄勫湪鎸夐挳缁勶紝freedom锛岃嚜鐢�
		this.menubarFun = $.extend(this.menubarFun, this.options.menubarFun) || this.menubarFun;	//menubar浜嬩欢鍔犺浇

		/** 澶嶉€夋鍙傛暟**/
		this.checkbar = this.options.checkbar || this.checkbar;	//鏄惁寮€鍚閫夋妯″紡
		this.checkbarLoad = this.options.checkbarLoad || this.checkbarLoad;  // 澶嶉€夋浣滅敤鑼冨洿锛宯ode锛氭墍鏈夎妭鐐癸紝 leaf锛氭渶鍚庝竴绾э紱榛樿鎵€鏈夎妭鐐�
		this.checkbarType = this.options.checkbarType || this.checkbarType ;	//澶嶉€夋閫変腑褰㈠紡	all锛氬瓙闆嗛€変腑鐖剁骇涔熼€変腑锛�  no-all锛氬瓙闆嗛€変腑鐖剁骇鍗婇€変腑锛屽瓙闆嗗叏閫夌埗绾ч€変腑锛宲-casc锛氱埗绾ч€変腑瀛愰泦鍏ㄩ€夛紝瀛愰泦鏃犳硶鏀瑰彉鐖剁骇閫変腑鐘舵€侊紝 self锛氭病鏈変换浣曠骇鑱斿叧绯伙紝only锛氬彧鑳介€変腑涓€涓閫夋銆�   榛樿all
		this.checkbarData = this.options.checkbarData || this.checkbarData ;	//澶嶉€夋璁板綍鏁版嵁绫诲瀷褰㈠紡锛�  change琛ㄧず璁板綍鍙樻洿鏁版嵁锛宑hoose琛ㄧず璁板綍閫変腑鏁版嵁锛宎ll锛岃褰曞叏閮ㄦ暟鎹紝榛樿choose
		this.checkbarFun =  $.extend(this.checkbarFun, this.options.checkbarFun)|| this.checkbarFun ;	// checkbar浜嬩欢鍔犺浇

		/** iframe妯″紡鍙傛暟**/
		this.useIframe = this.options.useIframe || this.useIframe;	// 鏄惁鍔犺浇iframe 榛樿false锛�
		this.iframe = $.extend(this.iframe, this.options.iframe) || this.iframe;	//iframe閰嶇疆
		this.iframeFun = $.extend(this.iframeFun, this.options.iframeFun) || this.iframeFun;	//iframe浜嬩欢鍔犺浇

	};

	/******************** 鍒濆鍖栨暟鎹尯鍩� ********************/
		// 閲嶈浇鏍�
	DTree.prototype.reload = function(options){
		var _this = this;
		_this.reloadSetting(options);
		_this.init();
	};

	// 鍒濆鍖栨爲
	DTree.prototype.init = function(){
		var _this = this;
		if (typeof _this !== "object") {
			layer.msg("鏍戠粍浠舵湭鎴愬姛鍔犺浇锛岃妫€鏌ラ厤缃�", {icon:5});
			return ;
		}

		if(_this.data) {
			if(typeof _this.data.length === 'undefined'){
				layer.msg("鏁版嵁瑙ｆ瀽寮傚父锛宒ata鏁版嵁鏍煎紡涓嶆纭�", {icon:5});
				return ;
			}
			
			//鍏堝皢ul涓殑鍏冪礌娓呯┖
			_this.obj.html("");

			// 鍔犺浇瀹屾瘯鍚庢墽琛屾爲瑙ｆ瀽鍓嶇殑鍥炶皟
			_this.success(_this.data, _this.obj);
			
			// 绗竴娆¤В鏋愭爲
			if (_this.dataFormat == 'list'){
				//1.璇嗗埆鏍硅妭鐐箄l涓殑data-id鏍囩锛屽垽鏂《绾х埗鑺傜偣
				var pid = _this.obj.attr("data-id");
				//2.鏋勫缓涓€涓瓨鏀捐妭鐐圭殑鏍戠粍
				var rootListData = _this.queryListTreeByPid(pid, _this.data);
				_this.loadListTree(rootListData, _this.data, 1);
			} else {
				_this.loadTree(_this.data, 1);
			}
			
			// 鍔犺浇瀹屾瘯鍚庣殑鍥炶皟
			_this.done(_this.data, _this.obj);

		} else {
			if (!_this.url) {
				layer.msg("鏁版嵁璇锋眰寮傚父锛寀rl鍙傛暟鏈寚瀹�", {icon:5});
				return ;
			}

			//鍏堝皢ul涓殑鍏冪礌娓呯┖
			_this.obj.html("");

			var index = _this.load ? layer.load(1) : "";
			
			AjaxHelper.request({
				async: _this.async,
				headers: _this.headers,
				type: _this.method,
				url: _this.url,
				dataType: _this.dataType,
				data: _this.getFilterRequestParam(_this.getRequestParam()),
				success: function(result) {
					if (typeof result === 'string') {
						result = $.parseJSON(result);
					}
					var code = "";
					if (_this.dataStyle == 'layuiStyle'){
						code = result[_this.response.statusName];
					} else {
						code = result.status[_this.response.statusName];
					}

					if (code == _this.response.statusCode) {
						// 鍔犺浇瀹屾瘯鍚庢墽琛屾爲瑙ｆ瀽鍓嶇殑鍥炶皟
						_this.success(result, _this.obj);
						
						// 绗竴娆¤В鏋愭爲
						if (_this.dataFormat == 'list'){
							//1.璇嗗埆鏍硅妭鐐箄l涓殑data-id鏍囩锛屽垽鏂《绾х埗鑺傜偣
							var pid = _this.obj.attr("data-id");
							//2.鏋勫缓涓€涓瓨鏀捐妭鐐圭殑鏍戠粍
							var rootListData = _this.queryListTreeByPid(pid, result[_this.response.rootName]);
							_this.loadListTree(rootListData, result[_this.response.rootName], 1);
						} else {
							_this.loadTree(result[_this.response.rootName], 1);
						}

						// 鍔犺浇瀹屾瘯鍚庣殑鍥炶皟
						_this.done(result, _this.obj);
					} else {
						if (_this.dataStyle == 'layuiStyle'){
							layer.msg(result[_this.response.message], {icon:2});
						} else {
							layer.msg(result.status[_this.response.message], {icon:2});
						}
					}
				},
				complete: function(){if(_this.load){layer.close(index);}}
			});
		}
	};

	// 鍔犺浇瀛愯妭鐐�
	DTree.prototype.getChild = function($div, data) {
		var _this = this,
			$ul = $div.next("ul");
		
		_this.setNodeParam($div);

		if(typeof data !== 'undefined') {
			if(typeof data.length === 'undefined'){
				layer.msg("鏁版嵁瑙ｆ瀽寮傚父锛宒ata鏁版嵁鏍煎紡涓嶆纭�", {icon:5});
				return ;
			}

			//鍏堝皢ul涓殑鍏冪礌娓呯┖
			$ul.html("");

			// 瑙ｆ瀽鏍�
			if (_this.dataFormat == 'list'){
				var pid = _this.node.nodeId;
				var level = parseInt(_this.node.level)+1;

				var listData = _this.queryListTreeByPid(pid, data);
				_this.loadListTree(listData, _this.data, level);
			} else {
				_this.loadTree(data, level);
			}

		} else {
			if (!_this.url) {
				layer.msg("鏁版嵁璇锋眰寮傚父锛寀rl鍙傛暟鏈寚瀹�", {icon:5});
				return ;
			}

			$ul.html("");
			var index = _this.load ? layer.load(1) : "";
			AjaxHelper.request({
				async: _this.async,
				headers: _this.headers,
				type: _this.method,
				url: _this.url,
				dataType: _this.dataType,
				data:  _this.getFilterRequestParam(_this.getRequestParam()),
				success: function(result) {
					if (typeof result === 'string') {
						result = $.parseJSON(result);
					}
					var code = "";
					if (_this.dataStyle == 'layuiStyle'){
						code = result[_this.response.statusName];
					} else {
						code = result.status[_this.response.statusName];
					}

					if (code == _this.response.statusCode) {
						// 瑙ｆ瀽鏍�
						var pid = _this.node.nodeId;
						var level = parseInt(_this.node.level)+1;
						if (_this.dataFormat == 'list'){
							var pListData = _this.queryListTreeByPid(pid, result[_this.response.rootName]);
							_this.loadListTree(pListData, result[_this.response.rootName], level, $ul);
						} else {
							_this.loadTree(result[_this.response.rootName], level, $ul);
						}

						$ul.addClass(NAV_SHOW);
					} else {
						if (_this.dataStyle == 'layuiStyle'){
							layer.msg(result[_this.response.message], {icon:2});
						} else {
							layer.msg(result.status[_this.response.message], {icon:2});
						}
					}
				},
				complete: function(){if(_this.load){layer.close(index);}}
			});
		}
	};

	// 鍒濆鍖栨爲鎴栬€呮嫾鎺ユ爲
	DTree.prototype.loadListTree = function(pListData, listData, level, $ul){
		var _this = this;
		$ul = $ul || _this.getNowNodeUl();	//褰撳墠閫変腑鐨勮妭鐐规垨鏍硅妭鐐�
		if (pListData.length > 0){
			for (var i = 0; i < pListData.length; i++) {
				// 1.鑾峰彇宸茬煡鑺傜偣鐨勫叏閮ㄦ暟鎹�
				var data = pListData[i];
				if(typeof data !== "object") continue;
				var parseData = _this.parseData(data);
				var childListData = _this.queryListTreeByPid(parseData.treeId(), listData); // 鏍规嵁宸茬煡鏁版嵁鐨刬d鍒ゆ柇璇ユ潯鏁版嵁鏄惁杩樻湁瀛愭暟鎹�

				// 3. 椤甸潰鍏冪礌鍔犺浇鏁版嵁
				$ul.append(_this.getLiItemDom(parseData.treeId(), parseData.parentId(), parseData.title(), parseData.isLast(childListData.length), parseData.iconClass(), parseData.checkArr(), level, parseData.spread(level), parseData.disabled(), parseData.basicData(), parseData.recordData(), ($ul.hasClass(UL_ROOT) ? "root" : "item")));
				// 4.鏈夊瓙鏁版嵁鐨勫厓绱犲姞杞藉瓙鑺傜偣
				if(childListData.length > 0){
					var cLevel = parseInt(level)+1;
					_this.loadListTree(childListData, listData, cLevel, _this.obj.find("ul[data-id='"+parseData.treeId()+"']"));
				}
			}
		}
	};

	// 鏍规嵁鐖禝D鏌ユ壘list鏁版嵁涓尮閰嶇殑鍏冪礌
	DTree.prototype.queryListTreeByPid = function(pid, listData){
		var _this = this;
		var rootListData = [];
		if (listData) {
			for (var i = 0; i < listData.length; i++) {
				var data = listData[i];
				if(typeof data !== "object") continue;
				if(pid == "null" || pid == null){
					if(data[_this.response.parentId] == null) {
						rootListData.push(data);
					}
				} else {
					if (data[_this.response.parentId] == pid){
						rootListData.push(data);
					}
				}
			}
		}
		return rootListData;
	};

	// 鍒濆鍖栨爲鎴栬€呮嫾鎺ユ爲
	DTree.prototype.loadTree = function(root, level, $ul){
		var _this = this;
		if (root) {
			$ul = $ul || _this.getNowNodeUl();	//褰撳墠閫変腑鐨勮妭鐐规垨鏍硅妭鐐�
			for (var i = 0; i < root.length; i++) {	// 閬嶅巻璺熻妭鐐规垨杩藉姞鐨勮窡鑺傜偣
				var data = root[i];
				if(typeof data !== "object") continue;
				var parseData = _this.parseData(data);
				var children = parseData.children();
				$ul.append(_this.getLiItemDom(parseData.treeId(), parseData.parentId(), parseData.title(), parseData.isLast(children.length), parseData.iconClass(), parseData.checkArr(), level, parseData.spread(level), parseData.disabled(), parseData.basicData(), parseData.recordData(), ($ul.hasClass(UL_ROOT) ? "root" : "item")));
				if (children.length != 0) {
					var cLevel = parseInt(level)+1;
					_this.loadTree(children, cLevel, _this.obj.find("ul[data-id='"+parseData.treeId()+"']"));
				}
			}
		}
	};

	// 瑙ｆ瀽data鏁版嵁
	DTree.prototype.parseData = function(data) {
		var _this = this;

		return {
			treeId: function(){
				return data[_this.response.treeId];
			},
			parentId: function(){
				return data[_this.response.parentId];
			},
			title: function(){
				return data[_this.response.title] || "";
			},
			level: function(){
				return data[_this.response.level] || "";
			},
			iconClass: function(){
				return data[_this.response.iconClass] || "";
			},
			isLast: function(len){
				return ((len == 0) ? 
						((typeof (data[_this.response.isLast]) === "boolean") ? data[_this.response.isLast] : true) : 
							((typeof (data[_this.response.isLast]) === "boolean") ? data[_this.response.isLast] : false));
			},
			spread: function(level){
				return ((level < _this.initLevel) ? 
						((typeof (data[_this.response.spread]) === "boolean") ? data[_this.response.spread] : true) : 
							((typeof (data[_this.response.spread]) === "boolean") ? data[_this.response.spread] : false));
			},
			disabled: function(){
				return (typeof (data[_this.response.disabled]) === "boolean") ? data[_this.response.disabled] : false;
			},
			checkArr: function(){
				var checkArr = [];
				var checkArrData = data[_this.response.checkArr];
				if(typeof checkArrData === 'string'){
					if(checkArrData.indexOf("{") > -1 && checkArrData.indexOf("}") > -1){
						checkArrData = JSON.parse(checkArrData);
					} else {
						checkArrData = {"type":"0","isChecked":checkArrData};
					}
				}
				if(typeof checkArrData === 'object'){
					if(typeof checkArrData.length === 'undefined'){
						checkArr.push(checkArrData);
					} else {
						checkArr = checkArrData;
					}
				}
				
				if(checkArr.length > 0 && checkArr.length > _this.checkArrLen){
					_this.checkArrLen = checkArr.length;		// 鑾峰彇澶嶉€夋涓暟
				}
				return checkArr;

			},
			children: function(){
				return data[_this.response.childName] || [];
			},
			basicData: function(){
				return event.escape(JSON.stringify(data[_this.response.basicData])) || JSON.stringify({});
			},
			recordData: function(){
				var recordData = _this.record ? event.cloneObj(data, [_this.response.basicData, _this.response.childName]) : {};
				return event.escape(JSON.stringify(recordData));
			},
			data: function(){
				return event.escape(JSON.stringify(data));
			}
		}

	};

	//鏂板鑺傜偣鐨刣om鍊�
	DTree.prototype.getDom = function(treeId, parentId, title, isLast, iconClass, checkArr, level, spread, disabled) {
		var _this = this,
			rootId = _this.obj[0].id,
			toolbar = _this.toolbar,
			checkbar = _this.checkbar;
		return {
			fnode: function() {	// + - 鍥炬爣
				// 鑾峰彇鍥炬爣鐨勫彉閲�
				var ficon = _this.ficon,
					ficonOpen =  _this.ficonOpen,
					ficonClose = _this.ficonClose,
					dot = _this.dot;

				if(ficon != "-1" && dot){	// 閮藉姞杞�
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(ficon != "-1" && !dot){	// 鍔犺浇node 闅愯棌leaf
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+ICON_HIDE+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(ficon == "-1" && dot){	// 闅愯棌node 鍔犺浇leaf
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(ficon == "-1" && !dot){	// 閮介殣钘�
					return isLast ? "<i class='"+DTREEFONT+" "+LI_DIV_SPREAD_LAST+" "+ICON_HIDE+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"' style='display:none;'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+ficonOpen+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+ficonClose+" "+_this.style.dfont+" "+_this.style.ficon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}
			},
			node: function() {	// 浜岀骇鍥炬爣鏍峰紡
				// 鑾峰彇鍥炬爣鐨勫彉閲�
				var nodeIcon = _this.nodeIcon,
					leafIcon = _this.leafIcon;

				var leafIconShow = _this.leafIconShow,
					nodeIconOpen =  _this.nodeIconOpen,
					nodeIconClose =  _this.nodeIconClose;
				if(iconClass){
					leafIconShow = iconClass;
					nodeIconOpen = iconClass;
					nodeIconClose = iconClass;
				}

				if(nodeIcon != "-1" && leafIcon != "-1"){	// 閮藉姞杞�
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(nodeIcon != "-1" && leafIcon == "-1"){	// 鍔犺浇node 闅愯棌leaf
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(nodeIcon == "-1" && leafIcon != "-1"){	// 闅愯棌node 鍔犺浇leaf
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}

				if(nodeIcon == "-1" && leafIcon == "-1"){	// 閮介殣钘�
					return isLast ? "<i class='"+DTREEFONT+" "+leafIconShow+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='last' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" :
						(spread ? "<i class='"+DTREEFONT+" "+nodeIconOpen+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='open' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>" : "<i class='"+DTREEFONT+" "+nodeIconClose+" "+DTREEFONTSPECIAL+" "+_this.style.dfont+" "+_this.style.icon+"' data-spread='close' data-id='"+treeId+"' dtree-id='"+rootId+"'></i>");
				}
			},
			checkbox: function() {	// 澶嶉€夋
				var flag = false;
				if(_this.checkbarLoad == "node"){if (checkbar) {flag = true;}} else {if (isLast) {if (checkbar) {flag = true;}}}

				if(flag){
					var result = "<div class='"+LI_DIV_CHECKBAR+"' data-id='"+treeId+"' dtree-id='"+rootId+"'>";
					if(checkArr && checkArr.length > 0){
						for (var i = 0; i < checkArr.length; i++) {
							var checkData = checkArr[i];
							var isChecked = checkData.isChecked;
							var CHOOSE_CLASS = LI_DIV_CHECKBAR_OUT;
							if (isChecked == "2") {	//鍗婇€夋嫨
								CHOOSE_CLASS = LI_DIV_CHECKBAR_NOALL + " " + _this.style.chs;
							} else if (isChecked == "1") {	//閫夋嫨
								CHOOSE_CLASS = LI_DIV_CHECKBAR_ON + " " + _this.style.chs;
							} else {	//鏈€夋嫨鎴栬€呮棤鍊�
								CHOOSE_CLASS = LI_DIV_CHECKBAR_OUT;
							}
							result += "<i class='"+DTREEFONT+" "+_this.style.dfont+" "+_this.style.cbox+" "+CHOOSE_CLASS+"' data-id='"+treeId+"' dtree-id='"+rootId+"' data-checked='"+checkData.isChecked+"' data-initchecked='"+checkData.isChecked+"' data-type='"+checkData.type+"' dtree-click='"+eventName.checkNodeClick+"' data-par='."+LI_CLICK_CHECKBAR+"'></i>";
						}
					}
					result += "</div>";
					return result;
				}

				return "";
			},
			text: function() {	// 鏂囧瓧鏄剧ず
				return "<cite class='"+LI_DIV_TEXT_CLASS+"' data-id='"+treeId+"' data-leaf='"+(isLast ? "leaf" : "node")+"'>"+title+"</cite>";
			},
			ul: function() {	//瀛愯妭鐐箄l
				return isLast ? "<ul class='"+LI_NAV_CHILD+"' data-id='"+treeId+"' dtree-id='"+rootId+"'></ul>" :
					(spread ? "<ul class='"+LI_NAV_CHILD+" "+NAV_SHOW+"' data-id='"+treeId+"' dtree-id='"+rootId+"'></ul>" : "<ul class='"+LI_NAV_CHILD+"' data-id='"+treeId+"' dtree-id='"+rootId+"'></ul>");
			}
		};

	};

	// 鑾峰彇鎷兼帴濂界殑li
	DTree.prototype.getLiItemDom =  function(treeId, parentId, title, isLast, iconClass, checkArr, level, spread, disabled, basicData, recordData, flag) {
		var _this = this,
			rootId = _this.obj[0].id;

		var dom = _this.getDom(treeId, parentId, title, isLast, iconClass, checkArr, level, spread, disabled);
		basicData = (basicData == "{}") ? "" : basicData;
		recordData = (recordData == "{}") ? "" : recordData;
		var div = "<div class='"+LI_DIV_ITEM+" "+_this.style.item+"' data-id='"+treeId+"' dtree-id='"+rootId+"' dtree-click='"+eventName.itemNodeClick+"' data-basic='"+basicData+"' data-record='"+recordData+"' ";
		if(_this.toolbar){
			if(_this.toolbarLoad == "node") { div += " d-contextmenu='true'>"; }
			if(_this.toolbarLoad == "noleaf") { if(!isLast){ div += " d-contextmenu='true'>"; } else { div += " d-contextmenu='false'>";} }
			if(_this.toolbarLoad == "leaf") { if(isLast){ div += " d-contextmenu='true'>"; } else { div += " d-contextmenu='false'>";} }
		} else { div += " d-contextmenu='false'>"; }

		var li = ["<li " + "class='"+LI_CLICK_CHECKBAR+" "+ LI_NAV_ITEM +"'" + "data-id='"+treeId+"'" + "data-pid='"+(flag == "root" ? (parentId ? parentId : "-1") : parentId)+"'" + "dtree-id='"+rootId+"'" + "data-index='"+level+"'" + ">" +
		          	div ,
					dom.fnode(),
					dom.node(),
					dom.checkbox(),
					dom.text(),
					"</div>", dom.ul(), "</li>"].join("");
		return li;
	};

	// 鍒濆鍖栬妭鐐癸紝鐢ㄤ簬鏁版嵁鍥炴樉
	DTree.prototype.dataInit = function(chooseId){
		var _this = this;
		var $div = _this.obj.find("div[data-id='"+chooseId+"']");
		$div.parent().find("."+NAV_THIS).removeClass(NAV_THIS);
		$div.parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
		$div.addClass(NAV_THIS);
		$div.addClass(_this.style.itemThis);
		_this.setNodeParam($div);
		// 灏嗚鑺傜偣鐨勭埗鑺傜偣鍏ㄩ儴灞曞紑
		var $li_parents = $div.parents("."+LI_NAV_ITEM);
		$li_parents.children("ul").addClass(NAV_SHOW);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).addClass(_this.ficonOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).removeClass(_this.ficonClose);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).addClass(_this.nodeIconOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).removeClass(_this.nodeIconClose);
		return _this.getNowParam();
	};

	/******************** 鍩虹浜嬩欢鍖哄煙 ********************/
	// 灞曞紑鎴栭殣钘忚妭鐐�  浣滅敤鐐癸細 div
	DTree.prototype.clickSpread = function($div) {
		var $i_spread = $div.find("i[data-spread]").eq(0),
			$i_node = $div.find("i[data-spread]").eq(1),
			i_node_class = $i_node.attr("class"),
			$cite = $div.find("cite[data-leaf]").eq(0),
			spread = $i_spread.attr("data-spread"),
			$ul = $div.next("ul");
		var _this = this;

		if ($ul.length > 0) {
			if (spread == "close") {
				if (_this.type=="load") {	//澧炲姞鍔犺浇
					if (_this.cache) {	//寮€鍚紦瀛�
						if ($ul.html()) {
							$ul.addClass(NAV_SHOW);
						} else {	//鍔犺浇鑺傜偣
							_this.getChild($div);
						}
					}else {	//姣忔鍙栨柊鐨勬暟鎹�
						$ul.html("");
						_this.getChild($div);
					}
				} else {	// 鍏ㄩ噺鍔犺浇
					$ul.addClass(NAV_SHOW);
				}
				$div.find("i[data-spread]").attr("data-spread","open");
				$i_spread.removeClass(_this.ficonClose);
				$i_spread.addClass(_this.ficonOpen);

				var node_class = _this.nodeIconClose;
				if(i_node_class.indexOf(node_class) > 0){
					$i_node.removeClass(_this.nodeIconClose);
					$i_node.addClass(_this.nodeIconOpen);
				}

			} else if (spread == "open") {
				$ul.removeClass(NAV_SHOW);
				$div.find("i[data-spread]").attr("data-spread","close");
				$i_spread.removeClass(_this.ficonOpen);
				$i_spread.addClass(_this.ficonClose);

				var node_class = _this.nodeIconOpen;
				if(i_node_class.indexOf(node_class) > 0){
					$i_node.removeClass(_this.nodeIconOpen);
					$i_node.addClass(_this.nodeIconClose);
				}
			}
		}
	};

	// 鏁版嵁鏍煎紡鍖�
	DTree.prototype.escape = function(html){
		return event.escape(html);
	};

	// 鏍煎紡鍖栨暟鎹浆鍥炴甯告暟鎹�
	DTree.prototype.unescape = function(str){
		return event.unescape(str);
	};

	/******************** 宸ュ叿鏍忓強鑿滃崟鏍忓尯鍩� ********************/


		// 鍒濆鍖栬彍鍗曟爮鍜屽伐鍏锋爮鐨刣iv
	DTree.prototype.initTreePlus = function(){
		var _this = this;
		// 鍒濆鍖栬彍鍗曟爮鍜屽伐鍏锋爮鐨刣iv
		_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).remove();
		_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).remove();
		_this.toolbarMenu = {};
		if(_this.menubar && _this.menubarTips.group && _this.menubarTips.group.length > 0) _this.obj.before("<div class='"+LI_DIV_MENUBAR+"' id='dtree_menubar_"+_this.obj[0].id+"'><div class='layui-btn-group'></div></div>");
		if(_this.toolbar) _this.obj.before("<div class='"+LI_DIV_TOOLBAR+" layui-nav' id='dtree_toolbar_"+_this.obj[0].id+"'><div class='layui-nav-item'><dl class='layui-nav-child layui-anim'></dl></div></div>");

	};

	// 寮€鍚伐鍏锋爮鍜岃彍鍗曟爮
	DTree.prototype.openTreePlus = function(){
		var _this = this;
		// 鍏堝宸ュ叿鏍忓仛澶勭悊锛屽洜涓鸿彍鍗曟爮鍙兘浼氫笌宸ュ叿鏍忎骇鐢熷叧鑱斻€�
		var ggMenu = [];
		if(_this.toolbar) _this.getToolbarDom();

		if(_this.menubar) {
			var menubarTips = _this.menubarTips,
				mtbar = menubarTips.toolbar,
				group = menubarTips.group,
				freedom = menubarTips.freedom;
			if(mtbar && mtbar.length > 0){
				// 鑿滃崟鏍忓惛闄勫伐鍏锋爮涓�
				for(var i=0; i<mtbar.length; i++){
					var mt = mtbar[i];
					if(typeof mt === 'string'){
						_this.getMenubarToolDom(mt);
					}
					if(typeof mt === 'object'){
						_this.getExtMenubarToolDom(mt);
					}
				}
			}
			if(group && group.length > 0){
				// 鑿滃崟鏍忓惛闄勫湪涓婃柟鐨勬寜閽粍div涓�
				for(var i=0; i<group.length; i++){
					var gg = group[i];
					if(typeof gg === 'string'){
						ggMenu.push(_this.getMenubarDom(gg));
					}
					if(typeof gg === 'object'){
						ggMenu.push(_this.getExtMenubarDom(gg));
					}
				}
				_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).children('div.layui-btn-group').append(ggMenu.join(""));

			}
		}

	};


	/******************** 鑿滃崟鏍忓尯鍩� ********************/

	// 鑾峰彇鑿滃崟鏍�
	DTree.prototype.getMenubarDom = function(menu){
		var _this = this;
		var rootId = _this.obj[0].id;
		var gg = "";
		switch (menu) {
			case defaultMenu.moveDown:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveDown+"' title='灞曞紑鑺傜偣'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DOWN+"'></i></button>";
				break;
			case defaultMenu.moveUp:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveUp+"' title='鏀剁缉鑺傜偣'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_UP+"'></i></button>";
				break;
			case defaultMenu.refresh:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.refresh+"' title='鍒锋柊'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_REFRESH+"'></i></button>";
				break;
			case defaultMenu.remove:
				gg = (_this.checkbar) ? "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.remove+"' title='鍒犻櫎閫変腑鑺傜偣'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DELETE+"'></i></button>" : "";
				break;
			case defaultMenu.searchNode:
				gg = "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+rootId+"' d-menu='"+defaultMenu.searchNode+"' title='鏌ヨ鑺傜偣'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_SEARCH+"'></i></button>";
				break;
		}
		return gg;
	};

	// 鑾峰彇鎵╁睍鑿滃崟鏍�
	DTree.prototype.getExtMenubarDom = function(menu){
		var _this = this;
		return "<button class='layui-btn layui-btn-sm layui-btn-primary' dtree-id='"+_this.obj[0].id+"' d-menu='"+menu.menubarId+"' title='"+menu.title+"'><i class='"+DTREEFONT+" "+menu.icon+"'></i></button>";
	};

	// 鑾峰彇渚濋檮鍦ㄥ伐鍏锋爮鐨勮彍鍗曟爮
	DTree.prototype.getMenubarToolDom = function(menu){
		var _this = this;
		var rootId = _this.obj[0].id;
		switch (menu) {
			case defaultMenu.moveDown:
				_this.toolbarMenu[defaultMenu.moveDown] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveDown+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DOWN+"'></i>&nbsp;灞曞紑"+_this.toolbarStyle.title+"</a></dd>";
				break;
			case defaultMenu.moveUp:
				_this.toolbarMenu[defaultMenu.moveUp] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.moveUp+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_UP+"'></i>&nbsp;鏀剁缉"+_this.toolbarStyle.title+"</a></dd>";
				break;
			case defaultMenu.refresh:
				_this.toolbarMenu[defaultMenu.refresh] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.refresh+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_REFRESH+"'></i>&nbsp;鍒锋柊</a></dd>";
				break;
			case defaultMenu.remove:
				if(_this.checkbar)
					_this.toolbarMenu[defaultMenu.remove] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.remove+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_DELETE+"'></i>&nbsp;鍒犻櫎閫変腑"+_this.toolbarStyle.title+"</a></dd>";
				break;
			case defaultMenu.searchNode:
				_this.toolbarMenu[defaultMenu.searchNode] = "<dd><a dtree-id='"+rootId+"' d-menu='"+defaultMenu.searchNode+"'><i class='"+DTREEFONT+" "+LI_DIV_MENUBAR_SEARCH+"'></i>&nbsp;鏌ヨ"+_this.toolbarStyle.title+"</a></dd>";
				break;
		}
	};

	// 鑾峰彇渚濋檮鍦ㄥ伐鍏锋爮鐨勬墿灞曡彍鍗曟爮
	DTree.prototype.getExtMenubarToolDom = function(menu){
		var _this = this;
		_this.toolbarMenu[menu.menubarId] = "<dd><a dtree-id='"+_this.obj[0].id+"' d-menu='"+menu.menubarId+"'><i class='"+DTREEFONT+" "+menu.icon+"'></i>&nbsp;"+menu.title+"</a></dd>";
	};


	// menubar鍐呯疆鏂规硶
	DTree.prototype.menubarMethod = function(){
		var _this = this;
		return {
			openAllNode: function(obj){  // 灞曞紑鎵€鏈夎妭鐐�
				var $ulNode = obj || _this.obj.children("li").children("ul");
				// 閬嶅巻鎵€鏈塽l瀛愯妭鐐�
				for (var i = 0; i < $ulNode.length; i++) {
					// 鑾峰彇褰撳墠鑺傜偣鐨勪俊鎭�
					var $ul = $($ulNode[i]),
						$div = $ul.prev("div"),
						$i_spread = $div.find("i[data-spread]").eq(0),
						$i_node = $div.find("i[data-spread]").eq(1),
						i_node_class = $i_node.attr("class"),
						$cite = $div.find("cite[data-leaf]").eq(0),
						spread = $i_spread.attr("data-spread"),
						leaf = $cite.attr("data-leaf");

					if (leaf == "leaf") { continue;	}	// 璇存槑鏄彾瀛愪簡锛屽垯缁х画寰幆涓嬩竴涓�

					if (spread == "open") {
						// 璇存槑璇ヨ妭鐐瑰凡缁忓睍寮€浜嗭紝鍒欒繘琛屽瓙鑺傜偣寰幆
					} else {
						if (_this.type=="load") {	//鏄惁鍏ㄩ噺鍔犺浇
							if (_this.cache) {	//鏄惁寮€鍚紦瀛�
								if ($ul.html()) {
									$ul.addClass(NAV_SHOW);
								} else {	//鍔犺浇鑺傜偣
									_this.getChild($div);
								}
							}else {	//姣忔鍙栨柊鐨勬暟鎹�
								$ul.html("");
								_this.getChild($div);
							}
						} else {	// 鍏ㄩ噺鍔犺浇
							$ul.addClass(NAV_SHOW);
						}
						$div.find("i[data-spread]").attr("data-spread","open");
						$i_spread.removeClass(_this.ficonClose);
						$i_spread.addClass(_this.ficonOpen);

						var node_class = _this.nodeIconClose;
						if(i_node_class.indexOf(node_class) > 0){
							$i_node.removeClass(_this.nodeIconClose);
							$i_node.addClass(_this.nodeIconOpen);
						}
					}
					var $childUl = $ul.children("li").children("ul");
					_this.menubarMethod().openAllNode($childUl);
				}
			},
			closeAllNode: function(){ //鏀剁缉鎵€鏈夎妭鐐�
				_this.obj.find("."+LI_NAV_CHILD).each(function(){
					// 鑾峰彇褰撳墠鑺傜偣鐨勪俊鎭�
					var $ul = $(this),
						$div = $ul.prev("div"),
						$i_spread = $div.find("i[data-spread]").eq(0),
						$i_node = $div.find("i[data-spread]").eq(1),
						i_node_class = $i_node.attr("class"),
						$cite = $div.find("cite[data-leaf]").eq(0),
						spread = $i_spread.attr("data-spread"),
						leaf = $cite.attr("data-leaf");

					$ul.removeClass(NAV_SHOW);
					$div.find("i[data-spread]").attr("data-spread","close");
					$i_spread.removeClass(_this.ficonOpen);
					$i_spread.addClass(_this.ficonClose);

					var node_class = _this.nodeIconOpen;
					if(i_node_class.indexOf(node_class) > 0){
						$i_node.removeClass(_this.nodeIconOpen);
						$i_node.addClass(_this.nodeIconClose);
					}
				});
			},
			refreshTree: function(){// 鍒锋柊鏍�
				_this.obj.html("");	// 娓呯┖鏍戠粨鏋�
				_this.initNodeParam(); // 娓呯┖鍙傛暟
				_this.init(); //鎵ц鍒濆鍖栨柟娉�
			},
			remove: function(){// 鍒犻櫎閫変腑鑺傜偣
				var len = _this.obj.find("i[data-par][data-checked='1']").length;
				if(len == 0){
					layer.msg("璇疯嚦灏戦€変腑涓€涓妭鐐�",{icon:2});
				}else{
					//鎿嶄綔鍓嶅厛娓呯┖
					_this.checkbarNode = [];
					// 閫夋嫨鎵€鏈夊閫夋鑺傜偣
					var i_node = {};
					_this.obj.find("i[data-par][data-checked='1']").each(function(){
						var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);

						_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));
					});

					layer.confirm('纭畾瑕佸垹闄ら€変腑鑺傜偣锛�', {icon: 3, title:'鍒犻櫎閫変腑鑺傜偣'}, function(index1){
						var flag = _this.menubarFun.remove(_this.checkbarNode);
						if(flag){
							_this.obj.find("i[data-par][data-checked='1']").closest("."+LI_DIV_ITEM).next("ul").remove();
							_this.obj.find("i[data-par][data-checked='1']").closest("."+LI_DIV_ITEM).remove();
							_this.checkbarNode=[];
						}

						layer.close(index1);
					});
				}
			},
			searchNode: function(){//妯＄硦鏌ヨ璇ュ€硷紝灞曞紑璇ュ€艰妭鐐�
				layer.prompt({
					formType: 0,
					value: "",
					title: '鏌ヨ鑺傜偣'
				}, function(value, index1, elem){
					if (value) {
						var flag = _this.searchNode(value);
						if (!flag) {
							layer.msg("璇ュ悕绉拌妭鐐逛笉瀛樺湪锛�", {icon:5});
						}
					} else {
						layer.msg("鏈寚瀹氭煡璇㈣妭鐐瑰悕绉�", {icon:5});
					}
					layer.close(index1);
				});
			},
			extMethod: function(menuId, $div, flag){
				if(_this.menubar && _this.menubarTips.group && _this.menubarTips.group.length > 0 && flag == "group"){
					for(var i=0; i<_this.menubarTips.group.length; i++){
						var ext = _this.menubarTips.group[i];
						if (menuId == ext.menubarId){
							ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
							break;
						}
					}
				}
				if(_this.menubar && _this.menubarTips.toolbar && _this.menubarTips.toolbar.length > 0 && flag == "toolbar"){
					for(var i=0; i<_this.menubarTips.toolbar.length; i++){
						var ext = _this.menubarTips.toolbar[i];
						if (menuId == ext.menubarId){
							ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
							break;
						}
					}
				}
				if(_this.menubar && _this.menubarTips.freedom && _this.menubarTips.freedom.length > 0 && flag == "freedom"){
					for(var i=0; i<_this.menubarTips.freedom.length; i++){
						var ext = _this.menubarTips.freedom[i];
						if (menuId == ext.menubarId){
							ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
							break;
						}
					}
				}
			}
		};
	};
	
	// menubar鐩戝惉鏂规硶
	DTree.prototype.menubarListener = function(menuId, flag){
		var _this = this;
		var $div = _this.getNowNode();
		switch (menuId) {
			case defaultMenu.moveDown:	// 灞曞紑鑺傜偣
				_this.menubarMethod().openAllNode();
				break;
			case defaultMenu.moveUp:	// 鏀剁缉鑺傜偣
				_this.menubarMethod().closeAllNode();
				break;
			case defaultMenu.refresh:
				_this.menubarMethod().refreshTree(); // 鍒锋柊鏍�
				break;
			case defaultMenu.remove:
				_this.menubarMethod().remove();
				break;
			case defaultMenu.searchNode:
				_this.menubarMethod().searchNode();
				break;
			default:
				_this.menubarMethod().extMethod(menuId, $div, flag);
				break;
		}
	};

	//妯＄硦鏌ヨ璇ュ€硷紝灞曞紑璇ュ€艰妭鐐�
	DTree.prototype.searchNode = function(value){
		var _this = this;
		var b = false;
		var $lis = [];
		_this.obj.find("cite[data-leaf]").each(function(){
			var $nthis = $(this);
			var html = $nthis.html();
			if(html.indexOf(value) > -1){
				if($nthis.attr("data-leaf") == "leaf") {
					// 鍙跺瓙鑺傜偣鎻愪緵鍖呭惈鐖惰妭鐐圭殑鎵€鏈変俊鎭�
					var title = "";
					$nthis.parents("li").each(function(){
						title = "-" + $(this).find("cite[data-leaf]").html() + title;
					});
					title = title.substring(1, title.length);
					$nthis.attr("title", title);
				}
				// 淇濆瓨褰撳墠cite鎵€鍦ㄧ殑li鍙婄埗li涓寘鍚鍊硷紝鍒欏彧淇濈暀鐖剁殑
				var i = 0;
				$nthis.parents("li").each(function(){
					var html2 = $(this).find("cite[data-leaf]").html();
					if(html2.indexOf(value) > -1){
						i++;
					}
					if(i >= 2){
						return true;
					}
				});
				if (i < 2){
					$lis.push($nthis.closest("li").prop("outerHTML"));
				}
			}
		});
		if($lis.length > 0) {
			b = true;
			// 1.灏嗘爲鑺傜偣娓呯┖
			_this.obj.html("");
			// 2.閬嶅巻鎵€鏈塩ite鑺傜偣锛屽睍寮€褰撳墠cite鑺傜偣
			for(var i=0; i<$lis.length; i++){
				_this.obj.append($lis[i]);
			}
		}
		return b;
	};


	/******************** 宸ュ叿鏍忓尯鍩� ********************/

	// 鑾峰彇宸ュ叿鏍�
	DTree.prototype.getToolbarDom = function(){
		var _this = this;
		var toolbarShow = _this.toolbarShow;
		var toolbarExt = _this.toolbarExt;
		
		if(toolbarShow.length > 0){
			for(var i=0; i<toolbarShow.length; i++){
				var show = toolbarShow[i];
				if(show == "add"){
					_this.toolbarMenu[defaultTool.addToolbar] = "<dd><a dtree-tool='"+defaultTool.addToolbar+"'><i class='"+DTREEFONT+" "+LI_DIV_TOOLBAR_ADD+"'></i>&nbsp;鏂板"+_this.toolbarStyle.title+"</a></dd>";
				}
				if(show == "edit"){
					_this.toolbarMenu[defaultTool.editToolbar] = "<dd><a dtree-tool='"+defaultTool.editToolbar+"'><i class='"+DTREEFONT+" "+LI_DIV_TOOLBAR_EDIT+"'></i>&nbsp;缂栬緫"+_this.toolbarStyle.title+"</a></dd>";
				}
				if(show == "delete"){
					_this.toolbarMenu[defaultTool.delToolbar] = "<dd><a dtree-tool='"+defaultTool.delToolbar+"'><i class='"+DTREEFONT+" "+LI_DIV_TOOLBAR_DEL+"'></i>&nbsp;鍒犻櫎"+_this.toolbarStyle.title+"</a></dd>";
				}
			}
		}
		if(toolbarExt.length > 0){
			for(var i=0; i<toolbarExt.length; i++){
				var ext = toolbarExt[i];
				_this.toolbarMenu[ext.toolbarId] = "<dd><a dtree-tool='"+ext.toolbarId+"'><i class='"+DTREEFONT+" "+ext.icon+"'></i>&nbsp;"+ext.title+"</a></dd>";
			}
		}
	};
	
	
	// 璁剧疆宸ュ叿鏍忔寜閽�
	DTree.prototype.setToolbarDom = function(toolbarMenu){
		var _this = this;
		if(toolbarMenu){
			_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).find('div.layui-nav-item>dl.layui-nav-child').html("");
			for(var key in toolbarMenu){
				_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).find('div.layui-nav-item>dl.layui-nav-child').append(toolbarMenu[key]);
			}
		}
	}
	

	// 鍔犺浇toolBar涓殑鍐呭
	DTree.prototype.loadToolBar = function(title, name){
		var _this = this;
		var toolbarShow = _this.toolbarShow;
		var nodeBarContents = _this.toolbarBtn;
		var html = "";
		switch (name) {
			case defaultTool.addToolbar:

				//1. 蹇呴』鍔犺浇鐨勮妭鐐瑰唴瀹�
				var nowNode = ['<div class="layui-form-item">',
					'<label class="layui-form-label">褰撳墠閫変腑锛�</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="nodeTitle" class="layui-input f-input" value="'+title+'" readonly/>',
					'</div>',
					'</div>'].join('');

				var addNodeName = ['<div class="layui-form-item">',
					'<label class="layui-form-label">鏂板'+_this.toolbarStyle.title+'锛�</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="addNodeName" class="layui-input f-input" value="" lay-verify="required"/>',
					'</div>',
					'</div>'].join('');

				var addNodeBtn = ['<div class="layui-form-item">',
					'<div class="layui-input-block" style="margin-left:0px;text-align:center;">',
					'<button type="button" class="layui-btn layui-btn-normal btn-w100" lay-submit lay-filter="dtree_addNode_form">纭娣诲姞</button>',
					'</div>',
					'</div>'].join('');
				//2. 鐢ㄦ埛鑷畾涔夌殑鑺傜偣鍐呭
				var addNodeBar = ['<div class="'+TOOLBAR_TOOL+'"><form class="layui-form layui-form-pane" lay-filter="dtree_addNode_form">', nowNode, addNodeName];
				if(nodeBarContents != null && nodeBarContents.length > 0){
					if(nodeBarContents[0] != null && nodeBarContents[0] != undefined && nodeBarContents[0].length > 0){
						var addNodeBarContents = nodeBarContents[0];

						for(var j=0; j<addNodeBarContents.length; j++){
							var type = addNodeBarContents[j].type;
							if(!type){type = "text";}
							switch (type) {
								case "text":
									addNodeBar.push(_this.loadToolBarDetail().text(addNodeBarContents[j]));
									break;
								case "textarea":
									addNodeBar.push(_this.loadToolBarDetail().textarea(addNodeBarContents[j]));
									break;
								case "select":
									addNodeBar.push(_this.loadToolBarDetail().select(addNodeBarContents[j]));
									break;
								case "hidden":
									addNodeBar.push(_this.loadToolBarDetail().hidden(addNodeBarContents[j]));
									break;

							}
						}
					}
				}
				addNodeBar.push(addNodeBtn);
				addNodeBar.push('</form></div>');
				html = addNodeBar.join('');
				break;

			case defaultTool.editToolbar:

				//1. 蹇呴』鍔犺浇鐨勮妭鐐瑰唴瀹�
				var nowNode = ['<div class="layui-form-item">',
					'<label class="layui-form-label">褰撳墠閫変腑锛�</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="nodeTitle" class="layui-input f-input" value="'+title+'" readonly/>',
					'</div>',
					'</div>'].join('');

				var editNodeName = ['<div class="layui-form-item">',
					'<label class="layui-form-label">缂栬緫'+_this.toolbarStyle.title+'锛�</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="editNodeName" class="layui-input f-input" value="'+title+'" lay-verify="required"/>',
					'</div>',
					'</div>'].join('');


				var editNodeBtn = ['<div class="layui-form-item">',
					'<div class="layui-input-block" style="margin-left:0px;text-align:center;">',
					'<button type="button" class="layui-btn layui-btn-normal btn-w100" lay-submit lay-filter="dtree_editNode_form">纭缂栬緫</button>',
					'</div>',
					'</div>'].join('');

				var editNodeBar = ['<div class="'+TOOLBAR_TOOL+'"><form class="layui-form layui-form-pane" lay-filter="dtree_editNode_form">', nowNode, editNodeName];
				//2. 鐢ㄦ埛鑷畾涔夌殑鑺傜偣鍐呭
				if(nodeBarContents != null && nodeBarContents.length > 0){

					if(nodeBarContents[1] != null && nodeBarContents[1] != undefined && nodeBarContents[1].length > 0){
						var editNodeBarContents = nodeBarContents[1];

						for(var j=0; j<editNodeBarContents.length; j++){
							var type = editNodeBarContents[j].type;
							if(!type){type = "text";}
							switch (type) {
								case "text":
									editNodeBar.push(_this.loadToolBarDetail().text(editNodeBarContents[j]));
									break;
								case "textarea":
									editNodeBar.push(_this.loadToolBarDetail().textarea(editNodeBarContents[j]));
									break;
								case "select":
									editNodeBar.push(_this.loadToolBarDetail().select(editNodeBarContents[j]));
									break;
								case "hidden":
									editNodeBar.push(_this.loadToolBarDetail().hidden(editNodeBarContents[j]));
									break;
							}
						}
					}
				}

				editNodeBar.push(editNodeBtn);
				editNodeBar.push('</form></div>');
				html = editNodeBar.join('');
				break;
		}
		return html;
	};

	// 鑾峰彇toolbar璇︾粏鐨勬爣绛句俊鎭�
	DTree.prototype.loadToolBarDetail = function(){
		var _this = this;
		return{
			text: function(nodeBarContents){
				return ['<div class="layui-form-item">',
					'<label class="layui-form-label" title="'+nodeBarContents.label+'">'+nodeBarContents.label+'锛�</label>',
					'<div class="layui-input-block f-input-par">',
					'<input type="text" name="'+nodeBarContents.name+'" class="layui-input f-input" value="'+(nodeBarContents.value ? nodeBarContents.value : "")+'"/>',
					'</div>',
					'</div>'].join('');
			},
			textarea: function(nodeBarContents){
				return ['<div class="layui-form-item layui-form-text">',
					'<label class="layui-form-label">'+nodeBarContents.label+'锛�</label>',
					'<div class="layui-input-block f-input-par">',
					'<textarea name="'+nodeBarContents.name+'" class="layui-textarea f-input">'+(nodeBarContents.value ? nodeBarContents.value : "")+'</textarea>',
					'</div>',
					'</div>'].join('');
			},
			hidden: function(nodeBarContents){
				return ['<input type="hidden" name="'+nodeBarContents.name+'" class="layui-input f-input" value="'+(nodeBarContents.value ? nodeBarContents.value : "")+'"/>'].join('');
			},
			select: function(nodeBarContents){
				var optionsData = nodeBarContents.optionsData;
				var options = "";
				var defaultValue = nodeBarContents.value ? nodeBarContents.value : "";
				for(var key in optionsData){
					if(defaultValue == optionsData[key]){
						options += "<option value='"+key+"' selected>"+optionsData[key]+"</option>";
					} else {
						options += "<option value='"+key+"'>"+optionsData[key]+"</option>";
					}
				}
				return ['<div class="layui-form-item">',
					'<label class="layui-form-label" title="'+nodeBarContents.label+'">'+nodeBarContents.label+'锛�</label>',
					'<div class="layui-input-block f-input-par">',
					'<select name="'+nodeBarContents.name+'">',
					options,
					'</select>',
					'</div>',
					'</div>'].join('');
			}
		}
	};

	// 鏂板鑺傜偣鍚庢敼鍙樿妭鐐瑰唴瀹�
	DTree.prototype.changeTreeNodeAdd = function(returnID){
		var _this = this;
		var temp = _this.temp;
		var id = temp[0], $ul = temp[1], $div = temp[2], level = temp[3];
		if(returnID){
			var $thisDiv = _this.obj.find("[data-id='"+id+"']");
			if(typeof returnID === "object"){
				// 濡傛灉鏄疛SON鏍煎紡鏁版嵁锛屽垯灏嗗綋鍓岲IV鍒犻櫎锛岄噸鏂板缓閫燚IV
				$thisDiv.remove();
				var parseData = _this.parseData(returnID);

				if(parseData.treeId()){
					$ul.append(_this.getLiItemDom(parseData.treeId(), parseData.parentId(), parseData.title(), parseData.isLast(0), parseData.iconClass(), parseData.checkArr(), level, parseData.spread(), parseData.disabled(), parseData.basicData(), parseData.recordData(), "item"));

					// 寤洪€犲畬姣曞悗锛岄€変腑璇IV
					var $addDiv = $ul.find("div[data-id='"+returnID.id+"']");
					_this.setNodeParam($addDiv)
				} else {
					layer.msg("娣诲姞澶辫触,鑺傜偣ID涓簎ndefined锛�",{icon:5});
					// 灏唋i鑺傜偣鍒犻櫎
					$ul.find("li[data-id='"+id+"']").remove();
					// 閲嶆柊璧嬪€�
					_this.setNodeParam($div);
					// 涓存椂鍙橀噺鍒剁┖
					_this.temp = [];
					return ;
				}
			}else if(typeof returnID === "string" || typeof this.icon === 'number'){
				$thisDiv.attr("data-id", returnID);
				// 灏唋i鑺傜偣灞曠ず
				$ul.find("li[data-id='"+returnID+"']").show();
				var $addDiv = $ul.find("div[data-id='"+returnID+"']");
				_this.setNodeParam($addDiv)
			}

			// 鍒ゆ柇褰撳墠鐐瑰嚮鐨勮妭鐐规槸鍚︽槸鏈€鍚庝竴绾ц妭鐐癸紝濡傛灉鏄紝鍒欓渶瑕佷慨鏀硅妭鐐圭殑鏍峰紡
			var $icon_i = $div.find("i[data-spread]");
			if ($icon_i.eq(0).attr("data-spread") == "last") {
				$icon_i.attr("data-spread","open");
				$icon_i.eq(0).removeClass(LI_DIV_SPREAD_LAST);
				$icon_i.eq(0).removeClass(ICON_HIDE);
				$icon_i.eq(0).addClass(_this.ficonOpen);
				$icon_i.eq(1).removeClass(leafIconArray[_this.leafIcon]);
				$icon_i.eq(1).addClass(_this.nodeIconOpen);
			} else {	//濡傛灉涓嶆槸锛屼篃瑕佷慨鏀硅妭鐐规牱寮�
				$icon_i.attr("data-spread","open");
				$icon_i.eq(0).removeClass(_this.ficonClose);
				$icon_i.eq(0).addClass(_this.ficonOpen);
				$icon_i.eq(1).removeClass(_this.nodeIconClose);
				$icon_i.eq(1).addClass(_this.nodeIconOpen);
				
		//		_this.clickSpread($div);
			}
			$ul.addClass(NAV_SHOW);	//灞曞紑UL
		} else {
			// 灏唋i鑺傜偣鍒犻櫎
			$ul.find("li[data-id='"+id+"']").remove();
			// 閲嶆柊璧嬪€�
			_this.setNodeParam($div);
		}

		_this.temp = []; // 涓存椂鍙橀噺鍒剁┖

	};

	// 淇敼鑺傜偣鍚庢敼鍙樿妭鐐瑰唴瀹�
	DTree.prototype.changeTreeNodeEdit = function(flag){
		var _this = this;
		var temp = _this.temp;
		var $cite = temp[0],
			$div = temp[1];

		if(!flag){
			$cite.html(title);
			node = _this.getNodeParam($div);
		}

		_this.temp = []; // 涓存椂鍙橀噺鍒剁┖
	};

	// 缂栬緫椤垫墦寮€鍚庢樉绀虹紪杈戦〉鍐呭
	DTree.prototype.changeTreeNodeDone = function(param){
		var _this = this;
		form.val('dtree_editNode_form', param);
		form.render();
	};

	// 鍒犻櫎鑺傜偣鍚庢敼鍙樿妭鐐瑰唴瀹�
	DTree.prototype.changeTreeNodeDel = function(flag){
		var _this = this;
		var temp = _this.temp;
		var $p_li = temp[0],
			$p_ul = $p_li.parent("ul"),
			$p_div = temp[1];

		if(flag){
			$p_li.remove();
			// 鍒ゆ柇鐖剁骇ul涓槸鍚﹁繕瀛樺湪li,濡傛灉涓嶅瓨鍦紝鍒欓渶瑕佷慨鏀硅妭鐐圭殑鏍峰紡
			if($p_ul.children("li").length == 0){
				var $icon_i = $p_div.find("i[data-spread]");
				$icon_i.attr("data-spread","last");
				$icon_i.eq(0).removeClass(_this.ficonOpen);
				$icon_i.eq(0).removeClass(_this.ficonClose);
				if(!_this.dot){$icon_i.eq(0).addClass(ICON_HIDE);}
				$icon_i.eq(0).addClass(LI_DIV_SPREAD_LAST);

				$icon_i.eq(1).removeClass(_this.nodeIconOpen);
				$icon_i.eq(1).removeClass(_this.nodeIconClose);
				$icon_i.eq(1).addClass(leafIconArray[_this.leafIcon]);
			}
			_this.initNodeParam();
		}

		_this.temp = []; // 涓存椂鍙橀噺鍒剁┖
	};


	/******************** 澶嶉€夋鍖哄煙 ********************/
		// 鍒濆鍖栧閫夋鐨勫€�
	DTree.prototype.chooseDataInit = function(chooseIds){
		var _this = this;
		var chooseId = chooseIds.split(",");
		for (var i=0; i<chooseId.length; i++) {
			_this.obj.find("i[dtree-click='"+eventName.checkNodeClick+"']").each(function(){
				if ($(this).attr("data-id") == chooseId[i]) {
					_this.checkStatus($(this)).check();
				}
			});
		}
		// 灞曞紑閫変腑鑺傜偣鐨勭埗鑺傜偣
		var $li_parents = _this.obj.find("i[dtree-click='"+eventName.checkNodeClick+"'][data-checked='1']").parents("."+LI_NAV_ITEM);
		$li_parents.children("ul").addClass(NAV_SHOW);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).addClass(_this.ficonOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.ficonClose).removeClass(_this.ficonClose);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).addClass(_this.nodeIconOpen);
		$li_parents.children("."+LI_DIV_ITEM).children("i[data-spread]."+_this.nodeIconClose).removeClass(_this.nodeIconClose);
		return _this.getCheckbarNodesParam();
	};

	//瀹炵幇澶嶉€夋鐐瑰嚮锛屽瓙闆嗛€変腑鐖剁骇涔熼€変腑
	DTree.prototype.checkAllOrNot =  function($i) {
		var _this = this;
		//$i 褰撳墠鐐瑰嚮鐨刢heckbox
		var dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//褰撳墠checkbox鐨勪笂绾i鑺傜偣
			$parent_li = $i.parents(dataPar),		//褰撳墠checkbox鐨勬墍鏈夌埗绾i鑺傜偣
			$child_li = $li.find(dataPar);	//褰撳墠checkbox鐨勪笂绾i鑺傜偣涓嬬殑鎵€鏈夊瓙绾i鑺傜偣

		if ($i.attr("data-checked") == "1") {
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).noCheck();

			// 澶勭悊瀛愮骇鑺傜偣鐨勯€変腑鐘舵€�
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).noCheck();

			// 澶勭悊鐖剁骇鑺傜偣鐨勯€変腑鐘舵€�
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var flag = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
				if (flag == 0) {
					//鎶婄埗绾у幓鎺夐€変腑
					var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
					_this.checkStatus($item_i).noCheck();
				}
			}
		} else {
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).check();

			// 澶勭悊瀛愮骇鑺傜偣鐨勯€変腑鐘舵€�
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).check();

			// 澶勭悊鐖剁骇鑺傜偣鐨勯€変腑鐘舵€�
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
				//鎶婄埗绾ч€変腑
				_this.checkStatus($item_i).check();
			}
		}
	};

	//瀹炵幇澶嶉€夋鐐瑰嚮锛� no-all 瀛愰泦閫変腑鐖剁骇鍗婇€変腑锛屽瓙闆嗗叏閫夌埗绾ч€変腑
	DTree.prototype.checkAllOrNoallOrNot =  function($i) {
		var _this = this;
		//$i 褰撳墠鐐瑰嚮鐨刢heckbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//褰撳墠checkbox鐨勪笂绾i鑺傜偣
			$parent_li = $i.parents(dataPar),		//褰撳墠checkbox鐨勬墍鏈夌埗绾i鑺傜偣
			$child_li = $li.find(dataPar);	//褰撳墠checkbox鐨勪笂绾i鑺傜偣涓嬬殑鎵€鏈夊瓙绾i鑺傜偣

		if ($i.attr("data-checked") == "1") {	//褰撳墠澶嶉€夋涓洪€変腑鐘舵€侊紝鐐瑰嚮鍚庡彉涓烘湭閫変腑鐘舵€�
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).noCheck();

			// 澶勭悊瀛愮骇鑺傜偣鐨勯€変腑鐘舵€�
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).noCheck();

			// 澶勭悊鐖剁骇鑺傜偣鐨勯€変腑鐘舵€�
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var flag = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
				var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
				if (flag == 0) {
					//鎶婄埗绾у幓鎺夐€変腑
					_this.checkStatus($item_i).noCheck();
				} else {
					//鎶婄埗绾у崐閫�
					_this.checkStatus($item_i).noallCheck();
				}
			}
		} else {		//褰撳墠澶嶉€夋涓烘湭閫変腑鐘舵€侊紝鐐瑰嚮鍚庡彉涓洪€変腑鐘舵€�
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).check();

			// 澶勭悊瀛愮骇鑺傜偣鐨勯€変腑鐘舵€�
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).check();

			// 澶勭悊鐖剁骇鑺傜偣鐨勯€変腑鐘舵€�
			for (var i = 1, item = $parent_li; i < item.length; i++) {
				var flag1 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
				var flag2 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']").length;
				var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
				if (flag1 != flag2) {
					// 鐖剁骇澶嶉€夋鍗婇€�
					_this.checkStatus($item_i).noallCheck();
				} else {
					// 鐖剁骇澶嶉€夋鍏ㄩ€�
					_this.checkStatus($item_i).check();
				}
			}
		}
	};

	//瀹炵幇澶嶉€夋鐐瑰嚮锛宲-casc锛氱埗绾ч€変腑瀛愰泦鍏ㄩ€夛紝瀛愰泦鏃犳硶鏀瑰彉鐖剁骇閫変腑鐘舵€�
	DTree.prototype.checkAllOrPcascOrNot = function($i) {
		var _this = this;
		//$i 褰撳墠鐐瑰嚮鐨刢heckbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//褰撳墠checkbox鐨勪笂绾i鑺傜偣
			$parent_li = $i.parents(dataPar),		//褰撳墠checkbox鐨勬墍鏈夌埗绾i鑺傜偣
			$child_li = $li.find(dataPar);	//褰撳墠checkbox鐨勪笂绾i鑺傜偣涓嬬殑鎵€鏈夊瓙绾i鑺傜偣

		if ($i.attr("data-checked") == "1") {	//褰撳墠澶嶉€夋涓洪€変腑鐘舵€侊紝鐐瑰嚮鍚庡彉涓烘湭閫変腑鐘舵€�
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).noCheck();

			// 澶勭悊瀛愮骇鑺傜偣鐨勯€変腑鐘舵€�
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).noCheck();

		} else {		//褰撳墠澶嶉€夋涓烘湭閫変腑鐘舵€侊紝鐐瑰嚮鍚庡彉涓洪€変腑鐘舵€�
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).check();

			// 澶勭悊瀛愮骇鑺傜偣鐨勯€変腑鐘舵€�
			var $child_li_i = $child_li.find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
			_this.checkStatus($child_li_i).check();
		}
	};
	
	//瀹炵幇澶嶉€夋鐐瑰嚮锛宻elf锛氬悇鑷€変腑浜掍笉褰卞搷
	DTree.prototype.checkOrNot = function($i) {
		var _this = this;
		//$i 褰撳墠鐐瑰嚮鐨刢heckbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//褰撳墠checkbox鐨勪笂绾i鑺傜偣
			$parent_li = $i.parents(dataPar),		//褰撳墠checkbox鐨勬墍鏈夌埗绾i鑺傜偣
			$child_li = $li.find(dataPar);	//褰撳墠checkbox鐨勪笂绾i鑺傜偣涓嬬殑鎵€鏈夊瓙绾i鑺傜偣
		
		if ($i.attr("data-checked") == "1") {	//褰撳墠澶嶉€夋涓洪€変腑鐘舵€侊紝鐐瑰嚮鍚庡彉涓烘湭閫変腑鐘舵€�
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).noCheck();
		} else {		//褰撳墠澶嶉€夋涓烘湭閫変腑鐘舵€侊紝鐐瑰嚮鍚庡彉涓洪€変腑鐘舵€�
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).check();
		}
	};

	//瀹炵幇澶嶉€夋鐐瑰嚮锛宱nly锛氬彧鑳介€変腑1涓閫夋
	DTree.prototype.checkOnly = function($i) {
		var _this = this;
		//$i 褰撳墠鐐瑰嚮鐨刢heckbox
		var $div = $i.closest("."+LI_DIV_ITEM),
			dataPar = $i.attr("data-par"),
			dataType = $i.attr("data-type"),
			$li = $i.closest(dataPar),		//褰撳墠checkbox鐨勪笂绾i鑺傜偣
			$parent_li = $i.parents(dataPar),		//褰撳墠checkbox鐨勬墍鏈夌埗绾i鑺傜偣
			$child_li = $li.find(dataPar);	//褰撳墠checkbox鐨勪笂绾i鑺傜偣涓嬬殑鎵€鏈夊瓙绾i鑺傜偣
	
		var checked = $i.attr("data-checked");
		// 灏嗗叏閮ㄨ妭鐐瑰叏閮ㄨ涓烘湭閫変腑鐘舵€�
		var $all_i = _this.obj.find("i[data-checked]");
		_this.checkStatus($all_i).noCheck();
		
		if (checked != "1") {	//褰撳墠澶嶉€夋涓烘湭閫変腑鐘舵€侊紝鐐瑰嚮鍚庡彉涓洪€変腑鐘舵€�
			// 澶勭悊褰撳墠鑺傜偣鐨勯€変腑鐘舵€�
			_this.checkStatus($i).check();
		}
		
		
	};
	
	//瀹炵幇澶嶉€夋鐐瑰嚮
	DTree.prototype.changeCheck = function() {
		var _this = this;
		var temp = _this.temp;
		var $i = temp[0];
		// 澶嶉€夋閫変腑浜嬩欢
		if (_this.checkbarType == "all") {
			_this.checkAllOrNot($i);
		} else if(_this.checkbarType == "no-all") {
			_this.checkAllOrNoallOrNot($i);
		} else if(_this.checkbarType == "p-casc") {
			_this.checkAllOrPcascOrNot($i);
		} else if(_this.checkbarType == "self") {
			_this.checkOrNot($i);
		} else if(_this.checkbarType == "only") {
			_this.checkOnly($i);
		} else {
			_this.checkAllOrNot($i);
		}

		// 鑾峰彇澶嶉€夋閫変腑鑺傜偣鐨勫唴瀹�
		var checkbarNodes = _this.setAndGetCheckbarNodesParam();

		// 鐢ㄦ埛鑷畾涔夋兂鍋氱殑浜嬫儏
		_this.checkbarFun.chooseDone(checkbarNodes);
		layui.event.call(this, MOD_NAME, "chooseDone("+$(_this.obj)[0].id+")", {"checkbarParams": checkbarNodes});
		_this.temp = [];
	};

	//澶嶉€夋鍗婇€夌姸鎬佸垵濮嬪寲璁剧疆
	DTree.prototype.initNoAllCheck = function(){
		var _this = this;
		//1.鑾峰彇鎵€鏈夐€変腑鑺傜偣
		var $is = _this.obj.find("i[data-checked='1']");
		if($is.length > 0){
			for ( var key = 0; key < $is.length; key++) {
				var $i = $($is[key]),
					dataPar = $i.attr("data-par"),
					dataType = $i.attr("data-type"),
					$li = $i.closest(dataPar),		//褰撳墠checkbox鐨勪笂绾i鑺傜偣
					$parent_li = $i.parents(dataPar),		//褰撳墠checkbox鐨勬墍鏈夌埗绾i鑺傜偣
					$child_li = $li.find(dataPar);	//褰撳墠checkbox鐨勪笂绾i鑺傜偣涓嬬殑鎵€鏈夊瓙绾i鑺傜偣

				// 澶勭悊鐖剁骇鑺傜偣鐨勯€変腑鐘舵€�
				for (var i = 1, item = $parent_li; i < item.length; i++) {
					var flag1 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"'][data-checked='1']").length;
					var flag2 = item.eq(i).find(">."+LI_NAV_CHILD+" ."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']").length;
					var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
					if (flag1 != flag2) {
						// 鐖剁骇澶嶉€夋鍗婇€�
						_this.checkStatus($item_i).noallCheck();
					} else {
						// 鐖剁骇澶嶉€夋鍏ㄩ€�
						_this.checkStatus($item_i).check();
					}
				}
			}
		}
	};

	//澶嶉€夋閫変腑鐘舵€佸垵濮嬪寲璁剧疆
	DTree.prototype.initAllCheck = function(){
		var _this = this;
		//1.鑾峰彇鎵€鏈夐€変腑鑺傜偣
		var $is = _this.obj.find("i[data-checked='1']");
		if($is.length > 0){
			for ( var key = 0; key < $is.length; key++) {
				var $i = $($is[key]),
					dataPar = $i.attr("data-par"),
					dataType = $i.attr("data-type"),
					$li = $i.closest(dataPar),		//褰撳墠checkbox鐨勪笂绾i鑺傜偣
					$parent_li = $i.parents(dataPar),		//褰撳墠checkbox鐨勬墍鏈夌埗绾i鑺傜偣
					$child_li = $li.find(dataPar);	//褰撳墠checkbox鐨勪笂绾i鑺傜偣涓嬬殑鎵€鏈夊瓙绾i鑺傜偣

				// 澶勭悊鐖剁骇鑺傜偣鐨勯€変腑鐘舵€�
				for (var i = 1, item = $parent_li; i < item.length; i++) {
					var $item_i = item.eq(i).find(">."+LI_DIV_ITEM+">."+LI_DIV_CHECKBAR+">i[data-type='"+dataType+"']");
					// 鐖剁骇澶嶉€夋鍏ㄩ€�
					_this.checkStatus($item_i).check();
				}
			}
		}
	};

	// 璁剧疆澶嶉€夋閫変腑/鏈€変腑/鍗婇€�  _this.checkStatus($i).check();  _this.checkStatus($i).noCheck();   _this.checkStatus($i).noallCheck();
	DTree.prototype.checkStatus = function($i) {
		var _this = this;
		return {
			check: function(){
				$i.removeClass(LI_DIV_CHECKBAR_OUT);
				$i.removeClass(LI_DIV_CHECKBAR_NOALL);
				$i.addClass(LI_DIV_CHECKBAR_ON);
				$i.addClass(_this.style.chs);
				$i.attr("data-checked","1");
			},
			noCheck: function(){
				$i.removeClass(LI_DIV_CHECKBAR_NOALL);
				$i.removeClass(LI_DIV_CHECKBAR_ON);
				$i.removeClass(_this.style.chs);
				$i.addClass(LI_DIV_CHECKBAR_OUT);
				$i.attr("data-checked","0");
			},
			noallCheck: function(){
				$i.removeClass(LI_DIV_CHECKBAR_OUT);
				$i.removeClass(LI_DIV_CHECKBAR_ON);
				$i.addClass(LI_DIV_CHECKBAR_NOALL);
				$i.addClass(_this.style.chs);
				$i.attr("data-checked","2");
			}
		}
	};

	// 璁剧疆鏍戠殑澶嶉€夋鎿嶄綔鍊肩殑鍏ㄩ儴鍙傛暟,骞惰幏鍙�
	DTree.prototype.setAndGetCheckbarNodesParam = function() {
		var _this = this;
		//鎿嶄綔鍓嶅厛娓呯┖
		_this.checkbarNode = [];
		// 閫夋嫨鎵€鏈夊閫夋鑺傜偣
		if (_this.checkbarData == "change"){	//璁板綍鍙樻洿鏁版嵁
			_this.obj.find("i[data-par]").each(function(){
				var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);

				if ($i.attr("data-checked") != $i.attr("data-initchecked")) {
					_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));
				}
			});
		} else if (_this.checkbarData == "all"){	//璁板綍鍏ㄩ儴鏁版嵁
			_this.obj.find("i[data-par][data-checked]").each(function(){
				var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);
				_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));

			});
		} else {	//璁板綍閫変腑鏁版嵁
			_this.obj.find("i[data-par][data-checked='1']").each(function(){
				var $i = $(this), $div = $i.closest("."+LI_DIV_ITEM);
				_this.checkbarNode.push(_this.getRequestParam(_this.getCheckbarNodeParam($div, $i)));

			});
		}
		return _this.checkbarNode;
	};

	// 鑾峰彇鏍戠殑澶嶉€夋鎿嶄綔鍊肩殑鍏ㄩ儴鍙傛暟
	DTree.prototype.getCheckbarNodesParam = function() {
		var _this = this;
		return _this.setAndGetCheckbarNodesParam();
	};

	// 鑾峰彇鏍戠殑涓€涓閫夋鐨勫弬鏁�
	DTree.prototype.getCheckbarNodeParam = function($div, $i){
		var _this = this;
		var temp_node = {};
		temp_node.nodeId = $div.attr("data-id");
		temp_node.parentId = $div.parent().attr("data-pid");
		temp_node.context = $div.find("cite[data-leaf]").eq(0).text();
		temp_node.isLeaf = $div.find("cite[data-leaf]").eq(0).attr("data-leaf") == "leaf" ? true : false;
		temp_node.level = $div.parent().attr("data-index");
		temp_node.spread = $div.find("i[data-spread]").eq(0).attr("data-spread") == "open" ? true : false;
		temp_node.basicData = $div.attr("data-basic");
		temp_node.recordData = $div.attr("data-record");
		temp_node.dataType = $i.attr("data-type");
		temp_node.ischecked = $i.attr("data-checked");
		temp_node.initchecked = $i.attr("data-initchecked");
		return temp_node;
	};

	//鍒ゆ柇澶嶉€夋鏄惁鍙戠敓鍙樻洿
	DTree.prototype.changeCheckbarNodes = function(){
		var flag = false;
		var _this = this;
		_this.obj.find("i[data-par]").each(function(){
			var $i = $(this);
			$div = $i.closest("."+LI_DIV_ITEM);

			if ($i.attr("data-checked") != $i.attr("data-initchecked")) {
				flag = true;
				return true;
			}
		});
		return flag;
	};


	/******************** iframe鍖哄煙 ********************/
		// 鍔犺浇iframe
	DTree.prototype.loadIframe = function($div, iframeParam) {
		var _this = this;
		var $cite = $div.find("cite[data-leaf]").eq(0);
		if (!_this.useIframe) {		// 鍚敤iframe
			return false;
		}
		var iframeElem = _this.iframe.iframeElem,
			iframeUrl = _this.iframe.iframeUrl,
			iframeLoad = _this.iframe.iframeLoad;

		var flag = iframeLoad == "leaf" ? (($cite.attr("data-leaf") == "leaf") ? true : false) : true;

		if (flag) {
			if ($(iframeElem).length > 0) {		//iframe瀛樺湪
				if (!iframeUrl) {
					layer.msg("鏁版嵁璇锋眰寮傚父锛宨frameUrl鍙傛暟鏈寚瀹�", {icon:5});
					return false;
				}
				var param = AjaxHelper.serialize(iframeParam);
				if(iframeUrl.indexOf("?")> -1){
					param = "&"+param.substring(1, param.length);
				}
				var url = iframeUrl + param;
				$(iframeElem).attr("src", url);
			} else {
				layer.msg("iframe缁戝畾寮傚父锛岃纭椤甸潰涓槸鍚︽湁iframe椤靛搴旂殑瀹瑰櫒", {icon:5});
				return false;
			}
		}
		return flag;
	};

	// 鑾峰彇浼犻€掑嚭鍘荤殑鍙傛暟锛屾牴鎹甶frame.iframeDefaultRequest銆乮frame.iframeRequest鍜宯ode鎷煎嚭鍙戝嚭璇锋眰鐨勫弬鏁�
	DTree.prototype.getIframeRequestParam = function(nodes){
		var _this = this;
		var request = _this.iframe.iframeRequest,
			defaultRequestNames = _this.iframe.iframeDefaultRequest,
			node = nodes || _this.node,
			requestParam = {};

		// 鍏堟嫾鐢ㄦ埛鑷畾涔夌殑锛屽湪鎷兼爲鐢熸垚鐨勶紝杩欐牱鐨勮瘽鐢ㄦ埛鍙互鑷畾涔夊綋鏍戞湭鐢熸垚鏃剁殑鑺傜偣鐨勫垵濮嬪€�
		for ( var key in request) {
			requestParam[key] = request[key];
		}
		for ( var key in defaultRequestNames) {
			var paramName = defaultRequestNames[key];
			var paramValue = node[key];
			if(typeof paramValue === "boolean"){
				requestParam[paramName] = paramValue;
			}else {
				if(paramValue){
					requestParam[paramName] = paramValue;
				}
			}
		}

		// 瑙ｅ喅浼犻€掍腑鏂囩殑涔辩爜闂
		var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;	//姝ｅ垯鍖归厤涓枃
		for(var key in requestParam){
			if(reg.test(requestParam[key])) {
				var str = requestParam[key];
				requestParam[key] = encodeURI(encodeURI(str));
			}
		}

		return requestParam;
	};

	/******************** 鏁版嵁鍥炶皟鍖哄煙 ********************/
		// 鑾峰彇褰撳墠閫変腑鑺傜偣涓嬩竴涓猆L 鎴栨牴鑺傜偣銆備负浜嗗皢鏂拌妭鐐规斁鍏l涓�
	DTree.prototype.getNowNodeUl =  function() {
		var _this = this;
		return (_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).length == 0) ? _this.obj : _this.obj.find("div[data-id]").parent().find("."+NAV_THIS).next("ul");
	};

	// 鑾峰彇褰撳墠閫変腑鑺傜偣 鎴栨牴鑺傜偣銆�
	DTree.prototype.getNowNode =  function() {
		var _this = this;
		return (_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).length == 0) ? _this.obj.children("li").eq(0).children("div").eq(0) : _this.obj.find("div[data-id]").parent().find("."+NAV_THIS);
	};

	// 璁剧疆褰撳墠閫変腑鑺傜偣鐨勫叏閮ㄥ弬鏁�
	DTree.prototype.setNodeParam = function($div) {
		var _this = this;
		_this.node.nodeId = $div.attr("data-id");
		_this.node.parentId = $div.parent().attr("data-pid");
		_this.node.context = $div.find("cite[data-leaf]").eq(0).text();
		_this.node.isLeaf = $div.find("cite[data-leaf]").eq(0).attr("data-leaf") == "leaf" ? true : false;
		_this.node.level = $div.parent().attr("data-index");
		_this.node.spread = $div.find("i[data-spread]").eq(0).attr("data-spread") == "open" ? true : false;
		_this.node.basicData = $div.attr("data-basic");
		_this.node.recordData = $div.attr("data-record");
		if ($div.find("i[data-par]")) {
			var dataTypes = "", ischeckeds = "", initcheckeds = "";
			$div.find("i[data-par]").each(function(){
				dataTypes += $(this).attr("data-type") + ",";
				ischeckeds += $(this).attr("data-checked") + ",";
				initcheckeds += $(this).attr("data-initchecked") + ",";
			});
			dataTypes = dataTypes.substring(0, dataTypes.length-1);
			ischeckeds = ischeckeds.substring(0, ischeckeds.length-1);
			initcheckeds = initcheckeds.substring(0, initcheckeds.length-1);

			_this.node.dataType = dataTypes;
			_this.node.ischecked = ischeckeds;
			_this.node.initchecked = initcheckeds;
		}
	};

	// 鑾峰彇褰撳墠閫変腑鑺傜偣鐨勫叏閮ㄥ弬鏁�
	DTree.prototype.getNodeParam = function($div) {
		var _this = this;
		if ($div) {
			_this.setNodeParam($div);
		} else {
			if(_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).length == 0){
				_this.initNodeParam();
			}
		}
		return this.node;
	};

	// 鑾峰彇涓€涓复鏃剁殑node鍙傛暟
	DTree.prototype.getTempNodeParam = function($div) {
		var _this = this;
		var temp_node = {};
		temp_node.nodeId = $div.attr("data-id");
		temp_node.parentId = $div.parent().attr("data-pid");
		temp_node.context = $div.find("cite[data-leaf]").eq(0).text();
		temp_node.isLeaf = $div.find("cite[data-leaf]").eq(0).attr("data-leaf") == "leaf" ? true : false;
		temp_node.level = $div.parent().attr("data-index");
		temp_node.spread = $div.find("i[data-spread]").eq(0).attr("data-spread") == "open" ? true : false;
		temp_node.basicData = $div.attr("data-basic");
		temp_node.recordData = $div.attr("data-record");
		if ($div.find("i[data-par]")) {
			var dataTypes = "", ischeckeds = "", initcheckeds = "";
			$div.find("i[data-par]").each(function(){
				dataTypes += $(this).attr("data-type") + ",";
				ischeckeds += $(this).attr("data-checked") + ",";
				initcheckeds += $(this).attr("data-initchecked") + ",";
			});
			dataTypes = dataTypes.substring(0, dataTypes.length-1);
			ischeckeds = ischeckeds.substring(0, ischeckeds.length-1);
			initcheckeds = initcheckeds.substring(0, initcheckeds.length-1);

			temp_node.dataType = dataTypes;
			temp_node.ischecked = ischeckeds;
			temp_node.initchecked = initcheckeds;
		}
		return temp_node;
	};

	// 閲嶇疆鍙傛暟
	DTree.prototype.initNodeParam = function(){
		var _this = this;
			_this.node.nodeId = "";
			_this.node.parentId = "";
			_this.node.context = "";
			_this.node.isLeaf = "";
			_this.node.level = "";
			_this.node.spread = "";
			_this.node.dataType = "";
			_this.node.ischecked = "";
			_this.node.initchecked = "";
			_this.node.basicData = "";
	};

	// 鑾峰彇浼犻€掑嚭鍘荤殑鍙傛暟锛屾牴鎹甦efaultRequest銆乺equest鍜宯ode鎷煎嚭鍙戝嚭璇锋眰鐨勫弬鏁�
	DTree.prototype.getRequestParam = function(nodes){
		var _this = this;
		var request = _this.request,
			defaultRequestNames = _this.defaultRequest,
			node = nodes || _this.node,
			requestParam = {};

		// 鍏堟嫾鐢ㄦ埛鑷畾涔夌殑锛屽湪鎷兼爲鐢熸垚鐨勶紝杩欐牱鐨勮瘽鐢ㄦ埛鍙互鑷畾涔夊綋鏍戞湭鐢熸垚鏃剁殑鑺傜偣鐨勫垵濮嬪€�
		for ( var key in request) {
			requestParam[key] = request[key];
		}
		for ( var key in defaultRequestNames) {
			var paramName = defaultRequestNames[key];
			var paramValue = node[key];
			if(typeof paramValue === "boolean"){
				requestParam[paramName] = paramValue;
			}else {
				if(paramValue){
					requestParam[paramName] = paramValue;
				}
			}

		}
		return requestParam;
	};
	
	// 鑾峰彇filterParam杩囨护鍚庣殑requestParam
	DTree.prototype.getFilterRequestParam = function(requestParam){
		var _this = this;
		var filterRequest = _this.filterRequest;
		return event.cloneObj(requestParam, filterRequest);
	};

	// 鑾峰彇褰撳墠閫変腑鍊�
	DTree.prototype.getNowParam = function(){
		var _this = this;
		
		return _this.getRequestParam(_this.getNodeParam());
	};

	// 鑾峰彇鍙傛暟鐨勪笂绾ц妭鐐�
	DTree.prototype.getParentParam = function(id){
		var _this = this;
		var $div = _this.obj.find("div[data-id='"+id+"']");
		if($div.length > 0){ return _this.callbackData().parentNode($div); } else { return {}; }
	};

	// 鑾峰彇鍙傛暟鐨勪笅绾ц妭鐐�
	DTree.prototype.getChildParam = function(id){
		var _this = this;
		var $div = _this.obj.find("div[data-id='"+id+"']");
		if($div.length > 0){ return _this.callbackData().childNode($div); } else { return []; }
	};

	// 鑾峰彇鍥炶皟鏁版嵁
	DTree.prototype.callbackData = function(){
		var _this = this;
		return {
			dom: function($dom){  // 鑾峰彇dom
				return $dom;
			},
			node: function(node){	// 鑾峰彇褰撳墠鑺傜偣鍊�
				return _this.getRequestParam(node);
			},
			childNode: function($div){	// 鑾峰彇涓嬬骇鑺傜偣鍊�
				var $childDivs = $div.next("ul").find("li."+LI_NAV_ITEM+" div."+LI_DIV_ITEM);
				var childNode = [];
				if($childDivs && $childDivs.length > 0){
					$childDivs.each(function(){
						var $cDiv = $(this);
						childNode.push(_this.getRequestParam(_this.getTempNodeParam($cDiv)));
					});
				}
				return childNode;
			},
			parentNode: function($div){	// 鑾峰彇涓婄骇鑺傜偣鍊�
				var pId = $div.parent().attr("data-pid");
				var $pdiv = _this.obj.find("div[data-id='"+pId+"']");
				if($pdiv.length > 0) {return _this.getRequestParam(_this.getTempNodeParam($pdiv));} else {return {};}

			}
		}
	};

	/******************** 浜嬩欢鍥炶皟鍖哄煙 ********************/
		// 缁戝畾娴忚鍣ㄤ簨浠�
	DTree.prototype.bindBrowserEvent = function(){
		var _this = this;

		// 缁戝畾鏂囦欢澶瑰睍寮€/鏀剁缉鐨勫浘鏍囩殑鐐瑰嚮浜嬩欢锛岀偣鍑绘椂缁欏綋鍓嶈妭鐐圭殑div娣诲姞閫変腑class
		_this.obj.on("click", "i[data-spread]", function(event) {
			event.stopPropagation();
			var $i = $(this),
				$div = $i.parent("div"),
				$cite = $div.find("cite"),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//褰撳墠閫変腑鑺傜偣鐨勯《绾i鑺傜偣
				$p_ul = $p_li.parent("ul");
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');

			_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
			_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
			$div.addClass(NAV_THIS);
			$div.addClass(_this.style.itemThis);

			_this.clickSpread($div);	// 灞曞紑鎴栭殣钘忚妭鐐�

			// 鏍戠姸鎬佹敼鍙樺悗锛岀敤鎴疯嚜瀹氫箟鎯冲仛鐨勪簨鎯�
			layui.event.call(this, MOD_NAME, "changeTree("+$(_this.obj)[0].id+")",  {param: _this.callbackData().node(node), dom: _this.callbackData().dom($i), show: _this.callbackData().dom($i).attr("data-spread") == "open" ? true : false});
		});

		// 缁戝畾鎵€鏈夊瓙鑺傜偣div鐨勫崟鍑讳簨浠讹紝鐐瑰嚮鏃惰Е鍙戝姞杞絠frame鎴栫敤鎴疯嚜瀹氫箟鎯冲仛鐨勪簨鎯�
		_this.obj.on("click", "div[dtree-click='"+eventName.itemNodeClick+"']", function(event) {
			event.stopPropagation();
			var $div = $(this),
				$cite = $div.find("cite"),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//褰撳墠閫変腑鑺傜偣鐨勯《绾i鑺傜偣
				$p_ul = $p_li.parent("ul");
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');

			_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
			_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
			$div.addClass(NAV_THIS);
			$div.addClass(_this.style.itemThis);

			if (_this.useIframe) {
				var iframeParam = _this.getFilterRequestParam(_this.getIframeRequestParam(node));
				var flag = _this.loadIframe($div, iframeParam);	// 鍔犺浇iframe
				if (flag) {
					// iframe鍔犺浇瀹屾瘯鍚庯紝鐢ㄦ埛鑷畾涔夋兂鍋氱殑浜嬫儏
					_this.iframeFun.iframeDone(iframeParam);

					layui.event.call(this, MOD_NAME, "iframeDone("+$(_this.obj)[0].id+")",  {"iframeParam": iframeParam, dom: _this.callbackData().dom($div)});
				}
			} else {
				// 鍗曞嚮浜嬩欢鎵ц瀹屾瘯鍚庯紝鐢ㄦ埛鑷畾涔夋兂鍋氱殑浜嬫儏
				layui.event.call(this, MOD_NAME, "node("+$(_this.obj)[0].id+")", {param: _this.callbackData().node(node), childParams: _this.callbackData().childNode($div), parentParam: _this.callbackData().parentNode($div), dom: _this.callbackData().dom($div)});
			}
		});

		// 缁戝畾鎵€鏈夊瓙鑺傜偣div鐨勫弻鍑讳簨浠讹紝鏆撮湶on缁欑敤鎴疯嚜瀹氫箟
		_this.obj.on("dblclick", "div[dtree-click='"+eventName.itemNodeClick+"']", function(event) {
			event.stopPropagation();
			var $div = $(this),
				$cite = $div.find("cite"),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//褰撳墠閫変腑鑺傜偣鐨勯《绾i鑺傜偣
				$p_ul = $p_li.parent("ul");
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');

			_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
			_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
			$div.addClass(NAV_THIS);
			$div.addClass(_this.style.itemThis);
			// 鍙屽嚮浜嬩欢鎵ц瀹屾瘯鍚庯紝鐢ㄦ埛鑷畾涔夋兂鍋氱殑浜嬫儏
			layui.event.call(this, MOD_NAME, "nodedblclick("+$(_this.obj)[0].id+")",  {param: _this.callbackData().node(node), childParams: _this.callbackData().childNode($div), parentParam: _this.callbackData().parentNode($div), dom: _this.callbackData().dom($div)});
		});

		//缁戝畾鎵€鏈夊瓙鑺傜偣div鐨勫彸閿偣鍑讳簨浠讹紝鐢ㄤ簬鏄剧ずtoolbar
		_this.obj.on("contextmenu", "div[dtree-click='"+eventName.itemNodeClick+"'][d-contextmenu]", function(e){
			var $div = $(this),
				node = _this.getNodeParam($div),
				contextmenu = $div.attr("d-contextmenu");
			if(_this.toolbar){
				var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
				$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
				
				// toolbar鍔犺浇鍓嶆墽琛岀殑鏂规硶锛屾墽琛屽畬姣曚箣鍚庡垱寤烘寜閽�			
				_this.setToolbarDom(_this.toolbarFun.loadToolbarBefore(event.cloneObj(_this.toolbarMenu), _this.getRequestParam(node), $div));
				
				var e = e || window.event,
					mx = e.pageX - $div.offset().left +45 ,
					my = $div.offset().top - _this.obj.closest(_this.toolbarScroll).offset().top +15;
				if(contextmenu == "true"){
					_this.obj.find("div[data-id]").parent().find("."+NAV_THIS).removeClass(NAV_THIS);
					_this.obj.find("div[data-id]").parent().find("."+_this.style.itemThis).removeClass(_this.style.itemThis);
					$div.addClass(NAV_THIS);
					$div.addClass(_this.style.itemThis);
					$toolBarDiv.find(".layui-nav-child").addClass('layui-anim-fadein layui-show');
					$toolBarDiv.css({'left':mx+'px','top':my+'px'});
				}
			}
			e.stopPropagation();
			return false;
		});

		// 缁戝畾瑁呰浇鏍戠殑涓婂眰鍑虹幇婊氬姩鏉＄殑瀹瑰櫒锛岃toolbar闅愯棌
		_this.obj.closest(_this.toolbarScroll).scroll(function() {
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
		});
		
		// 缁戝畾toolbar鐨勭偣鍑讳簨浠�
		_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).on("click", "a[dtree-tool]", function(event) {
			event.stopPropagation();
			var $div = _this.getNowNode(),
				node = _this.getNodeParam($div),
				$ul = $div.next("ul"),
				$p_li = $div.parent("li[data-index]"),	//褰撳墠閫変腑鑺傜偣鐨勯《绾i鑺傜偣
				$p_ul = $p_li.parent("ul"),	//褰撳墠閫変腑鑺傜偣鐨勯《绾i鑺傜偣鐨勭埗绾l
				$p_div = $p_ul.prev("div"), //褰撳墠閫変腑鑺傜偣鐨勯《绾i鑺傜偣鐨勭埗绾l鐨勫墠涓€涓猟iv
				$cite = $div.children("cite"),	//褰撳墠閫変腑鑺傜偣鐨則ext
				title = $cite.html();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			var tool = $(this).attr("dtree-tool");
			switch (tool) {
				case defaultTool.addToolbar:
					var content = _this.loadToolBar(title, defaultTool.addToolbar);

					layer.open({
						title: "鏂板"+_this.toolbarStyle.title,
						type: 1,
						area: _this.toolbarStyle.area,
						content: content,
						success: function(layero, index){
							form.render();
							form.on("submit(dtree_addNode_form)",function(data){
								var data = data.field;
								var parentId = $div.attr("data-id"),
									id = $div.attr("data-id")+"_node_"+$ul[0].childNodes.length,
									isLeaf = true,
									isChecked = "0",
									level = parseInt($p_li.attr("data-index"))+1;

								// 鍒涘缓瀛愯妭鐐圭殑DOM锛屾坊鍔犲瓙鑺傜偣
								var checkArr = [];
								if (_this.checkArrLen > 0) {
									for (var i = 0; i < _this.checkArrLen; i++) {
										checkArr.push({"type":i,"isChecked":"0"});
									}
								}
								
								$ul.append(_this.getLiItemDom(id, parentId, data.addNodeName, true, "", checkArr, level, false, false, "", "", "item"));
								// 鍏堝皢li鑺傜偣闅愯棌
								$ul.find("li[data-id='"+id+"']").hide();
								// 閲嶆柊璧嬪€�
								var $addDiv = $ul.find("div[data-id='"+id+"']");
								node = _this.getNodeParam($addDiv);

								//鑾峰彇缁勮鍚庣殑requestNode,缁勫悎鍙傛暟
								var requestNode = _this.getRequestParam(node);
								requestNode = $.extend(requestNode, data);

								_this.temp = [id, $ul, $div, level];
								// 鐢ㄦ埛鑷畾涔夋兂鍋氱殑浜嬫儏
								_this.toolbarFun.addTreeNode(requestNode, $div);

								layer.close(index);
								return false;
							});
						}
					});
					break;
				case defaultTool.editToolbar:
					var content = _this.loadToolBar(title, defaultTool.editToolbar);

					layer.open({
						title: "缂栬緫"+_this.toolbarStyle.title,
						type: 1,
						area: _this.toolbarStyle.area,
						content: content,
						success: function(layero, index){
							_this.toolbarFun.editTreeLoad(_this.getRequestParam(node));
							form.render();
							form.on("submit(dtree_editNode_form)",function(data){
								var data = data.field;
								$cite.html(data.editNodeName);
								node = _this.getNodeParam($div);
								var requestNode = _this.getRequestParam(node);
								requestNode = $.extend(requestNode, data);
								_this.temp = [$cite, $div];
								_this.toolbarFun.editTreeNode(requestNode, $div);

								layer.close(index);
							});
						}
					});
					break;
				case defaultTool.delToolbar:
					layer.confirm('纭畾瑕佸垹闄よ'+_this.toolbarStyle.title+'锛�', {icon: 3, title:'鍒犻櫎'+_this.toolbarStyle.title}, function(index){
						var node = _this.getNodeParam($div);
						_this.temp = [$p_li, $p_div];
						_this.toolbarFun.delTreeNode(_this.getRequestParam(node), $div);

						layer.close(index);
					});
					break;
				default:
					var toolbarId = $(this).attr("dtree-tool");
					if(_this.toolbarExt.length > 0){
						for(var i=0; i<_this.toolbarExt.length; i++){
							var ext = _this.toolbarExt[i];
							if (toolbarId == ext.toolbarId){
								ext.handler(_this.getRequestParam(_this.getNodeParam($div), $div));
								break;
							}
						}
					}
					break;
			}
		});
		
		// 缁戝畾menubar鐨勭偣鍑讳簨浠�
		_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).on("click", "button[d-menu]", function(event) {
			event.stopPropagation();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			_this.menubarListener($(this).attr("d-menu"), "group");
		});
		
		// 缁戝畾menubar鐨勭偣鍑讳簨浠�
		_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).on("click", "a[d-menu]", function(event) {
			event.stopPropagation();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			_this.menubarListener($(this).attr("d-menu"), "toolbar");
		});
		
		// 缁戝畾menubar鐨勭偣鍑绘寜閽簨浠�
		_this.obj.closest('body').find("*[dtree-id='"+_this.obj[0].id+"'][dtree-menu]").on("click", function(event) {
			event.stopPropagation();
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			_this.menubarListener($(this).attr("dtree-menu"), "freedom");
		});

		// 缁戝畾cheboxbar鐨勮妭鐐瑰閫夋
		_this.obj.on("click", "i[dtree-click='"+eventName.checkNodeClick+"']", function(event) {
			var $toolBarDiv = _this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id);
			$toolBarDiv.find(".layui-nav-child").removeClass('layui-anim-fadein layui-show');
			var $i = $(this),
				$div = $i.closest("div[dtree-click='"+eventName.itemNodeClick+"']"),
				node = _this.getNodeParam($div);
			// 澶嶉€夋閫変腑鍓嶇殑鍥炶皟
			var flag = _this.checkbarFun.chooseBefore($i, _this.getRequestParam(node));
			_this.temp = [$i];
			if(flag){_this.changeCheck();}
			event.stopPropagation();
		});
	};

	// 缁戝畾body鐨勫崟鍑伙紝璁╂湰椤甸潰鎵€鏈夌殑toolbar闅愯棌
	$BODY.on("click", function(event){
		$("div."+LI_DIV_TOOLBAR).find(".layui-show").removeClass('layui-anim-fadein layui-show');
	});

	// 瑙ｇ粦娴忚鍣ㄤ簨浠�
	DTree.prototype.unbindBrowserEvent = function(){
		var _this = this;

		// 鏈韩浜嬩欢瑙ｇ粦
		_this.obj.unbind();
		// 鑿滃崟鏍忚В缁�
		if(_this.menubar){
			_this.obj.prevAll('div#dtree_menubar_'+_this.obj[0].id).unbind();
			if(_this.obj.closest('body').find("*[dtree-id='"+_this.obj[0].id+"'][dtree-menu]").length > 0){
				_this.obj.closest('body').find("*[dtree-id='"+_this.obj[0].id+"'][dtree-menu]").unbind();
			}
		}

		// 宸ュ叿鏍忚В缁�
		if(_this.toolbar){
			_this.obj.prevAll('div#dtree_toolbar_'+_this.obj[0].id).unbind();
			if(_this.obj.closest(_this.toolbarScroll).length > 0){
				_this.obj.closest(_this.toolbarScroll).unbind();
			}
		}
	};


	/** 澶栭儴璁块棶 **/
	var dtree = {
		render: function(options){	// 鍒濆鍖栨爲
			var dTree = null;
			var id = event.getElemId(options);
			if(id == "") {
				layer.msg("椤甸潰涓湭鎵惧埌缁戝畾id", {icon:5});
			} else {
				dTree = DTrees[id];
				if(typeof dTree === 'object'){
					dTree.reloadSetting(options);
					dTree.initTreePlus();
					dTree.openTreePlus();
					dTree.init();
					dTree.unbindBrowserEvent();
					dTree.bindBrowserEvent();
				} else {
					// 鍒涘缓鏍�
					dTree = new DTree(options);
					// 娣诲姞鍒版爲鏁扮粍涓幓
					DTrees[id] = dTree;
					dTree.initTreePlus();
					dTree.openTreePlus();
					dTree.init();
					dTree.bindBrowserEvent();
				}
			}

			return dTree;
		},
		reload: function(dTree, options){
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
			dTree.reloadSetting(options);
			dTree.initTreePlus();
			dTree.openTreePlus();
			dTree.init();
			dTree.unbindBrowserEvent();
			dTree.bindBrowserEvent();
		},
		on: function(events, callback) {	// 缁戝畾浜嬩欢
			if(events.indexOf("'") > 0){
				events = events.replace(/'/g,"");
			}
			if(events.indexOf('"') > 0) {
				events = events.replace(/"/g,"");
			}
			return layui.onevent.call(this, MOD_NAME, events, callback);
		},
		getNowParam: function(dTree){
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
			return dTree.getNowParam();	// 鑾峰彇褰撳墠閫変腑鍊�
		},
		getParentParam: function(dTree, id){		// 鑾峰彇鍙傛暟鐨勪笂绾ц妭鐐�
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
			return dTree.getParentParam(id);
		},
		getChildParam: function(dTree, id){		// 鑾峰彇鍙傛暟鐨勫叏閮ㄤ笅绾ц妭鐐�
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
			return dTree.getChildParam(id);
		},
		getCheckbarNodesParam: function(dTree){
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return {};
			}
			return dTree.getCheckbarNodesParam();	// 鑾峰彇澶嶉€夋閫変腑鍊�
		},
		dataInit: function(dTree, chooseId){	// 鍒濆鍖栭€変腑鏍戯紝閽堝鏁版嵁杩旈€�
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
			if(chooseId){
				return dTree.dataInit(chooseId);
			}
		},
		chooseDataInit: function(dTree, chooseIds){	// 鍒濆鍖栧閫夋鐨勫€�
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
			if(chooseIds){
				return dTree.chooseDataInit(chooseIds);
			}
		},
		changeCheckbarNodes: function(dTree){	//鍒ゆ柇澶嶉€夋鏄惁鍙戠敓鍙樻洿
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
			return dTree.changeCheckbarNodes();
		},
		refreshTree: function(dTree){ //鍒锋柊鏍戯紝骞跺叿鏈夋暟鎹洖鏄剧殑鍔熻兘锛岃嚜鍔ㄨ瘑鍒閫夋or鍗曢€夛紙鏈畬鎴愶級
			if(typeof dTree === "string"){
				dTree = DTrees[dTree];
			}
			if(typeof dTree === "undefined"){
				layer.msg("鏂规硶鑾峰彇澶辫触锛岃妫€鏌D鎴栧璞′紶閫掓槸鍚︽纭�",{icon:2});
				return ;
			}
		},
		escape: function(html){
			return event.escape(html);
		},
		unescape: function(str){
			return event.unescape(str);
		},
		version: function(){
			return VERSION;
		}
	};

	exports('dtree', dtree);
});