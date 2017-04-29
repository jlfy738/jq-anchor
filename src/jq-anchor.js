
function JQAnchor() {
    this.observers = jQuery.Callbacks();
}

JQAnchor.prototype.addObserver = function(callBack) {
    this.observers.add(callBack);
};

JQAnchor.prototype.run = function(){
    this._detectHashchange();
};

JQAnchor.prototype.go = function(pageName, state) {
    var hash = '';
    if (pageName) {
        hash = pageName;
    }
    
    var args = [];
    for (var key in state) {
        if (state.hasOwnProperty(key)) {
            args.push("" + key + "=" + state[key]);
        }
    }
    
    if (args) {
        hash = hash + '?' + args.join("&");
    }
    
    if (hash) {
        window.location.hash = hash;
    }
};

JQAnchor.prototype._detectHashchange = function() {
    
    // Fire event on initial loading if hash is defined.
    if (window.location.hash) {
        var obj = this._parseHash(window.location.hash);
        
        this.observers.fire(obj.pageName, JSON.stringify(obj.args));
    }

    var _this = this;
    
    // Fire event when hash change.
    jQuery(window).on('hashchange', function(){
        var obj = _this._parseHash(location.hash);
        
        _this.observers.fire(obj.pageName, JSON.stringify(obj.args));
    });
};

JQAnchor.prototype._parseHash = function(hash) {
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
    
    var args = this._parseParams(sParams);
    var obj = {
        'pageName': decodeURIComponent(pageName),
        'args': args
    }
    return obj;
};


JQAnchor.prototype._parseParams = function(sParams) {
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
};

