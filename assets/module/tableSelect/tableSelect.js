
layui.define(['table', 'jquery', 'form'], function (exports) {
    "use strict";

    var MOD_NAME = 'tableSelect',
        $ = layui.jquery,
        table = layui.table,
        form = layui.form;
    var tableSelect = function () {
        this.v = '1.1.0';
    };

    /**
    * 鍒濆鍖栬〃鏍奸€夋嫨鍣�
    */
    tableSelect.prototype.render = function (opt) {
        var elem = $(opt.elem);
        var tableDone = opt.table.done || function(){};
		
        //榛樿璁剧疆
        opt.searchKey = opt.searchKey || 'keyword';
        opt.searchPlaceholder = opt.searchPlaceholder || '鍏抽敭璇嶆悳绱�';
        opt.checkedKey = opt.checkedKey;
        opt.table.page = opt.table.page || true;
        opt.table.height = opt.table.height || 315;
        
        elem.off('click').on('click', function(e) {
            e.stopPropagation();

            if($('div.tableSelect').length >= 1){
                return false;
            }

            var t = elem.offset().top + elem.outerHeight()+"px";
            var l = elem.offset().left +"px";
            var tableName = "tableSelect_table_" + new Date().getTime();
            var tableBox = '<div class="tableSelect layui-anim layui-anim-upbit" style="left:'+l+';top:'+t+';border: 1px solid #d2d2d2;background-color: #fff;box-shadow: 0 2px 4px rgba(0,0,0,.12);padding:10px 10px 0 10px;position: absolute;z-index:66666666;margin: 5px 0;border-radius: 2px;min-width:530px;">';
                tableBox += '<div class="tableSelectBar">';
                tableBox += '<form class="layui-form" action="" style="display:inline-block;">';
                tableBox += '<input style="display:inline-block;width:190px;height:30px;vertical-align:middle;margin-right:-1px;border: 1px solid #C9C9C9;" type="text" name="'+opt.searchKey+'" placeholder="'+opt.searchPlaceholder+'" autocomplete="off" class="layui-input"><button class="layui-btn layui-btn-sm layui-btn-primary tableSelect_btn_search" lay-submit lay-filter="tableSelect_btn_search"><i class="layui-icon layui-icon-search"></i></button>';
                tableBox += '</form>';
                tableBox += '<button style="float:right;" class="layui-btn layui-btn-sm tableSelect_btn_select">閫夋嫨<span></span></button>';
                tableBox += '</div>';
                tableBox += '<table id="'+tableName+'" lay-filter="'+tableName+'"></table>';
                tableBox += '</div>';
                tableBox = $(tableBox);
            $('body').append(tableBox);
            
            //鏁版嵁缂撳瓨
            var checkedData = [];

            //娓叉煋TABLE
            opt.table.elem = "#"+tableName;
            opt.table.id = tableName;
            opt.table.done = function(res, curr, count){
                defaultChecked(res, curr, count);
                setChecked(res, curr, count);
                tableDone(res, curr, count);
            };
            var tableSelect_table = table.render(opt.table);

            //鍒嗛〉閫変腑淇濆瓨鏁扮粍
            table.on('radio('+tableName+')', function(obj){
                if(opt.checkedKey){
                    checkedData = table.checkStatus(tableName).data
                }
                updataButton(table.checkStatus(tableName).data.length)
            })
			table.on('checkbox('+tableName+')', function(obj){
                if(opt.checkedKey){
                    if(obj.checked){
                        for (var i=0;i<table.checkStatus(tableName).data.length;i++){
                            checkedData.push(table.checkStatus(tableName).data[i])
                        }
                    }else{
                        if(obj.type=='all'){
                            for (var j=0;j<table.cache[tableName].length;j++) {
                                for (var i=0;i<checkedData.length;i++){
                                    if(checkedData[i][opt.checkedKey] == table.cache[tableName][j][opt.checkedKey]){
                                        checkedData.splice(i,1)
                                    }
                                }
                            }
                        }else{
                            //鍥犱负LAYUI闂锛屾搷浣滃埌鍙樺寲鍏ㄩ€夌姸鎬佹椂鑾峰彇鍒扮殑obj涓虹┖锛岃繖閲岀敤鍑芥暟鑾峰彇鏈€変腑鐨勯」銆�
                            function nu (){
                                var noCheckedKey = '';
                                for (var i=0;i<table.cache[tableName].length;i++){
                                    if(!table.cache[tableName][i].LAY_CHECKED){
                                        noCheckedKey = table.cache[tableName][i][opt.checkedKey];
                                    }
                                }
                                return noCheckedKey
                            }
                            var noCheckedKey = obj.data[opt.checkedKey] || nu();
                            for (var i=0;i<checkedData.length;i++){
                                if(checkedData[i][opt.checkedKey] == noCheckedKey){
                                    checkedData.splice(i,1);
                                }
                            }
                        }
                    }
                    checkedData = uniqueObjArray(checkedData, opt.checkedKey);
                    updataButton(checkedData.length)
                }else{
                    updataButton(table.checkStatus(tableName).data.length)
                }
            });

            //娓叉煋琛ㄦ牸鍚庨€変腑
            function setChecked (res, curr, count) {
				for(var i=0;i<res.data.length;i++){
            		for (var j=0;j<checkedData.length;j++) {
            			if(res.data[i][opt.checkedKey] == checkedData[j][opt.checkedKey]){
            				res.data[i].LAY_CHECKED = true;
                            var index= res.data[i]['LAY_TABLE_INDEX'];
                            var checkbox = $('#'+tableName+'').next().find('tr[data-index=' + index + '] input[type="checkbox"]');
            				    checkbox.prop('checked', true).next().addClass('layui-form-checked');
                            var radio  = $('#'+tableName+'').next().find('tr[data-index=' + index + '] input[type="radio"]');
                                radio.prop('checked', true).next().addClass('layui-form-radioed').find("i").html('&#xe643;');
            			}
            		}
            	}
            	var checkStatus = table.checkStatus(tableName);
				if(checkStatus.isAll){
					$('#'+tableName+'').next().find('.layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', true);
					$('#'+tableName+'').next().find('.layui-table-header th[data-field="0"] input[type="checkbox"]').next().addClass('layui-form-checked');
				}
				updataButton(checkedData.length)
            }
            
            //鍐欏叆榛樿閫変腑鍊�(puash checkedData)
            function defaultChecked (res, curr, count){
                if(opt.checkedKey && elem.attr('ts-selected')){
                    var selected = elem.attr('ts-selected').split(",");
                    for(var i=0;i<res.data.length;i++){
                        for(var j=0;j<selected.length;j++){
                            if(res.data[i][opt.checkedKey] == selected[j]){
                                checkedData.push(res.data[i])
                            }
                        }
                    }
                    checkedData = uniqueObjArray(checkedData, opt.checkedKey);
                }
            }

			//鏇存柊閫変腑鏁伴噺
			function updataButton (n) {
				tableBox.find('.tableSelect_btn_select span').html(n==0?'':'('+n+')')
            }
            
            //鏁扮粍鍘婚噸
			function uniqueObjArray(arr, type){
                var newArr = [];
                var tArr = [];
                if(arr.length == 0){
                    return arr;
                }else{
                    if(type){
                        for(var i=0;i<arr.length;i++){
                            if(!tArr[arr[i][type]]){
                                newArr.push(arr[i]);
                                tArr[arr[i][type]] = true;
                            }
                        }
                        return newArr;
                    }else{
                        for(var i=0;i<arr.length;i++){
                            if(!tArr[arr[i]]){
                                newArr.push(arr[i]);
                                tArr[arr[i]] = true;
                            }
                        }
                        return newArr;
                    }
                }
            }

			//FIX浣嶇疆
			var overHeight = (elem.offset().top + elem.outerHeight() + tableBox.outerHeight() - $(window).scrollTop()) > $(window).height();
			var overWidth = (elem.offset().left + tableBox.outerWidth()) > $(window).width();
			    overHeight && tableBox.css({'top':'auto','bottom':'0px'});
			    overWidth && tableBox.css({'left':'auto','right':'5px'})
			
            //鍏抽敭璇嶆悳绱�
            form.on('submit(tableSelect_btn_search)', function(data){
                tableSelect_table.reload({
                    where: data.field,
                    page: {
                      curr: 1
                    }
                  });
                return false;
            });

            //鍙屽嚮琛岄€変腑
            table.on('rowDouble('+tableName+')', function(obj){
                var checkStatus = {data:[obj.data]};
                selectDone(checkStatus);
            })

            //鎸夐挳閫変腑
            tableBox.find('.tableSelect_btn_select').on('click', function() {
                var checkStatus = table.checkStatus(tableName);
                if(checkedData.length > 1){
                	checkStatus.data = checkedData;
                }
                selectDone(checkStatus);
            })

            //鍐欏€煎洖璋冨拰鍏抽棴
            function selectDone (checkStatus){
                if(opt.checkedKey){
                    var selected = [];
                    for(var i=0;i<checkStatus.data.length;i++){
                        selected.push(checkStatus.data[i][opt.checkedKey])
                    }
                    elem.attr("ts-selected",selected.join(","));
                }
                opt.done(elem, checkStatus);
                tableBox.remove();
                delete table.cache[tableName];
                checkedData = [];
            }
            
            //鐐瑰嚮鍏朵粬鍖哄煙鍏抽棴
            $(document).mouseup(function(e){
                var userSet_con = $(''+opt.elem+',.tableSelect');
                if(!userSet_con.is(e.target) && userSet_con.has(e.target).length === 0){
                    tableBox.remove();
                    delete table.cache[tableName];
                    checkedData = [];
                }
            });
        })
    }

    /**
    * 闅愯棌閫夋嫨鍣�
    */
    tableSelect.prototype.hide = function (opt) {
        $('.tableSelect').remove();
    }

    //鑷姩瀹屾垚娓叉煋
    var tableSelect = new tableSelect();

    //FIX 婊氬姩鏃堕敊浣�
    if(window.top == window.self){
        $(window).scroll(function () {
            tableSelect.hide();
        });
    }

    exports(MOD_NAME, tableSelect);
})