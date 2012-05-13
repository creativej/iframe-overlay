(function() {
	function _defaultValue() {
		return localStorage['iframeconfig'];
	}

	function _getUrl(url, match) {
		$.each(match, function(index) {
			url = url.replace("#{"+index+"}", match[index]);
		});
		return url;
	}

	$(window).load(function() {
		if (typeof(_defaultValue()) === "undefined") {
			console.log('please config the iframe first in your options page.');
			return false;
		}

		chrome.tabs.getSelected(null, function(tab) {
			var config = JSON.parse(_defaultValue());

			var matches = tab.url.match(new RegExp(config.match));

			if (matches === null)
				return false;

			$("#iframe").attr('src', _getUrl(config.url, matches));
			
			$('body')
				.css('width', config.width)
				.css('height', config.height);
		});
	})
}());