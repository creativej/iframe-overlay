var App = function() {
	if (typeof(_defaultValue()) === "undefined") {
		console.log('please config the iframe first in your options page.');
		return;
	}

	var 
		_this = this,
		defaults = JSON.parse(_defaultValue()),
		containerHeight,
		host = window.location.href;

	var re = new RegExp(defaults.match);
	var matches = host.match(re);

	if (matches === null)
		return;

	$(document.createElement('style'))
		.attr('type', 'text/css')
		.text(defaults.styles)
		.appendTo('body');

	var $container = $(document.createElement('div'))
		.attr('id', defaults.containerId)
		.css('display', 'none')
		.appendTo('body');

	containerHeight = $container.height();

	var $toggleBtn = $(document.createElement('span'))
		.addClass('toggle')
		.appendTo($container);

	var $iframe = $(document.createElement('iframe'))
		.attr('src', _getUrl(defaults.url, matches))
		.appendTo($container);

	this.state = defaults.state || 'close';

	$toggleBtn.on('click', function() {
		_this.toggle();
	});

	function _getUrl(url, match) {
		$.each(match, function(index) {
			url = url.replace("#{"+index+"}", match[index]);
		});

		return url;
	}

	function _defaultValue() {
		return localStorage['iframe.config'];
	}

	function _saveDefaultItem(item, value) {
		defaults[item] = value;

		localStorage['iframe.config'] = JSON.stringify(defaults);
	}

	this.open = function() {
		$toggleBtn.text('close');
		_this.state = "open";
		_saveDefaultItem('state', _this.state);
		$container.css('height', containerHeight + "px");
	};

	this.close = function() {
		$toggleBtn.text('open');
		_this.state = "close";
		_saveDefaultItem('state', _this.state);
		$container.css('height', 0);
	};

	this.toggle = function() {
		if (_this.state === 'open')
			_this.close();
		else
			_this.open();
	};

	this.init = function() {
		$container.fadeIn('fast');

		if (_this.state === 'open')
			_this.open();
		else
			_this.close();
	};
};