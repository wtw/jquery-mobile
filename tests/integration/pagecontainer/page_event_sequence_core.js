( function() {

var eventSequence,
	eventsList = [

		// Deprecated as of 1.4.x
		"pagebeforechange",
		"pagebeforeload",
		"pageload",
		"pagebeforehide",
		"pagebeforeshow",
		"pagehide",
		"pageshow",
		"pagechange",

		// Valid as of 1.4.x
		"pagecontainerbeforechange",
		"pagecontainerbeforeload",
		"pagecontainerload",
		"pagebeforecreate",
		"pagecreate",
		"pageinit",
		"pagecontainerbeforetransition",
		"pagecontainerbeforehide",
		"pagecontainerbeforeshow",
		"pagecontainerhide",
		"pagecontainershow",
		"pagecontainertransition",
		"pagecontainerchange"
	].join( " " ),
	dataItem = function( item ) {
		return ( item ?
			( item.jquery ?
				item.attr( "id" ) :
				$.type( item ) === "string" ?
					item :
					"unknown" ) :
			undefined );
	},
	recordEvent = function( event, data ) {
		eventSequence.push({
			type: event.type,
			target: event.target.getAttribute( "id" ),
			data: {
				prevPage: data && dataItem( data.prevPage ),
				nextPage: data && dataItem( data.nextPage ),
				toPage: data && dataItem( data.toPage )
			}
		});
	};

module( "Page event sequence tests", {
	setup: function() {
		eventSequence = [];

		$( document ).on( eventsList, recordEvent );
	},
	teardown: function() {
		$( document ).off( eventsList, recordEvent );
	}
});

asyncTest( "Event sequence during navigation to another page", function() {
	var parsedUrl = $.mobile.path.parseLocation(),
		otherPageUrl = $.mobile.path.getLocation( $.extend( parsedUrl, {
			filename: "other-page.html",
			pathname: parsedUrl.directory + "other-page.html"
		})),
		expectedEventSequence = [

			// Deprecated as of 1.4.0
			{ type: "pagebeforechange", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Valid
			{ type: "pagecontainerbeforechange", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforeload", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Valid
			{ type: "pagecontainerbeforeload", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: otherPageUrl } },

			// Deprecated as of 1.4.0
			{ type: "pageload", target: "the-body",
				data: { prevPage: undefined, nextPage: undefined, toPage: undefined } },

			// Valid
			{ type: "pagecontainerload", target: "the-body",
				data: { prevPage: undefined, nextPage: undefined, toPage: undefined } },

			// Valid - page widget events
			{ type: "pagebeforecreate", target: "other-page",
				data: { prevPage: undefined, nextPage: undefined, toPage: undefined } },
			{ type: "pagecreate", target: "other-page",
				data: { prevPage: undefined, nextPage: undefined, toPage: undefined } },
			{ type: "pageinit", target: "other-page",
				data: { prevPage: undefined, nextPage: undefined, toPage: undefined } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforechange", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerbeforechange", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerbeforetransition", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforehide", target: "start-page",
				data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Valid, but nextPage is deprecated as of 1.4.0
			{ type: "pagecontainerbeforehide", target: "the-body",
				data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagebeforeshow", target: "other-page",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerbeforeshow", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagehide", target: "start-page",
				data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Valid, but nextPage is deprecated as of 1.4.0
			{ type: "pagecontainerhide", target: "the-body",
				data: { prevPage: "start-page", nextPage: "other-page", toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pageshow", target: "other-page",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainershow", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainertransition", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Deprecated as of 1.4.0
			{ type: "pagechange", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } },

			// Valid
			{ type: "pagecontainerchange", target: "the-body",
				data: { prevPage: "start-page", nextPage: undefined, toPage: "other-page" } }
		];

	$.testHelper.pageSequence([
		function() {
			$( "#go-to-other-page" ).click();
		},
		function() {
			deepEqual( eventSequence, expectedEventSequence, "Event sequence as expected" );
			$( ":mobile-pagecontainer" ).pagecontainer( "back" );
		},
		function() {
			deepEqual( true, true, "Works" );
			start();
		}
	]);
});

})();
