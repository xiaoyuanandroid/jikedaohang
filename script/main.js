var Config = {
    Search: {
        bd: {
            action: "http://www.baidu.com/s",
            name: "wd",
            btn: "\u767e\u5ea6\u4e00\u4e0b",
            img: ["public/rebuild/images/s/baidu.png", "\u767e\u5ea6\u9996\u9875"],
            url: "http://www.baidu.com/",
            params: {}
        },
        mp3: {
            action: "http://music.baidu.com/search",
            name: "key",
            btn: "\u767e\u5ea6\u4e00\u4e0b",
            img: ["public/rebuild/images/s/mp3.png", "\u767e\u5ea6\u4e00\u4e0b"],
            url: "http://music.baidu.com/",
            params: {}
        },
        gg: {
            action: "https://www.google.com/search?q=",
            name: "q",
            btn: "\u8c37\u6b4c\u641c\u7d22",
            img: ["public/rebuild/images/s/google.png", "\u8c37\u6b4c\u641c\u7d22"],
            url: "https://www.google.com/search?q=",
            params: {}
        },
        image: {
            action: "http://image.baidu.com/search/index",
            name: "word",
            btn: "\u767e\u5ea6\u4e00\u4e0b",
            img: ["public/rebuild/images/s/pic.png", "\u767e\u5ea6\u56fe\u7247"],
            url: "http://image.baidu.com/",
            params: {
                tn: "baiduimage"
            }
        },
        zhidao: {
            action: "http://zhidao.baidu.com/search",
            name: "word",
            btn: "\u767e\u5ea6\u4e00\u4e0b",
            img: ["public/rebuild/images/s/zhidao.png", "\u767e\u5ea6\u77e5\u9053"],
            url: "http://zhidao.baidu.com/",
            params: {}
        },
        taobao: {
            action: "http://s.taobao.com/search",
            name: "q",
            btn: "\u6dd8\u5b9d\u641c\u7d22",
            img: ["public/rebuild/images/s/taobao.png", "\u6dd8\u5b9d\u7f51"],
            url: "http://www.taobao.com/",
            params: {}
        },
        baike: {
            action: "http://baike.baidu.com/searchword/",
            name: "word",
            btn: "\u641c\u7d22\u8bcd\u6761",
            img: ["public/rebuild/images/s/baike.gif", "\u767e\u5ea6\u767e\u79d1"],
            url: "http://baike.baidu.com/",
            params: {}
        },
        ditu: {
            action: "http://map.baidu.com/m",
            name: "word",
            btn: "\u641c\u7d22\u5730\u56fe",
            img: ["public/rebuild/images/s/map.png", "\u767e\u5ea6\u5730\u56fe"],
            url: "http://map.baidu.com/",
            params: {}
        },
        computer: {
            action: "http://cn.bing.com/search",
            name: "q",
            btn: "\u641c \u7d22",
            img: ["public/rebuild/images/s/by.png", "\u5929\u6781\u7535\u8111"],
            url: "http://cn.bing.com/",
            params: {}
        }
    },
    banner: {
        b4: {
            img: "static/images/banner/taoke12060.jpg",
            url: "http://pindao.huoban.taobao.com/channel/channelMall.htm?pid=mm_11140156_0_0"
        }
    },
    Keywords: [["\u514d", "#"], ["\u9177", "#"]]
};
var SE = (function () {
    var b = [$("#searchForm").el.tn, $("#searchForm").el.ch];

    function a(d) {
        $("#searchForm").el.action = d.action;
        $("#sf_label img").el.src = d.img[0];
        $("#sf_label img").el.setAttribute("alt", d.img[1]);
        $("#sf .searchWord").el.name = d.name;
        $("#sf .searchSubmit ").el.value = d.btn;
        $("#sf_label").el.href = d.url;
        if (b.length > 0) {
            b = c(b)
        }
        function c(h) {
            for (var g = 0,
                     f = h.length; g < f; g++) {
                $("#searchForm").remove(h[g])
            }
            return []
        }

        for (var e in d.params) {
            $("#searchForm").create("input", {
                    name: e,
                    value: d.params[e],
                    type: "hidden"
                },
                function (f) {
                    b.push(f);
                    this.append(f)
                })
        }
    }

    $("#sf .searchWord").on("mouseover",
        function (c) {
            if (cache.get("SE_ONFOCUS")) {
                return
            }
            c.value = c.value;
            c.focus()
        });
    $("#sf .searchWord").on("blur",
        function (c) {
            cache.remove("SE_ONFOCUS")
        });
    $("#sf .searchWord").on("focus",
        function (c) {
            cache.set("SE_ONFOCUS", true);
            if (Browser.isIE) {
                Yl.getFocus(c)
            } else {
                c.focus()
            }
        });
    return {
        set: a
    }
})();
var _imgarr = Math.floor(Math.random() * 2);
$("#sm_tab li").on("click",
    function (b) {
        $("#sf .searchWord").el.focus();
        $("#sm_tab li").removeClass("active").removeClass("active116");
        $(b).addClass("active");
        var a = b.getAttribute("rel");
        if (a === "s115") {
            $(b).removeClass("active");
            $(b).addClass("active116")
        }
        if (a !== "web") {
            $(".overArw").hide();
            $(".nnum").hide()
        } else {
            $(".overArw").show();
            if (!Cookie.get("topListNum")) {
                $(".nnum").show()
            }
        }
        KeywordCount({
            u: a,
            n: a,
            q: 0
        });
        cache.set("CURRENT_SE_TAB", a);
        SE.set(Config.Search[a]);
        if (Browser.isIE) {
            $("#sf .searchWord").el.value = $("#sf .searchWord").el.value
        }
        $("#sw div").hide();
        $("div#sw_" + a).show();
        return false
    });
