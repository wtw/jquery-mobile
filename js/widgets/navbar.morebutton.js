//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: navbar morebutton extension.
//>>label: NavbarMoreButton
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "./navbar", "./popup" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.navbar", $.mobile.navbar, {

    options: {
        morebutton: false,
        morebuttontext: "...",
        morebuttoniconpos: "top",
        morebuttonicon: null
    },

    _create: function() {
		var self = this,
			$navbtns = self.element.find( "a" ),
			numbuttons = $navbtns.length,
			maxbutton = this.options.maxbutton;
        this._super();
        if ( this.options.morebutton  && numbuttons > maxbutton) {
            this._createNavPopup();
        }
    },

    _id: function() {
        return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
    },

    _createNavRows: function () {
        if ( this.options.morebutton ) {
            return;
        }

        this._super();
    },

    _createNavPopup: function(){
        var $popupDiv, $popupNav, moreButton, pos, buttonItem, id,
            $navbar = this.element,
            $navButtons = $navbar.find( "a" ),
            $navItems = $navbar.find( "li" ),
            buttonCount = $navButtons.length,
            maxButton = this.options.maxbutton,
            iconpos = this.options.iconpos,
            icon = this.options.morebuttonicon,
            classes = "ui-btn";

        id = this._id() + "-popup";
        $popupDiv = $( "<div class='ui-navbar-popup' id='" + id + "'></div>" );
        $popupNav = $( "<ul class='ui-navbar-popupnav'>" )
            .appendTo( $popupDiv );

        // enhance buttons and move to new rows
        for( pos = 0; pos < buttonCount; pos++ ) {
            buttonItem = $navItems.eq(pos);
            this._makeNavButton(buttonItem.find("a"), iconpos);
            if (pos + 1 === maxButton) {
                if ( icon ) {
                    classes += " ui-icon-" + icon + " ui-btn-icon-" + this.options.morebuttoniconpos;
                }
                moreButton = $( "<li></li>" ).append(
                                 $( "<a></a>" )
                                    .attr( "href", "#" + id)
                                    .attr( "data-rel", "popup" )
                                    .addClass( classes )
                                    .html( this.options.morebuttontext ));
                $navbar.find( "ul" ).first().append( moreButton );

            }
            if ( pos + 1 >= maxButton ) {
                buttonItem.detach();
                $popupNav.append( buttonItem );
            }
            $popupNav.listview();
           
        }
        $popupDiv.appendTo( $navbar );
        $popupDiv.popup();
    },
    refresh: function() {
	    var popup, morebutton, newitems,
	        self = this,
	        iconpos = self.options.iconpos;
	    if (!this.options.morebutton) {
	      this._super();
	      return;
	    }

	    morebutton = this.element.find("[data-rel='popup']");
	    popup = morebutton.attr( "href" );

        if (popup) {
		    newitems = morebutton.parent().nextAll();
		    newitems.find("a").each(function() {
		      self._makeNavButton(this, iconpos);
		    });
		    newitems.appendTo($(popup).find("ul"));
		}
        self._createNavPopup();
    }
});
  
})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
