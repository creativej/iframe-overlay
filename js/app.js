var Insider = function(defaults) {
	defaults = defaults || {};

	defaults = $.extend({
		url: '',
		styles: '',
		id: 'insider-iframe'
	}, defaults);

	$('body').append('<link rel="stylesheet" type="text/css" href="'+defaults.styles+'"/>');

	$("body").append(
		"<iframe id='"+defaults.id+"' src='"+defaults.url+"'></iframe>"
	);
};