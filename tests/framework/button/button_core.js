/*
 * mobile button unit tests
 */
(function($){
	$.mobile.page.prototype.options.keepNative = "button.should-be-native";

	test( "button elements in the keepNative set shouldn't be enhanced", function() {
		deepEqual( $("button.should-be-native").siblings("div.ui-slider").length, 0 );
	});
	test( "theme should be inherited", function() {
		var $inherited = $( "#theme-check" );

		deepEqual( $inherited.css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
	});
})( jQuery );
