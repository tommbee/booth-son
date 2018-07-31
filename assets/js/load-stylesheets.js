const $ = require('jquery');

export class LoadStylesheets {

    constructor() {
        this.timeout_id = false;
    }

    loadStyleSheet( path, fn, scope ) {
        let head = document.getElementsByTagName( 'head' )[0], // reference to document.head for appending/ removing link nodes
            link = document.createElement( 'link' );           // create the link node
        link.setAttribute( 'href', path );
        link.setAttribute( 'rel', 'stylesheet' );
        link.setAttribute( 'type', 'text/css' );

        let sheet, cssRules;
        // get the correct properties to check for depending on the browser
        if ( 'sheet' in link ) {
            sheet = 'sheet'; cssRules = 'cssRules';
        }
        else {
            sheet = 'styleSheet'; cssRules = 'rules';
        }
        const that = this;

        const interval_id = setInterval( function() {                     // start checking whether the style sheet has successfully loaded
            try {
                if ( link[sheet] && link[sheet][cssRules].length ) { // SUCCESS! our style sheet has loaded
                    clearInterval( interval_id );                      // clear the counters
                    clearTimeout( that.timeout_id );
                    fn.call( scope || window, true, link );           // fire the callback with success == true
                }
            } catch( e ) {} finally {}
        }, 10 );                                                   // how often to check if the stylesheet is loaded

        that.timeout_id = setTimeout( function() {       // start counting down till fail
            clearInterval( interval_id );             // clear the counters
            clearTimeout( that.timeout_id );
            head.removeChild( link );                // since the style sheet didn't load, remove the link node from the DOM
            fn.call( scope || window, false, link ); // fire the callback with success == false
        }, 15000 );                                 // how long to wait before failing

        head.appendChild( link );  // insert the link node into the DOM and start loading the style sheet

        return link; // return the link node;
    }

    load() {
        //console.log("LoadStylesheets::load " + window.stylesheets);
        this.loadStyleSheet( window.stylesheets, function( success, link ) {
            if (success) {
                //console.log("stylesheet loaded");
                $(document).trigger('event:cssReady');
            } else {
                console.log("Could not load stylesheet");
            }
        });
    }

}