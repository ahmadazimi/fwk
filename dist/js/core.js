window['w3g'] = (function($, undefined) {
	"use strict";

	var _inited = false,
		_queue = [],
		_win = $(window),
		_scrollbarWidth;

	function _getScrollbarWidth() {
		var $inner = $('<div style="width: 100%; height:100px;">test</div>'),
			$outer = $('<div style="width:200px;height:50px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
			inner = $inner[0],
			outer = $outer[0],
			width1 = null,
			width2 = null;

		$('body').append(outer);
		width1 = parseInt(inner.offsetWidth);
		$outer.css('overflow', 'scroll');
		width2 = parseInt(outer.clientWidth);
		$outer.remove();

		return (width1 - width2);
	}

	return {
		'config': null,

		'doc': $(document.body),

		'queue': function(callback) {
			(_inited && callback.call(w3g, $)) || _queue.push(callback);
		},

		'resize': function(callback, precallback) {
			window.setTimeout(function() {
				precallback && precallback();
				callback.call(w3g, w3g.sizes());
			}, 100);

			_win.resize(function() {
				precallback && precallback();
				callback.call(w3g, w3g.sizes());
			});
		},

		'sizes': function() {
			var sizes = {
				body: {
					width: w3g.doc.width(),
					height: w3g.doc.height()
				},
				window: {
					width: _win.width(),
					height: _win.height()
				}
			};

			//TODO: add scroll sizes.

			return sizes;
		},

		'init': $(function() {
			var i, len, callback;

			_inited = true;
			_scrollbarWidth = _getScrollbarWidth();

			w3g.config = $('html').data('config') || {};

			for (i = 0, len = _queue.length; i < len; ++i) {
				(callback = _queue.shift()) && callback.call(w3g, $);
			}
		}),

		'typeof': (function tmp(global) {
			return function(obj) {
				if (obj === global) {
					return 'global';
				}

				return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
			}
		})(this)
	};

}).call(this, this['jQuery']);


window['w3g'].queue(function($) {
	var classes = ['lg', 'md', 'sm', 'xs'],
		elements = [];

	$.each(classes, function(index, id) {
		elements[index] = $('<div />').attr('id', 'w3g_' + id).appendTo(w3g.doc);
	});

	this.resize(function(size) {
		var i;

		for(i = 0; i < 4; ++i) {
			w3g.doc.removeClass('w3g_' + classes[i]);
		}

		for(i = 0; i < 4; ++i) {
			if(elements[i].css('display') === 'block') {
				w3g.doc.addClass('w3g_' + classes[i]);
				break;
			}
		}
	});

});


function log() {
	console && console.log && console.log.apply && console.log.apply(console, arguments);
}

function ShamsiShowDate() {
	week = new Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه");
	months = new Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند");
	a = new Date();
	d = a.getDay();
	day = a.getDate();
	month = a.getMonth() + 1;
	year = a.getYear();
	year = (year == 0) ? 2000 : year;
	(year < 1000) ? (year += 1900) : true;
	year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
	switch (month) {
		case 1:
			(day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
			break;
		case 2:
			(day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
			break;
		case 3:
			(day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20);
			break;
		case 4:
			(day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
			break;
		case 5:
		case 6:
			(day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
			break;
		case 7:
		case 8:
		case 9:
			(day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
			break;
		case 10:
			(day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
			break;
		case 11:
		case 12:
			(day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
			break;
		default:
			break;
	}
	return (" " + week[d] + " " + day + " " + months[month - 1] + " " + year);
}

String.prototype.toFaDigit = function() {
	return this.replace(/\d+/g, function(digit) {
		var ret = '';
		for (var i = 0, len = digit.length; i < len; i++) {
			ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
		}

		return ret;
	});
};