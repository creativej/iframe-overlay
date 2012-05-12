var options = {
	$url: null,
	$styles: null,
	$containerId: null,
	$match: null,

	init: function() {
		var _this = this;
		this.$containerId = $(".containerId");
		this.$match = $(".match");
		this.$url = $(".url");
		this.$styles = $(".styles");

		this.save('iframe.defaults');

		if (this.hasLocalValue())
			this.save();
		else
			this.restore('iframe.config');

		$('.save').on('click', function() { _this.save() });
		$('.reset').on('click', function() { _this.restore('iframe.config') });
		$('.restore').on('click', function() { _this.restore() });
	},

	save: function(type) {
		type = type || 'iframe.config';

		// console.log('save');
		localStorage[type] = JSON.stringify({
			containerId: this.$containerId.val(),
			match: this.$match.val(),
			url: this.$url.val(),
			styles: this.$styles.text()
		});
	},

	localValue: function() {
		return localStorage['iframe.config'];
	},

	restore: function(type) {
		type = type || 'iframe.defaults';

		// console.log('restore');
		var defaults = JSON.parse(localStorage[type]);
		this.$containerId.val(defaults.containerId);
		this.$match.val(defaults.match);
		this.$url.val(defaults.url);
		this.$styles.text(defaults.styles);
	},

	hasLocalValue: function() {
		return localStorage != 'undefined' && typeof(this.localValue()) === 'undefined';
	}
}

$(function() {
	options.init();
});