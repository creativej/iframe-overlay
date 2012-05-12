var App = function() {
	var 
		_this = this,
		defaults,
		$container,
		$toggleBtn,
		$iframe,
		matches,
		host = window.location.href;

	function _setup() {
		if (typeof(_defaultValue()) === "undefined") {
			console.log('please config the iframe first in your options page.');
			return false;
		}
		
		defaults = JSON.parse(_defaultValue());
		_this.state = defaults.state || 'close';

		matches = host.match(new RegExp(defaults.match));

		if (matches === null)
			return false;

		_buildDoms();

		$toggleBtn.on('click', function() {
			_this.toggle();
		});

		return true;
	}

	function _buildDoms() {
		$(document.createElement('style'))
			.attr('type', 'text/css')
			.text(defaults.styles)
			.appendTo('body');

		$container = $(document.createElement('div'))
			.attr('id', defaults.containerId)
			.css('display', 'none')
			.appendTo('body')
			.fadeIn('slow');

		$toggleBtn = $(document.createElement('span'))
			.addClass('toggle')
			.appendTo($container);


		$iframe = $(document.createElement('iframe'))
			.attr('src', _getUrl(defaults.url, matches))
			.appendTo($container);
	}

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
		$container.css('height', $container.height() + "px");
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
		if (_setup()) {
			if (_this.state === 'open')
				_this.open();
			else
				_this.close();
		}
	};
};