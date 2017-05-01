(function($) {

    if (!($.JQAnchor || false)) {

        $.JQAnchor = {

            options: {
            },

            construct: function () {
                $.JQAnchor.observers = $.Callbacks();
            },
            
            addObserver: function(callBack) {
                $.JQAnchor.observers.add(callBack);
            },

            run: function(){
                $.JQAnchor._detectHashchange();
            },

            goto: function(pageName, state) {
                var JQAnchor = $.JQAnchor;
                var hash = '';

                if (pageName) {
                    hash = encodeURIComponent(pageName);
                }
                
                var args = [];
                for (var key in state) {
                    if (state.hasOwnProperty(key)) {
                        args.push(encodeURIComponent(key) + "=" + encodeURIComponent(state[key]));
                    }
                }
                
                if (args) {
                    hash = hash + '?' + args.join("&");
                }
                
                JQAnchor.setHash(hash);
            },

            getHash: function() {
                return window.location.hash || location.hash;
            },

            setHash: function(hash) {
                var JQAnchor = $.JQAnchor;

                if (typeof window.location.hash !== 'undefined') {
                    if (window.location.hash !== hash) {
                        window.location.hash = hash;
                    }
                } else if (location.hash !== hash) {
                    location.hash = hash;
                }

                return hash;
            },

            _detectHashchange: function() {
                var JQAnchor = $.JQAnchor;

                var hash = JQAnchor.getHash();

                // Fire event on initial loading if hash is defined.
                if (hash) {
                    var obj = JQAnchor._parseHash(hash);
                    
                    JQAnchor.observers.fire(obj.pageName, obj.args);
                }
                
                // Fire event when hash change.
                $(window).on('hashchange', function() {
                    var h = JQAnchor.getHash();
                    var obj = JQAnchor._parseHash(h);
                    
                    JQAnchor.observers.fire(obj.pageName, obj.args);
                });
            },

            _parseHash: function(hash) {
                var JQAnchor = $.JQAnchor;
                var h = hash.trim();
                
                var sParams = "",
                    pageName = "";
                
                if (h.length > 0) {
                    
                    // Remove leading '#'
                    if (h.substr(0, 1) == "#") {
                        h = h.substr(1);
                    }
                    
                    // Is there a '?'
                    var qm = h.indexOf("?");
                    if (qm !== -1) {
                        // No text before '?'
                        if (qm == 0) {
                            h = h.substr(1);
                            sParams = h;
                        } 
                        // Text before '?'
                        else {
                            sParams = h.substr(qm + 1);
                            pageName = h.substr(0, qm);
                        }
                    } 
                    // No '?'
                    else {
                        pageName = h;
                    }
                }
                
                var args = JQAnchor._parseParams(sParams);
                var obj = {
                    'pageName': decodeURIComponent(pageName),
                    'args': args
                }
                return obj;
            },

            _parseParams: function(sParams) {
                var pieces = [], 
                    data = {};
                
                if (sParams) {
                    pieces = sParams.split("&")
                }
                
                // process each query pair
                for (var i = 0; i < pieces.length; i++) {
                    var parts = pieces[i].split("=");
                    if (parts.length < 2) {
                        parts.push("");
                    }
                    data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return data;
            },


        }; // End of plugin

        
        // Initialise
        $.JQAnchor.construct();
    }
    else {
        window.console && console.warn('$.JQAnchor has already been defined...');
    }

})(jQuery);
