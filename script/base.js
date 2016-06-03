var mini = (function() {
    var s = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
        n = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
        o = /^(?:[\w\-_]+)?#([\w\-_]+)/,
        k = /^([\w\*\-_]+)/,
        m = [null, null];
    function q(d, f) {
        f = f || document;
        var h = /^[\w\-_#]+$/.test(d);
        if (!h && f.querySelectorAll) {
            return r(f.querySelectorAll(d))
        }
        if (d.indexOf(",") > -1) {
            var y = d.split(/,/g),
                A = [],
                B = 0,
                a = y.length;
            for (; B < a; ++B) {
                A = A.concat(q(y[B], f))
            }
            return p(A)
        }
        var c = d.match(s),
            e = c.pop(),
            g = (e.match(o) || m)[1],
            z = !g && (e.match(n) || m)[1],
            j = !g && (e.match(k) || m)[1],
            b;
        if (z && !j && f.getElementsByClassName) {
            b = r(f.getElementsByClassName(z))
        } else {
            b = !g && r(f.getElementsByTagName(j || "*"));
            if (z) {
                b = l(b, "className", RegExp("(^|\\s)" + z + "(\\s|$)"))
            }
            if (g) {
                var i = f.getElementById(g);
                return i ? [i] : []
            }
        }
        return c[0] && b[0] ? t(c, b) : b
    }
    function r(d) {
        try {
            return Array.prototype.slice.call(d)
        } catch(e) {
            var b = [],
                a = 0,
                c = d.length;
            for (; a < c; ++a) {
                b[a] = d[a]
            }
            return b
        }
    }
    function t(i, b, d) {
        var a = i.pop();
        if (a === ">") {
            return t(i, b, true)
        }
        var A = [],
            g = -1,
            f = (a.match(o) || m)[1],
            z = !f && (a.match(n) || m)[1],
            j = !f && (a.match(k) || m)[1],
            y = -1,
            e,
            h,
            c;
        j = j && j.toLowerCase();
        while ((e = b[++y])) {
            h = e.parentNode;
            do {
                c = !j || j === "*" || j === h.nodeName.toLowerCase();
                c = c && (!f || h.id === f);
                c = c && (!z || RegExp("(^|\\s)" + z + "(\\s|$)").test(h.className));
                if (d || c) {
                    break
                }
            } while (( h = h . parentNode ));
            if (c) {
                A[++g] = e
            }
        }
        return i[0] && A[0] ? t(i, A) : A
    }
    var p = (function() {
        var b = +new Date();
        var a = (function() {
            var c = 1;
            return function(d) {
                var e = d[b],
                    f = c++;
                if (!e) {
                    d[b] = f;
                    return true
                }
                return false
            }
        })();
        return function(c) {
            var d = c.length,
                h = [],
                e = -1,
                g = 0,
                f;
            for (; g < d; ++g) {
                f = c[g];
                if (a(f)) {
                    h[++e] = f
                }
            }
            b += 1;
            return h
        }
    })();
    function l(d, c, e) {
        var a = -1,
            f, g = -1,
            b = [];
        while ((f = d[++a])) {
            if (e.test(f[c])) {
                b[++g] = f
            }
        }
        return b
    }
    return q
})();
if (typeof Ylmf === "undefined") {
    var Ylmf = {}
}
Function.prototype.method = function(a, b) {
    this.prototype[a] = b;
    return this
};
if (!Array.prototype.forEach) {
    Array.method("forEach",
        function(d, e) {
            var c = e || window;
            for (var b = 0,
                     a = this.length; b < a; ++b) {
                d.call(c, this[b], b, this)
            }
        }).method("every",
        function(d, e) {
            var c = e || window;
            for (var b = 0,
                     a = this.length; b < a; ++b) {
                if (!d.call(c, this[b], b, this)) {
                    return false
                }
            }
            return true
        }).method("some",
        function(d, e) {
            var c = e || window;
            for (var b = 0,
                     a = this.length; b < a; ++b) {
                if (d.call(c, this[b], b, this)) {
                    return true
                }
            }
            return false
        }).method("map",
        function(f, g) {
            var e = g || window;
            var b = [];
            for (var d = 0,
                     c = this.length; d < c; ++d) {
                b.push(f.call(e, this[d], d, this))
            }
            return b
        }).method("filter",
        function(f, g) {
            var e = g || window;
            var b = [];
            for (var d = 0,
                     c = this.length; d < c; ++d) {
                if (!f.call(e, this[d], d, this)) {
                    continue
                }
                b.push(this[d])
            }
            return b
        }).method("indexOf",
        function(c, d) {
            var d = d || 0;
            for (var b = d,
                     a = this.length; b < a; ++b) {
                if (this[b] === c) {
                    return b
                }
            }
            return - 1
        }).method("lastIndexOf",
        function(b, c) {
            var c = c || this.length;
            if (c >= this.length) {
                c = this.length
            }
            if (c < 0) {
                c = this.length + c
            }
            for (var a = c; a >= 0; --a) {
                if (this[a] === b) {
                    return a
                }
            }
            return - 1
        })
} (function() {
    Ylmf.register = function(a) {
        function b(d) {
            if (typeof d == "string") {
                var c = mini(d);
                if (!c || c == "" || typeof(c) == "undefined" == "undefined") {
                    return false
                }
                if (c.length == 1) {
                    this.el = c[0]
                } else {
                    if (c.length > 1) {
                        this.el = c
                    }
                }
            } else {
                if (d.nodeType == 1) {
                    this.el = d
                }
            }
        }
        b.method(a.each,
            function(e) {
                if (!this.el) {
                    return
                }
                if (!this.el.length) {
                    e.call(this, this.el)
                } else {
                    for (var d = 0,
                             c = this.el.length; d < c; ++d) {
                        e.call(this, this.el[d])
                    }
                }
                return this
            }).method(a.hasClass,
            function(e, d) {
                this.each(function(g) {
                    var f = g.className.split(/\s+/).toString();
                    var c = (f.indexOf(e) > -1) ? true: false; (function() {
                        d(c)
                    })()
                });
                return this
            }).method(a.addClass,
            function(c) {
                this.each(function(f) {
                    var d = (c || "").split(/\s+/);
                    for (var e = 0; e < d.length; e++) {
                        var g = d[e];
                        this.hasClass(f,
                            function(h) {
                                if (!h) {
                                    f.className += (f.className ? " ": "") + g
                                }
                            })
                    }
                });
                return this
            }).method(a.removeClass,
            function(d) {
                this.each(function(h) {
                    if (d != undefined) {
                        var f = h.className.split(/\s+/);
                        var e = [];
                        for (var g = 0,
                                 c = f.length; g < c; ++g) {
                            var j = f[g];
                            if (j != d) {
                                e.push(j)
                            }
                        }
                        h.className = e.join(" ")
                    } else {
                        h.className = ""
                    }
                });
                return this
            }).method(a.replaceClass,
            function(c, d) {
                this.removeClass(c);
                this.addClass(d);
                return this
            }).method(a.setStyle,
            function(d, c) {
                this.each(function(e) {
                    e.style[d] = c
                });
                return this
            }).method(a.setCSS,
            function(c) {
                for (var d in c) {
                    if (!c.hasOwnProperty(d)) {
                        continue
                    }
                    this.setStyle(d, c[d])
                }
                return this
            }).method(a.getStyle,
            function(e, d) {
                var c = null;
                if (document.defaultView) {
                    c = document.defaultView.getComputedStyle(this.el, null).getPropertyValue(e)
                } else {
                    e = e.replace(/\-([a-z])([a-z]?)/ig,
                        function(h, g, f) {
                            return g.toUpperCase() + f.toLowerCase()
                        });
                    c = this.el.currentStyle[e]
                }
                d.call(this, c);
                return this
            }).method(a.show,
            function(c) {
                if (c == 0) {
                    this.setStyle("display", "")
                } else {
                    if (c == 1) {
                        this.setStyle("display", "")
                    } else {
                        this.setStyle("display", "block")
                    }
                }
                return this
            }).method(a.hide,
            function() {
                this.setStyle("display", "none");
                return this
            }).method(a.toggle,
            function(c) {
                this.each(function(d) {
                    if (d.style.display == "none") {
                        if (c) {
                            c == 1 ? d.style.display = "inline": d.style.display = ""
                        } else {
                            d.style.display = "block"
                        }
                    } else {
                        d.style.display = "block"
                    }
                });
                return this
            }).method(a.on,
            function(d, c) {
                var e = function(g) {
                    var h = function() {
                        c(g)
                    };
                    if (window.addEventListener) {
                        g.addEventListener(d, h, false)
                    } else {
                        if (window.attachEvent) {
                            g.attachEvent("on" + d, h)
                        }
                    }
                };
                if (!this.el) {
                    return
                }
                if (this.el.length == 0) {
                    e(this.el)
                } else {
                    this.each(function(f) {
                        e(f)
                    })
                }
                return this
            }).method(a.getRect,
            function(c) {
                var d = this.el.getBoundingClientRect();
                c.call(this, d);
                return this
            }).method(a.create,
            function(d, e, c) {
                var d = document.createElement(d);
                for (prop in e) {
                    d.setAttribute(prop, e[prop])
                }
                if (c) {
                    c.call(this, d)
                }
                return this
            }).method(a.append,
            function(c) {
                this.el.appendChild(c);
                return this
            }).method(a.remove,
            function(c) {
                if (c) {
                    this.el.removeChild(c)
                }
                return this
            });
        window[a.namespace] = function(c) {
            return new b(c)
        };
        window[a.namespace].forEach = Array.prototype.forEach;
        window[a.namespace].every = Array.prototype.every;
        window[a.namespace].some = Array.prototype.some;
        window[a.namespace].map = Array.prototype.map;
        window[a.namespace].filter = Array.prototype.filter;
        Ylmf.extendChain = function(c, d) {
            b.method(c, d)
        }
    }
})();
Ylmf.register({
    namespace: "$",
    each: "each",
    addClass: "addClass",
    hasClass: "hasClass",
    removeClass: "removeClass",
    replaceClass: "replaceClass",
    setStyle: "setStyle",
    getStyle: "getStyle",
    setCSS: "setCSS",
    show: "show",
    hide: "hide",
    toggle: "toggle",
    on: "on",
    getRect: "getRect",
    append: "append",
    create: "create",
    remove: "remove"
});
var Yl = {
        getHost: function(a) {
            var b = a || location.host,
                c = b.indexOf(":");
            return (c == -1) ? b: b.substring(0, c)
        },
        getFocus: function(b) {
            var a = b.createTextRange();
            a.moveStart("character", b.value.length);
            a.collapse(true);
            a.select()
        },
        loadFrame: function(a, b) {
            if (Browser.isIE) {
                a.onreadystatechange = function() {
                    b()
                }
            } else {
                a.onload = function() {
                    b()
                }
            }
        },
        trim: function(a) {
            a = a.replace(/(^\u3000+)|(\u3000+$)/g, "");
            a = a.replace(/(^ +)|( +$)/g, "");
            return a
        },
        encodeText: function(a) {
            a = a.replace(/</g, "&lt;");
            a = a.replace(/>/g, "&gt;");
            a = a.replace(/\'/g, "&#39;");
            a = a.replace(/\"/g, "&#34;");
            a = a.replace(/\\/g, "&#92;");
            a = a.replace(/\[/g, "&#91;");
            a = a.replace(/\]/g, "&#93;");
            return a
        },
        decodeHtml: function(a) {
            a = a.replace(/&lt;/g, "<");
            a = a.replace(/&gt;/g, ">");
            a = a.replace(/&#39;/g, "'");
            a = a.replace(/&#34;/g, '"');
            a = a.replace(/&#92;/g, "\\");
            a = a.replace(/&#91;/g, "[");
            a = a.replace(/\&#93;/g, "]");
            return a
        },
        createFrame: function(e) {
            if (!e || !e.src) {
                return
            }
            var d = e.src,
                a = e.width || "100%",
                c = e.height || "100%",
                b = format('<iframe src="#{src}" width="#{width}" height="#{height}" scrolling="no" frameborder="0" allowtransparency="true"></iframe>', {
                    src: d,
                    width: a,
                    height: c
                });
            return b
        },
        getType: function(b) {
            var a;
            return ((a = typeof(b)) == "object" ? b == null && "null" || Object.prototype.toString.call(b).slice(8, -1) : a).toLowerCase()
        },
        setStyle: function(a, c) {
            var b = document.styleSheets[0];
            if (b.addRule) {
                a = a.split(",");
                for (var d = 0,
                         e = a.length; d < e; d++) {
                    b.addRule(a[d], c)
                }
            } else {
                if (b.insertRule) {
                    b.insertRule(a + " { " + c + " }", b.cssRules.length)
                }
            }
        },
        addFav: function(a) {
            var a = a || document.getElementsByTagName("title")[0].innerHTML;
            if (document.all) {
                window.external.AddFavorite(location.href, a)
            } else {
                if (window.sidebar) {
                    window.sidebar.addPanel(a, location.href, "")
                } else {
                    if (window.opera && window.print) {
                        return true
                    }
                }
            }
        },
        setHome: function(c, a) {
            if (!Browser.isIE) {
                window.open("http://www.114la.com/repair/setbrowser.html");
                return
            }
            var b = a;
            if (!b) {
                b = window.location.href
            }
            c.style.behavior = "url(#default#homepage)";
            c.setHomePage(b)
        }
    },
    Browser = (function() {
        var g = navigator.userAgent,
            j = 0,
            k = 0,
            f = 0,
            a = 0,
            d = 0,
            h = 0,
            b = 0,
            c;
        if (g.indexOf("Chrome") > -1 && /Chrome\/(\d+(\.d+)?)/.test(g)) {
            b = RegExp.$1
        }
        if (g.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(g)) {
            j = RegExp.$1
        }
        if (window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(g)) {
            f = RegExp.$2
        }
        if (g.indexOf("Gecko") > -1 && g.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(g)) {
            d = RegExp.$1
        }
        if (/MSIE (\d+(\.\d+)?)/.test(g)) {
            a = RegExp.$1
        }
        if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(g)) {
            h = RegExp.$2
        }
        if (g.indexOf("KHTML") > -1 && /AppleWebKit\/([^\s]*)/.test(g)) {
            k = RegExp.$1
        }
        try {
            c = !!external.max_version
        } catch(e) {}
        function i() {
            var m = false;
            if (navigator.plugins) {
                for (var o = 0; o < navigator.plugins.length; o++) {
                    if (navigator.plugins[o].name.toLowerCase().indexOf("shockwave flash") >= 0) {
                        m = true
                    }
                }
            }
            if (!m) {
                try {
                    var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (n) {
                        m = true
                    }
                } catch(l) {
                    m = false
                }
            }
            return m
        }
        return ({
            isStrict: document.compatMode == "CSS1Compat",
            isChrome: b,
            isSafari: j,
            isWebkit: k,
            isOpera: f,
            isGecko: d,
            isIE: a,
            isFF: h,
            isMaxthon: c,
            isFlash: i(),
            isCookie: (navigator.cookieEnabled) ? true: false
        })
    })(),
    Cookie = {
        set: function(b, d, a, e, c) {
            if (typeof a == "undefined") {
                a = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365)
            }
            document.cookie = b + "=" + escape(d) + ((a) ? "; expires=" + a.toGMTString() : "") + ((e) ? "; path=" + e: "; path=/") + ((c) ? ";domain=" + c: "")
        },
        get: function(b) {
            var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
            if (a != null) {
                return unescape(a[2])
            }
            return null
        },
        clear: function(a, c, b) {
            if (this.get(a)) {
                document.cookie = a + "=" + ((c) ? "; path=" + c: "; path=/") + ((b) ? "; domain=" + b: "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT"
            }
        }
    };
Ajax = function(c, j) {
    var h;
    if (typeof XMLHttpRequest !== "undefined") {
        h = new XMLHttpRequest()
    } else {
        var b = ["Microsoft.XmlHttp", "MSXML2.XmlHttp", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.5.0"];
        for (var d = 0,
                 a = b.length; d < a; d++) {
            try {
                h = new ActiveXObject(b[d]);
                break
            } catch(f) {}
        }
    }
    h.onreadystatechange = g;
    function g() {
        if (h.readyState < 4) {
            return
        }
        if (h.status !== 200) {
            return
        }
        if (h.readyState === 4) {
            j(h)
        }
    }
    h.open("GET", c, true);
    h.send("")
};
cache = (function() {
    var c = {};
    function e(f) {
        if (c[f]) {
            return c[f]
        }
        return null
    }
    function b(g, h, f) {
        if (!f) {
            c[g] = h
        } else {
            if (Yl.getType(c[g]) != "array") {
                c[g] = []
            }
            c[g].push(h)
        }
    }
    function d(f) {
        delete c[f]
    }
    function a(f) {
        return (e(f) == null) ? false: true
    }
    return {
        get: e,
        set: b,
        is: a,
        remove: d
    }
})();
format = function(g, c) {
    if (arguments.length > 1) {
        var i = format,
            f = /([.*+?^=!:${}()|[\]\/\\])/g,
            b = (i.left_delimiter || "{").replace(f, "\\$1"),
            d = (i.right_delimiter || "}").replace(f, "\\$1"),
            j = i._r1 || (i._r1 = new RegExp("#" + b + "([^" + b + d + "]+)" + d, "g")),
            h = i._r2 || (i._r2 = new RegExp("#" + b + "(\\d+)" + d, "g"));
        if (typeof(c) == "object") {
            return g.replace(j,
                function(l, k) {
                    var m = c[k];
                    if (typeof m == "function") {
                        m = m(k)
                    }
                    return typeof(m) == "undefined" ? "": m
                })
        } else {
            if (typeof(c) != "undefined") {
                var a = Array.prototype.slice.call(arguments, 1),
                    e = a.length;
                return g.replace(h,
                    function(k, l) {
                        l = parseInt(l, 10);
                        return (l >= e) ? k: a[l]
                    })
            }
        }
    }
    return g
};
var _hmt = _hmt || [];
function seriesLoadScripts(scripts, callback) {
    if (typeof(scripts) != "object") {
        var scripts = [scripts]
    }
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = new Array(),
        last = scripts.length - 1,
        recursiveLoad = function(i) {
            s[i] = document.createElement("script");
            s[i].setAttribute("type", "text/javascript");
            s[i].onload = s[i].onreadystatechange = function() {
                if (!
                        /*@cc_on!@*/
                        0 || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null;
                    this.parentNode.removeChild(this);
                    if (i != last) {
                        recursiveLoad(i + 1)
                    } else {
                        if (typeof(callback) == "function") {
                            callback()
                        }
                    }
                }
            };
            s[i].setAttribute("src", scripts[i]);
            HEAD.appendChild(s[i])
        };
    recursiveLoad(0)
};





