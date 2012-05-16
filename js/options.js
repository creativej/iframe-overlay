var options = {
	fields:{},
	init: function() {
		var _this = this;

		this.loadFields(['match', 'url', 'width', 'height']);
		this.save('iframedefaults');

		if (this.hasLocalValue())
			this.save();
		else
			this.restore('iframeconfig');

		$('.save').on('click', function() { _this.save() });
		$('.reset').on('click', function() { _this.restore('iframeconfig') });
		$('.restore').on('click', function() { _this.restore() });
	},

	loadFields: function(names) {
		var _this = this;

		$.each(names, function(index, name) {
			_this.addField(name);
		});
	},

	addField: function(name) {
		this.fields[name] = $("." + name);
	},

	getField: function(name) {
		return this.fields[name];
	},

	save: function(type) {
		type = type || 'iframeconfig';

		// console.log('save');
		localStorage[type] = JSON.stringify(this.fieldsToObject());
	},

	fieldsToObject: function() {
		var obj = {};
		$.each(this.fields, function(index, $field) {
			obj[index] = $field.val();
		});
		// console.log(obj);
		return obj;
	},

	localValue: function() {
		return localStorage['iframeconfig'];
	},

	restore: function(type) {
		var _this = this;

		type = type || 'iframedefaults';

		// console.log('restore');
		var defaults = JSON.parse(localStorage[type]);

		$.each(this.fields, function(index, $field) {
			$field.val(defaults[index]);
		});
	},

	hasLocalValue: function() {
		return localStorage != 'undefined' && typeof(this.localValue()) === 'undefined';
	}
}

$(function() {
	options.init();
});