var Suggest = (function () {
    var h = $("#sf .searchWord"),
        c = $("#suggest"),
        s = $("#topShow"),
        k,
        n = -1,
        b = null,
        m,
        g,
        a = false,
        l = false,
        o = false,
        p = false;
    h.el.onkeydown = function (u) {
        var u = u || window.event;
        if (p) {
            return
        }
        s.hide();
        $(".overArw").removeClass("up");
        switch (u.keyCode) {
            case 38:
                if (o) {
                    if (this.value == "") {
                        return
                    }
                    c.show();
                    o = false
                } else {
                    n--
                }
                d();
                break;
            case 40:
                if (o) {
                    if (this.value == "") {
                        return
                    }
                    c.show();
                    o = false
                } else {
                    n++
                }
                d();
                break;
            case 27:
                this.value = k;
                j();
                break;
            case 13:
                cache.set("Handdle_Key", "13");
                j();
                break;
            default:
                break
        }
    };
    h.el.onkeyup = function (u) {
        var u = u || window.event;
        if (p) {
            return
        }
        k = this.value;
        switch (u.keyCode) {
            case 38:
                l = true;
                break;
            case 40:
                l = true;
                break;
            case 8:
                if (this.value == "") {
                    j()
                } else {
                    r()
                }
                break;
            case 27:
                this.value = k;
                j();
            case 13:
                cache.set("Handdle_Key", "13");
                j();
                break;
            default:
                if (k != "") {
                    r()
                }
                break
        }
    };
    h.el.onblur = function () {
        if (!a) {
            j();
            s.hide();
            $(".overArw").removeClass("up")
        }
    };
    function d() {
        if (!g) {
            return
        }
        var u = g.length;
        l = true;
        if (n < 0) {
            n = u - 1
        } else {
            if (n >= u) {
                n = 0
            }
        }
        for (var v = 0,
                 u = g.length; v < u; v++) {
            g[v].className = ""
        }
        g[n].className = "hover";
        h.el.value = g[n].innerHTML
    }

    function f() {
        if (typeof(m) != "object" || typeof(m) == "undefined") {
            return
        }
        var u = "<ul>";
        m.forEach(function (x, w, v) {
            if (cache.get("CURRENT_SE_TAB") == "taobao") {
                u += '<li key="' + w + '">' + x[0] + "</li>"
            } else {
                u += '<li key="' + w + '">' + x + "</li>"
            }
        });
        u += "</ul>";
        g = c.el.getElementsByTagName("li");
        c.el.innerHTML = u;
        c.show();
        n = -1;
        o = false;
        e()
    }

    function j() {
        c.hide();
        o = true
    }

    function i() {
        h.el.setAttribute("autocomplete", "on");
        h.el.focus();
        c.hide();
        p = true
    }

    function e() {
        c.el.onmouseover = function (x) {
            var x = x || window.event,
                w = x.target || x.srcElement;
            if (w.tagName.toUpperCase() == "LI") {
                for (var v = 0,
                         u = g.length; v < u; v++) {
                    g[v].className = ""
                }
                w.className = "hover";
                n = parseInt(w.getAttribute("key"));
                $(w).on("mouseout",
                    function (y) {
                        y.className = ""
                    })
            }
            a = true
        };
        c.el.onmouseout = function () {
            a = false
        };
        c.el.onclick = function (w) {
            var w = w || window.event,
                v = w.target || w.srcElement;
            if (v.tagName.toUpperCase() == "LI") {
                h.el.value = v.innerHTML;
                h.el.focus();
                j();
                var u = document.getElementById("searchForm");
                cache.set("Handdle_Key", "S");
                u.onsubmit();
                u.submit()
            }
            if (v.id == "closeSugBtn") {
                i()
            }
        }
    }

    function t() {
        s.el.onmouseover = function (v) {
            var v = v || window.event,
                u = v.target || v.srcElement;
            if (u.tagName.toUpperCase() == "LI") {
                $(u).addClass("hover");
                n = parseInt(u.getAttribute("key"))
            }
            a = true
        };
        s.el.onmouseout = function (v) {
            var v = v || window.event,
                u = v.target || v.srcElement;
            if (u.tagName.toUpperCase() == "LI") {
                $(u).removeClass("hover")
            }
            a = false
        };
        s.el.onclick = function (w) {
            var w = w || window.event,
                v = w.target || w.srcElement;
            if (v.tagName.toUpperCase() == "A") {
                h.el.value = v.innerHTML;
                h.el.focus();
                s.hide();
                $(".overArw").removeClass("up");
                var u = document.getElementById("searchForm");
                cache.set("Handdle_Key", "TS");
                u.onsubmit();
                u.submit()
            }
            if (v.tagName.toUpperCase() == "LI") {
                h.el.value = v.getAttribute("rel");
                h.el.focus();
                s.hide();
                $(".overArw").removeClass("up");
                var u = document.getElementById("searchForm");
                cache.set("Handdle_Key", "TS");
                u.onsubmit();
                u.submit()
            }
        }
    }

    $("#searchForm").el.onsubmit = function () {
        var u = cache.get("CURRENT_SE_TAB") ? cache.get("CURRENT_SE_TAB") : "web";
        KeywordCount({
                type: u,
                word: h.el.value,
                url: window.location.href,
                key: cache.get("Handdle_Key")
            },
            "http://www.tjj.com/click.php");
        if (_hmt) {
            _hmt.push(["_trackEvent", "\u641c\u7d22\u6846", "submit", u, h.el.value])
        }
    };
    $("#search_btn").on("click",
        function () {
            cache.set("Handdle_Key", "B")
        });
    function r() {
        var x = $("head").el;
        var v = cache.get("CURRENT_SE_TAB");
        if (b) {
            if (v == "taobao") {
                b.charset = "utf-8"
            } else {
                b.charset = "gb2312"
            }
        }
        if (!Browser.isIE) {
            if (b) {
                x.removeChild(b)
            }
            b = null
        }
        if (!b) {
            var u = document.createElement("script");
            u.type = "text/javascript";
            if (v == "taobao") {
                u.charset = "utf-8"
            } else {
                u.charset = "gb2312"
            }
            x.insertBefore(u, x.firstChild);
            b = u
        }
        var y = new Date().getTime();
        var w = encodeURIComponent(h.el.value);
        var z = "";
        switch (v) {
            case "taobao":
                z = "http://suggest.taobao.com/sug?code=utf-8&callback=taobaoSU&q=" + w + "&rd=" + y;
                break;
            default:
                z = "http://unionsug.baidu.com/su?wd=" + w + "&p=3&cb=baiduSU&t=" + y
        }
        b.src = z
    }

    window.baiduSU = function (u) {
        if (typeof(u) == "object" && typeof(u.s) != "undefined" && typeof(u.s[0]) != "undefined") {
            m = u.s;
            f()
        } else {
            j()
        }
    };
    window.taobaoSU = function (u) {
        if (typeof(u) == "object" && typeof(u.result) != "undefined" && typeof(u.result[0][0]) != "undefined") {
            m = u.result;
            f()
        } else {
            j()
        }
    };
    window.Ylmf.toplist = function (A) {
        if (typeof A !== "Object" && typeof A !== "undefined" && A !== null) {
            var x = A.update;
            var F = "",
                D = "<ul id='topTrend'>",
                y = A.data;
            var E = 0;
            if (Cookie.get("topListNum")) {
                var C = Cookie.get("topListNum").split("_");
                if (C[1] != x) {
                    $(".nnum").show()
                }
            } else {
                $(".nnum").show()
            }
            for (var z = 0,
                     B = y.length; z < B; z++) {
                var v = z + 1;
                if (y[z]["news"] == 1) {
                    F += '<li key="' + z + '" rel="' + y[z]["title"] + '"><span>' + v + '</span><a href="javascript:;" target="_self">' + y[z]["title"] + "</a><i>news!</i></li>";
                    E++
                } else {
                    F += '<li key="' + z + '" rel="' + y[z]["title"] + '"><span>' + v + '</span><a href="javascript:;" target="_self">' + y[z]["title"] + "</a></li>"
                }
            }
            document.getElementById("nums").innerHTML = E;
            D += F + "</ul>";
            document.getElementById("topShow").innerHTML = D;
            document.getElementById("nums").setAttribute("time", x);
            var u = document.getElementById("topTrend").getElementsByTagName("li");
            for (var w = 0; w < u.length; w++) {
                if (w <= 2) {
                    u[w].className = "red"
                }
            }
        }
    };
    function q() {
        c.hide();
        s.show();
        t();
        var v = document.getElementById("nums").getAttribute("time");
        var u = new Date(new Date().getTime() + 1000 * 3600 * 24);
        Cookie.set("topListNum", "clicked_" + v, u)
    }

    $(".overArw").on("click",
        function (u) {
            document.getElementById("suggest").innerHTML = "";
            $(u).hasClass("up",
                function (v) {

                    if (!v) {
                        $(u).addClass("up");
                        q()
                    } else {
                        $(u).removeClass("up");
                        s.hide()
                    }
                });
            $(".nnum").hide()
        });
    $(".nnum").on("click",
        function (u) {
            document.getElementById("suggest").innerHTML = "";
            $(u).hide();
            $(".overArw").addClass("up");
            q()
        })
})();
function KeywordCount(b, e) {
    if (!b || b == "") {
        return
    }
    var c = e || "http://www.tjj.com/index";
    var g = new Date().getTime();
    var a = new Image();
    var f = "";
    for (var d in b) {
        if (d == "u") {
            f += ("?" + d + "=" + encodeURIComponent(b[d]))
        } else {
            f += ("&" + d + "=" + encodeURIComponent(b[d]))
        }
    }
    if (c == "http://www.tjj.com/index") {
        a.src = c + f + "&i=" + g
    } else {
        a.src = c + "?i=" + g + f
    }
}