define([
	"widgets/forms/button"
], function() {
	module( "widgets.forms.button" );

	test( "constructor", function() {
		var myButton, _enhance, refresh;

		myButton = $.mobile.button( {}, $( "<input type='button' value='my button'>" ) );
		ok( !myButton.options.disabled );

		myButton = $.mobile.button( {}, $( "<input type='button' value='my button' disabled='true'>" ) );
		ok( myButton.options.disabled );

		_enhance = this.stub( $.mobile.button.prototype, "_enhance" );
		refresh = this.stub( $.mobile.button.prototype, "refresh" );
		$.mobile.button( {}, $( "<input type='button' value='my button'>" ) );
		ok( _enhance.calledOnce );
		ok( refresh.calledOnce );

		_enhance.reset();
		refresh.reset();
		$.mobile.button( {}, $( "<input type='button' value='my button' data-enhanced='true'>" ) );
		ok( !_enhance.called );
		ok( refresh.calledOnce );
	});

	test( "_button", function() {
		var myButton, wrapper, _getIconClasses;

		// Stub _enhance method so it doesn't actually get called
		this.stub( $.mobile.button.prototype, "_enhance" );

		_getIconClasses = this.stub( $.mobile.button.prototype, "_getIconClasses" ).returns( "icon-class" );

		myButton = $.mobile.button( {}, $( "<input type='button' value='my button'>" ) );
		wrapper = $.mobile.button.prototype._button.call( myButton );
		ok( _getIconClasses.calledOnce, "_getIconClasses should be called once" );
		ok( wrapper.hasClass( "icon-class" ), "button wrapper should have class icon-class" );

		_getIconClasses.returns( "" );

		myButton = $.mobile.button( {}, $( "<input type='button' value='my button'>" ) );
		wrapper = $.mobile.button.prototype._button.call( myButton );
		equal( wrapper.html(), "my button", "button value should be the innerHTML of the wrapper" );
		ok( wrapper.hasClass( "ui-btn" ), "button wrapper should have class ui-btn" );
		ok( wrapper.hasClass( "ui-input-btn" ), "button wrapper should have class ui-input-btn" );
		ok( wrapper.hasClass( "ui-corner-all" ), "button wrapper should have class ui-corner-all" );
		ok( wrapper.hasClass( "ui-shadow" ), "button wrapper should have class ui-shadow" );

		myButton = $.mobile.button( { wrapperClass: "wrapper-class" }, $( "<input type='button' value='my button'>" ) );
		wrapper = $.mobile.button.prototype._button.call( myButton );
		ok( wrapper.hasClass( "wrapper-class" ), "button wrapper should have class wrapper-class" );

		myButton = $.mobile.button( { theme: "b" }, $( "<input type='button' value='my button'>" ) );
		wrapper = $.mobile.button.prototype._button.call( myButton );
		ok( wrapper.hasClass( "ui-btn-b" ), "button wrapper should have class ui-btn-b" );

		myButton = $.mobile.button( { corners: false }, $( "<input type='button' value='my button'>" ) );
		wrapper = $.mobile.button.prototype._button.call( myButton );
		ok( !wrapper.hasClass( "ui-corner-all" ), "button wrapper should NOT have class ui-corner-all" );

		myButton = $.mobile.button( { shadow: false }, $( "<input type='button' value='my button'>" ) );
		wrapper = $.mobile.button.prototype._button.call( myButton );
		ok( !wrapper.hasClass( "ui-shadow" ), "button wrapper should NOT have class ui-shadow" );

		myButton = $.mobile.button( { inline: true }, $( "<input type='button' value='my button'>" ) );
		wrapper = $.mobile.button.prototype._button.call( myButton );
		ok( wrapper.hasClass( "ui-btn-inline" ), "button wrapper should have class ui-btn-inline" );
	});
});