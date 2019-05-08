
layui.define(['jquery'], function (exports) {
    var $ = layui.$;
    'use strict';
    if (typeof ChineseDistricts === 'undefined') {
        throw new Error('The file "city-picker.data.js" must be included first!');
    }
    var NAMESPACE = 'citypicker';
    var EVENT_CHANGE = 'change.' + NAMESPACE;

    // 鍩庡競閫夋嫨绫�
    var CityPicker = function (element, options) {
        this.PROVINCE = 'provinceId';
        this.CITY = 'cityId';
        this.DISTRICT = 'districtId';

        this.$element = $(element);
        this.$dropdown = null;
        this.options = $.extend({}, CityPicker.DEFAULTS, $.isPlainObject(options) && options);
        this.active = false;
        this.dems = [];
        this.needBlur = false;
        this.init();
    };

    CityPicker.prototype = {
        constructor: CityPicker,
        init: function () {
            this.defineDems();
            this.render();
            this.bind();
            this.active = true;
            var _this = this;
            $(".icon_ca").on('click', function () {
                $("#" + this.PROVINCE).val();
                $("#" + this.CITY).val();
                $("#" + this.DISTRICT).val();
                _this.reset();
            });
        },

        render: function () {
            var p = this.getPosition(),
                placeholder = this.$element.attr('placeholder') || this.options.placeholder,
                textspan = '<span class="city-picker-span" style="' +
                    this.getWidthStyle(p.width) + 'height:' +
                    (p.height - 2) + 'px;line-height:' + (p.height - 1) + 'px;">' +
                    (placeholder ? '<span class="placeholder">' + placeholder + '</span>' : '') +
                    '<span class="title"></span><div class="arrow"></div>' + '<i class="icon_ca"></i></span>',

                dropdown = '<div class="city-picker-dropdown" style="left:0px;top:100%;' +
                    this.getWidthStyle(p.width, true) + '">' +
                    '<div class="city-select-wrap">' +
                    '<div class="city-select-tab">' +
                    '<a class="active" data-count="' + this.PROVINCE + '">鐪佷唤</a>' +
                    (this.includeDem(this.CITY) ? '<a data-count="' + this.CITY + '">鍩庡競</a>' : '') +
                    (this.includeDem(this.DISTRICT) ? '<a data-count="' + this.DISTRICT + '">鍖哄幙</a>' : '') + '</div>' +
                    '<div class="city-select-content">' +
                    '<div class="city-select province ' + this.PROVINCE + '" data-count="' + this.PROVINCE + '"></div>' +
                    (this.includeDem(this.CITY) ? '<div class="city-select ' + this.CITY + '" data-count="' + this.CITY + '"></div>' : '') +
                    (this.includeDem(this.DISTRICT) ? '<div class="city-select ' + this.DISTRICT + '" data-count="' + this.DISTRICT + '"></div>' : '') +
                    '</div></div>';

            this.$element.addClass('city-picker-input');
            this.$textspan = $(textspan).insertAfter(this.$element);
            this.$dropdown = $(dropdown).insertAfter(this.$textspan);
            var $select = this.$dropdown.find('.city-select');

            // setup this.$province, this.$city and/or this.$district object
            $.each(this.dems, $.proxy(function (i, type) {
                this['$' + type] = $select.filter('.' + type + '');
            }, this));

            this.refresh();
        },

        refresh: function (force) {
            // clean the data-item for each $select
            var $select = this.$dropdown.find('.city-select');
            $select.data('item', null);
            // parse value from value of the target $element
            var val = this.$element.val() || '';
            val = val.split('/');
            $.each(this.dems, $.proxy(function (i, type) {
                if (val[i] && i < val.length) {
                    this.options[type] = val[i];
                } else if (force) {
                    this.options[type] = '';
                }
                this.output(type);
            }, this));
            this.tab(this.PROVINCE);
            this.feedText();
            this.feedVal();
        },

        defineDems: function () {
            var stop = false;
            if (this.options.provincename !== "") {
                this.PROVINCE = this.options.provincename;
            }
            if (this.options.cityname !== "") {
                this.CITY = this.options.cityname;
            }
            if (this.options.districtname !== "") {
                this.DISTRICT = this.options.districtname;
            }

            $.each([this.PROVINCE, this.CITY, this.DISTRICT], $.proxy(function (i, type) {
                if (!stop) {
                    this.dems.push(type);
                }
                if (type === this.options.level) {
                    stop = true;
                }
            }, this));
        },

        includeDem: function (type) {
            return $.inArray(type, this.dems) !== -1;
        },

        getPosition: function () {
            var p, h, w, s, pw;
            p = this.$element.position();
            s = this.getSize(this.$element);
            h = s.height;
            w = s.width;
            if (this.options.responsive) {
                pw = this.$element.offsetParent().width();
                if (pw) {
                    w = w / pw;
                    if (w > 0.99) {
                        w = 1;
                    }
                    w = w * 100 + '%';
                }
            }

            return {
                top: p.top || 0,
                left: p.left || 0,
                height: h,
                width: w
            };
        },

        getSize: function ($dom) {
            var $wrap, $clone, sizes;
            if (!$dom.is(':visible')) {
                $wrap = $("<div />").appendTo($("body"));
                $wrap.css({
                    "position": "absolute !important",
                    "visibility": "hidden !important",
                    "display": "block !important"
                });

                $clone = $dom.clone().appendTo($wrap);

                sizes = {
                    width: $clone.outerWidth(),
                    height: $clone.outerHeight()
                };

                $wrap.remove();
            } else {
                sizes = {
                    width: $dom.outerWidth(),
                    height: $dom.outerHeight()
                };
            }

            return sizes;
        },

        getWidthStyle: function (w, dropdown) {
            if (this.options.responsive && !$.isNumeric(w)) {
                return 'width:' + w + ';';
            } else {
                return 'width:' + (dropdown ? Math.max(320, w) : w) + 'px;';
            }
        },

        bind: function () {
            var $this = this;
            $(document).on('click', (this._mouteclick = function (e) {
                var $target = $(e.target);
                var $dropdown, $span, $input;
                if ($target.is('.city-picker-span')) {
                    $span = $target;
                } else if ($target.is('.city-picker-span *')) {
                    $span = $target.parents('.city-picker-span');
                }
                if ($target.is('.city-picker-input')) {
                    $input = $target;
                }
                if ($target.is('.city-picker-dropdown')) {
                    $dropdown = $target;
                } else if ($target.is('.city-picker-dropdown *')) {
                    $dropdown = $target.parents('.city-picker-dropdown');
                }
                if ((!$input && !$span && !$dropdown) ||
                    ($span && $span.get(0) !== $this.$textspan.get(0)) ||
                    ($input && $input.get(0) !== $this.$element.get(0)) ||
                    ($dropdown && $dropdown.get(0) !== $this.$dropdown.get(0))) {
                    $this.close(true);
                }

            }));

            this.$element.on('change', (this._changeElement = $.proxy(function () {
                this.close(true);
                this.refresh(true);
            }, this))).on('focus', (this._focusElement = $.proxy(function () {
                this.needBlur = true;
                this.open();
            }, this))).on('blur', (this._blurElement = $.proxy(function () {
                if (this.needBlur) {
                    this.needBlur = false;
                    this.close(true);
                }
            }, this)));

            this.$textspan.on('click', function (e) {
                var $target = $(e.target), type;
                $this.needBlur = false;
                if ($target.is('.select-item')) {
                    type = $target.data('count');
                    $this.open(type);
                } else {
                    if ($this.$dropdown.is(':visible')) {
                        $this.close();
                    } else {
                        $this.open();
                    }
                }
            }).on('mousedown', function () {
                $this.needBlur = false;
            });

            this.$dropdown.on('click', '.city-select a', function () {
                var $select = $(this).parents('.city-select');
                var $active = $select.find('a.active');
                var last = $select.next().length === 0;
                $active.removeClass('active');
                $(this).addClass('active');
                if ($active.data('code') !== $(this).data('code')) {
                    $select.data('item', {
                        address: $(this).attr('title'), code: $(this).data('code')
                    });
                    $(this).trigger(EVENT_CHANGE);
                    $this.feedText();
                    $this.feedVal();
                    if (last) {
                        $this.close();
                    }
                }
            }).on('click', '.city-select-tab a', function () {
                if (!$(this).hasClass('active')) {
                    var type = $(this).data('count');
                    $this.tab(type);
                }
            }).on('mousedown', function () {
                $this.needBlur = false;
            });
            if (this['$' + this.PROVINCE]) {
                this['$' + this.PROVINCE].on(EVENT_CHANGE, (this._changeProvince = $.proxy(function () {
                    this.output(this.CITY);
                    this.output(this.DISTRICT);
                    this.tab(this.CITY);
                }, this)));
            }

            if (this['$' + this.CITY]) {
                this['$' + this.CITY].on(EVENT_CHANGE, (this._changeCity = $.proxy(function () {
                    this.output(this.DISTRICT);
                    this.tab(this.DISTRICT);
                }, this)));
            }
        },

        open: function (type) {
            type = type || this.PROVINCE;
            this.$dropdown.show();
            this.$textspan.addClass('open').addClass('focus');
            this.tab(type);
        },

        close: function (blur) {
            this.$dropdown.hide();
            this.$textspan.removeClass('open');
            if (blur) {
                this.$textspan.removeClass('focus');
            }
        },

        unbind: function () {

            $(document).off('click', this._mouteclick);

            this.$element.off('change', this._changeElement);
            this.$element.off('focus', this._focusElement);
            this.$element.off('blur', this._blurElement);

            this.$textspan.off('click');
            this.$textspan.off('mousedown');

            this.$dropdown.off('click');
            this.$dropdown.off('mousedown');

            if (this['$' + this.PROVINCE]) {
                this['$' + this.PROVINCE].off(EVENT_CHANGE, this._changeProvince);
            }

            if (this.$city) {
                this.$city.off(EVENT_CHANGE, this._changeCity);
            }
        },
        // 鍔ㄦ€佹坊鍔犵殑input鏃犳硶鍒犻櫎锛屽垏鎹㈣姹傛湁闂
        getText: function () {
            var text = '';
            this.$dropdown.find('.city-select')
                .each(function () {
                    var item = $(this).data('item'),
                        type = $(this).data('count');
                    if (item) {
                        text += ($(this).hasClass('province') ? '' : '/') + '<span class="select-item" data-count="' +
                            type + '" data-code="' + item.code + '">' + item.address + '</span><input type="hidden" id="' + type + '" name="' + type + '" value="' + item.code + '"  />';
                    }
                });
            return text;
        },

        getPlaceHolder: function () {
            return this.$element.attr('placeholder') || this.options.placeholder;
        },

        feedText: function () {
            var text = this.getText();
            if (text) {
                this.$textspan.find('>.placeholder').hide();
                // this.$textspan.find('>.title').siblings('input').val('');
                //this.$textspan.find('>.title').children().remove();
                this.$textspan.find('>.title').children("input").val('');
                this.$textspan.find('>.title').html(this.getText()).show();
            } else {

                this.$textspan.find('>.placeholder').text(this.getPlaceHolder()).show();
                this.$textspan.find('>.title').html('').hide();
            }
        },

        getVal: function () {
            var text = '';
            this.$dropdown.find('.city-select')
                .each(function () {
                    var item = $(this).data('item');
                    if (item) {
                        text += ($(this).hasClass('province') ? '' : '/') + item.address;
                    }
                });
            return text;
        },

        feedVal: function () {
            this.$element.val(this.getVal());
        },

        output: function (type) {
            var options = this.options;
            var PROVINCE = this.PROVINCE;
            var CITY = this.CITY;
            var DISTRICT = this.DISTRICT;

            //var placeholders = this.placeholders;
            var $select = this['$' + type];
            var data = type === PROVINCE ? {} : [];
            var item;
            var districts;
            var code;
            var matched = null;
            var value;

            if (!$select || !$select.length) {
                return;
            }

            item = $select.data('item');

            value = (item ? item.address : null) || options[type];

            code = (
                type === PROVINCE ? 86 :
                    type === CITY ? this['$' + PROVINCE] && this['$' + PROVINCE].find('.active').data('code') :
                        type === DISTRICT ? this['$' + CITY] && this['$' + CITY].find('.active').data('code') : code
            );

            districts = $.isNumeric(code) ? ChineseDistricts[code] : null;

            if ($.isPlainObject(districts)) {
                $.each(districts, function (code, address) {
                    var provs;
                    if (type === PROVINCE) {
                        provs = [];
                        for (var i = 0; i < address.length; i++) {
                            if (address[i].address === value) {
                                matched = {
                                    code: address[i].code,
                                    address: address[i].address
                                };
                            }
                            provs.push({
                                code: address[i].code,
                                address: address[i].address,
                                selected: address[i].address === value
                            });
                        }
                        data[code] = provs;
                    } else {
                        if (address === value) {
                            matched = {
                                code: code,
                                address: address
                            };
                        }
                        data.push({
                            code: code,
                            address: address,
                            selected: address === value
                        });
                    }
                });
            }
            $select.html(type === PROVINCE ? this.getProvinceList(data) :
                this.getList(data, type));
            $select.data('item', matched);
        },

        getProvinceList: function (data) {
            var PROVINCE = this.PROVINCE;
            var list = [],
                $this = this,
                simple = this.options.simple;

            $.each(data, function (i, n) {
                list.push('<dl class="clearfix">');
                list.push('<dt>' + i + '</dt><dd>');
                $.each(n, function (j, m) {
                    list.push(
                        '<a' +
                        ' title="' + (m.address || '') + '"' +
                        ' data-code="' + (m.code || '') + '"' +
                        ' class="' +
                        (m.selected ? ' active' : '') +
                        '">' +
                        (simple ? $this.simplize(m.address, PROVINCE) : m.address) +
                        '</a>');
                });
                list.push('</dd></dl>');
            });

            return list.join('');
        },

        getList: function (data, type) {
            var list = [],
                $this = this,
                simple = this.options.simple;
            list.push('<dl class="clearfix"><dd>');

            $.each(data, function (i, n) {
                list.push(
                    '<a' +
                    ' title="' + (n.address || '') + '"' +
                    ' data-code="' + (n.code || '') + '"' +
                    ' class="' +
                    (n.selected ? ' active' : '') +
                    '">' +
                    (simple ? $this.simplize(n.address, type) : n.address) +
                    '</a>');
            });
            list.push('</dd></dl>');

            return list.join('');
        },

        simplize: function (address, type) {
            address = address || '';
            if (type === this.PROVINCE) {
                return address.replace("/[鐪�,甯�,鑷不鍖�,澹棌,鍥炴棌,缁村惥灏擼/g", '');
            } else if (type === this.CITY) {
                return address.replace(/[甯�,鍦板尯,鍥炴棌,钂欏彜,鑻楁棌,鐧芥棌,鍌ｆ棌,鏅鏃�,钘忔棌,褰濇棌,澹棌,鍌堝兂鏃�,甯冧緷鏃�,渚楁棌]/g, '')
                    .replace('鍝堣惃鍏�', '').replace('鑷不宸�', '').replace(/鑷不鍘�/, '');
            } else if (type === this.DISTRICT) {
                return address.length > 2 ? address.replace('/[甯�,鍖�,鍘�,鏃梋/g', '') : address;
            }
        },

        tab: function (type) {
            var $selects = this.$dropdown.find('.city-select');
            var $tabs = this.$dropdown.find('.city-select-tab > a');
            var $select = this['$' + type];
            var $tab = this.$dropdown.find('.city-select-tab > a[data-count="' + type + '"]');
            if ($select) {
                $selects.hide();
                $select.show();
                $tabs.removeClass('active');
                $tab.addClass('active');
            }
        },

        reset: function () {
            this.$element.val(null).trigger('change');
        },

        setValue: function (address) {  //娌冲崡鐪�/淇￠槼甯�/鏂板幙
            this.$element.val(address).trigger('change');
        }, 

        destroy: function () {
            this.unbind();
            this.$element.removeData(NAMESPACE).removeClass('city-picker-input');
            this.$textspan.remove();
            this.$dropdown.remove();
        }
    };

    // 榛樿鍊煎拰鍙傛暟
    CityPicker.DEFAULTS = {
        simple: false,
        responsive: false,
        placeholder: '璇烽€夋嫨鐪�/甯�/鍖�',
        level: 'district',// 绾у埆
        provincename: '',//input hidden 鐨勫€�
        cityname: '',//input hidden 鐨勫€�
        districtname: '',//input hidden 鐨勫€�
        province: '娌冲崡鐪�',// 榛樿鐪佷唤鍚嶇О
        city: '',// 榛樿鍦板競鍚嶇О
        district: ''// 榛樿鍖哄幙鍚嶇О
    };

    CityPicker.setDefaults = function (options) {
        $.extend(CityPicker.DEFAULTS, options);
    };

    // Save the other citypicker
    CityPicker.other = $.fn.citypicker;

    // Register as jQuery plugin
    $.fn.citypicker = function (option) {
        var args = [].slice.call(arguments, 1);
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(NAMESPACE);
            var options;
            var fn;
            if (!data) {
                if (/destroy/.test(option)) {
                    return;
                }
                options = $.extend({}, $this.data(), $.isPlainObject(option) && option);
                $this.data(NAMESPACE, (data = new CityPicker(this, options)));
            }
            if (typeof option === 'string' && $.isFunction(fn = data[option])) {
                fn.apply(data, args);
            }
        });
    };

    $.fn.citypicker.Constructor = CityPicker;
    $.fn.citypicker.setDefaults = CityPicker.setDefaults;

    // No conflict
    $.fn.citypicker.noConflict = function () {
        $.fn.citypicker = CityPicker.other;
        return this;
    };

   // 鑷姩鎵弿鏈哄埗娉ㄩ噴鎺�
    //$(function () {
    //    $('[data-toggle="city-picker"]').citypicker();
    //});


    exports('citypicker', CityPicker);
});