
layui.define(['layer', 'carousel'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var carousel = layui.carousel;

    // 娣诲姞姝ラ鏉om鑺傜偣
    var renderDom = function (elem, stepItems, postion) {
        var stepDiv = '<div class="lay-step">';
        for (var i = 0; i < stepItems.length; i++) {
            stepDiv += '<div class="step-item">';
            // 绾�
            if (i < (stepItems.length - 1)) {
                if (i < postion) {
                    stepDiv += '<div class="step-item-tail"><i class="step-item-tail-done"></i></div>';
                } else {
                    stepDiv += '<div class="step-item-tail"><i class=""></i></div>';
                }
            }

            // 鏁板瓧
            var number = stepItems[i].number;
            if (!number) {
                number = i + 1;
            }
            if (i == postion) {
                stepDiv += '<div class="step-item-head step-item-head-active"><i class="layui-icon">' + number + '</i></div>';
            } else if (i < postion) {
                stepDiv += '<div class="step-item-head"><i class="layui-icon layui-icon-ok"></i></div>';
            } else {
                stepDiv += '<div class="step-item-head "><i class="layui-icon">' + number + '</i></div>';
            }

            // 鏍囬鍜屾弿杩�
            var title = stepItems[i].title;
            var desc = stepItems[i].desc;
            if (title || desc) {
                stepDiv += '<div class="step-item-main">';
                if (title) {
                    stepDiv += '<div class="step-item-main-title">' + title + '</div>';
                }
                if (desc) {
                    stepDiv += '<div class="step-item-main-desc">' + desc + '</div>';
                }
                stepDiv += '</div>';
            }
            stepDiv += '</div>';
        }
        stepDiv += '</div>';

        $(elem).prepend(stepDiv);

        // 璁＄畻姣忎竴涓潯鐩殑瀹藉害
        var bfb = 100 / stepItems.length;
        $('.step-item').css('width', bfb + '%');
    };

    var step = {
        // 娓叉煋姝ラ鏉�
        render: function (param) {
            param.indicator = 'none';  // 涓嶆樉绀烘寚绀哄櫒
            param.arrow = 'always';  // 濮嬬粓鏄剧ず绠ご
            param.autoplay = false;  // 鍏抽棴鑷姩鎾斁
            if (!param.stepWidth) {
                param.stepWidth = '400px';
            }

            // 娓叉煋杞挱鍥�
            carousel.render(param);

            // 娓叉煋姝ラ鏉�
            var stepItems = param.stepItems;
            renderDom(param.elem, stepItems, 0);
            $('.lay-step').css('width', param.stepWidth);

            //鐩戝惉杞挱鍒囨崲浜嬩欢
            carousel.on('change(' + param.filter + ')', function (obj) {
                $(param.elem).find('.lay-step').remove();
                renderDom(param.elem, stepItems, obj.index);
                $('.lay-step').css('width', param.stepWidth);
            });

            // 闅愯棌宸﹀彸绠ご鎸夐挳
            $(param.elem).find('.layui-carousel-arrow').css('display', 'none');

            // 鍘绘帀杞挱鍥剧殑鑳屾櫙棰滆壊
            $(param.elem).css('background-color', 'transparent');
        },
        // 涓嬩竴姝�
        next: function (elem) {
            $(elem).find('.layui-carousel-arrow[lay-type=add]').trigger('click');
        },
        // 涓婁竴姝�
        pre: function (elem) {
            $(elem).find('.layui-carousel-arrow[lay-type=sub]').trigger('click');
        }
    };

    layui.link(layui.cache.base + 'step-lay/step.css');
    exports('step', step);
});
