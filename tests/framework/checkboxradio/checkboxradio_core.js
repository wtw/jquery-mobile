/*
 * mobile checkboxradio unit tests
 */
(function($){

	$.mobile.page.prototype.options.keepNative = "input.should-be-native";

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "checkboxradio elements in the keepNative set shouldn't be enhanced", function() {
		ok( !$("input.should-be-native").parent().is("div.ui-checkbox") );
	});

	test( "Elements with \u201cdata-mini='true'\u201d should have \u201cui-mini\u201d class attached to enhanced element.", function(){
		var full = document.getElementById("radio-full"),
			$fulllbl = $('[for="radio-full"]'),
			mini = document.getElementById("radio-mini"),
			$minilbl = $('[for="radio-mini"]'),
			minictrl = $("#mini-control");

		ok( !full.getAttribute('data-nstest-mini') && !$fulllbl.hasClass('ui-mini'), "Original element does not have data attribute, enhanced version does not recieve .ui-mini.");
		ok( mini.getAttribute('data-nstest-mini'), "Original element has data attribute, enhanced version recieves .ui-mini." );
	});

	test( "theme should be inherited", function() {
		var $inherited = $( "#checkbox-inherit-theme" ),
			$explicit = $( "#checkbox-explicit-theme" );

		deepEqual( $inherited.siblings("label").css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
		ok( $explicit.siblings("label").hasClass( "ui-btn-b" ), "should not inherit" );
	});

	test( "Manual value update", function() {
		var h = $( "#manual-set-horizontal-1" );

		h[ 0 ].checked = true;
		h.checkboxradio( "refresh" );
		deepEqual( h.prev().hasClass( $.mobile.activeBtnClass ), true, "Horizontal: After checking and refreshing, the active class is present." );
		deepEqual( h.prev().hasClass( "ui-btn-icon-left" ), false, "Horizontal: After checking and refreshing, the icon position class is not present." );
		deepEqual( h.prev().hasClass( "ui-checkbox-on" ), true, "Horizontal: After checking and refreshing, the label has the ui-checkbox-on class" );
		deepEqual( h.prev().hasClass( "ui-checkbox-off" ), false, "Horizontal: After checking and refreshing, the label does not have the ui-checkbox-off class" );

		h[ 0 ].checked = false;
		h.checkboxradio( "refresh" );
		deepEqual( h.prev().hasClass( $.mobile.activeBtnClass ), false, "Horizontal: After unchecking and refreshing, the active class is not present." );
		deepEqual( h.prev().hasClass( "ui-btn-icon-left" ), false, "Horizontal: After unchecking and refreshing, the icon position class is not present." );
		deepEqual( h.prev().hasClass( "ui-checkbox-on" ), false, "Horizontal: After unchecking and refreshing, the label does not have the ui-checkbox-on class" );
		deepEqual( h.prev().hasClass( "ui-checkbox-off" ), true, "Horizontal: After unchecking and refreshing, the label has the ui-checkbox-off class" );

	});
})(jQuery);
